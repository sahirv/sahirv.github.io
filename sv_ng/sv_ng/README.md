# sahirvellani.com

Personal website — plain HTML, CSS, and JavaScript. Built with a tiny Node script (no third-party dependencies) and deployed to GitHub Pages.

## Layout

```
sv_ng/sv_ng/
  build.js              # build script (Node std lib only)
  serve.js              # tiny dev server
  CNAME                 # custom domain
  src/
    layout.html         # page shell with {{TITLE}}, {{CONTENT}}, etc.
    pages/              # one HTML fragment per route
    partials/           # header, drawer, footer
    blog-content/       # blog post body fragments
    data/               # earth.json, astro.json (image metadata)
    assets/             # css, js, svg, icon
    images/             # all photographs (copied as-is to /images)
  public/               # build output (git-ignored)
```

## Develop

Requires Node 18+. No `npm install` step is needed — there are no dependencies.

```sh
node build.js   # writes ./public
node serve.js   # serves ./public on http://localhost:8080
```

`npm run build` and `npm run serve` are equivalent.

## Adding a photo

1. Drop the file into `src/images/earth/` or `src/images/astro/`.
2. Add an entry to `src/data/earth.json` or `src/data/astro.json`. Photography tags should be one of `landscape`, `wildlife`, or `portrait`.
3. Run `node build.js` and verify locally.
4. Commit and push to `main` — GitHub Actions will deploy.

The `add_photo.py` helper at the repo root automates step 1 and 2.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds and publishes `public/` to GitHub Pages on every push to `main`.

**One-time setup**: in the repo's GitHub Settings → Pages, set the source to **"GitHub Actions"** (the previous setup served the `master` branch directly).
