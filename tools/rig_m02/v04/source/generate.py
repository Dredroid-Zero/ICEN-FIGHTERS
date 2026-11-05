#!/usr/bin/env python3
"""ICEN Fighters: original parametric layer artwork for M02, NOT segmented from concept.
Each part drawn on its own SVG surface; PNG sprites exported in per-layer atlases.
Reference only for silhouette/proportions. No copying cropped pixels from the v0.2 artwork.
"""
import math, os, json, io, colorsys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import cairosvg

ROOT=Path(__file__).resolve().parents[1]; ASSETS=ROOT/'assets'; PRE=ROOT/'previews'
ASSETS.mkdir(parents=True,exist_ok=True);PRE.mkdir(parents=True,exist_ok=True)
W,H=182,320
OUTLINE='#172134'; SKIN='#D79763'; SKIN_L='#F6BF86'; SKIN_H='#FFCE97'; SKIN_SHADE='#AC603E'; SKIN_DARK='#87452F'
SHIRT='#E9EBE2'; SHIRT_SHADE='#ABBACC'; SHIRT_H='#FFF8E8'
BLUE='#3395C5'; BLUE_SHADE='#16618B'; BLUE_H='#73C9EA'
SHORTS='#172D4C'; SHORTS_SHADE='#0A1B34'; SHORTS_H='#40597B'
HAIR='#38281F'; HAIR_L='#77533A'; HAIR_D='#201C24'
SNEAKER='#E7F0ED'; SNEAKER_D='#2A4158'; SNEAKER_H='#FFFFFF'
CANVAS=(W,H)

slots=['leg_rear','leg_front','body','arm_far','shirt_far_sleeve','shorts','shirt','arm_near','shirt_near_sleeve','head','hair_back','hair_front','shoe_rear','shoe_front']
# use z-order after correcting layers below: footwear should sit on legs, head atop torso
slots=['hair_back','leg_rear','leg_front','body','arm_far','shirt_far_sleeve','shorts','shirt','arm_near','shirt_near_sleeve','foot_rear','foot_front','shoe_rear','shoe_front','head','hair_front']
variants=['original','blue']

# SVG helper

def wrap(elements):
 return '<svg xmlns="http://www.w3.org/2000/svg" width="182" height="320" viewBox="0 0 182 320" shape-rendering="geometricPrecision">' + ''.join(elements) + '</svg>'

def path(d,fill,stroke=OUTLINE,sw=2,extras=''):
 return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" {extras}/>'

def line(d,stroke,sw=1,extras=''):
 return f'<path d="{d}" fill="none" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" {extras}/>'

def ell(cx,cy,rx,ry,fill,stroke=OUTLINE,sw=2):
 return f'<ellipse cx="{cx:.2f}" cy="{cy:.2f}" rx="{rx}" ry="{ry}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'

def pg(points,fill,stroke=OUTLINE,sw=2):
 return '<polygon points="'+' '.join(f'{x:.1f},{y:.1f}' for x,y in points)+f'" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"/>'

def move(v,x=0,y=0): return (v[0]+x,v[1]+y)

def limb(a,b,r0,r1,fill,shade,edge=OUTLINE):
 ax,ay=a;bx,by=b
 vx,vy=bx-ax,by-ay;length=max(1,(vx*vx+vy*vy)**.5); nx,ny=-vy/length,vx/length
 P=lambda k,t:(k[0]+nx*t,k[1]+ny*t)
 aa=P(a,r0);bb=P(b,r1);cc=P(b,-r1);dd=P(a,-r0)
 d=f'M{aa[0]:.1f} {aa[1]:.1f} L{bb[0]:.1f} {bb[1]:.1f} Q{bx:.1f} {by:.1f} {cc[0]:.1f} {cc[1]:.1f} L{dd[0]:.1f} {dd[1]:.1f} Q{ax:.1f} {ay:.1f} {aa[0]:.1f} {aa[1]:.1f}Z'
 shadow=[P(a,-r0*.52),P(b,-r1*.52),P(b,-r1*.88),P(a,-r0*.85)]
 highlight0=P(a,r0*.55);highlight1=P(b,r1*.5)
 return path(d,fill,edge,2.1)+pg(shadow,shade,'none',0)+line(f'M{highlight0[0]:.1f} {highlight0[1]:.1f} Q{(ax+bx)/2+nx*r0*.5:.1f} {(ay+by)/2+ny*r0*.5:.1f} {highlight1[0]:.1f} {highlight1[1]:.1f}',SKIN_H,1.3)

