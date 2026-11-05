# ICEN Fighters — Piloto Discente Masculino, Opção 2

**Decisão aprovada:** utilizar o corpo **masculino, opção 2**, da última folha anatômica aprovada. As nomenclaturas do jogo continuam apenas **Opção 1, 2, 3**, sem rótulos como “leve/atlético/robusto”.

## O que foi produzido nesta etapa

- Recorte fiel do modelo 2 nas vistas de **frente** e **guarda**, diretamente da folha aprovada. Referências, **não sprites jogáveis**.
- `rig_masculino_02_referencia.json`: hierarquia de articulações, pontos de referência aproximados nas duas imagens, sockets de roupa/cabelo/acessórios e requisitos de animação.
- `rig_lab_m02.html`: **laboratório independente** para selecionar/arrastar pontos articulares e exportar pontos calibrados em JSON. Não modifica o jogo, não simula uma animação pronta.

## Especificação visual

- Mesmo personagem da folha aprovada, opção central masculina, camiseta cinza, short azul, tênis.
- Proporção semi-realista; corpo intermediário, musculatura natural; expressão e pose de lutador.
- O personagem principal terá corpo próprio e aparência personalizável. Tipo corporal é **cosmético**, sem bônus inerente de força/velocidade.
- **Não converter o recorte da folha em sprite final**: há fundo, sombras e partes que exigem redesenho em camadas independentes.

## Hierarquia / articulações

- `root -> pelvis -> spine -> chest -> neck -> head`
- `chest -> shoulder_L/R -> elbow_L/R -> wrist_L/R`
- `pelvis -> hip_L/R -> knee_L/R -> ankle_L/R`
- `root` é referência de chão. Os pivôs do JSON são **estimativas visuais em pixels do recorte**, não medições anatômicas aprovadas. Corrigir no laboratório antes de produzir partes recortadas.

## Modularidade e prevenção de bugs

1. Cada animação e peça compartilha `rigId`, nome das juntas, origem e escala da cena.
2. Corpo e roupas têm máscaras complementares: peça superior cobre o tronco, mangas seguem braço/antebraço, calça/short seguem coxas e pélvis; esconder pele debaixo da roupa.
3. Cabelo dividido frente/trás; acessórios vinculados a pontos nomeados (`sockets`). Profundidade pode variar por pose.
4. Os seis corpos compartilham os IDs de movimento e a hierarquia, **mas não necessariamente mesmas medidas, âncoras ou sprites de roupa**. A versão feminina exige desenho próprio, não esticar a masculina.
5. A lógica do combate e as hitboxes devem ficar separadas dos PNGs. Habilidades/VFX são anexos ao rig e podem ser transferidas entre personagens.
6. Evitar interpolar rotação de peças pixeladas como solução final: limpar contornos e articulações quadro a quadro, principalmente ombros, punhos, joelhos, cabelos e roupas soltas.
7. Nunca modificar automaticamente todos os cosméticos por uma única escala uniforme que abra juntas ou deforme os pixels.

## Etapas e critérios de aprovação

**Fase 0 (atual):** recorte, decisões e calibrador de juntas (não pronto para o jogo).

**Fase 1:** redesenhar as peças originais com transparência: cabeça, torso, pélvis, braços, mãos, coxas, pernas, pés, cabelo dianteiro/traseiro, camiseta e short. Conferir oclusão sem espaços vazios.

**Fase 2:** aplicar o rig ao modelo masculino 2; primeira animação `idle` completa e limpa, sem tremor de pixels nem deslizamento dos pés.

**Fase 3:** `walk_fwd`, `jump`, `punch_light`, `kick_light`, com volume constante e alcance legível.

**Fase 4:** vestir duas peças alternativas e trocar o cabelo em **todas** as cinco ações. Trocar durante a animação sem teleportar, clipping nem quebrar z-order.

**Fase 5:** criar as variantes restantes de corpo masculino e feminino preservando APIs do rig, mas ajustando geometria e máscaras. Só então integrar ao jogo.

Critérios de aceite da primeira animação: (a) todos os PNGs e máscaras exportam em mesma origem/frame; (b) pontos de encaixe sincronizados; (c) pés plantados; (d) movimento lateral e espelhamento corretos; (e) sem lacunas visíveis nas articulações; (f) variantes de roupa acompanhando o corpo; (g) sprites/VFX independentes.

**Registro de status:** nenhum rig animado, sprite definitivo, frame de combate ou versão feminina foi produzido agora. As coordenadas são um ponto inicial a revisar com artista, não prova de rig funcional.
