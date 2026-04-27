---
name: serve
description: Build the site and start the local dev server (node serve.js) on http://localhost:8080 to preview the website. Use when the user asks to serve, preview, or run the website locally.
---

# Skill: Serve

Run the website locally for development/preview.

## Trigger

User says: "serve", "start the server", "run locally", "preview the site", "spin it up", or similar.

## Background

- `serve.js` is a tiny static file server in `sv_ng/sv_ng/`.
- It serves the **built** site from `<repo>/docs` on port **8080**.
- Source files in `src/` are NOT served directly — you must build first.

## Steps

1. **Build first** (so `docs/` is in sync with `src/`):
   ```powershell
   cd C:\Users\sahir\website\sahirv.github.io\sv_ng\sv_ng; node build.js
   ```

2. **Start the server in the background** (async + detached so it survives session shutdown):
   ```powershell
   cd C:\Users\sahir\website\sahirv.github.io\sv_ng\sv_ng; node serve.js
   ```
   Use the `powershell` tool with `mode: "async"` and `detach: true`. Keep `initial_wait` short (10-15 seconds) — just enough to confirm it started.

3. **Verify it's responding** with a quick request:
   ```powershell
   Invoke-WebRequest -UseBasicParsing http://localhost:8080/ | Select-Object StatusCode
   ```
   Expect `200`.

4. **Tell the user the URL**: `http://localhost:8080/`.

## Stopping the server

User says "stop the server" / "kill it":
```powershell
Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```
Or if you have the PID from the start command, `Stop-Process -Id <PID>`.

Detached processes can't be stopped with `stop_powershell` — you must target the PID.

## Gotchas

- **Port 8080 already in use**: another instance may already be running. Either reuse it or stop the old one first.
- **Edits to `src/` don't auto-refresh** — there is no watcher. Re-run `node build.js` and reload the browser.
- **Image-heavy pages**: first load of `/photography/` or `/astro/` pulls many thumbs; subsequent loads cache.
- **Don't `npm run` anything fancy** — the project intentionally has minimal scripts. `node build.js` and `node serve.js` are the entry points.
