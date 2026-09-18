'use strict';

const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const projectRoot = path.resolve(__dirname, '..');
const postsRoot = path.join(projectRoot, 'source', '_posts');
const outputRoot = path.join(projectRoot, 'source', 'img', 'covers');
const iconRoot = path.join(projectRoot, 'tools', 'cover-icons');
const chromeBin = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const covers = {
  butterfly: {
    file: 'tech-butterfly.png',
    icon: path.join(projectRoot, 'node_modules', 'hexo-theme-butterfly', 'source', 'img', 'butterfly-icon.png'),
    from: '#28135a', to: '#6d28d9'
  },
  css: {
    file: 'tech-css.png', icon: path.join(iconRoot, 'css.svg'),
    from: '#062f4f', to: '#075985'
  },
  javascript: {
    file: 'tech-javascript.png', icon: path.join(iconRoot, 'js.svg'),
    from: '#18181b', to: '#3f3f46'
  },
  mysql: {
    file: 'tech-mysql.png', icon: path.join(iconRoot, 'mysql.svg'),
    from: '#082f49', to: '#155e75'
  },
  git: {
    file: 'tech-git.png', icon: path.join(iconRoot, 'git.svg'),
    from: '#351315', to: '#7f1d1d'
  },
  react: {
    file: 'tech-react.png', icon: path.join(iconRoot, 'react.svg'),
    from: '#082f49', to: '#164e63'
  },
  typescript: {
    file: 'tech-typescript.png', icon: path.join(iconRoot, 'ts.svg'),
    from: '#0b2f5b', to: '#1d4ed8'
  },
  vscode: {
    file: 'tech-vscode.png', icon: path.join(iconRoot, 'vscode.svg'),
    from: '#082f49', to: '#0369a1'
  },
  pnpm: {
    file: 'tech-pnpm.png', icon: path.join(iconRoot, 'pnpm.svg'),
    from: '#3b2205', to: '#9a4d00'
  },
  linux: {
    file: 'tech-linux.png', icon: path.join(iconRoot, 'linux.svg'),
    from: '#0f172a', to: '#334155'
  },
  python: {
    file: 'tech-python.png', icon: path.join(iconRoot, 'py.svg'),
    from: '#12304a', to: '#1f5c85'
  },
  ai: {
    file: 'tech-ai-gpu.png', icon: path.join(iconRoot, 'pytorch.svg'),
    from: '#21123d', to: '#6b21a8'
  },
  mcp: {
    file: 'tech-mcp.png', symbol: 'MCP',
    from: '#351132', to: '#8b285e', color: '#f9a8d4'
  },
  nodejs: {
    file: 'tech-nodejs.png', icon: path.join(iconRoot, 'nodejs.svg'),
    from: '#17351f', to: '#2f6b3c'
  }
};

const postCovers = [
  ['01_ButterFly/Butterfly-安裝文檔-一-快速開始.md', 'butterfly'],
  ['01_ButterFly/Butterfly-安裝文檔-二-主題頁面.md', 'butterfly'],
  ['01_ButterFly/Butterfly-安裝文檔-三-主題配置-1.md', 'butterfly'],
  ['01_ButterFly/Butterfly-安裝文檔-四-主題配置-2.md', 'butterfly'],
  ['01_ButterFly/Butterfly-安裝文檔-五-主題問答.md', 'butterfly'],
  ['01_ButterFly/Butterfly-安裝文檔-六-進階教程.md', 'butterfly'],
  ['01_ButterFly/Butterfly-安裝文檔-七-更新日誌.md', 'butterfly'],
  ['01_ButterFly/Butterfly-美化合集.md', 'butterfly'],
  ['03_CSS/grid 栅格系统.md', 'css'],
  ['04_JavaScript/01_JS基础语法.md', 'javascript'],
  ['04_JavaScript/02_JS分支结构.md', 'javascript'],
  ['04_JavaScript/03_JS循环结构.md', 'javascript'],
  ['04_JavaScript/04_JS函数（上）.md', 'javascript'],
  ['04_JavaScript/05_JS函数（下）.md', 'javascript'],
  ['04_JavaScript/06_JS数组.md', 'javascript'],
  ['04_JavaScript/07_JS字符串.md', 'javascript'],
  ['04_JavaScript/08_Math和Date.md', 'javascript'],
  ['04_JavaScript/09_BOM和DOM.md', 'javascript'],
  ['04_JavaScript/10_DOM（下）.md', 'javascript'],
  ['04_JavaScript/11_Event（上）.md', 'javascript'],
  ['04_JavaScript/12_Event（下）.md', 'javascript'],
  ['04_JavaScript/13_玩转正则-Regexp.md', 'javascript'],
  ['04_JavaScript/14_ES5和ES6.md', 'javascript'],
  ['04_JavaScript/15_面向对象编程.md', 'javascript'],
  ['04_JavaScript/16_JSON和localstorage.md', 'javascript'],
  ['04_JavaScript/17_mysql.md', 'mysql'],
  ['04_JavaScript/18_cookie.md', 'javascript'],
  ['04_JavaScript/19_ajax.md', 'javascript'],
  ['04_JavaScript/20_Promise.md', 'javascript'],
  ['05_Git/01_玩转Git三剑客.md', 'git'],
  ['06_TypeScript/01_VS Code 配置与插件.md', 'vscode'],
  ['06_TypeScript/02_TypeScript 介绍与安装.md', 'typescript'],
  ['06_TypeScript/03_TypeScript 基础类型.md', 'typescript'],
  ['07_Package/pnpm.md', 'pnpm'],
  ['ai/Linux常用命令与开发目录.md', 'linux'],
  ['ai/python.md', 'python'],
  ['ai/大模型微调硬件入门.md', 'ai'],
  ['writing/MCP到底是什么.md', 'mcp'],
  ['writing/git commit指南.md', 'git'],
  ['writing/react code review指南.md', 'react'],
  ['writing/什么是code review.md', 'git'],
  ['writing/如何统计代码行数.md', 'nodejs'],
  ['writing/如何解决代码冲突.md', 'git']
];

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function renderCover(cover) {
  const visual = cover.icon
    ? `<img class="brand-icon" src="${pathToFileURL(cover.icon).href}" alt="">`
    : `<div class="brand-symbol">${escapeHtml(cover.symbol)}</div>`;

  const symbolColor = cover.color ? `;--symbol-color:${cover.color}` : '';
  return `<article class="cover" style="--from:${cover.from};--to:${cover.to}${symbolColor}">${visual}</article>`;
}

