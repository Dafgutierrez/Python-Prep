# Geonos delivery API: what the code does today, for writing the client (2026-10-24)

Read next to `docs/AGENT-DELIVERY-API.md` and `docs/CONTRACT-section-15-agent-delivery-pipeline.md` (both copied unchanged). Where this note and those two differ, this note is what the server does today. Checked against `app-api/src/handlers/pipeline-api.js`, `app-api/src/pipeline.js` and `app-api/src/errors.js` in Dafgutierrez/GEONOS on 2026-10-24. No key exists yet and the API has not been called by any agent.

## Before the first call

- **Base URL.** The spec says `https://geonos-demo.vercel.app`. The site is now `https://getgeonos.com`. Which domain serves `/api/bot/*` is **not confirmed**; keep it in one variable, `GEONOS_API`, and do not hard-code either. Dafne confirms it when she creates the keys.
- **Key.** `Authorization: Bearer gnb_...`, one per agent, read from an environment variable (`GEONOS_KEY`). Never in a file, a log, a test fixture or a chat. Tests use a fake key such as `gnb_test_fake`.
- **Routes also answer under `/api/bot/v1/...`** (same handlers).
- **Rate limit.** 60 requests a minute per bot. Over it: `429 {"error":"rate_limited"}`.

## Error envelope

Every error is JSON `{ "error": "<code>", "message": "<plain text>", ...details }`.

| Status | `error` | When | What the client does |
|---|---|---|---|
| 401 | (read `error` in the body) | missing or wrong key | stop; do not retry |
| 403 | `missing_scope`, `wrong_role`, `stage_not_allowed`, `market_not_allowed`, `not_approved` | role cannot do this | stop and report |
| 400 | `version_gap` | `version` is more than latest + 1; body has `latest_version` | send `latest_version + 1` |
| 400 | `bad_request` (validation) | a field is missing or malformed | fix the field |
| 404 | `file_not_found`, client not found | wrong id or slug | stop |
| 409 | `file_exists` | `version` is at or below the latest, or someone else just uploaded it | **next version**: read `latest_version`, send it as `latest + 1`, and end the file name in `-v{latest+1}`. Never overwrite. |
| 409 | `already_reviewed`, `superseded` | review of a file already decided or an older version | read status, review the latest |
| 422 | `checks_failed` | the file failed the checks; **nothing was saved** | fix the lines and send the **same version again** |
| 429 | `rate_limited` | over 60 a minute | wait a minute |
| 503 | `not_configured` | backend not set up | stop |

The 422 body: `{ "error": "checks_failed", "message": "...", "checks": { "passed": false, "issues": [ { "field", "reason", "line" } ], "issues_total": N } }`. `line` is the row or line of the file; `issues` is capped, `issues_total` is the real count.

## Upload

`POST {GEONOS_API}/api/bot/pipeline/files`, JSON body:

- `client` (slug), `market` (`us-en` or `mx-es`), `stage` (`elena, martin, rafael, lucia, fatima`), `kind`, `version` (integer 1 to 99), `filename`.
- Exactly one of `content` (text of a file; use it for markdown) or `rows` (list of objects; use it for csv kinds, the server writes the csv).
- `approve: true` only for a key with `pipeline:review` (Patrick's).

**Version rule.** `version` must equal the latest stored version of that client, market, stage and kind, plus one. The first upload is `version: 1`. The file name of version N>1 ends in `-vN` (for example `..._inicial-v2.csv`).

**201 body.** `{ "file": { id, market, stage, kind, version, filename, format, bytes, rows, sha256, status, ... }, "checks": { "passed": true, "rows": N, "cpc_currency"?: "USD" }, "status": "submitted", "prompts": ..., "next": "..." }`. Keep `file.id`: Patrick's review uses it.

**Limits.** Markdown and csv files: 1,000 KB (1000 * 1024 bytes) and 5,000 csv rows. Kinds `keywords` and `keyword_gap`: 1,400,000 bytes and 15,000 rows. Check the size before sending; over it is a 422.

**Stages and kinds** (`GET /api/bot/pipeline/skills` returns the exact list and required csv columns for the key's role; call it first and use it as the source of truth):
`elena` research, seeds, prompts_draft; `martin` brief; `rafael` keywords, prompts, seo_recommendations, coverage (plus keyword_gap); `lucia` channels; `fatima` matrix, calendar, drafts, prompts.

**What the checks look at** (the same rules as `pipeline_checks.py`): csv columns (required and allowed only; an unknown column is refused), id format (`P-01` or `PS-01` for prompts, `S-01` for seeds), language (`en` for us-en, `es` for mx-es; "no data" in a Spanish file or "sin dato" in an English one fails), `journey_stage` and `category` values, `keyword_match` on every prompt row (`exact`, `closest`, `none`), `volume` an integer or empty, coverage threshold (500 a month in us-en, 200 in mx-es: a keyword at or above it needs an assignment; an excluded one needs a reason), the drafts file name `{client}_drafts_{market}_{YYYY-MM-DD}_{batch}.md`, and the `-vN` suffix.

## Corrections to the spec text

1. **`keywords` kind and `database`.** Section 4 of the spec still tells Rafael to add a `database` column. That was withdrawn (item 4 of section 2): the market of the upload decides the database. The test files carried a `database` column and passed; it is not required.
2. **Currency of the CPC.** Today the server reads the currency from the header (`CPC (USD)` or `CPC (MXN)`) and returns it as `checks.cpc_currency` on a 201. A per-row `cpc_currency` column is **not honored yet** (a change for it is open as a pull request and not merged). Until it is, send one currency per file: USD in us-en, MXN in mx-es, with empty cells where there is no CPC in that currency.
3. **Sizes.** The single "1,000 KB, 5,000 rows" in section 6 of the spec is the general limit; the Semrush kinds have the higher limit above.
4. **Domain.** Every `geonos-demo.vercel.app` in the spec is the old demo domain; the public site is `getgeonos.com`.

## The first real call (minimal test)

Do this once, with the real key, before sending any real file. It touches nothing a customer can see: the test client is not linked to any workspace, so an approved prompts file creates no suggested prompts.

1. `GET /api/bot/pipeline/skills`: expect 200 and the role's stages and kinds. 401 means the key or the base URL is wrong.
2. Patrick's key only: `POST /api/bot/pipeline/clients` with `{ "slug": "geonos-api-test", "name": "Geonos API test", "markets": ["us-en"], "batch": "test" }`: 201 first time, 200 if it exists.
3. Fatima's key: `POST /api/bot/pipeline/files` with a prompts file of **two rows** as `rows`:
   `client: geonos-api-test, market: us-en, stage: fatima, kind: prompts, version: 1, filename: geonos-api-test_prompts_us-en_2026-10-24.csv`, rows with `prompt_id` P-01 and P-02, `language: en`, `journey_stage: Awareness`, `category: Informational`, `keyword_match: none`, `keyword` and `volume` empty. Expect 201 with `status: submitted`.
4. Same call again, same version: expect **409 `file_exists`** with `latest_version: 1`. That proves nothing was overwritten.
5. A deliberately bad row (for example `keyword_match: sometimes`) as version 2: expect **422 `checks_failed`** with the line. That proves nothing was saved.
6. `GET /api/bot/pipeline/status?client=geonos-api-test`: expect the fatima prompts file in review.
7. Patrick's key reviews the file (`POST /api/bot/pipeline/files/{id}/review`, `decision: rejected`, `notes` required) so the test file does not become a tracked set. Then stop. There is no delete route for a client; the empty test client stays and is harmless.

Do not put the key, the file bodies or the client's real data in any log.
