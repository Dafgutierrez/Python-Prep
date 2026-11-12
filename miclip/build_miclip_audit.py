# Builds the Mi Clip audit (native English rewrite, V11) as HTML, then PDF via Playwright.
# Run: python3 build_miclip_audit.py && node render.cjs
import html, pathlib

OUT = pathlib.Path(__file__).with_name("Mi-Clip-Complete-Audit-Geonos-V11-EN.html")
MARK = '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"><path d="M34 16H84"/><path d="M16 38H38"/><path d="M16 60H38"/><path d="M60 60H84V82H34"/></g></svg>'
TOTAL = 25
e = html.escape

def head(section):
    return f'<header class="top"><div class="brand"><span class="mk">{MARK}</span><span class="wd">GEONOS AI</span></div><div class="sec">{e(section)}</div></header>'

def foot(n):
    return f'<footer class="bot"><span class="b">getgeonos.com</span><span>Found. Understood. Recommended.</span><span>{n} / {TOTAL}</span></footer>'

def page(n, section, eyebrow, h1, body):
    return f'<section class="page">{head(section)}<div class="glow"></div><div class="eyebrow">{e(eyebrow)}</div><h1>{h1}</h1>{body}{foot(n)}</section>'

def p(t, cls=""):
    return f'<p class="{cls}">{t}</p>'

def stats(items):
    return '<div class="stats">' + "".join(f'<div class="st"><b>{e(a)}</b><span>{e(b)}</span></div>' for a, b in items) + "</div>"

def bullets(items):
    out = '<ul class="bl">'
    for t, d in items:
        out += f'<li><strong>{e(t)}</strong>' + (f'<span>{e(d)}</span>' if d else "") + "</li>"
    return out + "</ul>"

def table(cols, rows, widths=None, first_bold=True):
    w = widths or [None] * len(cols)
    th = "".join(f'<th style="width:{x}">{e(c)}</th>' if x else f"<th>{e(c)}</th>" for c, x in zip(cols, w))
    tr = ""
    for r in rows:
        tr += "<tr>" + "".join(f'<td class="{"k" if i == 0 and first_bold else ""}">{e(str(c))}</td>' for i, c in enumerate(r)) + "</tr>"
    return f'<table class="tb"><thead><tr>{th}</tr></thead><tbody>{tr}</tbody></table>'

def label(t):
    return f'<div class="label">{e(t)}</div>'

def cluster(num, name, total, rows, note=None):
    r = "".join(f'<div class="kw"><span>{e(k)}</span><span>{v}</span></div>' for k, v in rows)
    n = f'<div class="cnote">{e(note)}</div>' if note else ""
    return f'<div class="cl"><div class="cn">{e(num)}</div><div class="cb"><div class="ch"><span>{e(name)}</span><span>{e(total)}</span></div>{r}{n}</div></div>'


STOPS = [(0, (90, 162, 255)), (0.45, (184, 139, 245)), (0.7, (229, 127, 224)), (1, (245, 143, 174))]
def gradtext(t):
    # Per-letter colours along the brand gradient. Chromium prints background-clip:text with a hairline, so no clip here.
    n = max(len(t) - 1, 1); out = ""
    for i, ch in enumerate(t):
        x = i / n
        for (a, ca), (b, cb) in zip(STOPS, STOPS[1:]):
            if a <= x <= b:
                f = (x - a) / (b - a) if b > a else 0
                c = tuple(round(ca[k] + (cb[k] - ca[k]) * f) for k in range(3)); break
        out += f'<span style="color:rgb{c}">{html.escape(ch)}</span>' if ch != " " else " "
    return out

G = gradtext
pages = []

# 1 cover
pages.append(f'''<section class="page cover"><div class="glow big"></div><div class="cmark">{MARK}</div>
<div class="eyebrow wide">COMPLETE VISIBILITY AUDIT</div><div class="ct">Mi Clip.</div><div class="ct">{gradtext("Found, but mistaken for Clip.")}</div>
<p class="csub">What Google and AI show today when someone in Mexico asks how to pay with their phone.</p>
<div class="pills"><span><i>SEO</i> Low</span><span><i>GEO</i> 34 of 100</span><span><i>AEO</i> Critical</span></div>
<div class="cnote2">Two parts: the context, then the audit.</div>{foot(1)}</section>''')

# 2
pages.append(page(2, "PART ONE · THE CONTEXT", "FIRST, A SCENE", "People don’t search the way they used to.",
  '<div class="ba"><h2>Before.</h2><p>If you wanted to pay without cash, you’d open Google, type two or three words and work your way down a list of links. You’d open a few sites, read some reviews and make up your mind. If you were on that list, you existed.</p></div>'
  f'<div class="ba"><h2>{G("Today.")}</h2><p>Now the same person asks an AI one full question: which app can I use in Mexico to pay with my phone, no card, no cash? There’s no list of ten links. Just one answer, with two or three names in it.</p></div>'
  '<h3 class="mid">That shortlist is the new first page.</h3>'
  + stats([("53%", "of consumers across 11 markets have used AI to shop in the past three months"), ("29% vs 9%", "named AI, not traditional search, as the biggest influence on their latest purchase"), ("8%", "of visits with an AI summary end in a click on a result, vs 15% when there isn’t one")])))

# 3
tl = [("SEPTEMBER", "Muse launches in the US.", "Meta’s personal agent browses, compares and buys for you, and asks before it pays."),
      ("SEPTEMBER", "Amazon blocks it.", "Twelve days after launch, Amazon cut Meta’s agent off. Every platform wants to own the front door."),
      ("SEPTEMBER", "Retailers sign on.", "Walmart, Best Buy, Sephora, Ulta and Wayfair are announced as Muse partners in the US."),
      ("NOVEMBER", "Amazon responds with its own.", "Invited US customers are already shopping by text with Alexa for Shopping."),
      ("NOVEMBER", "Muse launches in Mexico.", "The first country in Latin America to get it. This isn’t happening somewhere else anymore.")]
