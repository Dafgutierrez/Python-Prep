# Agent delivery API: how Fatima, Patrick and Rafael send their files to Geonos (2026-10-19)

Internal. Built from the flow Dafne pasted on 2026-10-19 (Elena, Martin, Rafael, Lucia, Fatima and the Desk, with Patrick as QA, per client and per market `us-en` and `mx-es`). Contract: `app-api/CONTRACT.md` section 15. Earlier mapping and decisions: `docs/GROK-PIPELINE.md`.

Base URL today: `https://geonos-demo.vercel.app` (it changes when the real domain is attached; keep it in one variable, `GEONOS_API`). Every call carries `Authorization: Bearer gnb_...` (the key of that agent, saved as a secret in the agent and never written in a chat).

## 1. What is built

- **Three roles, one key each.** Fatima `pipeline_delivery` (uploads and reads her stage, `fatima`). Rafael `pipeline_seo` (optional, stage `rafael`). Patrick `pipeline_qa` (reads everything, approves or rejects, opens clients, uploads history already approved). Elena, Martin, Lucia, the Desk and Site Audit need no key. A key can be limited to one market.
- **Files per client, market, stage, kind and version.** md or csv. Geonos checks every file (the server side of `pipeline_checks.py`) and answers with the exact failing lines. Nothing is overwritten: a correction is the next version and its name ends in `-v2`.
- **Approval.** A file starts `submitted`. Patrick marks it `ok` (the `_OK`) or `rejected` with notes and pastes the output of his own checks. Only approved files can be read by the other delivery agents.
- **The prompts table feeds the dashboard.** An approved `prompts` file becomes the tracked set of that client and market (the newest approved set wins, older ones are retired). When Dafne links the client to a workspace brand, the prompts appear in Prompt research as **suggested** (the customer accepts each one). The keyword volume stays with the prompt row and says whether it belongs to the keyword (`exact`) or to the closest keyword (`closest`), never to the prompt.
- **Status per client.** Which stages are approved, in review, need a fix, partial or blocked, what is missing, and whether the dashboard has its prompts.
- **Blockers.** Login, captcha, credits, missing tool, contradiction between sources or missing export: reported with one call, shown in the status, resolved by Dafne.

Not built yet: an owner console page for all this (the routes exist and are tested), `draft.v1` (the drafts are stored whole, not yet split into Content studio pieces), a push notice on a blocker, reading `.xlsx` (the agents send csv).

## 2. Feedback on the flow

What already works, keep it: one file per market in its own language, no invented data, `BLOQUEADO` before drafting when two sources contradict, nothing overwritten, QA between every step, only `_OK` files are read. The API turns each of those rules into a check, so they stop depending on memory.

What to change or decide:

1. **Send the prompts table as rows.** `POST` a list of objects (`rows`) and Geonos writes the csv. Hand-made csv with commas, accents and quotes is the main thing that breaks.
2. **One prompts table, two possible senders.** Rafael's table (with keywords, volume, KD, position) is the source; Fatima's final one "with the exact table" is what is tracked. Both upload kind `prompts`; the newest approved version wins. Agree who sends it to avoid two approved sets that differ.
3. **`keyword_match` is required on every row** (`exact`, `closest` or `none`). The test run showed 57 of 59 prompts had no exact keyword. With `closest`, the volume is shown as the closest keyword's volume. With `none`, keyword and volume stay empty (`sin dato` is text and is refused in a number column).
4. ~~Add a `database` column to Rafael's keyword csv.~~ **Withdrawn 2026-10-19.** A real Semrush export has no such column and the agents must send it "as exported". The market of the upload decides the database. The `keywords` kind will accept the raw export after the test (see `docs/DELIVERABLES-TO-DASHBOARD.md`).
5. **Coverage as a csv with an `assignment` column** (`prompt`, `new_prompt` or `excluded`). The 500 (US) and 200 (MX) a month rule is checked: a keyword at or above the threshold with no assignment fails the file. An excluded keyword needs a `reason`.
6. **Close the language leak.** `sin dato` in an English file and `no data` in a Spanish file now fail the checks.
7. **Intermediate files (Elena, Martin, Lucia) are optional.** Patrick can store them as history with `approve: true`. Geonos keeps them but does not use them. Do not make the other agents depend on them.
8. **Drafts file name** must be `{client}_drafts_{market}_{YYYY-MM-DD}_{batch}.md`, and `-v2` for a correction. Geonos checks it.
9. **Contradictions** ("90+ checks in 16 categories" against "36 in 8"): the public rule is "100+ checks across 16 categories" and the 36 are the AI-readiness checks inside them. Put that in the facts the agents use, or keep marking `BLOQUEADO`.
10. **Blockers go to Geonos too.** Besides telling Patrick, call the blocker route so Dafne sees it in one place.
11. **Do not send customer secrets or personal data** in any file (logins, emails of people from comments, tokens). Public links, titles and short quotes only.
12. **One thing to confirm with Dafne:** whether the client in the pipeline is also a Geonos customer. If it is, she links it once and the prompts land in that customer's dashboard as suggested.

