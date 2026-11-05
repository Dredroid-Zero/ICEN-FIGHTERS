# ICEN Fighters — M02, v0.4 | Piloto de desenho original modular

**Estado: EXPERIMENTAL, avaliação visual pendente. NÃO integrado ao jogo.**

## O que foi produzido

- `source/generate.py`: gerador da **arte original** (geometria vetorial paramétrica desenhada por peça); não recorta a ilustração anterior.
- `assets/*.png`: 16 spritesheets RGBA transparentes independentes de 182×320 por quadro, 32 quadros por camada (12 `idle`, 8 `punch_light`, 12 `kick_light`). Existem 3 atlas extras para camiseta e mangas azuis (**19 atlas** ao todo).
- `lab.html`: laboratório HTML Canvas com guarda, soco, chute, troca de camiseta, remoção de camiseta/short/calçados/cabelo, quadro a quadro, espelhamento e captura PNG.
- `manifest.json`: contrato de ordem de desenho, quadros, fontes e variantes. Não liga poderes ao sprite.
- `previews/`: comparativos de poses e de peças.

## Como abrir

Na pasta do pacote: `python -m http.server 8765` e depois `http://localhost:8765/lab.html`.
Ou usar a versão publicada em `tools/rig_m02/v04/lab.html` dentro do GitHub Pages do ICEN Fighters.

## Verificações mínimas

1. Na guarda, trocar `Camiseta clara → azul` e verificar que pele, short e calçados não mudam.
2. Ocultar a camiseta: ombros, braços e torso continuam desenhados; ocultar shorts e calçados e examinar as partes sob eles.
3. Em **soco** e **chute**, testar frames 1 a 8/12 pausado, inclusive no sentido espelhado. Repetir com camiseta azul.
4. Aprovar o módulo **somente** se aspecto, anatomia, encaixes e animações estiverem bons no jogo. O validador de arquivos não substitui a avaliação estética.

## Limitações que permanecem

- O desenho do piloto é **vetorial estilizado rasterizado**, não é o acabamento *pixel art detalhado* aprovado na folha de seis corpos. É uma verificação do pipeline de camadas/pose, **não o sprite master definitivo**.
- Ombros, braços, curvas da musculatura, rosto, mãos e dinâmica dos golpes **ainda precisam de refinamento artístico**. Quadro a quadro poderá ser acrescentado para poses fortes.
- Não há cabelo alternativo nem geometria de segunda roupa; a camiseta azul é um conjunto de 3 sprites separados com a mesma silhueta, não um traje de formato diferente.
- `punch_light`/`kick_light` demonstram deslocamento de articulações, mas hitboxes e mecânica de dano não foram implementadas neste laboratório.
- Não existe integração com os 6 corpos, com a tela de criação ou com o combate. Plano B (4 a 8 lutadores prontos) continua disponível.
