# ICEN Fighters

Jogo acadêmico de luta 2D — desenvolvimento experimental.

## Jogar no navegador

O jogo é publicado por **GitHub Pages**, a partir do arquivo `index.html` na raiz do repositório. Quando o Pages estiver habilitado, o endereço será:

https://dredroid-zero.github.io/ICEN-FIGHTERS/

Se o endereço ainda não abrir, no GitHub acesse **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**. Aguarde o status de publicação indicado pelo próprio GitHub.

## Versão atual — alfa 0.2

- Menu principal com **Novo Jogo**.
- Criação do Discente: nome, dois modelos, oito tons de pele, três penteados, seis cores de cabelo, três roupas e acessórios.
- Sprite de personagem composto por camadas separáveis; efeitos de habilidades devem permanecer independentes do corpo.
- Pré-visualização e gravação local de até cinco perfis.
- **Ainda não há combate, tutorial, matrícula ou continuação de campanha nesta versão.** Os outros botões do menu permanecem desabilitados.

A página de entrada `index.html` é uma versão autossuficiente para funcionar no GitHub Pages sem servidor ou dependências. Os **arquivos-fonte modulares já estão publicados** em `src/` (interface, dados e poderes separados) e `assets/` (cenário e 51 PNGs individuais para corpo, cabelo, roupas e acessórios). O `index.html` carrega esses arquivos diretamente.

## Organização e documentação

O projeto do **jogo** é independente da história literária que será reescrita futuramente. O jogo se inspira no PPC da Licenciatura em Matemática da UNILAB; personagens das disciplinas e suas evoluções serão introduzidos em etapas.

Documentação e arquivos de produção também estão organizados no [Google Drive do projeto](https://drive.google.com/drive/folders/1_jYXV5GXTgLbxHeAI94cY1FtEqT_Ywcy).

## Desenvolvimento futuro

Integrar sprites e habilidades desacoplados do personagem, testar desempenho e navegação em celular, desenvolver a interface de continuação e inventário, conectar o motor de combate, implementar três rounds e boletim acadêmico.

**Status:** protótipo navegável, não jogo final. © Autores dos recursos próprios do ICEN Fighters; respeitar licenças de componentes de terceiros.


## Redesenho em avaliação (não substitui o jogo)

Identificamos limitações de rolagem na interface v0.2 e de anatomia/animação nos sprites estáticos 80×112. Estamos testando um sistema de personagem mestre com rig compartilhado, cosméticos modulares e habilidades totalmente independentes.

- [Prévia navegável do novo menu v0.3](docs/menu-conceito-v03.html) — layout, cores e criação do Discente; sem alteração dos saves.
- [Pesquisa e proposta do menu v0.3](docs/PROPOSTA_REDESIGN_MENU_v03.md).
- [Arquitetura de rig mestre e skins](docs/PROPOSTA_RIG_MESTRE_E_SKINS_v01.md).
- [Plano de construção do ICEN Studio](docs/PROPOSTA_ICEN_STUDIO_FERRAMENTA_PERSONAGENS_v01.md).

O manequim da prévia é somente um marcador técnico, não o sprite final. **A página inicial atual permanece intacta até a aprovação visual.**


## Menu principal oficial aprovado — 05/11/2026

A tela inicial publicada usa a arte aprovada com os quatro lutadores de Matemática, Biologia, Física e Química no Campus das Auroras. O PNG original foi preservado no [Drive (arte oficial)](https://drive.google.com/drive/folders/1CJtYc6mM3w1tXzVGhh_O1nAZWwiHmlzG), e a versão WebP está em `assets/menu/menu_principal_aprovado.webp`.

**Novo Jogo** utiliza um botão HTML acessível posicionado sobre a arte, conectado ao criador do Discente já existente. Continuar, Opções e Créditos permanecem desabilitados. Em celular vertical, botões maiores ficam abaixo da imagem. Trata-se da arte oficial do menu, não de sprites de combate.

Consulte `docs/MENU_OFICIAL_V1.md`.


## Central do Discente v0.4 — interface aplicada (05/11/2026)

O botão **Novo Jogo** abre a Central com três áreas: **identidade/aparência à esquerda**, **manequim de referência no centro** e **build em favo de mel à direita**. Na criação, apenas o curso Matemática está disponível; nome, corpo, tons de pele, cabelo, roupa e acessórios são registrados no mesmo sistema de até cinco perfis locais. A grade começa bloqueada até o tutorial; há demonstrações visuais de sinergia e expansão (7 → 19 hexágonos) sem conceder habilidades. Os hexágonos compartilham arestas e a base axial está em `src/build_hex_core.js`.

A imagem central ainda é uma **referência artística estática**, não o sprite modular definitivo. A criação do perfil funciona, mas **tutorial e combate ainda não estão conectados ao fluxo desta tela**. [Arquivos no Drive](https://drive.google.com/drive/folders/13D7IaJlN_P6E7myEktQ6Ol0AgL4H1ATL) e detalhes em `docs/CENTRAL_DISCENTE_V04.md`.


## Central do Discente v0.5 (05/11/2026) — tela ativa

A versão v0.5 substitui **visualmente** a Central v0.4. A **arte aprovada** é exibida sem a sobreposição da interface genérica. Aparência abre uma janela maior com modelo corporal, tons de pele, cabelos, roupas e acessórios, com Cancelar/Salvar. No menu, só Matemática está disponível. A construção de habilidades inicia com **um único núcleo bloqueado** até o tutorial, e o favo cresce por desbloqueios registrados (células adjacentes por aresta). O código do motor está em `src/build_hex_core_v05.js`, e a interface em `src/central_discente_v05.js` e `src/central_discente_v05.css`. O progresso inicial da build é gravado como bloqueado no perfil; não existe botão para expandi-lo antes do tutorial. Ainda não há sprite mestre definitivo ou tutorial funcional.

Documentação e capturas: [Central v0.5 no Drive](https://drive.google.com/drive/folders/1ke8n1Hp1UEN4O6WgKwNyx86CJ2RPu5zN) e [docs/CENTRAL_DISCENTE_V05.md](docs/CENTRAL_DISCENTE_V05.md).


## Central do Discente v0.6 — personalização na própria moldura (05/11/2026)

O botão **Aparência** abre um painel **deslizante para cima dentro da moldura esquerda**, substituindo os controles de nome/curso, sem cobrir o Discente central nem a build hexagonal à direita. Categorias: Corpo e Pele, Cabelo, Roupas, Acessórios. **Salvar** aplica as escolhas; **Cancelar**, Voltar ou Escape restauram o visual anterior. No celular, o editor ocupa a área do perfil abaixo da arte, sem janela de fundo escuro.

Arquivos ativos: `src/central_discente_v06.js` e `src/central_discente_v06.css` (carregado após o CSS da v0.5). Motor de build progressiva e sistema de cinco saves preservados; a figura central permanece apenas uma referência estática até o sprite mestre estar pronto. [Documentação](docs/CENTRAL_DISCENTE_V06.md) · [Pasta de código e capturas no Drive](https://drive.google.com/drive/folders/16hvU_yiWEPwasQtk3hRvHtUpH5A4GQee).
