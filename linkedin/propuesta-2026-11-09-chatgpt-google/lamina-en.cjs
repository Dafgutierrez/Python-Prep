// Carousel EN, 2026-11-09: ChatGPT "one-fifth of Google". Premium kit; THEME=light for the light version. Every figure is sourced on the slide.
// Sources read 9 Nov 2026: 9to5Google and Big Technology (3 Nov 2026, Adam Fry), Ahrefs (Feb 2026), seoClarity (28 Oct 2026), Alphabet Q3 2026 results (28 Oct 2026).
const { C, rp, slideX, bars, compare, callout, note, facts, steps } = require('../kit-visual/componentes.cjs');
const T = 6;
const sub = (t) => `<div style="font-size:23px;color:${C.mute};font-weight:400;margin-top:4px">${t}</div>`;
module.exports = { file: 'en-chatgpt-one-fifth-of-google', slides: [
  slideX({ kicker: 'CHATGPT VS GOOGLE', i: 1, total: T, size: 88, title: `ChatGPT is “one-fifth of Google.” ${rp('Of what?')}`,
    lead: 'OpenAI says ChatGPT handles about one-fifth as many search-like queries as Google. It is OpenAI’s own claim.',
    body: `${callout('No Google total, no period and no regions were published. Three different measures follow.', { grow: true, size: 52 })}`,
    src: 'Adam Fry, OpenAI, at an OpenAI event in New York; reported by 9to5Google and Big Technology, 3 Nov 2026.' }),
  slideX({ kicker: 'THREE ESTIMATES', i: 2, total: T, size: 84, title: `Same question, ${rp('three answers')}`,
    lead: 'ChatGPT search-like queries as a share of Google’s.',
    body: `${bars({ items: [
        { label: `OpenAI${sub('its own claim')}`, value: 20, shown: '≈20', hl: true },
        { label: `Ahrefs${sub('modeled, Feb 2026')}`, value: 12, shown: '≈12' },
        { label: `seoClarity${sub('modeled, 28 Oct 2026')}`, value: 7.5, shown: '≈7.5' }], max: 20, unit: '%', thick: true })}
${note('Ahrefs counts only prompts that look like searches, using ChatGPT prompt data from July 2025. Counting every prompt, it gets 18%. seoClarity calls its figure a modeled comparison, not a measured share.')}`,
    src: 'Ahrefs, Feb 2026. seoClarity, 28 Oct 2026. OpenAI via 9to5Google, 3 Nov 2026.' }),
  slideX({ kicker: 'QUERIES VS VISITS', i: 3, total: T, size: 84, title: `Queries are not ${rp('visits')}`,
    body: `${compare({ left: { lab: 'AHREFS · SEARCH VOLUME', big: '12%', text: 'ChatGPT’s share of Google’s search volume, modeled' }, right: { lab: 'AHREFS · WEBSITE TRAFFIC', big: '0.21%', text: 'ChatGPT’s share of traffic to 76,000 sites. Google: about 40%' }, hl: 1 })}
${callout('Google sends about 190 times more visitors than ChatGPT. A question answered inside ChatGPT is not a click.', { grow: true, size: 44 })}`,
    src: 'Ahrefs, Feb 2026, 76,000 websites. Same source, two different measures.' }),
  slideX({ kicker: 'GOOGLE IS NOT SHRINKING', i: 4, total: T, size: 84, title: `A fifth of a growing number ${rp('is not a loss')}`,
    body: `${facts([
      { k: 'ALPHABET · Q3 2026 · 28 OCT', v: 'Search and other revenue grew 12% year over year', hl: true },
      { k: 'SUNDAR PICHAI · Q3 2026 CALL', v: 'Year-over-year query growth was the highest in five years' },
      { k: 'ADAM FRY, OPENAI · SELF-REPORTED', v: 'ChatGPT went from 1 billion to 1.2 billion weekly users in two months' }])}
${note('Both can be true: ChatGPT is large and growing, and Google’s own volume is also growing. The last line is my read.')}`,
    src: 'Alphabet Q3 2026 results and call, 28 Oct 2026. OpenAI figures are self-reported; OpenAI is private.' }),
  slideX({ kicker: 'QUOTE IT SAFELY', i: 5, total: T, size: 84, title: `What you ${rp('can and cannot say')}`,
    body: `${facts([
      { k: 'SAFE', v: 'OpenAI says ChatGPT handles roughly one-fifth as many search-like queries as Google. It has not disclosed the Google baseline, period or regions.', hl: true },
      { k: 'NOT SAFE', v: '“ChatGPT has 20% of Google’s market share.” “ChatGPT sends 20% as much traffic as Google.” “Google lost 20% to ChatGPT.”' }])}
${note('OpenAI counts a search each time a prompt makes ChatGPT search the web. That is not the same unit as a query on Google.')}`,
    src: '9to5Google, 3 Nov 2026; Big Technology, 3 Nov 2026.' }),
  slideX({ kicker: 'WHAT I WOULD DO', i: 6, total: T, size: 92, title: `This week, ${rp('three checks')}`,
    body: `${steps([
      ['Check you are not blocking OAI-SearchBot', 'OpenAI says it is the bot behind ChatGPT search answers. GPTBot is separate, for training.'],
      ['Ask your 10 buyer questions in ChatGPT', 'Write down who is cited and which sources it shows. Do it again next month.'],
      ['Add “ChatGPT or another AI” to “how did you find us?”', 'It is the cheapest way to see what the last click hides.']])}
<div class="src" style="margin-top:4px">Sources: OpenAI crawler documentation (read 4 Nov 2026). Links to every source in the first comment.</div>`,
    src: '' }),
] };
