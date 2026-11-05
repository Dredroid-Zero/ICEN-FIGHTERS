"""Testa falha em vazamento de alfa e aceitação estrutural de assets sintéticos.

Os exemplos gerados neste teste não são sprites para o jogo.
"""
from pathlib import Path
from tempfile import TemporaryDirectory
import json
import unittest
from PIL import Image
from validate_assets import validate_manifest

HERE=Path(__file__).parent


class ValidatorTests(unittest.TestCase):
    def make_set(self, folder):
        manifest = json.loads((HERE / "asset_contract.template.json").read_text(encoding="utf-8"))
        manifest["status"] = "ASSETS_READY_FOR_STRUCTURAL_TEST"
        Image.new("RGBA", (1,1)).save(folder / "master.aseprite", format="PNG")  # apenas dummy para existência da origem
        manifest["spriteSources"]["layeredMaster"] = "master.aseprite"
        for p in manifest["parts"]:
            ident=p["id"]
            Path(folder / "base").mkdir(exist_ok=True)
            Path(folder / "masks").mkdir(exist_ok=True)
            img=Image.new("RGBA",(182,320))
            img.putpixel((45,75), (255,0,0,255))
            mask=Image.new("RGBA",(182,320))
            mask.putpixel((45,75), (255,255,255,255))
            img.save(folder / "base" / f"{ident}.png")
            mask.save(folder / "masks" / f"{ident}.png")
            p["image"]=f"base/{ident}.png"
            p["mask"]=f"masks/{ident}.png"
        (folder / "alt").mkdir(exist_ok=True)
        for ident in ("top", "sleeve_L", "sleeve_R"):
            alternate=Image.new("RGBA",(182,320))
            alternate.putpixel((45,75),(0,0,255,255))
            alternate.save(folder / "alt" / f"{ident}.png")
            manifest["colorSwaps"]["blueTop"]["alternateImagePaths"][ident]=f"alt/{ident}.png"
        (folder / "assets.json").write_text(json.dumps(manifest),encoding="utf-8")
        return folder / "assets.json"

    def test_structurally_valid_package(self):
        with TemporaryDirectory() as d:
            p=self.make_set(Path(d))
            self.assertEqual(validate_manifest(p),[])

    def test_detects_pixels_outside_declared_mask(self):
        with TemporaryDirectory() as d:
            folder=Path(d)
            p=self.make_set(folder)
            img=Image.open(folder / "base" / "top.png").convert("RGBA")
            img.putpixel((50,80),(255,0,0,255))
            img.save(folder / "base" / "top.png")
            issues=validate_manifest(p)
            self.assertTrue(any("top: pixels fora" in msg for msg in issues),issues)

    def test_detects_bad_recolor_silhouette(self):
        with TemporaryDirectory() as d:
            folder=Path(d)
            p=self.make_set(folder)
            img=Image.open(folder / "alt" / "top.png").convert("RGBA")
            img.putpixel((45,75),(0,0,255,0))
            img.save(folder / "alt" / "top.png")
            issues=validate_manifest(p)
            self.assertTrue(any("altera a silhueta" in msg for msg in issues),issues)

if __name__ == "__main__":
    unittest.main()
