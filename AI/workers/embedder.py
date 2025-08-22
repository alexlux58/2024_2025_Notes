# workers/embedder.py
import psycopg2
import numpy as np
from sentence_transformers import SentenceTransformer

# or bge-large, etc.
model = SentenceTransformer("mixedbread-ai/mxbai-embed-large-v1")


def backfill_embeddings(conn, batch=256):
    with conn, conn.cursor() as cur:
        cur.execute(
            "SELECT id, content FROM memory_items WHERE embedding IS NULL LIMIT %s", (batch,))
        rows = cur.fetchall()
        if not rows:
            return 0
        texts = [r[1] for r in rows]
        vecs = model.encode(texts, normalize_embeddings=True)
        for (item_id, _), vec in zip(rows, vecs):
            cur.execute("UPDATE memory_items SET embedding = %s WHERE id = %s",
                        (np.array(vec, dtype=np.float32), item_id))
    return len(rows)
