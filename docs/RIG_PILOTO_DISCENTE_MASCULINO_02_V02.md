# ICEN Fighters — Piloto M02 / Etapa de sprites e idle v0.2

**Modelo:** Discente masculino, opção 2, folha anatômica já aprovada.  
**Escopo:** laboratório técnico independente. **Não substitui o personagem do jogo** e não interfere em saves, menu, combate ou progressão curricular.

## Entrega verificável

- `rig_idle_lab.html`: renderização Canvas; 12 poses temporais de respiração (*keyframes de deslocamento*, não 12 desenhos novos); pausar, espelhar, comparar referência, mostrar articulações, esconder peças, testar cores da camiseta, salvar captura.
- `assets/parts/*.png`: 15 peças visíveis em RGBA independente, alinhadas à mesma tela transparente de 182 × 320 px, sem suavização.
- `manifest.json`: nomes/posições de articulações e peças, z-order experimental, efeitos de respiração e mapeamento de tintas.
- `sprite_mask_clean.png`: figura base sem fundo; `guard_full_reference.png`: recorte completo com os dois pés, usado como origem do processo.
- `contact_sheet.png`: revisão de separação das camadas.
- `preview/`: capturas do teste em desktop/celular.
- `build_layers.py` / `build_manifest.py` / `build_html.py`: scripts reprodutíveis usados para a segmentação e montagem. Requerem Python, NumPy, Pillow, OpenCV e SciPy.

## Como executar

1. Abra `rig_idle_lab.html` em um navegador que permita imagens locais relativas; ou, preferencialmente, sirva a pasta em HTTP local e acesse a página.
2. Compare `VER REFERÊNCIA` ↔ `VER CAMADAS`.
3. Pause e avance pelo seletor de quadros. A pose não deve abrir lacunas grandes nem deslocar os pés.
4. Use `MOSTRAR PIVÔS` e `ESPELHAR` para inspeção.
5. Troque a cor da camiseta e observe o mesmo deslocamento do tecido e do torso.

## Critérios técnicos e limites

- **Conferido:** 15 arquivos PNG reais com canal alfa, um por região; união dos seus pixels recompõe exatamente a máscara do piloto no quadro neutro; 22 texturas carregadas no browser; duas resoluções (1366×768 e 390×844) sem rolagem lateral nem erros JavaScript; alternar camadas, espelhamento e cor funciona; pernas/pés estáticos ao longo dos 12 quadros.
- **Ainda NÃO concluído:** as partes foram segmentadas de uma ilustração originalmente composta, não redesenhadas com anatomia oculta. Há limitações em junções, contornos e textura; as roupas de cor alternativa são **overlays de cor**, não trajes independentes. Não há IK, simulação de tecido, movimentos grandes, nem arte retocada quadro a quadro.
- **Próximo marco:** reconstruir torso, pescoço, braços e juntas sobrepostas a partir de desenho próprio, criar camadas reais de camiseta/mangas e testar um `idle` de 8–12 quadros revisado visualmente. Só depois produzir `walk`, `jump`, `punch`, `kick` e reproduzir para os outros cinco corpos. Atributos não dependem do corpo.

## Estrutura

```text
idle_v02/
├── rig_idle_lab.html
├── manifest.json
├── sprite_mask_clean.png
├── guard_full_reference.png
├── contact_sheet.png
├── assets/parts/          # 15 regiões + 6 tintas de teste + underlay técnico
├── preview/               # capturas de teste
├── build_layers.py
├── build_manifest.py
└── build_html.py
```

**Observação:** esta v0.2 não é o sprite mestre final. Não usar como substituto no fluxo `Novo Jogo` antes de testes de todas as animações e da troca real de roupas.
