// Carousel EN, 2026-11-05: "Why does my page rank on Google but never get cited by AI?" Uses ../kit-visual/componentes.cjs (THEME=light for the light version).
// Every figure is a quote from developer documentation: Claude Platform Docs (undated, checked 4 Nov 2026), Perplexity API changelog (Oct 2026),
// xAI docs (search tools and citations pages, no date shown, checked 5 Nov 2026). Quotes verified on the pages on 5 Nov 2026. Developer APIs, not how consumer apps choose citations.
const { rp, slide, hero, compare, callout, note, facts, steps, table } = require('../kit-visual/componentes.cjs');
const T = 7;
module.exports = { file: 'en-AI-reads-more-than-it-quotes', slides: [
  slide({ kicker: 'RANKED, NOT CITED', i: 1, total: T, size: 84, title: `Your page ranks on Google. ${rp('Why doesn’t AI cite it?')}`,
    body: `${hero({ size: 300, num: '150', label: 'characters: the most of a cited page that Claude’s web search returns as cited text', sub: 'One documented reason: AI reads more than it quotes.' })}`,
    src: 'Claude Platform Docs, web search tool: “cited_text: Up to 150 characters of the cited content.” Page has no date; checked 4 Nov 2026.' }),
  slide({ kicker: 'THE LIMITS', i: 2, total: T, size: 84, title: `Every engine sets ${rp('its own limits')}`,
    body: facts([
      { k: 'CLAUDE · PLATFORM DOCS · CHECKED 4 NOV 2026', v: 'cited_text: “Up to 150 characters of the cited content”', hl: true },
      { k: 'PERPLEXITY · AGENT API PRESETS · OCT 2026', v: '“web_search max_tokens and max_tokens_per_page rise from 2,000 to 4,000”' },
      { k: 'XAI · SEARCH TOOLS DOCS · CHECKED 5 NOV 2026', v: 'allowed_domains: “Only search within specific domains (max 5)”' },
      { k: 'XAI · CITATIONS DOCS · CHECKED 5 NOV 2026', v: '“not every URL in this list will necessarily be directly referenced in the final answer”' }]),
    src: 'Developer documentation, quoted as written. Not how consumer apps choose citations.' }),
  slide({ kicker: 'READS MORE', i: 3, total: T, size: 84, title: `Engines read ${rp('more of your page')} than they quote`,
    body: `${compare({ left: { lab: 'PERPLEXITY · BEFORE', big: '2,000', text: 'web_search max_tokens and max_tokens_per_page' }, right: { lab: 'PERPLEXITY · OCT 2026', big: '4,000', text: 'Same settings, low, medium and high presets' }, hl: 1 })}
${callout('Read: up to 4,000 tokens per page (Perplexity). Quoted: up to 150 characters (Claude). The quote is the short part.', { grow: true, size: 44 })}`,
    src: 'Perplexity API changelog, Oct 2026 (Agent API presets). Claude Platform Docs, checked 4 Nov 2026. Different engines and units.' }),
  slide({ kicker: 'SEEN IS NOT CITED', i: 4, total: T, size: 84, title: `A source it saw is ${rp('not always a source it cites')}`,
    body: `${callout('“…not every URL in this list will necessarily be directly referenced in the final answer.”', { size: 50 })}
${note('xAI docs, on the sources list returned with an answer. Retrieved and cited are two lists: measure both.')}
${callout('Ranking can get you retrieved. A short, self-contained claim gives it something to quote.', { grow: true, size: 42 })}`,
    src: 'xAI docs, citations page, checked 5 Nov 2026. Last line: my read.' }),
  slide({ kicker: 'WHAT I WOULD DO', i: 5, total: T, size: 92, title: `This week, ${rp('15 minutes')}`,
    body: steps([
      ['10 min · Rewrite the key claims', 'Pick your top page. One sentence per section, under 150 characters, with the number and the source inside.'],
      ['2 min · Answer on the first screen', 'Put the answer where the page starts, not after the intro.'],
      ['3 min · Start a sheet', 'Same prompts every month. Log retrieved vs cited, engine by engine.']]) }),
  slide({ kicker: 'THE SHEET', i: 6, total: T, size: 84, title: `Retrieved vs cited, ${rp('engine by engine')}`,
    body: `${table({ head: ['PROMPT', 'ENGINE', 'RETRIEVED', 'CITED'], rows: [['Your prompt 1', 'ChatGPT', 'yes / no', 'yes / no'], ['Your prompt 1', 'Perplexity', 'yes / no', 'yes / no'], ['Your prompt 1', 'Claude', 'yes / no', 'yes / no'], ['Your prompt 1', 'Grok', 'yes / no', 'yes / no'], ['Your prompt 2', '…', '…', '…']], hlCol: 3 })}
${note('Retrieved: your URL is in the sources the engine shows. Cited: the answer quotes or links your page. One row per prompt and engine, same date each month.')}`,
    src: 'A template, not data. Every engine sets different limits, so compare each engine with itself over time.' }),
  slide({ kicker: 'A NOTE ON THE SOURCES', i: 7, total: T, size: 84, title: `What these docs ${rp('do not show')}`,
    body: `${note('These are developer docs for the APIs, not how the consumer apps choose citations. The Claude and xAI pages show no date, so I give the day I checked them.')}
${callout('Which page on your site would you rewrite first, and why?', { grow: true, size: 54 })}
<div class="src">Sources: Claude Platform Docs, web search tool (checked 4 Nov 2026). Perplexity API changelog (Oct 2026). xAI documentation, search tools and citations (checked 5 Nov 2026). Links in the first comment.</div>` }),
] };
