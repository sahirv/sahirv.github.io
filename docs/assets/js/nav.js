/**
 * Mobile drawer toggle and active-link highlighting.
 */
(function () {
  'use strict';

  function setExpanded(toggle, drawer, expanded) {
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    if (expanded) {
      drawer.removeAttribute('hidden');
      document.body.classList.add('no-scroll');
    } else {
      drawer.setAttribute('hidden', '');
      document.body.classList.remove('no-scroll');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.drawer-toggle');
    var drawer = document.getElementById('nav-drawer');
    if (!toggle || !drawer) return;

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      setExpanded(toggle, drawer, !expanded);
    });

    var overlay = drawer.querySelector('.drawer-overlay');
    if (overlay) overlay.addEventListener('click', function () { setExpanded(toggle, drawer, false); });

    // Close drawer when a nav link is clicked.
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setExpanded(toggle, drawer, false); });
    });

    // Close on Escape.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setExpanded(toggle, drawer, false);
      }
    });
  });
})();
