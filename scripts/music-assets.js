'use strict';

const fs = require('node:fs');
const path = require('node:path');

const aplayerRoot = path.dirname(require.resolve('aplayer/package.json'));
const assets = ['APlayer.min.js', 'APlayer.min.css'];

hexo.extend.generator.register('music-player-assets', () => assets.map(filename => ({
  path: `assets/music/${filename}`,
  data: () => fs.createReadStream(path.join(aplayerRoot, 'dist', filename))
})));
