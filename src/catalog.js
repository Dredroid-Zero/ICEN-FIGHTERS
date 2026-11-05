/* ICEN Fighters | Catálogo do Discente v0.2 | dados, sem efeitos embutidos */
window.ICENCatalog=Object.freeze({
 version:'0.2.0',saveKey:'icen_fighters_save_slots_v02',maxSlots:5,
 bodyModels:[{id:'masculino',label:'Masculino'},{id:'feminino',label:'Feminino'}],
 skinColors:['#F6D3B4','#EABC96','#D9956F','#BE7E59','#9B6444','#795035','#5B382A','#39271E'],
 hairColors:['#27263B','#6A4437','#D4AC66','#B75C43','#744591','#477CC2'],
 hairStyles:[{id:'curto',label:'Curto',detail:'Corte clássico'},{id:'cachos',label:'Cachos',detail:'Volume natural'},{id:'trancas',label:'Tranças',detail:'Tranças longas'}],
 outfits:[
  {id:'campus',label:'Campus',detail:'Moletom + jeans',top:'campus',bottom:'campus',shoes:'campus',unlock:'initial'},
  {id:'laboratorio',label:'Laboratório',detail:'Jaqueta técnica',top:'laboratorio',bottom:'laboratorio',shoes:'laboratorio',unlock:'initial'},
  {id:'esportivo',label:'Esportivo',detail:'Jaqueta + treino',top:'esportivo',bottom:'esportivo',shoes:'esportivo',unlock:'initial'}
 ],
 accessories:[{id:'nenhum',label:'Sem acessório'},{id:'oculos',label:'Óculos'},{id:'fone',label:'Fones'}],
 layers:['body','bottoms','shoes','tops','hair','accessories'],
 defaultCharacter:{name:'',model:'masculino',skin:3,hairStyle:'curto',hairColor:0,outfit:'campus',top:'campus',bottom:'campus',shoes:'campus',accessory:'nenhum',unlockedSkills:[],unlockedCosmetics:[]}
});

