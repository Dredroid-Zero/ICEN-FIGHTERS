# PROPOSTA v0.1 — Sistema de Personagem Mestre, Skins e Habilidades Separadas

**Status:** decisão de arquitetura em análise; nenhum sprite definitivo produzido.  
**Finalidade:** substituir o atual sistema de PNG estático 80×112 por um padrão de personagem de luta detalhado, modular e reutilizável.

## 1. Regra geral

A entidade jogável não é uma imagem pronta. É o conjunto:

**Personagem = animação-base/rig + corpo visual + roupa + cabelo + acessórios + habilidades equipadas.**

A habilidade não pertence ao cabelo, à roupa ou ao arquivo do personagem. Ela usa animações de movimento/gesto, eventos de combate e efeitos externos. Assim, o Discente e qualquer disciplina podem executar a mesma habilidade se autorizados pelo inventário.

**Um rig mestre** significa a mesma hierarquia de ossos, convenções de animação e encaixes, não a obrigação de todos os personagens terem a mesma aparência, altura física ou personalidade.

## 2. Estratégia escolhida para o protótipo: híbrida

1. Criar arte original e detalhada em partes: cabeça, tronco, braço superior/antebraço/mão dos dois lados, coxa/canela/pé dos dois lados, cabelo, roupas.
2. Animar UM esqueleto mestre de combate lateral; dois perfis de proporção compartilham os mesmos nomes de articulação, com offsets compatíveis.
3. Exportar cada clipe como sprites alinhados por camada e por frame (PNG com transparência + metadados JSON), sem incluir efeitos mágicos.
4. No navegador, reproduzir o mesmo animationId e frameIndex em TODAS as camadas, com ordenação visual por pose. O renderizador não precisa conhecer o nome do personagem para executar uma animação.
5. Anexar habilidades e efeitos em pontos de ligação (sockets) e eventos de animação, sem substituir o corpo nem duplicar todas as combinações de cosméticos.
6. Usar frames desenhados manualmente onde o rig não bastar (mãos, pés, expressões, cabelo e roupas soltas) para manter qualidade de pixel art.

Por que não gerar um sprite completo para cada combinação? Porque isso multiplicaria personagens, peles, cabelos, roupas, animações e habilidades. Por que não usar só bonecos recortados no navegador? Porque rotações e sobreposições sem refinamento causam as falhas visuais reclamadas: pernas truncadas, juntas abertas e roupas que não acompanham o corpo.

## 3. Modelo técnico proposto (números experimentais)

- Vista: lateral em batalha, com orientação espelhável; retrato separado para menus.
- Tela-mestra por frame: **192×192 px**, com margem para braços e chutes; tamanho final sujeito a ensaio visual.
- Corpo visível típico: 135–160 px de altura dentro da tela-mestra; manter proporções estáveis.
- Renderização: escala inteira sempre que possível; imageSmoothingEnabled = false.
- Combate: lógica a 60 ticks/segundo; arte em torno de 10–16 poses/segundo com duração de quadros controlada.
- Ponto de origem: solo/posição dos pés; z-order da aparência pode variar por animação.
- Hitboxes, hurtboxes e pushbox são dados do combate, não dependem da imagem PNG.

Esses valores são **parâmetros de teste**, não dimensões finais da engine Brush & Blade.

## 4. Ossos e encaixes padronizados

Hierarquia mínima:
- root -> pelvis -> torso -> chest -> neck -> head
- chest -> shoulder_L -> upper_arm_L -> forearm_L -> hand_L
- chest -> shoulder_R -> upper_arm_R -> forearm_R -> hand_R
- pelvis -> upper_leg_L -> lower_leg_L -> foot_L
- pelvis -> upper_leg_R -> lower_leg_R -> foot_R

Pontos adicionais para cabelo, capa, mochila e calçados:
- hair_back, hair_front, hat, glasses
- wrist_L, wrist_R, palm_L, palm_R, foot_tip_L, foot_tip_R
- projectile_origin, defense_center, ground_center, aura_root

Peças intercambiáveis:
- body / face / hair_back / hair_front
- top / bottom / shoes
- accessory_head / accessory_face / accessory_back / accessory_hand
- optional_layers (saia, jaleco, capa, luvas etc.)

**Regra de oclusão:** mão/antebraço na frente ou atrás do torso conforme a pose, não uma ordem fixa de seis PNGs. Cabelos compridos ficam divididos em parte de trás e da frente, com ajustes quando cruzarem ombros.

## 5. Biblioteca universal de movimentos

