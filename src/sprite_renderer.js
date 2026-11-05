/* ICEN Fighters | Componentes PNG registrados na mesma tela 80x112.
   Camadas portáveis entre Discente e os futuros NPCs; nenhum poder embutido. */
(function(){'use strict';
const C=window.ICENCatalog;const BASE='assets/sprites/';const W=80,H=112;
const cache=new Map();
function resolvePaths(ch){const outfit=C.outfits.find(o=>o.id===ch.outfit)||C.outfits[0];
 return [
  'body/'+ch.model+'_'+ch.skin+'.png',
  'bottoms/'+ch.model+'_'+(ch.bottom||outfit.bottom)+'.png',
  'shoes/'+(ch.shoes||outfit.shoes)+'.png',
  'tops/'+ch.model+'_'+(ch.top||outfit.top)+'.png',
  'hair/'+ch.hairStyle+'_'+ch.hairColor+'.png',
  ...(ch.accessory!=='nenhum'?['accessories/'+ch.accessory+'.png']:[])
 ];}
function preload(path){if(cache.has(path))return cache.get(path);const im=new Image();im.src=(window.ICEN_EMBEDDED_ASSETS&&window.ICEN_EMBEDDED_ASSETS[path])||(BASE+path); cache.set(path,im);return im;}
function draw(ctx,ch,cx,baseline,scale=4,time=0,opts={}){
 if(!ctx||!ch)return;const parts=resolvePaths(ch);const bounce=opts.idle===false?0:Math.round(Math.sin(time/420)*1);
 ctx.save();ctx.imageSmoothingEnabled=false;
 const x=Math.round(cx-W*scale/2),y=Math.round(baseline-H*scale+bounce*scale);
 // Composição atual: corpo, calças, sapatos, camiseta, cabelos, acessórios.
 for(const part of parts){const im=preload(part);if(im.complete&&im.naturalWidth)ctx.drawImage(im,x,y,W*scale,H*scale);}
 ctx.restore();
}
function warmup(ch){resolvePaths(ch).forEach(preload)}
function exportManifest(ch){const outfit=C.outfits.find(o=>o.id===ch.outfit)||C.outfits[0];return {width:W,height:H,order:[...C.layers],assets:resolvePaths(ch),cosmetics:{skin:ch.skin,hairStyle:ch.hairStyle,hairColor:ch.hairColor,top:ch.top||outfit.top,bottom:ch.bottom||outfit.bottom,shoes:ch.shoes||outfit.shoes,accessory:ch.accessory}};}
window.ICENSpriteRenderer=Object.freeze({draw,warmup,resolvePaths,exportManifest,width:W,height:H});
})();

