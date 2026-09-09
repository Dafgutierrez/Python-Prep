"""Builds the prompt bank used to probe AI shopping/answer engines.

Two sources feed the bank:
  1. Seed questions grounded in real shopper phrasing patterns (data/seed_questions.json).
  2. Template-based expansion that swaps in brand/product/qualifier slots, so the
     bank covers more surface area than the seeds alone without turning into
     generic keyword-stuffed junk (each template still reads like a real question).

Every prompt keeps an `intent` tag (best_of, budget, use_case, comparison, gift,
troubleshooting, purchase_decision) so downstream share-of-voice analysis can be
sliced by shopping intent, not just averaged across everything.
"""
from __future__ import annotations

import json
import itertools
from dataclasses import dataclass, field
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / "data"

QUALIFIERS = ["for beginners", "for daily commuting", "for the office", "for travel"]
BUDGETS = ["$30", "$50", "$75", "$100", "$150"]

COMPARISON_TEMPLATE = "is {a} or {b} better {qualifier}"
BUDGET_TEMPLATE = "what are the best wireless earbuds under {budget}"
BEST_OF_TEMPLATE = "what wireless earbuds would you recommend {qualifier}"


@dataclass
class Prompt:
    text: str
    intent: str
    source: str  # "seed" or "generated"

    def to_dict(self) -> dict:
        return {"text": self.text, "intent": self.intent, "source": self.source}


def load_seeds() -> list[Prompt]:
    raw = json.loads((DATA_DIR / "seed_questions.json").read_text())
    return [Prompt(text=s["text"], intent=s["intent"], source="seed") for s in raw["seeds"]]


def load_catalog_brands() -> list[str]:
    raw = json.loads((DATA_DIR / "catalog.json").read_text())
    # de-dupe while preserving order
    seen = []
    for p in raw["products"]:
        if p["brand"] not in seen:
            seen.append(p["brand"])
    return seen


def generate_expansions(brands: list[str]) -> list[Prompt]:
    generated: list[Prompt] = []

    for budget in BUDGETS:
        generated.append(Prompt(BUDGET_TEMPLATE.format(budget=budget), "budget", "generated"))

    for qualifier in QUALIFIERS:
        generated.append(Prompt(BEST_OF_TEMPLATE.format(qualifier=qualifier), "best_of", "generated"))

    # A handful of head-to-head brand comparisons rather than the full cartesian
    # product (which would produce unrealistic, never-asked pairings).
    plausible_pairs = list(itertools.combinations(brands, 2))[: len(brands)]
    for a, b in plausible_pairs:
        qualifier = QUALIFIERS[hash((a, b)) % len(QUALIFIERS)]
        generated.append(Prompt(COMPARISON_TEMPLATE.format(a=a, b=b, qualifier=qualifier), "comparison", "generated"))

    return generated


def build_prompt_bank() -> list[Prompt]:
    seeds = load_seeds()
    brands = load_catalog_brands()
    generated = generate_expansions(brands)

    bank = seeds + generated
    # de-dupe by normalized text
    seen_text = set()
    deduped: list[Prompt] = []
    for p in bank:
        key = p.text.strip().lower()
        if key not in seen_text:
            seen_text.add(key)
            deduped.append(p)
    return deduped


if __name__ == "__main__":
    bank = build_prompt_bank()
    out_path = DATA_DIR / "prompt_bank.json"
    out_path.write_text(json.dumps([p.to_dict() for p in bank], indent=2))
    print(f"Wrote {len(bank)} prompts ({sum(1 for p in bank if p.source == 'seed')} seed, "
          f"{sum(1 for p in bank if p.source == 'generated')} generated) to {out_path}")
