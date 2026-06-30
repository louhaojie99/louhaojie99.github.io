---
title: Butterfly 安裝文檔(三) 主題配置-1
date: 2019-01-03 22:31:46
tags:
  - 教程
  - Hexo
  - 主題
  - butterfly
categories: Docs文檔
keywords: "hexo,butterfly,主題,doc,教程,文檔"
description: Butterfly安裝文檔-主題配置
cover: https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/butterfly-docs-03-cover.png
abbrlink: 4aa8abbe
comments: false
---

{% note blue 'fas fa-bullhorn' %}

📖 本教程更新於 2021 年 02 月 04 日，教程的內容針對最新**穩定版**而更新（如果你是舊版，教程會有些出入，請留意）

🦋 Butterfly 已經更新到 [3.6.2](https://github.com/jerryc127/hexo-theme-butterfly/releases/tag/3.6.2)

{% endnote %}

{% note green 'fas fa-rocket' %}

📚 文檔目錄

{% post_link 01_ButterFly/Butterfly-安裝文檔-一-快速開始 ' 🚀 快速開始' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-二-主題頁面 ' 📑 主題頁面' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-三-主題配置-1 ' 🛠 主題配置-1' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-四-主題配置-2 ' ⚔️ 主題配置-2' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-五-主題問答 ' ❓ 主題問答' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-六-進階教程 ' ⚡️ 進階教程' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-七-更新日誌 ' ✨ 更新日誌' %}

{% endnote %}

{% note orange 'fas fa-magic' %}

你可以通過右下角的 **簡** 按鈕切換為簡體顯示

{% endnote %}

---

## 語言

修改站點配置文件 `_config.yml`

默認語言是 en

主題支持三種語言

- default(en)
- zh-CN (簡體中文)
- zh-TW (繁體中文)

## 網站資料

修改網站各種資料，例如標題、副標題和郵箱等個人資料，請修改博客根目錄的`_config.yml`

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/20191120000444.png)

## 導航菜單

修改 `主題配置文件`

```yaml
Home: / || fas fa-home
Archives: /archives/ || fas fa-archive
Tags: /tags/ || fas fa-tags
Categories: /categories/ || fas fa-folder-open
List||fas fa-list:
  Music: /music/ || fas fa-music
  Movie: /movies/ || fas fa-video
Link: /link/ || fas fa-link
About: /about/ || fas fa-heart
```

必須是 `/xxx/`，後面`||`分開，然後寫圖標名。

如果不希望顯示圖標，圖標名可不寫

**注意：** 導航的文字可自行更改

例如：

```markdown
menu:
首頁: / || fas fa-home
時間軸: /archives/ || fas fa-archive
標籤: /tags/ || fas fa-tags
分類: /categories/ || fas fa-folder-open
清單||fa fa-heartbeat:
音樂: /music/ || fas fa-music
照片: /Gallery/ || fas fa-images
電影: /movies/ || fas fa-video
友鏈: /link/ || fas fa-link
關於: /about/ || fas fa-heart
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-menu.png)

## 代碼

{% note info %}

代碼塊中的所有功能只適用於 Hexo 自帶的代碼渲染

如果使用第三方的渲染器，不一定會有效

{% endnote %}

### 代碼高亮主題

{% tabs highlight-theme %}

<!-- tab 默認主題 -->

`Butterfly` 支持 6 種代碼高亮樣式：

- darker
- pale night
- light
- ocean
- mac
- mac light

修改 `主題配置文件`

```yaml
highlight_theme: light
```

> darker

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-code-darker.png)

> pale night

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-code-pale-night.png)

> light

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-code-light.png)

> ocean

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-highlight-ocean.png)

> mac

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-highlight-mac.png)

> mac light

![image-20200731175026827](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-mac-light.png)

<!-- endtab -->

<!-- tab 自定義主題 -->

主題從 3.0 開始，支持使用自定義的代碼顔色。

如何自定義主題，請查看下面這篇文章。

{% post_link 01_ButterFly/Butterfly-安裝文檔-六-進階教程#自定義代碼配色 ' 自定義代碼配色' %}

<!-- endtab -->

{% endtabs %}

### 代碼複製

主題支持代碼複製功能

修改 `主題配置文件`

```yaml
highlight_copy: true
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-code-copy.png)

### 代碼框展開/關閉

在默認情況下，代碼框自動展開，可設置是否所有代碼框都關閉狀態，點擊`>`可展開代碼

- true 全部代碼框不展開，需點擊`>`打開
- false 代碼狂展開，有`>`點擊按鈕
- none 不顯示`>`按鈕

修改 `主題配置文件`

```yaml
highlight_shrink: true #代碼框不展開，需點擊 '>' 打開
```

{% note info %}

你也可以在 post/page 頁對應的 markdown 文件 front-matter 添加 highlight_shrink 來獨立配置。

當**主題配置文件中**的 `highlight_shrink `設為 true 時，可在 front-matter 添加`highlight_shrink: false`來單獨配置文章展開代碼框。

當**主題配置文件中**的 `highlight_shrink `設為 false 時，可在 front-matter 添加`highlight_shrink: true`來單獨配置文章收縮代碼框。

{% endnote %}

`highlight_shrink: true`

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-highlight-shrink-true.png)

`highlight_shrink: false`

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-highlight-shrink-false.png)

`highlight_shrink: none`

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-highlight-shirk-none.png)

### 代碼換行

在默認情況下，Hexo 在編譯的時候不會實現代碼自動換行。如果你不希望在代碼塊的區域裏有橫向滾動條的話，那麼你可以考慮開啟這個功能。

修改 `主題配置文件`

```yaml
code_word_wrap: true
```

如果你是使用 highlight 渲染，需要找到你站點的 Hexo 配置文件`_config.yml`，將`line_number`改成`false`:

```yaml
highlight:
  enable: true
  line_number: false # <- 改這裏
  auto_detect: false
  tab_replace:
```

如果你是使用 prismjs 渲染，需要找到你站點的 Hexo 配置文件`_config.yml`，將`line_number`改成`false`:

```yaml
prismjs:
  enable: false
  preprocess: true
  line_number: false # <- 改這裏
  tab_replace: ""
```

> 設置`code_word_wrap`之前:

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-code-word-wrap-before.png)

> 設置`code_word_wrap`之後:

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-code-word-wrap-after.png)

### 代碼高度限制

> 3.7.0 及以上支持

可配置代碼高度限制，超出的部分會隱藏，並顯示展開按鈕。

```yaml
highlight_height_limit: false # unit: px
```

注意：

1. 單位是 `px`，直接添加數字，如 200

2. 實際限制高度為 `highlight_height_limit + 30 px` ，多增加 30px 限制，目的是避免代碼高度只超出 highlight_height_limit 一點時，出現展開按鈕，展開沒內容。

3. 不適用於隱藏後的代碼塊（ css 設置 display: none）