function renderHtml(batch) {
  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><style>
*{box-sizing:border-box}html,body{margin:0;width:1200px;background:#000}body{font-family:Inter,"SF Pro Display","PingFang SC",system-ui,sans-serif}
.cover{display:grid;width:1200px;height:630px;place-items:center;overflow:hidden;background:linear-gradient(135deg,var(--from),var(--to))}
.brand-icon{width:260px;height:260px;object-fit:contain;filter:drop-shadow(0 20px 36px rgba(0,0,0,.28))}
.brand-symbol{color:var(--symbol-color,#fff);font:800 112px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:-.08em;text-shadow:0 20px 36px rgba(0,0,0,.28)}
</style></head><body>${batch.map(renderCover).join('')}</body></html>`;
}

function updateCover(markdown, coverPath) {
  const frontMatter = markdown.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!frontMatter) throw new Error('Missing front matter');
  let next = frontMatter[1];
  next = /^cover:[ \t]*.*$/m.test(next) ? next.replace(/^cover:[ \t]*.*$/m, `cover: ${coverPath}`) : `${next}\ncover: ${coverPath}`;
  if (/^top_img:[ \t]*\S.*$/m.test(next)) next = next.replace(/^top_img:[ \t]*.*$/m, `top_img: ${coverPath}`);
  return markdown.replace(frontMatter[0], `---\n${next}\n---`);
}

function run(command, args) {
  return execFileSync(command, args, { stdio: 'pipe', maxBuffer: 20 * 1024 * 1024 });
}

function main() {
  if (!fs.existsSync(chromeBin)) throw new Error(`Chrome not found at ${chromeBin}. Set CHROME_BIN to a Chromium-compatible executable.`);
  for (const cover of Object.values(covers)) if (cover.icon && !fs.existsSync(cover.icon)) throw new Error(`Missing cover icon: ${cover.icon}`);

  fs.mkdirSync(outputRoot, { recursive: true });
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'hj-blog-covers-'));
  const entries = Object.entries(covers);

  for (const [key, cover] of entries) {
    const htmlPath = path.join(tempRoot, `${key}.html`);
    const outputPath = path.join(outputRoot, cover.file);
    fs.writeFileSync(htmlPath, renderHtml([cover]));
    run(chromeBin, ['--headless','--disable-gpu','--hide-scrollbars','--force-device-scale-factor=1','--run-all-compositor-stages-before-draw','--window-size=1200,630',`--screenshot=${outputPath}`,`file://${htmlPath}`]);

    const png = fs.readFileSync(outputPath);
    if (png.readUInt32BE(16) !== 1200 || png.readUInt32BE(20) !== 630) {
      throw new Error(`Unexpected dimensions for ${cover.file}`);
    }
  }

  for (const [postFile, coverKey] of postCovers) {
    const filePath = path.join(postsRoot, postFile);
    const markdown = fs.readFileSync(filePath, 'utf8');
    const updated = updateCover(markdown, `/img/covers/${covers[coverKey].file}`);
    if (updated !== markdown) fs.writeFileSync(filePath, updated);
  }
  fs.rmSync(tempRoot, { recursive: true, force: true });
  console.log(`Generated ${entries.length} technology covers and updated ${postCovers.length} posts.`);
}

main();
