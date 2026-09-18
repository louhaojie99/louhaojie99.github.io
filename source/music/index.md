---
title: 音乐馆
date: 2020-04-15 10:01:14
type: music
description: 在旋律里收藏时间，也收藏那些无法复刻的瞬间。
keywords: [音乐, 歌单, 网易云音乐]
comments: false
top_img: false
aside: false
---

<link rel="stylesheet" href="/assets/music/APlayer.min.css">

<div id="music-page"
  data-playlist-id="5457762881"
  data-playlist-server="netease"
  data-playlist-type="playlist">
  <div class="music-page-toolbar" aria-label="歌单控制">
    <button type="button" data-music-action="random" title="随机播放一首" disabled>
      <i class="fas fa-random" aria-hidden="true"></i>
      <span class="music-page-sr-only">随机播放一首</span>
    </button>
    <button type="button" data-music-action="refresh" title="重新加载歌单">
      <i class="fas fa-sync-alt" aria-hidden="true"></i>
      <span class="music-page-sr-only">重新加载歌单</span>
    </button>
    <button type="button" data-music-action="list" title="显示或隐藏歌单" disabled>
      <i class="fas fa-list-ul" aria-hidden="true"></i>
      <span class="music-page-sr-only">显示或隐藏歌单</span>
    </button>
  </div>

  <div id="music-player" class="aplayer music-player-shell">
    <div class="music-page-status" role="status" aria-live="polite">
      <span class="music-page-spinner" aria-hidden="true"></span>
      <strong>正在加载歌单</strong>
      <span>首次打开可能需要几秒钟</span>
    </div>
  </div>

  <noscript>
    <div class="music-page-status music-page-status-error">
      <strong>需要启用 JavaScript 才能播放音乐</strong>
    </div>
  </noscript>
</div>

<script src="/assets/music/APlayer.min.js"></script>
<script src="/js/music-page.js"></script>