def glove(wrist,upper=False):
 # fist with 3 knuckle divisions, upper guard
 x,y=wrist
 return ell(x,y,9.5,10.5,SKIN,OUTLINE,2.3)+path(f'M{x-7} {y-1} Q{x-3} {y-8} {x+5} {y-5}',SKIN_L,'none',0)+line(f'M{x-2} {y-5}l3 3 M{x+2} {y-6}l3 3',SKIN_DARK,1.1)

def foot_skin(ankle,toe):
 x,y=ankle;tx,ty=toe;angle=math.degrees(math.atan2(ty-y,tx-x)); length=max(14,math.hypot(tx-x,ty-y))
 return f'<g transform="translate({x:.1f} {y:.1f}) rotate({angle:.1f})">'+path(f'M-5 -6 Q3 -9 8 -7 L{length-4:.1f} -3 Q{length+2:.1f} -2 {length:.1f} 5 L-4 6Z',SKIN)+line(f'M{length-5:.1f} 0 l2 2 M{length-9:.1f} -1l2 2',SKIN_DARK,1.0)+'</g>'

def shoe(ankle,toe,is_kick=False):
 x,y=ankle;tx,ty=toe;dx=tx-x;dy=ty-y
 # independent complete shoe, ankle-to-toe is oriented toward kick
 angle=math.degrees(math.atan2(dy,dx))
 # make relative coordinates (toe length based on distance if kick)
 length=math.hypot(dx,dy);length=max(length,20)
 rot=f'transform="translate({x:.1f} {y:.1f}) rotate({angle:.1f})"'
 parts=[f'<g {rot}>',path(f'M-8 -9 Q-1 -14 9 -8 L{length-3:.1f} -5 Q{length+2:.1f} -2 {length:.1f} 5 L-7 7Z',SNEAKER,SNEAKER_D,2.5),
 path(f'M-8 3 L{length:.1f} 3 Q{length+2:.1f} 5 {length:.1f} 8 L-8 8Z',SNEAKER_D,SNEAKER_D,1),
 path('M-7 -9 L1 -10 L10 -6 L8 2 L-6 2Z',SNEAKER_D,SNEAKER_D,1),
 line(f'M5 -4 L14 -2 M8 -7L17 -5 M11 -8L20 -6',SNEAKER_H,1.5),
 line(f'M{length-12:.1f} -3L{length-4:.1f} -1', '#94D5E6',2),'</g>']
 return ''.join(parts)

BASE={
 'root':(87,183),'hip_rear':(74,184),'knee_rear':(43,238),'ankle_rear':(19,291),'toe_rear':(5,301),
 'hip_front':(102,183),'knee_front':(135,237),'ankle_front':(145,292),'toe_front':(165,302),
 'shoulder_far':(113,106),'elbow_far':(133,143),'wrist_far':(140,111),
 'shoulder_near':(70,108),'elbow_near':(63,141),'wrist_near':(96,113),
 'neck':(94,90),'head':(99,54),'torso':(91,132),'waist':(89,170), 'lean':(0,0)
}

