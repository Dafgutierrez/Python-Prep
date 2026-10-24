# Geonos app API contract, section 15: Agent delivery pipeline

Copied verbatim from `app-api/CONTRACT.md` (Dafgutierrez/GEONOS) on 2026-10-24. Nothing was edited. Current differences between this text and the code are in `docs/GEONOS-DELIVERY-API-NOTES-2026-10-24.md`.

## 15. Agent delivery pipeline (added 2026-10-19, implemented)

Spec and quickstart for the agents: `docs/AGENT-DELIVERY-API.md`. Migration `015_pipeline.sql` (adds the roles `pipeline_delivery`, `pipeline_seo`, `pipeline_qa` and the tables `pipeline_clients`, `pipeline_files`, `pipeline_prompts`, `pipeline_blockers`). No feature flag: nothing happens until the owner creates a bot with one of the three roles. Auth is the bot auth of section 14 (`Bearer gnb_`). A pipeline client is a client of the content team, not a Geonos customer: it has no workspace until the owner links it, and a bot never sees an organization or brand id.

Scopes: `pipeline:read`, `pipeline:upload`, `pipeline:review` (plus `skills:read`). Roles: `pipeline_delivery` (Fatima: upload and read, stage `fatima`), `pipeline_seo` (Rafael: upload and read, stage `rafael`), `pipeline_qa` (Patrick: everything, all stages). A bot may be limited to one market with its `markets` field (`US` is us-en, `MX` is mx-es; empty is both). Markets in the pipeline are `us-en` and `mx-es`; stages `elena, martin, rafael, lucia, fatima`.

| Route | What it does |
|---|---|
| `GET /api/bot/pipeline/skills` | the agent's stages, the kinds and csv columns it may send, blocker kinds and the rules |
| `GET /api/bot/pipeline/clients` | the clients the bot may see (slug, name, url, markets, stage, batch, package) |
| `POST /api/bot/pipeline/clients` `{ slug, name, url?, markets?, stage?, batch?, package? }` (`pipeline:review`) | opens a client; an existing slug updates its fields. 201 or 200 |
| `POST /api/bot/pipeline/files` `{ client, market, stage, kind, version, filename, content` or `rows, approve? }` (`pipeline:upload`) | uploads one file version. `rows` (list of objects) is accepted for csv kinds and the server writes the csv. Runs the checks (columns, ids, language, volume, match, coverage threshold, drafts file name, `-vN` suffix). 201 `{ file, checks, status }`; 422 `checks_failed` with `checks.issues[{field, reason, line}]` and nothing saved; 409 `file_exists` (never overwritten, `latest_version`); 400 `version_gap`; 403 `stage_not_allowed`, `market_not_allowed`; `approve:true` needs `pipeline:review` |
| `GET /api/bot/pipeline/files?client=&market=&stage=&kind=&status=` | file metadata, without content. Delivery agents see only approved (`ok`) files and their own uploads; reviewers see all |
| `GET /api/bot/pipeline/files/:id` | metadata and `content`. Only approved files, the uploader's own, or any file for a reviewer (403 `not_approved`) |
| `POST /api/bot/pipeline/files/:id/review` `{ decision: ok or rejected, notes?, check_output? }` (`pipeline:review`) | Patrick's decision. `rejected` needs `notes`. Only a submitted file, once (409 `already_reviewed`); only the latest version (409 `superseded`); the checks run again before `ok` (422). Approving a `prompts` file makes it the tracked set of that client and market (older sets are retired) and, if the client is linked, creates the prompts as suggested prompts |
| `GET /api/bot/pipeline/prompts?client=&market=` | the tracked prompts table: `id, prompt, market, language, stage, category, keyword, keyword_match, volume, volume_is, kd, intent, cpc, position, source, published_to_workspace`. `volume_is` says whether the volume belongs to the keyword (exact) or to the closest keyword, never to the prompt |
| `GET /api/bot/pipeline/status?client=` | per market and stage: `not_started, in_review, needs_fix, partial, approved, blocked`, the latest version and status of each kind, what is missing, open blockers, tracked prompt count, `dashboardPromptsReady`, `deliveryComplete` |
| `POST /api/bot/pipeline/blockers` `{ client, market?, stage?, kind, note }` and `GET /api/bot/pipeline/blockers?client=` | kinds `login, captcha, credits, tool_missing, contradiction, missing_export, other` |

Owner routes (`/api/owner/pipeline/*`, owner only): `GET /clients`, `POST /clients`, `GET /clients/:id`, `PATCH /clients/:id`, `POST /clients/:id/link` `{ orgId, brandId }` (or `{ brandId: null }` to unlink), `POST /clients/:id/publish-prompts` `{ market? }`, `GET /files/:id` (with content), `POST /files/:id/review`, `POST /blockers/:id/resolve`.

Not built: the owner console page for this (the routes work and are tested), `draft.v1` (drafts as structured pieces of the Content studio; the files are stored whole for now), a push notice to the owner on a blocker, reading `.xlsx` (agents send csv).
