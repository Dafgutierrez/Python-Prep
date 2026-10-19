import json,csv,datetime,shutil,os,glob
from openpyxl import Workbook
from openpyxl.drawing.image import Image as XImg
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from PIL import Image
P=json.load(open('posts.json')); car=json.load(open('carousels.json')); MX=json.load(open('mx_prompts.json'))
start=datetime.date(2026,10,18)
for p in P:
    p['week']=(datetime.date.fromisoformat(p['date'])-start).days//7+1; p['full']=p['text'].rstrip()+"\n\n"+p['tags']
    c=car.get(str(p['n'])); p['format']='Carrusel PDF' if c else 'Imagen'
    p['file']=(c['file']+'.pdf') if c else f"img-{p['n']:02d}.png"
    p['alt_or_title']=(c['file'].replace('-',' ')) if c else p['alt']
# ---- thumbs
for p in P:
    src=f"carruseles/prev-{p['n']}-1.png" if str(p['n']) in car else f"img-{p['n']:02d}.png"
    Image.open(src).convert('RGB').resize((240,300)).save(f"thumb-{p['n']:02d}.png")
# ---- per-date folders
for d in ('textos_por_fecha','imagenes','carruseles_por_fecha'):
    shutil.rmtree(d,ignore_errors=True); os.makedirs(d)
for p in P:
    open(f"textos_por_fecha/{p['date']}_post-{p['n']:02d}.txt",'w',encoding='utf-8',newline='\n').write(p['full']+"\n")
    if str(p['n']) in car: shutil.copy(f"carruseles/{car[str(p['n'])]['file']}.pdf",f"carruseles_por_fecha/{p['date']}_{car[str(p['n'])]['file']}.pdf")
    else: shutil.copy(f"img-{p['n']:02d}.png",f"imagenes/{p['date']}_img-{p['n']:02d}.png")
# ---- alt text file
L=["TEXTOS ALTERNATIVOS Y TÍTULOS DE DOCUMENTO","Para imágenes sueltas: al subir la imagen, botón ALT, pega el texto y pulsa Add. Para carruseles (PDF): LinkedIn usa el nombre del archivo como título del documento; el texto de la publicación va igual.","Guía de longitud: unos 125 caracteres (no es un límite oficial de LinkedIn).",""]
for p in P:
    if p['format']=='Imagen': L+= [f"{p['date']}  ·  {p['file']}  ·  {len(p['alt'])} caracteres",f"ALT: {p['alt']}",""]
    else: L+= [f"{p['date']}  ·  {car[str(p['n'])]['file']}.pdf  ·  carrusel de {len(car[str(p['n'])]['slides'])} láminas",f"TÍTULO DEL DOCUMENTO: {p['alt_or_title']}",""]
open('textos-alternativos.txt','w',encoding='utf-8').write('\n'.join(L))
# ---- prompt coverage
dateof={p['n']:p['date'] for p in P}
cover={1:[19],2:[19],3:[19],4:[19,31],5:[6],6:[22,24],7:[24],8:[17,19],45:'R:toca publicidad (no se menciona)',9:[16],10:[16],11:[16,30],12:[16],13:[17],14:[16,17],15:[19,30],46:[18],47:[21],48:[23],
16:[13],17:[20],18:'R:toca pagos a plataformas (no se menciona)',19:[20],20:'R:precio de un servicio',21:'R:producto y precio',22:'R:producto y precio',49:'R:precio y pagos (no se menciona)',
23:[6,20],24:[20,22],25:[4,20],26:[14],27:[30],28:[28],29:[28],30:[29],31:[8],32:[28],50:[6],
33:'R:agencia o servicio',34:'R:agencia o servicio',35:'R:agencia o servicio',36:'R:agencia o servicio',37:'R:herramienta o agencia',38:'R:curso (después del lanzamiento)',39:[19],40:'R:servicio',51:[29],52:[29],53:'R:agencia o servicio',
41:[13,26],42:[27],43:[25,27],44:'R:agencia o servicio'}
KW={1:('como aparecer en las busquedas de google',30),2:('posicionamiento en google',140),3:('como aparecer en los primeros resultados de google',30),4:('aparecer en buscador google',30),5:('mejor agencia de seo en mexico',20),6:('ai and seo',140),7:('palabras clave competencia',50),8:('ai and seo',140),45:('publicidad en redes sociales',720),9:('ai seo',50),10:('ia para marketing',70),11:('como funciona el seo',40),12:('diferencia entre seo y sem',260),13:('ai and seo',140),14:('que es seo',1600),15:('posicionamiento seo',480),46:('posicionamiento en google',140),47:('ai for seo',110),48:('trafico web',390),16:('seo gratis google',30),17:('seo gratis',70),18:('seo gratis',70),19:('herramientas seo',260),20:('cuanto cobra una agencia de marketing digital en mexico',110),21:('herramientas seo',260),22:('monitoreo de redes sociales',90),49:('cuanto cobra una agencia de marketing digital en mexico',110),23:('ai seo',50),24:('metricas para medir resultados',40),25:('analisis seo',110),26:('keywords en español',140),27:('posicionamiento seo',480),28:('ia para marketing',70),29:('ia para marketing',70),30:('auditoria seo',90),31:('metricas de marketing',170),32:('informe de marketing',30),50:('experto seo',210),33:('mejor agencia de seo en mexico',20),34:('agencia seo cdmx',3600),35:('agencia posicionamiento monterrey',40),36:('las mejores agencias de seo en mexico',20),37:('contratar una agencia',30),38:('curso seo',170),39:('curso gratuito seo',90),40:('experto seo',210),51:('agencia de seo en mexico',390),52:('contratar agencia de marketing',30),53:('contrato agencia de marketing digital',20),41:('como publicar en google mi negocio',30),42:('agencia seo para pymes',30),43:('estrategias para vender',90),44:('agencia seo para pymes',30)}
cov_rows=[]
for r in sorted(MX,key=lambda r:r['n']):
    c=cover[r['n']]; kw=KW[r['n']]
    if isinstance(c,list): posts='; '.join(f"{dateof[n]} (post {n})" for n in sorted(c,key=lambda n:dateof[n])); st='Cubierto en LinkedIn'
    else: posts='—'; st='Reservado: '+c[2:]
    cov_rows.append([r['n'],r['prompt'],r['tema'],r['cat'],r['etapa'],kw[0],kw[1],st,posts])
