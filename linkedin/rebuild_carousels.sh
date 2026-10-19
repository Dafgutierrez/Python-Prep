#!/bin/sh
# Rebuilds every carousel (PDF + previews), trims the PDFs to exactly 1080x1350 px, keeps the hand-designed carousel 16 (hoy/final.pdf), then rebuilds the by-date folders.
set -e
export NODE_PATH=$(npm root -g)
export FONT_DIR=${FONT_DIR:-$(dirname $(find /home/user/heygen-com -name 'Inter-400-latin.woff2' | head -1))}
HOY=${HOY:-../hoy}
node carousel.cjs | grep -E "AUDIT|Error" || true
python3 - "$HOY" <<'PY'
import glob,shutil,sys
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject
H=sys.argv[1].rstrip('/')+'/'
for f in glob.glob('carruseles/*.pdf'):
    if 'Tres-siglas' in f:
        shutil.copy(H+'final.pdf',f); continue
    r=PdfReader(f);w=PdfWriter()
    for p in r.pages:
        W=float(p.mediabox.width);Hh=float(p.mediabox.height)
        b=RectangleObject([0,Hh-1012.5,W,Hh]);p.mediabox=b;p.cropbox=b;p.trimbox=b;p.bleedbox=b;p.artbox=b;w.add_page(p)
    t=(r.metadata or {}).get('/Title')
    if t: w.add_metadata({'/Title':str(t)})
    w.write(f)
for i in range(1,11): shutil.copy(H+f'lamina-{i:02d}.png',f'carruseles/prev-16-{i}.png')
PY
python3 build_all2.py | tail -1
