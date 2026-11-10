# 书籍栏目

[返回文档目录](README.md)

入口位于「更多 → 书籍」和页脚，地址为 `/books/`。页面展示紧凑的封面书架，每本书保留封面、书名、作者和简短简介。桌面最多五列，平板三至四列，手机两列，支持深色模式及 PJAX。

在 `source/_data/books.yml` 中添加条目，按文件顺序展示：

```yaml
- title: 书名
  author: 作者
  cover_style: moss
  description: 用约四十字说明故事背景与主要内容。
  # cover: /img/books/example.jpg
  # url: https://example.com/book
```

`title` 必填，其余可选。`cover_style` 支持墨绿 `moss`（默认）和赭红 `ochre`，无封面时显示原创排版封面，不代表出版物真实封面。实体书封图片放到 `source/img/books/`，填写 `cover` 即可替换；图片加载失败自动回退到排版封面。

初始收录刘楚昕《泥潭》与当年明月《明朝那些事儿》。简介建议控制在约四十字，说明故事背景与主要内容。《泥潭》的内容依据[北京晚报的作品介绍](https://xinwen.bjd.com.cn/content/s68a32ed5e4b0221b9beba49e.html)概括。点击封面在新窗口打开 `url`，不填则按书名及作者跳转豆瓣搜索。不展示分类、搜索、评分或阅读状态。内容在构建时生成，关闭 JavaScript 仍可浏览。

实现文件：`layout/books.pug`、`scripts/books.js`、`source/css/books.css` 和 `source/js/books.js`。无需修改 npm 中的 Butterfly 主题。
