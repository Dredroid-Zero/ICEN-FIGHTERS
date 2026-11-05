# ICEN Fighters — Central do Discente v0.6

**Estado:** implementada no repositório do jogo; versão de interface. O sprite mestre, tutorial, combate e habilidades editáveis permanecem em produção.

## Decisão visual

Ao selecionar **APARÊNCIA**, surge um **painel que sobe por dentro da moldura esquerda** do cenário aprovado, cobrindo apenas os controles de nome/curso/visuais. É um substituto do painel esquerdo, **não um modal**, não coloca fundo preto sobre a tela inteira e não esconde nem a plataforma/figura central nem a build hexagonal no painel direito.

A aparência continua dividida em quatro categorias: **Corpo e Pele**, **Cabelo**, **Roupas**, **Acessórios**. O painel mantém paleta azul profundo, bordas douradas, detalhes cianos e botões com reações de hover da interface aprovada.

O centro segue exibindo o **manequim de referência estático** da tela aprovada. Não houve criação de sprite mestre nesta versão; as opções escolhidas são registradas no perfil, mas ainda não atualizam um modelo de combate em tempo real.

## Fluxo e regras

- **Abrir Aparência**: transição vertical de baixo para cima, cobrindo a esquerda; primeira categoria Corpo e Pele.
- **Selecionar**: atualiza o estado interno do Discente via catálogo/salvamento já existente, sem criar estruturas paralelas.
- **Salvar**: aceita o visual atual e volta à Central.
- **Cancelar, Voltar ou Escape**: restaura o conjunto anterior e volta à Central.
- **Mobile retrato**: o painel substitui a região do perfil abaixo da arte, em vez de abrir uma janela sobre o jogo inteiro.
- **Acessibilidade**: os controles ocultos tornam-se inertes durante a edição, o foco entra no painel e retorna ao botão de origem ao fechá-lo. Preferência de movimento reduzido respeitada.
- **Build**: continua iniciando com **um núcleo bloqueado**. Expansão apenas mediante conquistas reais, não por botões de demonstração.

## Arquivos modificados

- `src/central_discente_v06.js` — lógica e conteúdo do painel deslizante.
- `src/central_discente_v06.css` — composição, interação e transição visual. É carregado depois do CSS da versão anterior para reaproveitar os controles já padronizados.
- `index.html` — substitui o JS v0.5 pelo v0.6 e adiciona a folha de estilo v0.6.
- `docs/CENTRAL_DISCENTE_V06.md` — este documento.

## Testes locais

Chromium em 1366×768, 1280×720, 1920×1080, 390×844 e 360×740: entrada em Novo Jogo, abertura do painel, enquadramento sem rolagem, núcleo único, ausência de erros de JS e transição funcionando. No desktop 1366×768: Cancelar reverte gênero, cor de pele e cabelo; Salvar preserva cabelo e modelo; o perfil foi gravado no sistema local com o curso Matemática e build bloqueada. Em desktop e mobile: navegação por categorias, seleção de cabelo/roupa/acessório e fechamento por Escape testados. Ainda é necessária validação no GitHub Pages e em hardware físico.

## Revisão futura

Substituir a silhueta estática central pelo sprite modular de qualidade; a prévia real deverá acompanhar toda alteração de pele, cabelo, roupa e acessórios, sem alterar o layout da Central aprovado.
