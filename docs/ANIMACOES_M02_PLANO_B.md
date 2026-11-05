# ICEN Fighters — Plano B: catálogo e protocolo de animação do Discente M02

Estado: **especificação de produção**. Não significa animações concluídas.

## Decisões preservadas
- Personagem piloto: Discente masculino, opção 2, mantendo a aparência e anatomia da ficha aprovada.
- **Sprites completos RGBA quadro a quadro**, sem recortes modulares de braços/pernas/cabelo/roupas durante o jogo.
- Habilidades/poderes, partículas, hitboxes e progressão acadêmica separados dos desenhos do personagem.
- Referência atual: `tools/rig_m02/fixed_v01/manifest.json`: guarda, soco, chute e salto são apenas **poses-chave**, sem inbetweens.
- Não substituir assets do menu, da Central do Discente, perfis salvos nem integrar ao combate até validação visual.

## Catálogo da base, por prioridade
| Ordem | ID | Movimento | Observação |
|---|---|---|---|
| 01 | idle_guard | Guarda / respiração | Loop obrigatório, pés fixos |
| 02 | walk_forward | Andar para frente | Deslocamento controlado pelo motor |
| 03 | walk_backward | Andar para trás | Passos coerentes, não apenas reversão de vídeo |
| 04 | jump_start | Impulso do salto | Não loop |
| 05 | jump_rise | Subida do salto | Pode manter pose durante fase aérea |
| 06 | jump_fall | Queda | Transição |
| 07 | jump_land | Aterrissagem | Retorno à guarda |
| 08 | crouch_enter | Entrar no agachamento | Transição |
| 09 | crouch_hold | Agachado | Loop ou pose estável |
| 10 | crouch_exit | Levantar | Transição |
| 11 | punch_stand | Soco parado | Antecipação, contato e recuperação |
| 12 | kick_stand | Chute parado | Antecipação, contato e recuperação |
| 13 | punch_air | Soco no salto | Movimento aéreo independente |
| 14 | kick_air | Chute no salto | Movimento aéreo independente |
| 15 | punch_crouch | Soco agachado | Preservar altura baixa |
| 16 | kick_crouch | Chute agachado | Preservar altura baixa |
| 17 | dash_forward | Avanço rápido | Motor define distância |
| 18 | dash_backward | Recuo rápido | Motor define distância |
| 19 | dash_punch | Soco com dash | Sincronizar ataque e avanço |
| 20 | dash_kick | Chute com dash | Sincronizar ataque e avanço |
| 21 | retreat_punch | Soco recuando | Ataque enquanto recua |
| 22 | advance_punch | Soco avançando | Variante sem dash |
| 23 | advance_kick | Chute avançando | Variante sem dash |
| 24 | retreat_kick | Chute recuando | Variante sem dash |
| 25 | block_high | Defesa em pé | Estado defensivo |
| 26 | block_low | Defesa agachada | Estado defensivo |
| 27 | hit_high | Receber golpe em pé | Reação |
| 28 | hit_low | Receber golpe baixo | Reação |
| 29 | hit_air | Receber golpe no ar | Reação |
| 30 | knockdown | Queda por golpe | Não loop |
| 31 | getup | Levantar após queda | Não loop |
| 32 | turn | Virar | Apenas se câmera/combate exigir |
| 33 | run | Correr | Opcional, distinta do dash |
| 34 | tired_idle | Guarda cansada | Estado |
| 35 | victory | Vitória | Não loop |
| 36 | defeat | Derrota | Não loop |

Combos (duplo soco; soco → chute) devem inicialmente ser **sequências de ataques já validados**, não sprites inventados antecipadamente.

## Protocolo visual de cada animação
1. Ficha com referência da pose inicial e final, vista lateral, silhueta, centro do personagem, linha do solo e região de segurança.
2. Desenhar **cada quadro completo** mantendo rosto, roupa, tênis e escala consistentes. Não gerar quadros por deslocamento automático de uma única PNG nem alternar poses-chave e chamar isso de animação.
3. Exportar PNG RGBA individual; nomes `000.png`, `001.png`, etc.; canvas fixo **620×620** no piloto até eventual decisão de resolução otimizada.
4. Metadados de duração por quadro; ponto de apoio no solo; deslocamento planejado pelo motor; janela de contato do golpe e cancelamentos permitidos.
5. Laboratório: reprodução em loop, um quadro por vez, ajuste de velocidade, onion skin, alternância entre fundo escuro/claro e opção de visualizar pivô/solo.
6. Revisar recortes, transparência, contorno, tremulação do volume, deslizamento de pés, alinhamento, primeira/última pose e continuidade entre estados.
7. Marcar `approved: true` somente depois de revisão visual e técnica. Até lá, usar `draft`.

## Primeiro lote — idle_guard (proposta, não implementado)
- 8 quadros originais, 8 FPS, ciclo inicial de 1 segundo, repetição contínua; ajustar após ver a fluidez.
- Guarda sem deslocamento horizontal. Pés presos à linha do chão; pequenas alterações no tórax, ombros e mãos pela respiração. Cabeça quase imóvel.
- Esboço: Q0 neutro; Q1-Q3 inspiração progressiva; Q4 pico suave; Q5-Q7 expiração e retorno exato à posição inicial. O ciclo Q7→Q0 deve ser contínuo.
- Sem hitbox de ataque e sem movimento da raiz.
- Critérios de aceite: nenhuma deformação anatômica, nenhuma oscilação perceptível de escala, nenhuma borda residual da extração, pés ancorados, loop suave em velocidade normal e reduzida.

## Contrato de entrega
Cada movimento terá pasta própria dentro do laboratório, `frames/` + `animation.json` + página de teste. Somente **depois** do idle aprovado iniciar caminhada, salto, agachamento e ataques simples; depois combinar ataques e deslocamentos.

**Importante:** o conjunto `fixed_v01` é referência histórica. Não declarar animações como concluídas e não alterar a Central do Discente ou os saves nesta fase.
