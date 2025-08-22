CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE memory_items (
  id               UUID PRIMARY KEY,
  source           TEXT CHECK (source IN ('salesforce','gmail','slack')),
  source_id        TEXT NOT NULL,           -- Case Id, Gmail threadId, Slack ts or thread_ts
  parent_id        TEXT,                    -- for replies/messages in a thread
  thread_id        TEXT,                    -- stable thread key
  title            TEXT,                    -- Case subject, email subject, first Slack message
  author           TEXT,
  channel_or_label TEXT,                    -- Slack channel, Gmail label(s)
  created_at       TIMESTAMPTZ NOT NULL,
  url              TEXT,                    -- deep link back to SF/Gmail/Slack
  metadata         JSONB NOT NULL,          -- any extra fields (priority, status, account...)
  content          TEXT NOT NULL,           -- cleaned plaintext
  embedding        VECTOR(1536)             -- size depends on your embedding model
);

CREATE INDEX ON memory_items (source, created_at);
CREATE INDEX ON memory_items (thread_id);
CREATE INDEX ON memory_items USING GIN (metadata);
