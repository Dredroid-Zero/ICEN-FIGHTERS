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


## Versão visual v0.7 — Campus das Auroras sem placa na fachada (05/11/2026)

Somente a placa retangular da UNILAB foi retirada do **fundo** do menu inicial e do criador do Discente, mantendo a linguagem visual aprovada e a interação existente. Novos arquivos, com nomes versionados para evitar cache: `assets/menu/menu_sem_placa_v07.webp` e `assets/creator/criador_fechado_sem_placa_v07.webp`. A ilustração `assets/creator/criador_aparencia_aberta_sem_placa_v07.webp` é uma **referência do painel aberto**, não um fundo fixo, porque os controles de Aparência são dinâmicos. O menu com animações e a colmeia com núcleo inicial bloqueado foram preservados. Testado localmente no Chromium em computador e celular; verificação em dispositivo físico ainda pendente. [Artes e testes no Drive](https://drive.google.com/drive/folders/1ti3r2jBmGVzeP-gw21oF5qx-wGNMbxe7).


## Central do Discente v0.8 — identidade visual e Voltar corrigido (05/11/2026)

Aparência deixou de parecer um seletor lateral: no quadro fechado há uma única seta **▲** e o botão **ABRIR PERSONALIZAÇÃO**. Quando aberto, o editor sobe dentro da moldura esquerda e usa a arte oficial aprovada do painel de Aparência (sem placa no prédio). O botão superior de Voltar foi eliminado; o **Voltar inferior** agora fecha o painel e desfaz alterações, enquanto o **Confirmar inferior** aplica o visual. Na ficha normal, Voltar retorna ao menu e Confirmar cria o perfil. Os botões internos Cancelar/Salvar continuam válidos, com aparência consistente. O Discente estático e a build bloqueada permanecem inalterados. Veja [documentação da v0.8](docs/CENTRAL_DISCENTE_V08.md) e [arquivos de teste no Drive](https://drive.google.com/drive/folders/10mCrbz0__yPZzDpzXtSb_oq15s7gwx4D).


## Central do Discente v0.9 — artes oficiais integradas (05/11/2026)

Foram aprovadas e publicadas **duas artes de criação do Discente**: ficha fechada e Aparência aberta, ambas coerentes com a identidade visual do menu e sem placa da UNILAB no fundo. A tela agora usa `assets/creator/central_discente_fechada_v09.webp` e `assets/creator/central_discente_aparencia_aberta_v09.webp`, sem criar uma nova moldura sobre os elementos. O botão de Aparência tem seta para cima e abre o conteúdo da moldura esquerda. Em Aparência, **Voltar** cancela e **Confirmar** salva; na ficha, Voltar retorna ao início e Confirmar cria o perfil. Também funcionam os botões internos Cancelar/Salvar. A build é exibida com **um único núcleo bloqueado**, já desenhado na arte, sem o painel provisório sobreposto.

**A plataforma e o manequim holográfico centrais continuam temporários**; quando houver o sprite mestre modular, a apresentação 2D e a plataforma deverão ser revistas em conjunto. O tutorial e a integração com a engine de combate ainda não estão prontos.

Arquivos: `src/central_discente_v09.js`, `src/central_discente_v09.css` e [documentação](docs/CENTRAL_DISCENTE_V09.md). [Materiais, testes e artes no Drive](https://drive.google.com/drive/folders/1s35nAbvI1VqKUBPSQmOEjAHWPzwDHvfA).