tlh = '<div class="tl">' + "".join(f'<div class="ti"><div class="dot"></div><div class="tm">{a}</div><div class="tt">{e(b)}</div><div class="td">{e(c)}</div></div>' for a, b, c in tl) + "</div>"
pages.append(page(3, "PART ONE · THE CONTEXT", "THEN AI STARTED SHOPPING", "First it answered. Then it started shopping.",
  p("It happened in the US first. Within months, the assistant that used to just answer questions was browsing stores, comparing prices and checking out once the user said yes. Now every platform wants to own the moment the question gets asked.", "lead") + tlh))

# 4
brands = ["Cinépolis", "Coppel", "Despegar", "Kavak", "Kueski", "Liverpool", "Rappi", "Walmart México"]
pages.append(page(4, "PART ONE · THE CONTEXT", "THEN IT CAME TO MEXICO", "Mexico isn’t sitting this one out.",
  p("Online shopping was already routine in Mexico. People browse on their phones, compare stores and pay by SPEI, in monthly installments or in cash at the corner store, then pick up wherever is easiest. AI arrived on top of all that at once: in Spanish, inside WhatsApp.", "lead")
  + stats([("MX$941 bn", "online retail sales in Mexico last year"), ("77.2 M", "digital shoppers in the country"), ("17.7%", "of all retail sales already happen online")])
  + label("THE FIRST BRANDS ON MUSE IN MEXICO") + '<div class="brands">' + "".join(f"<div>{e(b)}</div>" for b in brands) + "</div>"
  + p("It all happens in one conversation: compare prices across stores, track a package, check a flight, buy movie tickets. And one detail matters for everyone else: the country’s two biggest marketplaces aren’t on it. The field is wide open.", "lead")
  + p("You can’t buy your way in, and nobody can guarantee a spot. It comes down to one thing: when someone asks, does the AI name you, and does it get you right?", "close")))

# 5
steps = [("It starts with a question.", "Nobody starts with a brand name. Which app is best in Mexico if I don’t carry cash? How do I get paid? In Mexico this happens on a phone, and more and more often inside WhatsApp."),
         ("AI answers with a shortlist.", "Two or three names, not ten links. If your brand isn’t in that answer, you were never in the running."),
         ("It compares whatever it can find.", "Prices, fees, limits, cashback, proof it can be trusted. If what you publish is thin or confusing, the assistant fills the gaps with what third parties say about you, or leaves you out."),
         ("It buys, once you say yes.", "Agents already check out once the user approves. What they found in steps one to three decides what gets bought in step four."),
         ("Trust gets checked in public.", "Regulation, reviews, what real people say. A 4.5-star rating from a thousand reviews carries more weight than any tagline.")]
pages.append(page(5, "PART ONE · THE CONTEXT", "THE JOURNEY, STEP BY STEP", "Five steps. An answer at every one.",
  '<ol class="steps">' + "".join(f"<li><span class='n'>{i}</span><div><strong>{e(a)}</strong><span>{e(b)}</span></div></li>" for i, (a, b) in enumerate(steps, 1)) + "</ol>"
  + p("Brands don’t lose at checkout. They lose at the answer, before the journey has really started.", "close")))

# 6
eng = [["ChatGPT", "Gemini", "Perplexity", "Claude"], ["Google AI Mode", "Google AI Overviews"], ["Copilot", "Grok", "Meta AI"], ["Meta Muse", "Alexa for Shopping"]]
pages.append(page(6, "PART ONE · THE CONTEXT", "WHY EVERY ENGINE MATTERS", "There’s no single front door anymore.",
  p("People don’t ask in just one place. Someone asks ChatGPT today, sees an AI summary on Google tomorrow, asks Meta Muse inside WhatsApp the day after and asks Alexa for Shopping what to buy next week. Each engine builds its answer from different sources, at different times.", "lead")
  + '<div class="engines">' + "".join("<div>" + " <i>·</i> ".join(r) + "</div>" for r in eng) + "</div>"
  + p("That’s why visibility is no longer just about rankings. It’s about whether your brand shows up in the answer, and shows up correctly. Being named isn’t enough: if AI describes you as the business product when you’re the consumer one, then for the people you’re trying to reach, you don’t exist.", "lead")
  + p("That’s the context. What follows is different: hard data on one brand.", "close")))

# 7 part two cover
pages.append(f'''<section class="page cover"><div class="glow big"></div><div class="cmark sm">{MARK}</div><div class="eyebrow wide">PART TWO</div>
<div class="ct">Now,</div><div class="ct">{gradtext("Mi Clip.")}</div><p class="csub">What Google and AI show today when someone in Mexico looks for a wallet to pay with their phone.</p>
<div class="cnote2 caps">SEO, GEO AND AEO VISIBILITY AUDIT · NOVEMBER 2026</div></section>''')

# 8
pillars = '<table class="tb pil"><thead><tr><th style="width:18%">PILLAR</th><th style="width:24%">LEVEL</th><th>IN ONE LINE</th></tr></thead><tbody>' + "".join(
    f'<tr><td class="k">{a}</td><td class="lv">{b}</td><td>{e(c)}</td></tr>' for a, b, c in [("SEO", "Low", "It ranks for business searches, not consumer ones."), ("GEO", "Below average", "AI describes it correctly. It just rarely mentions it."), ("AEO", "Critical", "Not one page answers a question in a way AI can quote.")]) + "</tbody></table>"
pages.append(page(8, "PART TWO · EXECUTIVE SUMMARY", "EXECUTIVE SUMMARY", "A good product, read the wrong way.",
  p("Mi Clip is Grupo Clip’s consumer wallet. You can pay with your phone by QR or tap, send and receive money, pay bills and top-ups, ride public transit and earn cashback. The product isn’t the problem. The problem is that people and Google keep mixing it up with Clip, the business brand everyone knows: most of its search traffic comes from people looking for Clip’s business products. AI describes it correctly when asked by name, but rarely brings it up on its own. And almost all of its organic visibility depends on a single page.", "lead")
  + stats([("154", "organic visits per month"), ("217", "organic keywords"), ("34 / 100", "AI visibility, 5 citations"), ("0 of 34", "pages with a direct answer")]) + pillars
  + label("THE THREE ROOT CAUSES")
  + bullets([("1. Entity confusion.", "Mi Clip, the wallet for people, and Clip, the card readers and payment tools for businesses, keep showing up for the same searches. Most of the search volume behind Mi Clip’s traffic today comes from business terms."),
             ("2. One page carries everything.", "The homepage accounts for 181 of the 183 ranking keywords that bring in traffic. Google indexes the site, but AI has almost nothing on it to quote."),
             ("3. No answers, no entity signals.", "Zero pages with a direct answer, no official profiles linked in the markup, and one FAQ trying to speak to businesses and consumers at once.")])))

