/* ICEN Fighters — motor de progressão da colmeia, sem concessões automáticas de recompensas. */
(function(){'use strict';
const dirs=Object.freeze([[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]]);
const key=(q,r)=>`${q},${r}`;
const valid=p=>p&&Number.isInteger(p.q)&&Number.isInteger(p.r);
const distance=(a,b)=>Math.max(Math.abs(a.q-b.q),Math.abs(a.r-b.r),Math.abs(a.q+a.r-b.q-b.r));
const adjacent=(a,b)=>distance(a,b)===1;
function ring(radius){if(!Number.isInteger(radius)||radius<0||radius>8)throw Error('Raio inválido');const out=[];for(let q=-radius;q<=radius;q++)for(let r=-radius;r<=radius;r++)if(Math.max(Math.abs(q),Math.abs(r),Math.abs(q+r))<=radius)out.push({q,r,key:key(q,r)});return out;}
const parse=s=>{const x=String(s).split(',').map(Number);return x.length===2&&x.every(Number.isInteger)?{q:x[0],r:x[1]}:null};
function blank(){return {version:2,radius:0,activeRadius:0,unlocked:false,unlockedCells:[],cores:[],slots:{},expansions:[]};}
function visible(build){if(!build?.unlocked)return [{q:0,r:0,key:'0,0',locked:true}];let keys=Array.isArray(build.unlockedCells)?build.unlockedCells:[];if(!keys.length){const legacy=Math.max(0,Math.min(8,Number(build.activeRadius)||0));keys=ring(legacy).map(c=>c.key);}return keys.map(s=>parse(s)).filter(Boolean).filter(p=>distance(p,{q:0,r:0})<=8).map(p=>({...p,key:key(p.q,p.r),locked:false}));}
function unlockCore(build){const next=structuredClone(build||blank());next.unlocked=true;next.cores=['0,0'];next.unlockedCells=['0,0'];next.activeRadius=0;return next;}
function addCell(build,coord){if(!build?.unlocked)throw Error('Complete o tutorial para iniciar a build');const p=typeof coord==='string'?parse(coord):coord;if(!valid(p)||distance(p,{q:0,r:0})>8)throw Error('Coordenada inválida');const k=key(p.q,p.r);const current=visible(build);if(current.some(c=>c.key===k))return structuredClone(build);if(!current.some(c=>adjacent(c,p)))throw Error('Nova célula precisa encostar em uma aresta desbloqueada');const next=structuredClone(build);next.unlockedCells=[...current.map(x=>x.key),k];next.radius=Math.max(Number(next.radius)||0,distance(p,{q:0,r:0}));next.activeRadius=next.radius;return next;}
function addCore(build,coord){const k=typeof coord==='string'?coord:key(coord.q,coord.r);if(!visible(build).some(c=>c.key===k&&!c.locked))throw Error('O núcleo exige célula desbloqueada');const next=structuredClone(build);next.cores=[...new Set([...(next.cores||[]),k])];return next;}
function combos(slots,recipes){const cells=Object.entries(slots||{}).map(([k,skill])=>({...parse(k),key:k,skill})).filter(c=>valid(c)&&c.skill);const found=[];for(let i=0;i<cells.length;i++)for(let j=i+1;j<cells.length;j++)if(adjacent(cells[i],cells[j])){const pair=[cells[i].skill,cells[j].skill].sort().join('|');const rule=(recipes||[]).find(r=>r.skills.slice().sort().join('|')===pair);if(rule)found.push({recipeId:rule.id,cells:[cells[i].key,cells[j].key]});}return found;}
window.ICENHexGrid=Object.freeze({DIRECTIONS:dirs,key,parse,distance,adjacent,ring,blank,visible,unlockCore,addCell,addCore,combos});
})();
