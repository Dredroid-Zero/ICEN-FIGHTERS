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
