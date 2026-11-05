# ICEN Fighters — Decisão de produção do Discente M02 (v0.3)

**Estado:** arquitetura aprovada para um último piloto controlado; **arte modular ainda não produzida nem validada**.
**Escopo:** somente jogo, não história. **Modelo piloto:** Discente masculino, opção 2 da folha anatômica aprovada. As opções corporais da interface continuam numeradas 1, 2 e 3 para masculino e feminino.
**Não alterar:** menu principal, tela de criação, saves, sistema curricular ou combate enquanto o piloto não passar na revisão visual.

## 1. O que não funcionou na v0.2

O piloto `tools/rig_m02/idle_v02/` tentou separar *depois de pronta* uma figura originalmente composta. Isso resultou em manga misturada ao braço, pedaços de short classificados como camiseta, tênis/short que desaparecem só parcialmente e juntas com cortes evidentes. O teste de recoloração usava sobreposições de cor, não uma camiseta independente; a própria documentação da v0.2 já registrava limitações de anatomia oculta e roupas intercambiáveis. O novo piloto **não reutiliza as máscaras extraídas da v0.2 como arte final**.

## 2. Duas formas de exibir lutadores, uma lógica de jogo

A identidade do jogador, matrícula/semestres, disciplinas vencidas, habilidades, inventário e resultados são dados do jogo. A apresentação visual é selecionada por um adaptador (`visual.mode`):

- **Plano A — `modular_rig`:** corpo-base + animação compartilhada + acessórios e roupas criados originalmente em camadas. A geometria de cada roupa pode precisar de ajuste para cada corpo; não esticar automaticamente os sprites.
- **Plano B — `fixed_spritesheet`:** quatro a oito avatares principais pré-definidos, selecionáveis pelo jogador, cada um com animações de corpo inteiras, produzidas e retocadas quadro a quadro. As disciplinas continuam como adversários e seus personagens poderão ser liberados como lutadores selecionáveis, segundo regras definidas mais adiante.

**Os poderes não fazem parte da roupa nem dos sprites do corpo.** São efeitos independentes ligados a `hand_L`, `hand_R`, `feet`, `center` ou outros pontos de ação, para continuar possível aprender e equipar habilidades de disciplinas mesmo no Plano B. Usar um personagem desbloqueado também não deve apagar o progresso acadêmico.

### Contrato de dados (proposta, não migração aplicada)

```json
{
  "player": {
    "id": "save-slot-1",
    "nickname": "Discente",
    "degree": "matematica",
    "progression": {"semester": 1, "completedCourses": []},
    "abilities": {"unlocked": [], "equipped": []},
    "unlockedFighters": ["discente.m02"]
  },
  "appearance": {
    "visualMode": "modular_rig",
    "fighterId": "discente.m02",
    "bodyId": "masculino.02",
    "outfitId": "uniforme-piloto",
    "hairId": "curto-01"
  }
}
```

Em `fixed_spritesheet`, `fighterId` identifica o conjunto fechado de animações. O inventário de habilidades não depende da renderização. O esquema é apenas a especificação de compatibilidade futura; **não substituir os saves atuais**.

## 3. Construção correta da arte: trabalho em camadas desde a origem

O desenho original de trabalho deve ser um arquivo editável em camadas (`.aseprite`, `.psd`, `.kra` ou equivalente), preservando transparência, e exportar um PNG por peça. É **proibido** usar segmentação por cor da imagem achatada como método de produção.

**Corpo interno completo:** cabeça + pescoço; peito/abdômen; quadril; braço superior e antebraço dos dois lados; mãos; coxas; canelas; pés. Desenhar também as partes que ficam ocultas por tecido ou outros membros; esconder corretamente esses pixels sob as roupas. Em nenhuma hipótese remover o tênis pode deixar o pé incompleto.

**Peças substituíveis:** cabelo traseiro/frontal, camiseta (tronco), manga esquerda e direita, short/cintura, perna direita e esquerda do short, calçados completos dos dois lados e acessórios. Cada elemento tem sua própria máscara alfa sem pixels de outra peça. A cor azul da camiseta só pode ser aplicada às máscaras da camiseta e das mangas, nunca ao short.

