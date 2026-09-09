"""Extracts brand/product/ASIN mentions from an engine's answer text.

Baseline approach: alias-based string matching against the catalog, plus the
position the product appears at in the answer (numbered lists are common in
these answers, so "position 1" is a reasonable proxy for "top recommendation").

This is intentionally simple and deterministic so it's easy to unit test and
reason about. The natural upgrade path (noted in README) is to replace
`extract_mentions` with an LLM-based classifier call for messier, non-listy
answer formats -- the rest of the pipeline (storage, SOV math, dashboard)
doesn't need to change when you do that swap.
"""
from __future__ import annotations

import json
import re
from dataclasses import dataclass
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / "data"


@dataclass
class Mention:
    brand: str
    product: str
    asin: str
    position: int | None  # 1-indexed rank in the answer, if detectable


def _load_catalog() -> list[dict]:
    return json.loads((DATA_DIR / "catalog.json").read_text())["products"]


_CATALOG = _load_catalog()


def _find_position(text: str, alias: str) -> int | None:
    """If the alias appears right after a numbered-list marker like '1.', '2)',
    return that number; otherwise None."""
    pattern = re.compile(r"(\d+)[\.\)]\s*" + re.escape(alias), re.IGNORECASE)
    m = pattern.search(text)
    return int(m.group(1)) if m else None


def extract_mentions(answer_text: str) -> list[Mention]:
    mentions: list[Mention] = []
    for product in _CATALOG:
        for alias in product["aliases"]:
            if re.search(re.escape(alias), answer_text, re.IGNORECASE):
                mentions.append(
                    Mention(
                        brand=product["brand"],
                        product=product["product"],
                        asin=product["asin"],
                        position=_find_position(answer_text, alias),
                    )
                )
                break  # don't double count the same product via multiple aliases
    return mentions
