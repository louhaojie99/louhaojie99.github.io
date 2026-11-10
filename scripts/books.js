'use strict';

const fs = require('node:fs');
const path = require('node:path');

hexo.extend.filter.register('before_generate', function () {
  this.theme.setView('books.pug',
    fs.readFileSync(path.join(this.base_dir, 'layout/books.pug'), 'utf8'));
});