![hexo-theme-butterfly-docs-highlight-heigh-limit](https://cdn.jsdelivr.net/gh/jerryc127/CDN@m2/img/hexo-theme-butterfly-docs-highlight-heigh-limit.gif)

## 社交圖標

Butterfly 支持 [font-awesome v5](https://fontawesome.com/icons?from=io)圖標.

書寫格式 `圖標名：url || 描述性文字`

```yaml
social:
  fab fa-github: https://github.com/xxxxx || Github
  fas fa-envelope: mailto:xxxxxx@gmail.com || Email
```

圖標名可在這尋找

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-fontawesome.png)

PC:

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-social-icon-pc.png)

Mobile:

![1560603353743](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-socila-icon-mobile.png)

## 主頁文章節選(自動節選和文章頁 description)

因為主題 UI 的關係，`主頁文章節選`只支持`自動節選`和`文章頁description`。

在`butterfly`裏，有四種可供選擇

1. **description：** 只顯示 description
2. **both：** 優先選擇 description，如果沒有配置 description，則顯示自動節選的內容
3. **auto_excerpt：**只顯示自動節選
4. **false：** 不顯示文章內容

修改 `主題配置文件`

```yaml
index_post_content:
  method: 3
  length: 500 # if you set method to 2 or 3, the length need to config
```

`description`在 front-matter 裏添加

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-post-description.png)

## 頂部圖

{% note info %}

如果不要顯示頂部圖，可直接配置 `disable_top_img: true`

{% endnote %}

配置中的值：

| 配置             | 解釋                                                                |
| ---------------- | ------------------------------------------------------------------- |
| index_img        | 主頁的 top_img                                                      |
| default_top_img  | 默認的 top_img，當頁面的 top_img 沒有配置時，會顯示 default_top_img |
| archive_img      | 歸檔頁面的 top_img                                                  |
| tag_img          | tag 子頁面 的 默認 top_img                                          |
| tag_per_img      | tag 子頁面的 top_img，可配置每個 tag 的 top_img                     |
| category_img     | category 子頁面 的 默認 top_img                                     |
| category_per_img | category 子頁面的 top_img，可配置每個 category 的 top_img           |

其它頁面 （tags/categories/自建頁面）和 文章頁 的 `top_img` ，請到對應的 md 頁面設置`front-matter`中的`top_img`

以上所有的 top_img 可配置以下值

> **3.2.0 以下**版本的配置只支持
>
> - 留空，true 和 false - 顯示默認的顔色
> - img 鏈接 - 顯示所配置的圖片

| 配置的值                                                                                                                                       | 效果                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 留空                                                                                                                                           | 顯示默認的 top_img（如有），否則顯示默認的顔色<br>（文章頁 top_img 留空的話，會顯示 cover 的值） |
| img 鏈接                                                                                                                                       | 圖片的鏈接，顯示所配置的圖片                                                                     |
| 顔色(<br>HEX 值 - \#0000FF<br>RGB 值 - rgb(0,0,255)<br>顔色單詞 - orange<br>漸變色 - linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%)<br>） | 對應的顔色                                                                                       |
| transparent                                                                                                                                    | 透明                                                                                             |
| false                                                                                                                                          | 不顯示 top_img                                                                                   |

`tag_per_img` 和 `category_per_img` 是 3.2.0 新增的內容，可對 tag 和 category 進行單獨的配置

並不推薦為每個 tag 和每個 category 都配置不同的頂部圖，因為配置太多會拖慢生成速度

```yaml
tag_per_img：
  aplayer: https://xxxxxx.png
  android: ddddddd.png

category_per_img：
  隨想: hdhdh.png
  推薦: ddjdjdjd.png
```

> top_img: false

![image-20200924224536013](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/theme-butterfly-docs-page-top-img-false.png)

![image-20201027210949089](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/theme-butterfly-docs-post-top-img-false-new.png)

> top_img: orange

![image-20200924225024153](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/theme-butterfly-docs-top-img-orange.png)

> top_img: 'linear-gradient(20deg, #0062be, #925696, #cc426e, #fb0347)'

![image-20200924225300934](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/theme-butterfly-docs-top-img-color.png)

## 文章置頂

【推薦】[`hexo-generator-index`](https://github.com/hexojs/hexo-generator-index)從 2.0.0 開始，已經支持文章置頂功能。你可以直接在文章的`front-matter`區域裏添加`sticky: 1`屬性來把這篇文章置頂。數值越大，置頂的優先級越大。

## 文章封面

文章的 markdown 文檔上,在`Front-matter`添加`cover`,並填上要顯示的圖片地址。
如果不配置`cover`,可以設置顯示默認的 cover.

如果不想在首頁顯示 cover,可以設置為`false`

修改 `主題配置文件`

```yaml
cover:
  # 是否顯示文章封面
  index_enable: true
  aside_enable: true
  archives_enable: true
  # 封面顯示的位置
  # 三個值可配置 left , right , both
  position: both
  # 當沒有設置cover時，默認的封面顯示
  default_cover:
```

當配置多張圖片時,會隨機選擇一張作為 cover.此時寫法應為

```yaml
default_cover:
  - https://cdn.jsdelivr.net/gh/jerryc127/CDN@latest/cover/default_bg.png
  - https://cdn.jsdelivr.net/gh/jerryc127/CDN@latest/cover/default_bg2.png
  - https://cdn.jsdelivr.net/gh/jerryc127/CDN@latest/cover/default_bg3.png
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-post-cover.png)
![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-post-cover-show.png)

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-cover-false.png)

> left

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-cover-left.png)

> right

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-cover-right.png)

> both

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-cover-both.png)

## 文章頁相關配置

### 文章 meta 顯示

這個選項是用來顯示文章的相關信息的。

修改 `主題配置文件`

```yaml
post_meta:
  page:
    date_type: both # created or updated or both 主頁文章日期是創建日或者更新日或都顯示
    date_format: relative # date/relative 顯示日期還是相對日期
    categories: true # true or false 主頁是否顯示分類
    tags: true # true or false 主頁是否顯示標籤
    label: true # true or false 顯示描述性文字
  post:
    date_type: both # created or updated or both 文章頁日期是創建日或者更新日或都顯示
    date_format: relative # date/relative 顯示日期還是相對日期
    categories: true # true or false 文章頁是否顯示分類
    tags: true # true or false 文章頁是否顯示標籤
    label: true # true or false 顯示描述性文字
```

> 主頁

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-page-meta.png)

> 文章頁

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-post-info.png)

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-post-tag.png)

`date_format` 是 3.2.0 新增的內容，配置時間顯示明確時間還是相對時間

> 相對時間

![image-20200928201701560](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/theme-butterfly-docs-relative-time.png)

> 明確時間

![image-20200928201911032](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/theme-butterfly-docs-full-date.png)

### 文章版權

為你的博客文章展示文章版權和許可協議。

修改 `主題配置文件`

```yaml
post_copyright:
  enable: true
  decode: false
  license: CC BY-NC-SA 4.0
  license_url: https://creativecommons.org/licenses/by-nc-sa/4.0/
```

由於`Hexo 4.1`開始，默認對網址進行解碼，以至於如果是中文網址，會被解碼，可設置`decode: true`來顯示中文網址。

如果有文章（例如：轉載文章）不需要顯示版權，可以在文章 Front-matter 單獨設置

```yaml
copyright: false
```

從`3.0.0`開始，支持對單獨文章設置版權信息，可以在文章 Front-matter 單獨設置

```markdown
copyright_author: xxxx
copyright_author_href: https://xxxxxx.com
copyright_url: https://xxxxxx.com
copyright_info: 此文章版權歸 xxxxx 所有，如有轉載，請註明來自原作者
```

**版權顯示截圖**

![image-20210130161913121](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-post-copyright.png)

### 文章打賞

在你每篇文章的結尾，可以添加打賞按鈕。相關二維碼可以自行配置。

對於沒有提供二維碼的，可配置一張軟件的 icon 圖片，然後在 link 上添加相應的打賞鏈接。用户點擊圖片就會跳轉到鏈接去。

link 可以不寫，會默認為圖片的鏈接。

修改 `主題配置文件`

```yaml
reward:
  enable: true
  QR_code:
    - img: /img/wechat.jpg
      link:
      text: 微信
    - img: /img/alipay.jpg
      link:
      text: 支付寶
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-post-donate.png)

### TOC

在文章頁，會有一個目錄，用於顯示 TOC。

修改 `主題配置文件`

```yaml
toc:
  enable: true
  number: true
  style_simple: true
```

| 屬性         | 解釋                             |
| ------------ | -------------------------------- |
| enable       | 是否顯示 TOC                     |
| number       | 是否顯示章節數                   |
| style_simple | 簡潔模式（側邊欄**只**顯示 TOC） |

> Toc PC

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-toc-pc-new.png)

