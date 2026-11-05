/* ICEN Fighters 0.2 | Menu e Criador de Discente | nenhum dado da história literária */
(function(){'use strict';
const C=window.ICENCatalog,R=window.ICENSpriteRenderer,S=window.ICENSave;
const $=id=>document.getElementById(id);
const state={screen:'menu',step:1,maxStep:1,character:structuredClone(C.defaultCharacter),created:null,toastTimer:null};
function activate(screen){
 state.screen=screen;
 for(const n of ['menu','editor','complete']){const el=$('screen-'+n);const active=n===screen;el.hidden=!active;el.classList.toggle('active',active)}
 window.scrollTo({top:0,behavior:'auto'});
}
function toast(message){const el=$('toast');el.textContent=message;el.hidden=false;clearTimeout(state.toastTimer);state.toastTimer=setTimeout(()=>{el.hidden=true},3400)}
function updateHeader(){const name=state.character.name.trim();$('preview-name').textContent=name||'DISCENTE';$('name-counter').textContent=state.character.name.length+'/20';}
function characterWith(patch){return {...state.character,...patch}}
function createButtons(){
 $('body-model-options').innerHTML=C.bodyModels.map(o=>`<button type="button" class="model-option" data-model="${o.id}" aria-pressed="false"><span class="model-figure ${o.id==='feminino'?'fem':''}" aria-hidden="true"></span><span>${o.label}</span><span class="check" aria-hidden="true"></span></button>`).join('');
 $('skin-swatches').innerHTML=C.skinColors.map((c,i)=>`<button type="button" class="swatch" style="background:${c}" data-skin="${i}" title="Tom de pele ${i+1}" aria-label="Tom de pele ${i+1}" aria-pressed="false"></button>`).join('');
 $('hair-swatches').innerHTML=C.hairColors.map((c,i)=>`<button type="button" class="swatch" style="background:${c}" data-hair-color="${i}" aria-label="Cor de cabelo ${i+1}" title="Cor de cabelo ${i+1}" aria-pressed="false"></button>`).join('');
 $('hairstyles').innerHTML=C.hairStyles.map(o=>`<button type="button" class="image-card" data-hair="${o.id}" aria-pressed="false"><canvas width="80" height="112" aria-hidden="true" data-hair-preview="${o.id}"></canvas><b>${o.label}</b><small>${o.detail}</small></button>`).join('');
 $('outfits').innerHTML=C.outfits.map(o=>`<button type="button" class="image-card" data-outfit="${o.id}" aria-pressed="false"><canvas width="80" height="112" aria-hidden="true" data-outfit-preview="${o.id}"></canvas><b>${o.label}</b><small>${o.detail}</small></button>`).join('');
 $('accessories').innerHTML=C.accessories.map(o=>`<button type="button" class="accessory" data-accessory="${o.id}" aria-pressed="false">${o.label}</button>`).join('');
}
function renderSelected(){
 const ch=state.character;
 const groups=[['[data-model]','model',ch.model],['[data-skin]','skin',String(ch.skin)],['[data-hair]','hair',ch.hairStyle],['[data-hair-color]','hair-color',String(ch.hairColor)],['[data-outfit]','outfit',ch.outfit],['[data-accessory]','accessory',ch.accessory]];
 for(const [selector,attr,value] of groups){document.querySelectorAll(selector).forEach(el=>{const selected=el.dataset[attr.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]===value;el.classList.toggle('selected',selected);el.setAttribute('aria-pressed',String(selected));const check=el.querySelector('.check');if(check)check.textContent=selected?'✓':''})}
 updateHeader();R.warmup(ch);
}
function fillReview(){const ch=state.character;$('review-name').textContent=ch.name.trim()||'Discente';$('review-model').textContent=C.bodyModels.find(x=>x.id===ch.model).label;$('review-outfit').textContent=C.outfits.find(x=>x.id===ch.outfit).label;}
function switchStep(next){
 if(next<1||next>3||next>state.maxStep)return;
 state.step=next;
 for(let n=1;n<=3;n++){
  const step=$('step-'+n);step.hidden=n!==next;const btn=document.querySelector(`[data-go-step="${n}"]`);
  btn.classList.toggle('active',n===next);btn.classList.toggle('done',n<next);btn.setAttribute('aria-selected',String(n===next));btn.disabled=n>state.maxStep;
 }
 $('btn-prev').hidden=next===1;$('btn-next').hidden=next===3;$('btn-create').hidden=next!==3;
 if(next===3)fillReview();window.scrollTo({top:0,behavior:'smooth'});
}
function validateName(){const name=state.character.name.trim();const valid=name.length>=2&&name.length<=20;$('name-error').hidden=valid;$('player-name').setAttribute('aria-invalid',String(!valid));return valid}
function next(){if(state.step===1&&!validateName()){toast('Coloque um nome de 2 a 20 caracteres.');$('player-name').focus();return}state.maxStep=Math.max(state.maxStep,state.step+1);switchStep(state.step+1)}
function create(){if(!validateName()){state.maxStep=3;switchStep(1);$('player-name').focus();return}
 let profile={...state.character,name:state.character.name.trim(),course:'matematica',build:window.ICENHexGrid?.blank?.()||null,unlockedSkills:[],unlockedCosmetics:[]};
 let outcome=S.store(profile);
 if(!outcome.ok&&outcome.reason==='full'){
  if(!window.confirm('Você já possui 5 perfis de teste neste navegador. Deseja substituir o mais antigo?'))return;
  outcome=S.store(profile,0);
 }
 if(!outcome.ok){toast('Não foi possível salvar localmente. Verifique as permissões do navegador.');return}
 state.created=outcome.save;$('finish-name').textContent=profile.name;$('finish-slot').textContent=`SLOT ${String(outcome.slot+1).padStart(2,'0')} / 05`;
 activate('complete');
}
function drawPreview(t){
 if(state.screen==='editor'){
  const canvas=$('character-canvas'),ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height);
  const float=Math.sin(t/420)*1;
  const gradient=ctx.createRadialGradient(180,450,10,180,450,125);gradient.addColorStop(0,'rgba(180,130,245,.34)');gradient.addColorStop(1,'rgba(180,130,245,0)');ctx.fillStyle=gradient;ctx.fillRect(30,395,300,70);
  ctx.beginPath();ctx.ellipse(180,455,92+float*3,12+float,0,0,Math.PI*2);ctx.fillStyle='rgba(18,11,35,.62)';ctx.fill();
  R.draw(ctx,state.character,180,452,3.55,t);
  if(state.step===2&&t%400<100){drawMiniatures()}
 }
 if(state.screen==='complete'&&state.created){const canvas=$('finish-canvas'),ctx=canvas.getContext('2d');ctx.clearRect(0,0,160,230);R.draw(ctx,state.created,80,222,1.75,t)}
 requestAnimationFrame(drawPreview);
}
let minTime=0;
function drawMiniatures(){
 const cards=[...document.querySelectorAll('[data-hair-preview]'),...document.querySelectorAll('[data-outfit-preview]')];
 for(const canvas of cards){if(canvas.offsetParent===null)continue;let patch=canvas.dataset.hairPreview?{hairStyle:canvas.dataset.hairPreview}:{outfit:canvas.dataset.outfitPreview};let ch=characterWith(patch);let ctx=canvas.getContext('2d');ctx.clearRect(0,0,80,112);R.draw(ctx,ch,40,111,.78,0,{idle:false});}
}
function install(){
 createButtons();renderSelected();
 $('btn-new-game').addEventListener('click',()=>{state.step=1;state.maxStep=1;state.character=structuredClone(C.defaultCharacter);$('player-name').value='';$('name-error').hidden=true;renderSelected();switchStep(1);activate('editor')});
 $('btn-new-game-mobile')?.addEventListener('click',()=> $('btn-new-game').click());
 $('btn-back-menu').addEventListener('click',()=>activate('menu'));
 $('player-name').addEventListener('input',e=>{state.character.name=e.target.value;updateHeader();$('name-error').hidden=true;e.target.removeAttribute('aria-invalid')});
 const mappings=[['body-model-options','model','model'],['skin-swatches','skin','skin'],['hair-swatches','hairColor','hairColor'],['hairstyles','hair','hairStyle'],['outfits','outfit','outfit'],['accessories','accessory','accessory']];
 for(const [id,attr,key] of mappings){$(id).addEventListener('click',e=>{const target=e.target.closest('button[data-'+attr.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())+']');if(!target)return;let val=target.dataset[attr];state.character[key]=(key==='skin'||key==='hairColor')?Number(val):val;if(key==='outfit'){const preset=C.outfits.find(o=>o.id===val);state.character.top=preset.top;state.character.bottom=preset.bottom;state.character.shoes=preset.shoes;}renderSelected();drawMiniatures()})}
 document.querySelectorAll('[data-go-step]').forEach(b=>b.addEventListener('click',()=>switchStep(Number(b.dataset.goStep))));
 $('btn-next').addEventListener('click',next);$('btn-prev').addEventListener('click',()=>switchStep(state.step-1));
 $('creator-form').addEventListener('submit',e=>{e.preventDefault();if(state.step!==3)return;create()});
 $('finish-back').addEventListener('click',()=>activate('menu'));
 document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&state.screen==='editor'){if(state.step>1)switchStep(state.step-1);else activate('menu')}
  if(e.key==='Enter'&&state.screen==='menu'&&!e.target.closest('button')){$('btn-new-game').click()}
  if(e.key==='Enter'&&state.screen==='editor'&&e.target===$('player-name')){e.preventDefault();next()}
 });
 activate('menu');requestAnimationFrame(drawPreview);
}
window.ICENApp=Object.freeze({getState:()=>({screen:state.screen,step:state.step,character:{...state.character},created:state.created}),createSave:()=>S.store({...state.character,name:state.character.name.trim()})});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();