# 9
pages.append(page(9, "PART TWO · READING", "WHAT’S ALREADY WORKING", "The foundation isn’t the problem.",
  p("Nine things already working in Mi Clip’s favor, based on what it publishes today.", "lead")
  + bullets([("Open to crawlers.", "robots.txt blocks only three paths and declares the sitemap. Nothing here needs to be built from scratch."),
             ("A known group behind it.", "Grupo Clip’s brand carries a group-level Authority Score of 17 and 38 keywords in the top 10. Mi Clip starts with credibility most new wallets don’t have."),
             ("Links are growing fast.", "Backlinks jumped from 68 to 564 in three months, and referring domains from 7 to 26."),
             ("Traffic is growing.", "Estimated organic traffic rose from 85 to 154 visits a month over the same period, up 81%."),
             ("Solid legal standing.", "Operations run through Clip AI, S.A. de C.V., an authorized IFPE supervised under Mexico’s Fintech Law. In a regulated category, that’s an advantage competitors can’t copy with design."),
             ("The site already makes the distinction.", "It already says Mi Clip is the payments app for people. The definition exists; it’s just buried in an FAQ."),
             ("A strong app store reputation.", "4.5 stars on Google Play from more than a thousand reviews. Third-party proof that AI can read today."),
             ("Already appearing in discovery searches.", "It already shows up for searches like best payment app in Mexico, just outside the top 10. The intent it needs to win is within reach."),
             ("A real product story.", "QR and contactless payments, transfers, bills, top-ups, transit and cashback. The raw material for quotable content is all there.")])
  + p("The takeaway: Mi Clip doesn’t need anyone’s permission to get cited. It needs clear pages and a clean break from its business sibling.", "close")))

# 10
pages.append(page(10, "PART TWO · SEO", "1. SEO: THE LANDSCAPE", "The smallest in the group. Barely in the race.",
  p("On every organic metric, Mi Clip is the smallest domain among Mexico’s digital wallets. But look at who it’s up against: digital accounts with years of content and millions of users. Mi Clip appears on the same results pages with almost no content of its own.", "lead")
  + table(["DOMAIN", "AUTHORITY", "TRAFFIC", "KEYWORDS", "BACKLINKS", "REF. DOMAINS"], [["miclip.mx", 17, 154, 217, 564, 26], ["mercadopago.com.mx", 56, "570,952", "77,357", "10,450,259", "9,465"], ["nu.com.mx", 45, "128,107", "10,688", "21,881", "1,568"], ["spinbyoxxo.com.mx", 43, "97,743", "7,348", "14,813", "3,690"]], ["26%", None, None, None, None, None])
  + label("SHARE OF THE GROUP’S TRAFFIC") + stats([("71.6%", "Mercado Pago"), ("16.1%", "Nu"), ("12.3%", "Spin by OXXO"), ("< 1%", "Mi Clip")])
  + p("The trend matters too. Over three months, Mercado Pago’s estimated traffic fell 24%, Nu’s grew 23% and Spin’s dropped 9%. The leader is losing share, not gaining it. In a market moving like this, a small base can grow fast if it aims well.", "lead")
  + p("Mi Clip’s own traffic value nearly quadrupled over the same period, from $495 to $1,899. Small base, fast growth.", "close")))

# 11
pages.append(page(11, "PART TWO · SEO", "1. SEO: VALUE, AUTHORITY AND PAID", "Thin authority. And nobody bidding.",
  table(["DOMAIN", "TRAFFIC VALUE (USD)", "3-MONTH TREND"], [["miclip.mx", "495 to 1,899", "3.8x in three months"], ["mercadopago.com.mx", "1,600,000 to 1,430,000", "Falling, still huge"], ["nu.com.mx", "413,000 to 431,000", "Flat"], ["spinbyoxxo.com.mx", "181,000 to 171,000", "Falling"]], ["36%", "28%", None])
  + label("AUTHORITY, THE LONG GAME")
  + p("Mi Clip has 26 referring domains. Nu, the weakest competitor on this metric, has about 60 times as many. Even with eight times more links, Mi Clip would still be well behind. That gap is years of accumulated authority, and nothing in this plan depends on closing it. It depends on answering specific questions better than anyone else, and on the mentions that content earns.", "lead")
  + label("PAID SEARCH, FOR CONTEXT")
  + p("Mi Clip and Spin by OXXO show no paid keywords. Mercado Pago, the only big spender back in August, went from 52 paid keywords to zero by November. Nu runs just three, at an estimated $945 a month. For these searches, the ad auction is practically empty.", "lead")
  + p("This space is won organically. Whoever publishes the best answer takes it, because nobody is paying for it.", "close")))

# 12
pages.append(page(12, "PART TWO · SEO", "2. KEYWORDS: WHAT IT RANKS FOR TODAY", "Its top searches are for someone else’s product.",
  p("Mi Clip’s highest-volume keywords belong to the other product: card readers, fees, calculators for businesses. It ranks, just for the wrong audience. None of its top 10 positions match a wallet, payments, cashback or transfer search. The terms below are shown exactly as people type them in Mexico.", "lead")
  + table(["KEYWORD", "MONTHLY SEARCHES", "POSITION"], [["clip", "90,500", 14], ["calculadora clip", "12,100", 35], ["clip comisiones", "9,900", 33], ["clip terminal", "6,600", 15], ["clip mexico", "1,900", 8]], ["48%", "28%", None])
  + p("Even its best positions lean toward business: Clip for business content and app download terms take positions 3 to 9. Its one true consumer ranking, best payment app in Mexico, sits just outside the top 10.", "lead")
  + label("THE CONCENTRATION, IN ONE NUMBER")
  + p("181 of its 183 ranking keywords come from one page: the homepage, miclip.mx/. The issue isn’t content spread too thin across the site. One page carries the whole domain, and that page mixes two products.", "lead")
  + p("Every new quotable URL takes weight off the homepage and gives Google and AI one clear page per question.", "close")))

