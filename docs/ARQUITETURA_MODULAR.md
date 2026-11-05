# Plano de integração — Menu v0.2 → jogo base

## Decisão técnica

1. **Identidade do Discente** fica no objeto de configuração e nas peças de imagem, sem golpes embutidos.
2. **Roupa e acessórios** são camadas independentes. O preset de roupa inicial só atribui IDs às três peças (`top`, `bottom`, `shoes`); futuras recompensas poderão trocar cada uma separadamente.
3. **Habilidades** vivem em inventário e módulo próprio; o renderer do poder conhece posição do lutador e parâmetros, mas não sabe quem é a pessoa em desenho. Isso permite transferir a mesma habilidade de um adversário ao Discente.
4. **Animações** futuramente terão um `animationId` e `frameIndex` comum a todas as peças. As camadas deverão fornecer frames sincronizados e manter a referência de pé e as articulações. Não trocar atlas de personagem inteiro para equipar poder.
5. **Combate/engine** e grade curricular não foram reimplementados neste pacote. A primeira etapa foi deliberadamente isolada como menu e criação; a transição futura de `character_created` para `tutorial_intro` será construída depois.

## Estrutura

- `index.html`: telas da interface.
- `src/style.css`: estilos responsivos e menu.
- `src/catalog.js`: opções visuais e `defaultCharacter`.
- `src/sprite_renderer.js`: renderização de corpo/partes por IDs, sem habilidade.
- `src/power_effects.js`: poderes independentes do visual do personagem.
- `src/save_system.js`: até cinco slots locais, sem interface de continuar nesta etapa.
- `src/app.js`: fluxo de 3 etapas.
- `assets/sprites/body/`: 2 modelos × 8 peles.
- `assets/sprites/hair/`: 3 penteados × 6 cores.
- `assets/sprites/tops/`: 2 modelos × 3 modelos de blusa/jaqueta.
- `assets/sprites/bottoms/`: 2 modelos × 3 modelos de calças.
- `assets/sprites/shoes/`: 3 calçados.
- `assets/sprites/accessories/`: óculos e fone.

## Regra de compatibilidade com NPCs

Um personagem curricular futuro usa o mesmo formato, incluindo `model`, `skin`, `hairStyle`, `hairColor`, `top`, `bottom`, `shoes` e `accessory`; o jogo registra separadamente `skills`, `aiProfile`, `difficulty`, `syllabusSource` e `rewards`.

## Pontos de validação pendentes

- Testar em navegadores Windows reais e Android reais.
- Revisar diferença de silhueta entre bases masculina e feminina.
- Produzir frames de andar, correr, abaixar, atacar, tomar dano, cair e vencer com sincronização de camadas.
- Integrar com motor Brush & Blade já selecionado e o protocolo de três rounds.
- Criar inventário e registro de recompensa cosmética de cada disciplina e habilidades por aprovação.
