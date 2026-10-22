-- Geonos app API · Google AI Overviews presence and screenshot uploads for agent captures. Apply after 016_site_leads.sql. Safe to run twice.
-- The code works before this runs: AI Overview runs that found an overview still save as normal checks, runs with no overview are not stored,
-- and a screenshot upload answers "not available yet".

-- One row per check of Google Search with AI Overviews (engine google_aio): did Google show an AI Overview for the search. A run that found
-- one also saves a normal check in captures (mentioned, position, sources). A run with no overview saves only this row, so it never counts
-- as "brand not mentioned" in the mention rate. The unit of the "AI Overview shown" rate is this table.
CREATE TABLE IF NOT EXISTS aio_runs (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id  uuid NOT NULL REFERENCES organizations (id) ON DELETE CASCADE,
  brand_id         uuid NOT NULL,
  prompt_id        uuid NOT NULL REFERENCES prompts (id) ON DELETE CASCADE,
  captured_at      timestamptz NOT NULL,
  shown            boolean NOT NULL,
  FOREIGN KEY (organization_id, brand_id) REFERENCES brands (organization_id, id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS aio_runs_dedupe_idx ON aio_runs (prompt_id, captured_at);
CREATE INDEX IF NOT EXISTS aio_runs_brand_time_idx ON aio_runs (organization_id, brand_id, captured_at DESC);

-- Screenshots the agents upload as evidence for a capture (capture.v1 screenshot_ref = this id with the prefix "up_"). Small images only
-- (the API limits them to 1.2 MB), kept for GEONOS_SCREENSHOT_DAYS days (default 14) and then deleted by the daily watchdog.
CREATE TABLE IF NOT EXISTS bot_uploads (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id  uuid,
  brand_id         uuid,
  task_id          uuid,
  bot_id           uuid,
  content_type     text NOT NULL CHECK (content_type IN ('image/png', 'image/jpeg', 'image/webp')),
  bytes            integer NOT NULL CHECK (bytes BETWEEN 1 AND 1572864),
  data             text NOT NULL,           -- base64 of the image
  created_at       timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS bot_uploads_time_idx ON bot_uploads (created_at);
CREATE INDEX IF NOT EXISTS bot_uploads_task_idx ON bot_uploads (task_id);
