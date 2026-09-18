(() => {
  const page = document.querySelector('#music-page');
  const playerRoot = document.querySelector('#music-player');
  if (!page || !playerRoot) return;

  const playlistId = page.dataset.playlistId;
  const playlistServer = page.dataset.playlistServer || 'netease';
  const playlistType = page.dataset.playlistType || 'playlist';
  const playlistUrl = `https://music.163.com/#/playlist?id=${encodeURIComponent(playlistId)}`;
  const apiEndpoints = [
    'https://api.i-meto.com/meting/api',
    'https://api.injahow.cn/meting/'
  ];

  let player = null;
  let requestController = null;
  let coverObserver = null;

  const toolbarButtons = [...page.querySelectorAll('.music-page-toolbar button')];

  const setToolbarReady = ready => {
    toolbarButtons.forEach(button => {
      if (button.dataset.musicAction !== 'refresh') button.disabled = !ready;
    });
  };

  const setStatus = (state, message) => {
    page.dataset.musicState = state;
    playerRoot.className = `aplayer music-player-shell music-player-${state}`;

    if (state === 'loading') {
      playerRoot.innerHTML = `
        <div class="music-page-status" role="status" aria-live="polite">
          <span class="music-page-spinner" aria-hidden="true"></span>
          <strong>正在加载歌单</strong>
          <span>${message || '首次打开可能需要几秒钟'}</span>
        </div>`;
      return;
    }

    playerRoot.innerHTML = `
      <div class="music-page-status music-page-status-error" role="alert">
        <i class="fas fa-headphones-alt" aria-hidden="true"></i>
        <strong>歌单暂时无法加载</strong>
        <span>${message || '音乐服务暂时不可用，请稍后重试。'}</span>
        <div class="music-page-status-actions">
          <button type="button" data-music-retry>重新加载</button>
          <a href="${playlistUrl}" target="_blank" rel="noopener noreferrer">在网易云音乐打开</a>
        </div>
      </div>`;

    playerRoot.querySelector('[data-music-retry]')?.addEventListener('click', loadPlaylist);
  };

  const normalizeTracks = tracks => tracks
    .map(track => ({
      name: track.name || track.title || '未知歌曲',
      artist: track.artist || track.author || '未知歌手',
      url: track.url,
      cover: track.cover || track.pic || '',
      lrc: track.lrc || ''
    }))
    .filter(track => track.url);

  const fetchPlaylist = async (endpoint, signal) => {
    const url = new URL(endpoint);
    url.searchParams.set('server', playlistServer);
    url.searchParams.set('type', playlistType);
    url.searchParams.set('id', playlistId);

    const response = await fetch(url, {
      signal,
      cache: 'default'
    });

    if (!response.ok) throw new Error(`音乐接口返回 ${response.status}`);
    const result = await response.json();
    if (!Array.isArray(result)) throw new Error('音乐接口返回格式异常');

    const tracks = normalizeTracks(result);
    if (!tracks.length) throw new Error('歌单中没有可播放的歌曲');
    return tracks;
  };

  const requestPlaylist = async signal => {
    try {
      return await Promise.any(apiEndpoints.map(endpoint => fetchPlaylist(endpoint, signal)));
    } catch (error) {
      if (signal.aborted) throw new DOMException('Request aborted', 'AbortError');
      throw error.errors?.find(item => item instanceof Error)
        || new Error('音乐服务暂时不可用');
    }
  };

  const syncCover = () => {
    const cover = playerRoot.querySelector('.aplayer-pic')?.style.backgroundImage;
    if (cover) page.style.setProperty('--music-cover', cover);
  };

  const observeCover = () => {
    coverObserver?.disconnect();
    const picture = playerRoot.querySelector('.aplayer-pic');
    if (!picture) return;

    syncCover();
    coverObserver = new MutationObserver(syncCover);
    coverObserver.observe(picture, {
      attributes: true,
      attributeFilter: ['style']
    });
  };

  async function loadPlaylist() {
    requestController?.abort();
    const controller = new AbortController();
    requestController = controller;
    coverObserver?.disconnect();
    player?.destroy();
    player = null;
    setToolbarReady(false);
    setStatus('loading');

    const timeoutId = window.setTimeout(() => controller.abort(), 30000);

    try {
      if (typeof window.APlayer !== 'function') {
        throw new Error('播放器资源未正确加载');
      }

      const tracks = await requestPlaylist(controller.signal);
      window.clearTimeout(timeoutId);
      if (requestController !== controller) return;

      playerRoot.className = 'aplayer music-player-shell';
      player = new window.APlayer({
        container: playerRoot,
        audio: tracks,
        autoplay: false,
        mutex: false,
        lrcType: tracks.some(track => track.lrc) ? 3 : 0,
        listFolded: false,
        listMaxHeight: '560px',
        preload: 'none',
        theme: '#ffffff',
        loop: 'all',
        order: 'random',
        volume: 0.7,
        storageName: 'hj-music-player'
      });

      window.aplayers = [player];
      page.dataset.musicState = 'ready';
      requestController = null;
      setToolbarReady(true);
      observeCover();
    } catch (error) {
      window.clearTimeout(timeoutId);
      if (requestController !== controller) return;
      requestController = null;
      if (error.name === 'AbortError' && !page.isConnected) return;

      const message = error.name === 'AbortError'
        ? '请求超时，请检查网络后重试。'
        : error.message;
      setStatus('error', message);
    }
  }

  const teardown = () => {
    requestController?.abort();
    coverObserver?.disconnect();
    coverObserver = null;
    player?.destroy();
    player = null;
    window.aplayers = [];
    if (document.body.dataset.type === 'music') delete document.body.dataset.type;
  };

  page.querySelector('.music-page-toolbar').addEventListener('click', event => {
    const button = event.target.closest('[data-music-action]');
    if (!button || button.disabled) return;

    if (button.dataset.musicAction === 'refresh') {
      loadPlaylist();
      return;
    }

    if (!player) return;
    if (button.dataset.musicAction === 'list') {
      player.list.toggle();
      return;
    }

    const total = player.list.audios.length;
    if (!total) return;
    let next = Math.floor(Math.random() * total);
    if (total > 1 && next === player.list.index) next = (next + 1) % total;
    player.list.switch(next);
    player.play();
  });

  document.body.dataset.type = 'music';
  document.addEventListener('pjax:send', teardown, { once: true });
  document.addEventListener('pjax:error', () => {
    if (page.isConnected) {
      document.body.dataset.type = 'music';
      loadPlaylist();
    }
  }, { once: true });
  window.addEventListener('pagehide', event => {
    if (!event.persisted) teardown();
  }, { once: true });
  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      document.body.dataset.type = 'music';
      loadPlaylist();
    }
  });

  loadPlaylist();
})();
