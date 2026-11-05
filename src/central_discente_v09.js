/* ICEN Fighters — Central do Discente v0.9: aparência em painel lateral deslizante; centro e build preservados. */
(function(){'use strict';
function mount(){
 const C=window.ICENCatalog,A=window.ICENApp,H=window.ICENHexGrid,$=id=>document.getElementById(id);
 if(!C||!A||!H||!$('screen-editor'))return;
 const root=document.createElement('section');root.className='cv5';root.id='central-discente-v09';root.setAttribute('aria-label','Central do Discente');
 const modeButtons=C.bodyModels.map(x=>`<button type="button" class="cv5-choice" data-choice="model" data-value="${x.id}" aria-pressed="false">${x.label}</button>`).join('');
 const skinButtons=C.skinColors.map((c,i)=>`<button type="button" class="cv5-swatch" data-choice="skin" data-value="${i}" aria-label="Tom de pele ${i+1}" aria-pressed="false" style="--swatch:${c}"></button>`).join('');
 const hairButtons=C.hairStyles.map(x=>`<button type="button" class="cv5-choice" data-choice="hair" data-value="${x.id}" aria-pressed="false">${x.label}</button>`).join('');
 const hairColors=C.hairColors.map((c,i)=>`<button type="button" class="cv5-swatch" data-choice="hair-color" data-value="${i}" aria-label="Cor de cabelo ${i+1}" aria-pressed="false" style="--swatch:${c}"></button>`).join('');
 const outfits=C.outfits.map(x=>`<button type="button" class="cv5-choice" data-choice="outfit" data-value="${x.id}" aria-pressed="false">${x.label}</button>`).join('');
 const accessories=C.accessories.map(x=>`<button type="button" class="cv5-choice" data-choice="accessory" data-value="${x.id}" aria-pressed="false">${x.label}</button>`).join('');
 root.innerHTML=`
 <div class="cv5-stage">
  <img class="cv5-art" src="assets/creator/central_discente_fechada_v09.webp" width="1672" height="941" alt="" aria-hidden="true" draggable="false">
  <img class="cv8-open-art" src="assets/creator/central_discente_aparencia_aberta_v09.webp" width="1672" height="941" alt="" aria-hidden="true" draggable="false">
  <img class="cv9-open-bottom-art" src="assets/creator/central_discente_aparencia_aberta_v09.webp" width="1672" height="941" alt="" aria-hidden="true" draggable="false">
  <label for="cv5-name" class="cv5-sr">Nome ou nickname do Discente</label><input class="cv5-name" id="cv5-name" type="text" maxlength="20" autocomplete="off" spellcheck="false" aria-describedby="cv5-name-error" placeholder="Digite seu nickname...">
  <div class="cv5-name-error" id="cv5-name-error" aria-live="polite"></div>
  <button class="cv5-hit cv5-math" type="button" aria-label="Matemática selecionada" title="Matemática — disponível"></button>
  <button class="cv5-hit cv5-physics" type="button" disabled title="Física — em breve" aria-label="Física — bloqueada"></button>
  <button class="cv5-hit cv5-biology" type="button" disabled title="Biologia — em breve" aria-label="Biologia — bloqueada"></button>
  <button class="cv5-hit cv5-chemistry" type="button" disabled title="Química — em breve" aria-label="Química — bloqueada"></button>
  <button class="cv5-hit cv5-appearance" id="cv5-open-appearance" type="button" aria-expanded="false" aria-controls="cv6-appearance-pane" title="Abrir personalização no painel esquerdo"><span class="cv5-sr">Personalizar aparência, cabelo, pele, roupas e acessórios</span></button>
  <div class="cv5-build-mask" aria-label="Build em expansão progressiva">
    <div class="cv5-build-inner">
      <div class="cv5-build-status" id="cv5-build-status">NÚCLEO BLOQUEADO</div>
      <svg class="cv5-hex-svg" id="cv5-hex-svg" role="img" aria-label="Um núcleo bloqueado aguardando o tutorial" viewBox="0 0 440 392"></svg>
      <p class="cv5-build-hint" id="cv5-build-hint">Conclua o tutorial para desbloquear o primeiro núcleo.</p>
      <span class="cv5-build-count" id="cv5-build-count">0 habilidades equipadas</span>
    </div>
  </div>
  <button class="cv5-hit cv5-back" id="cv5-back" type="button" aria-label="Voltar ao menu principal" title="Voltar ao menu"></button>
  <button class="cv5-hit cv5-confirm" id="cv5-confirm" type="button" aria-label="Confirmar personagem e criar perfil" title="Confirmar"></button>
  <section class="cv6-appearance-pane" id="cv6-appearance-pane" role="region" aria-label="Aparência do Discente" aria-hidden="true" inert>
    <nav class="cv6-tabs" aria-label="Categorias de aparência">
      <button type="button" data-appearance-tab="body" aria-selected="true">CORPO E PELE</button>
      <button type="button" data-appearance-tab="hair" aria-selected="false">CABELO</button>
      <button type="button" data-appearance-tab="outfit" aria-selected="false">ROUPAS</button>
      <button type="button" data-appearance-tab="accessory" aria-selected="false">ACESSÓRIOS</button>
    </nav>
    <div class="cv6-options-scroll">
      <div class="cv5-appearance-section active" data-appearance-panel="body"><h3>MODELO DO DISCENTE</h3><div class="cv5-options">${modeButtons}</div><h3>TOM DE PELE</h3><div class="cv5-options">${skinButtons}</div></div>
      <div class="cv5-appearance-section" data-appearance-panel="hair"><h3>PENTEADO</h3><div class="cv5-options">${hairButtons}</div><h3>COR DO CABELO</h3><div class="cv5-options">${hairColors}</div></div>
      <div class="cv5-appearance-section" data-appearance-panel="outfit"><h3>ROUPAS INICIAIS</h3><div class="cv5-options">${outfits}</div></div>
      <div class="cv5-appearance-section" data-appearance-panel="accessory"><h3>ACESSÓRIOS</h3><div class="cv5-options">${accessories}</div></div>
      <p class="cv6-selection-summary" id="cv6-selection-summary" aria-live="polite"></p>
    </div>
    <footer class="cv6-pane-footer"><button type="button" id="cv5-cancel">CANCELAR</button><button type="button" id="cv5-apply">SALVAR ✓</button></footer>
  </section>
 </div>
 <div class="cv5-mobile">
  <div class="cv5-mobile-tabs" role="tablist" aria-label="Visualização no celular"><button type="button" data-mobile-tab="profile" aria-selected="true">PERFIL</button><button type="button" data-mobile-tab="build" aria-selected="false">BUILD</button></div>
  <div class="cv5-mobile-profile"><label for="cv5-mobile-name">NOME / NICKNAME</label><input id="cv5-mobile-name" type="text" maxlength="20" placeholder="Seu nickname"><p class="cv5-mobile-error" aria-live="polite"></p><div class="cv5-mobile-courses"><strong>CURSO</strong><div><span>∑ MATEMÁTICA</span><span>🔒 FÍSICA</span><span>🔒 BIOLOGIA</span><span>🔒 QUÍMICA</span></div></div><button type="button" id="cv5-mobile-appearance">PERSONALIZAR APARÊNCIA <span>▲</span></button></div>
  <div class="cv5-mobile-build"><div id="cv5-mobile-hex"></div><p>O primeiro núcleo será liberado após o tutorial.</p></div>
  <div class="cv5-mobile-footer"><button type="button" id="cv5-mobile-back">← VOLTAR</button><button type="button" id="cv5-mobile-confirm">CONFIRMAR ✓</button></div>
 </div>`;
 $('screen-editor').insertBefore(root,$('screen-editor').firstChild);
 const finish=document.createElement('div');finish.className='cv5-finish';finish.innerHTML='<section><span>REGISTRO ACADÊMICO · LICENCIATURA</span><h2>DISCENTE CRIADO ✓</h2><p id="cv5-finish-text">Seu perfil foi salvo.</p><p>Próxima etapa: tutorial de Iniciação ao Pensamento Científico (em produção).</p><button type="button" id="cv5-finish-back">VOLTAR AO MENU</button></section>';
 $('screen-complete').insertBefore(finish,$('screen-complete').firstChild);
 const pane=$('cv6-appearance-pane'),name=$('cv5-name'),mobileName=$('cv5-mobile-name');let snapshot=null,lastFocus=null;
 const mapping={'model':['#body-model-options','model'],'skin':['#skin-swatches','skin'],'hair':['#hairstyles','hair'],'hair-color':['#hair-swatches','hair-color'],'outfit':['#outfits','outfit'],'accessory':['#accessories','accessory']};
 function attrValue(ch,type){return ({model:ch.model,skin:ch.skin,hair:ch.hairStyle,'hair-color':ch.hairColor,outfit:ch.outfit,accessory:ch.accessory})[type]}
 function selectHidden(type,value){const [scope,attr]=mapping[type]||[];const el=scope?document.querySelector(`${scope} [data-${attr}="${value}"]`):null;if(!el)throw Error('Opção original não encontrada: '+type+'/'+value);el.click();}
 function saveSummary(){
  const ch=A.getState().character;
  root.querySelectorAll('[data-choice]').forEach(b=>b.setAttribute('aria-pressed',String(String(attrValue(ch,b.dataset.choice))===String(b.dataset.value))));
  const lab=(arr,k)=>arr.find(x=>x.id===k)?.label||String(k);
  $('cv6-selection-summary').textContent=[lab(C.bodyModels,ch.model),'Pele '+(Number(ch.skin)+1),lab(C.hairStyles,ch.hairStyle),'Cor '+(Number(ch.hairColor)+1),lab(C.outfits,ch.outfit),lab(C.accessories,ch.accessory)].join(' · ');
 }
 function setTab(tab){root.querySelectorAll('[data-appearance-panel]').forEach(x=>x.classList.toggle('active',x.dataset.appearancePanel===tab));root.querySelectorAll('[data-appearance-tab]').forEach(x=>x.setAttribute('aria-selected',String(x.dataset.appearanceTab===tab)));root.querySelector('.cv6-options-scroll').scrollTop=0;}
 const originalControls=[name,...root.querySelectorAll('.cv5-stage > .cv5-hit:not(.cv5-back):not(.cv5-confirm)'), ...root.querySelectorAll('.cv5-mobile button:not(#cv5-mobile-back):not(#cv5-mobile-confirm),.cv5-mobile input')];
 function toggleUnderlying(inactive){for(const c of originalControls)c.inert=inactive;}
 function openAppearance(){
  if(root.classList.contains('cv6-appearance-open'))return;
  snapshot={...A.getState().character};lastFocus=document.activeElement;
  setTab('body');saveSummary();pane.inert=false;pane.setAttribute('aria-hidden','false');
  toggleUnderlying(true);root.classList.add('cv6-appearance-open');
  $('cv5-open-appearance').setAttribute('aria-expanded','true');
  $('cv5-back').setAttribute('aria-label','Voltar à ficha e cancelar mudanças');$('cv5-back').title='Voltar à ficha';$('cv5-confirm').setAttribute('aria-label','Salvar aparência e voltar à ficha');$('cv5-confirm').title='Salvar aparência';
  window.requestAnimationFrame(() => pane.querySelector('[data-appearance-tab]')?.focus());
 }
 function closeAppearance(revert){
  if(!root.classList.contains('cv6-appearance-open'))return;
  if(revert&&snapshot)for(const type of Object.keys(mapping))selectHidden(type,attrValue(snapshot,type));
  saveSummary();root.classList.remove('cv6-appearance-open');
  pane.inert=true;pane.setAttribute('aria-hidden','true');
  toggleUnderlying(false);$('cv5-open-appearance').setAttribute('aria-expanded','false');
  snapshot=null;
  $('cv5-back').setAttribute('aria-label','Voltar ao menu principal');$('cv5-back').title='Voltar ao menu';$('cv5-confirm').setAttribute('aria-label','Confirmar personagem e criar perfil');$('cv5-confirm').title='Confirmar';
  if(lastFocus&&document.contains(lastFocus))lastFocus.focus();
 }
 root.addEventListener('click',e=>{
  const tab=e.target.closest('[data-appearance-tab]');if(tab){setTab(tab.dataset.appearanceTab);return;}
  const chosen=e.target.closest('[data-choice]');if(chosen){selectHidden(chosen.dataset.choice,chosen.dataset.value);saveSummary();}
 });
 $('cv5-open-appearance').addEventListener('click',openAppearance);$('cv5-mobile-appearance').addEventListener('click',openAppearance);
 $('cv5-cancel').addEventListener('click',()=>closeAppearance(true));
 $('cv5-apply').addEventListener('click',()=>closeAppearance(false));
 document.addEventListener('keydown',e=>{
  if(!root.classList.contains('cv6-appearance-open'))return;
  if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();closeAppearance(true);return;}
  if(e.key==='Tab'){
   const controls=[...pane.querySelectorAll('button:not(:disabled)')].filter(x=>x.getClientRects().length>0);
   if(controls.length){const first=controls[0],last=controls.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
  }
 },true);
 function syncName(from){const value=from.value;if(from!==name)name.value=value;if(from!==mobileName)mobileName.value=value;const legacy=$('player-name');legacy.value=value;legacy.dispatchEvent(new Event('input',{bubbles:true}));$('cv5-name-error').textContent='';root.querySelector('.cv5-mobile-error').textContent='';}
 name.addEventListener('input',()=>syncName(name));mobileName.addEventListener('input',()=>syncName(mobileName));
 function safeStart(){const v=name.value.trim();if(v.length<2||v.length>20){$('cv5-name-error').textContent='Digite um nickname de 2 a 20 caracteres.';root.querySelector('.cv5-mobile-error').textContent='Nome precisa de 2 a 20 caracteres.';name.focus();return;}if(A.getState().screen!=='editor')return;
  $('btn-next').click();$('btn-next').click();$('btn-create').click();const outcome=A.getState();if(outcome.screen==='complete')$('cv5-finish-text').textContent=`${outcome.created?.name||v} — Matemática. Dados salvos neste navegador.`;
 }
 $('cv5-confirm').addEventListener('click',()=>root.classList.contains('cv6-appearance-open')?closeAppearance(false):safeStart());$('cv5-mobile-confirm').addEventListener('click',()=>root.classList.contains('cv6-appearance-open')?closeAppearance(false):safeStart());$('cv5-back').addEventListener('click',()=>root.classList.contains('cv6-appearance-open')?closeAppearance(true):$('btn-back-menu').click());$('cv5-mobile-back').addEventListener('click',()=>root.classList.contains('cv6-appearance-open')?closeAppearance(true):$('btn-back-menu').click());$('cv5-finish-back').addEventListener('click',()=>$('finish-back').click());
 root.querySelectorAll('[data-mobile-tab]').forEach(b=>b.addEventListener('click',()=>{root.dataset.mobilePane=b.dataset.mobileTab;root.querySelectorAll('[data-mobile-tab]').forEach(y=>y.setAttribute('aria-selected',String(b===y)));}));
 // A grade mostra apenas as células concedidas pela campanha. Nenhum botão aqui expande a build.
 let currentBuild=H.blank();
 const point=(p,r)=>({x:220+Math.sqrt(3)*r*(p.q+p.r/2),y:196+1.5*r*p.r});
 const path=(x,y,r)=>Array.from({length:6},(_,i)=>({x:x+r*Math.cos((i*60-30)*Math.PI/180),y:y+r*Math.sin((i*60-30)*Math.PI/180)})).map((p,i)=>(i?'L':'M')+[p.x,p.y].map(n=>n.toFixed(2)).join(' ')).join('')+'Z';
 function hexSVG(build){const cells=H.visible(build);const maxDist=Math.max(...cells.map(c=>H.distance(c,{q:0,r:0})));const r=maxDist>=2?50:maxDist===1?65:76;return `<svg viewBox="0 0 440 392" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${build.unlocked?'Build com '+cells.length+' hexágonos':'Núcleo bloqueado; conclua o tutorial'}">${cells.map(p=>{const x=point(p,r),core=(build.cores||[]).includes(p.key),locked=p.locked;return `<g><path d="${path(x.x,x.y,r)}" fill="${locked?'#092b46':core?'#704717':'#08345c'}" stroke="${locked?'#61aee0':core?'#ffd26f':'#42b3f7'}" stroke-width="3.1"/><text x="${x.x}" y="${x.y+3}" fill="${locked?'#a6ceec':'#ffffff'}" font-size="${locked?14:12}" text-anchor="middle" font-weight="800">${locked?'🔒':core?'NÚCLEO':(build.slots||{})[p.key]?'✦':'+'}</text></g>`}).join('')}</svg>`;}
 function renderBuild(build){currentBuild=structuredClone(build||H.blank());root.classList.toggle('cv9-build-unlocked',!!currentBuild.unlocked);const svg=hexSVG(currentBuild);$('cv5-hex-svg').outerHTML=svg.replace('<svg ','<svg class="cv5-hex-svg" id="cv5-hex-svg" ');$('cv5-mobile-hex').innerHTML=svg;const count=H.visible(currentBuild).filter(c=>!c.locked).length;
  $('cv5-build-status').textContent=currentBuild.unlocked?`${count} ENCAIXE${count===1?'':'S'} LIBERADO${count===1?'':'S'}`:'NÚCLEO BLOQUEADO';$('cv5-build-hint').textContent=currentBuild.unlocked?'Amplie sua colmeia com os desbloqueios da graduação.':'Conclua o tutorial para desbloquear o primeiro núcleo.';$('cv5-build-count').textContent=`${Object.keys(currentBuild.slots||{}).length} habilidade(s) equipada(s)`;
 }
 function reset(){name.value='';mobileName.value='';$('cv5-name-error').textContent='';root.querySelector('.cv5-mobile-error').textContent='';if(root.classList.contains('cv6-appearance-open'))closeAppearance(true);renderBuild(H.blank());saveSummary();root.dataset.mobilePane='profile';root.querySelectorAll('[data-mobile-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.mobileTab==='profile')));}
 $('btn-new-game').addEventListener('click',reset);$('btn-new-game-mobile')?.addEventListener('click',reset);
 renderBuild(H.blank());saveSummary();
 window.ICENDiscenteCentral=Object.freeze({renderBuild,openAppearance,getBuild:()=>structuredClone(currentBuild)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
