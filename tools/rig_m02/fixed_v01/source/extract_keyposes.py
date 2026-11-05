"""ICEN Fighters: proof of concept with four complete poses from an approved concept illustration.
All masks are applied to whole figures; NO splitting of limbs, clothing or hair.
NOT production-ready: these are key poses, not in-between animation frames.
"""
from pathlib import Path
import numpy as np, cv2
from PIL import Image,ImageDraw,ImageFont
SRC=Path('/mnt/data/ficha_de_conceito_lutador_icen_fighters.png')
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'assets';PRE=ROOT/'previews'
source=np.asarray(Image.open(SRC).convert('RGB'))
# Captures include 20–30px of margin around each whole fighter.
REGIONS={'guard':(5,391,375,911),'punch':(345,389,782,915),'kick':(731,389,1150,911),'jump':(1077,335,1456,800)}
# approximate centers of torso on the ORIGINAL concept artwork
CHEST={'guard':169,'punch':508,'kick':855,'jump':1262}
BASELINE={'guard':565,'punch':565,'kick':565,'jump':433}
CELL=(620,620)

def mask_full_pose(rgb, name):
    h,w=rgb.shape[:2]
    lab=cv2.cvtColor(rgb,cv2.COLOR_RGB2LAB).astype(np.float32)
    bg=np.concatenate([lab[:min(h,45)].reshape(-1,3),lab[:,-12:].reshape(-1,3),lab[:,:12].reshape(-1,3)])
    d=np.linalg.norm(lab-np.median(bg,axis=0),axis=2)
    R,G,B=rgb[:,:,0].astype(float),rgb[:,:,1].astype(float),rgb[:,:,2].astype(float)
    warm=(R>G+16)&(G>B+13)&(R>125)
    dark=(R<130)&(G<132)&(B<151)&(R>G*.85)
    blue_dark=(R<100)&(G<110)&(B<150)
    mask=np.full((h,w),cv2.GC_PR_BGD,np.uint8)
    mask[d>14]=cv2.GC_PR_FGD
    mask[warm|dark|blue_dark]=cv2.GC_FGD
    mask[:8]=mask[-8:]=0;mask[:,:5]=mask[:,-5:]=0
    cv2.grabCut(cv2.cvtColor(rgb,cv2.COLOR_RGB2BGR),mask,None,np.zeros((1,65),np.float64),np.zeros((1,65),np.float64),10,cv2.GC_INIT_WITH_MASK)
    a=np.where((mask==1)|(mask==3),255,0).astype(np.uint8)
    count,labels,stats,_=cv2.connectedComponentsWithStats(a)
    big=max(range(1,count),key=lambda i:stats[i,cv2.CC_STAT_AREA])
    # jump: preserve shoe and hand components near the body but discard the unrelated kick shoe
    keep=(labels==big)
    if name=='jump':
      for i in range(1,count):
        if i==big:continue
        x,y,ww,hh,area=stats[i]
        # components near main figure at upper y may be arms; exclude area left at y>=180 (overlapping kick shoe)
        if area>180 and x>80 and y<370:keep|=(labels==i)
    a=(keep*255).astype(np.uint8)
    a=cv2.morphologyEx(a,cv2.MORPH_CLOSE,np.ones((3,3),np.uint8))
    # discard floor shadows on light floor while keeping local shoe silhouettes.
    yy,xx=np.indices((h,w))
    x0,y0,_,_=REGIONS[name]
    ox,oy=xx+x0,yy+y0
    if name=='guard':
      a[((oy>841)&(ox>97)&(ox<257))]=0
      a[((oy>851)&(ox<17))]=0
    elif name=='punch':
      a[((oy>841)&(ox>431)&(ox<642))]=0
    elif name=='kick':
      a[((oy>820)&(ox>832))]=0
    elif name=='jump':
      a[(ox<1141)&(oy>504)&(oy<680)]=0 # stray kick shoe from adjacent illustrated pose
      a[(ox>1110)&(oy<349)]=0 # header rule from concept sheet
    return a

frames={}
for name,(x0,y0,x1,y1) in REGIONS.items():
    rgb=source[y0:y1,x0:x1].copy();mask=mask_full_pose(rgb,name)
    result=Image.fromarray(np.dstack([rgb,mask]))
    canvas=Image.new('RGBA',CELL)
    dx=int(239-(CHEST[name]-x0))
    # figure's reference feet, in original pixel co-ordinates (jump has separate elevated foot reference)
    foot={'guard':891,'punch':893,'kick':891,'jump':780}[name]
    dy=BASELINE[name]-(foot-y0)
    canvas.alpha_composite(result,(dx,dy))
    canvas.save(OUT/f'{name}.png')
    frames[name]=canvas
    print(name,'alpha-count',int(np.count_nonzero(np.asarray(canvas)[:,:,3])),'render offset',(dx,dy))

atlas=Image.new('RGBA',(CELL[0]*4,CELL[1]))
for i,name in enumerate(('guard','punch','kick','jump')):atlas.alpha_composite(frames[name],(CELL[0]*i,0))
atlas.save(OUT/'m02_four_keyposes_atlas.png')

# Previews are checkered so any bad alpha edge is obvious.
thumb=Image.new('RGB',(1520,470),'#0c2038');draw=ImageDraw.Draw(thumb)
try:font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22)
except:font=None
for i,name in enumerate(('guard','punch','kick','jump')):
    r=frames[name];a=r.getbbox();r=r.crop(a) if a else r
    target_h=365;target_w=round(r.width*target_h/r.height)
    r=r.resize((target_w,target_h),Image.Resampling.LANCZOS)
    x=24+i*376+(350-target_w)//2;y=57
    thumb.paste(r,(x,y),r)
    draw.text((24+i*376,432),name.upper(),fill='#ffda91',font=font)
thumb.save(PRE/'sprite_comparison.jpg',quality=92)
