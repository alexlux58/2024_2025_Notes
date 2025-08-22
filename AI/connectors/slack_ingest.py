# connectors/slack_ingest.py
from slack_sdk.web import WebClient
import psycopg2
import uuid
import datetime as dt


def ingest_channel_history(conn, token, channel_id, days=90):
    client = WebClient(token=token)
    # Use conversations.history + reply threads
    history = client.conversations_history(channel=channel_id, limit=1000)
    with conn, conn.cursor() as cur:
        for msg in history['messages']:
            ts = msg['ts']
            thread_ts = msg.get('thread_ts', ts)
            text = msg.get('text', '').strip()
            user = msg.get('user') or msg.get('bot_id', 'bot')
            created = dt.datetime.fromtimestamp(float(ts), dt.timezone.utc)
            url = f"https://app.slack.com/client/<WORKSPACE_ID>/{channel_id}/p{ts.replace('.', '')}"
            row_id = uuid.uuid5(uuid.NAMESPACE_URL, f"slack:{channel_id}:{ts}")
            cur.execute("""
              INSERT INTO memory_items (id, source, source_id, parent_id, thread_id, title, author,
                  channel_or_label, created_at, url, metadata, content)
              VALUES (%s,'slack',%s,NULL,%s,%s,%s,%s,%s,%s,%s::jsonb,%s)
              ON CONFLICT (id) DO UPDATE SET content=EXCLUDED.content
            """, (
                str(row_id), ts, thread_ts, text[:120], user, channel_id, created, url,
                json.dumps({'reactions': msg.get('reactions', []),
                            'files': msg.get('files', [])}),
                text
            ))
            # if it's a thread, fetch replies
            if 'reply_count' in msg and float(msg['reply_count']) > 0:
                replies = client.conversations_replies(
                    channel=channel_id, ts=thread_ts)
                for r in replies['messages'][1:]:
                    rts = r['ts']
                    rtext = r.get('text', '').strip()
                    ruser = r.get('user') or r.get('bot_id', 'bot')
                    rcreated = dt.datetime.fromtimestamp(
                        float(rts), dt.timezone.utc)
                    rurl = f"https://app.slack.com/client/<WORKSPACE_ID>/{channel_id}/p{rts.replace('.', '')}"
                    rid = uuid.uuid5(uuid.NAMESPACE_URL,
                                     f"slack:{channel_id}:{rts}")
                    cur.execute("""INSERT INTO memory_items
                      (id, source, source_id, parent_id, thread_id, title, author, channel_or_label, created_at, url, metadata, content)
                      VALUES (%s,'slack',%s,%s,%s,%s,%s,%s,%s,%s,%s::jsonb,%s)
                      ON CONFLICT (id) DO UPDATE SET content=EXCLUDED.content
                    """, (
                        str(rid), rts, ts, thread_ts, rtext[:80], ruser, channel_id, rcreated, rurl, json.dumps(
                            {}), rtext
                    ))
