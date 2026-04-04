# Web-Projekt: Struktur & Arbeitsweise

Dieses Dokument beschreibt die aktuelle Struktur des Web-Projekts, die Rollen der einzelnen Ordner sowie empfohlene Arbeitsweisen.
Die bestehende Struktur bleibt vollständig erhalten.

---

## Projektübersicht

Das Projekt besteht aus mehreren klar getrennten Bereichen:

1. `develop` – aktiver Entwicklungsbereich
2. `deploy` – Ausgabe für veröffentlichte Versionen
3. `Python-Tools` – Hilfsprogramme und Skripte
4. `Abbildungen` – Rohmaterial und Originalbilder
5. Projektordner wie `standardtisch` oder `baumbank`

---

## Ordnerstruktur

```
web
│
├── Abbildungen\
│   └── standardtisch\
│
├── deploy\
│
├── develop\
│   ├── baumbank\
│   ├── icons\
│   ├── images\
│   │   └── projekte\
│   ├── standardtisch\
│   ├── knuts-wooden-dreams.html
│   └── (weitere HTML-Dateien)
│
└── Python-Tools\
```

---

## Rollen der Ordner

### `develop/` – Arbeitsbereich
Hier findet die eigentliche Webentwicklung statt. Enthält:
- HTML-Seiten
- Projektordner (z. B. `standardtisch`)
- Bilder & Icons
- Python-Umgebung (`.venv`)
- globale Assets
- `symbols/` – SVG-Icons für Überschriften und UI-Elemente

### `deploy/` – Veröffentlichte Version
Ziel für optimierte Bilder, minifizierte CSS/JS und finale HTML-Versionen.
Nur Output, keine Entwicklungsdateien.

### `Abbildungen/` – Rohmaterial
Archiv für unbearbeitete oder hochauflösende Bilder.

### `Python-Tools/` – Hilfsprogramme
Skripte für PDF-Extraktion, Icon-Extraktion, Bildverarbeitung und interne Automatisierungen.

### `develop/symbols/` – SVG-Icons

Enthält alle SVG-Symbole, die in Überschriften und UI-Elementen verwendet werden.