> Toc Mobile

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-toc-mobile-new.png)

> style_simple: true

![image-20201209232104167](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-toc-style-simple.png)

#### 為特定的文章配置

在你的文章`md`文件的頭部，加入`toc_number`和`toc`，並配置`true`或者`false`即可。

主題會優先判斷文章 Markdown 的 Front-matter 是否有配置，如有，則以 Front-matter 的配置為準。否則，以**主題配置文件中**的配置為準

### 相關文章

相關文章推薦的原理是根據文章 tags 的比重來推薦

修改 `主題配置文件`

```yaml
related_post:
  enable: true
  limit: 6 # 顯示推薦文章數目
  date_type: created # or created or updated 文章日期顯示創建日或者更新日
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-releatedpost.png)

### 文章錨點

開啟文章錨點後，當你在文章頁進行滾動時，文章鏈接會根據標題 ID 進行替換
(注意: 每替換一次，會留下一個歷史記錄。所以如果一篇文章有很多錨點的話，網頁的歷史記錄會很多。)

修改 `主題配置文件`

```yaml
# anchor
# when you scroll in post , the url will update according to header id.
anchor: true
```

### 文章過期提醒

可設置是否顯示文章過期提醒，以更新時間為基準。

```markdown
# Displays outdated notice for a post (文章過期提醒)

noticeOutdate:
enable: true
style: flat # style: simple/flat
limit_day: 365 # When will it be shown
position: top # position: top/bottom
message_prev: It has been
message_next: days since the last update, the content of the article may be outdated.
```

` limit_day`： 距離更新時間多少天才顯示文章過期提醒

`message_prev` ： 天數之前的文字

`message_next`：天數之後的文字

> style: flat

![image-20200731175909296](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butteffly-docs-outdate-flat.png)

> style: simple

![image-20200731180037968](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-outdated-simple.png)

### 文章編輯按鈕

在文章標題旁邊顯示一個編輯按鈕，點擊會跳轉到對應的鏈接去。

```yaml
# Post edit
# Easily browse and edit blog source code online.
post_edit:
  enable: false
  # url: https://github.com/user-name/repo-name/edit/branch-name/subdirectory-name/
  # For example: https://github.com/jerryc127/butterfly.js.org/edit/main/source/
  url:
```

![image-20210130160108360](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-post-edit.png)

![image-20210130160208436](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-post-edit-2.png)

### 文章分頁按鈕

可設置分頁的邏輯，也可以關閉分頁顯示

```yaml
# post_pagination (分頁)
# value: 1 || 2 || false
# 1: The 'next post' will link to old post
# 2: The 'next post' will link to new post
# false: disable pagination
post_pagination: false
```

| 參數                   | 解釋                 |
| ---------------------- | -------------------- |
| post_pagination: false | 關閉分頁按鈕         |
| post_pagination: 1     | 下一篇顯示的是舊文章 |
| post_pagination: 2     | 下一篇顯示的是新文章 |

![image-20210130161545100](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-post-pagination.png)

## 頭像

修改 `主題配置文件`

```yaml
avatar:
  img: /img/avatar.png
  effect: true # 頭像會一直轉圈
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-avatar.png)

## 圖片描述

可開啟圖片 Figcaption 描述文字顯示

修改 `主題配置文件`

```yaml
photofigcaption: true
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-photo-figcaption.png)

## 複製相關配置

可配置網站是否可以複製、複製的內容是否添加版權信息

```markdown
# copy settings

# copyright: Add the copyright information after copied content (複製的內容後面加上版權信息)

copy:
enable: true
copyright:
enable: true
limit_count: 50
```

| 配置        | 解釋                                                                   |
| ----------- | ---------------------------------------------------------------------- |
| enable      | 是否開啟網站複製權限                                                   |
| copyright   | 複製的內容後面加上版權信息                                             |
| enable      | 是否開啟複製版權信息添加                                               |
| limit_count | 字數限制，當複製文字大於這個字數限制時，將在複製的內容後面加上版權信息 |

> 添加版權信息後

```
Lorem ipsum dolor sit amet, test link consectetur adipiscing elit. Strong text pellentesque ligula commodo viverra vehicula. Italic text at ullamcorper enim. Morbi a euismod nibh. Underline text non elit nisl. Deleted text tristique, sem id condimentum tempus, metus lectus venenatis mauris, sit amet semper lorem felis a eros. Fusce egestas nibh at sagittis auctor. Sed ultricies ac arcu quis molestie. Donec dapibus nunc in nibh egestas, vitae volutpat sem iaculis. Curabitur sem tellus, elementum nec quam id, fermentum laoreet mi. Ut mollis ullamcorper turpis, vitae facilisis velit ultricies sit amet. Etiam laoreet dui odio, id tempus justo tincidunt id. Phasellus scelerisque nunc sed nunc ultricies accumsan.


