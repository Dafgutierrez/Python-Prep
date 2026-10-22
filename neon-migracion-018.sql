-- Geonos app API · "Connect with Claude" (OAuth 2.1 for the client MCP server). Apply after 017_aio_and_uploads.sql. Safe to run twice.
-- The code works before this runs: /api/mcp keeps answering gnk_ keys, and the connect routes answer "not available yet".
-- A connected Claude is one row in api_keys (kind mcp, prefix gno_conn) so it shows in the MCP page, counts calls and is revoked like a key;
-- oauth_tokens holds the access and refresh tokens (hashes only) of that connection. Only hashes are stored, never a token.

-- Clients that registered themselves (RFC 7591). Public clients only: the redirect addresses are checked against an allow list at registration.
CREATE TABLE IF NOT EXISTS oauth_clients (
  client_id      text PRIMARY KEY,
  client_name    text NOT NULL,
  redirect_uris  text NOT NULL,            -- JSON list
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- Authorization codes: ten minutes, used once, bound to the client, the redirect address and the PKCE challenge.
CREATE TABLE IF NOT EXISTS oauth_codes (
  code_hash        text PRIMARY KEY,
  client_id        text NOT NULL,
  redirect_uri     text NOT NULL,
  code_challenge   text NOT NULL,
  organization_id  uuid NOT NULL,
  brand_id         uuid NOT NULL,
  user_id          text NOT NULL,
  scope            text NOT NULL,
  expires_at       timestamptz NOT NULL,
  used_at          timestamptz
);
CREATE INDEX IF NOT EXISTS oauth_codes_expiry_idx ON oauth_codes (expires_at);

-- One connection: the key it acts as, the current access token (1 hour) and refresh token (rotated on every use).
CREATE TABLE IF NOT EXISTS oauth_tokens (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key_id              uuid NOT NULL REFERENCES api_keys (id) ON DELETE CASCADE,
  client_id           text NOT NULL,
  access_hash         text NOT NULL UNIQUE,
  access_expires_at   timestamptz NOT NULL,
  refresh_hash        text NOT NULL UNIQUE,
  refresh_expires_at  timestamptz NOT NULL,
  prev_refresh_hash   text,
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS oauth_tokens_key_idx ON oauth_tokens (key_id);
