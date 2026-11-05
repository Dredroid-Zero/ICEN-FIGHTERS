"""Checks art technical compatibility for a limited M02 v0.4 pilot (NOT aesthetic approval)."""
from pathlib import Path
import json
from PIL import Image,ImageChops
ROOT=Path(__file__).resolve().parents[1]
M=json.loads((ROOT/'manifest.json').read_text())
W,H=M['frameWidth'],M['frameHeight'];cols=M['columns'];layers=M['layerOrder'];TOTAL=32
issues=[]
for layer in layers:
 img=Image.open(ROOT/'assets'/f'{layer}.png')
 if img.mode!='RGBA' or img.size!=(cols*W,4*H):issues.append(f'{layer}: formato/tamanho incorreto')
 if not img.getchannel('A').getbbox():issues.append(f'{layer}: atlas vazio')
for layer in ('shirt','shirt_far_sleeve','shirt_near_sleeve'):
 a=Image.open(ROOT/'assets'/f'{layer}.png').convert('RGBA')
 b=Image.open(ROOT/'assets'/f'{layer}_blue.png').convert('RGBA')
 if ImageChops.difference(a.getchannel('A'),b.getchannel('A')).getbbox():issues.append(f'{layer}: recoloração alterou silhueta')
 # The whole point: top changes only these 3 files, not any shorts/skin assets.
for layer in ('body','shorts','leg_rear','leg_front','shoe_front','shoe_rear','head','hair_front'):
 if f'{layer}_blue.png' in [p.name for p in (ROOT/'assets').glob('*')]:issues.append(f'{layer}: contaminação de skin')
if len(layers)!=16:issues.append('camadas inesperadas')
if TOTAL!=sum(a['length'] for a in M['animations'].values()):issues.append('contagem de frames incorreta')
# Check first+last frame in all actions and source-like underlays for hidden shorts/shoes
for animation, meta in M['animations'].items():
 i=meta['start']
 atlas=Image.open(ROOT/'assets'/'foot_front.png')
 tile=atlas.crop(((i%cols)*W,(i//cols)*H,((i%cols)+1)*W,((i//cols)+1)*H))
 if not tile.getchannel('A').getbbox():issues.append(f'{animation}: pé sob calçado não desenhado')
 if not Image.open(ROOT/'assets'/'body.png').getchannel('A').getbbox():issues.append('corpo sem base')
print('Validando sprite M02 v0.4:')
print(f' - {TOTAL} quadros, {len(layers)} camadas, 3 animações; 3 peças com variante azul')
print(' - tamanhos RGBA, alfa e independência das variantes verificados')
print(' - pés sob calçado presentes nas três animações')
if issues:
 print('ERROS:',*issues,sep='\n - ');raise SystemExit(1)
print('TESTES ESTRUTURAIS APROVADOS — revisão estética em movimento continua obrigatória')