作者: Jerry
連結: http://localhost:4000/posts/bd3c650b/#Paragraph
來源: Butterfly
著作權歸作者所有。商業轉載請聯絡作者獲得授權，非商業轉載請註明出處。
```

## Footer 設置

### 博客年份

`since`是一個來展示你站點起始時間的選項。它位於頁面的最底部。

修改 `主題配置文件`

```yaml
footer:
  owner:
    enable: true
    since: 2018
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-since.png)

### 頁腳自定義文本

`custom_text`是一個給你用來在頁腳自定義文本的選項。通常你可以在這裏寫聲明文本等。支持 HTML。

修改 `主題配置文件`

```yaml
custom_text: Hi, welcome to my <a href="https://butterfly.js.org/">blog</a>!
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-footer-text.png)

對於部分人需要寫 ICP 的，也可以寫在 `custom_text`裏

```yaml
custom_text: <a href="icp鏈接"><img class="icp-icon" src="icp圖片"><span>備案號：xxxxxx</span></a>
```

## 右下角按鈕

### 簡繁轉換

簡體繁體互換

右下角會有簡繁轉換按鈕。

修改 `主題配置文件`

```yaml
translate:
  enable: true
  # 默認按鈕顯示文字(網站是簡體，應設置為'default: 繁')
  default: 簡
  #網站默認語言，1: 繁體中文, 2: 簡體中文
  defaultEncoding: 1
  #延遲時間,若不在前, 要設定延遲翻譯時間, 如100表示100ms,默認為0
  translateDelay: 0
  #當文字是簡體時，按鈕顯示的文字
  msgToTraditionalChinese: "繁"
  #當文字是繁體時，按鈕顯示的文字
  msgToSimplifiedChinese: "簡"
```

> 簡體

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-simp.png)

> 繁體

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-tranditional.png)

### 夜間模式

右下角會有夜間模式按鈕

修改 `主題配置文件`

```yaml
# dark mode
darkmode:
  enable: true
  # dark mode和 light mode切換按鈕
  button: true
  autoChangeMode: false
```

![image-20201230201029381](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-dark-mode-1.png)

{% note info %}
V2.0.0 開始增加一個選項，可開啟自動切換 light mode 和 dark mode

autoChangeMode: 1 跟隨系統而變化，不支持的瀏覽器/系統將按照時間晚上 6 點到早上 6 點之間切換為 dark mode

autoChangeMode: 2 只按照時間 晚上 6 點到早上 6 點之間切換為 dark mode,其餘時間為 light mode

autoChangeMode: false 取消自動切換
{% endnote %}

### 閲讀模式

閲讀模式下會去掉除文章外的內容，避免幹擾閲讀。

只會出現在文章頁面，右下角會有閲讀模式按鈕。

修改 `主題配置文件`

```yaml
readmode: true
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-read-mode.png)

### 字體大小

可以改變字體大小（最小隻能到 10px，最大隻能到 20px）

修改 `主題配置文件`

```yaml
# Change font size
change_font_size: true
```

## 側邊欄設置

### 側邊排版

可自行決定哪個項目需要顯示，可決定位置，也可以設置不顯示側邊欄。

修改 `主題配置文件`

```yaml
aside:
  enable: true
  hide: false
  button: true
  mobile: true # 手機頁面（ 顯示寬度 < 768px ）是否顯示aside內容
  position: right # left or right
  card_author:
    enable: true
    description:
    button:
      enable: true
	  icon: fab fa-github
      text: Github
      link: https://github.com/jerryc127/hexo-theme-butterfly
  card_announcement:
    enable: true
    content: This is my Blog
  card_recent_post:
    enable: true
    limit: 5 # if set 0 will show all
    sort: date # date or updated
  card_categories:
    enable: true
    limit: 8 # if set 0 will show all
    expand: none # none/true/false
  card_tags:
    enable: true
    limit: 40 # if set 0 will show all
    color: false
  card_archives:
    enable: true
    type: monthly # yearly or monthly
    format: MMMM YYYY # eg: YYYY年MM月
    order: -1 # Sort of order. 1, asc for ascending; -1, desc for descending
    limit: 8 # if set 0 will show all
  card_webinfo:
    enable: true
    post_count: true
    last_push_date: true
```

> position: left

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-aside-left.png)

> position: right

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-aside-right.png)

> card_tags color: false

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/20200426182730.png)

> card_tags color: true

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/20200426183025.png)

> aside button

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-aside-button.gif)

### 訪問人數 busuanzi (UV 和 PV)

訪問 busuanzi 的[官方網站](http://busuanzi.ibruce.info/)查看更多的介紹。

修改 `主題配置文件`

```yaml
busuanzi:
  site_uv: true
  site_pv: true
  page_pv: true
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-busuanzi-site-pv.png)

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-pv.png)

### 運行時間

網頁已運行時間

修改 `主題配置文件`

```yaml
runtimeshow:
  enable: true
  publish_date: 6/7/2018 00:00:00
  ##網頁開通時間
  #格式: 月/日/年 時間
  #也可以寫成 年/月/日 時間
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-runtime.png)

### 最新評論

> 3.1.0 起支持

{% note primary %}

最新評論只會在刷新時才會去讀取，並不會實時變化

由於 API 有 訪問次數限制，為了避免調用太多，主題默認存取期限為 10 分鐘。也就是説，調用後資料會存在 _localStorage_ 裏，10 分鐘內刷新網站只會去 _localStorage_ 讀取資料。 10 分鐘期限一過，刷新頁面時才會去調取 API 讀取新的數據。（ 3.6.0 新增了 `storage` 配置，可自行配置緩存時間）

{% endnote %}

在側邊欄顯示最新評論板塊

修改 `主題配置文件`

```js
# Aside widget - Newest Comments
newest_comments:
  enable: true
  sort_order: # Don't modify the setting unless you know how it works
  limit: 6
  storage: 10 # unit: mins, save data to localStorage
  avatar: true
```

部分配置解釋：

| 配置    | 解釋                    |
| ------- | ----------------------- |
| limit   | 顯示的數量              |
| storage | 設置緩存時間，單位 分鐘 |
| avatar  | 是否顯示頭像            |

> Demo

![image-20200830223037320](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-newest-comments.png)

### 自定義添加欄目

{% btn '/posts/ea33ab97/','點擊前往',fas fa-lightbulb,block green %}

## 標籤外掛（Tag Plugins）

{% note info %}

標籤外掛是 Hexo 獨有的功能，並不是標準的 Markdown 格式。

以下的寫法，只適用於 Butterfly 主題，用在其它主題上不會有效果，甚至可能會報錯。使用前請留意

{% endnote %}

{% note warning %}

標籤外掛雖然能為主題帶來一些額外的功能和 UI 方面的強化，但是，標籤外掛也有明顯的限制，使用時請留意。

{% endnote %}

### Note (Bootstrap Callout)

{% tabs note %}

<!-- tab 通用設置 -->

移植於 next 主題，並進行修改。

