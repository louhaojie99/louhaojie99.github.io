(() => {
  const page = document.querySelector('#music-page');
  if (!page) return;

  const resetMusicPage = () => {
    if (document.body.dataset.type === 'music') delete document.body.dataset.type;
    window.__musicPageCoverObserver?.disconnect();
    window.__musicPageCoverObserver = null;
  };

  const syncMusicPageState = () => {
    if (document.querySelector('#music-page')) {
      document.body.dataset.type = 'music';
    } else {
      resetMusicPage();
    }
  };

  document.body.dataset.type = 'music';

  document.addEventListener('pjax:send', resetMusicPage);
  document.addEventListener('pjax:complete', syncMusicPageState);
  document.addEventListener('pjax:error', syncMusicPageState);
  window.addEventListener('pageshow', syncMusicPageState);

  let attempts = 0;
  const connectPlayer = () => {
    const player = window.aplayers?.find(item => !item.options.fixed);
    const picture = page.querySelector('.aplayer-pic');
    if (!player || !picture) {
      if (attempts++ < 180) requestAnimationFrame(connectPlayer);
      return;
    }

    const syncCover = () => {
      const cover = picture.style.backgroundImage;
      if (cover) page.style.setProperty('--music-cover', cover);
    };

    syncCover();
    window.__musicPageCoverObserver?.disconnect();
    window.__musicPageCoverObserver = new MutationObserver(syncCover);
    window.__musicPageCoverObserver.observe(picture, {
      attributes: true,
      attributeFilter: ['style']
    });

    page.querySelector('[data-music-action="random"]').addEventListener('click', () => {
      const total = player.list.audios.length;
      if (!total) return;
      let next = Math.floor(Math.random() * total);
      if (total > 1 && next === player.list.index) next = (next + 1) % total;
      player.list.switch(next);
      player.play();
    });

    page.querySelector('[data-music-action="refresh"]').addEventListener('click', () => {
      window.location.reload();
    });

    page.querySelector('[data-music-action="list"]').addEventListener('click', () => {
      player.list.toggle();
    });
  };

  connectPlayer();
})();