# 13
pages.append(page(13, "PART TWO · SEO", "3. THE GAP: WHAT IT DOESN’T RANK FOR", "42,139 keywords. 79% are informational.",
  p("The gap analysis takes everything Mercado Pago, Nu and Spin by OXXO rank for in Mexico and checks it against miclip.mx. What’s left is 42,139 keywords where the category is already visible and Mi Clip barely shows up.", "lead")
  + table(["INTENT", "KEYWORDS", "MONTHLY SEARCHES"], [["Informational", "33,382", "15,728,160"], ["Navigational", "5,026", "6,353,480"], ["Commercial", "3,023", "923,840"], ["Transactional", "708", "318,680"]], ["40%", "28%", None])
  + p("Four out of five of these keywords are people looking for how to do something: pay, top up, transfer, deposit. Not brand names: instructions. That’s exactly the kind of content answer engines quote, and almost all of it falls into the clusters on the next two pages.", "lead")
  + '<div class="big1"><b>20,132</b><span>keywords at difficulty 0 to 30, the range within reach of an Authority Score of 17</span></div>'))

# 14
pages.append(page(14, "PART TWO · OPPORTUNITY", "3. THE GAP: 10 OPPORTUNITY CLUSTERS", "631,710 searches a month. Mi Clip ranks in the top 10 for none of them.",
  p("These keywords fall into ten topics, and each one maps to something Mi Clip already does: pay by QR or contactless, top up, pay bills, send money, earn cashback. Today Mi Clip has no top-10 ranking in any of them. Here are the first four, with the terms as people type them in Mexico.", "lead")
  + cluster("CLUSTER 01", "Top-ups: Telcel, AT&T, Movistar, Unefon", "345,980 searches/mo", [("recargas", "40,500"), ("recarga telcel", "27,100"), ("recargas telcel", "22,200"), ("recargas at&t", "9,900"), ("recarga movistar", "8,100")])
  + cluster("CLUSTER 02", "Transfers and SPEI", "134,870 searches/mo", [("iban mexico", "12,100"), ("que es spei", "9,900"), ("rastreo spei", "6,600"), ("como transferir dinero", "5,400"), ("cual es mi clabe interbancaria", "5,400")])
  + cluster("CLUSTER 03", "Bill payments: CFE, Telmex, water, Izzi", "59,000 searches/mo", [("pagar agua", "14,800"), ("pagar agua en linea", "8,100"), ("pagar cfe en linea", "4,400"), ("pago cfe", "3,600"), ("pagar recibo de luz", "3,600")], "Mercado Pago, Nu and Spin own this cluster today. It has real buying intent, and the feature is already in the app.")
  + cluster("CLUSTER 04", "Cashback in Mexico", "30,150 searches/mo", [("cashback", "12,100"), ("cashback que es", "8,100"), ("que es el cashback", "4,400"), ("cash back", "2,400"), ("como funciona el cashback", "1,300")])))

# 15
pages.append(page(15, "PART TWO · OPPORTUNITY", "3. THE GAP: CLUSTERS 5 TO 10", "The most open door of all: paying by phone.",
  cluster("CLUSTER 05", "Adding cash to the account", "19,680 searches/mo", [("depositos en oxxo", "14,800"), ("cuanto cobran por depositar en oxxo", "1,600"), ("bancos que aceptan depositos en oxxo", "1,600")])
  + cluster("CLUSTER 06", "Digital wallets and accounts", "14,210 searches/mo", [("cuentas digitales", "4,400"), ("que es una billetera digital", "2,900"), ("billetera digital", "2,400"), ("cuenta digital", "2,400"), ("mejor app de pagos", "880")])
  + cluster("CLUSTER 07", "Paying by phone: QR, NFC, contactless", "11,380 searches/mo", [("pagar con el celular", "1,600"), ("pagar con nfc", "1,300"), ("como pagar con el celular", "1,000"), ("como usar nfc para pagar", "880"), ("pagar con qr", "880")], "The clearest opening in the whole audit. The best competitor here ranks between positions 12 and 17. Nobody owns paying by phone, and it’s the heart of what Mi Clip promises.")
  + cluster("CLUSTER 08", "Trust and regulation", "7,220 searches/mo", [("es seguro mercado pago", "1,300"), ("que es una fintech", "1,000"), ("condusef simulador", "880"), ("entidades financieras reguladas", "720"), ("instituciones de fondos de pago electronico", "320")], "Regulators and banks own this one today. A wallet that explains its own IFPE status in plain words can earn a place in it.")
  + cluster("CLUSTERS 09 + 10", "Digital cards and Mexico City transit", "9,220 searches/mo", [("tarjeta digital", "1,600"), ("como pagar con tarjeta digital", "880"), ("tarjeta virtual", "880"), ("pagar metro con tarjeta", "720"), ("tarjeta movilidad integrada saldo", "590")], "In Mexico City, transit searches belong to Uber, DiDi, Google and Cabify today. They sit right next to paying by phone."), ))
pages[-1] = pages[-1].replace('<section class="page">', '<section class="page dense">', 1)

# 16
pages.append(page(16, "PART TWO · OPPORTUNITY", "3. THE GAP: WHERE TO START", "The easiest wins are already on the map.",
  p("Not all 631,710 searches take the same effort. Difficulty runs from 0 to 100, and with an Authority Score of 17 the realistic entry point is 0 to 30. Below are the biggest keywords in and around that range, one per topic, each tied to a feature Mi Clip already offers. Terms as typed in Mexico.", "lead")
  + table(["KEYWORD", "SEARCHES/MO", "DIFFICULTY", "TOPIC"], [["recargas", "40,500", 22, "Top-ups"], ["pagar agua", "14,800", 26, "Bill payments"], ["depositos en oxxo", "14,800", 33, "Cash deposits"], ["pagar agua en linea", "8,100", 33, "Bill payments"], ["recarga telcel", "27,100", 38, "Top-ups"], ["como pagar con tarjeta digital", 880, 32, "Digital card"], ["como usar nfc para pagar", 880, "n/a", "Paying by phone"], ["mejor app de pagos", 880, "n/a", "Discovery"]], ["44%", "17%", "15%", None])
  + p("Put simply: one good top-up guide goes after a term with 40,500 searches at difficulty 22. A page on paying the water bill goes after a term at difficulty 26. These aren’t long shots. They’re questions people ask every day, and the answers ranking today are weak.", "lead")
  + p("Order matters more than volume: first the entity, then how to add money and why it’s safe, then use cases. That’s the order the roadmap follows.", "close")))

