/* ICEN Fighters | biblioteca pura de grades hexagonais — não concede habilidades */
(function(){'use strict';
const DIRECTIONS=Object.freeze([[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]]);
const key=(q,r)=>`${q},${r}`;
const distance=(a,b)=>{const dq=a.q-b.q,dr=a.r-b.r;return Math.max(Math.abs(dq),Math.abs(dr),Math.abs(dq+dr))};
const adjacent=(a,b)=>distance(a,b)===1;
function ring(radius){if(!Number.isInteger(radius)||radius<0||radius>8)throw Error('Raio hexagonal inválido (0–8)');const cells=[];for(let q=-radius;q<=radius;q++)for(let r=-radius;r<=radius;r++)if(Math.max(Math.abs(q),Math.abs(r),Math.abs(q+r))<=radius)cells.push({q,r,key:key(q,r)});return cells}
function edges(cells){const pairs=[];for(let i=0;i<cells.length;i++)for(let j=i+1;j<cells.length;j++)if(adjacent(cells[i],cells[j]))pairs.push([cells[i].key||key(cells[i].q,cells[i].r),cells[j].key||key(cells[j].q,cells[j].r)]);return pairs}
function combos(slots,recipes){const byCoord=Object.entries(slots).map(([coord,value])=>{const [q,r]=coord.split(',').map(Number);return {q,r,skillId:value}}).filter(x=>x.skillId);const matched=[];for(let i=0;i<byCoord.length;i++)for(let j=i+1;j<byCoord.length;j++)if(adjacent(byCoord[i],byCoord[j])){const pair=[byCoord[i].skillId,byCoord[j].skillId].sort().join('|');const recipe=recipes.find(x=>x.skills.slice().sort().join('|')===pair);if(recipe)matched.push({recipeId:recipe.id,cells:[key(byCoord[i].q,byCoord[i].r),key(byCoord[j].q,byCoord[j].r)]})}return matched}
function blank(){return {version:1,radius:1,activeRadius:0,cores:['0,0'],slots:{},unlocked:false,expansions:[]}}
window.ICENHexGrid=Object.freeze({DIRECTIONS,key,distance,adjacent,ring,edges,combos,blank});
})();
