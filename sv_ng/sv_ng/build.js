/**
 * Static site builder for sahirvellani.com.
 * Reads templates and JSON data from src/, writes the rendered site to <repo>/docs/
 * (GitHub Pages is configured to serve from main / docs).
 *
 * Uses Node std lib + `sharp` for thumbnail generation. Image processing is
 * incremental: full-res images and per-image .thumb.jpg variants are only
 * (re)generated when missing or when the source mtime is newer than the output.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const sharp = require('sharp');

const SRC = path.join(__dirname, 'src');
const OUT = path.resolve(__dirname, '..', '..', 'docs');

// Thumbnail config. Only applied to images under src/images/<dir> where <dir>
// is in THUMB_DIRS. The thumbnail is written as <name>.thumb.jpg next to the
// original.
const THUMB_DIRS = new Set(['earth', 'astro']);
const THUMB_WIDTH = 700;
const THUMB_QUALITY = 78;
const THUMB_SUFFIX = '.thumb.jpg';

// ---------------- Helpers ----------------

function read(p) {
  return fs.readFileSync(p, 'utf8');
}

function write(rel, contents) {
  const full = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents);
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function rmIfExists(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

function escHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escAttr(s) {
  return escHtml(s);
}

function fillTemplate(tpl, vars) {
  return tpl.replace(/\{\{\s*([A-Z_]+)\s*\}\}/g, (m, key) => {
    if (Object.prototype.hasOwnProperty.call(vars, key)) {
      return vars[key] == null ? '' : String(vars[key]);
    }
    return '';
  });
}

// Replace a file's extension with `.thumb.jpg`. e.g. "foo.PNG" -> "foo.thumb.jpg".
function thumbName(imageBasename) {
  return imageBasename.replace(/\.[^.]+$/, '') + THUMB_SUFFIX;
}

// ---------------- Image processing (incremental) ----------------

function isStale(srcPath, destPath) {
  if (!fs.existsSync(destPath)) return true;
  return fs.statSync(srcPath).mtimeMs > fs.statSync(destPath).mtimeMs;
}

function walkFiles(root, cb) {
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const p = path.join(root, entry.name);
    if (entry.isDirectory()) walkFiles(p, cb);
    else if (entry.isFile()) cb(p);
  }
}

async function runWithConcurrency(items, limit, worker) {
  let i = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      await worker(items[idx], idx);
    }
  });
  await Promise.all(runners);
}

async function generateThumb(srcPath, destPath) {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  await sharp(srcPath)
    .rotate()
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: THUMB_QUALITY, mozjpeg: true })
    .toFile(destPath);
}

async function processImages() {
  const srcImages = path.join(SRC, 'images');
  const outImages = path.join(OUT, 'images');
  if (!fs.existsSync(srcImages)) return;

  // 1. Discover all source images and decide what needs to exist in output.
  // expected: Set<absolute path under outImages> of files that should be present.
  const expected = new Set();
  // tasks: { type: 'copy'|'thumb', src, dest }
  const tasks = [];

  walkFiles(srcImages, (srcPath) => {
    const rel = path.relative(srcImages, srcPath);
    const fullDest = path.join(outImages, rel);
    expected.add(fullDest);
    if (isStale(srcPath, fullDest)) tasks.push({ type: 'copy', src: srcPath, dest: fullDest });

    const topDir = rel.split(path.sep)[0];
    const ext = path.extname(srcPath).toLowerCase();
    if (THUMB_DIRS.has(topDir) && (ext === '.jpg' || ext === '.jpeg' || ext === '.png')) {
      const thumbDest = path.join(path.dirname(fullDest), thumbName(path.basename(srcPath)));
      expected.add(thumbDest);
      if (isStale(srcPath, thumbDest)) tasks.push({ type: 'thumb', src: srcPath, dest: thumbDest });
    }
  });

  // 2. Remove orphan files in output that no longer exist in source.
  if (fs.existsSync(outImages)) {
    walkFiles(outImages, (p) => {
      if (!expected.has(p)) {
        fs.rmSync(p, { force: true });
      }
    });
  }

  // 3. Run pending copies and thumb generations with bounded concurrency.
  if (tasks.length === 0) {
    console.log('[build] images up to date');
    return;
  }
  const copies = tasks.filter((t) => t.type === 'copy');
  const thumbs = tasks.filter((t) => t.type === 'thumb');
  console.log(`[build] images: ${copies.length} to copy, ${thumbs.length} thumbnails to generate`);

  const concurrency = Math.max(2, Math.min(8, os.cpus().length));
  await runWithConcurrency(tasks, concurrency, async (t) => {
    if (t.type === 'copy') {
      copyFile(t.src, t.dest);
    } else {
      await generateThumb(t.src, t.dest);
    }
  });
}

// ---------------- Load shared parts ----------------

const layout = read(path.join(SRC, 'layout.html'));
const partials = {
  HEADER: read(path.join(SRC, 'partials', 'header.html')),
  DRAWER: read(path.join(SRC, 'partials', 'drawer.html')),
  FOOTER: read(path.join(SRC, 'partials', 'footer.html')),
};

function renderPage({ title, description, bodyClass, content, extraCss = '', extraJs = '', activeNav = '' }) {
  // Mark the active nav link in the header/drawer with [data-nav-active]
  let header = partials.HEADER;
  let drawer = partials.DRAWER;
  if (activeNav) {
    const re = new RegExp(`(data-nav="${activeNav}"[^>]*?class="[^"]*?)"`, 'g');
    header = header.replace(re, '$1 active"');
    drawer = drawer.replace(re, '$1 active"');
  }

  return fillTemplate(layout, {
    TITLE: escHtml(title),
    DESCRIPTION: escAttr(description || ''),
    BODY_CLASS: bodyClass || '',
    HEADER: header,
    DRAWER: drawer,
    FOOTER: partials.FOOTER,
    CONTENT: content,
    EXTRA_CSS: extraCss,
    EXTRA_JS: extraJs,
  });
}

// ---------------- Page builders ----------------

function buildHome() {
  const tpl = read(path.join(SRC, 'pages', 'index.html'));
  return renderPage({
    title: 'Sahir Vellani',
    description: 'My personal website.',
    bodyClass: 'home',
    content: tpl,
    activeNav: 'home',
  });
}

function buildAbout() {
  // Reserved for future use; unused right now.
}

function build404() {
  const tpl = read(path.join(SRC, 'pages', '404.html'));
  return renderPage({
    title: '404: Not Found',
    description: 'Page not found.',
    bodyClass: 'page',
    content: tpl,
  });
}

function buildVideos() {
  const tpl = read(path.join(SRC, 'pages', 'videos.html'));
  return renderPage({
    title: 'Videography',
    description: 'Documenting adventures in motion picture.',
    bodyClass: 'page',
    content: tpl,
    activeNav: 'videos',
  });
}

function buildBlogIndex() {
  const tpl = read(path.join(SRC, 'pages', 'blog.html'));
  return renderPage({
    title: 'Blog',
    description: "Sahir's blog.",
    bodyClass: 'page',
    content: tpl,
    activeNav: 'blog',
  });
}

// Photography page (earth photos with section tabs).
function buildPhotography() {
  const json = JSON.parse(read(path.join(SRC, 'data', 'earth.json')));
  const items = json.earth_image_details;

  const grid = items
    .map((it) => {
      const thumbSrc = `/images/earth/${encodeURI(thumbName(it.image))}`;
      const alt = it.title || it.location || it.image;
      return `<button class="grid-item" type="button" data-image="${escAttr(it.image)}" aria-label="${escAttr(alt)}">
        <img src="${escAttr(thumbSrc)}" alt="${escAttr(alt)}" loading="lazy" decoding="async" />
      </button>`;
    })
    .join('\n');

  const tpl = read(path.join(SRC, 'pages', 'photography.html'));
  const content = tpl.replace('<!--GRID-->', grid);

  // Embed image-detail JSON (sanitized) so the modal can render details client-side.
  const detailsJson = JSON.stringify(items).replace(/</g, '\\u003c');
  const extraJs = `<script>window.__IMAGE_DETAILS__=${detailsJson};window.__IMAGE_DIR__="/images/earth/";</script>
<script src="/assets/js/gallery.js" defer></script>`;

  return renderPage({
    title: 'Photography',
    description: 'Photography portfolio.',
    bodyClass: 'page gallery-page',
    content,
    extraJs,
    activeNav: 'photography',
  });
}

function buildAstro() {
  const json = JSON.parse(read(path.join(SRC, 'data', 'astro.json')));
  // Sort by id descending to preserve current astro page ordering.
  const items = [...json.astro_image_details].sort((a, b) => (b.id || 0) - (a.id || 0));

  const grid = items
    .map((it) => {
      const thumbSrc = `/images/astro/${encodeURI(thumbName(it.image))}`;
      const alt = it.title || it.image;
      return `<button class="grid-item" type="button" data-image="${escAttr(it.image)}" aria-label="${escAttr(alt)}">
        <img src="${escAttr(thumbSrc)}" alt="${escAttr(alt)}" loading="lazy" decoding="async" />
      </button>`;
    })
    .join('\n');

  const tpl = read(path.join(SRC, 'pages', 'astro.html'));
  const content = tpl.replace('<!--GRID-->', grid);

  const detailsJson = JSON.stringify(items).replace(/</g, '\\u003c');
  const extraJs = `<script>window.__IMAGE_DETAILS__=${detailsJson};window.__IMAGE_DIR__="/images/astro/";</script>
<script src="/assets/js/gallery.js" defer></script>`;

  return renderPage({
    title: 'Astrophotography',
    description: 'Astrophotography gallery.',
    bodyClass: 'page gallery-page',
    content,
    extraJs,
    activeNav: 'astro',
  });
}

function buildBlogPost(slug, meta) {
  const body = read(path.join(SRC, 'blog-content', `${slug}.html`));
  const tpl = read(path.join(SRC, 'pages', 'blog-post.html'));
  const content = fillTemplate(tpl, {
    POST_TITLE: escHtml(meta.title),
    POST_DESCRIPTION: escHtml(meta.description),
    POST_BODY: body,
  });
  return renderPage({
    title: meta.title,
    description: meta.description,
    bodyClass: 'page blog-post',
    content,
    activeNav: 'blog',
  });
}

// ---------------- Route manifest ----------------

const blogPosts = {
  'resize-observer': {
    title: 'Detecting when an element changes size with ResizeObserver',
    description: "ResizeObserver is a JavaScript web API that allows you to run code whenever an element's size changes.",
  },
  'using-skywatcher-8x50-finder-as-guide-scope': {
    title: 'How to Convert your Sky-Watcher 8x50 Finder into a Guide Scope',
    description: 'Many Sky-Watcher telescopes come with a decent quality 8x50 finder scope. I converted my scope into a guide scope for use with a ZWO ASI 120mm Mini.',
  },
  'performance-tracing-in-chrome-and-edge': {
    title: 'Performance Tracing in Chrome and Edge',
    description: 'The tracing tab is a powerful tool that can be harnessed by web developers looking to streamline their websites and web apps.',
  },
};

// ---------------- Build ----------------

async function build() {
  // Selectively clean: HTML pages and assets always get regenerated, but images
  // are processed incrementally so we don't redo thumbnails every build.
  console.log('[build] cleaning pages + assets in', OUT);
  fs.mkdirSync(OUT, { recursive: true });
  for (const sub of ['photography', 'astro', 'videos', 'blog', 'assets']) {
    rmIfExists(path.join(OUT, sub));
  }
  for (const file of ['index.html', '404.html', 'CNAME', 'favicon.ico']) {
    rmIfExists(path.join(OUT, file));
  }

  // Static pages.
  write('index.html', buildHome());
  write('photography/index.html', buildPhotography());
  write('astro/index.html', buildAstro());
  write('videos/index.html', buildVideos());
  write('blog/index.html', buildBlogIndex());
  write('404.html', build404());

  // Blog posts.
  for (const [slug, meta] of Object.entries(blogPosts)) {
    write(`blog/${slug}/index.html`, buildBlogPost(slug, meta));
  }

  // Static assets (CSS / JS / SVG).
  console.log('[build] copying assets');
  copyDir(path.join(SRC, 'assets'), path.join(OUT, 'assets'));

  // CNAME and favicon at root.
  const cname = path.join(__dirname, 'CNAME');
  if (fs.existsSync(cname)) copyFile(cname, path.join(OUT, 'CNAME'));
  const icon = path.join(SRC, 'assets', 'icon.png');
  if (fs.existsSync(icon)) copyFile(icon, path.join(OUT, 'favicon.ico'));

  // Images: incremental copy + thumbnail generation.
  await processImages();

  console.log('[build] done ->', OUT);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
