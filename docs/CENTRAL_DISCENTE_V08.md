# ICEN Fighters — Central do Discente v0.8

## Correção de UX
- O botão de **Aparência** na tela fechada agora possui indicação visual **▲ para cima** (não duas setas laterais), preservando o acabamento azul-dourado do jogo. A correção é feita com pseudo-elementos CSS sobre o seletor impresso na arte aprovada.
- Ao abrir, a interface usa **somente a região esquerda** da arte oficial `criador_aparencia_aberta_sem_placa_v07.webp`, mantendo o campus e o Discente central e o painel da build exatamente como estão. Os botões, abas e swatches são elementos HTML reais sobre esse fundo, com estados selecionados dinâmicos; não são apenas imagem.
- O cabeçalho da arte já diz **APARÊNCIA**. O botão secundário superior **Voltar** foi suprimido, para que haja **um único comando Voltar na parte inferior**.
- A seta de Voltar inferior funciona em dois contextos: dentro do editor ela fecha a aparência e **desfaz** as alterações não salvas; na tela normal ela retorna ao menu principal.
- O botão dourado inferior **Confirmar** também é contextual: dentro do editor **salva as escolhas e retorna à ficha**; na ficha normal cria o perfil.
- Permanecem os botões internos **Cancelar / Salvar** para oferecer ações próximas às opções.
- Quatro categorias mantidas: Corpo e Pele, Cabelo, Roupas, Acessórios.
- O centro permanece com o **manequim estático** (sprite mestre ainda pendente), e o favo mantém **núcleo único bloqueado** até o tutorial; não concede progresso artificial.

## Arquivos
- `src/central_discente_v08.js` substitui `src/central_discente_v06.js` como módulo ativo e utiliza duas imagens existentes no repositório: `assets/creator/criador_fechado_sem_placa_v07.webp` e `assets/creator/criador_aparencia_aberta_sem_placa_v07.webp`.
- `src/central_discente_v08.css` carrega após as folhas de estilo v05/v06 e harmoniza o editor e o seletor de aparência com os dois estados da arte aprovada.
- Nenhuma modificação do menu inicial, sprites, catálogo, notas, créditos ou salvamentos.

## Testes locais (Chromium)
- Resoluções 1366×768, 1920×1080, 1280×720, 390×844 e 360×740: sem rolagem global e sem erros de JS no fluxo de abertura e retorno.
- Em desktop e celular: seleção de penteado, **Voltar** desfaz alteração; **Confirmar** preserva escolha ao fechar editor e só cria perfil quando acionado na ficha; depois, confirmação cria perfil corretamente no sistema já existente.
- Confirmação visual nos arquivos `preview/`.
- Teste real em GitHub Pages/dispositivo físico deve ser conferido após a publicação.
