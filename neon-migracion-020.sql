-- Geonos app API · how an AI answer speaks about the brand (positive, neutral or negative), labelled by the language model (sentiment.js). Apply after 019_llm_usage.sql. Safe to run twice.
-- Only answers that mention the brand get a label. The model labels; Geonos computes the Net Sentiment Score from the labels (rule 18). One label per check; deleting a check deletes its label.
CREATE TABLE IF NOT EXISTS capture_sentiment (
  capture_id       uuid PRIMARY KEY REFERENCES captures (id) ON DELETE CASCADE,
  organization_id  uuid NOT NULL,
  brand_id         uuid NOT NULL,
  sentiment        text NOT NULL CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  model            text NOT NULL,
  labelled_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS capture_sentiment_brand_idx ON capture_sentiment (organization_id, brand_id);
