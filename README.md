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
  后端: /categories/后端/ || fas fa-server
  前端||fas fa-code||hide:
    HTML: /categories/前端/HTML/ || fab fa-html5
    CSS: /categories/前端/CSS/ || fab fa-css3-alt
```

普通入口写 `名称: 链接 || 图标`；下拉分组写 `名称||图标||hide` 并配置子项，`hide` 表示移动端默认折叠。前端、后端、AI 均按现有文章配置二级分类，后续继续添加同级配置即可扩展。没有子项时写普通分类链接，不写空分组。

同文件的 `navigation_archives` 补齐新增分类归档：`category: [前端, CSS]` 对应 `/categories/前端/CSS/`，`match_categories` 收录旧分类名，`source_prefixes` 收录 `_posts/` 下目录前缀。暂无文章时显示空状态，旧文章和分类地址仍可用。新文章可直接设置 `categories: [前端, CSS]`。

导航沿用 Butterfly 原生模板、样式和手机侧栏；站点脚本仅补充点击、键盘操作与展开状态同步。
