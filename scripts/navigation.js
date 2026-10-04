'use strict';

const fs = require('node:fs');
const path = require('node:path');
let nativeCategoryGenerator;

function categoryPath(config, names) {
  return `${config.category_dir}/${names.map(name => (config.category_map || {})[name] || name).join('/')}/`;
}

// Menus use Butterfly's original template. Only empty archives need a local view.
hexo.extend.filter.register('before_generate', function () {
  this.theme.setView('navigation-category.pug',
    fs.readFileSync(path.join(this.base_dir, 'layout/navigation/category.pug'), 'utf8'));
  if (nativeCategoryGenerator) return;
  nativeCategoryGenerator = this.extend.generator.get('category');

  // Generate each archive once, merging legacy and new hierarchical categories.
  this.extend.generator.register('category', async function (locals) {
    const archives = this.theme.config.navigation_archives || [];
    const configuredPaths = new Set(archives.map(item => categoryPath(this.config, item.category)));
    const categories = locals.categories.toArray().filter(category => !configuredPaths.has(category.path));
    const emptyRoutes = [];

    for (const item of archives) {
      const archivePath = categoryPath(this.config, item.category);
      const posts = locals.posts.filter(post =>
        post.categories.toArray().some(category => category.path.startsWith(archivePath) ||
          (item.match_categories || []).includes(category.name)) ||
        (item.source_prefixes || []).some(prefix => post.source.startsWith(`_posts/${prefix}`))
      );
      const name = item.category.join(' / ');
      if (posts.length) {
        categories.push({ path: archivePath, name, length: posts.length, posts });
      } else {
        emptyRoutes.push({
          path: `${archivePath}index.html`,
          layout: 'navigation-category',
          data: { category: name, posts, total: 1, current: 1 }
        });
      }
    }
    // Preserve Hexo pagination, ordering and Butterfly's populated archive layout.
    return [...await nativeCategoryGenerator.call(this, { ...locals, categories }), ...emptyRoutes];
  });
});