## 3. Quickstart (for the agents)

```
export GEONOS_API=https://geonos-demo.vercel.app
export GEONOS_KEY=gnb_...        # this agent's own key, from the secret store
H="Authorization: Bearer $GEONOS_KEY"

# 0. what may I do? (stages, kinds, csv columns, rules)
curl -s -H "$H" $GEONOS_API/api/bot/pipeline/skills

# 1. Patrick opens a client (once per client)
curl -s -X POST -H "$H" -H 'content-type: application/json' $GEONOS_API/api/bot/pipeline/clients \
  -d '{"slug":"acme-co","name":"Acme Co","url":"https://acme.example","markets":["us-en","mx-es"],"batch":"lote-1","package":"full"}'

# 2. Fatima uploads the prompts table (rows, not csv text)
curl -s -X POST -H "$H" -H 'content-type: application/json' $GEONOS_API/api/bot/pipeline/files -d '{
  "client":"acme-co","market":"mx-es","stage":"fatima","kind":"prompts","version":1,
  "filename":"acme-co_prompts_mx-es_2026-10-19.csv",
  "rows":[{"prompt_id":"P-01","prompt":"cuál es la mejor agencia de seo en méxico","language":"es","journey_stage":"consideración","category":"agencias","keyword":"agencia de seo","keyword_match":"closest","volume":1300,"kd":55}]}'
#  201 = saved, waiting for QA.  422 = the checks failed, read checks.issues, fix and send the SAME version again (nothing was saved).
#  409 = that version exists, send the next one and end the name in -v2.

# 3. Fatima uploads a markdown deliverable (content is the file text)
curl -s -X POST -H "$H" -H 'content-type: application/json' $GEONOS_API/api/bot/pipeline/files \
  -d '{"client":"acme-co","market":"mx-es","stage":"fatima","kind":"drafts","version":1,"filename":"acme-co_drafts_mx-es_2026-10-19_lote-1.md","content":"# Borradores ..."}'

# 4. Patrick approves or rejects (rejected needs notes)
curl -s -X POST -H "$H" -H 'content-type: application/json' $GEONOS_API/api/bot/pipeline/files/FILE_ID/review \
  -d '{"decision":"ok","check_output":"pipeline_checks.py: 0 errores"}'

# 5. status of a client, tracked prompts, files, blockers
curl -s -H "$H" "$GEONOS_API/api/bot/pipeline/status?client=acme-co"
curl -s -H "$H" "$GEONOS_API/api/bot/pipeline/prompts?client=acme-co&market=mx-es"
curl -s -H "$H" "$GEONOS_API/api/bot/pipeline/files?client=acme-co&status=ok"
curl -s -X POST -H "$H" -H 'content-type: application/json' $GEONOS_API/api/bot/pipeline/blockers \
  -d '{"client":"acme-co","market":"mx-es","stage":"fatima","kind":"credits","note":"el scraper no tiene créditos"}'
```

Stages and kinds: `elena` (research, seeds, prompts_draft), `martin` (brief), `rafael` (keywords, prompts, seo_recommendations, coverage), `lucia` (channels), `fatima` (matrix, calendar, drafts, prompts). md for text, csv for tables. A stage is done when every required kind has an approved latest version: elena research, martin brief, rafael all four, lucia channels, fatima matrix, calendar, drafts and prompts.

CSV columns. `prompts`: required `prompt_id` (P-01 or PS-01), `prompt` (3 to 300 characters), `language` (en for us-en, es for mx-es), `journey_stage` (Awareness, Consideration, Decision, Retention, or Descubrimiento, Consideración, Decisión, Retención), `category` (Informational, Product, Competitive, Reputational, Mixed, or Informativo, Producto, Competitivo, Reputacional, Mixto), `keyword`, `keyword_match`, `volume`; optional `market`, `kd`, `intent`, `cpc`, `serp_features`, `position`, `source`. `keywords`: the raw Semrush Keyword Magic export exactly as Semrush wrote it (`Keyword, Intent, Volume, Keyword Difficulty, CPC (MXN), SERP Features`); required `Keyword` and `Volume`; blank is no data, `-1` difficulty is no data, other columns are kept; the market of the upload decides the database; a CPC in USD in a mx-es Keyword Magic file (or MXN in a us-en one) is refused. The CPC currency rule: Keyword Magic follows the header (`CPC (MXN)`); Keyword Gap writes a bare `CPC` and it is USD in every database, even for Mexico (checked by Grok on the real exports: about 18 times lower than Keyword Magic on ~160 shared keywords). The upload response returns `checks.cpc_currency` so the dashboard never has to guess. `keyword_gap`: the raw Semrush Keyword Gap export (`Keyword, Intents, Volume, Keyword Difficulty, CPC, Competition Density`, one position column and one `(pages)` column per domain, `Results`; position 0 is not ranking). Up to 1,400 KB and 15,000 rows for these two. `coverage`: `keyword`, `volume`, `assignment`; optional `prompt_id`, `reason`, `database`, `kd`. `seeds`: `seed_id` (S-01), `term`; optional `engine`, `competitor`, `source`. `GET /api/bot/pipeline/skills` returns the same list for the agent's own role.

