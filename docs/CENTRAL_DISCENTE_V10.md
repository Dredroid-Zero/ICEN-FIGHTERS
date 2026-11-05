# ICEN Fighters — Correção visual da Aparência v0.10 (05/11/2026)

## Problema reproduzido
A interface v0.9 exibia os botões de categoria, as legendas e os itens de aparência **duas vezes**. A arte aprovada de Aparência aberta tem os controles impressos na imagem; o jogo sobrepunha os controles HTML numa camada com `background:transparent`. A captura do usuário mostrou os textos repetidos, abas desalinhadas e painel de opções parcialmente sobre os elementos ilustrados.

## Correção
- A estrutura aprovada — painel esquerdo, Discente central, build à direita, logo, céu/campus sem placa — não foi redesenhada.
- O conteúdo editável da Aparência recebeu um **único painel interno opaco**, com a mesma paleta azul profundo, bordas cianas, destaques dourados e pequenos ornamentos. O painel encobre **por completo** os controles impressos na parte interna da arte, evitando duplicação.
- Os botões reais (Corpo e Pele, Cabelo, Roupas, Acessórios, cores e opções, Cancelar e Salvar) permanecem interativos, destacados somente pela seleção atual.
- O botão Aparência na tela fechada usa a própria arte e recebe um hover contido no seu recorte, sem máscara retangular destoante.
- O botão inferior Voltar na aparência desfaz alterações e retorna à ficha; Confirmar na aparência salva as mudanças. Na ficha, Voltar retorna ao menu e Confirmar cria o perfil.
- A plataforma, manequim e build inicial continuam provisórios/bloqueados, sem conceder poderes.

## Implementação
Arquivo novo: `src/central_discente_v10.css` carregado **após** `src/central_discente_v09.css`, sem alterar o sistema de perfis, saves, catálogo e motor de build. A nova folha é uma correção visual incremental para manter fácil reverter a alteração.

## Testes
Playwright/Chromium local nas resoluções 1366x768, 1280x720, 1920x1080, 390x844 e 360x740. Em todas: abertura de Aparência, seleção de aba Cabelo, Voltar restaura o penteado original, Confirmar aplica o penteado escolhido, Confirmar na ficha cria perfil, ausência de exceções JavaScript e sem rolagem global. Conferência visual da tela aberta em desktop e mobile por capturas.

**Pendência:** conferir a publicação do GitHub Pages após commit, pois a implantação v0.9 sofreu timeout na etapa `deploy-pages` (build realizada com sucesso); isso é independente do bug de sobreposição, que foi reproduzido localmente.
