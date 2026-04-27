/**
 * Photo gallery: section-tab filter, modal viewer with details, URL state via ?image=.
 * Expects window.__IMAGE_DETAILS__ (array) and window.__IMAGE_DIR__ (string) to be set.
 */
(function () {
  'use strict';

  var details = window.__IMAGE_DETAILS__ || [];
  var imageDir = window.__IMAGE_DIR__ || '/';
  var detailsByImage = {};
  details.forEach(function (d) { detailsByImage[d.image] = d; });

  var modal = null;
  var modalImg = null;
  var modalLink = null;
  var modalDetails = null;
  var pushedHistory = false;

  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function renderDetails(d) {
    if (!d) return '<p>No image details found.</p>';
    var parts = [];
    if (d.title) parts.push('<h4>' + escHtml(d.title) + '</h4>');
    if (d.location) parts.push('<h5>' + escHtml(d.location) + '</h5>');
    if (d.description) parts.push('<p>' + escHtml(d.description) + '</p>');
    if (d.equipment && d.equipment.length) {
      if (d.link) {
        parts.push('<p>You can learn more about ' + escHtml(d.title || 'this image') +
          ' <a href="' + escHtml(d.link) + '" target="_blank" rel="noopener">here</a>.</p>');
      }
      parts.push('<div class="equipment-title">Equipment</div>');
      parts.push('<ul class="equipment-list">' +
        d.equipment.map(function (e) { return '<li>' + escHtml(e) + '</li>'; }).join('') +
        '</ul>');
    } else if (d.link) {
      parts.push('<p><a href="' + escHtml(d.link) + '" target="_blank" rel="noopener">More info</a></p>');
    }
    return parts.join('\n');
  }

  function ensureModal() {
    if (modal) return;
    modal = document.createElement('dialog');
    modal.className = 'image-modal';
    modal.innerHTML =
      '<button type="button" class="modal-close" aria-label="Close">&times;</button>' +
      '<div class="modal-content">' +
        '<div class="modal-image"><a data-modal-link target="_blank" rel="noopener"><img data-modal-img alt="" /></a></div>' +
        '<div class="modal-details" data-modal-details></div>' +
      '</div>';
    document.body.appendChild(modal);
    modalImg = modal.querySelector('[data-modal-img]');
    modalLink = modal.querySelector('[data-modal-link]');
    modalDetails = modal.querySelector('[data-modal-details]');

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    // Click outside .modal-content to close.
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
    modal.addEventListener('cancel', function (e) {
      e.preventDefault();
      closeModal();
    });
  }

  function openModal(imageName, fromPopState) {
    ensureModal();
    var d = detailsByImage[imageName];
    var src = imageDir + encodeURIComponent(imageName);
    modalImg.src = src;
    modalImg.alt = (d && d.title) || imageName;
    modalLink.href = src;
    modalDetails.innerHTML = renderDetails(d);

    if (typeof modal.showModal === 'function') {
      if (!modal.open) modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }
    document.body.classList.add('no-scroll');

    if (!fromPopState) {
      var url = new URL(window.location.href);
      if (url.searchParams.get('image') !== imageName) {
        url.searchParams.set('image', imageName);
        window.history.pushState({ image: imageName }, '', url);
        pushedHistory = true;
      }
    }
  }

  function closeModal(fromPopState) {
    if (!modal || !modal.open) {
      // Sync state if dialog already closed.
      document.body.classList.remove('no-scroll');
    } else {
      if (typeof modal.close === 'function') modal.close();
      else modal.removeAttribute('open');
      document.body.classList.remove('no-scroll');
    }

    // Free memory: drop the large image src.
    if (modalImg) modalImg.removeAttribute('src');

    if (!fromPopState && pushedHistory) {
      pushedHistory = false;
      window.history.back();
    } else if (!fromPopState) {
      var url = new URL(window.location.href);
      if (url.searchParams.has('image')) {
        url.searchParams.delete('image');
        window.history.replaceState({}, '', url);
      }
    }
  }

  function initGrid() {
    var grid = document.querySelector('[data-grid]');
    if (!grid) return;

    grid.addEventListener('click', function (e) {
      var item = e.target.closest('.grid-item');
      if (!item) return;
      var name = item.getAttribute('data-image');
      if (name) openModal(name);
    });
  }

  function initSectionNav() {
    var nav = document.querySelector('[data-section-nav]');
    if (!nav) return;
    var grid = document.querySelector('[data-grid]');
    if (!grid) return;
    var items = Array.prototype.slice.call(grid.querySelectorAll('.grid-item'));

    function applyFilter(section) {
      items.forEach(function (it) {
        var tags = (it.getAttribute('data-tags') || '').split(/\s+/);
        var show = section === 'all' || tags.indexOf(section) !== -1;
        it.classList.toggle('hidden', !show);
      });
    }

    nav.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-section]');
      if (!btn) return;
      nav.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilter(btn.getAttribute('data-section'));
    });

    // Default filter from initially-active button.
    var active = nav.querySelector('button.active');
    if (active) applyFilter(active.getAttribute('data-section'));
  }

  function initFromUrl() {
    var url = new URL(window.location.href);
    var img = url.searchParams.get('image');
    if (img && detailsByImage[img]) openModal(img, true);
  }

  window.addEventListener('popstate', function (e) {
    var url = new URL(window.location.href);
    var img = url.searchParams.get('image');
    if (img && detailsByImage[img]) {
      openModal(img, true);
    } else {
      pushedHistory = false;
      closeModal(true);
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    initGrid();
    initSectionNav();
    initFromUrl();
  });
})();
