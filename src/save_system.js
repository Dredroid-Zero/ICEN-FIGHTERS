/* Slots locais: preparados para até cinco campanhas. A opção Continuar permanece bloqueada na alfa. */
(function(){'use strict';
const C=window.ICENCatalog;
function read(){try{const raw=localStorage.getItem(C.saveKey);if(!raw)return Array(C.maxSlots).fill(null);const a=JSON.parse(raw);if(!Array.isArray(a))return Array(C.maxSlots).fill(null);return Array.from({length:C.maxSlots},(_,i)=>a[i]||null)}catch(e){return Array(C.maxSlots).fill(null)}}
function write(slots){try{localStorage.setItem(C.saveKey,JSON.stringify(slots));return true}catch(e){return false}}
function store(character,replaceSlot=null){let slots=read(),slot=replaceSlot??slots.findIndex(x=>!x);if(slot<0){return {ok:false,reason:'full',slots}};
 const now=new Date().toISOString();const save={schema:'icen.fighters.save.v0.2',version:2,id:'discente',...character,createdAt:now,semester:1,program:'matematica',semesterGrades:{},skills:[],inventory:[],status:'character_created'};
 slots[slot]=save;if(!write(slots))return {ok:false,reason:'storage_unavailable',slot};return {ok:true,slot,save,slots};}
window.ICENSave=Object.freeze({read,store,maxSlots:C.maxSlots});
})();