修改 `主題配置文件`

```yaml
note:
  # Note tag style values:
  #  - simple    bs-callout old alert style. Default.
  #  - modern    bs-callout new (v2-v3) alert style.
  #  - flat      flat callout style with background, like on Mozilla or StackOverflow.
  #  - disabled  disable all CSS styles import of note tag.
  style: simple
  icons: false
  border_radius: 3
  # Offset lighter of background in % for modern and flat styles (modern: -12 | 12; flat: -18 | 6).
  # Offset also applied to label tag variables. This option can work with disabled note tag.
  light_bg_offset: 0
```

`icons`和`light_bg_offset`只對*方法一*生效

Note 標籤外掛有兩種用法

<!-- endtab -->

<!-- tab 用法 1 -->

```markdown
{% note [class] [no-icon] [style] %}
Any content (support inline tags too.io).
{% endnote %}
```

| 名稱    | 用法                                                                                                |
| ------- | --------------------------------------------------------------------------------------------------- |
| class   | 【可選】標識，不同的標識有不同的配色<br>（ default / primary / success / info / warning / danger ） |
| no-icon | 【可選】不顯示 icon                                                                                 |
| style   | 【可選】可以覆蓋配置中的 style <br>（simple/modern/flat/disabled）                                  |

> simple

```markdown
{% note simple %}
默認 提示塊標籤
{% endnote %}

{% note default simple %}
default 提示塊標籤
{% endnote %}

{% note primary simple %}
primary 提示塊標籤
{% endnote %}

{% note success simple %}
success 提示塊標籤
{% endnote %}

{% note info simple %}
info 提示塊標籤
{% endnote %}

{% note warning simple %}
warning 提示塊標籤
{% endnote %}

{% note danger simple %}
danger 提示塊標籤
{% endnote %}
```

{% note simple %}
默認 提示塊標籤
{% endnote %}

{% note default simple %}
default 提示塊標籤
{% endnote %}

{% note primary simple %}
primary 提示塊標籤
{% endnote %}

{% note success simple %}
success 提示塊標籤
{% endnote %}

{% note info simple %}
info 提示塊標籤
{% endnote %}

{% note warning simple %}
warning 提示塊標籤
{% endnote %}

{% note danger simple %}
danger 提示塊標籤
{% endnote %}

> modern

```markdown
{% note modern %}
默認 提示塊標籤
{% endnote %}

{% note default modern %}
default 提示塊標籤
{% endnote %}

{% note primary modern %}
primary 提示塊標籤
{% endnote %}

{% note success modern %}
success 提示塊標籤
{% endnote %}

{% note info modern %}
info 提示塊標籤
{% endnote %}

{% note warning modern %}
warning 提示塊標籤
{% endnote %}

{% note danger modern %}
danger 提示塊標籤
{% endnote %}
```

{% note modern %}
默認 提示塊標籤
{% endnote %}

{% note default modern %}
default 提示塊標籤
{% endnote %}

{% note primary modern %}
primary 提示塊標籤
{% endnote %}

{% note success modern %}
success 提示塊標籤
{% endnote %}

{% note info modern %}
info 提示塊標籤
{% endnote %}

{% note warning modern %}
warning 提示塊標籤
{% endnote %}

{% note danger modern %}
danger 提示塊標籤
{% endnote %}

> flat

```markdown
{% note flat %}
默認 提示塊標籤
{% endnote %}

{% note default flat %}
default 提示塊標籤
{% endnote %}

{% note primary flat %}
primary 提示塊標籤
{% endnote %}

{% note success flat %}
success 提示塊標籤
{% endnote %}

{% note info flat %}
info 提示塊標籤
{% endnote %}

{% note warning flat %}
warning 提示塊標籤
{% endnote %}

{% note danger flat %}
danger 提示塊標籤
{% endnote %}
```

{% note flat %}
默認 提示塊標籤
{% endnote %}

{% note default flat %}
default 提示塊標籤
{% endnote %}

{% note primary flat %}
primary 提示塊標籤
{% endnote %}

{% note success flat %}
success 提示塊標籤
{% endnote %}

{% note info flat %}
info 提示塊標籤
{% endnote %}

{% note warning flat %}
warning 提示塊標籤
{% endnote %}

{% note danger flat %}
danger 提示塊標籤
{% endnote %}

> disabled

```markdown
{% note disabled %}
默認 提示塊標籤
{% endnote %}

{% note default disabled %}
default 提示塊標籤
{% endnote %}

{% note primary disabled %}
primary 提示塊標籤
{% endnote %}

{% note success disabled %}
success 提示塊標籤
{% endnote %}

{% note info disabled %}
info 提示塊標籤
{% endnote %}

{% note warning disabled %}
warning 提示塊標籤
{% endnote %}

{% note danger disabled %}
danger 提示塊標籤
{% endnote %}
```

{% note disabled %}
默認 提示塊標籤
{% endnote %}

{% note default disabled %}
default 提示塊標籤
{% endnote %}

{% note primary disabled %}
primary 提示塊標籤
{% endnote %}

{% note success disabled %}
success 提示塊標籤
{% endnote %}

{% note info disabled %}
info 提示塊標籤
{% endnote %}

{% note warning disabled %}
warning 提示塊標籤
{% endnote %}

{% note danger disabled %}
danger 提示塊標籤
{% endnote %}

> no-icon

```markdown
{% note no-icon %}
默認 提示塊標籤
{% endnote %}

{% note default no-icon %}
default 提示塊標籤
{% endnote %}

{% note primary no-icon %}
primary 提示塊標籤
{% endnote %}

{% note success no-icon %}
success 提示塊標籤
{% endnote %}

{% note info no-icon %}
info 提示塊標籤
{% endnote %}

{% note warning no-icon %}
warning 提示塊標籤
{% endnote %}

{% note danger no-icon %}
danger 提示塊標籤
{% endnote %}
```

{% note no-icon %}
默認 提示塊標籤
{% endnote %}

{% note default no-icon %}
default 提示塊標籤
{% endnote %}

{% note primary no-icon %}
primary 提示塊標籤
{% endnote %}

{% note success no-icon %}
success 提示塊標籤
{% endnote %}

{% note info no-icon %}
info 提示塊標籤
{% endnote %}

{% note warning no-icon %}
warning 提示塊標籤
{% endnote %}

{% note danger no-icon %}
danger 提示塊標籤
{% endnote %}

<!-- endtab -->

<!-- tab 用法 2（自定義 icon）-->

> 3.2.0 以上版本支

```markdown
{% note [color] [icon] [style] %}
Any content (support inline tags too.io).
{% endnote %}
```

| 名稱  | 用法                                                                     |
| ----- | ------------------------------------------------------------------------ |
| color | 【可選】顔色 <br>(default / blue / pink / red / purple / orange / green) |
| icon  | 【可選】可配置自定義 icon (只支持 fontawesome 圖標, 也可以配置 no-icon ) |
| style | 【可選】可以覆蓋配置中的 style<br/>（simple/modern/flat/disabled）       |

