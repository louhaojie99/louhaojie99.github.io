---
title: Butterfly 安裝文檔(五) 主題問答
date: 2019-01-05 22:31:46
tags:
  - 教程
  - Hexo
  - 主題
  - butterfly
categories: Docs文檔
keywords: "hexo,butterfly,主題,doc,教程,文檔"
description: Butterfly安裝文檔-主題問答
cover: https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/butterfly-doc-05-cover.png
abbrlink: 98d20436
comments: false
---

{% note blue 'fas fa-bullhorn' %}

📖 本教程更新於 2021 年 07 月 20 日，教程的內容針對最新**穩定版**而更新（如果你是舊版，教程會有些出入，請留意）

🦋 Butterfly 已經更新到 [3.8.2](https://github.com/jerryc127/hexo-theme-butterfly/releases/tag/3.8.2)

{% endnote %}

{% note green 'fas fa-rocket' %}

📚 文檔目錄

{% post_link 01_ButterFly/Butterfly-安裝文檔-一-快速開始 ' 🚀 快速開始' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-二-主題頁面 ' 📑 主題頁面' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-三-主題配置-1 ' 🛠 主題配置-1' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-四-主題配置-2 ' ⚔️ 主題配置-2' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-五-主題問答 ' ❓ 主題問答' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-六-進階教程 ' ⚡️ 進階教程' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-七-更新日誌 ' ✨ 更新日誌' %}

{% endnote %}

{% note orange 'fas fa-magic' %}

你可以通過右下角的 **簡** 按鈕切換為簡體顯示

{% endnote %}

---

以下是一些網友在安裝的過程中出現的問題。在提問題之前，先看有沒有解決方法。

### 運行後網頁顯示代碼

頁面只顯示 `extends includes/layout.pug block content #recent-posts.recent-posts include includes/recent-posts.pug include includes/pagination.pug #aside_content.aside_content include includes/aside.pug`

> 請下載安裝：`npm install hexo-renderer-pug hexo-renderer-stylus --save` or `yarn add hexo-renderer-pug hexo-renderer-stylus

### 配置友情鏈接報錯

配置友情鏈接頁面時出現報錯

```
ERROR D:\Desktop\orxing-blog\themes\Butterfly\layout\flink.pug:2
    1| .flink
  > 2|   each i in site.data.link
    3|     p.comment-word= i.class_name
    4|     .post-cards
    5|       ul.md-links

Cannot read property &#39;length&#39; of undefined
TypeError: D:\Desktop\orxing-blog\themes\Butterfly\layout\flink.pug:2
    1| .flink
  > 2|   each i in site.data.link
    3|     p.comment-word= i.class_name
    4|     .post-cards
    5|       ul.md-links

Cannot read property &#39;length&#39; of undefined
    at eval (eval at wrap (D:\Desktop\orxing-blog\node_modules\pug-runtime\wrap.js:6:10), <anonymous>:1890:32)
    at eval (eval at wrap (D:\Desktop\orxing-blog\node_modules\pug-runtime\wrap.js:6:10), <anonymous>:2017:4)
    at template (eval at wrap (D:\Desktop\orxing-blog\node_modules\pug-runtime\wrap.js:6:10), <anonymous>:10152:72)
    at Theme._View.View._compiled (D:\Desktop\orxing-blog\node_modules\hexo\lib\theme\view.js:123:48)
    at Theme._View.View.View.render (D:\Desktop\orxing-blog\node_modules\hexo\lib\theme\view.js:29:15)
    at D:\Desktop\orxing-blog\node_modules\hexo\lib\hexo\index.js:349:21
    at tryCatcher (D:\Desktop\orxing-blog\node_modules\bluebird\js\release\util.js:16:23)
    at D:\Desktop\orxing-blog\node_modules\bluebird\js\release\method.js:15:34
    at RouteStream._read (D:\Desktop\orxing-blog\node_modules\hexo\lib\hexo\router.js:123:3)
    at RouteStream.Readable.read (_stream_readable.js:457:10)
    at resume_ (_stream_readable.js:936:12)
    at processTicksAndRejections (internal/process/task_queues.js:84:9)
```

> 請檢查 `link.yml`文檔內代碼的空格

### 升級最新版後運行報錯

升級最新版本 hexo g 後報錯

```
INFO  Deleted database.
INFO  Start processing
FATAL Something&#39;s wrong. Maybe you can find the solution here: https://hexo.io/docs/troubleshooting.html
TypeError: Cannot read property &#39;enable&#39; of undefined
    at Hexo.<anonymous> (/Users/qinkangdeid/Nextcloud/work/codes/personal/github/personal/qinkangdeid.github.io/themes/Butterfly/scripts/post-lazyload.js:5:23)
    at Hexo.tryCatcher (/Users/qinkangdeid/Nextcloud/work/codes/personal/github/personal/qinkangdeid.github.io/node_modules/bluebird/js/release/util.js:16:23)
    at Hexo.<anonymous> (/Users/qinkangdeid/Nextcloud/work/codes/personal/github/personal/qinkangdeid.github.io/node_modules/bluebird/js/release/method.js:15:34)
    at /Users/qinkangdeid/Nextcloud/work/codes/personal/github/personal/qinkangdeid.github.io/node_modules/hexo/lib/extend/filter.js:60:50
    at tryCatcher (/Users/qinkangdeid/Nextcloud/work/codes/personal/github/personal/qinkangdeid.github.io/node_modules/bluebird/js/release/util.js:16:23)
    at Object.gotValue (/Users/qinkangdeid/Nextcloud/work/codes/personal/github/personal/qinkangdeid.github.io/node_modules/bluebird/js/release/reduce.js:155:18)
    at Object.gotAccum (/Users/qinkangdeid/Nextcloud/work/codes/personal/github/personal/qinkangdeid.github.io/node_modules/bluebird/js/release/reduce.js:144:25)
    at Object.tryCatcher (/Users/qinkangdeid/Nextcloud/work/codes/personal/github/personal/qinkangdeid.github.io/node_modules/bluebird/js/release/util.js:16:23)
    at Promise._settlePromiseFromHandler (/Users/qinkangdeid/Nextcloud/work/codes/personal/github/personal/qinkangdeid.github.io/node_modules/bluebird/js/release/promise.js:517:31)
    at Promise._settlePromise (/Users/qinkangdeid/Nextcloud/work/codes/personal/github/personal/qinkangdeid.github.io/node_modules/bluebird/js/release/promise.js:574:18)
    at Promise._settlePromiseCtx (/Users/qinkangdeid/Nextcloud/work/codes/personal/github/personal/qinkangdeid.github.io/node_modules/bluebird/js/release/promise.js:611:10)
    at _drainQueueStep (/Users/qinkangdeid/Nextcloud/work/codes/personal/github/personal/qinkangdeid.github.io/node_modules/bluebird/js/release/async.js:142:12)
    at _drainQueue (/Users/qinkangdeid/Nextcloud/work/codes/personal/github/personal/qinkangdeid.github.io/node_modules/bluebird/js/release/async.js:131:9)
    at Async._drainQueues (/Users/qinkangdeid/Nextcloud/work/codes/personal/github/personal/qinkangdeid.github.io/node_modules/bluebird/js/release/async.js:147:5)
    at Immediate.Async.drainQueues [as _onImmediate] (/Users/qinkangdeid/Nextcloud/work/codes/personal/github/personal/qinkangdeid.github.io/node_modules/bluebird/js/release/async.js:17:14)
    at processImmediate (internal/timers.js:439:21)
```

> 請參照最新版的\_config.yml, 比對後，把缺的配置複製到主題配置文件中去

### wordcount is not a function / totalcount is not a function

報錯`wordcount is not a function`

> 請檢查是否安裝了 wordcount 插件 `npm i --save hexo-wordcount`

### 升級 2.0.0 後運行報錯

舊版本升級到 2.0.0 後報錯

```
INFO Start processing
FATAL Something’s wrong. Maybe you can find the solution here: https://hexo.io/docs/troubleshooting.html
Template render error: (unknown path)
unexpected end of file
at Object.prettifyError (F:\hexo\nodemodules\nunjucks\src\lib.js:36:11)
at Template.render (F:\hexo\node_modules\nunjucks\src\environment.js:542:21)
at Environment.renderString (F:\hexo\node_modules\nunjucks\src\environment.js:380:17)
at Promise.fromCallback.cb (F:\hexo\node_modules\hexo\lib\extend\tag.js:123:48)
at tryCatcher (F:\hexo\node_modules\bluebird\js\release\util.js:16:23)
at Function.Promise.fromNode.Promise.fromCallback (F:\hexo\node_modules\bluebird\js\release\promise.js:185:30)
at Tag.render (F:\hexo\node_modules\hexo\lib\extend\tag.js:123:18)
at Object.onRenderEnd (F:\hexo\node_modules\hexo\lib\hexo\post.js:280:20)
at Promise.then.then.result (F:\hexo\node_modules\hexo\lib\hexo\render.js:64:19)
at tryCatcher (F:\hexo\node_modules\bluebird\js\release\util.js:16:23)
at Promise.settlePromiseFromHandler (F:\hexo\nodemodules\bluebird\js\release\promise.js:517:31)

```

> 2.0.0 版本以上刪掉了 gallery，而引入新的 gallery。所以如果有使用舊版，需刪掉或者更改寫法。

### 代碼渲染與實際不同

2.1.0 以下版本會出現的問題

代碼渲染與實際不同

```
<div>aaa</div>
```

渲染結果:

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/73515338-e6874d80-442f-11ea-9d07-725d37002985.png)

> cheerio 版本錯誤，請安裝 0.22.0 版本
>
> npm install cheerio@0.22.0 --save

### 搜索欄在底部

hexo deploy 後搜索欄在頁面底部

> 生成前先 hexo clean

### 本地可以正常運行，但是 push 上去後出錯/缺失/無效

> 1. 清理瀏覽器緩存
> 2. 如果 1 無效，請確認上傳時是否有運行 hexo clean

### 已在 Hexo 的配置文件設置了語言，為什麼導航欄仍然是英文

> 請在導航的配置裏，自己修改成想要的中文

```yaml
首頁: / || fa fa-home
時間軸: /archives/ || fa fa-archive
標籤: /tags/ || fa fa-tags
分類: /categories/ || fa fa-folder-open
```

### 運行報錯 Cannot read property 'bind' of undefined/full_url_for is not function

```powershell
TypeError: Cannot read property 'bind' of undefined
```

> 把 Hexo 升級到 4.0 以上版本

### Cannot read property 'appId' of undefined

報錯

```powershell
  > 1| -
    2|   var algolia = 'undefined';
    3|   var env = process.env;
    4|   if (theme.algolia_search.enable) {

Cannot read property 'appId' of undefined
    at eval (eval at wrap (F:\github\Blog\blog\node_modules\pug-runtime\wrap.js:6:10), <anonymous>:8:49)
    at template (eval at wrap (F:\github\Blog\blog\node_modules\pug-runtime\wrap.js:6:10), <anonymous>:329:53)
    at _View._compiledSync (F:\github\Blog\blog\node_modules\hexo\lib\theme\view.js:132:24)
    at _View.renderSync (F:\github\Blog\blog\node_modules\hexo\lib\theme\view.js:59:25)
    at F:\github\Blog\blog\node_modules\hexo\lib\plugins\helper\partial.js:31:52
    at Cache.apply (F:\github\Blog\blog\node_modules\hexo\node_modules\hexo-util\lib\cache.js:27:46)
    at Object.fragmentCache (F:\github\Blog\blog\node_modules\hexo\lib\plugins\helper\fragment_cache.js:11:34)
    at Object.partial (F:\github\Blog\blog\node_modules\hexo\lib\plugins\helper\partial.js:31:17)
    at eval (eval at wrap (F:\github\Blog\blog\node_modules\pug-runtime\wrap.js:6:10), <anonymous>:149:46)
    at template (eval at wrap (F:\github\Blog\blog\node_modules\pug-runtime\wrap.js:6:10), <anonymous>:5213:93)
    at _View._compiled (F:\github\Blog\blog\node_modules\hexo\lib\theme\view.js:136:50)
    at _View.render (F:\github\Blog\blog\node_modules\hexo\lib\theme\view.js:39:17)
    at F:\github\Blog\blog\node_modules\hexo\lib\hexo\index.js:64:21
    at tryCatcher (F:\github\Blog\blog\node_modules\hexo\node_modules\bluebird\js\release\util.js:16:23)
    at F:\github\Blog\blog\node_modules\hexo\node_modules\bluebird\js\release\method.js:15:34
    at RouteStream._read (F:\github\Blog\blog\node_modules\hexo\lib\hexo\router.js:30:5)
    at RouteStream.Readable.read (_stream_readable.js:490:10)
    at resume_ (_stream_readable.js:975:12)
    at processTicksAndRejections (internal/process/task_queues.js:80:21) {
  path: 'F:\\github\\Blog\\blog\\themes\\Butterfly\\layout\\includes\\head.pug'
}
```

> algolia 插件安裝後還需要配置
> 查看插件文檔配置

### 頂部出現 Loading

> 生成前先 hexo clean

{% btn '/posts/4073eda/',⚡️ Butterfly 安裝文檔(六) 進階教程,far fa-hand-point-right,block orange right larger %}

### 點擊中文目錄報錯的問題

這種情況出現在主題為 `3.0.0`以下版本，升級主題就行