# 17
pages.append(page(17, "PART TWO · GEO", "4. GEO: VISIBILITY IN AI ANSWERS", "AI gets it right. It just rarely mentions it.",
  stats([("34 / 100", "AI visibility, below average"), ("5", "citations found"), ("Neutral", "brand sentiment in answers")])
  + p("Ask AI about Mi Clip and the answer comes back with three points: a Mexican digital wallet, QR and NFC payments, and cashback. Accurate, and on message. The description isn’t the issue. The issue is that next to Mercado Pago, Nu, Klar and Spin by OXXO, it almost never comes up unless someone asks for it by name.", "lead")
  + label("WHERE THE MODELS GET THEIR ANSWERS")
  + bullets([("Official site, positive tone.", "The clearest primary source: it says Mi Clip is a consumer wallet and lists NFC and QR payments, sending and receiving money, bills, top-ups and transit."),
             ("Google Play, neutral tone.", "Rated 4.5 from more than a thousand reviews. Users praise payments and cashback, and complain about bonuses and support. This is what shapes answers about trust."),
             ("App Store Mexico, positive tone.", "Users like how fast bill payments are and being able to spend their cashback. There just aren’t many reviews yet.")])
  + label("STRENGTHS AI ALREADY RECOGNIZES")
  + bullets([("A concrete offer.", "NFC payments on Android, QR at Clip merchants, transfers, bills, top-ups and transit, all in one app."),
             ("The Clip halo.", "Borrowed recognition from one of Mexico’s best-known fintech brands."),
             ("Visible legal backing.", "Run by Clip AI, S.A. de C.V., an IFPE authorized and supervised under the Fintech Law."),
             ("The site already makes the distinction.", "It already explains how Mi Clip differs from the Clip app for businesses.")])))

# 18
qs = ["Which app can I use in Mexico to pay with my phone, without a card or cash?", "Can I pay CFE and Telmex bills and buy Telcel top-ups with Mi Clip?", "Mi Clip or Mercado Pago: which is better for bills and cashback?", "How do I add money to Mi Clip, by SPEI or in cash?", "Is Mi Clip safe and regulated in Mexico?", "Which apps in Mexico give cashback when you pay with your phone?", "Can I pay contactless anywhere, or only at Clip merchants?"]
pages.append(page(18, "PART TWO · GEO", "4. GEO: COMPETITORS AND REAL QUESTIONS", "In AI answers, Klar is a rival too.",
  p("Klar never shows up in the search comparison. In AI answers, it’s right there. Your competitors in AI aren’t always your competitors in search.", "lead")
  + bullets([("Mercado Pago.", "A giant brand: QR acceptance everywhere, a digital account, bills, transfers, a card, and a huge editorial footprint."),
             ("Spin by OXXO.", "A payments account backed by OXXO’s store network and brand recognition."),
             ("Klar.", "Digital account, card, cashback and interest on savings, with a much bigger public footprint."),
             ("Nu México.", "Owns digital accounts and personal finance through brand, educational content and sheer scale.")])
  + label("THE QUESTIONS PEOPLE ACTUALLY ASK") + '<ul class="qs">' + "".join(f"<li>{e(q)}</li>" for q in qs) + "</ul>"))

# 19
pages.append(page(19, "PART TWO · GEO", "4. GEO: HOW QUESTIONS BRANCH OUT", "One question becomes twenty.",
  p("Answer engines don’t look up your question word for word. They break it into sub-queries, called fan-outs, and build the answer from all of them. A brand needs a page for the question and for every direction it branches into.", "lead")
  + bullets([("How do I pay with Mi Clip?", "It splits into how to pay with NFC on Android, how to pay with QR and where Mi Clip is accepted. With no content to draw from, answers get vague about how it works and where."),
             ("Mi Clip or Mercado Pago?", "It breaks down into bills, SPEI transfers and who gives the best cashback. With no comparison of its own, the models default to Mercado Pago on name recognition alone."),
             ("Is Mi Clip trustworthy?", "It splits into whether it’s a bank account, who regulates it and what happens to your money. The answer has to separate a bank account from an electronic payment funds account and name Clip AI as the IFPE.")])
  + label("HIGH-PRIORITY IMPROVEMENTS")
  + bullets([("Separate the entity.", "Separate Mi Clip from Clip for businesses everywhere (site, app stores, profiles) so engines stop merging the two."),
             ("Publish honest comparisons.", "Own the Mi Clip vs Mercado Pago question instead of leaving it to third parties."),
             ("Turn features into guides.", "Each feature becomes an indexable how-to page, not a bullet on the homepage."),
             ("Document the cashback.", "Explain it with verifiable examples and lead with the terms, so trust questions get an official answer.")])))