| Datei | Beschreibung |
|---|---|
| `band_saw.svg` | Bandsäge |
| `bar_stool_frame.svg` | Barhocker-Gestell |
| `base_cabinet_carcass_two_doors.svg` | Unterschrank-Korpus (2 Türen) |
| `beam.svg` | Balken |
| `bed_frame_with_headboard.svg` | Bettgestell mit Kopfteil |
| `bed_slats.svg` | Lattenrost |
| `belt_sander.svg` | Bandschleifer |
| `bench_grinder.svg` | Schleifbock |
| `bookshelf_carcass.svg` | Bücherregal-Korpus |
| `caliper.svg` | Messschieber |
| `carving_knife.svg` | Schnitzmesser |
| `chair.svg` | Stuhl |
| `chair_carcass.svg` | Stuhl-Gestell |
| `chisel.svg` | Stechbeitel |
| `circular_saw.svg` | Kreissäge |
| `clamp.svg` | Zwinge |
| `collet.svg` | Spannzange |
| `combination_pliers.svg` | Kombizange |
| `compressor.svg` | Kompressor |
| `cordless_drill.svg` | Akkubohrschrauber |
| `corner_clamp.svg` | Eckenspanner |
| `corner_shelving_unit_carcass.svg` | Eckregal-Korpus |
| `cup_hinge.svg` | Topfscharnier |
| `damper.svg` | Dämpfer |
| `desk_top_and_legs.svg` | Schreibtischplatte mit Beinen |
| `disassembled_table.svg` | Zerlegter Tisch |
| `dowel.svg` | Holzdübel |
| `drawer.svg` | Schublade |
| `drawer_cabinet_carcass.svg` | Schubladenschrank-Korpus |
| `drawer_chest_carcass.svg` | Schubladenkommode-Korpus |
| `drill.svg` | Bohrmaschine |
| `drill_press.svg` | Standbohrmaschine |
| `dust_extraction.svg` | Absaugung |
| `dust_mask.svg` | Staubmaske |
| `file.svg` | Feile |
| `folding_ruler.svg` | Zollstock |
| `forstner_bit_set.svg` | Forstnerbohrer-Set |
| `frame.svg` | Rahmen |
| `furniture_oil.svg` | Möbelöl |
| `furniture_varnish.svg` | Möbellack |
| `glue_clamp.svg` | Leimzwinge |
| `hammer.svg` | Hammer |
| `hand_plane.svg` | Handhobel |
| `handle.svg` | Griff |
| `handsaw.svg` | Handsäge |
| `headboard_panel.svg` | Kopfteil-Panel |
| `hearing_protection.svg` | Gehörschutz |
| `heat_gun.svg` | Heißluftpistole |
| `japanese_saw.svg` | Japansäge |
| `jigsaw.svg` | Stichsäge |
| `jointer.svg` | Abrichthobelmaschine |
| `knob.svg` | Knauf |
| `lamello.svg` | Lamello |
| `lathe.svg` | Drechselbank |
| `list.svg` | Liste |
| `long_console_table_carcass.svg` | Langer Konsolentisch-Korpus |
| `low_cabinet_on_legs.svg` | Niedriger Schrank auf Beinen |
| `low_panel_with_legs.svg` | Niedrige Platte mit Beinen |
| `lumber_stack.svg` | Holzstapel |
| `mallet.svg` | Holzhammer |
| `marking_gauge.svg` | Streichmaß |
| `masking_tape.svg` | Malerkrepp |
| `miter_saw.svg` | Kapp-Zugsäge |
| `multi_table.svg` | Multifunktionstisch |
| `nail.svg` | Nagel |
| `nail_gun.svg` | Nagelpistoler |
| `open_chest_crate.svg` | Offene Kiste |
| `orbital_sander.svg` | Exzenterschleifer |
| `paint_bucket.svg` | Farbeimer |
| `paint_roller.svg` | Farbroller |
| `paintbrush.svg` | Pinsel |
| `pedestal_table_base.svg` | Tischsäulenfuß |
| `pegboard.svg` | Lochplatte |
| `pencil.svg` | Bleistift |
| `pincers.svg` | Kneifzange |
| `planer.svg` | Dickenhobel |
| `putty_knife.svg` | Spachtel |
| `rolling_cart_frame.svg` | Rollwagen-Gestell |
| `router.svg` | Oberfräse |
| `router_bit_set.svg` | Fräser-Set |
| `router_table.svg` | Frästisch |
| `routing.svg` | Fräsen |
| `safety_shoes.svg` | Sicherheitsschuhe |
| `sandpaper_roll.svg` | Schleifpapierrolle |
| `sawhorse.svg` | Sägebock |
| `screw.svg` | Schraube |
| `screwdriver.svg` | Schraubenzieher |
| `set_of_furniture_legs.svg` | Möbelbein-Set |
| `shelving_unit.svg` | Regal |
| `single_drawer_desk.svg` | Schreibtisch mit einer Schublade |
| `spirit_level.svg` | Wasserwaage |
| `spray_gun.svg` | Spritzpistole |
| `square_ruler.svg` | Winkel |
| `table_saw.svg` | Tischkreissäge |
| `tall_back_panel.svg` | Hohes Rückwandpanel |
| `tape_measure.svg` | Maßband |
| `tool_cart.svg` | Werkzeugwagen |
| `turning_chisels.svg` | Drechselmeißel |
| `unfinished_armchair_frame.svg` | Rohgestell Sessel |
| `unfinished_sofa_frame.svg` | Rohgestell Sofa |
| `upholstered_seat_back_cushion.svg` | Gepolstertes Sitz-/Rückenkissen |
| `utility_knife.svg` | Cuttermesser |
| `vacuum_cleaner.svg` | Staubsauger |
| `vise.svg` | Schraubstock |
| `wall_cabinet_carcass.svg` | Wandschrank-Korpus |
| `wardrobe_cabinet_carcass.svg` | Kleiderschrank-Korpus |
| `wood_glue.svg` | Holzleim |
| `wood_screw.svg` | Holzschraube |
| `wooden_board.svg` | Holzbrett |
| `wooden_mallet.svg` | Holzschlegel |
| `workbench.svg` | Werkbank |
| `x_frame_table_base.svg` | X-Gestell Tischbasis |

---

### Projektordner (z. B. `develop/standardtisch/`)
Enthält `index.html`, Bilder, Zeichnungen, Stücklisten und Skripte.
Projekte bleiben autark und sauber strukturiert.

---

## Arbeitsweise

**Entwicklung:**
- HTML-Seiten und Inhalte in `develop/` bearbeiten
- Projektordner enthalten alle projektspezifischen Dateien
- Globale Assets (Icons, CSS, JS) zentral in `develop/`

**Deployment:**
- Fertige Versionen nach `deploy/` exportieren
- Keine Tools oder Rohdaten in `deploy/`

**Tools:**
- Python-Skripte bleiben in `Python-Tools/`
- `.venv` bleibt in `develop/`

**Zeichencodierung (wichtig):**
- Alle Textdateien (`.html`, `.css`, `.js`, `.md`, `.json`, `.xml`) in **UTF-8** speichern.
- Keine ANSI/Windows-1252-Konvertierung verwenden, um Mojibake (z. B. `Ã¤`, `â€”`) zu vermeiden.
- Projektweite Standardwerte sind in `.editorconfig` definiert.

---

## Vorteile dieser Struktur

- Klare Trennung zwischen Entwicklung, Deployment und Tools
- Saubere Projektkapselung (z. B. `standardtisch`)
- Keine Vermischung von Rohmaterial und Web-Assets
- Skalierbar für weitere Projekte
- Leicht versionierbar

---

## Projekt-Template

```
projektname/
├── index.html
├── bilder/
├── zeichnungen/
├── stuecklisten/
└── scripts/
```
