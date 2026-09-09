"""Orchestrates one end-to-end run: prompt bank -> engines -> classifier -> storage.

In production this is the function a scheduler (cron/Airflow/etc.) would call
on a recurring cadence (e.g. weekly, matching the Azoma-style "Weekly Share of
Voice Insight" cadence). Each call creates one `run` row so SOV can be trended
over time by comparing runs.
"""
from __future__ import annotations

from . import storage
from .classifier import extract_mentions
from .engines import all_engines
from .prompt_bank import build_prompt_bank


def run_pipeline(label: str, week_index: int = 0) -> int:
    storage.init_db()
    run_id = storage.create_run(label)
    prompts = build_prompt_bank()
    engines = all_engines()

    for engine in engines:
        for prompt in prompts:
            resp = engine.answer(prompt.text, week_index=week_index)
            response_id = storage.save_response(
                run_id=run_id,
                engine=resp.engine,
                prompt=prompt.text,
                intent=prompt.intent,
                mode=resp.mode,
                text=resp.text,
            )
            mentions = extract_mentions(resp.text)
            if mentions:
                storage.save_mentions(response_id, run_id, resp.engine, mentions)

    return run_id


if __name__ == "__main__":
    import sys

    label = sys.argv[1] if len(sys.argv) > 1 else "manual-run"
    rid = run_pipeline(label)
    print(f"Run {rid} ({label}) complete.")

    print("\nShare of voice by brand:")
    for row in storage.share_of_voice_by_brand(rid):
        print(f"  {row['brand']:<20} {row['sov_pct']:>5}%  ({row['mentions']} mentions)")

    print("\nShare of voice by ASIN:")
    for row in storage.share_of_voice_by_asin(rid):
        pos = f", avg pos {row['avg_position']}" if row["avg_position"] else ""
        print(f"  {row['asin']}  {row['product']:<32} {row['sov_pct']:>5}%{pos}")