# 20
pages.append(page(20, "PART TWO · AEO", "5. AEO: ANSWER ENGINE OPTIMIZATION", "0 of 34 pages answer directly.",
  p("AEO is about making a page that a search engine or assistant can quote word for word. That takes a page that asks the question the way a person would, then answers it plainly in the first few lines. Of the 34 pages reviewed, not one has a question as a heading followed by a direct answer of 5 to 80 words.", "lead")
  + label("COVERAGE OF THE QUESTIONS THAT MATTER")
  + table(["QUESTION", "WHAT EXISTS TODAY", "WHAT’S MISSING"], [["What is Mi Clip, and how is it different?", "A line in the FAQ", "Its own quotable URL"], ["How do I add money to Mi Clip?", "The FAQ lists 3 options", "A guide with steps and limits"], ["Is it safe? What’s an IFPE?", "Buried in legal pages", "A plain-language explanation"], ["How does cashback work?", "A benefits section", "An explainer that leads with the terms"], ["Can I pay for public transit with it?", "A general claim", "A step-by-step guide, once confirmed"], ["How much do cash deposits cost?", "A fee table", "A short written summary, kept up to date"]], ["40%", "24%", None], first_bold=False)
  + p("The good news: most of the raw content already exists. It just isn’t packaged as one clear question with one quotable answer per page.", "close")
  + label("THE SCOPE OF AEO WORK, ON FIVE FRONTS")
  + bullets([("Strategy and topics.", "Define the wallet, and prioritize paying, adding money and comparison searches."),
             ("Answer-ready content.", "Pages on where to use it, how to add money and whether it’s a bank account."),
             ("Structure and markup.", "Question headings, structured data, and up-to-date promotions, limits and fees."),
             ("Entity, brand and authorship.", "The same name and description across the site, Google Play and the App Store, with consistent profiles."),
             ("Measurement and governance.", "Monthly tests in ChatGPT, Perplexity and Google AI Overviews, a log of mentions, citations and gaps, and compliance review of every financial text before it goes live.")])))

# 21
pages.append(page(21, "PART TWO · TECHNICAL", "6. TECHNICAL SEO AND CRAWLING", "Nothing to unblock. Five things to clean up.",
  p("robots.txt is wide open. Every crawler gets in; only /404, /search and /admin are blocked, and the sitemap is declared. That includes Googlebot and AI assistant crawlers, which follow the same rules.", "lead")
  + table(["FINDING", "DATA", "PRIORITY", "EFFORT"], [["Pages that answer questions", "0 of 34", "Fix now", "A few days"], ["Sitemap pages with no internal links", "23 of 33", "Fix now", "A few days"], ["Official profiles in markup (sameAs)", "None", "Fix now", "Quick"], ["Pages with no title", "6 of 34", "Worth fixing", "Quick"], ["Broken internal links", "1 of 39", "Worth fixing", "Quick"]], ["40%", "20%", "20%", None])
  + p("Why it matters: assistants build answers from passages that answer a question head-on. A page nobody links to is hard to find, even if it’s in the sitemap. A missing title leaves the page’s label to chance. And sameAs links in the markup are how AI confirms that the brand on your site is the same one it sees across the web.", "lead")
  + p("The one broken link, /clip-cuenta, returns a 404 and is linked from the Mi Clip Cuenta terms. The unlinked pages include the English privacy and terms pages. The missing titles are mostly on terms and conditions pages.", "lead")
  + p("The concentration says it all: 181 of 183 ranking keywords lead back to miclip.mx/. Wider visibility means new URLs. Full stop.", "close")))

# 22
pages.append(page(22, "PART TWO · CONTENT", "7. CONTENT PLAN", "Eight pieces. Eight unanswered questions.",
  p("Each piece answers one specific question that neither Google nor AI can find answered on the site today. Because this is a regulated financial brand, everything goes through compliance review before it’s published, and only figures Mi Clip already publishes are used.", "lead")
  + bullets([("1. A definition at the top of the homepage.", "What Mi Clip is: a quotable definition instead of a slogan."),
             ("2. Mi Clip vs Clip.", "How they differ and who each one is for. It settles the entity confusion on its own URL."),
             ("3. A guide to adding money.", "SPEI, cash or card, plus the CLABE and the deposit fee. The FAQ, expanded into a real guide."),
             ("4. Is Mi Clip safe? What’s an IFPE?", "Is it a bank? Who regulates it? Is my money safe? The legal framework in plain words."),
             ("5. Benefits, with a short summary first.", "Mi Clip as a cashback app in Mexico, and what users get. It targets discovery searches."),
             ("6. A public transit guide.", "Paying for the Metro and Metrobús with your phone, published only once the systems, cities and exact steps are confirmed."),
             ("7. Fees as a quotable FAQ.", "Mi Clip Cuenta fees and cash deposit charges, summarized in plain words above the official fee table."),
             ("8. Cashback explained, terms first.", "What cashback is and how Mi Clip’s works, with the terms up front and no promised amounts.")])
  + p("Beyond these, one guide per use case: paying CFE and Telmex bills, Telcel top-ups, sending money home and paying for transit. Each with requirements, steps, limits and a review date.", "close")))

# 23
wk = [("Separate the entity.", "A consumer app definition, with the same description on the homepage and in the app stores. Measured by AI answers describing it as a consumer wallet, not the business product."),
      ("The Mi Clip vs Clip page.", "Its own URL with a consumer vs business table. Measured by citations of that page when people ask how the two differ."),
      ("The guide to adding money.", "SPEI, cash and card in one guide. Measured by rankings for searches about adding money and the CLABE."),
      ("Safety and regulation.", "Who runs it and what an IFPE is, in plain language. Measured by correct answers about regulation."),
      ("Cashback explained.", "A short explainer, terms first. Measured by cashback rankings and AI mentions."),
      ("Entity signals and site cleanup.", "Official profiles, titles and internal links. Measured by linked pages and every page having a title."),
      ("Use case guides.", "Bills, top-ups and sending money. Measured by new pages indexed and cited."),
      ("Measurement.", "A fixed set of questions in ChatGPT, Perplexity and Google. Measured by how far the baseline moved.")]
pages.append(page(23, "PART TWO · ROADMAP", "8. THE 8-WEEK ROADMAP", "One quotable piece a week.",
  p("Every week ends with something ready to publish, cleared by compliance first. Here’s how it would play out week by week, and how each step gets measured.", "lead")
  + '<div class="weeks">' + "".join(f'<div class="wk"><div class="wn">WEEK {i}</div><div><strong>{e(a)}</strong><span>{e(b)}</span></div></div>' for i, (a, b) in enumerate(wk, 1)) + "</div>"))

