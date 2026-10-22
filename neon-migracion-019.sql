-- Geonos app API · what the language model calls cost, per brand and month, and per day for the whole service (llm.js). Apply after 018_oauth_connector.sql. Safe to run twice.
-- The code works before this runs, but every model call answers "not measured": without a place to count the spend, the monthly cap cannot be enforced, so nothing is sent.
-- Money is kept as millionths of a US dollar (cost_micro) so adding is exact. The whole-service daily row uses the all-zero id for organization and brand and the day as the period.
CREATE TABLE IF NOT EXISTS llm_usage (
  organization_id  uuid NOT NULL,
  brand_id         uuid NOT NULL,
  period           text NOT NULL,            -- 'YYYY-MM' for a brand's month, 'YYYY-MM-DD' for the whole service's day (UTC)
  calls            integer NOT NULL DEFAULT 0,
  tokens_in        bigint NOT NULL DEFAULT 0,
  tokens_out       bigint NOT NULL DEFAULT 0,
  cost_micro       bigint NOT NULL DEFAULT 0,
  updated_at       timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (organization_id, brand_id, period)
);
