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
  nomad: {
    file: 'life-nomad.png', icon: path.join(iconRoot, 'nomad.svg'),
    from: '#16382f', to: '#386454'
  },
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
  go: {
    file: 'tech-go.png', icon: path.join(iconRoot, 'go.svg'),
    from: '#063c4c', to: '#087ea4'
  },
  docker: {
    file: 'tech-docker.png', icon: path.join(iconRoot, 'docker.svg'),
    from: '#082b50', to: '#086dba'
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
  ['life/essays/从农耕走向游牧.md', 'nomad'],
  ['blog/hexo/Butterfly-安裝文檔-一-快速開始.md', 'butterfly'],
  ['blog/hexo/Butterfly-安裝文檔-二-主題頁面.md', 'butterfly'],
  ['blog/hexo/Butterfly-安裝文檔-三-主題配置-1.md', 'butterfly'],
  ['blog/hexo/Butterfly-安裝文檔-四-主題配置-2.md', 'butterfly'],
  ['blog/hexo/Butterfly-安裝文檔-五-主題問答.md', 'butterfly'],
  ['blog/hexo/Butterfly-安裝文檔-六-進階教程.md', 'butterfly'],
  ['blog/hexo/Butterfly-安裝文檔-七-更新日誌.md', 'butterfly'],
  ['blog/hexo/Butterfly-美化合集.md', 'butterfly'],
  ['frontend/css/CSS Flex 弹性布局.md', 'css'],
  ['frontend/css/CSS Grid 网格布局.md', 'css'],
  ['frontend/javascript/一、JavaScript 基础语法.md', 'javascript'],
  ['frontend/javascript/二、JavaScript 分支结构.md', 'javascript'],
  ['frontend/javascript/三、JavaScript 循环结构.md', 'javascript'],
  ['frontend/javascript/四、JavaScript 函数（上）.md', 'javascript'],
  ['frontend/javascript/五、JavaScript 函数（下）.md', 'javascript'],
  ['frontend/javascript/六、JavaScript 数组（Array）.md', 'javascript'],
  ['frontend/javascript/七、JavaScript 字符串（String）.md', 'javascript'],
  ['frontend/javascript/八、JavaScript 数学与日期对象（Math、Date）.md', 'javascript'],
  ['frontend/javascript/九、浏览器对象模型与文档对象模型（BOM、DOM）.md', 'javascript'],
  ['frontend/javascript/十、DOM 操作进阶.md', 'javascript'],
  ['frontend/javascript/十一、JavaScript 事件（上）.md', 'javascript'],
  ['frontend/javascript/十二、JavaScript 事件（下）.md', 'javascript'],
  ['frontend/javascript/十三、JavaScript 正则表达式（RegExp）.md', 'javascript'],
  ['frontend/javascript/十四、JavaScript ES5 与 ES6.md', 'javascript'],
  ['frontend/javascript/十五、JavaScript 面向对象编程.md', 'javascript'],
  ['frontend/javascript/十六、JSON 与本地存储（localStorage）.md', 'javascript'],
  ['frontend/javascript/十七、浏览器 Cookie 基础.md', 'javascript'],
  ['frontend/javascript/十八、Ajax 与前后端交互.md', 'javascript'],
  ['frontend/javascript/十九、Promise 与异步编程.md', 'javascript'],
  ['tool/git/Git 基础与常用命令.md', 'git'],
  ['tool/git/Git如何拉取仓库中的指定文件夹.md', 'git'],
  ['frontend/typescript/一、TypeScript 介绍与安装.md', 'typescript'],
  ['frontend/typescript/二、TypeScript 基础类型.md', 'typescript'],
  ['frontend/typescript/三、TypeScript 接口与函数.md', 'typescript'],
  ['frontend/typescript/四、TypeScript 泛型与常用工具类型.md', 'typescript'],
  ['frontend/typescript/五、TypeScript 项目实践.md', 'typescript'],
  ['tool/pnpm/pnpm 包管理与常用命令.md', 'pnpm'],
  ['backend/go/Go 基础入门.md', 'go'],
  ['devops/linux/Linux常用命令与开发目录.md', 'linux'],
  ['devops/docker/Docker 常用命令.md', 'docker'],
  ['backend/python/python.md', 'python'],
  ['ai/hardware/大模型微调硬件入门.md', 'ai'],
  ['ai/agent/MCP到底是什么.md', 'mcp'],
  ['tool/git/git commit指南.md', 'git'],
  ['tool/git/如何做好代码评审.md', 'git'],
  ['tool/git/什么是code review.md', 'git'],
  ['tool/shell/如何统计代码行数.md', 'nodejs'],
  ['tool/git/如何解决代码冲突.md', 'git']
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
  const selected = process.argv.slice(2);
  for (const key of selected) {
    if (!Object.hasOwn(covers, key)) throw new Error(`Unknown cover: ${key}`);
  }
  const entries = Object.entries(covers).filter(([key]) => !selected.length || selected.includes(key));
  const posts = postCovers.filter(([, key]) => !selected.length || selected.includes(key));
  if (!fs.existsSync(chromeBin)) throw new Error(`Chrome not found at ${chromeBin}. Set CHROME_BIN to a Chromium-compatible executable.`);
  for (const [, cover] of entries) if (cover.icon && !fs.existsSync(cover.icon)) throw new Error(`Missing cover icon: ${cover.icon}`);

  fs.mkdirSync(outputRoot, { recursive: true });
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'hj-blog-covers-'));

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

  for (const [postFile, coverKey] of posts) {
    const filePath = path.join(postsRoot, postFile);
    const markdown = fs.readFileSync(filePath, 'utf8');
    const updated = updateCover(markdown, `/img/covers/${covers[coverKey].file}`);
    if (updated !== markdown) fs.writeFileSync(filePath, updated);
  }
  fs.rmSync(tempRoot, { recursive: true, force: true });
  console.log(`Generated ${entries.length} covers and updated ${posts.length} posts.`);
}

main();