# 24
pages.append(page(24, "PART TWO · MEASUREMENT", "9. MEASUREMENT AND BASELINE", "Measure direction, not promises.",
  p("You can’t tell whether visibility moved unless you lock in the starting point and retest the same questions every month. No rankings or figures are promised here. Direction is the metric.", "lead")
  + table(["INDICATOR", "CURRENT VALUE", "WHAT IT MEASURES"], [["AI visibility", "34 of 100", "How often and how well it appears"], ["AI citations", 5, "How many answers cite Mi Clip"], ["Organic traffic", "154 per month", "Estimated visits from search"], ["Organic keywords", 217, "Keywords with a Google position"], ["Keywords in top 10", 38, "First-page positions"], ["Referring domains", 26, "External authority"], ["Pages with a direct answer", "0 of 34", "Pages with a quotable question and answer"], ["Pages without a title", "6 of 34", "Basic technical hygiene"]], ["36%", "22%", None])
  + label("A FIXED SET OF QUESTIONS, RUN MONTHLY IN CHATGPT, PERPLEXITY AND GOOGLE AI OVERVIEWS")
  + '<ol class="num">' + "".join(f"<li>{e(q)}</li>" for q in ["Best payment app in Mexico without cash.", "An app to pay by phone with QR and contactless.", "What’s the difference between Mi Clip and Clip for businesses?", "Is Mi Clip safe?", "How to add money by SPEI, CLABE, cash or card.", "A cashback app in Mexico.", "Paying for public transit with your phone.", "Mi Clip Cuenta cash deposit fees."]) + "</ol>"
  + p("Each run logs whether Mi Clip shows up correctly as a consumer wallet; how often answers cite miclip.mx or the app stores compared with competitors; where the gaps are (NFC, QR, cash deposits); and any answer that raises doubts about cashback, support or safety without pointing to the official terms. Google Play and App Store reviews are checked weekly as well.", "lead")))

# 25
pages.append(page(25, "PART TWO · CONCLUSIONS", "CONCLUSIONS", "Being found isn’t enough anymore. Be understood.",
  '<div class="concl">'
  + p("The journey changed in the US first, and it’s already here in Mexico: the AI answer is the new front page, and agents like Muse already compare options and buy once the user says yes.")
  + p("On that journey, a brand without clear pages and a consistent identity across every engine never makes the shortlist. This isn’t a product problem. It’s a readability problem.")
  + p("Mi Clip starts with things others would have to build from scratch: open access, a group behind it, solid legal standing and a real app store reputation. Its gap is identity and answers, not access.")
  + p("The opportunity is already sized: 631,710 monthly searches on topics it already covers, a universe where 79% of searches are informational, and one core cluster, paying by phone, that nobody owns yet.")
  + p("AI visibility can’t be bought and can’t be guaranteed. It’s built the slow way, one engine and one question at a time, by publishing the answers that don’t exist today.")
  + '</div><div class="sign"><b>Found. Understood. Recommended.</b><span>Geonos AI · getgeonos.com · November 2026</span></div>'))

