"""End-to-end demo: simulates several weekly pipeline runs (mock engines,
since no API keys are configured) and exports the results as JSON for the
dashboard artifact.

Usage:
    python run_demo.py
"""
from __future__ import annotations

import json
import random
from datetime import datetime, timedelta, timezone
from pathlib import Path

from src import storage
from src.pipeline import run_pipeline

DATA_DIR = Path(__file__).resolve().parent / "data"
EXPORT_PATH = DATA_DIR / "dashboard_export.json"

WEEKS = 8


def main() -> None:
    # start clean so re-running the demo doesn't accumulate duplicate runs
    if storage.DB_PATH.exists():
        storage.DB_PATH.unlink()
    storage.init_db()

    tracked_brand = json.loads((DATA_DIR / "catalog.json").read_text())["tracked_brand"]

    weekly_snapshots = []
    today = datetime.now(timezone.utc).date()

    for i in range(WEEKS):
        week_start = today - timedelta(weeks=(WEEKS - i))
        label = f"week-of-{week_start.isoformat()}"
        run_id = run_pipeline(label, week_index=i)

        weekly_snapshots.append(
            {
                "run_id": run_id,
                "week_start": week_start.isoformat(),
                "label": label,
                "by_brand": storage.share_of_voice_by_brand(run_id),
                "by_asin": storage.share_of_voice_by_asin(run_id),
                "by_brand_and_engine": storage.share_of_voice_by_brand_and_engine(run_id),
                "prompts": storage.prompt_breakdown(run_id, tracked_brand),
            }
        )

    latest = weekly_snapshots[-1]
    export = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "category": "wireless earbuds",
        "tracked_brand": tracked_brand,
        "weekly": weekly_snapshots,
        "latest": latest,
    }
    EXPORT_PATH.write_text(json.dumps(export, indent=2))
    print(f"Simulated {WEEKS} weekly runs (mock engines). Exported dashboard data to {EXPORT_PATH}")
    print(f"\nLatest week ({latest['label']}) share of voice by brand:")
    for row in latest["by_brand"]:
        print(f"  {row['brand']:<20} {row['sov_pct']:>5}%")


if __name__ == "__main__":
    main()
