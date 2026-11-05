/* Efeitos de habilidades totalmente separados dos sprites do usuário/NPC.
   Não são concedidos ao Discente no criador. API para próximos módulos de combate. */
(function(){'use strict';
const registry=new Map();
function register(id,descriptor){if(!id||typeof descriptor.draw!=='function')throw Error('Poder sem renderer');registry.set(id,descriptor)}
function render(ctx,id,origin,elapsed,params={}){const a=registry.get(id);if(!a)return false;ctx.save();try{a.draw(ctx,origin,elapsed,params)}finally{ctx.restore()}return true}
register('tnc.rotacao_complexa',{name:'Rotação Complexa',owner:'tnc',acquisition:'aprovação',draw(ctx,o,t,p){
  const progress=Math.min(1,Math.max(0,t/480)),r=(p.radius||48)*(0.6+progress*0.8);const opacity=1-progress;
  ctx.strokeStyle=`rgba(165,122,255,${opacity})`;ctx.lineWidth=3;
  ctx.beginPath();ctx.arc(o.x,o.y,r,0,Math.PI*2);ctx.stroke();
  ctx.beginPath();ctx.moveTo(o.x-r,o.y);ctx.lineTo(o.x+r,o.y);ctx.moveTo(o.x,o.y-r);ctx.lineTo(o.x,o.y+r);ctx.stroke();
}});
window.ICENPowers=Object.freeze({register,render,ids:()=>Array.from(registry.keys())});
})();