# Punch and kick artist-authored key poses; tweened motion of joints (not masks from reference)
PUNCH={
 0:{},
 1:{'root':(89,183),'wrist_near':(106,107),'elbow_near':(70,142),'head':(100,55)},
 2:{'root':(96,183),'wrist_near':(123,103),'elbow_near':(95,113),'shoulder_near':(76,106),'head':(104,56),'neck':(99,91),'torso':(97,133),'waist':(94,171)},
 3:{'root':(99,183),'wrist_near':(154,102),'elbow_near':(118,109),'shoulder_near':(80,105),'head':(107,56),'neck':(102,91),'torso':(100,133),'waist':(96,171)},
 4:{'root':(99,183),'wrist_near':(154,102),'elbow_near':(118,109),'shoulder_near':(80,105),'head':(107,56),'neck':(102,91),'torso':(100,133),'waist':(96,171)},
 5:{'root':(95,183),'wrist_near':(124,108),'elbow_near':(96,120),'shoulder_near':(76,106),'head':(103,55),'neck':(99,91),'torso':(96,132),'waist':(93,171)},
 6:{'root':(90,183),'wrist_near':(102,112),'elbow_near':(67,141),'head':(100,54)},
 7:{},
}
KICK={
 0:{},1:{'hip_front':(103,182),'knee_front':(123,217),'ankle_front':(146,266),'toe_front':(164,276),'root':(88,184)},
 2:{'hip_front':(102,181),'knee_front':(124,198),'ankle_front':(141,235),'toe_front':(159,241),'root':(86,185),'torso':(88,133),'head':(96,53)},
 3:{'hip_front':(101,181),'knee_front':(145,190),'ankle_front':(156,190),'toe_front':(172,188),'root':(85,183),'torso':(85,132),'head':(94,54), 'wrist_near':(94,115)},
 4:{'hip_front':(101,181),'knee_front':(145,190),'ankle_front':(156,190),'toe_front':(172,188),'root':(85,183),'torso':(85,132),'head':(94,54),'wrist_near':(94,115)},
 5:{'hip_front':(102,182),'knee_front':(132,206),'ankle_front':(154,230),'toe_front':(172,234),'root':(87,184)},
 6:{'hip_front':(102,183),'knee_front':(134,237),'ankle_front':(147,280),'toe_front':(163,290)},
 7:{}
}

def pose_for(anim,f):
 p={k:v for k,v in BASE.items()}
 if anim=='idle':
  t=math.pi*2*f/12
  breath=-1.25*(1-math.cos(t))
  for k in ('head','neck','torso','shoulder_far','shoulder_near','elbow_far','elbow_near','wrist_far','wrist_near'):
   a=p[k]; p[k]=(a[0]+(0.65*math.sin(t) if k not in ('head','neck') else .4*math.sin(t)),a[1]+breath*(1 if k in ('head','neck','shoulder_far','shoulder_near') else .6))
  return p
 keys=PUNCH if anim=='punch_light' else KICK
 # 8 poses, optional tween to 12 frames for kick
 if anim=='kick_light':
  frame=f*7/11
 else:frame=f
 i=min(6,int(frame));u=frame-i
 a=keys[i]; b=keys[i+1]
 for k,v in BASE.items():
  va=a.get(k,v); vb=b.get(k,v)
  p[k]=(va[0]*(1-u)+vb[0]*u,va[1]*(1-u)+vb[1]*u)
 return p

# helper small anatomy svg pieces from moving joints.
def torso_layer(p):
 c=p['torso']; neck=p['neck'];waist=p['waist']; sf=p['shoulder_far'];sn=p['shoulder_near'];hip=p['root']
 cx,cy=c;wx,wy=waist;nx,ny=neck
 d=f'M{sn[0]-4:.1f} {sn[1]-3:.1f} Q{cx-10:.1f} {cy-24:.1f} {nx-6:.1f} {ny:.1f} L{nx+10:.1f} {ny:.1f} Q{sf[0]+11:.1f} {sf[1]-7:.1f} {sf[0]+11:.1f} {sf[1]+8:.1f} Q{cx+22:.1f} {cy+23:.1f} {wx+17:.1f} {wy:.1f} Q{wx:.1f} {wy+11:.1f} {wx-15:.1f} {wy:.1f} Q{sn[0]-6:.1f} {sn[1]+34:.1f} {sn[0]-4:.1f} {sn[1]-3:.1f}Z'
 return path(d,SKIN)+line(f'M{cx-7} {cy+1} Q{cx} {cy+3} {cx+9} {cy+1} M{cx} {cy+13} l-1 13',SKIN_SHADE,1.5)

def leg_layer(p,side):
 h=p['hip_'+side];k=p['knee_'+side];a=p['ankle_'+side]
 body=limb(h,k,16.7 if side=='front' else 16,13,SKIN,SKIN_SHADE)
 body+=ell(k[0],k[1],12,12,SKIN,'none',0)
 body+=limb(k,a,11.8,7.5,SKIN,SKIN_SHADE)
 body+=ell(a[0],a[1],7,8,SKIN_L,'none',0)
 return body

