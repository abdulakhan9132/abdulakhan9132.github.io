"""Create web-sized copies; leave the original design files untouched."""
from pathlib import Path
import json
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r"C:\Users\HN089WS\OneDrive\Desktop\BG")
OUTPUT = ROOT / "public" / "portfolio"
OUTPUT.mkdir(parents=True, exist_ok=True)


def export(source, name, thumbnail=False):
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        if thumbnail:
            image = image.crop((0, 0, image.width, min(image.height, int(image.width * .74))))
        image.thumbnail((1800, 12000))
        target = OUTPUT / f"{name}.webp"
        image.save(target, "WEBP", quality=88, method=6)
        assert target.stat().st_size > 1000, target
        return {"image": f"/portfolio/{name}.webp", "width": image.width, "height": image.height}


ui = SOURCE / "website projects"
projects = [
    dict(id="arven", title="ARVEN", tagline="A quieter way to live beautifully.", kind="Residential website", category="Product & UI/UX", tags=["Web design", "Art direction", "Responsive UI"], summary="A considered residential experience shaped by warm materials, architectural photography, and a calm path from discovery to enquiry.", folder="ARVEN", files=["ARVEN.png"]),
    dict(id="nova-deals", title="NovaDeals", tagline="Good style. Less friction.", kind="Commerce experience", category="Product & UI/UX", tags=["E-commerce", "Design system", "UI/UX"], summary="A fashion commerce concept connecting product discovery, clear product details, and a cohesive visual system across desktop and mobile.", folder="NOVA Deals", files=["Frame 473.png"]),
    dict(id="gitfit", title="GITFIT", tagline="A little stronger. Every day.", kind="Fitness product", category="Product & UI/UX", tags=["Mobile design", "Visual identity", "Interaction"], summary="A fitness experience exploring confident visual identity, workout discovery, and clear mobile interfaces for an active everyday routine.", folder="GITFIT", files=["cover page 1440x1024.png", "final.png", "final 2.png", "iPhone 17 - 5.png", "iPhone 17 - 6.png", "iPhone 17 - 7.png"]),
    dict(id="enterprise-dashboard", title="Clarity in complexity", tagline="The right information. At the right moment.", kind="Enterprise dashboards", category="Product & UI/UX", tags=["Dashboard UX", "Data visualization", "Enterprise UI"], summary="A family of executive, supplier, and engineering interfaces focused on hierarchy, legibility, and making complex information easier to navigate.", folder="Dasshborad design", files=[f"{i}.png" for i in range(1, 7)]),
]
for project in projects:
    folder, files = project.pop("folder"), project.pop("files")
    project["preview"] = export(ui / folder / files[0], project["id"] + "-preview", True)
    project["image"] = project["preview"]["image"]
    project["screens"] = [export(ui / folder / file, f"{project['id']}-{i+1}") for i, file in enumerate(files)]

graphics = SOURCE / "Graphic design"
named = [
    ("Brutalism.png", "Brutalism", "Brutalism"),
    ("UNSEEN red.png", "Unseen", "Experimental"),
    ("For You, I’d Risk It All.png", "For You, I’d Risk It All", "Surrealism"),
    ("walk.png", "A quieter path", "Surrealism"),
    ("love.png", "Love, in the spotlight", "Minimalism"),
    ("Fall in love.png", "Fall in Love", "Editorial"),
]
references = [
    ("1cd3998fe59be4c1a91559e53b74ec08.jpg", "Hope", "Minimalism"),
    ("21388b9466108d5d17d25712ebffa172.jpg", "June", "Editorial"),
    ("27c5383ae8ccfd70791baa4f938209bf.jpg", "Direction over speed", "Minimalism"),
    ("309e25bfb091b59bfc6a58f3dbde8e30.jpg", "Not Just Chrome", "Neo-futurism"),
    ("3cb7d4bc286476e11bb984e2b3263c7e.jpg", "Perspective", "Experimental"),
    ("621884ea1c1463871a002784ba948847.jpg", "A Simple Favor", "Editorial"),
    ("75b8bc47e5f81c1aa0f653efd6f2005d.jpg", "Tokyo", "Editorial"),
    ("80eb3660bd1460a2e46971019bf0d07c.jpg", "Look", "Surrealism"),
    ("88f9d3bea8f510a65058cdb7f57b1463.jpg", "Boring", "Brutalism"),
    ("9de454a3fe3e35afd3e6449e70178561.jpg", "The Red Ones", "Surrealism"),
    ("a0fe134a7f6909d382bf252b0e799ab2.jpg", "Brutal Type", "Brutalism"),
    ("d24311473873f139f05b1a4454c979ae.jpg", "Welcome to the 2000s", "Neo-futurism"),
    ("f284faf693b60499a934426c66e50498.jpg", "Use Your Imagination", "Surrealism"),
]
artwork = []
for i, (file, title, style) in enumerate(named + references):
    item = dict(id=f"poster-{i+1}", title=title, style=style, collection="Posters", medium="Poster & graphic exploration", description=f"{style} — typographic and visual exploration from the supplied poster collection.")
    item.update(export(graphics / "posters" / file, item["id"]))
    artwork.append(item)
for i, title in enumerate(["Electric blue", "Amber flow", "Emerald matter", "Liquid lime", "After light", "Magenta current"], 1):
    item = dict(id=f"abstract-{i}", title=title, style="Neo-futurism", collection="Abstract", medium="Abstract surface & background", description="A study of liquid form, reflective surfaces, color, and light.")
    item.update(export(graphics / "BG designs" / f"{i} BG.png", item["id"]))
    artwork.append(item)

assert len(projects) == 4 and len(artwork) == 25
(ROOT / "src" / "portfolio-assets.json").write_text(json.dumps({"projects": projects, "artwork": artwork}, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Prepared {len(projects)} UI projects, {len(artwork)} graphic pieces, and all project screens.")