ncov=sum(1 for r in cov_rows if r[7].startswith('Cubierto')); print('covered',ncov,'reserved',len(cov_rows)-ncov)
# ---- md
HEAD=["# Calendario de LinkedIn: diez semanas, 31 publicaciones en español (actualizado 2026-10-19)","",
"Documento interno. Empieza hoy lunes 19 de octubre de 2026 (el domingo 18 ya salió la publicación 1). Después: jueves, sábado y lunes, hasta el sábado 26 de diciembre. Ninguna menciona el producto, ni habla de publicidad, ni lleva logo; las imágenes usan solo la paleta de la marca y Inter. Reglas en `docs/LINKEDIN-PLAN.md`.","",
"**Qué cambió el 2026-10-19:** se amplió de 15 a 31 publicaciones con el estudio de prompts de México (53 prompts de Elena y Rafael, del 10 de octubre), la investigación de Martin, `docs/RECOMMENDATIONS.md`, `docs/SEARCH-CHANGES.md`, `docs/MARKET-SIGNALS.md` y `spec/data-logic/H`. Cada publicación dice qué prompt de México responde (columna Prompt). Hoy sale el carrusel de definiciones (SEO, AEO y GEO).","",
"**Formatos:** 17 imágenes y 14 carruseles (PDF de 6 a 8 láminas con texto seleccionable). Series: Qué es, Cómo aparecer, Cómo saber si sales, Mitos, Datos, SEO base, PyME y local, Elegir con criterio, Amazon y Alexa, Cambio de la semana.","",
"**Cómo copiar el texto sin que se rompa:** usa los archivos .txt (uno por publicación) o la columna H del Excel con la celda en modo edición. No copies desde el chat. Las comillas son tipográficas (“ ”).","",
"**Alt text:** en imágenes sueltas, botón ALT al subir la imagen. En carruseles el título del documento es el nombre del archivo. Todo en `textos-alternativos.txt`.","",
"**Antes de publicar cada una:** abre la fuente original y confirma fechas y cifras (columna Verifica). Varias afirmaciones vienen de estudios de terceros o de notas de prensa que no se pudieron abrir desde el sandbox: si no puedes abrir la fuente, quita la cifra. Fechas navideñas: 24 y 26 de diciembre; muévelas a enero si prefieres.","",
"**Prompts reservados (15 de 53):** los que hablan de precio de un servicio, herramientas, agencias, cursos o pagos a plataformas no se usan antes del lanzamiento. Lista completa en `ESTUDIO-PROMPTS-MEXICO.md` y en la hoja “Prompts de México” del Excel.","",
"| Sem | Fecha | Formato | Serie | Archivo | Titular |","|---|---|---|---|---|---|"]
md=list(HEAD)
for p in P: md.append(f"| {p['week']} | {p['day']} {p['date']} | {p['format']} | {p['serie']} | {p['file']} | {p['headline']} |")
md.append("")
for p in P:
    md+= [f"## Semana {p['week']} · {p['day']} {p['date']} · {p['serie']}","",f"**Formato:** {p['format']}. **Archivo:** `{p['file']}`. Titular: {p['headline']}",f"**Prompt de México que responde:** {p['prompt'] or '—'}","",("**Texto alternativo (pégalo en el botón ALT):** "+p['alt']) if p['format']=='Imagen' else ("**Título del documento:** "+p['alt_or_title']),"","**Texto de la publicación (ya con hashtags):**","","```",p['text'],"","",p['tags'],"```","",f"**Verifica antes de publicar:** {p['verify']}","",f"**No decir:** {p['nosay']}",""]
