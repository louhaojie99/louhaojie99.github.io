```text
██████╗   ██╗        ██████╗    ██████╗
██╔══██╗  ██║       ██╔═══██╗  ██╔════╝
██████╔╝  ██║       ██║   ██║  ██║  ███╗
██╔══██╗  ███████╗  ╚██████╔╝  ╚██████╔╝
╚═════╝   ╚══════╝   ╚═════╝    ╚═════╝
```

<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> 简体中文 | [English](/README.en.md)

> 基于 [Hexo](https://hexo.io/) 和 [Butterfly](https://butterfly.js.org/) 主题构建的个人博客。

## 💻 开发环境

- Node.js 22+
- pnpm 11

## 🚀 本地运行

```bash
pnpm install
pnpm run server
```

## 📦 构建部署

```bash
pnpm run clean
pnpm run build
pnpm run deploy
```

## 导航与分类

统一在 `_config.butterfly.yml` 的原生 `menu` 配置中维护桌面和移动端菜单，无需修改主题模板：

```yaml
menu:
  首页: /
  前端||||hide:
    HTML: /categories/前端/HTML/
    CSS: /categories/前端/CSS/
```

普通入口写 `名称: 链接`；下拉分组写 `名称||||hide` 并配置子项，`hide` 表示默认折叠。顶部使用“首页、前端、后端、AI、工具、随笔、关于”，搜索以放大镜显示在右侧；“随笔”直接进入 `/categories/生活/随笔/`，收录生活与个人成长文章。归档、标签、分类、相册、音乐、电影和友链入口放在页脚 `footer.custom_text` 中。技术内容按全栈 AI 开发的使用场景分为四组：

| 导航 | 二级分类 | 归属原则 |
| --- | --- | --- |
| 前端 | HTML、CSS、JavaScript、TypeScript、Node.js、Next.js | 页面、交互与 Web 应用 |
| 后端 | Python、Go、Java、MySQL、PostgreSQL | 服务端与数据存储 |
| AI | Agent / MCP、微调与算力 | AI 应用集成与模型实践 |
| 工具 | Git、包管理、Linux、Docker | 跨技术栈的开发、协作与运行工具 |

Git 与协作收录基础命令、提交规范、冲突处理、稀疏检出和代码评审，共用 `/categories/工程实践/git/` 归档。pnpm、Linux、Docker 分别进入对应的工程实践分类；Node.js 及旧 `node` 分类的代码行数统计文章归入前端；微调硬件文章归入 AI。工具菜单不再显示“开发工具”和“博客搭建”。目录整理保留文章内容与 `abbrlink`，文章地址保持不变，Butterfly 文档保留原有的未发布状态。

同文件的 `navigation_archives` 汇总新旧分类：`category: [前端, CSS]` 对应 `/categories/前端/CSS/`，`match_categories` 收录旧分类名，`source_prefixes` 收录 `_posts/` 下目录或文件名前缀。JavaScript、pnpm 和 Butterfly 文档分别存放在 `frontend/javascript/`、`tool/pnpm/` 和 `blog/hexo/`。暂无文章时显示空状态。

新文章直接使用两级分类，如 `categories: [前端, JavaScript]`、`categories: [前端, Nodejs]`、`categories: [AI, Agent]` 或 `categories: [工程实践, Git]`。`_config.yml` 的 `category_map` 将 `Git` 映射为小写 `git`。旧 `/categories/git/`、前端工程化、后端 Node.js / Linux / Docker、工程实践开发工具 / 博客搭建归档继续生成，兼容已有链接，但不作为菜单入口。

导航沿用 Butterfly 原生模板和手机侧栏；`source/css/navigation.css` 调整字号、间距和页脚链接，`source/js/navigation.js` 管理搜索位置、键盘操作与展开状态同步。

## 文章目录

`source/_posts/` 按主题使用两层英文小写目录：

| 目录 | 内容 |
| --- | --- |
| `frontend/javascript/`、`frontend/typescript/`、`frontend/css/` | 前端基础与教程 |
| `backend/go/`、`backend/python/` | 后端语言 |
| `ai/agent/`、`ai/hardware/` | Agent / MCP、微调硬件 |
| `devops/linux/`、`devops/docker/` | Linux 与 Docker |
| `tool/git/`、`tool/pnpm/`、`tool/shell/` | Git 协作与代码评审、包管理、命令行工具 |
| `blog/hexo/` | Hexo / Butterfly 文档 |
| `life/essays/` | 生活随笔，使用 `categories: [生活, 随笔]` |

移动文章时保留 `abbrlink`，同步更新文内 `post_link`、封面脚本 `tools/generate-post-covers.js` 和导航配置中的路径引用。
