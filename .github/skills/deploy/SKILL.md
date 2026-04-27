---
name: deploy
description: Deploy the website by committing and pushing to the main branch (GitHub Pages serves from main /docs, no CI). Use when the user says "deploy", "commit and push", or similar.
---

# Skill: Deploy

Publish the website to GitHub Pages.

## Trigger

User says: "deploy", "commit and push", "push it", "publish", or similar.

## Background

- GitHub Pages serves from branch `main`, folder `/docs` — there is **no CI**.
- The `/docs` folder is built from `sv_ng/sv_ng/src/` by `node build.js`.
- Remote: `https://github.com/sahirv/sahirv.github.io.git` (HTTPS — needs PAT or SSH).

## Steps

1. **Make sure the build is up to date.** If source changed since the last build, run it first:
   ```powershell
   cd C:\Users\sahir\website\sahirv.github.io\sv_ng\sv_ng; node build.js
   ```
   Skip if you just built (e.g. immediately after a photo import).

2. **Commit and push from the repo root:**
   ```powershell
   cd C:\Users\sahir\website\sahirv.github.io
   git add -A
   git commit -m "<concise summary>`n`nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
   git push
   ```
   - Use a powershell `initial_wait` of **180+ seconds** — large image blobs slow the push.
   - The Co-authored-by trailer is required.

3. **Verify the push succeeded** — look for `<old>..<new>  main -> main` at the end of the output.

## Commit message guidance

- One-line summary in imperative mood, e.g.:
  - `Add San Juan Island photos`
  - `Frosted glass navbar/drawer, new photos, UI tweaks`
  - `Switch to manual deploy /docs`
- Group related changes; don't split a single user request into multiple commits unless the user asks.

## Gotchas

- **>50MB files** trigger a GitHub LFS warning but still push (hard limit is 100MB). Don't try to "fix" it unless a file actually exceeds 100MB.
- **CRLF/LF warnings** on `docs/*.html` are harmless (Windows line-ending normalization).
- **Auth failures**: the user must have a PAT configured or be using SSH. Don't try to set up credentials — surface the error and stop.
- **Don't deploy automatically** after every change. Wait for the explicit trigger.
- **Don't push from `sv_ng/sv_ng/`** — the git repo root is the parent (`sahirv.github.io/`).
