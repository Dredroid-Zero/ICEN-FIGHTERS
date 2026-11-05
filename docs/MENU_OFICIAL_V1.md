# ICEN Fighters — Menu principal oficial v1

**Aprovado em 05/11/2026.** Esta é a arte oficial escolhida para a tela de abertura do jogo.

- [PNG original no Google Drive](https://drive.google.com/file/d/1dOehVyEguQm4st5MElpLIHWzzAanO4EC/view)
- [Pasta oficial de arte e arquivos](https://drive.google.com/drive/folders/1CJtYc6mM3w1tXzVGhh_O1nAZWwiHmlzG)
- Arquivo de produção: `assets/menu/menu_principal_aprovado.webp` (1672 × 941 pixels).

## Conteúdo aprovado
Logo ICEN Fighters em posição central superior, referências às quatro áreas, campus UNILAB com serra e três antenas, sem bandeiras. Matemática à esquerda com números e gráficos senoidais no pulso; Biologia à esquerda com cetro de DNA sem folhas; Física à direita segurando uma maçã com aura delicada; Química à direita com frasco reagente, tom de pele mais escuro. Os quatro são **lutadores que personificam disciplinas**, não alunos comuns; o Discente personalizável será criado separadamente.

## Integração
A composição aparece como uma única imagem WebP na tela inicial; controles HTML transparentes e acessíveis ocupam as mesmas áreas dos botões desenhados. Novo Jogo encaminha ao criador do Discente existente; Continuar, Opções e Créditos seguem indisponíveis na alfa. Em retrato, a interface apresenta quatro controles maiores abaixo da arte. O layout foi conferido em um mock visual Chromium nas dimensões 1280×720, 1366×768, 1920×1080, 390×844 e 360×740, sem rolagem. Testar também no site publicado e no celular físico.

## Produção seguinte
Usar esta imagem como referência de composição do menu, sem tratá-la como atlas/sprites de combate. Separar arte em camadas e preparar a tela de criação do Discente, mantendo o projeto literário independente.

## Atualização de interface v1.2 — 05/11/2026

Os quatro botões da imagem oficial têm reação visual ao passar o mouse: ampliação leve (5,8%), brilho contextual dourado em Novo Jogo e azul nos demais, além de um reflexo rápido. Como os botões foram desenhados na própria arte, a implementação recorta a região correspondente **da mesma imagem** como pseudo-elemento do hotspot HTML, evitando aumentar só uma área invisível. O logo recebe um brilho ambiente pulsante, sem alterar o cenário aprovado.

Em telas de celular na orientação vertical, os botões maiores aumentam 3,5% e ganham brilho em hover/pressão; Continuar, Opções e Créditos continuam nativamente `disabled`, portanto não executam ações. A preferência de redução de movimento do sistema é respeitada. Nenhum sprite corporal foi modificado.

Foi validada maquete local em Chromium nas resoluções 1280×720, 1366×768, 1920×1080 e 390×844: zoom de Novo Jogo e Continuar verificado, sem rolagem. Fluxo completo da interface hospedada e testes em dispositivos físicos são conferências complementares. A alteração do jogo está somente em `src/splash.css`, com prévias na [pasta do Drive](https://drive.google.com/drive/folders/19sayb-x7dy2x8HEj7eFx_kjg9vhZ52s4).
