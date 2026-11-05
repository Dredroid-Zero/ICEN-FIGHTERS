# PROPOSTA v0.3 — Redesenho do menu e do criador de personagem

**Estado:** proposta de interface para avaliação. **Não altera o index.html atual.**  
**Escopo:** exclusivamente o jogo ICEN Fighters, sem personagens ou enredo da história literária.

## 1. Motivos do redesenho

Auditoria em 05/11/2026 na branch main:
- src/style.css usa altura mínima 620px nos painéis do criador, além de cabeçalho, título, margens e paddings; o resultado não cabe em alguns viewports sem rolagem.
- O menu usa título enorme (até 174px), quatro botões altos e muito conteúdo secundário.
- A paleta violeta/rosa da v0.2 não apresenta uma identidade coerente com o campus, com o combate ou com o novo padrão visual.
- O renderer atual usa PNGs estáticos 80×112 com leve deslocamento vertical. Não é um rig de animação completo; redesenhar o CSS não resolve os sprites.

## 2. Referências estudadas

| Referência | Ideia que vamos aproveitar | Limitação |
|---|---|---|
| Terraria | Escolhas agrupadas por categoria e prévia constante, sem esconder a personalização | Não imitar seus sprites ou código |
| Stardew Valley | Nome, aparência, cabelo, roupa e acessórios como escolhas independentes | Interfaces mais tranquilas do que um jogo de luta |
| Smack Studio | Template de lutador e biblioteca reaproveitável de movimentos | Não assumir que seu editor é parte da engine do ICEN |
| PixelOver | Bone rig, IK e exportação de sprites de pixel art | Ferramenta de produção externa; avaliar licença/custo |
| Spine | Skins/attachments reutilizando animações do mesmo esqueleto | Ferramenta comercial; conceito pode ser implementado sem ela |
| Godot Cutout / Skeleton2D | Hierarquia de ossos, animações e troca de elementos | Migrar a engine web não é meta desta etapa |
| Aseprite | Exportação de camadas, quadros e tags de animação | Precisa de coordenação por quadro para todos os equipamentos |

Fontes:
- https://terraria.wiki.gg/wiki/Characters
- https://pt.stardewvalleywiki.com/O_jogador
- https://smackstudio.com/characters/
- https://docs.pixelover.io/tutorials/bones_animation/
- https://us.esotericsoftware.com/spine-skins
- https://docs.godotengine.org/en/stable/tutorials/animation/cutout_animation.html
- https://www.aseprite.org/docs/sprite-sheet/

## 3. Linguagem visual proposta

- Paleta: azul noturno #091522 e #102638; turquesa #52D3BB; dourado #E6B757; branco quente #F3F1E7.
- Campus das Auroras como fundo estilizado e escurecido para permitir leitura.
- Botões retangulares compactos, grade clara, bordas sutis. Sem poluição de chips, luzes ou texto secundário.
- Letras de título fortes, títulos funcionais moderados.
- Contraste legível e navegação por teclado; não depender apenas de cor.

## 4. Regra de tela

A página normal deve caber integralmente, sem rolagem, em 1280×720, 1366×768 e 1920×1080.  
Para smartphones em orientação vertical, comprimir o layout e exibir um bloco por etapa, com a prévia em posição superior. Em telas excepcionalmente pequenas, a prioridade é manter botões alcançáveis, sem cortar controles ou texto; uma alternativa por etapa é preferível a esconder dados importantes.

Layout do MENU:
- cabeçalho compacto (marca + versão);
- esquerda: marca ICEN Fighters, título Jornada da Graduação e frase curta;
- direita: Novo Jogo (ativo); Continuar, Opções, Créditos (visíveis, mas claramente desabilitados na alfa);
- rodapé discreto com versão e campus.

Layout do CRIADOR:
- cabeçalho compacto com Voltar;
- controles agrupados em três etapas: 1 Identidade (nome, modelo corporal, pele); 2 Cabelo (penteado e cor); 3 Roupas (conjunto e acessório);
- prévia permanente do futuro personagem;
- sem efeitos de poderes aplicados à arte de roupas, nem sprites do jogo antigo;
- nesta proposta, usar apenas silhueta técnica identificada, NÃO um personagem artístico aprovado.

## 5. Teste do conceito separado

Existe uma prévia HTML independente, chamada "menu-conceito-v03.html", que **não grava saves e não substitui a página inicial em produção**.  
A estrutura foi verificada em Chromium por inspeção de layout em 1280×720, 1366×768, 1920×1080, 390×844 e 360×740: nenhuma dimensão estendeu o documento além do viewport. Foram testadas também as três abas do criador nas mesmas dimensões quanto à altura da área de controles. A renderização completa hospedada no GitHub Pages e a experiência em hardware real ainda exigem validação.

## 6. Critérios antes de substituir a interface pública

- [ ] Aprovar a direção de cores e estilo do menu.
- [ ] Verificar legibilidade e ausência de rolagem em resolução 1366×768 real.
- [ ] Verificar navegação por teclado e leitura das escolhas.
- [ ] Validar o layout no celular físico em retrato e paisagem.
- [ ] Receber o padrão visual definitivo do novo Discente (produção separada).
- [ ] Manter a versão atual disponível para reversão.
