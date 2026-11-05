# PROPOSTA — ICEN Studio: catálogo e ferramenta interna de criação de personagens

**Status:** planejamento de ferramenta, ainda não implementada.

## Finalidade

Evitar criar cada estudante/disciplinar manualmente do zero. O editor será um ambiente privado de produção para compor personagens sobre a biblioteca de animações do boneco mestre, anexar poderes transferíveis e gerar um pacote que o ICEN Fighters possa usar.

## Tela de trabalho proposta

1. **Catálogo:** lista de IDs de disciplinas, seminários, evoluções, modelos e status (em conceito / rig / sprites / revisão / liberado).
2. **Corpo e pele:** selecionar perfil corporal compatível com o mesmo rig, paleta de tons e detalhes do rosto.
3. **Traje e acessórios:** vestir peças por slots (tronco, pernas, pés, cabelo traseiro/frontal, cabeça, rosto, mãos). Peças podem ser salvas como recompensas do Discente.
4. **Animações:** biblioteca universal de movimentos, timeline, visualizador de frente/costas se necessário, grade de frames e alternância visual para checar clipping e oclusão.
5. **Combate:** hitbox/hurtbox/âncoras por evento da animação; teste de colisão não exige sprite especial.
6. **Poderes:** escolher id de habilidade, gesto genérico/override, ponto de origem, VFX separado e eventos de ataque; testar mesmo poder no Discente e em um NPC.
7. **Exportação:** JSON de configuração + PNGs por atlas/camada/clip + arquivo de auditoria + miniatura de seleção.

## Regra de produção

Arte detalhada continua exigindo desenho, rigging e revisão. O editor NÃO cria automaticamente personagens artísticos perfeitos a partir de uma só imagem; ele automatiza o encaixe, a composição, a validação de compatibilidade e a exportação.

## Estrutura de dados proposta

characterId, disciplineId, rigProfile, rigVersion, palettes, parts, cosmeticsUnlocks, animationOverrides, skills, aiProfile, frameEvents, rewards, provenancePPC.

## Plano de desenvolvimento

**Fase A — Validador:** importar o primeiro rig/atlas e verificar que todas as camadas possuem os frames necessários; mostrar pose, frame e contornos de colisão.

**Fase B — Editor visual:** seletor de corpo, pele, cabelo, roupas e acessórios, tela de animação sincronizada; exporta o manifest do Discente ou adversário.

**Fase C — Biblioteca de habilidades:** ligar movimentos e efeitos externos, testar dois personagens com o mesmo poder sem converter seus sprites.

**Fase D — Catálogo completo:** conectores para PPC, séries evolutivas e recompensas; testes visuais de regressão por skin e animação.

## Testes obrigatórios

- Trocar cabelo, jaleco e calça em idle, walk, jump, punch e kick sem juntas abertas.
- Trocar skin enquanto animação está em execução sem reset visual nem teleport do corpo.
- Reutilizar uma habilidade de disciplina com o Discente e o NPC.
- Prevenir carregamento de peça com rigVersion incompatível e mostrar erro explícito.
- Exportar duas vezes o mesmo perfil sem produzir arquivos divergentes.
- Gerar miniatura e registrar a origem acadêmica da disciplina sem depender da história literária.

## Dependência

Produzir e aprovar um rig mestre de qualidade com as cinco animações do piloto ANTES de desenvolver todos os recursos do editor. Isso reduz o risco de construir uma ferramenta sobre um padrão gráfico errado.

Documentos relacionados:
- docs/PROPOSTA_RIG_MESTRE_E_SKINS_v01.md
- docs/PROPOSTA_REDESIGN_MENU_v03.md
- docs/menu-conceito-v03.html
