(() => {
  const setup = () => {
    const root = document.querySelector('.movies-page');
    if (!root || root.dataset.ready) return;
    root.dataset.ready = 'true';
    const items = [...root.querySelectorAll('.cinema-item')];
    const search = root.querySelector('input[type="search"]');
    const empty = root.querySelector('.cinema-empty');
    const reset = root.querySelector('[data-cinema-reset]');
    const footer = root.querySelector('.cinema-list-footer');
    const pagination = root.querySelector('.cinema-pagination');
    const previous = root.querySelector('[data-cinema-prev]');
    const next = root.querySelector('[data-cinema-next]');
    const pageSize = 10;
    let page = 1;
    const normalize = value => value.normalize('NFKC').toLocaleLowerCase().trim();
    const render = () => {
      const words = normalize(search.value).split(/\s+/).filter(Boolean);
      const matches = items.filter(item => words.every(word => normalize(item.dataset.search).includes(word)));
      const pages = Math.max(1, Math.ceil(matches.length / pageSize));
      page = Math.min(page, pages);
      const visible = new Set(matches.slice((page - 1) * pageSize, page * pageSize));
      items.forEach(item => { item.hidden = !visible.has(item); });
      empty.hidden = matches.length > 0;
      reset.hidden = !search.value;
      footer.hidden = !words.length && pages === 1;
      root.querySelector('.cinema-results').textContent = `共 ${matches.length} 部电影`;
      pagination.hidden = pages === 1;
      root.querySelector('.cinema-page-number').textContent = `${page} / ${pages}`;
      previous.disabled = page === 1;
      next.disabled = page === pages;
    };
    search.addEventListener('input', () => { page = 1; render(); });
    reset.addEventListener('click', () => {
      search.value = '';
      page = 1;
      render();
      search.focus();
    });
    const turnPage = offset => {
      page += offset;
      render();
      const list = root.querySelector('.cinema-list');
      list.setAttribute('tabindex', '-1');
      list.focus({ preventScroll: true });
      list.scrollIntoView({ block: 'start' });
    };
    previous.addEventListener('click', () => turnPage(-1));
    next.addEventListener('click', () => turnPage(1));
    root.querySelectorAll('.cinema-poster img').forEach(img => {
      const fallback = () => { img.hidden = true; };
      img.addEventListener('error', fallback, { once: true });
      if (img.complete && !img.naturalWidth) fallback();
    });
    root.querySelector('.cinema-search').hidden = false;
    render();
  };
  document.addEventListener('pjax:complete', setup);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();
