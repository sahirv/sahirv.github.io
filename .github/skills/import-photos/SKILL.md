---
name: import-photos
description: Import new photos from a local directory into the website's earth or astro gallery. Copies files into src/images/, prepends metadata entries to src/data/earth.json or astro.json, and rebuilds. Use when the user asks to add photos from a path like C:\Users\sahir\Pictures\<Trip>\Processed.
---

# Skill: Photo Import

How to add new photos to the website (sahirvellani.com).

## Trigger

User says something like:
- "Add the photos in `<path>` to the website" / "to earth"
- "Do the same for `<path>`"
- "Add `<path>` for landscape" / "for astrophotography"

`<path>` is usually a Windows directory like `C:\Users\sahir\Pictures\<Trip>\Processed` (sometimes `Edited`).

## Conventions

- Repo root: `C:\Users\sahir\website\sahirv.github.io`
- Project root: `<repo>\sv_ng\sv_ng`
- Source images: `<project>\src\images\earth\` (landscape/wildlife) or `<project>\src\images\astro\` (astrophotography)
- Metadata JSON: `<project>\src\data\earth.json` or `<project>\src\data\astro.json`
- Build script: `<project>\build.js` (uses sharp for thumbnails, writes to `<repo>\docs`)

## Steps

1. **List the source files** with PowerShell:
   ```powershell
   Get-ChildItem "<source path>" -File | Select-Object Name
   ```
   Honor `ignore subdirs` instructions — do not recurse unless asked.

2. **Confirm people-in-photo handling** (only if not already specified):
   - Use `ask_user` with choices `["No, add all N", "Skip some (I'll specify)"]`.
   - Skip files the user names. Portraits/people are no longer a category on the site.

3. **Copy files** to the appropriate `src/images/<earth|astro>/` directory:
   ```powershell
   Copy-Item "<source>\*.jpg" "<project>\src\images\earth\"
   ```
   Preserve the original filenames — `build.js` derives thumbnail names from them and prunes orphans by name.

4. **Prepend new entries to the JSON array.** Use the `edit` tool to insert before the current first entry (matches the `add_photo.py` convention; newest first).

   **earth.json entry shape:**
   ```json
   {
     "image": "<filename>.jpg",
     "title": "",
     "description": "",
     "continent": "<continent>",
     "location": "<City/Park, Region/Country>",
     "tags": ["landscape"]
   }
   ```
   Tags: `landscape` by default. Use `wildlife` if the user says so. (No `portrait` — that category was removed.)

   **astro.json entry shape** (same array pattern, but include monotonically increasing `id`):
   ```json
   {
     "id": <max+1>,
     "image": "<filename>.jpg",
     "title": "",
     "description": "",
     "equipment": "",
     "link": ""
   }
   ```
   The astro page sorts by `id` desc, so new ids must exceed the current max. Leave equipment/description/link blank unless the user provides them — they can fill in later.

5. **Build:**
   ```powershell
   cd C:\Users\sahir\website\sahirv.github.io\sv_ng\sv_ng; node build.js
   ```
   Expected output: `[build] images: N to copy, N thumbnails to generate` then `[build] done`.
   - Build is incremental (mtime-based) and prunes orphan thumbs/full-res in `docs/`.
   - First build after adding photos will be slower (sharp generates 700px thumbnails); reruns are fast.

6. **Do not commit/push unless the user says "deploy" / "commit and push"** — see the `deploy` skill.

## Common location values seen so far

- North America: "Bellevue, Washington", "The Enchantments, Washington", "San Juan Island, Washington", "Index, Washington", "North Cascades National Park, Washington", "Burroughs Mountain, Washington", "Capitol Reef National Park, Utah", "Guatemala"
- Europe: "Spain", "Portugal", "Greece"
- Astro: trip-specific titles like "Aurora Borealis"

## Gotchas

- **Don't recurse into subdirectories** unless explicitly asked. Many `Processed` folders contain raw subfolders.
- **Filenames with spaces or special chars** copy fine but verify they appear correctly in JSON.
- **JSON formatting**: earth.json uses 2-space indent, astro.json is currently single-line. When using the `edit` tool to prepend, match the surrounding style of that file.
- **People photos**: when in doubt, ask. The Portraits section was deleted; people images don't have a home on the site.
- **Astro id collisions**: Always check current max id in astro.json before assigning. Last known max was 23 (Aurora set).
- **PowerShell `Get-ChildItem`** without `-File` can include directories; pass `-File` for clean listings.