CSS = """
@page { size: A4; margin: 0 }
:root { --ink:#141218; --body:#55525d; --muted:#8a8794; --vio:#6a4fe0; --line:#e6e4ec }
* { box-sizing: border-box }
body { margin:0; background:#fff; color:var(--ink); font-family:'Montserrat',system-ui,sans-serif; -webkit-print-color-adjust:exact; print-color-adjust:exact }
.page { position:relative; width:210mm; height:297mm; padding:20mm 16mm 22mm; overflow:hidden; page-break-after:always; break-after:page }
.glow { position:absolute; left:50%; top:-55mm; width:120mm; height:120mm; transform:translateX(-50%); border-radius:50%; background:radial-gradient(circle,#efedfb 0,#f6f5fd 45%,rgba(255,255,255,0) 70%); z-index:0 }
.glow.big { top:-40mm; width:130mm; height:130mm }
.page > *:not(.glow):not(.bot):not(.cnote2) { position:relative; z-index:1 } .bot, .cnote2 { z-index:1 }
.top { display:flex; justify-content:space-between; align-items:center; padding-bottom:5mm; border-bottom:1px solid var(--line); margin:-8mm 0 10mm }
.brand { display:flex; align-items:center; gap:4mm } .mk svg { width:12mm; height:12mm; color:var(--ink); display:block }
.wd { font-weight:600; letter-spacing:.32em; font-size:11pt } .sec { font-size:7.5pt; color:var(--body); letter-spacing:.02em }
.bot { position:absolute; left:16mm; right:16mm; bottom:10mm; display:flex; justify-content:space-between; border-top:1px solid var(--line); padding-top:2.5mm; font-size:7pt; color:var(--muted) }
.bot .b { color:var(--ink); font-weight:600 }
.eyebrow { color:var(--vio); font-size:7.5pt; font-weight:500; letter-spacing:.02em; margin-bottom:4mm }
.eyebrow.wide { letter-spacing:.3em; font-size:9pt; text-align:center }
h1 { font-size:27pt; line-height:1.12; font-weight:700; margin:0 0 7mm; max-width:130mm; letter-spacing:-.01em; text-wrap:balance }
h2 { font-size:25pt; margin:0 0 3mm; font-weight:700 } h3.mid { font-size:12.5pt; margin:5mm 0 3mm; font-weight:600; }
p { margin:0 0 3mm } .lead { font-size:9.6pt; line-height:1.55; color:var(--body) } .close { font-size:10pt; line-height:1.5; color:var(--ink); margin-top:1mm }
.grad { display:inline-block; -webkit-text-fill-color:transparent; background:linear-gradient(90deg,#5aa2ff,#b88bf5 45%,#e57fe0 70%,#f58fae); -webkit-background-clip:text; background-clip:text; color:transparent }
.ba { border-bottom:1px solid var(--line); padding-bottom:4mm; margin-bottom:4mm } .ba p { margin-left:58mm; font-size:10pt; line-height:1.55; color:var(--body) }
.stats { display:flex; gap:0; margin:5mm 0 5mm } .st { flex:1; padding:0 4mm; border-left:1px solid var(--line) } .st:first-child { border-left:0; padding-left:0 }
.st b { display:block; font-size:19pt; font-weight:800; margin-bottom:1.5mm } .st span { font-size:7.5pt; color:var(--body); line-height:1.35; display:block }
.label { color:var(--vio); font-size:7.5pt; font-weight:500; margin:5mm 0 2.5mm; text-transform:uppercase }
.bl { list-style:none; padding:0; margin:0 0 3mm } .bl li { position:relative; padding-left:6mm; margin-bottom:2.6mm; font-size:9pt; line-height:1.4 }
.bl li::before { content:''; position:absolute; left:0; top:1.6mm; width:1.6mm; height:1.6mm; border-radius:50%; background:var(--vio) }
.bl strong { font-weight:600 } .bl span { display:block; color:var(--body); font-size:8.3pt; margin-top:.6mm }
.tb { width:100%; border-collapse:collapse; font-size:8.3pt; margin:2mm 0 4mm } .tb th { text-align:left; color:var(--vio); font-weight:500; font-size:7.3pt; padding:1.6mm 1mm; border-bottom:1px solid #cfccd9 }
.tb td { padding:1.6mm 1mm; border-bottom:1px solid var(--line); color:var(--body) } .tb td.k { color:var(--ink); font-weight:600 } .pil td { font-size:9.5pt; padding:2.6mm 1mm } .pil td.lv { color:var(--vio); font-weight:600 }
.tl { margin-top:6mm } .ti { position:relative; padding:0 0 6mm 10mm; border-left:1.5px solid #d9d6e4; margin-left:2.5mm } .ti:last-child { border-left-color:transparent }
.dot { position:absolute; left:-2.2mm; top:4mm; width:3.6mm; height:3.6mm; border-radius:50%; background:var(--vio) } .tm { color:var(--vio); font-size:7pt } .tt { font-size:11.5pt; font-weight:600; margin:.5mm 0 1mm } .td { font-size:8.6pt; color:var(--body); line-height:1.45 }
.brands { display:grid; grid-template-columns:1fr 1fr; gap:4mm 10mm; margin:2mm 0 6mm } .brands div { font-size:14pt; font-weight:600; padding-left:6mm; position:relative }
.brands div::before { content:''; position:absolute; left:0; top:2.6mm; width:1.6mm; height:1.6mm; border-radius:50%; background:var(--vio) }
.steps { list-style:none; padding:0; margin:0 0 4mm } .steps li { display:flex; gap:9mm; margin-bottom:4mm } .steps .n { color:var(--vio); font-size:8pt; padding-top:1.3mm; flex:0 0 3mm }
.steps strong { display:block; font-size:11.5pt; font-weight:600; margin-bottom:1mm } .steps span { font-size:9pt; color:var(--body); line-height:1.45 }
.engines { text-align:center; margin:7mm 0; padding-bottom:6mm; border-bottom:1px solid var(--line) } .engines div { font-size:15pt; font-weight:600; margin-bottom:4mm } .engines i { color:var(--muted); font-style:normal; margin:0 2mm }
.cover { text-align:center; padding-top:52mm } .cmark svg { width:34mm; height:34mm; color:var(--ink) } .cmark.sm svg { width:28mm; height:28mm } .cmark { margin-bottom:14mm }
.ct { font-size:29pt; font-weight:700; line-height:1.2; white-space:nowrap } .csub { font-size:11pt; color:var(--body); max-width:120mm; margin:7mm auto 9mm; line-height:1.55 }
.pills { display:flex; justify-content:center; gap:5mm } .pills span { border:1px solid #d9d6e4; border-radius:20mm; padding:3mm 7mm; font-size:10.5pt; font-weight:600 } .pills i { color:var(--vio); font-style:normal; margin-right:3mm }
.cnote2 { position:absolute; left:0; right:0; bottom:24mm; font-size:8.5pt; color:var(--body) } .cnote2.caps { font-weight:600; color:var(--ink); letter-spacing:.02em; font-size:8pt }
.cl { display:flex; border-top:1px solid var(--line); padding:2.6mm 0 2mm } .cn { flex:0 0 30mm; width:30mm; color:var(--vio); font-size:7.3pt; padding-top:1mm } .cb { flex:1 }
.ch { display:flex; justify-content:space-between; font-size:11.5pt; font-weight:600; margin-bottom:1.5mm } .ch span:last-child { font-size:8pt; font-weight:400; color:var(--body) }
.kw { display:flex; justify-content:space-between; font-size:8.3pt; color:var(--body); padding:.5mm 0 } .cnote { font-size:7.8pt; color:var(--body); margin-top:1.5mm; line-height:1.4 }
.dense .ch { font-size:10.5pt } .dense .kw { font-size:7.9pt; padding:.25mm 0 } .dense .cl { padding:2mm 0 1.4mm } .dense h1 { margin-bottom:5mm }
.big1 b { display:block; font-size:22pt; font-weight:800; margin-top:4mm } .big1 span { font-size:7.8pt; color:var(--body) }
.qs { list-style:none; padding-left:6mm; margin:0 } .qs li { font-size:9.2pt; margin-bottom:1.8mm; color:var(--ink) }
.num { padding-left:10mm; margin:0 0 4mm } .num li { font-size:9pt; margin-bottom:1.6mm }
.weeks .wk { display:flex; gap:6mm; border-bottom:1px solid var(--line); padding:2.6mm 0 } .wn { flex:0 0 22mm; width:22mm; color:var(--vio); font-size:7.5pt; padding-top:1mm }
.wk strong { display:block; font-size:10.5pt; font-weight:600; margin-bottom:.8mm } .wk span { font-size:8.4pt; color:var(--body); line-height:1.4 }
.concl { padding-left:6mm } .concl p { font-size:9.8pt; color:var(--body); line-height:1.55; margin-bottom:4mm }
.sign { text-align:center; border-top:1px solid var(--line); margin-top:6mm; padding-top:5mm } .sign b { display:block; font-size:13pt; font-weight:600; margin-bottom:2mm } .sign span { font-size:8pt; color:var(--body) }
"""
doc = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Mi Clip · Complete visibility audit · Geonos</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"><style>{CSS}</style></head><body>{"".join(pages)}</body></html>'''
OUT.write_text(doc, encoding="utf-8")
print("pages", len(pages), "->", OUT)
