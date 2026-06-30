---
title: Butterfly 安裝文檔(一) 快速開始
date: 2019-01-01 22:31:46
tags:
  - 教程
  - Hexo
  - 主題
  - butterfly
categories: Docs文檔
keywords: "hexo,butterfly,主題,doc,教程,文檔"
description: Butterfly安裝文檔-快速開始
cover: https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/butterfly-docs-01-cover.png
abbrlink: 21cfbf15
# sticky: 100 置顶操作
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

`hexo-theme-butterfly`是基於 [hexo-theme-melody](https://github.com/Molunerfinn/hexo-theme-melody) 的基礎上進行開發的。

## 安裝

{% tabs butterfly-install %}

<!-- tab Git安裝 (Github) @fab fa-github-square -->

**穩定版【建議】**

在你的 Hexo 根目錄裏

```powershell
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```

**測試版**

> 測試版可能存在 bug，追求穩定的請安裝穩定版

如果想要安裝比較新的 dev 分支，可以

```powershell
git clone -b dev https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```

{% note info %}

升級方法：在主題目錄下，運行 `git pull`

{% endnote %}

<!-- endtab -->

<!-- tab Git安裝 (Gitee) @fab fa-git-square -->

**穩定版【建議】**

在你的 Hexo 根目錄裏

```powershell
git clone -b master https://gitee.com/iamjerryw/hexo-theme-butterfly.git themes/butterfly
```

**測試版**

> 測試版可能存在 Bugs，追求穩定的請安裝穩定版

如果想要安裝比較新的 dev 分支，可以

```powershell
git clone -b dev https://gitee.com/iamjerryw/hexo-theme-butterfly.git themes/butterfly
```

{% note info %}

升級方法：在主題目錄下，運行`git pull`

{% endnote %}

<!-- endtab -->

<!-- tab npm安裝@fab fa-npm -->

> 此方法只支持 Hexo 5.0.0 以上版本
>
> **_通過 npm 安裝並不會在 themes 裏生成主題文件夾，而是在 node_modules 裏生成_**

在你的 Hexo 根目錄裏

```powershell
npm i hexo-theme-butterfly
```

{% note info %}

升級方法：在 Hexo 根目錄下，運行 `npm update hexo-theme-butterfly`

{% endnote %}

<!-- endtab -->

{% endtabs %}

## 應用主題

修改 Hexo 根目錄下的 `_config.yml`，把主題改為`butterfly`

```yaml
theme: butterfly
```

## 安裝插件

如果你沒有 pug 以及 stylus 的渲染器，請下載安裝：

```powershell
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

## 升級建議

{% note blue 'fas fa-train' %}

升級完成後，請到 Github 的 [Releases](https://github.com/jerryc127/hexo-theme-butterfly/releases) 界面 或者 [文檔七](https://butterfly.js.org/posts/198a4240/) 查看新版的更新內容。

裏面有標注 `_config` 文件的變更內容（如有），請根據實際情況更新你的配置內容。

{% endnote %}

為了減少升級主題後帶來的不便，請使用以下方法（**建議，可以不做**）。

{% tabs update-suggestion %}

<!-- tab _config.butterfly.yml -->

> 此方法只支持 Hexo 5.0.0 以上版本，建議使用。
>
> 如果已經在 `source/_data/` 創建了 `butterfly.yml`，請記得**刪除**掉。

在 hexo 的根目錄創建一個文件 `_config.butterfly.yml`，並把主題目錄的 `_config.yml` **内容**複製到 `_config.butterfly.yml` 去。

以後只需要在 `_config.butterfly.yml`進行配置就行。

Hexo 會自動**合併**主題中的`_config.yml`和 `_config.butterfly.yml`裏的配置，如果存在同名配置，會使用`_config.butterfly.yml`的配置，其優先度較高。

![image-20200805191531090](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/butterfly-docs-install-suggestion-1.png)

<!-- endtab -->

<!-- tab butterfly.yml【已棄用】 -->

{% note pink 'fas fa-bahai' flat %}

從 3.3.0 開始，這種方法不再支持

{% endnote %}

~~為了減少升級主題後帶來的不便, `Butterfly` 使用了 [data files](https://hexo.io/docs/data-files.html) 特性。~~

~~推薦把**主題**默認的配置文件`_config.yml` 複製到 Hexo 根目錄下的`source/_data/` 目錄下，然後將文件名改為 `butterfly.yml`（如果`source/_data/` 的目錄不存在就創建一個）。~~

{% note warning %}

~~注意，如果你創建了`butterfly.yml`, 它將會替換主題默認配置文件`_config.yml`裏的配置項 (~~不是合併而是替換~~，3.1.0 開始將會是合併)~~

~~採用`butterfly.yml`的目的是，因為升級主題的時候，有可能會覆蓋到配置文件，以至於每次更新的時候都需要重新配置文件。如果使用`butterfly.yml`，就算主題目錄下的`_config.yml`被覆蓋，主題只會去`butterfly.yml`讀取配置。~~

~~由於主題在添加功能或者修復 Bugs 的情況下，可能會涉及到**配置文件**的修改。這時候，如果升級主題，需要把新增加的配置添加到`butterfly.yml`去，不然很大機會會出現報錯。（ 3.1.0 之後，應該不會出現這種情況）~~

{% endnote %}

<!-- endtab -->

{% endtabs %}

{% btn '/posts/dc584b87/',📑 Butterfly 安裝文檔(二) 主題頁面,far fa-hand-point-right,block right larger %}