def arm_layer(p,side):
 s=p['shoulder_'+side];e=p['elbow_'+side];w=p['wrist_'+side]
 a=limb(s,e,13.5 if side=='near' else 12.5,10,SKIN,SKIN_SHADE)
 a+=ell(e[0],e[1],9,10,SKIN,'none',0)
 a+=limb(e,w,10,7.3,SKIN,SKIN_SHADE)
 a+=glove(w)
 return a

def sleeve_layer(p,side,blue=False):
 s=p['shoulder_'+side];e=p['elbow_'+side];t=.39
 end=(s[0]+(e[0]-s[0])*t,s[1]+(e[1]-s[1])*t)
 main=BLUE if blue else SHIRT; shade=BLUE_SHADE if blue else SHIRT_SHADE
 x=limb(s,end,14,12,main,shade)
 x+=ell(end[0],end[1],11,3,shade,OUTLINE,1)
 return x

def shirt_layer(p,blue=False):
 sf=p['shoulder_far'];sn=p['shoulder_near']; neck=p['neck'];wa=p['waist'];c=p['torso']
 fill=BLUE if blue else SHIRT;sh=BLUE_SHADE if blue else SHIRT_SHADE;hi=BLUE_H if blue else SHIRT_H
 cx,cy=c;wx,wy=wa;nx,ny=neck
 d=(f'M{sn[0]-1:.1f} {sn[1]-5:.1f} Q{sn[0]+8:.1f} {sn[1]-11:.1f} {nx-8:.1f} {ny+1:.1f} '
    f'Q{nx:.1f} {ny+10:.1f} {nx+10:.1f} {ny+1:.1f} Q{sf[0]-4:.1f} {sf[1]-9:.1f} {sf[0]+5:.1f} {sf[1]-2:.1f} '
    f'Q{cx+20:.1f} {cy+20:.1f} {wx+18:.1f} {wy-2:.1f} '
    f'Q{wx:.1f} {wy+5:.1f} {wx-17:.1f} {wy-2:.1f} '
    f'Q{cx-22:.1f} {cy+9:.1f} {sn[0]-1:.1f} {sn[1]-5:.1f}Z')
 x=path(d,fill)
 # side seam shadow and highlights
 x+=line(f'M{sn[0]+3:.1f} {sn[1]+16:.1f} Q{cx-16:.1f} {cy+26:.1f} {wx-13:.1f} {wy-7:.1f}',sh,2)
 x+=line(f'M{sf[0]-4:.1f} {sf[1]+17:.1f} Q{cx+17:.1f} {cy+35:.1f} {wx+15:.1f} {wy-6:.1f}',sh,2)
 x+=line(f'M{wx-12:.1f} {wy-8:.1f} Q{wx:.1f} {wy-5:.1f} {wx+10:.1f} {wy-8:.1f}',hi,1.4)
 x+=line(f'M{wx-8:.1f} {wy-15:.1f} q5 -2 11 -1 M{wx+4:.1f} {wy-10:.1f} q5 0 8 -3',sh,1.3)
 x+=line(f'M{cx-14:.1f} {cy+5:.1f} q6 -3 9 -1 M{cx+11:.1f} {cy+8:.1f} q-3 -3 -8 -4',hi,1.0)
 x+=path(f'M{nx-8} {ny+1} Q{nx} {ny+11} {nx+10} {ny+1}', 'none',OUTLINE,2.1)
 # distinctive shirt breast mark, small safe space
 x+=line(f'M{cx+5:.1f} {cy-7:.1f} l8 0 l-4 5z',hi,1.1)
 return x

def shorts_layer(p):
 h1=p['hip_rear'];h2=p['hip_front'];w=p['waist'];kr=p['knee_rear'];kf=p['knee_front'];
 # waist and upper legs: short tubes anchored from hips to ~30% thighs
 mid=lambda a,b,t:(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t)
 er=mid(h1,kr,.37);ef=mid(h2,kf,.36)
 x=limb(h1,er,19,16,SHORTS,SHORTS_SHADE)
 x+=limb(h2,ef,19,16,SHORTS,SHORTS_SHADE)
 x+=path(f'M{w[0]-17:.1f} {w[1]-4:.1f} L{w[0]+17:.1f} {w[1]-4:.1f} L{h2[0]+14:.1f} {h2[1]+12:.1f} Q{w[0]} {w[1]+26:.1f} {h1[0]-14:.1f} {h1[1]+10:.1f}Z',SHORTS)
 x+=line(f'M{w[0]-13:.1f} {w[1]+2:.1f} Q{w[0]:.1f} {w[1]+6:.1f} {w[0]+13:.1f} {w[1]+2:.1f}',SHORTS_H,1.6)
 # the sports stripe runs solely on shorts
 for h,e in ((h1,er),(h2,ef)):
  x+=line(f'M{h[0]-10:.1f} {h[1]+2:.1f} L{e[0]-11:.1f} {e[1]-1:.1f}', '#CCD9DE',2)
 return x

