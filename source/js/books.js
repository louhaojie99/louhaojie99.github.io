(() => {
  const setup = () => {
    document.querySelectorAll('.books-page .book-cover-image').forEach(img => {
      if (img.dataset.fallbackReady) return;
      img.dataset.fallbackReady = 'true';
      const fallback = () => { img.hidden = true; };
      img.addEventListener('error', fallback, { once: true });
      if (img.complete && !img.naturalWidth) fallback();
    });
  };
  document.addEventListener('pjax:complete', setup);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();