## 4. Instrucciones para los agentes (para pegar)

**Para todos.** Geonos recibe tus archivos por API con tu propia clave (`gnb_`), guardada como secreto. Nunca la escribas en un chat ni en un archivo. Base: la variable `GEONOS_API`. Antes de subir, corre `pipeline_checks.py` como siempre. Después de subir, lee la respuesta: 201 quedó guardado y espera a Patrick; 422 trae las líneas que fallaron (corrige y manda la MISMA versión, no se guardó nada); 409 esa versión ya existe (manda la siguiente, y el nombre termina en `-v2`). Si hay login, captcha, créditos agotados, una herramienta que falta o dos fuentes que se contradicen, llama a `/api/bot/pipeline/blockers`, avisa a Patrick y detente.

**Fatima.** Sube por mercado: `matrix`, `calendar`, `drafts` (nombre `{cliente}_drafts_{mercado}_{fecha}_{lote}.md`) y `prompts` (la tabla exacta de Rafael, la que se trackea). Manda `prompts` como `rows`, no como texto csv. Cada fila lleva `keyword_match` (`exact`, `closest` o `none`); con `none` deja `keyword` y `volume` vacíos. Nunca escribas “sin dato” en una columna numérica. Los archivos van completos en el idioma de su mercado (“sin dato” en mx-es, “no data” en us-en). Consulta `/api/bot/pipeline/status?client=` para ver qué falta.

**Patrick.** Abre cada cliente con `POST /api/bot/pipeline/clients`. Revisa cada archivo, y decide con `POST /api/bot/pipeline/files/{id}/review`: `ok` (es el `_OK`) o `rejected` con notas (las líneas que fallaron). Pega ahí mismo la salida de `pipeline_checks.py` en `check_output`. Puedes guardar archivos intermedios ya aprobados con `approve: true`. Reporta los bloqueos con la ruta de bloqueos para que Dafne los vea.

**Rafael (opcional).** Sube `keywords` (con la columna `database`: `us` o `mx`), `coverage` (con `assignment`: `prompt`, `new_prompt` o `excluded`; toda keyword con 500+ búsquedas en US o 200+ en MX debe tener asignación; una excluida lleva `reason`), `prompts` y `seo_recommendations`. Si faltan exportaciones de términos núcleo (GEO, AEO, AI visibility, ChatGPT, SEO para IA), reporta un bloqueo `missing_export`.

## 5. Setup for Dafne (once)

1. Run `app-api/migrations/015_pipeline.sql` in the Neon SQL editor (safe to run twice; it is also at the end of `setup-all.sql`).
2. In the owner console, Bots, create three bots: `fatima` (role Delivery agent), `patrick` (role QA) and, if you want it, `rafael` (role SEO agent). Each key is shown once: copy it into that agent's secret store. Limit a bot to one market with its Markets field if you want.
3. Give the agents the quickstart above (section 3) and their paragraph in section 4.
4. When a client is also a Geonos customer: `POST /api/owner/pipeline/clients/{id}/link` with the workspace `orgId` and `brandId`. Approved prompts then appear in that customer's Prompt research as suggested.

## 6. Security notes

Keys are stored as sha256 hashes and never returned after creation. A pipeline key opens `/api/bot/pipeline/*` and `/api/bot/me`; the task queue routes answer 403 `missing_scope` (these roles have no task scopes), and it gets 401 on every customer and owner route. A customer or owner token gets 401 on the bot routes. A bot never receives an organization id, a brand id or a customer name: the link between a pipeline client and a workspace is owner only. Files are stored whole (up to 1,000 KB each) and are not visible to a delivery agent until approved. Limits: 60 requests a minute per bot, 5,000 rows per csv. A bot event (no file bodies) is written for every upload, review and blocker, and the owner actions go to the audit log.