def head_layer(p):
 x,y=p['head']; # head facing screen right, anchored to a moving point
 transform=f'transform="translate({x-99:.1f} {y-54:.1f})"'
 return f'<g {transform}>'+path('M83 36 Q91 28 104 35 Q114 39 117 49 L117 54 L121 58 L119 65 L116 66 Q116 77 107 81 Q98 89 89 82 L85 73 Q81 68 80 57 Q78 46 83 36Z',SKIN)+path('M109 67 Q113 70 116 68 L115 72 Q112 75 109 72Z',SKIN_SHADE,'none',0)+ell(85,60,6,9,SKIN,OUTLINE,1.5)+ell(86,60,1.6,4,SKIN_SHADE,'none',0)+line('M105 54 L114 53',OUTLINE,2.1)+ell(111,57,1.7,2.7,OUTLINE,'none',0)+line('M112 76 L116 74',SKIN_DARK,1.5)+line('M102 79 Q106 81 110 80',SKIN_L,1.5)+'</g>'

def hair_layer(p,back=False):
 x,y=p['head'];trans=f'transform="translate({x-99:.1f} {y-54:.1f})"'
 if back:
  a=path('M81 44 L77 66 Q83 83 91 83 L91 68 Q85 60 87 43Z',HAIR_D)
 else:
  a=path('M78 53 L74 46 L77 42 L73 38 L81 38 L79 32 L89 36 L93 28 L99 34 L107 29 L109 37 L118 38 L113 44 L122 46 L116 51 L112 45 L105 48 L101 43 L96 49 L88 46 L85 56 L82 53Z',HAIR)
  a+=line('M82 41 L87 39 L90 34 M96 39L104 36 M108 43L113 43 M87 45L92 41 M99 42L106 40',HAIR_L,2.2)
 return f'<g {trans}>{a}</g>'

def render_frame(anim,f,blue=False):
 p=pose_for(anim,f)
 sl={x:[] for x in slots}
 # independent skin regions and costume surfaces
 sl['leg_rear']=[leg_layer(p,'rear')]
 sl['leg_front']=[leg_layer(p,'front')]
 sl['body']=[torso_layer(p)]
 sl['arm_far']=[arm_layer(p,'far')]
 sl['arm_near']=[arm_layer(p,'near')]
 sl['shirt_far_sleeve']=[sleeve_layer(p,'far',blue)]
 sl['shirt_near_sleeve']=[sleeve_layer(p,'near',blue)]
 sl['shirt']=[shirt_layer(p,blue)]
 sl['shorts']=[shorts_layer(p)]
 sl['foot_rear']=[foot_skin(p['ankle_rear'],p['toe_rear'])]
 sl['foot_front']=[foot_skin(p['ankle_front'],p['toe_front'])]
 sl['shoe_rear']=[shoe(p['ankle_rear'],p['toe_rear'])]
 sl['shoe_front']=[shoe(p['ankle_front'],p['toe_front'],anim=='kick_light')]
 sl['head']=[head_layer(p)]
 sl['hair_back']=[hair_layer(p,True)]
 sl['hair_front']=[hair_layer(p)]
 return {s:wrap(v) for s,v in sl.items()},p

def png(svg):
 return Image.open(io.BytesIO(cairosvg.svg2png(bytestring=svg.encode('utf8'),output_width=W,output_height=H))).convert('RGBA')

# generate atlases in animation-major order, layers kept separate
anims={'idle':12,'punch_light':8,'kick_light':12}
order=[(a,i) for a,n in anims.items() for i in range(n)]; frames=len(order)
cols=8;rows=math.ceil(frames/cols)
base_frames={};other_frames={}; poses=[]
for ai,(a,i) in enumerate(order):
 sf,p=render_frame(a,i);base_frames[ai]={s:png(v) for s,v in sf.items()};poses.append(p)
 sf2,_=render_frame(a,i,blue=True);other_frames[ai]={s:png(sf2[s]) for s in ('shirt','shirt_far_sleeve','shirt_near_sleeve')}
