# https://chatgpt.com/share/68a09e28-e83c-8010-bafd-ab30ed11c492

# mcp_tools.py
from mcp.server import Server, run
import psycopg2
import json

srv = Server(name="org-memory-plane")


@srv.tool("search_gmail", "Search Gmail via full-text/metadata (not semantic).")
def search_gmail(q: str = None, label: str = None, sender: str = None, days: int = 180, limit: int = 20):
    sql = """
      SELECT id, title, author, created_at, url, metadata FROM memory_items
      WHERE source='gmail' AND created_at > now() - interval %s
    """
    params = [f'{days} days']
    if label:
        sql += " AND channel_or_label ILIKE %s"
        params.append(f'%{label}%')
    if sender:
        sql += " AND metadata->>'from' ILIKE %s"
        params.append(f'%{sender}%')
    if q:
        sql += " AND content ILIKE %s"
        params.append(f'%{q}%')
    sql += " ORDER BY created_at DESC LIMIT %s"
    params.append(limit)
    with psycopg2.connect(...) as conn, conn.cursor() as cur:
        cur.execute(sql, params)
        rows = cur.fetchall()
    return [dict(id=r[0], title=r[1], author=r[2], created_at=str(r[3]), url=r[4], metadata=r[5]) for r in rows]


@srv.tool("search_slack", "Search Slack by channel/user/date.")
def search_slack(q: str = None, channel: str = None, user: str = None, days: int = 180, limit: int = 20):
    # similar pattern; filter on source='slack'
    ...


@srv.tool("semantic_search_all", "RAG over Salesforce, Gmail, Slack with metadata filters.")
def semantic_search_all(question: str, k: int = 8, source: str = None, channel: str = None, label: str = None):
    # 1) embed question
    # 2) vector ANN search with WHERE filters (source/channel_or_label)
    # 3) return snippets + URLs + thread_id for drill-down
    ...


@srv.tool("get_thread", "Return full thread (by source + thread_id).")
def get_thread(source: str, thread_id: str):
    sql = "SELECT * FROM memory_items WHERE source=%s AND thread_id=%s ORDER BY created_at ASC"
    ...
