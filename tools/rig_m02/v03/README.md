# ICEN Fighters — contrato de assets modular v0.3

A v0.2 do laboratório mostrou cortes/colorações incorretas em peças recortadas de uma figura composta. Este diretório contém **somente um manifesto-modelo e um verificador técnico**; não é outro boneco substituto, nem promete resolver automaticamente os cortes.

## Uso

1. Desenhar em um arquivo editável de camadas original (não a partir da máscara v0.2).
2. Exportar PNG RGBA para cada peça e PNG `mask` (alfa da peça; máscara branca em regiões presentes, transparente fora) **com a mesma tela inteira**. Variantes de roupa devem ter os próprios arquivos de peça.
3. Copiar `asset_contract.template.json` para `asset_contract.json`, substituir `EDIT_ME` pelos caminhos reais e rever pivôs.
4. Instalar `Pillow` (`python -m pip install Pillow`) e executar `python validate_assets.py asset_contract.json`.
5. Depois do teste automático, fazer **inspeção visual em movimento** em três ações, para conferir juntas, profundidade e recortes. O validador não faz essa aprovação.

O documento [de decisão e plano alternativo](../../../docs/SPRITE_MESTRE_M02_DECISAO_V03.md) está em `docs/SPRITE_MESTRE_M02_DECISAO_V03.md` na raiz do repositório. O piloto M02 v0.2 continua registrado, mas não deve ser usado como fonte das novas peças.

Referências: [Spine Skins](https://esotericsoftware.com/spine-skins) · [Unity Sprite Swap](https://docs.unity.cn/Packages/com.unity.2d.animation@9.0/manual/SpriteSwapIntro.html).

## Plano alternativo sem refazer a lógica do jogo

`fighter_visual_contract.template.json` descreve a mesma interface de combate para `modular_rig` e `fixed_spritesheet`. O segundo modo é só uma **reserva**, não foi ativado. A decisão sobre quatro ou oito lutadores iniciais e sobre desbloquear personagens das disciplinas será tomada após a tentativa modular real. Os poderes permanecem externos aos sprites de qualquer modo.

## Testes automatizados

Execute `python -m unittest -v test_validator.py`. Os três testes usam imagens sintéticas efêmeras (não são arte aprovada) e verificam que um pacote coerente é aceito, que uma peça com alfa fora da máscara é rejeitada e que uma recoloração com contorno diferente é rejeitada.