for s in slots:
 atlas=Image.new('RGBA',(cols*W,rows*H));
 for idx in range(frames):atlas.alpha_composite(base_frames[idx][s],((idx%cols)*W,(idx//cols)*H))
 atlas.save(ASSETS/(s+'.png'),optimize=True)
for s in ('shirt','shirt_far_sleeve','shirt_near_sleeve'):
 atlas=Image.new('RGBA',(cols*W,rows*H))
 for idx in range(frames):atlas.alpha_composite(other_frames[idx][s],((idx%cols)*W,(idx//cols)*H))
 atlas.save(ASSETS/(s+'_blue.png'),optimize=True)

# composite on game-friendly transparent background
def composite(idx,blue=False,hide=()):
 out=Image.new('RGBA',(W,H))
 for s in slots:
  if s in hide:continue
  img=other_frames[idx][s] if blue and s in ('shirt','shirt_far_sleeve','shirt_near_sleeve') else base_frames[idx][s]
  out.alpha_composite(img)
 return out
for i,(a,f) in enumerate(order):
 if f==0:composite(i).save(PRE/(a+'.png'))
 if a=='punch_light' and f==3:composite(i).save(PRE/'punch_impact.png')
 if a=='kick_light' and f==5:composite(i).save(PRE/'kick_impact.png')
 if a=='idle' and f==2:
  composite(i,blue=True).save(PRE/'blue_uniform.png')
  composite(i,hide=('shirt','shirt_far_sleeve','shirt_near_sleeve')).save(PRE/'no_top.png')
  composite(i,hide=('shoe_rear','shoe_front')).save(PRE/'no_shoes.png')

# artwork contact sheet for review
font=None
try: font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',18)
except:pass
contact=Image.new('RGB',(1100,650),(13,27,45));draw=ImageDraw.Draw(contact)
shots=[('Guarda / padrão',PRE/'idle.png'),('Camisa azul',PRE/'blue_uniform.png'),('Sem camiseta',PRE/'no_top.png'),('Soco',PRE/'punch_impact.png'),('Chute',PRE/'kick_impact.png')]
for k,(label,file) in enumerate(shots):
 img=Image.open(file).convert('RGBA');image=img.resize((182,320),Image.Resampling.NEAREST);x=16+(k*215);y=55
 contact.paste(image,(x,y),image); draw.text((x+2,19),label,font=font,fill='#F8D88C')
# 2nd row: little tiles for layer proofs
for i,s in enumerate(('leg_front','shirt','shirt_near_sleeve','shorts','shoe_front','hair_front')):
 img=base_frames[2][s];img.thumbnail((125,185));x=50+i*172;y=415;contact.paste(img,(x,y),img);draw.text((x-10,602),s,font=font,fill='#B6D7EA')
contact.save(PRE/'sprite_contact_sheet.png',quality=93)

manifest={'format':'icen.original-layered-fighter.v0.4','character':'discente.masculino.02','status':'articulated_pilot_qa_pending','frameWidth':W,'frameHeight':H,'columns':cols,'rows':rows,'animations':{'idle':{'start':0,'length':12,'fps':12},'punch_light':{'start':12,'length':8,'fps':12},'kick_light':{'start':20,'length':12,'fps':12}},'layerOrder':slots,'layerAtlases':{s:f'assets/{s}.png' for s in slots},'alternateOutfit':{'blue':{'parts':{s:f'assets/{s}_blue.png' for s in ('shirt','shirt_far_sleeve','shirt_near_sleeve')}}},'designSource':'source/generate.py','warnings':['Art original vetorial paramétrica convertida em PNG; não extraída de PNG achatado','Movimentos interpolados por poses manuais; retoque pixel a pixel e revisão artística ainda pendentes','Este pacote é um piloto técnico; não substitui automaticamente o Discente no jogo principal'], 'characterSize':'182x320','abilityVfxSeparate':True}
(ROOT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf8')
print('Generated:',len(order),'frames;',len(slots),'separate layers; spritesheets:',len(list(ASSETS.glob('*.png'))))
