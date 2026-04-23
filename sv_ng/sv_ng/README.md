# sahirvellani.com

Personal website — plain HTML, CSS, and JavaScript. Built with a tiny Node script (no third-party dependencies) and deployed to GitHub Pages.

## Layout

```
.
├─ docs/                 # built site (served by GitHub Pages from main /docs)
└─ sv_ng/sv_ng/
   ├─ build.js           # build script (Node std lib only)
   ├─ serve.js           # tiny dev server
   ├─ CNAME              # custom domain (copied into docs/ on build)
   └─ src/
      ├─ layout.html     # page shell with {{TITLE}}, {{CONTENT}}, etc.
      ├─ pages/          # one HTML fragment per route
      ├─ partials/       # header, drawer, footer
      ├─ blog-content/   # blog post body fragments
      ├─ data/           # earth.json, astro.json (image metadata)
      ├─ assets/         # css, js, svg, icon
      └─ images/         # all photographs (copied as-is to docs/images)
```

## Develop

Requires Node 18.17+ (for the `sharp` thumbnail library).

```sh
npm install      # one time, installs sharp
node build.js    # writes ../../docs (the repo's docs/ folder)
node serve.js    # serves docs/ on http://localhost:8080
```

`npm run build` and `npm run serve` are equivalent.

The build script generates a low-resolution `<name>.thumb.jpg` (~700px wide,
~60 KB) next to every image in `src/images/earth/` and `src/images/astro/`.
The photography and astro grids reference these thumbs; the modal viewer loads
the full-resolution original on demand. Image processing is incremental — only
new or changed source images are reprocessed.

## Adding a photo

1. Drop the file into `src/images/earth/` or `src/images/astro/`.
2. Add an entry to `src/data/earth.json` or `src/data/astro.json`. Photography tags should be one of `landscape`, `wildlife`, or `portrait`.
3. Run `node build.js` and verify locally with `node serve.js`.
4. From the repo root: `git add -A && git commit && git push origin main`.

The `add_photo.py` helper at the repo root automates step 1 and 2.

## Deploy

No CI. GitHub Pages is configured to serve **`main` branch / `/docs` folder**. Build locally, commit `docs/` along with your source changes, and push to `main`.

**One-time setup**: in the repo's GitHub Settings → Pages, set Source = "Deploy from a branch", Branch = `main`, Folder = `/docs`.
