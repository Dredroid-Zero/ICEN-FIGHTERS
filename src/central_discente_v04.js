/* ICEN Fighters — Central do Discente v0.4
   Decorada com a arte aprovada, mas controles reais utilizam o motor de save existente.
   A grade é uma prévia do sistema curricular; não concede habilidades antes do tutorial. */
(()=>{'use strict';
function setup(){
const C=window.ICENCatalog, App=window.ICENApp, id=x=>document.getElementById(x);
const node=document.createElement('div');node.className='cv4';node.id='central-discente-v04';
let activeSection='identity',previewMode='locked',expanded=false;
const courses=[['matematica','Matemática','∑',true],['fisica','Física','⚛',false],['biologia','Biologia','✥',false],['quimica','Química','⚗',false]];
const sections=[['identity','Identidade'],['appearance','Aparência'],['outfit','Roupas'],['accessory','Acessórios']];
const options=(idGroup,items,attr)=>items.map(x=>`<button type="button" class="cv4-option" data-choice="${attr}" data-val="${x.id}" aria-pressed="false">${x.label}</button>`).join('');
node.innerHTML=`
<header class="cv4-header"><span class="cv4-header-note">NOVO JOGO · MATEMÁTICA</span><span class="cv4-header-note cv4-header-note--right">CENTRAL DO DISCENTE · v0.4</span></header>
<nav class="cv4-mobile-tabs" aria-label="Painéis da central"><button type="button" data-mobile="identity" aria-selected="true">IDENTIDADE</button><button type="button" data-mobile="preview" aria-selected="false">DISCENTE</button><button type="button" data-mobile="build" aria-selected="false">BUILD</button></nav>
<div class="cv4-columns" data-mobile-pane="identity">
  <aside class="cv4-panel cv4-panel--left" aria-label="Identidade e aparência">
    <div class="cv4-panel-head"><div><div class="cv4-panel-kicker">FICHA DO JOGADOR</div><h2 class="cv4-panel-title">PERSONALIZAÇÃO</h2></div><span class="cv4-tag">01 / 05</span></div>
    <nav class="cv4-nav" aria-label="Categorias de personalização">${sections.map(([key,label])=>`<button type="button" data-section="${key}" aria-selected="${key==='identity'}">${label}</button>`).join('')}</nav>
    <div class="cv4-form-area">
      <section class="cv4-section active" data-panel="identity"><label class="cv4-label" for="cv4-name">Nome do Discente</label><input id="cv4-name" class="cv4-input" type="text" maxlength="20" placeholder="Seu nickname (2–20 letras)" autocomplete="off" /><div id="cv4-name-error" class="cv4-error" aria-live="polite"></div><div class="cv4-label">Escolha seu curso</div><div class="cv4-course-grid">${courses.map(([key,label,icon,available])=>`<button type="button" class="cv4-course ${available?'selected':''}" data-course="${key}" ${available?'':'disabled'} aria-label="${label}${available?' disponível':' em breve'}" aria-pressed="${available}"><span class="cv4-course-icon">${icon}</span><span><b>${label}</b><small>${available?'Disponível':'🔒 Em breve'}</small></span></button>`).join('')}</div><div class="cv4-mini">A Matemática é o curso disponível nesta primeira versão. Seu primeiro desafio será o tutorial de Iniciação ao Pensamento Científico.</div></section>
      <section class="cv4-section" data-panel="appearance"><div class="cv4-label">Modelo do Discente</div><div class="cv4-choice-row">${options('model',C.bodyModels,'model')}</div><div class="cv4-label">Tom de pele</div><div class="cv4-swatches">${C.skinColors.map((hex,i)=>`<button class="cv4-swatch" type="button" data-choice="skin" data-val="${i}" style="background:${hex}" aria-label="Tom de pele ${i+1}" aria-pressed="false"></button>`).join('')}</div><div class="cv4-label">Penteado</div><div class="cv4-choice-row">${options('hair',C.hairStyles,'hair')}</div><div class="cv4-label">Cor do cabelo</div><div class="cv4-swatches">${C.hairColors.map((hex,i)=>`<button class="cv4-swatch" type="button" data-choice="hair-color" data-val="${i}" style="background:${hex}" aria-label="Cor de cabelo ${i+1}" aria-pressed="false"></button>`).join('')}</div><div class="cv4-mini">Os visuais são salvos no perfil. O manequim é temporário: o sprite modular definitivo será produzido separadamente.</div></section>
      <section class="cv4-section" data-panel="outfit"><div class="cv4-label">Trajes iniciais</div><div class="cv4-choice-row">${options('outfit',C.outfits,'outfit')}</div><div class="cv4-mini">Outros trajes serão desbloqueados ao vencer disciplinas. As peças futuras serão combináveis por camadas independentes.</div></section>
      <section class="cv4-section" data-panel="accessory"><div class="cv4-label">Acessórios iniciais</div><div class="cv4-choice-row">${options('accessory',C.accessories,'accessory')}</div><div class="cv4-mini">Não interferem na nota ou dificuldade. Novos cabelos, roupas e acessórios entrarão no catálogo de recompensas.</div></section>
    </div>
  </aside>
  <section class="cv4-middle" aria-label="Prévia do Discente"><div class="cv4-middle-pill">MODELO DE REFERÊNCIA</div><div class="cv4-middle-bottom"><div class="cv4-preview-name" id="cv4-preview-name">DISCENTE</div><div class="cv4-preview-details" id="cv4-preview-details">MATEMÁTICA · ESTILO CAMPUS</div><div class="cv4-preview-warning">Arte de referência — sprite modular em produção</div></div></section>
  <aside class="cv4-panel cv4-panel--right" aria-label="Construção de habilidades">
    <div class="cv4-panel-head"><div><div class="cv4-panel-kicker">ARSENAL DO DISCENTE</div><h2 class="cv4-panel-title">BUILD HEXAGONAL</h2></div><span class="cv4-tag" id="cv4-slots-label">7 CÉLULAS</span></div>
    <div class="cv4-build-body"><p class="cv4-build-description">Hexágonos unidos por arestas. Vizinhos compatíveis podem ativar sinergias.</p><svg class="cv4-honeycomb" id="cv4-honeycomb" viewBox="0 0 360 275" role="img" aria-label="Grade de sete hexágonos contíguos, bloqueada até o tutorial"></svg><div class="cv4-build-notice" id="cv4-build-notice"><strong>🔒 Grade bloqueada.</strong> Complete o tutorial para conquistar o primeiro núcleo e começar a equipar habilidades.</div><div class="cv4-build-tools"><button class="cv4-tool" id="cv4-demo" type="button">VER SINERGIA</button><button class="cv4-tool" id="cv4-expand" type="button">PRÉVIA: EXPANDIR</button></div></div>
  </aside>
</div>
<footer class="cv4-footer"><button type="button" class="cv4-cta" id="cv4-back">← VOLTAR</button><button type="button" class="cv4-cta cv4-cta--gold" id="cv4-start">INICIAR GRADUAÇÃO ✓</button></footer>`;
const screen=id('screen-editor');screen.insertBefore(node,screen.firstChild);
const finish=document.createElement('div');finish.className='cv4-finish';finish.innerHTML='<div class="cv4-finish-panel"><div class="cv4-panel-kicker">MATRÍCULA REGISTRADA</div><h2>DISCENTE CRIADO ✓</h2><p id="cv4-created-msg">Seu personagem foi salvo.</p><p>Próxima etapa: tutorial de Iniciação ao Pensamento Científico (ainda em produção).</p><button id="cv4-finish-back" class="cv4-cta cv4-cta--gold" type="button">VOLTAR AO MENU</button></div>';
id('screen-complete').insertBefore(finish,id('screen-complete').firstChild);
const coords=[{q:0,r:0},{q:1,r:0},{q:1,r:-1},{q:0,r:-1},{q:-1,r:0},{q:-1,r:1},{q:0,r:1}];
function allCells(radius){const x=[];for(let q=-radius;q<=radius;q++)for(let r=-radius;r<=radius;r++)if(Math.max(Math.abs(q),Math.abs(r),Math.abs(q+r))<=radius)x.push({q,r});return x}
const fixed=(q,r)=>({x:180+Math.sqrt(3)*32*(q+r/2),y:130+48*r});
function hex(x,y,r=32){return Array.from({length:6},(_,i)=>`${(x+r*Math.cos((60*i-30)*Math.PI/180)).toFixed(3)},${(y+r*Math.sin((60*i-30)*Math.PI/180)).toFixed(3)}`).join(' ')}
function isDemoCell(p){return previewMode==='sample'&&((p.q===1&&p.r===0)||(p.q===0&&p.r===1))}
function buildHoneycomb(){const cells=window.ICENHexGrid.ring(expanded?2:1);const svg=id('cv4-honeycomb');const radius=expanded?26:43;const scale=radius/32;const yshift=expanded?0:8;
 svg.innerHTML=cells.map(p=>{let {x,y}=fixed(p.q,p.r);x=180+(x-180)*scale;y=130+(y-130)*scale+yshift;const core=p.q===0&&p.r===0;const sample=isDemoCell(p);const text=core?(previewMode==='sample'?'NÚCLEO':'🔒'):sample?(p.q===1?'TRIG.':'GEOM.'):(expanded?'·':'🔒');return `<g class="${core?'cv4-honeycomb-core':''}"><polygon points="${hex(x,y,radius)}" fill="${core?'#60431c':sample?'#146b70':'#102f4b'}" stroke="${core?'#ffcb66':sample?'#72e6d9':'#578dae'}" stroke-width="2"/><text x="${x}" y="${y+1}" text-anchor="middle">${text}</text></g>`}).join('');
 svg.setAttribute('aria-label',expanded?'Grade contínua de 19 hexágonos, prévia de expansão':'Grade contínua de sete hexágonos, com um núcleo central');
 id('cv4-slots-label').textContent=(expanded?'19':'7')+' CÉLULAS';
 id('cv4-build-notice').innerHTML=previewMode==='sample'?'<strong>Prévia de sinergia:</strong> Trigonometria e Geometria em hexágonos vizinhos podem gerar uma habilidade combinada. Exemplo ilustrativo, ainda não liberado.':'<strong>🔒 Grade bloqueada.</strong> Complete o tutorial para conquistar o primeiro núcleo. Expansões e núcleos adicionais serão desbloqueáveis futuramente.';
 id('cv4-demo').classList.toggle('active',previewMode==='sample');id('cv4-expand').classList.toggle('active',expanded);
}
function render(){const ch=App.getState().character;
 id('cv4-preview-name').textContent=ch.name.trim()||'DISCENTE';
 id('cv4-preview-details').textContent='MATEMÁTICA · '+(C.outfits.find(x=>x.id===ch.outfit)?.label||'Campus').toUpperCase()+' · '+(C.bodyModels.find(x=>x.id===ch.model)?.label||'');
 node.querySelectorAll('[data-choice]').forEach(b=>{const type=b.dataset.choice, key=({'model':'model','skin':'skin','hair':'hairStyle','hair-color':'hairColor','outfit':'outfit','accessory':'accessory'})[type];b.setAttribute('aria-pressed',String(String(ch[key])===String(b.dataset.val)))});
}
function switchSection(key){activeSection=key;node.querySelectorAll('[data-panel]').forEach(x=>x.classList.toggle('active',x.dataset.panel===key));node.querySelectorAll('[data-section]').forEach(x=>x.setAttribute('aria-selected',String(x.dataset.section===key)))}
function reset(){switchSection('identity');id('cv4-name').value='';id('cv4-name-error').textContent='';previewMode='locked';expanded=false;buildHoneycomb();render();id('central-discente-v04').querySelector('.cv4-columns').dataset.mobilePane='identity';node.querySelectorAll('[data-mobile]').forEach(x=>x.setAttribute('aria-selected',String(x.dataset.mobile==='identity')))}
const mirror={'model':'#body-model-options [data-model]','skin':'#skin-swatches [data-skin]','hair':'#hairstyles [data-hair]','hair-color':'#hair-swatches [data-hair-color]','outfit':'#outfits [data-outfit]','accessory':'#accessories [data-accessory]'};
node.addEventListener('click',e=>{
 const tab=e.target.closest('[data-section]');if(tab){switchSection(tab.dataset.section);return}
 const mobile=e.target.closest('[data-mobile]');if(mobile){node.querySelector('.cv4-columns').dataset.mobilePane=mobile.dataset.mobile;node.querySelectorAll('[data-mobile]').forEach(x=>x.setAttribute('aria-selected',String(x===mobile)));return}
 const choice=e.target.closest('[data-choice]');if(choice){const attr=choice.dataset.choice;const old=document.querySelector(`${mirror[attr]}[data-${attr}="${choice.dataset.val}"]`);if(old){old.click();render()}return}
});
id('cv4-name').addEventListener('input',()=>{const old=id('player-name');old.value=id('cv4-name').value;old.dispatchEvent(new Event('input',{bubbles:true}));id('cv4-name-error').textContent='';render()});
id('cv4-demo').addEventListener('click',()=>{previewMode=previewMode==='sample'?'locked':'sample';buildHoneycomb()});
id('cv4-expand').addEventListener('click',()=>{expanded=!expanded;buildHoneycomb()});
id('cv4-back').addEventListener('click',()=>id('btn-back-menu').click());
id('cv4-finish-back').addEventListener('click',()=>id('finish-back').click());
id('cv4-start').addEventListener('click',()=>{
 const name=id('cv4-name').value.trim();if(name.length<2||name.length>20){id('cv4-name-error').textContent='Escolha um nome de 2 a 20 caracteres.';switchSection('identity');node.querySelector('.cv4-columns').dataset.mobilePane='identity';id('cv4-name').focus();return}
 const appState=App.getState();if(appState.screen!=='editor')return;
 // Usa o fluxo de validação/salvamento já existente; não cria um sistema paralelo de saves.
 id('btn-next').click();id('btn-next').click();id('btn-create').click();
 const st=App.getState();if(st.screen==='complete')id('cv4-created-msg').textContent=`${st.created?.name||name} — Curso: Matemática. Seu progresso foi salvo neste navegador.`;
});
// O ouvinte é registrado depois do app.js para que o estado de novo jogo já tenha sido reiniciado.
id('btn-new-game').addEventListener('click',reset);
id('btn-new-game-mobile')?.addEventListener('click',reset);
buildHoneycomb();render();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
