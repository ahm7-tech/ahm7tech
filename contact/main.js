/* AHM₇ TECH / Midnight Circuit — standalone interaction layer. */

(function () {
  var year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  var logo = document.querySelector('.brand-image[data-standalone-src]');
  if (logo) {
    logo.addEventListener('error', function () {
      var fallback = logo.getAttribute('data-standalone-src');
      if (fallback && logo.getAttribute('src') !== fallback) {
        logo.setAttribute('src', fallback);
      } else {
        logo.style.visibility = 'hidden';
      }
    });
  }

  var items = document.querySelectorAll('.reveal');
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (item) { item.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries, observerInstance) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observerInstance.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  items.forEach(function (item) { observer.observe(item); });
}());
