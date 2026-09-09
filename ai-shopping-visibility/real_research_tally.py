"""Tallies data/real_research.json -- how often each brand actually appears
across real, cited 2026 buying-guide searches for a representative set of
shopping-intent queries. This is NOT simulated and NOT self-answered; every
brand listed here was named in an actual search result with a citable URL
(see data/real_research.json for the sources).
"""
import json
from collections import Counter
from pathlib import Path

data = json.loads((Path(__file__).parent / "data" / "real_research.json").read_text())

counts = Counter()
per_prompt_count = len(data["prompts"])
for p in data["prompts"]:
    for brand in set(p["brands_recommended"]):  # de-dupe within a single prompt
        counts[brand] += 1

total_appearances = sum(counts.values())

print(f"{per_prompt_count} real, cited shopping-intent queries researched.\n")
print(f"{'Brand':<18} {'Appearances':>12} {'Share of appearances':>22}   In which prompts")
print("-" * 100)
for brand, n in counts.most_common():
    prompts_with_brand = [i for i, p in enumerate(data["prompts"]) if brand in p["brands_recommended"]]
    pct = 100 * n / total_appearances
    print(f"{brand:<18} {n:>12} {pct:>21.1f}%   {prompts_with_brand}")

print(f"\nTotal brand-appearances across all prompts: {total_appearances}")
print(f"Distinct brands surfaced: {len(counts)}")
