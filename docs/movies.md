# 电影片单

[返回文档目录](README.md)

`/movies/` 使用独立的纵向电影列表，替换旧第三方解析播放器。调研参考了 [Ofra Serendipity](https://hsqyyds.eu.org/movies/) 的电影资料展示；最终排版独立设计，按用户提供的顺序展示人物海报、片名、年份、导演、剧情简介和豆瓣详情链接，不填充个人评分或观看状态。

在 `source/_data/movies.yml` 维护 `title`、`original_title`、`year`、`director`、`description`、`poster` 和 `url`，按文件顺序展示。海报保存在 `source/img/movies/`，来源见[海报来源](movie-posters.md)。`scripts/movies.js` 注册 `layout/movies.pug`，不修改 npm 主题文件。`source/css/movies.css` 适配手机和深色模式；`source/js/movies.js` 提供片名（含英文）、年份、导演和简介搜索、每页 10 部分页，以及图片加载失败时的片名封面，并兼容 PJAX。只有超过一页时才显示分页。内容在构建时生成，关闭 JavaScript 仍可浏览完整片单和访问影片资料。