Todos os adversários curriculares e o Discente devem herdar o mesmo vocabulário de animações. Alguns golpes requerem variantes, mas isso não duplica toda a biblioteca.

| Código | Ação | Prioridade |
|---|---|---|
| idle | respiração e espera | MVP |
| walk_fwd | andar para frente | MVP |
| walk_back | andar para trás | MVP |
| dash | corrida/esquiva curta | MVP |
| jump_start / jump_air / land | pulo com decolagem, ar e pouso | MVP |
| crouch | abaixar | MVP |
| guard_high / guard_low | defender alto/baixo | MVP |
| punch_light / punch_heavy | soco rápido/forte | MVP |
| kick_light / kick_heavy | chute rápido/forte | MVP |
| punch_air / kick_air | golpes aéreos | MVP |
| punch_low / kick_low | golpe agachado | MVP |
| hit_light / hit_heavy | reação ao dano | MVP |
| knockdown / getup | cair e levantar | MVP |
| cast_short / cast_long | gestos genéricos para invocar poderes | posterior |
| intro / victory / defeat | poses de apresentação, vitória e derrota | posterior |
| special_override | animação específica de habilidade, quando necessária | sob demanda |

## 6. Habilidades transferíveis

Registro conceitual por habilidade:
- id, nome, disciplina de origem, requisito para desbloquear e custo no arsenal;
- animationId do gesto corporal compartilhado ou override;
- sequência de eventos: início, janela ativa, cancelamento, término;
- visualFxId independente, ponto de origem/socket, offset, tempo e trajetória;
- ataque: dano, tipo, hitboxes, guarda permitida, knockback, recursos, cooldown;
- slots compatíveis, nível da habilidade e limitações de PvE/PvP.

**Exemplo:** A habilidade tnc.rotacao_complexa dispara a pose cast_short, prende o efeito em aura_root e executa um deslocamento controlado. O mesmo tnc.rotacao_complexa pode ser equipado no Discente sem importar nenhum sprite de Íris.

## 7. Catálogo de personagens

O catálogo do PPC da Matemática continua como fonte de identidades acadêmicas:
- disciplineId, nome oficial da disciplina, código PPC, semestre, pré-requisitos, forma/evolução;
- rigProfile, visualParts, tintMasks, animationOverrides;
- skills, aiProfile, difficulty, cosmeticsRewards, skillsRewards;
- notes e status de aprovação visual.

**Importante:** fichas antigas e personagens da história NÃO definem automaticamente nomes nem visual do jogo. Os rivais que já foram desenhados de outro jeito podem continuar como testes até a revisão do novo padrão.

## 8. Ferramentas de referência

- PixelOver: animação em ossos e exportação de sprites com pixel art — https://docs.pixelover.io/manual/introduction/
- Aseprite: edição quadro a quadro, camadas e exportação em spritesheet — https://www.aseprite.org/docs/sprite-sheet/
- Godot Skeleton2D/cutout: alternativa sem mudar necessariamente a engine web — https://docs.godotengine.org/en/stable/tutorials/animation/cutout_animation.html
- Smack Studio: referência de ferramenta para criação de lutadores a partir de templates — https://smackstudio.com/characters/
- Spine skins: referência de attachments e costumes intercambiáveis — https://us.esotericsoftware.com/spine-skins

## 9. Teste de prova de conceito antes da produção em massa

**Fazer apenas UM boneco mestre e DUAS variações cosméticas**:
1. Criar concept de lutador de perfil lateral, aprovado pelo autor.
2. Rigar base masculina/feminina compatível com a mesma biblioteca de movimento.
3. Produzir 5 ações: idle, walk_fwd, jump, punch_light e kick_light.
4. Testar trocas de cabelo curto/tranças, camiseta/jaleco e 2 tons de pele em TODOS os frames.
5. Testar um poder independente com socket de mão e projeção para frente.
6. Registrar vídeo/capturas lado a lado, corrigir oclusão, encaixes, silhuetas e clipping.
7. Congelar rig e convenção de exportação somente após passar nesses testes.

Critérios de aceitação:
- nenhum quadro com membro ausente, roupa cortada ou junta aberta;
- pés em contato com o solo nos frames corretos (alinhamento do mesmo pivô);
- todos os itens do teste acompanham os movimentos sem ajustes individuais por personagem;
- o mesmo poder renderiza em dois visuais diferentes sem reconstruir a animação corporal;
- tamanho/silhueta legíveis sobre o cenário Campus das Auroras;
- compatibilidade demonstrada com o renderer da engine atual, antes de produzir todo o elenco.