> simple

```markdown
{% note 'fab fa-cc-visa' simple %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' simple %}
2021 年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' simple %}
小心開車 安全至上
{% endnote %}
{% note red 'fas fa-fan' simple%}
這是三片呢？還是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' simple %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' simple %}
剪刀石頭布
{% endnote %}
{% note green 'fab fa-internet-explorer' simple %}
前端最討厭的瀏覽器
{% endnote %}
```

{% note 'fab fa-cc-visa' simple %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' simple %}
2021 年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' simple %}
小心開車 安全至上
{% endnote %}
{% note red 'fas fa-fan' simple%}
這是三片呢？還是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' simple %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' simple %}
剪刀石頭布
{% endnote %}
{% note green 'fab fa-internet-explorer' simple %}
前端最討厭的瀏覽器
{% endnote %}

> modern

```markdown
{% note 'fab fa-cc-visa' modern %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' modern %}
2021 年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' modern %}
小心開車 安全至上
{% endnote %}
{% note red 'fas fa-fan' modern%}
這是三片呢？還是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' modern %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' modern %}
剪刀石頭布
{% endnote %}
{% note green 'fab fa-internet-explorer' modern %}
前端最討厭的瀏覽器
{% endnote %}
```

{% note 'fab fa-cc-visa' modern %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' modern %}
2021 年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' modern %}
小心開車 安全至上
{% endnote %}
{% note red 'fas fa-fan' modern%}
這是三片呢？還是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' modern %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' modern %}
剪刀石頭布
{% endnote %}
{% note green 'fab fa-internet-explorer' modern %}
前端最討厭的瀏覽器
{% endnote %}

> flat

```markdown
{% note 'fab fa-cc-visa' flat %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' flat %}
2021 年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' flat %}
小心開車 安全至上
{% endnote %}
{% note red 'fas fa-fan' flat%}
這是三片呢？還是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' flat %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' flat %}
剪刀石頭布
{% endnote %}
{% note green 'fab fa-internet-explorer' flat %}
前端最討厭的瀏覽器
{% endnote %}
```

{% note 'fab fa-cc-visa' flat%}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' flat%}
2021 年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' flat%}
小心開車 安全至上
{% endnote %}
{% note red 'fas fa-fan' flat %}
這是三片呢？還是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' flat %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' flat %}
剪刀石頭布
{% endnote %}
{% note green 'fab fa-internet-explorer' flat %}
前端最討厭的瀏覽器
{% endnote %}

> disabled

```markdown
{% note 'fab fa-cc-visa' disabled %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' disabled %}
2021 年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' disabled %}
小心開車 安全至上
{% endnote %}
{% note red 'fas fa-fan' disabled %}
這是三片呢？還是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' disabled %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' disabled %}
剪刀石頭布
{% endnote %}
{% note green 'fab fa-internet-explorer' disabled %}
前端最討厭的瀏覽器
{% endnote %}
```

{% note 'fab fa-cc-visa' disabled %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note blue 'fas fa-bullhorn' disabled %}
2021 年快到了....
{% endnote %}
{% note pink 'fas fa-car-crash' disabled %}
小心開車 安全至上
{% endnote %}
{% note red 'fas fa-fan' disabled %}
這是三片呢？還是四片？
{% endnote %}
{% note orange 'fas fa-battery-half' disabled %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note purple 'far fa-hand-scissors' disabled %}
剪刀石頭布
{% endnote %}
{% note green 'fab fa-internet-explorer' disabled %}
前端最討厭的瀏覽器
{% endnote %}

> no-icon

```markdown
{% note no-icon %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note blue no-icon %}
2021 年快到了....
{% endnote %}
{% note pink no-icon %}
小心開車 安全至上
{% endnote %}
{% note red no-icon %}
這是三片呢？還是四片？
{% endnote %}
{% note orange no-icon %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note purple no-icon %}
剪刀石頭布
{% endnote %}
{% note green no-icon %}
前端最討厭的瀏覽器
{% endnote %}
```

{% note no-icon %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note blue no-icon %}
2021 年快到了....
{% endnote %}
{% note pink no-icon %}
小心開車 安全至上
{% endnote %}
{% note red no-icon %}
這是三片呢？還是四片？
{% endnote %}
{% note orange no-icon %}
你是刷 Visa 還是 UnionPay
{% endnote %}
{% note purple no-icon %}
剪刀石頭布
{% endnote %}
{% note green no-icon %}
前端最討厭的瀏覽器
{% endnote %}

<!-- endtab -->

{% endtabs %}

### Gallery 相冊圖庫

> 2.2.0 以上提供

一個圖庫集合。

寫法

```
<div class="gallery-group-main">
{% galleryGroup name description link img-url %}
{% galleryGroup name description link img-url %}
{% galleryGroup name description link img-url %}
</div>
```

- name：圖庫名字
- description：圖庫描述
- link：連接到對應相冊的地址
- img-url：圖庫封面的地址

例如：

```
<div class="gallery-group-main">
{% galleryGroup '壁紙' '收藏的一些壁紙' '/Gallery/wallpaper' https://i.loli.net/2019/11/10/T7Mu8Aod3egmC4Q.png %}
{% galleryGroup '漫威' '關於漫威的圖片' '/Gallery/marvel' https://i.loli.net/2019/12/25/8t97aVlp4hgyBGu.jpg %}
{% galleryGroup 'OH MY GIRL' '關於OH MY GIRL的圖片' '/Gallery/ohmygirl' https://i.loli.net/2019/12/25/hOqbQ3BIwa6KWpo.jpg %}
</div>
```

