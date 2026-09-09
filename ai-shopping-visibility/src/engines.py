"""Abstraction over the AI engines being probed for shopping visibility.

Each engine implements `answer(prompt: str) -> str`. Real engines are thin
wrappers around the provider's official API and only activate when the
matching environment variable is set; otherwise the engine falls back to
a mock responder so the rest of the pipeline (classification, storage,
dashboard) can be built and tested end-to-end with zero API keys.

To go live for a given engine, set its env var and swap MOCK_MODE checks
will pick it up automatically:
  OPENAI_API_KEY        -> ChatGPT
  GOOGLE_API_KEY         -> Gemini
  ANTHROPIC_API_KEY      -> Claude
  PERPLEXITY_API_KEY     -> Perplexity

Alexa for Shopping / Amazon Rufus intentionally has NO engine implementation
here. There is no public API for it; the only way to query it programmatically
is automating the consumer Alexa app/device, which risks violating Amazon's
Conditions of Use and can get accounts/devices flagged or banned. See README.md
for why that channel is treated as "buy the data from a vendor" instead of
"build it".
"""
from __future__ import annotations

import os
import random
from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass
class EngineResponse:
    engine: str
    prompt: str
    text: str
    mode: str  # "live" or "mock"


class Engine(ABC):
    name: str
    env_var: str

    def is_live(self) -> bool:
        return bool(os.environ.get(self.env_var))

    @abstractmethod
    def _call_live(self, prompt: str) -> str:
        ...

    @abstractmethod
    def _call_mock(self, prompt: str, week_index: int) -> str:
        ...

    def answer(self, prompt: str, week_index: int = 0) -> EngineResponse:
        if self.is_live():
            text = self._call_live(prompt)
            mode = "live"
        else:
            text = self._call_mock(prompt, week_index)
            mode = "mock"
        return EngineResponse(engine=self.name, prompt=prompt, text=text, mode=mode)


# ---------------------------------------------------------------------------
# Mock response generation
#
# These are NOT meant to imitate any real engine's output verbatim. They're a
# lightweight simulator: given a prompt, pick a plausible-sounding shopping
# answer that mentions 2-4 products from the catalog, so the classifier and
# SOV math have realistic-shaped input to work with during development.
# ---------------------------------------------------------------------------

def _load_catalog_products() -> list[dict]:
    import json
    from pathlib import Path

    data_dir = Path(__file__).resolve().parent.parent / "data"
    return json.loads((data_dir / "catalog.json").read_text())["products"]


def _load_tracked_brand() -> str:
    import json
    from pathlib import Path

    data_dir = Path(__file__).resolve().parent.parent / "data"
    return json.loads((data_dir / "catalog.json").read_text())["tracked_brand"]


_CATALOG = _load_catalog_products()
_TRACKED_BRAND = _load_tracked_brand()


def _weighted_picks(rng: random.Random, k: int, week_index: int) -> list[dict]:
    """Weighted sample without replacement. The tracked brand's weight rises
    gently with week_index so the demo trend line isn't flat across all 8
    simulated weeks -- everything else fluctuates but has no persistent drift."""
    weights = [
        (2.0 + 0.35 * week_index) if p["brand"] == _TRACKED_BRAND else rng.uniform(0.8, 1.2)
        for p in _CATALOG
    ]
    remaining = list(zip(_CATALOG, weights))
    picks: list[dict] = []
    while remaining and len(picks) < k:
        items, w = zip(*remaining)
        chosen = rng.choices(items, weights=w, k=1)[0]
        picks.append(chosen)
        remaining = [(p, wt) for p, wt in remaining if p["product"] != chosen["product"]]
    return picks


def _simulate_answer(prompt: str, rng: random.Random, week_index: int) -> str:
    picks = _weighted_picks(rng, k=min(rng.choice([2, 3, 3, 4]), len(_CATALOG)), week_index=week_index)
    lines = []
    for i, p in enumerate(picks, start=1):
        reason = rng.choice([
            "great battery life and solid noise cancelling",
            "a comfortable fit and clear call quality",
            "strong value for the price",
            "excellent sound quality for the price point",
            "reliable Bluetooth connection and a sturdy case",
        ])
        lines.append(f"{i}. {p['product']} - {reason}.")
    intro = rng.choice([
        "Based on current reviews, here are a few solid options:",
        "Here are some wireless earbuds worth considering:",
        "A few models stand out for that:",
    ])
    return intro + "\n" + "\n".join(lines)


class ChatGPTEngine(Engine):
    name = "ChatGPT"
    env_var = "OPENAI_API_KEY"

    def _call_live(self, prompt: str) -> str:
        raise NotImplementedError(
            "Live ChatGPT calls are not wired up in this demo. Implement with "
            "the official OpenAI SDK (chat.completions / responses API) once "
            "OPENAI_API_KEY is set and you're ready to go live."
        )

    def _call_mock(self, prompt: str, week_index: int) -> str:
        return _simulate_answer(prompt, random.Random(f"chatgpt::{prompt}"), week_index)


class GeminiEngine(Engine):
    name = "Gemini"
    env_var = "GOOGLE_API_KEY"

    def _call_live(self, prompt: str) -> str:
        raise NotImplementedError(
            "Live Gemini calls are not wired up in this demo. Implement with "
            "the official google-generativeai SDK once GOOGLE_API_KEY is set."
        )

    def _call_mock(self, prompt: str, week_index: int) -> str:
        return _simulate_answer(prompt, random.Random(f"gemini::{prompt}"), week_index)


class ClaudeEngine(Engine):
    name = "Claude"
    env_var = "ANTHROPIC_API_KEY"

    def _call_live(self, prompt: str) -> str:
        raise NotImplementedError(
            "Live Claude calls are not wired up in this demo. Implement with "
            "the official anthropic SDK once ANTHROPIC_API_KEY is set."
        )

    def _call_mock(self, prompt: str, week_index: int) -> str:
        return _simulate_answer(prompt, random.Random(f"claude::{prompt}"), week_index)


class PerplexityEngine(Engine):
    name = "Perplexity"
    env_var = "PERPLEXITY_API_KEY"

    def _call_live(self, prompt: str) -> str:
        raise NotImplementedError(
            "Live Perplexity calls are not wired up in this demo. Implement "
            "with Perplexity's chat completions API once PERPLEXITY_API_KEY is set."
        )

    def _call_mock(self, prompt: str, week_index: int) -> str:
        return _simulate_answer(prompt, random.Random(f"perplexity::{prompt}"), week_index)


def all_engines() -> list[Engine]:
    return [ChatGPTEngine(), GeminiEngine(), ClaudeEngine(), PerplexityEngine()]
