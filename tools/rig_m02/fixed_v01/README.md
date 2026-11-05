# ICEN Fighters — Discente Masculino Opção 2, quadro completo v0.1

**Status: laboratório de poses-chave. Não é uma spritesheet definitiva nem uma animação pronta.**

O usuário rejeitou os protótipos com peças modulares (v0.2/v0.4), devido à qualidade visual e deformações. O Plano B utiliza personagens inteiros por quadro, com poderes produzidos de forma separada. Começamos usando a **arte conceitual aprovada** do Discente M02 como origem, para preservar sua aparência e comparar escala/qualidade.

## O que existe

- `assets/guard.png`, `punch.png`, `kick.png`, `jump.png`: 4 poses-chave **inteiras** RGBA (620 × 620 px), com alinhamento aproximado de ponto de referência.
- `assets/m02_four_keyposes_atlas.png`: atlas 4 × 1 das quatro poses; **não** corresponde a uma animação de quatro quadros.
- `lab.html`: laboratório interativo, incluindo botões, espelhamento, grade, captura e transição simples entre poses.
- `source/extract_keyposes.py`: script de extração do personagem **inteiro** a partir da folha conceitual achatada; é um método exclusivo de reaproveitar as quatro poses-chave, não um método para gerar os quadros intermediários.
- `manifest.json`: dados explícitos sobre a origem e limitações.

## Pendências para produção

1. Revisar manualmente as bordas e o contorno dos quatro sprites, principalmente os pés.
2. Congelar o padrão de escala e posição em arena.
3. **Desenhar**, quadro a quadro, os intermediários de guarda, soco e chute com consistência anatômica (não criar movimento por recorte de membros nem interpolação de imagem inteira).
4. Revisar contato dos pés, antecipação e recuperação; criar hitboxes/hurtboxes independentes.
5. Só após aprovação integrar ao criador de personagens, mantendo o menu e saves intactos.

## Como testar

Abra `lab.html` num servidor estático local ou no GitHub Pages na pasta do laboratório. Os comandos 1–4 mostram as poses completas. O botão *Testar sequência* apenas alterna poses, sem interpolação. Não interpretar como animação pronta.

**Atenção:** a tentativa v0.1 é tecnicamente diferente dos protótipos modulares: a transparência foi extraída do personagem **inteiro** e não de peças corporais separadas. No Plano B, os próximos frames serão desenhos completos originais.