open('LINKEDIN-CALENDAR.md','w').write('\n'.join(md))
# ---- prompts md
E=["# Estudio de prompts de México y cómo lo cubre LinkedIn","","Fuente: `geonos_elena_mx-es_2026-10-10-v2_OK.md` (53 prompts) y `geonos_rafael_mx-es_2026-10-10_OK.md` (keyword más cercana de Semrush, base México). **El volumen es el de la keyword de Google más cercana, no el del prompt**: en la base de México no hay volumen para GEO, AEO, llms.txt ni “aparecer en ChatGPT”. Los prompts no tienen volumen de búsqueda público.","",f"Cubiertos en LinkedIn: {ncov} de 53. Reservados para después del lanzamiento: {53-ncov}.","","| # | Prompt | Tema | Categoría | Etapa | Keyword más cercana | Volumen/mes | Estado | Publicaciones |","|---|---|---|---|---|---|---|---|---|"]
for r in cov_rows: E.append('| '+' | '.join(str(x) for x in r)+' |')
open('ESTUDIO-PROMPTS-MEXICO.md','w').write('\n'.join(E)+'\n')
# ---- csv
with open('calendar.csv','w',newline='',encoding='utf-8') as f:
    w=csv.writer(f); w.writerow(['semana','fecha','dia','formato','serie','prompt_de_mexico','archivo','titular','texto_con_hashtags','hashtags','alt_text_o_titulo_documento','verifica','no_decir'])
    for p in P: w.writerow([p['week'],p['date'],p['day'],p['format'],p['serie'],p['prompt'],p['file'],p['headline'],p['full'],p['tags'],p['alt_or_title'],p['verify'],p['nosay']])
# ---- xlsx
wb=Workbook(); wb.remove(wb.active)
H=['Semana','Fecha','Día','Formato','Serie','Prompt de México que responde','Archivo','Vista previa (portada)','Texto para pegar en LinkedIn (ya incluye hashtags)','Hashtags','Alt text (imagen) o título del documento (carrusel)','Verifica antes de publicar','No decir','Estado']
W=[9,12,14,14,20,34,30,24,78,28,44,52,40,14]
fill=PatternFill('solid',fgColor='5E30B5'); thin=Side(style='thin',color='D4D4D8')
def col(c): 
    from openpyxl.utils import get_column_letter; return get_column_letter(c)
def sheet_(name,posts):
    ws=wb.create_sheet(name); ws.append(H)
    for c in range(1,len(H)+1):
        cell=ws.cell(1,c); cell.font=Font(bold=True,color='FFFFFF'); cell.fill=fill; cell.alignment=Alignment(wrap_text=True,vertical='center'); ws.column_dimensions[col(c)].width=W[c-1]
    ws.row_dimensions[1].height=32
    for i,p in enumerate(posts,start=2):
        ws.append([p['week'],p['date'],p['day'],p['format'],p['serie'],p['prompt'],p['file'],'',p['full'],p['tags'],p['alt_or_title'],p['verify'],p['nosay'],'Publicada' if p['n']==1 else 'Pendiente'])
        ws.row_dimensions[i].height=250
        for c in range(1,len(H)+1):
            cell=ws.cell(i,c); cell.alignment=Alignment(wrap_text=True,vertical='top'); cell.border=Border(top=thin,bottom=thin,left=thin,right=thin)
        x=XImg(f"thumb-{p['n']:02d}.png"); x.width=170; x.height=212; ws.add_image(x,f"H{i}")
    dv=DataValidation(type='list',formula1='"Pendiente,Verificado,Programado,Publicada"',allow_blank=False); ws.add_data_validation(dv); dv.add(f"N2:N{len(posts)+1}")
    ws.freeze_panes='A2'
for k in range(1,11): sheet_(f"Semana {k}",[p for p in P if p['week']==k])
sheet_('Todo',P)
ws=wb.create_sheet('Prompts de México'); HH=['#','Prompt','Tema','Categoría','Etapa','Keyword más cercana (Semrush MX)','Volumen/mes (de la keyword)','Estado','Publicaciones (fecha y número)']; ws.append(HH)
for c in range(1,len(HH)+1):
    cell=ws.cell(1,c); cell.font=Font(bold=True,color='FFFFFF'); cell.fill=fill; cell.alignment=Alignment(wrap_text=True,vertical='center')
for c,wd in enumerate([6,60,22,14,16,42,16,34,52],start=1): ws.column_dimensions[col(c)].width=wd
for r in cov_rows: ws.append(r)
for row in ws.iter_rows(min_row=2):
    for cell in row: cell.alignment=Alignment(wrap_text=True,vertical='top')
ws.freeze_panes='A2'
wb.save('LinkedIn-calendario.xlsx')
# ---- contact sheet
ims=[Image.open(f"thumb-{p['n']:02d}.png").resize((180,225)) for p in P]
cols=8; rows=(len(ims)+cols-1)//cols
S=Image.new('RGB',(180*cols,225*rows),'#111')
for i,im in enumerate(ims): S.paste(im,((i%cols)*180,(i//cols)*225))
S.save('contact-sheet.png'); print('built',len(P))
