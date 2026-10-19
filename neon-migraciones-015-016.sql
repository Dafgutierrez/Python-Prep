-- Geonos app API · agent delivery pipeline (client files, approval, tracked prompts, blockers). Apply after 014_site_seo_extras.sql. Safe to run twice.
-- The content team (Elena, Martin, Rafael, Lucia, Fatima and the Desk, with Patrick as QA) works in files per client and per market.
-- Geonos receives the final deliverables over the bot API (a gnb_ key per agent), keeps every version, never overwrites one, and shows
-- only approved (_OK) files. The prompts to track become suggested prompts of a brand once the client is linked to a workspace.
-- A pipeline client is NOT a customer: it can exist before any workspace does (organization_id and brand_id stay empty until linked).

-- New bot roles for the delivery agents.
ALTER TABLE bots DROP CONSTRAINT IF EXISTS bots_role_check;
ALTER TABLE bots ADD CONSTRAINT bots_role_check CHECK (role IN ('engine_collector', 'shopping_collector', 'demand_analyst', 'amazon_analyst', 'community_scout', 'qa_auditor', 'pipeline_delivery', 'pipeline_seo', 'pipeline_qa'));

CREATE TABLE IF NOT EXISTS pipeline_clients (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             text NOT NULL UNIQUE CHECK (length(slug) BETWEEN 3 AND 60),
  name             text NOT NULL CHECK (length(name) BETWEEN 2 AND 120),
  url              text CHECK (url IS NULL OR length(url) <= 300),
  markets          text[] NOT NULL DEFAULT '{}',
  stage            text,
  batch            text,
  package          text,
  organization_id  uuid REFERENCES organizations (id) ON DELETE SET NULL,
  brand_id         uuid,
  created_by       text NOT NULL,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pipeline_files (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id        uuid NOT NULL REFERENCES pipeline_clients (id) ON DELETE CASCADE,
  market           text NOT NULL CHECK (market IN ('us-en', 'mx-es')),
  stage            text NOT NULL CHECK (stage IN ('elena', 'martin', 'rafael', 'lucia', 'fatima')),
  kind             text NOT NULL,
  version          integer NOT NULL CHECK (version >= 1),
  filename         text NOT NULL,
  format           text NOT NULL CHECK (format IN ('md', 'csv')),
  content          text NOT NULL CHECK (length(content) <= 1500000),
  sha256           text NOT NULL,
  bytes            integer NOT NULL,
  rows_total       integer,
  status           text NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'ok', 'rejected')),
  review_notes     text,
  check_output     text,
  uploaded_by_bot  uuid,
  uploaded_by      text NOT NULL,
  reviewed_by      text,
  reviewed_at      timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (client_id, market, stage, kind, version)
);
CREATE INDEX IF NOT EXISTS pipeline_files_client_idx ON pipeline_files (client_id, market, stage, created_at DESC);

-- The final table of prompts to track, one row per prompt, taken from an approved prompts file. Older sets are retired, never deleted.
CREATE TABLE IF NOT EXISTS pipeline_prompts (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id        uuid NOT NULL REFERENCES pipeline_clients (id) ON DELETE CASCADE,
  file_id          uuid NOT NULL REFERENCES pipeline_files (id) ON DELETE CASCADE,
  market           text NOT NULL CHECK (market IN ('us-en', 'mx-es')),
  prompt_ref       text NOT NULL,
  prompt           text NOT NULL CHECK (length(prompt) BETWEEN 3 AND 300),
  language         text NOT NULL CHECK (language IN ('en', 'es')),
  journey_stage    text,
  category         text,
  keyword          text,
  keyword_match    text NOT NULL DEFAULT 'none' CHECK (keyword_match IN ('exact', 'closest', 'none')),
  volume           integer CHECK (volume IS NULL OR volume >= 0),
  kd               integer CHECK (kd IS NULL OR kd BETWEEN 0 AND 100),
  intent           text,
  cpc              numeric,
  position         numeric,
  source           text,
  state            text NOT NULL DEFAULT 'tracked' CHECK (state IN ('tracked', 'retired')),
  published_prompt_id uuid,
  created_at       timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS pipeline_prompts_client_idx ON pipeline_prompts (client_id, market, state);

CREATE TABLE IF NOT EXISTS pipeline_blockers (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id        uuid NOT NULL REFERENCES pipeline_clients (id) ON DELETE CASCADE,
  market           text CHECK (market IS NULL OR market IN ('us-en', 'mx-es')),
  stage            text,
  kind             text NOT NULL,
  note             text NOT NULL CHECK (length(note) BETWEEN 3 AND 1000),
  reported_by      text NOT NULL,
  reported_by_bot  uuid,
  resolved_at      timestamptz,
  resolved_by      text,
  created_at       timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS pipeline_blockers_client_idx ON pipeline_blockers (client_id, resolved_at);

-- Geonos app API · requests from the public website forms (book a demo, design partner). Apply after 015_pipeline.sql. Safe to run twice.
-- One row per submitted form. The email also goes to the waitlist and to client_contacts (source = the form), so the request shows in the
-- owner console, Clients, as a lead. The details (site, market, path, message) stay here. Nothing here is a customer record.
CREATE TABLE IF NOT EXISTS site_leads (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind        text NOT NULL CHECK (kind IN ('book_demo', 'design_partner')),
  name        text NOT NULL CHECK (length(name) BETWEEN 2 AND 120),
  email       text NOT NULL CHECK (length(email) BETWEEN 5 AND 200),
  site        text,
  market      text,
  path        text,
  message     text CHECK (message IS NULL OR length(message) <= 2000),
  lang        text NOT NULL DEFAULT 'en' CHECK (lang IN ('en', 'es')),
  page        text,
  handled_at  timestamptz,
  handled_by  text,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS site_leads_time_idx ON site_leads (created_at DESC);
