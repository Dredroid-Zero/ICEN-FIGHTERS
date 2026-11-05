#!/usr/bin/env python3
"""ICEN Fighters M02 v0.3: valida contrato técnico de peças originais.

Não analisa estética, qualidade anatômica, animações ou alinhamento visual.

Uso: python validate_assets.py [arquivo_manifesto.json]
Requer Pillow.
"""
from __future__ import annotations
import json
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("ERRO: Pillow não instalado. Execute: python -m pip install Pillow", file=sys.stderr)
    raise SystemExit(2)

KNOWN_CATEGORIES = {"body", "top", "bottom", "shoes", "hair", "accessory"}
REQUIRED = {"body", "top", "sleeve_L", "sleeve_R", "bottom", "short_leg_L", "short_leg_R", "shoe_L", "shoe_R", "hair_back", "hair_front"}


def validate_manifest(file_path: Path):
    issues: list[str] = []
    def err(msg): issues.append(msg)
    if not file_path.exists():
        return [f"Manifesto não encontrado: {file_path}"]
    try:
        data = json.loads(file_path.read_text(encoding="utf-8"))
    except (ValueError, OSError) as e:
        return [f"Manifesto não pôde ser lido: {e}"]
    if data.get("format") != "icen.sprite-parts.v0.3":
        err("formato esperado: icen.sprite-parts.v0.3")
    if data.get("status") == "TEMPLATE_NOT_PRODUCTION_ASSETS":
        err("arquivo de exemplo ainda não é um pacote de assets de produção")
    size = data.get("workingCanvas")
    if not (isinstance(size, list) and len(size) == 2 and all(isinstance(i,int) and i>0 for i in size)):
        err("workingCanvas precisa ser [largura,altura] em pixels inteiros positivos")
        size = None
    source = data.get("spriteSources", {}).get("layeredMaster", "")
    if not source or "EDIT_ME" in source:
        err("arquivo-fonte editável ainda não indicado em spriteSources.layeredMaster")
    elif not (file_path.parent / source).is_file():
        err(f"fonte editável não encontrada: {source}")
    parts = data.get("parts", [])
    if not isinstance(parts, list):
        return ["parts precisa ser uma lista"]
    ids = [p.get("id") for p in parts if isinstance(p,dict)]
    if len(set(ids)) != len(ids): err("IDs duplicados nas peças")
    for id_ in sorted(REQUIRED - set(ids)):
        err(f"falta peça obrigatória: {id_}")
    alpha_cache = {}
    import PIL.ImageChops
    for item in parts:
        if not isinstance(item,dict):
            err("item de parts não é objeto");continue
        ident = item.get("id", "(sem id)")
        if item.get("category") not in KNOWN_CATEGORIES:
            err(f"{ident}: category inválida")
        pv = item.get("pivot")
        if not isinstance(pv,list) or len(pv)!=2 or not all(isinstance(v,(int,float)) for v in pv):
            err(f"{ident}: pivot inválido")
        elif size and not(0<=pv[0]<size[0] and 0<=pv[1]<size[1]):
            err(f"{ident}: pivot fora da tela")
        if not isinstance(item.get("zIndex"),int): err(f"{ident}: zIndex ausente ou não inteiro")
        masks = {}
        for attr in ("image","mask"):
            name = item.get(attr)
            if not isinstance(name,str) or "EDIT_ME" in name:
                err(f"{ident}: caminho {attr} não preenchido");continue
            p = file_path.parent / name
            if not p.is_file():
                err(f"{ident}: {attr} não encontrado: {name}");continue
            try:
                with Image.open(p) as opened:
                    if size and list(opened.size) != size:
                        err(f"{ident}: {attr} tem tamanho {opened.size}, esperado {size}")
                    if opened.mode != "RGBA":
                        err(f"{ident}: {attr} deve ser RGBA transparente (atual {opened.mode})")
                    masks[attr] = opened.convert("RGBA").getchannel("A")
            except (OSError,ValueError) as e:
                err(f"{ident}: {attr} PNG ilegível: {e}")
        if "image" in masks and "mask" in masks and masks["image"].size == masks["mask"].size:
            a,b = masks["image"],masks["mask"]
            if not a.getbbox(): err(f"{ident}: peça inteiramente transparente")
            excess = PIL.ImageChops.subtract(a,b)
            if excess.getbbox(): err(f"{ident}: pixels fora da própria máscara; risco de contaminação")
            alpha_cache[ident] = a
    swap = data.get("colorSwaps", {}).get("blueTop", {})
    if set(swap.get("allowedPartIds", [])) != {"top", "sleeve_L", "sleeve_R"}:
        err("blueTop deve afetar exclusivamente top, sleeve_L, sleeve_R")
    if {"body", "bottom", "short_leg_L", "short_leg_R", "shoe_L", "shoe_R"} - set(swap.get("mustNotChange",[])):
        err("blueTop.mustNotChange precisa proteger corpo, short e calçado")
    alternates = swap.get("alternateImagePaths", {})
    if set(alternates) != {"top", "sleeve_L", "sleeve_R"}:
        err("blueTop.alternateImagePaths precisa ter top, sleeve_L e sleeve_R")
    for name, location in alternates.items():
        if not isinstance(location, str) or "EDIT_ME" in location:
            err(f"blueTop: textura alternativa não definida para {name}")
            continue
        path = file_path.parent / location
        if not path.is_file():
            err(f"blueTop: textura alternativa ausente para {name}: {location}")
            continue
        try:
            with Image.open(path) as opened:
                if opened.mode != "RGBA" or (size and list(opened.size) != size):
                    err(f"blueTop: resolução ou canal alfa inválido para {name}")
                elif name in alpha_cache:
                    alt_alpha = opened.getchannel("A")
                    if PIL.ImageChops.difference(alt_alpha, alpha_cache[name]).getbbox():
                        err(f"blueTop: a alternativa {name} altera a silhueta; recoloração exige mesmo alfa")
        except (OSError, ValueError) as exc:
            err(f"blueTop: imagem alternativa ilegível para {name}: {exc}")
    if set(data.get("animationsToValidate",[])) != {"idle", "punch_light", "kick_light"}:
        err("falta escopo mínimo de animações: idle, punch_light, kick_light")
    return issues


def main():
    path=Path(sys.argv[1] if len(sys.argv)>1 else "asset_contract.json")
    issues=validate_manifest(path)
    if issues:
        print(f"REPROVADO — {len(issues)} pendência(s) para {path}:")
        for issue in issues: print(" -",issue)
        return 1
    print("APROVADO nos testes estruturais: máscaras/arquivos/caminhos/slots.")
    print("ATENÇÃO: ainda exige revisão visual de todas as animações e trocas de roupa.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