**Pontos e camadas:** manter IDs canônicos como `head`, `shoulder_L/R`, `elbow_L/R`, `wrist_L/R`, `pelvis`, `hip_L/R`, `knee_L/R`, `ankle_L/R`, `foot_L/R`; incluir encaixes `hair_front/back`, `hand_L/R`, `top`, `bottom`, `shoe_L/R`, `accessory` e `vfx`. Guardar `pivot`, camada (`zIndex`), máscara de cobertura e variante corporal em um manifesto. Braço na frente/atrás do tronco pode variar por pose; a ordem não precisa ser rígida globalmente.

**Direção de arte:** pixel art detalhado, silhueta de lutador, proporções da folha M02 aprovada, guarda legível, sem articulações em formato de boneco de papel. Exportar em resolução nativa e usar `nearest-neighbor` ao aumentar. Dimensão do canvas não está congelada: a v0.2 usava 182 × 320 px e será referência de escala, não obrigação de encaixe.

## 4. Escopo mínimo do piloto e teste de aceitação

Somente **masculino, opção 2**. Primeiro validar **guarda/idle, soco leve e chute leve**, não começar pelos seis corpos. Um único visual inicial (camiseta, short e tênis), uma versão alternativa de **camiseta inteira** e um segundo penteado. A versão alternativa é um sprite independente do traje, não filtro que recolore parte do corpo.

### Checklist visual obrigatório

1. **Camisa:** alterar a camiseta não altera short, pele, pescoço, cabelo, tênis nem acessórios; mangas acompanham os ombros, cotovelos e a respiração.
2. **Peça removida:** ao ocultar camiseta, short ou calçado, só essa peça desaparece; as áreas antes cobertas revelam desenho completo, não buracos transparentes.
3. **Movimento:** idle, soco e chute não abrem lacunas em ombro, cotovelo, quadril e joelho; pés não deslizam na guarda.
4. **Substituição durante animação:** mudar camisa/cabelo a meio de uma ação não muda origem, pivôs, orientação ou quadro temporal; sem saltos ou inversão de z-order.
5. **Comparações:** inspecionar no tamanho nativo, 2× e 4×, sobre fundos claro e escuro; testar direita/esquerda, antes de publicar.
6. **Separação da luta:** hitboxes/hurtboxes e VFX são independentes do PNG e não mudam ao trocar roupa ou corpo.
7. **Compatibilidade:** se uma peça exigir pivô ou malha diferente em outro corpo, criar variante de encaixe para ele; nunca esticar `x` e esperar encaixe perfeito.

O validador `tools/rig_m02/v03/validate_assets.py` confere a existência de fontes e máscaras, dimensões, transparência, ausência de vazamento nas máscaras declaradas e integridade do manifesto. **Ele não consegue certificar sozinho a estética, os encaixes em todas as poses ou a qualidade das animações**. Essas aprovações são visuais.

## 5. Ponto de decisão entre A e B

Não produzir as outras cinco anatomias nem o catálogo de roupas antes de aprovar o piloto. Se mesmo com peças realmente redesenhadas as três animações e as trocas continuarem apresentando cortes perceptíveis após uma rodada de correção direcionada, interromper a expansão modular e comparar custo/qualidade com o Plano B. **A mudança para o Plano B exige decisão explícita**; não é automática nem apaga o estudo realizado.

No Plano B, a escolha de 4 ou 8 avatares será tomada depois do teste, ponderando variedade visual, esforço de animação e representação. A aquisição das habilidades das disciplinas, núcleo hexagonal, progressão por semestre, notas e créditos não depende dessa escolha.

## 6. Fontes técnicas consultadas

- Spine — Skins e attachments: https://esotericsoftware.com/spine-skins
- Unity — Introduction to Sprite Swap: https://docs.unity.cn/Packages/com.unity.2d.animation@9.0/manual/SpriteSwapIntro.html
- Unity — Swapping individual Sprites: https://docs.unity.cn/Packages/com.unity.2d.animation@9.0/manual/CharacterParts.html
- Unity — 2D game creation workflow (frame-by-frame, cutout, skeletal): https://docs.unity3d.com/6000.1/Documentation/Manual/2d-game-creation-wokflow.html
- Godot — 2D skeletons: https://docs.godotengine.org/en/stable/tutorials/animation/2d_skeletons.html

**Situação da arte:** a folha M02 aprovada é a referência de visual; a próxima produção precisa ser uma nova fonte original em camadas. Nenhum sprite definitivo foi criado neste documento.
