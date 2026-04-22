/**
 * Static site builder for sahirvellani.com.
 * Reads templates and JSON data from src/, writes the rendered site to <repo>/docs/
 * (GitHub Pages is configured to serve from main / docs).
 * Uses only the Node standard library (no third-party deps).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const OUT = path.resolve(__dirname, '..', '..', 'docs');

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
  // Normalize tag "people" -> "portrait" so the single people-tagged photo is reachable via the Portraits tab.
  const items = json.earth_image_details.map((it) => {
    const tags = (it.tags || []).map((t) => (t === 'people' ? 'portrait' : t));
    return { ...it, tags };
  });

  const grid = items
    .map((it) => {
      const tagAttr = (it.tags || []).join(' ');
      const src = `/images/earth/${encodeURI(it.image)}`;
      const alt = it.title || it.location || it.image;
      return `<button class="grid-item" type="button" data-image="${escAttr(it.image)}" data-tags="${escAttr(tagAttr)}" aria-label="${escAttr(alt)}">
        <img src="${escAttr(src)}" alt="${escAttr(alt)}" loading="lazy" decoding="async" />
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
      const src = `/images/astro/${encodeURI(it.image)}`;
      const alt = it.title || it.image;
      return `<button class="grid-item" type="button" data-image="${escAttr(it.image)}" aria-label="${escAttr(alt)}">
        <img src="${escAttr(src)}" alt="${escAttr(alt)}" loading="lazy" decoding="async" />
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

function build() {
  console.log('[build] cleaning', OUT);
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

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

  // Static assets.
  console.log('[build] copying assets');
  copyDir(path.join(SRC, 'assets'), path.join(OUT, 'assets'));
  copyDir(path.join(SRC, 'images'), path.join(OUT, 'images'));

  // CNAME and favicon at root.
  const cname = path.join(__dirname, 'CNAME');
  if (fs.existsSync(cname)) copyFile(cname, path.join(OUT, 'CNAME'));
  const icon = path.join(SRC, 'assets', 'icon.png');
  if (fs.existsSync(icon)) copyFile(icon, path.join(OUT, 'favicon.ico'));

  console.log('[build] done ->', OUT);
}

build();