<div class="gallery-group-main">
{% galleryGroup '壁紙' '收藏的一些壁紙' '/Gallery/wallpaper' https://i.loli.net/2019/11/10/T7Mu8Aod3egmC4Q.png %}
{% galleryGroup '漫威' '關於漫威的圖片' '/Gallery/marvel' https://i.loli.net/2019/12/25/8t97aVlp4hgyBGu.jpg %}
{% galleryGroup 'OH MY GIRL' '關於OH MY GIRL的圖片' '/Gallery/ohmygirl' https://i.loli.net/2019/12/25/hOqbQ3BIwa6KWpo.jpg %}
</div>

### Gallery 相冊

> 2.0.0 以上提供

區別於舊版的 Gallery 相冊,新的 Gallery 相冊會自動根據圖片長度進行排版，書寫也更加方便，與 markdown 格式一樣。可根據需要插入到相應的 md。

寫法:

```markdown
{% gallery %}
markdown 圖片格式
{% endgallery %}
```

例如

```markdown
{% gallery %}
![](https://i.loli.net/2019/12/25/Fze9jchtnyJXMHN.jpg)
![](https://i.loli.net/2019/12/25/ryLVePaqkYm4TEK.jpg)
![](https://i.loli.net/2019/12/25/gEy5Zc1Ai6VuO4N.jpg)
![](https://i.loli.net/2019/12/25/d6QHbytlSYO4FBG.jpg)
![](https://i.loli.net/2019/12/25/6nepIJ1xTgufatZ.jpg)
![](https://i.loli.net/2019/12/25/E7Jvr4eIPwUNmzq.jpg)
![](https://i.loli.net/2019/12/25/mh19anwBSWIkGlH.jpg)
![](https://i.loli.net/2019/12/25/2tu9JC8ewpBFagv.jpg)
{% endgallery %}
```

{% gallery %}
![](https://i.loli.net/2019/12/25/Fze9jchtnyJXMHN.jpg)
![](https://i.loli.net/2019/12/25/ryLVePaqkYm4TEK.jpg)
![](https://i.loli.net/2019/12/25/gEy5Zc1Ai6VuO4N.jpg)
![](https://i.loli.net/2019/12/25/d6QHbytlSYO4FBG.jpg)
![](https://i.loli.net/2019/12/25/6nepIJ1xTgufatZ.jpg)
![](https://i.loli.net/2019/12/25/E7Jvr4eIPwUNmzq.jpg)
![](https://i.loli.net/2019/12/25/mh19anwBSWIkGlH.jpg)
![](https://i.loli.net/2019/12/25/2tu9JC8ewpBFagv.jpg)
{% endgallery %}

### tag-hide

{% note warning %}

2.2.0 以上提供

請注意，tag-hide 內的標簽外掛 content 內都不建議有 h1 - h6 等標題。因為 Toc 會把隱藏內容標題也顯示出來，而且當滾動屏幕時，如果隱藏內容沒有顯示出來，會導致 Toc 的滾動出現異常。

{% endnote %}

如果你想把一些文字、內容隱藏起來，並提供按鈕讓用户點擊顯示。可以使用這個標籤外掛。

{% tabs tag-hide %}

<!-- tab Inline -->

`inline` 在文本里面添加按鈕隱藏內容，只限文字

( content 不能包含英文逗號，可用`&sbquo;`)

```markdown
{% hideInline content,display,bg,color %}
```

- content: 文本內容

- display: 按鈕顯示的文字(可選)

- bg: 按鈕的背景顏色(可選)

- color: 按鈕文字的顏色(可選)

> Demo

```markdown
哪個英文字母最酷？ {% hideInline 因為西裝褲(C裝酷),查看答案,#FF7242,#fff %}

門裏站着一個人? {% hideInline 閃 %}
```

哪個英文字母最酷？ {% hideInline 因為西裝褲(C裝酷),查看答案,#FF7242,#fff %}

門裏站着一個人? {% hideInline 閃 %}

<!-- endtab -->

<!-- tab Block -->

`block`獨立的 block 隱藏內容，可以隱藏很多內容，包括圖片，代碼塊等等

( display 不能包含英文逗號，可用`&sbquo;`)

```markdown
{% hideBlock display,bg,color %}
content
{% endhideBlock %}
```

- content: 文本內容
- display: 按鈕顯示的文字(可選)
- bg: 按鈕的背景顏色(可選)
- color: 按鈕文字的顏色(可選)

> Demo

```mark
查看答案
{% hideBlock 查看答案 %}
傻子，怎麼可能有答案
{% endhideBlock %}
```

查看答案
{% hideBlock 查看答案 %}
傻子，怎麼可能有答案
{% endhideBlock %}

<!-- endtab -->

<!-- tab Toggle -->

> 2.3.0 以上支持

如果你需要展示的內容太多，可以把它隱藏在收縮框裏，需要時再把它展開。

( display 不能包含英文逗號，可用`&sbquo;`)

```markdown
{% hideToggle display,bg,color %}
content
{% endhideToggle %}
```

> Demo

```markdown
{% hideToggle Butterfly安裝方法 %}
在你的博客根目錄裏

git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/Butterfly

如果想要安裝比較新的 dev 分支，可以

git clone -b dev https://github.com/jerryc127/hexo-theme-butterfly.git themes/Butterfly

{% endhideToggle %}
```

{% hideToggle Butterfly安裝方法 %}
在你的博客根目錄裏

git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/Butterfly

如果想要安裝比較新的 dev 分支，可以

git clone -b dev https://github.com/jerryc127/hexo-theme-butterfly.git themes/Butterfly

{% endhideToggle %}

<!-- endtab -->

{% endtabs %}

### mermaid

{% note warning %}
mermaid 標籤不允許嵌套於一些隱藏屬性的標籤外掛，例如: tag-hide 內的標籤外掛和 tabs 標籤外掛，這會導致 mermaid 圖示無法正常顯示，使用時請留意。

**請不要壓縮 html 代碼，不然會導致 mermaid 顯示異常**

{% endnote %}

使用 mermaid 標籤可以繪製 Flowchart（流程圖）、Sequence diagram（時序圖 ）、Class Diagram（類別圖）、State Diagram（狀態圖）、Gantt（甘特圖）和 Pie Chart（圓形圖），具體可以查看[mermaid 文檔](https://mermaid-js.github.io/mermaid/#/)

修改 `主題配置文件`

```yaml
mermaid:
  enable: true
  # built-in themes: default/forest/dark/neutral
  theme: default
```

寫法：

```markdown
{% mermaid %}
內容
{% endmermaid %}
```

例如：

```markdown
{% mermaid %}
pie
title Key elements in Product X
"Calcium" : 42.96
"Potassium" : 50.05
"Magnesium" : 10.01
"Iron" : 5
{% endmermaid %}
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-mermaid.png)

### Tabs

移植於 next 主題

使用方法

```markdown
{% tabs Unique name, [index] %}

<!-- tab [Tab caption] [@icon] -->

Any content (support inline tags too).

<!-- endtab -->

{% endtabs %}

Unique name : Unique name of tabs block tag without comma.
Will be used in #id's as prefix for each tab with their index numbers.
If there are whitespaces in name, for generate #id all whitespaces will replaced by dashes.
Only for current url of post/page must be unique!
[index] : Index number of active tab.
If not specified, first tab (1) will be selected.
If index is -1, no tab will be selected. It's will be something like spoiler.
Optional parameter.
[Tab caption] : Caption of current tab.
If not caption specified, unique name with tab index suffix will be used as caption of tab.
If not caption specified, but specified icon, caption will empty.
Optional parameter.
[@icon] : FontAwesome icon name (full-name, look like 'fas fa-font')
Can be specified with or without space; e.g. 'Tab caption @icon' similar to 'Tab caption@icon'.
Optional parameter.
```

> Demo 1 - 預設選擇第一個【默認】

```markdown
{% tabs test1 %}

<!-- tab -->

**This is Tab 1.**

<!-- endtab -->

<!-- tab -->

**This is Tab 2.**

<!-- endtab -->

<!-- tab -->

**This is Tab 3.**

<!-- endtab -->

{% endtabs %}
```

{% tabs test1 %}

<!-- tab -->

**This is Tab 1.**

<!-- endtab -->

<!-- tab -->

**This is Tab 2.**

<!-- endtab -->

<!-- tab -->

**This is Tab 3.**

<!-- endtab -->

{% endtabs %}

> Demo 2 - 預設選擇 tabs

```markdown
{% tabs test2, 3 %}

<!-- tab -->

**This is Tab 1.**

<!-- endtab -->

<!-- tab -->

**This is Tab 2.**

<!-- endtab -->

<!-- tab -->

**This is Tab 3.**

<!-- endtab -->

{% endtabs %}
```

{% tabs test2, 3 %}

<!-- tab -->

**This is Tab 1.**

<!-- endtab -->

<!-- tab -->

**This is Tab 2.**

<!-- endtab -->

<!-- tab -->

**This is Tab 3.**

<!-- endtab -->

{% endtabs %}

> Demo 3 - 沒有預設值

```markdown
{% tabs test3, -1 %}

<!-- tab -->

**This is Tab 1.**

<!-- endtab -->

<!-- tab -->

**This is Tab 2.**

<!-- endtab -->

<!-- tab -->

**This is Tab 3.**

<!-- endtab -->

{% endtabs %}
```

{% tabs test3, -1 %}

<!-- tab -->

**This is Tab 1.**

<!-- endtab -->

<!-- tab -->

**This is Tab 2.**

<!-- endtab -->

<!-- tab -->

**This is Tab 3.**

<!-- endtab -->

{% endtabs %}

> Demo 4 - 自定義 Tab 名 + 只有 icon + icon 和 Tab 名

```markdown
{% tabs test4 %}

<!-- tab 第一個Tab -->

**tab 名字為第一個 Tab**

<!-- endtab -->

<!-- tab @fab fa-apple-pay -->

**只有圖標 沒有 Tab 名字**

<!-- endtab -->

<!-- tab 炸彈@fas fa-bomb -->

**名字+icon**

<!-- endtab -->

{% endtabs %}
```

{% tabs test4 %}

<!-- tab 第一個Tab -->

**tab 名字為第一個 Tab**

<!-- endtab -->

<!-- tab @fab fa-apple-pay -->

**只有圖標 沒有 Tab 名字**

<!-- endtab -->

<!-- tab 炸彈@fas fa-bomb -->

**名字+icon**

<!-- endtab -->

{% endtabs %}

### Button

> 3.0 以上適用

使用方法：

```markdown
{% btn [url],[text],[icon],[color] [style] [layout] [position] [size] %}

[url] : 鏈接
[text] : 按鈕文字
[icon] : [可選] 圖標
[color] : [可選] 按鈕背景顔色(默認 style 時）
按鈕字體和邊框顔色(outline 時)
default/blue/pink/red/purple/orange/green
[style] : [可選] 按鈕樣式 默認實心
outline/留空
[layout] : [可選] 按鈕佈局 默認為 line
block/留空
[position] : [可選] 按鈕位置 前提是設置了 layout 為 block 默認為左邊
center/right/留空
[size] : [可選] 按鈕大小
larger/留空
```

> Demo

```markdown
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,,outline %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,larger %}
```

This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,,outline %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline %}
This is my website, click the button {% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,larger %}

```markdown
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,block %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,block center larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,block right outline larger %}
```

{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,block %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,block center larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,block right outline larger %}

**more than one button in center**

```markdown
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,blue larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,pink larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,red larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,purple larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,orange larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,green larger %}
```

{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,blue larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,pink larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,red larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,purple larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,orange larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,green larger %}

```markdown
<div class="btn-center">
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline blue larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline pink larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline red larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline purple larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline orange larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline green larger %}
</div>
```

<div class="btn-center">
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline blue larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline pink larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline red larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline purple larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline orange larger %}
{% btn 'https://butterfly.js.org/',Butterfly,far fa-hand-point-right,outline green larger %}
</div>

### inlineImg

主題中的圖片都是默認以`塊級元素`顯示，如果你想以`內聯元素`顯示，可以使用這個標簽外掛。

```markdown
{% inlineImg [src] [height] %}

[src] : 圖片鏈接
[height] ： 圖片高度限制【可選】
```

> Demo

```markdown
你看我長得漂亮不

![](https://i.loli.net/2021/03/19/2P6ivUGsdaEXSFI.png)

我覺得很漂亮 {% inlineImg https://i.loli.net/2021/03/19/5M4jUB3ynq7ePgw.png 150px %}
```

![image-20210319001204045](https://cdn.jsdelivr.net/gh/jerryc127/CDN@m2/img/hexo-theme-butterfly-docs-inlineimg.png)

### label

> 3.7.5 及以上版本適用

高亮所需的文字

```markdown
{% label text color %}
```

| 參數  | 解釋                                                                              |
| ----- | --------------------------------------------------------------------------------- |
| text  | 文字                                                                              |
| color | 【可選】背景顏色，默認為 `default`<br />default/blue/pink/red/purple/orange/green |

> Demo

```markdown
臣亮言：{% label 先帝 %}創業未半，而{% label 中道崩殂 blue %}。今天下三分，{% label 益州疲敝 pink %}，此誠{% label 危急存亡之秋 red %}也！然侍衞之臣，不懈於內；{% label 忠志之士 purple %}，忘身於外者，蓋追先帝之殊遇，欲報之於陛下也。誠宜開張聖聽，以光先帝遺德，恢弘志士之氣；不宜妄自菲薄，引喻失義，以塞忠諫之路也。
宮中、府中，俱為一體；陟罰臧否，不宜異同。若有{% label 作奸 orange %}、{% label 犯科 green %}，及為忠善者，宜付有司，論其刑賞，以昭陛下平明之治；不宜偏私，使內外異法也。
```

臣亮言：{% label 先帝 %}創業未半，而{% label 中道崩殂 blue %}。今天下三分，{% label 益州疲敝 pink %}，此誠{% label 危急存亡之秋 red %}也！然侍衞之臣，不懈於內；{% label 忠志之士 purple %}，忘身於外者，蓋追先帝之殊遇，欲報之於陛下也。誠宜開張聖聽，以光先帝遺德，恢弘志士之氣；不宜妄自菲薄，引喻失義，以塞忠諫之路也。

宮中、府中，俱為一體；陟罰臧否，不宜異同。若有{% label 作奸 orange %}、{% label 犯科 green %}，及為忠善者，宜付有司，論其刑賞，以昭陛下平明之治；不宜偏私，使內外異法也。

{% btn '/posts/ceeb73f/',⚔️ Butterfly-安裝文檔-四-主題配置-2,far fa-hand-point-right,block red right larger %}
