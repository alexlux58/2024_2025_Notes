# connectors/gmail_ingest.py
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from email.header import decode_header
import base64
import html
import re
import psycopg2
import uuid
import datetime as dt


def gmail_service(creds_dict):
    creds = Credentials.from_authorized_user_info(
        creds_dict, scopes=['https://www.googleapis.com/auth/gmail.readonly'])
    return build('gmail', 'v1', credentials=creds)


def clean(body_html_or_text):
    # naive cleaner; use better HTML->text if needed
    text = html.unescape(body_html_or_text)
    text = re.sub(r'<[^>]+>', ' ', text)
    return re.sub(r'\s+', ' ', text).strip()


def upsert_thread(conn, svc, user_id='me', q='newer_than:90d -in:trash'):
    threads = svc.users().threads().list(userId=user_id, q=q,
                                         maxResults=200).execute().get('threads', [])
    with conn, conn.cursor() as cur:
        for t in threads:
            thr = svc.users().threads().get(
                userId=user_id, id=t['id'], format='full').execute()
            msgs = thr.get('messages', [])
            subject = ''
            for i, m in enumerate(msgs):
                headers = {h['name'].lower(): h['value']
                           for h in m['payload'].get('headers', [])}
                if i == 0:
                    subject = headers.get('subject', '')
                snippet = m.get('snippet', '')
                parts = m['payload'].get('parts') or []
                body = ''
                if 'body' in m['payload'] and m['payload']['body'].get('data'):
                    body = base64.urlsafe_b64decode(
                        m['payload']['body']['data']).decode('utf-8', errors='ignore')
                else:
                    # pick first text/html part if exists
                    for p in parts:
                        if p.get('mimeType', '').startswith('text/'):
                            if p['body'].get('data'):
                                body = base64.urlsafe_b64decode(
                                    p['body']['data']).decode('utf-8', errors='ignore')
                                break
                content = clean(body or snippet)
                msg_id = m['id']
                thread_id = thr['id']
                gmail_url = f"https://mail.google.com/mail/u/0/#inbox/{msg_id}"
                created = dt.datetime.fromtimestamp(
                    int(m['internalDate'])/1000, dt.timezone.utc)
                labels = ','.join(m.get('labelIds', []))
                row_id = uuid.uuid5(uuid.NAMESPACE_URL, f"gmail:{msg_id}")
                cur.execute("""
                  INSERT INTO memory_items (id, source, source_id, parent_id, thread_id, title, author,
                      channel_or_label, created_at, url, metadata, content)
                  VALUES (%s,'gmail',%s,NULL,%s,%s,%s,%s,%s,%s,%s::jsonb,%s)
                  ON CONFLICT (id) DO UPDATE SET content=EXCLUDED.content, metadata=EXCLUDED.metadata
                """, (
                    str(row_id), msg_id, thread_id, subject[:500],
                    headers.get('from', ''), labels, created, gmail_url,
                    json.dumps({'to': headers.get('to'),
                                'cc': headers.get('cc'), 'subject': subject}),
                    content
                ))
