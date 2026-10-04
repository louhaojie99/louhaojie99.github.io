'use strict';

const fs = require('node:fs');
const path = require('node:path');

// Register a site-owned page without changing the installed Butterfly theme.
hexo.extend.filter.register('before_generate', function () {
  this.theme.setView('movies.pug',
    fs.readFileSync(path.join(this.base_dir, 'layout/movies.pug'), 'utf8'));
});
