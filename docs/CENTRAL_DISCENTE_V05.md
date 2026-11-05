# ICEN Fighters — Central do Discente v0.5

Arte oficial: `assets/creator/central_discente_final_aprovada.webp` (imagem 1672×941 aprovada no projeto), com layout de jogo de luta em azul, dourado e campus UNILAB. A arte original PNG é preservada no Drive, e fica intacta no GitHub.

**Novo Jogo** abre a Central: esquerda para nickname/curso/aparência; centro para o manequim conceitual até o sprite mestre; direita para build hexagonal. A aparência não é mais uma aba minúscula: abre um **modal próprio** com corpo (masculino/feminino), oito tons de pele, três penteados, seis cores de cabelo, três roupas e acessórios. Cancelar reverte escolhas, salvar mantém escolhas no perfil, como na engine de save já existente. Somente Matemática está habilitada.

**Progressão da build:** o favo aparece com um hexágono central bloqueado até a conclusão do tutorial de Iniciação ao Pensamento Científico (ainda não implementado). O motor novo `src/build_hex_core_v05.js` expõe `blank`, `unlockCore`, `addCell`, `addCore`, `visible`, `adjacent` e `combos` com coordenadas axiais. Células são acrescentadas apenas se compartilharem uma aresta; núcleos adicionais requerem célula desbloqueada. Nenhuma UI concede habilidades ou expande a build antes do progresso real. A Central disponibiliza `window.ICENDiscenteCentral.renderBuild(build)` para integração futura com o tutorial e o inventário.

**Limites da versão:** a figura holográfica do centro é parte da arte fixa; a roupa, pele e penteado escolhidos não modificam essa figura até o sprite mestre ser produzido. O tutorial, o combate, a matrícula e o inventorário editável das habilidades continuam pendentes. Os botões desenhados na arte são acionados por regiões HTML alinhadas; em retrato há interface compacta específica. A grade pré-impressa no painel direito é coberta por um fundo sólido desenhado por CSS para que só os hexágonos realmente desbloqueados fiquem visíveis.

**Teste requerido:** navegação visual em desktop 1366×768 e celular 390×844, abrir/cancelar/aplicar aparência, validação de nome e criação de perfil, colmeia com 1/7/19 células via motor, sem liberar habilidades indevidamente. Preservar a tela inicial aprovada e o motor de salvamento da v0.2.

## Verificação local executada

- Interface sem rolagem e sem erros JavaScript em 1366×768, 1920×1080 e 390×844 (Chromium, HTML de teste com recursos incorporados).
- Modal abre, cancela revertendo modelo/cor/cabelo, reaplica e fecha salvando o novo visual.
- Nickname e cosméticos são gravados no mesmo sistema de cinco saves; novo perfil inclui `course: 'matematica'` e `build: ICENHexGrid.blank()`.
- Núcleo bloqueado apresentado como célula única. O motor passa por 1 → 7 → 19 células conforme `unlockCore`/`addCell`, rejeitando célula sem aresta adjacente. **Essas expansões foram testadas no motor, não concedidas na criação.**
- Código testado localmente; validar também o GitHub Pages após deploy e em celular físico.
