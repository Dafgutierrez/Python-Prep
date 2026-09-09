"""SQLite storage for pipeline runs and share-of-voice computation.

Schema:
  runs        one row per pipeline execution (a "week" in the demo)
  responses   one row per (run, engine, prompt) query
  mentions    one row per product mention found inside a response

Share of voice for a product in a given run = (# of that product's mentions)
/ (total mentions across all products) within that run, optionally filtered
by engine or intent. This mirrors how Azoma-style tools define SOV: a
percentage of "voice" (mention share), not a percentage of prompts answered.
"""
from __future__ import annotations

import sqlite3
from contextlib import contextmanager
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent / "data" / "visibility.db"

SCHEMA = """
CREATE TABLE IF NOT EXISTS runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    run_id INTEGER NOT NULL REFERENCES runs(id),
    engine TEXT NOT NULL,
    prompt TEXT NOT NULL,
    intent TEXT NOT NULL,
    mode TEXT NOT NULL,
    text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS mentions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    response_id INTEGER NOT NULL REFERENCES responses(id),
    run_id INTEGER NOT NULL REFERENCES runs(id),
    engine TEXT NOT NULL,
    brand TEXT NOT NULL,
    product TEXT NOT NULL,
    asin TEXT NOT NULL,
    position INTEGER
);
"""


@contextmanager
def connect():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_db() -> None:
    with connect() as conn:
        conn.executescript(SCHEMA)


def create_run(label: str) -> int:
    from datetime import datetime, timezone

    with connect() as conn:
        cur = conn.execute(
            "INSERT INTO runs (label, created_at) VALUES (?, ?)",
            (label, datetime.now(timezone.utc).isoformat()),
        )
        return cur.lastrowid


def save_response(run_id: int, engine: str, prompt: str, intent: str, mode: str, text: str) -> int:
    with connect() as conn:
        cur = conn.execute(
            "INSERT INTO responses (run_id, engine, prompt, intent, mode, text) VALUES (?, ?, ?, ?, ?, ?)",
            (run_id, engine, prompt, intent, mode, text),
        )
        return cur.lastrowid


def save_mentions(response_id: int, run_id: int, engine: str, mentions) -> None:
    with connect() as conn:
        conn.executemany(
            "INSERT INTO mentions (response_id, run_id, engine, brand, product, asin, position) "
            "VALUES (?, ?, ?, ?, ?, ?, ?)",
            [(response_id, run_id, engine, m.brand, m.product, m.asin, m.position) for m in mentions],
        )


def share_of_voice_by_brand(run_id: int) -> list[dict]:
    with connect() as conn:
        total = conn.execute(
            "SELECT COUNT(*) AS c FROM mentions WHERE run_id = ?", (run_id,)
        ).fetchone()["c"]
        if total == 0:
            return []
        rows = conn.execute(
            "SELECT brand, COUNT(*) AS mentions FROM mentions WHERE run_id = ? "
            "GROUP BY brand ORDER BY mentions DESC",
            (run_id,),
        ).fetchall()
        return [
            {"brand": r["brand"], "mentions": r["mentions"], "sov_pct": round(100 * r["mentions"] / total, 2)}
            for r in rows
        ]


def share_of_voice_by_asin(run_id: int) -> list[dict]:
    with connect() as conn:
        total = conn.execute(
            "SELECT COUNT(*) AS c FROM mentions WHERE run_id = ?", (run_id,)
        ).fetchone()["c"]
        if total == 0:
            return []
        rows = conn.execute(
            "SELECT asin, product, brand, COUNT(*) AS mentions, "
            "AVG(CASE WHEN position IS NOT NULL THEN position END) AS avg_position "
            "FROM mentions WHERE run_id = ? GROUP BY asin ORDER BY mentions DESC",
            (run_id,),
        ).fetchall()
        return [
            {
                "asin": r["asin"],
                "product": r["product"],
                "brand": r["brand"],
                "mentions": r["mentions"],
                "sov_pct": round(100 * r["mentions"] / total, 2),
                "avg_position": round(r["avg_position"], 1) if r["avg_position"] is not None else None,
            }
            for r in rows
        ]


INTENT_CATEGORY = {
    "best_of": "Commercial",
    "budget": "Commercial",
    "use_case": "Commercial",
    "comparison": "Commercial",
    "gift": "Commercial",
    "purchase_decision": "Commercial",
    "troubleshooting": "Informational",
}


def prompt_breakdown(run_id: int, tracked_brand: str) -> list[dict]:
    """Per-prompt view mirroring a 'Tracked Prompts' table: how many of the
    responses to this exact prompt mentioned any tracked product, which
    brands showed up most, and whether the prompt leans Commercial vs
    Informational and Own Brand vs Generic (i.e. did our tracked brand
    show up at all for this prompt)."""
    with connect() as conn:
        prompts = conn.execute(
            "SELECT DISTINCT prompt, intent FROM responses WHERE run_id = ?", (run_id,)
        ).fetchall()

        out = []
        for p in prompts:
            prompt_text, intent = p["prompt"], p["intent"]
            responses = conn.execute(
                "SELECT id FROM responses WHERE run_id = ? AND prompt = ?", (run_id, prompt_text)
            ).fetchall()
            response_ids = [r["id"] for r in responses]
            if not response_ids:
                continue
            placeholders = ",".join("?" * len(response_ids))
            mention_rows = conn.execute(
                f"SELECT response_id, brand FROM mentions WHERE response_id IN ({placeholders})",
                response_ids,
            ).fetchall()

            responses_with_mentions = len({m["response_id"] for m in mention_rows})
            brand_counts: dict[str, int] = {}
            for m in mention_rows:
                brand_counts[m["brand"]] = brand_counts.get(m["brand"], 0) + 1
            top_mentions = sorted(brand_counts.items(), key=lambda kv: kv[1], reverse=True)[:3]

            out.append(
                {
                    "prompt": prompt_text,
                    "intent": intent,
                    "category": INTENT_CATEGORY.get(intent, "Commercial"),
                    "brand_scope": "Own Brand" if tracked_brand in brand_counts else "Non-Brand / Generic",
                    "responses": len(response_ids),
                    "mentions": len(mention_rows),
                    "mention_rate_pct": round(100 * responses_with_mentions / len(response_ids), 0),
                    "top_mentions": [b for b, _ in top_mentions],
                }
            )
        return sorted(out, key=lambda r: r["mention_rate_pct"], reverse=True)


def share_of_voice_by_brand_and_engine(run_id: int) -> list[dict]:
    with connect() as conn:
        totals_by_engine = {
            r["engine"]: r["c"]
            for r in conn.execute(
                "SELECT engine, COUNT(*) AS c FROM mentions WHERE run_id = ? GROUP BY engine", (run_id,)
            ).fetchall()
        }
        rows = conn.execute(
            "SELECT engine, brand, COUNT(*) AS mentions FROM mentions WHERE run_id = ? "
            "GROUP BY engine, brand ORDER BY engine, mentions DESC",
            (run_id,),
        ).fetchall()
        out = []
        for r in rows:
            total = totals_by_engine.get(r["engine"], 0)
            out.append(
                {
                    "engine": r["engine"],
                    "brand": r["brand"],
                    "mentions": r["mentions"],
                    "sov_pct": round(100 * r["mentions"] / total, 2) if total else 0.0,
                }
            )
        return out
