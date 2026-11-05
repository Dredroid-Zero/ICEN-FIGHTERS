# ICEN Fighters — Central do Discente v0.4

**Status:** interface funcional em protótipo; combate/tutorial/sprites definitivos pendentes. Data: 05/11/2026.

## Direção aprovada
- **Esquerda:** nome, curso e opções cosméticas.
- **Centro:** prévia do Discente sobre plataforma; a figura holográfica é arte de referência, **não** representa as opções selecionadas nem o sprite modular definitivo.
- **Direita:** sistema de build com hexágonos contíguos por arestas, núcleo central e seis vizinhos. A grade nasce bloqueada, aguardando o tutorial.
- **Quatro cursos visíveis:** apenas Matemática habilitada; Física, Biologia e Química indisponíveis nesta alfa.
- **Conteúdo curricular:** tutorial planejado em Iniciação ao Pensamento Científico; o jogo não implementa essa luta neste momento.

## Funcionalidades
- Novo Jogo abre a Central em vez da interface visual anterior, preservando a tela inicial oficial aprovada.
- Nickname 2–20 caracteres; seleção de modelo, oito tons de pele, três cabelos, seis cores de cabelo, três conjuntos de roupa e acessórios.
- Seleções vão para o **mesmo perfil** do salvamento local existente, com até cinco slots; a aparência ainda não aparece no manequim estático.
- Novo Jogo e Confirmar levam ao fluxo de criação e salvamento existente; conclusão tem interface coerente.
- Grade: visualiza 7 hexágonos unidos aresta a aresta; botões de **prévia de sinergia** e **prévia de expansão** com 19 células, sem desbloquear ou salvar técnicas.
- Uma habilidade/peça por hexágono; sinergias somente entre hexágonos que compartilham aresta.
- Uso futuro: novos núcleos e expansões por recompensas curriculares. **Custos, limites e receitas de bônus ainda não foram definidos**.

## Arquitetura
- `assets/creator/central_discente_aprovada.webp`: cenário/interior visual com plataforma aprovado, não um sprite animado.
- `assets/creator/mannequin_conceitual.webp`: recorte da figura da plataforma para celular.
- `assets/creator/logo_central.webp`: recorte do logotipo, usado no celular.
- `src/central_discente_v04.css`: design responsivo, navegação e animação hover.
- `src/build_hex_core.js`: funções puras de coordenadas axiais, adjacência por arestas, área da grade e verificação de receitas compatíveis.
- `src/central_discente_v04.js`: painel funcional, UI, integração com controles e salvamento pré-existentes.
- `index.html`: inclusão dos novos módulos, sem excluir o código existente de personalização.

## Testes locais
Em Chromium (HTML autossuficiente, com assets incorporados somente no teste), resoluções 1366×768, 1280×720, 1920×1080, 390×844 e 360×740 não exigiram rolagem da página. O nickname, seleção de modelo feminino, tom de pele, traje, expansão visual de 19 células e armazenamento do perfil foram testados. O teste de `localStorage` local foi feito com armazenamento simulado porque a navegação de arquivos locais foi bloqueada pelo navegador de testes. **Não considerar o GitHub Pages testado em hardware real.**

## Design futuro
A grade real só se tornará editável após o tutorial; conectar ao inventário de habilidades, arrastar para equipar, salvar combinações e computar sinergias específicas das disciplinas. Produzir rig mestre do Discente, roupa modular, cabelo e animações básicas e substituir manequim de referência pelo renderer.

## Integridade
A história literária está fora do projeto. O nome e a grade curricular da Matemática vêm do PPC, mas este documento é desenho de interface do jogo, não regra institucional.
