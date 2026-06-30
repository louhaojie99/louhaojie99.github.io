---
title: Butterfly 安裝文檔(四) 主題配置-2
date: 2019-01-04 22:31:46
tags:
  - 教程
  - Hexo
  - 主題
  - butterfly
categories: Docs文檔
keywords: 'hexo,butterfly,主題,doc,教程,文檔'
description: Butterfly安裝文檔-主題配置-2
cover: https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/Butterfly-docs-04-cover.png
abbrlink: ceeb73f
comments: false
---

{% note blue 'fas fa-bullhorn' %}

 📖  本教程更新於 2021 年 07 月 20 日，教程的內容針對最新**穩定版**而更新（如果你是舊版，教程會有些出入，請留意）

 🦋  Butterfly 已經更新到 [3.8.2](https://github.com/jerryc127/hexo-theme-butterfly/releases/tag/3.8.2)

{% endnote %}

{% note green 'fas fa-rocket' %}

 📚  文檔目錄

{% post_link 01_ButterFly/Butterfly-安裝文檔-一-快速開始 ' 🚀 快速開始' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-二-主題頁面 ' 📑 主題頁面' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-三-主題配置-1 ' 🛠 主題配置-1' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-四-主題配置-2 ' ⚔️ 主題配置-2' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-五-主題問答 ' ❓ 主題問答' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-六-進階教程 ' ⚡️ 進階教程' %} - {% post_link 01_ButterFly/Butterfly-安裝文檔-七-更新日誌 ' ✨ 更新日誌' %}

{% endnote %}

{% note orange 'fas fa-magic' %}

你可以通過右下角的 **簡** 按鈕切換為簡體顯示 

{% endnote %}

***

## 評論

{% tabs comments %}

<!-- tab 通用設置 -->

從3.0.0開始，開啟評論需要在`comments-use`中填寫你需要的評論。

支持雙評論顯示，只需要配置兩個評論（第一個為默認顯示）

```markdown
comments:
  # Up to two comments system, the first will be shown as default
  # Choose: Disqus/Disqusjs/Livere/Gitalk/Valine/Waline/Utterances/Facebook Comments/Twikoo
  use:
    - Valine
  text: true # Display the comment name next to the button
  # lazyload: The comment system will be load when comment element enters the browser's viewport.
  # If you set it to true, the comment count will be invalid
  lazyload: true
  count: true # Display comment count in top_img
  card_post_count: false # Display comment count in Home Page
```

| 參數            | 解釋                                                         |
| --------------- | ------------------------------------------------------------ |
| use             | 使用的評論（請注意，填寫的評論首字母需要大寫。最多支持兩個，如果不需要請留空）<br>*注意：雙評論不能是 Disqus 和 Disqusjs 一起，由於其共用同一個 ID，會出錯* |
| text            | 是否顯示評論服務商的名字                                     |
| lazyload        | 是否為評論開啟lazyload，開啟後，只有滾動到評論位置時才會加載評論所需要的資源（開啟lazyload後，評論數將不顯示） |
| count           | 是否在文章頂部顯示評論數 <br/> livere 和 utterances 不支持評論數顯示 |
| card_post_count | 是否在首頁文章卡片顯示評論數<br/>gitalk、livere 和 utterances 不支持評論數顯示 |

> 單評論

![image-20200731172506907](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-single-comments.png)

> 雙評論

![image-20200731173006128](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-double-comments.png)

> 顯示text

![image-20200731173006128](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-double-comments.png)

> 不顯示text

![image-20200731173143712](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-double-comments-not-text.png)

<!-- endtab -->

<!-- tab Disqus -->

註冊 [disqus](https://disqus.com/)，配置你自己的 disqus，然後在`Butterfly`裏開啟它。

修改 `主題配置文件`

```yaml
disqus:
  shortname:
```

![image-20201027211418161](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-disqus-new.png)

<!-- endtab -->

<!-- tab Disqusjs -->

與Disqus一樣，但由於Disqus在中國大陸無法訪問， 使用Disqusjs可以在無法訪問Disqus時顯示評論。具體可參考[Disqusjs](https://github.com/SukkaW/DisqusJS)。

修改 `主題配置文件`

```markdown
disqusjs:
  shortname:
  siteName:
  apikey:
  api:
  nocomment: # display when a blog post or an article has no comment attached
  admin:
  adminLabel:
```

> 當無法訪問 Disqus 時，會顯示

![image-20201027212543851](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-disqusjs-new.png)

<!-- endtab -->

<!-- tab livere（來必力） -->

註冊[來必力](https://livere.com/)，配置你自己的來必力設置，然後在`Butterfly`裏開啟它。

修改 `主題配置文件`

```yaml
livere:
  uid:
```

laibili 的 uid 你能在這裏找到:

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-laibili.jpg)

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-laibili_2-new.png)

<!-- endtab -->

<!-- tab Gitalk -->

遵循 [gitalk](https://github.com/gitalk/gitalk)的指示去獲取你的 github Oauth 應用的 client id 和 secret 值。以及查看它的相關配置説明。

然後修改 `主題配置文件`:

```yaml
gitalk:
  client_id: 你的client id 
  client_secret: 你的client secret
  repo: 你的github倉庫
  owner: 你的github用户名
  admin: 該倉庫的擁有者或協作者
  language: zh-CN # en, zh-CN, zh-TW, es-ES, fr, ru
  perPage: 10 # Pagination size, with maximum 100.
  distractionFreeMode: false # Facebook-like distraction free mode.
  pagerDirection: last # Comment sorting direction, available values are last and first.
  createIssueManually: false # Gitalk will create a corresponding github issue for your every single page automatically
  option:
```

![image-20201027212704930](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-gitalk-new.png)

<!-- endtab -->

<!-- tab Valine -->

遵循 [Valine](https://github.com/xCss/Valine)的指示去配置你的 LeanCloud 應用。以及查看相應的配置説明。

然後修改 `主題配置文件`:

```yaml
valine:
  appId:  # leancloud application app id
  appKey:  # leancloud application app key
  pageSize: 10 # comment list page size
  avatar: monsterid # gravatar style https://valine.js.org/#/avatar
  lang: en # i18n: zh-CN/zh-TW/en/ja
  placeholder: 記得留下你的暱稱和郵箱....可以快速收到回復 # valine comment input placeholder(like: Please leave your footprints )
  guest_info: nick,mail,link #valine comment header info (nick/mail/link)
  recordIP: false # Record reviewer IP
  serverURLs: # This configuration is suitable for domestic custom domain name users, overseas version will be automatically detected (no need to manually fill in)
  bg: /img/comment_bg.png # valine background
  emojiCDN: # emoji CDN
  enableQQ: false # enable the Nickname box to automatically get QQ Nickname and QQ Avatar
  requiredFields: nick,mail # required fields (nick/mail)
  visitor: false
  option:
```

Valine於 v1.4.5 開始支持自定義表情，如果你需要自行配置，請在`emojiCDN`配置表情CDN。

同時在Hexo 工作目錄下的`source/_data/`創建一個json文件`valine.json`,等同於Valine需要配置的`emojiMaps`，`valine.json`配置方式可參考如下

> valine.json

```json
{ 
"tv_doge": "6ea59c827c414b4a2955fe79e0f6fd3dcd515e24.png",
"tv_親親": "a8111ad55953ef5e3be3327ef94eb4a39d535d06.png",
"tv_偷笑": "bb690d4107620f1c15cff29509db529a73aee261.png",
"tv_再見": "180129b8ea851044ce71caf55cc8ce44bd4a4fc8.png",
"tv_冷漠": "b9cbc755c2b3ee43be07ca13de84e5b699a3f101.png",
"tv_發怒": "34ba3cd204d5b05fec70ce08fa9fa0dd612409ff.png",
"tv_發財": "34db290afd2963723c6eb3c4560667db7253a21a.png",
"tv_可愛": "9e55fd9b500ac4b96613539f1ce2f9499e314ed9.png",
"tv_吐血": "09dd16a7aa59b77baa1155d47484409624470c77.png",
"tv_呆": "fe1179ebaa191569b0d31cecafe7a2cd1c951c9d.png",
"tv_嘔吐": "9f996894a39e282ccf5e66856af49483f81870f3.png",
"tv_困": "241ee304e44c0af029adceb294399391e4737ef2.png",
"tv_壞笑": "1f0b87f731a671079842116e0991c91c2c88645a.png",
"tv_大佬": "093c1e2c490161aca397afc45573c877cdead616.png",
"tv_大哭": "23269aeb35f99daee28dda129676f6e9ea87934f.png",
"tv_委屈": "d04dba7b5465779e9755d2ab6f0a897b9b33bb77.png",
"tv_害羞": "a37683fb5642fa3ddfc7f4e5525fd13e42a2bdb1.png",
"tv_尷尬": "7cfa62dafc59798a3d3fb262d421eeeff166cfa4.png",
"tv_微笑": "70dc5c7b56f93eb61bddba11e28fb1d18fddcd4c.png",
"tv_思考": "90cf159733e558137ed20aa04d09964436f618a1.png",
"tv_驚嚇": "0d15c7e2ee58e935adc6a7193ee042388adc22af.png"
} 

```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-valine.png)

> default_avatar

| 參數         | 效果                                                         |
| ------------ | ------------------------------------------------------------ |
| 留空（默認） | ![](https://www.gravatar.com/avatar/00000000000000000000000000000000) |
| mp           | ![](https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp) |
| identicon    | ![](https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon) |
| monsterid    | ![](https://www.gravatar.com/avatar/00000000000000000000000000000000?d=monsterid) |
| wavatar      | ![](https://www.gravatar.com/avatar/00000000000000000000000000000000?d=wavatar) |
| retro        | ![](https://www.gravatar.com/avatar/00000000000000000000000000000000?d=retro) |
| robohash     | ![](https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash) |
| blank        | ![](https://www.gravatar.com/avatar/00000000000000000000000000000000?d=blank&f=y) |
| 404          | ![](https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y) |

<!-- endtab -->



<!-- tab Waline -->

Waline - 一款從 Valine 衍生的帶後端評論系統。可以將 Waline 等價成 With backend Valine。

具體配置可參考 [waline 文檔](https://waline.js.org/)

然後修改 `主題配置文件`:

```yaml
# waline - A simple comment system with backend support fork from Valine
# https://waline.js.org/
waline:
  serverURL:  # Waline server address url
  avatar: monsterid # gravatar style https://zh-tw.gravatar.com/site/implement/images/#default-image
  avatarCDN: # Gravatar CDN baseURL
  bg: /img/comment_bg.png # waline background
  visitor: false
  option:
```

由於 waline 將會逐步去掉 `emojiCDN` 和 `emojiMaps`, 舊的添加表情方法已被棄用（從 3.7.8 開始）

請參看 waline 的[添加表情文檔](https://waline.js.org/guide/client/emoji.html)進行配置



{% hideToggle 以下添加表情方法已被棄用 %}

如果你需要自定義表情，請在`emojiCDN`配置表情CDN。

同時在Hexo 工作目錄下的`source/_data/`創建一個json文件`waline.json`,等同於Waline需要配置的`emojiMaps`，`waline.json`配置方式可參考如下

> waline.json

```json
{ 
"tv_doge": "6ea59c827c414b4a2955fe79e0f6fd3dcd515e24.png",
"tv_親親": "a8111ad55953ef5e3be3327ef94eb4a39d535d06.png",
"tv_偷笑": "bb690d4107620f1c15cff29509db529a73aee261.png",
"tv_再見": "180129b8ea851044ce71caf55cc8ce44bd4a4fc8.png",
"tv_冷漠": "b9cbc755c2b3ee43be07ca13de84e5b699a3f101.png",
"tv_發怒": "34ba3cd204d5b05fec70ce08fa9fa0dd612409ff.png",
"tv_發財": "34db290afd2963723c6eb3c4560667db7253a21a.png",
"tv_可愛": "9e55fd9b500ac4b96613539f1ce2f9499e314ed9.png",
"tv_吐血": "09dd16a7aa59b77baa1155d47484409624470c77.png",
"tv_呆": "fe1179ebaa191569b0d31cecafe7a2cd1c951c9d.png",
"tv_嘔吐": "9f996894a39e282ccf5e66856af49483f81870f3.png",
"tv_困": "241ee304e44c0af029adceb294399391e4737ef2.png",
"tv_壞笑": "1f0b87f731a671079842116e0991c91c2c88645a.png",
"tv_大佬": "093c1e2c490161aca397afc45573c877cdead616.png",
"tv_大哭": "23269aeb35f99daee28dda129676f6e9ea87934f.png",
"tv_委屈": "d04dba7b5465779e9755d2ab6f0a897b9b33bb77.png",
"tv_害羞": "a37683fb5642fa3ddfc7f4e5525fd13e42a2bdb1.png",
"tv_尷尬": "7cfa62dafc59798a3d3fb262d421eeeff166cfa4.png",
"tv_微笑": "70dc5c7b56f93eb61bddba11e28fb1d18fddcd4c.png",
"tv_思考": "90cf159733e558137ed20aa04d09964436f618a1.png",
"tv_驚嚇": "0d15c7e2ee58e935adc6a7193ee042388adc22af.png"
} 

```

{% endhideToggle %}

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-valine.png)

<!-- endtab -->

<!-- tab Utterances -->

與Gitalk一樣，基於 GitHub issues 的評論工具。相對於Gitalk,其相對需要權限較少。具體配置可參考[Utterances](https://utteranc.es/)。

修改 `主題配置文件`:

```markdown
utterances:
  repo:
  # 可選 pathname/url/title/og:title
  issue_term: pathname
  # 可選 github-light/github-dark/github-dark-orange/icy-dark/dark-blue/photon-dark
  light_theme: github-light
  dark_theme: photon-dark
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-Utterances.png)

<!-- endtab -->

<!-- tab Facebook Comments -->

`Facebook Comments`是Facebook提供的評論插件，需要登陸Facebook才可評論。

修改 `主題配置文件`

```markdown
# Facebook Comments Plugin
# https://developers.facebook.com/docs/plugins/comments/
facebook_comments:
  app_id: 
  user_id: # optional
  pageSize: 10 # The number of comments to show
  order_by: social # social/time/reverse_time
  lang: en_US # Language en_US/zh_CN/zh_TW and so on
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-butterfly-docs-facebook-comments.png)

<!-- endtab -->

<!-- tab Twikoo -->

`Twikoo` 是一個簡潔、安全、無後端的靜態網站評論系統，基於[騰訊雲開發](https://curl.qcloud.com/KnnJtUom)。

具體如何配置評論，請查看 [Twikoo文檔](https://twikoo.js.org/quick-start.html#%E7%8E%AF%E5%A2%83%E5%88%9D%E5%A7%8B%E5%8C%96)

你只需要把獲取到的 `環境ID (envId)` 填寫到配置上去就行

修改 `主題配置文件`

```yaml
twikoo:
  envId:
  region:
  visitor: false
  option:
```

| 參數    | 解釋                                                         |
| ------- | ------------------------------------------------------------ |
| envId   | 環境 ID                                                      |
| region  | 環境地域，默認為 ap-shanghai，如果您的環境地域不是上海，需傳此參數 |
| visitor | 是否顯示文章閲讀數                                           |
| option  | 可選配置                                                     |



![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-twikoo-comments.png)





<!-- endtab -->

{% endtabs %}

## 在綫聊天

從3.0開始，Butterfly主題內置了多種在綫聊天工具。你可以選擇開啟一種，方便你與訪客的交流。

{% tabs online-chat %}

<!-- tab 通用設置 -->
這些工具都提供了一個按鈕可以打開/關閉聊天窗口。
主題也提供了一個集合主題特色的按鈕來替換這些工具本身的按鈕，這個聊天按鈕將會出現在右下角裏。
你只需要把`chat_btn`打開就行。

修改 `主題配置文件`

```yaml
# Chat Button [recommend]
# It will create a button in the bottom right corner of website, and hide the origin button
chat_btn: true
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-chat-button.png)

為了不影響訪客的體驗，主題提供一個`chat_hide_show`配置
設為`true`後，使用工具提供的按鈕時，只有向上滾動才會顯示聊天按鈕，向下滾動時會隱藏按鈕。

修改 `主題配置文件`

```yaml
# The origin chat button is displayed when scrolling up, and the button is hidden when scrolling down
chat_hide_show: true
```

{% note info %}
如果使用工具自帶的聊天按鈕，按鈕位置可能會遮擋右下角圖標，請配置`rightside-bottom`調正右下角圖標位置
{% endnote %}
<!-- endtab -->

<!-- tab chatra -->
配置chatra,需要知道`Public key`

打開[chatra](https://chatra.com/)並註冊賬號。
你可以在`Preferences`中找到`Public key`

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-chat-chatra-id.png)

修改 `主題配置文件`

```yaml
# chatra
# https://chatra.io/
chatra:
  enable: true
  id: xxxxxxxx
```

`chatra`的樣式你可以`Chat Widget`自行配置

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-chat-chatra-ui-settings.png)

> Demo

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-chat-chatra-ui-demo.png)

<!-- endtab -->

<!-- tab tidio -->
配置tidio,需要知道`Public key`

打開[tidio](https://www.tidio.com/)並註冊賬號。
你可以在`Preferences > Developer`中找到`Public key`

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-chat-tidio-id.png)

修改 `主題配置文件`

```yaml
# tidio
# https://www.tidio.com/
tidio:
  enable: true
  public_key: XXXX
```
`tidio`的樣式你可以`Channels`自行配置

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-chat-tidio-setting.png)

> Demo

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-chat-tidio-demo.png)

<!-- endtab -->

<!-- tab daovoice -->
打開[daovoice](http://daovoice.io/)和註冊帳號
找到你的`app id`

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-chat-daovoice-appid.png)

修改 `主題配置文件`

```yaml
# daovoice
# http://daovoice.io/
daovoice:
  enable: true
  app_id: xxxxx
```

可在`聊天設置`裏配置聊天按鈕等樣式

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-chat-daovoice-ui.png)

> Demo

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-chat-daovoice-demo.png)

<!-- endtab -->

<!-- tab Gitter -->
打開[Gitter](https://gitter.im/)和註冊賬號
創建一個`community`或者`room`,複製名稱到設置去

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-chat-gitter-setting.png)

修改 `主題配置文件`

```yaml
# gitter
# https://gitter.im/
gitter:
  enable: true
  room: 
```

> Demo

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-chat-gitter-ui.png)

<!-- endtab -->



<!-- tab crisp -->

打開[crisp](https://crisp.chat/en/)並註冊帳號

找到需要的網站ID

```yaml
# crisp
# https://crisp.chat/en/
crisp:
  enable: false
  website_id: xxxxxxxx
```

![image-20200731183023863](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-buttefly-docs-chat-crisp.png)

![image-20200731183444781](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-crisp-demo.png)

<!-- endtab -->

{% endtabs %}

## 分享

> 只能選擇一個分享服務商

{% tabs 分享 %}
<!-- tab AddThis -->

> 訪問 [AddThis](https://www.addthis.com/) 官網
> 找到你的 pub-id

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-addthis.jpg)

修改 `主題配置文件`

```yaml
addThis:
  enable: true # or false
  pubid: 你的pub-id
```

<!-- endtab -->

<!-- tab Sharejs -->
如果你不知道 [sharejs](https://github.com/overtrue/share.js/)，看看它的説明。

修改 `主題配置文件`

```yaml
sharejs:
  enable: true
  sites: facebook,twitter,wechat,weibo,qq  #想要顯示的內容
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-sharejs.png)
<!-- endtab -->

<!-- tab Addtoany -->
可以到[addtoany](https://www.addtoany.com/)查看使用説明

```yaml
addtoany:
  enable: true
  item: facebook,twitter,wechat,sina_weibo,facebook_messenger,email,copy_link
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-addtoany.png)

<!-- endtab -->
{% endtabs %}

## 搜索系統

{% tabs search %}
<!-- tab Algolia @fab fa-algolia -->

> 記得運行 hexo clean

1. 你需要安裝 [hexo-algolia](https://github.com/oncletom/hexo-algolia)或 [hexo-algoliasearch](https://github.com/LouisBarranqueiro/hexo-algoliasearch). 根據它們的説明文檔去做相應的配置。

2. 修改 `主題配置文件`

```yaml
algolia_search:
  enable: true
  hits:
    per_page: 6
```

<!-- endtab -->

<!-- tab 本地搜索@fas fa-search -->

> 記得運行 hexo clean

1. 你需要安裝 [hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search). 根據它的文檔去做相應配置。**注意格式只支持 xml**。

2. 修改 `主題配置文件`

```yaml
local_search:
  enable: false
```

<!-- endtab -->
{% endtabs %}

## 網站驗證

如果需要搜索引擎收錄網站，可能需要登錄對應搜索引擎的管理平台進行提交。
各自的驗證碼可從各自管理平台拿到

修改 `主題配置文件`

```yaml
site_verification:
  # - name: google_site_verification
  #   content: xxxxxx
  # - name: baidu_site_verification
  #   content: xxxxxxx
```

## 分析統計

{% tabs 分析統計 %} 
<!-- tab 百度統計 -->
1. 登錄百度統計的[官方網站](https://tongji.baidu.com/web/welcome/login)

2. 找到你百度統計的統計代碼

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-baidu-tongji.jpg)

3. 修改 `主題配置文件`

```yaml
baidu_analytics: 你的代碼
```

<!-- endtab -->

<!-- tab 谷歌分析 -->
1. 登錄谷歌分析的[官方網站](https://www.google.com/analytics/)

2. 找到你的谷歌分析的跟蹤 ID

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-google-analytics.jpg)

3. 修改 `主題配置文件`

```yaml
google_analytics: 你的代碼 # 通常以`UA-`打頭
```

<!-- endtab -->

<!-- tab 騰訊分析 -->

> 由於騰訊分析將於20年12月關閉並遷移到騰訊移動分析,從 `3.1.0` 起，騰訊分析改為騰訊移動分析。

1. 登錄騰訊移動分析的[官方網站](https://mta.qq.com/)
2. 選擇 `WEB應用`
3. 找到你的站點ID

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-tencent-analysic.png)

4. 修改 `主題配置文件`

```yaml
# Tencent_analytics ID
tencent_analytics: 
```

<!-- endtab -->

<!-- tab CNZZ分析 -->

1. 登錄CNZZ分析的[官方網站](https://www.umeng.com/)
2. 找到 `站點設置 - 獲取代碼`
3. 找到你的 `web_id`

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-CNZZ-analysic.png)

4. 修改 `主題配置文件`

```yaml
cnzz_analytics: 
```

<!-- endtab -->

<!-- tab Cloudflare分析 -->

1. 登錄 Cloudflare 分析的[官方網站](https://www.cloudflare.com/zh-tw/web-analytics/)
2. 找到 `JavaScript 程式碼片段`
3. 找到你的 `token`

![image-20201230195158742](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-cloudflare-analytics-id.png)

4. 修改 `主題配置文件`

   ```yaml
   # Cloudflare Analytics
   # https://www.cloudflare.com/zh-tw/web-analytics/
   cloudflare_analytics:
   ```

<!-- endtab -->

<!-- tab Microsoft Clarity -->

1. 登錄 Clarity 的[官方網站](https://clarity.microsoft.com/)

2. 創建 `PROJECT`

3. 找到你的 `ID`![image-20201230195541443](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-clarity-id.png)

4. 修改 `主題配置文件`

   ```yaml
   # Microsoft Clarity
   # https://clarity.microsoft.com/
   microsoft_clarity:
   ```

<!-- endtab -->

{% endtabs %}

## 廣告

{% tabs 廣告 %}
<!-- tab 谷歌廣告 -->
主題已集成谷歌廣告（自動廣告）

修改 `主題配置文件`

```yaml
google_adsense:
  enable: true
  auto_ads: true
  js: https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js
  client: # 填入個人識別碼
  enable_page_level_ads: true
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-google-adsense1.png)
<!-- endtab -->

<!-- tab 手動廣告配置 -->
主題預留了三個位置可供插入廣告，分別為主頁文章(每三篇文章出現廣告)/aside公告之後/文章頁打賞之後。
把html代碼填寫到對應的位置

修改 `主題配置文件`

```yaml
ad:
  index:
  aside:
  post:
```

例如:

```yaml
  index: <ins class="adsbygoogle" style="display:block" data-ad-format="fluid" data-ad-layout-key="xxxxxxxxxxxx" data-ad-client="ca-pub-xxxxxxxxxx" data-ad-slot="xxxxxxxxxx"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({})</script>
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-ad-post.png)
![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-ad-index.png)
<!-- endtab -->
{% endtabs %}

## Math 數學

{% tabs Math %}
<!-- tab MathJax -->

> 建議使用 KaTex 獲得更好的效果，下文有介紹！

修改 `主題配置文件`:

```yaml
mathjax:
  enable: true
  # true 表示每一頁都加載mathjax.js
  # false 需要時加載，須在使用的Markdown Front-matter 加上 mathjax: true
  per_page: false
```

> 如果`per_page`設為`true`,則每一頁都會加載Mathjax服務。設為`false`，則需要在文章`Front-matter`添加`mathjax: true`,對應的文章才會加載Mathjax服務。

然後你需要修改一下默認的`markdown`渲染引擎來實現 MathJax 的效果。

查看: [hexo-renderer-kramed](https://www.npmjs.com/package/hexo-renderer-kramed)

以下操作在你 hexo 博客的目錄下 (**不是 Butterfly 的目錄!**):

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-mathjax.png)

效果：

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-mathjax-2.jpg)
<!-- endtab -->

<!-- tab KaTeX -->
首先禁用`MathJax`（如果你配置過 MathJax 的話），然後修改你的`主題配置文件`以便加載`katex.min.css`:

```yaml
katex:
  enable: true
  # true 表示每一頁都加載katex.js
  # false 需要時加載，須在使用的Markdown Front-matter 加上 katex: true
  per_page: false
  hide_scrollbar: true
```

你不需要添加`katex.min.js`來渲染數學方程。相應的你需要卸載你之前的 hexo 的 markdown 渲染器，然後安裝其它插件。

{% subtabs katex-plugins %}

<!-- tab hexo-renderer-markdown-it 【建議】 -->

卸載掉 marked 插件，安裝 [hexo-renderer-markdown-it](https://github.com/hexojs/hexo-renderer-markdown-it)

```bash
npm un hexo-renderer-marked --save # 如果有安裝這個的話，卸載
npm un hexo-renderer-kramed --save # 如果有安裝這個的話，卸載

npm i hexo-renderer-markdown-it --save # 需要安裝這個渲染插件
npm install @neilsustc/markdown-it-katex --save #需要安裝這個katex插件
```

在 hexo 的根目錄的 `_config.yml` 中配置

```yaml
markdown:
  plugins:
    - plugin:
      name: '@neilsustc/markdown-it-katex'
      options:
        strict: false
```

如需配置其它參數，請參考 [katex 官網](https://katex.org/docs/options.html)

<!-- endtab -->

<!-- tab hexo-renderer-markdown-it-plus -->

> 注意，此方法生成的 katex 沒有斜體

卸載掉 marked 插件，然後安裝新的`hexo-renderer-markdown-it-plus`:

```bash
# 替換 `hexo-renderer-kramed` 或者 `hexo-renderer-marked` 等hexo的markdown渲染器
# 你可以在你的package.json裏找到hexo的markdwon渲染器，並將其卸載
npm un hexo-renderer-marked --save

# or

npm un hexo-renderer-kramed --save


# 然後安裝 `hexo-renderer-markdown-it-plus`
npm i @upupming/hexo-renderer-markdown-it-plus --save
```

注意到 [`hexo-renderer-markdown-it-plus`](https://github.com/CHENXCHEN/hexo-renderer-markdown-it-plus)已經無人持續維護, 所以我們使用 [`@upupming/hexo-renderer-markdown-it-plus`](https://github.com/upupming/hexo-renderer-markdown-it-plus)。 這份 fork 的代碼使用了 [`@neilsustc/markdown-it-katex`](https://github.com/yzhang-gh/markdown-it-katex)同時它也是 VSCode 的插件 [Markdown All in One](https://github.com/yzhang-gh/vscode-markdown)所使用的, 所以我們可以獲得最新的 KaTex 功能例如 `\tag{}`。

你還可以通過 [`@neilsustc/markdown-it-katex`](https://github.com/yzhang-gh/markdown-it-katex)控制 KaTeX 的設置，所有可配置的選項參見 https://katex.org/docs/options.html。 比如你想要禁用掉 KaTeX 在命令行上輸出的宂長的警告信息，你可以在根目錄的 `_config.yml` 中使用下面的配置將 `strict` 設置為 false:

```yaml
markdown_it_plus:
  plugins:
    - plugin:
      name: '@neilsustc/markdown-it-katex'
      enable: true
      options:
        strict: false
```

當然，你還可以利用這個特性來定義一些自己常用的 `macros`。

<!-- endtab -->

{% endsubtabs %}



因為 KaTeX 更快更輕量，因此沒有 MathJax 的功能多（比如右鍵菜單）。為那些使用 MathJax 的用户，主題也內置了 katex 的 [複製](https://github.com/KaTeX/KaTeX/tree/master/contrib/copy-tex) 功能。

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-katex.gif)

<!-- endtab -->
{% endtabs %}

## 美化/特效

### 自定義主題色

可以修改大部分UI顏色

修改 `主題配置文件`，比如：

> 顏色值必須被雙引號包裹，就像`"#000"`而不是`#000`。否則將會在構建的時候報錯！

```yaml
theme_color:
  enable: true
  main: "#49B1F5"
  paginator: "#00c4b6"
  button_hover: "#FF7242"
  text_selection: "#00c4b6"
  link_color: "#99a9bf"
  meta_color: "#858585"
  hr_color: "#A4D8FA"
  code_foreground: "#F47466"
  code_background: "rgba(27, 31, 35, .05)"
  toc_color: "#00c4b6"
  blockquote_padding_color: "#49b1f5"
  blockquote_background_color: "#49b1f5"
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-color_1.png)
![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-color_2.png)

### 網站背景

默認顯示白色，可設置圖片或者顏色

修改 `主題配置文件`

```yaml
# 圖片格式 url(http://xxxxxx.com/xxx.jpg)
# 顏色（HEX值/RGB值/顔色單詞/漸變色)
# 留空 不顯示背景
background:
```

*留意:* 如果你的網站根目錄不是'/',使用本地圖片時，需加上你的根目錄。
例如：網站是 `https://yoursite.com/blog`,引用一張`img/xx.png`圖片，則設置background為 `url(/blog/img/xx.png)
> background:'#49B202'

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-set-body-background-color.png)

> background: url(https://i.loli.net/2019/09/09/5oDRkWVKctx2b6A.png)

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-set-body-background-img.png)

### footer 背景

修改 `主題配置文件`

```yaml
# footer是否顯示圖片背景(與top_img一致)
footer_bg: true
```

| 配置的值                                                     | 效果                         |
| ------------------------------------------------------------ | ---------------------------- |
| 留空/false                                                   | 顯示默認的顔色               |
| img鏈接                                                      | 圖片的鏈接，顯示所配置的圖片 |
| 顔色(<br>HEX值 - \#0000FF<br>RGB值 - rgb(0,0,255)<br>顔色單詞 - orange<br>漸變色 - linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%)<br>） | 對應的顔色                   |
| true                                                         | 顯示跟 top_img 一樣          |

> true

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-footer-img.png)

### 打字效果

打字效果[activate-power-mode](https://github.com/disjukr/activate-power-mode)

修改 `主題配置文件`

```yaml
# Typewriter Effect (打字效果)
# https://github.com/disjukr/activate-power-mode
activate_power_mode:
  enable: true
  colorful: true # open particle animation (冒光特效)
  shake: true #  open shake (抖動特效)
  mobile: false
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-type-animation.gif)

### 背景特效
{% tabs 背景特效 %}
<!-- tab 靜止綵帶 -->
好看的綵帶背景，可設置每次刷新更換綵帶，或者每次點擊更換綵帶
修改 `主題配置文件`

```yaml
canvas_ribbon:
  enable: false
  size: 150
  alpha: 0.6
  zIndex: -1
  click_to_change: false  #設置是否每次點擊都更換綵帶
  mobile: false # false 手機端不顯示 true 手機端顯示
```

相關配置可查看[canvas_ribbon](https://github.com/hustcc/ribbon.js)

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-canvas-ribbon.png)
<!-- endtab -->

<!-- tab 動態綵帶 -->
好看的綵帶背景，會飄動
修改 `主題配置文件`

```yaml
canvas_fluttering_ribbon:
  enable: true
  mobile: false # false 手機端不顯示 true 手機端顯示
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-canvas-ribbon-piao.gif)
<!-- endtab -->

<!-- tab canvas-nest -->
修改 `主題配置文件`

```yaml
canvas_nest:
  enable: true
  color: '0,0,255' #color of lines, default: '0,0,0'; RGB values: (R,G,B).(note: use ',' to separate.)
  opacity: 0.7 # the opacity of line (0~1), default: 0.5.
  zIndex: -1 # z-index property of the background, default: -1.
  count: 99 # the number of lines, default: 99.
  mobile: false # false 手機端不顯示 true 手機端顯示
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-canvas_nest.gif)
<!-- endtab -->
{% endtabs %}

### 鼠標點擊效果

{% tabs 鼠標點擊效果 %}
<!-- tab 煙花 @fas fa-fire-alt -->

`zIndex`建議只在`-1`和`9999`上選
`-1` 代表煙火效果在底部
`9999` 代表煙火效果在前面

修改 `主題配置文件`

```yaml
fireworks:
  enable: true
  zIndex: 9999 # -1 or 9999
  mobile: false
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-firewall.gif)
<!-- endtab -->

<!-- tab 愛心 @fas fa-heart -->
修改 `主題配置文件`

```yaml
# 點擊出現愛心
click_heart:
  enable: true
  mobile: false
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/click_love.gif)
<!-- endtab -->

<!-- tab 文字 @fab fa-amilia -->
修改 `主題配置文件`

```yaml
# 點擊出現文字，文字可自行修改
ClickShowText:
  enable: false
  text:
    - I
    - LOVE
    - YOU
  fontSize: 15px
  random: false # 文字隨機顯示
  mobile: false
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/click_word.gif)
<!-- endtab -->
{% endtabs %}

### 頁面美化

會改變ol、ul、h1-h5的樣式

`field`配置生效的區域

- `post` 只在文章頁生效
- `site` 在全站生效

修改 `主題配置文件`

```yaml
# 美化頁面顯示
beautify:
  enable: true
  field: site # site/post
  title-prefix-icon: '\f0c1'
  title-prefix-icon-color: "#F47466"
```

`title-prefix-icon`填寫的是fontawesome的icon的Unicode數。
![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-fontwesome-unicode.png)

> 未開啟美化

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-post-beautify.png)

> 開啟美化

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-post-beautif.png)

### 自定義字體和字體大小

#### 全局字體

可自行設置字體的`font-family`
**如不需要配置，請留空**

修改 `主題配置文件`

```yaml
# Global font settings
# Don't modify the following settings unless you know how they work (非必要不要修改)
font:
  global-font-size:
  code-font-size:
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Lato, Roboto, "PingFang SC", "Microsoft JhengHei", "Microsoft YaHei", sans-serif
  code-font-family: consolas, Menlo, "PingFang SC", "Microsoft JhengHei", "Microsoft YaHei", sans-serif
```
#### Blog 標題字體
可自行設置字體的`font-family`
**如不需要配置，請留空。**
**如不需要使用網絡字體，只需要把font_link留空就行**

修改 `主題配置文件`

```yaml
# Font settings for the site title and site subtitle
# 左上角網站名字 主頁居中網站名字
blog_title_font:
  font_link: https://fonts.googleapis.com/css?family=Titillium+Web&display=swap
  font-family: Titillium Web, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft JhengHei', 'Microsoft YaHei', sans-serif
```

### 網站副標題

可設置主頁中顯示的網站副標題或者喜歡的座右銘。

修改 `主題配置文件`

```yaml
# 主頁subtitle
subtitle:
  enable: true
  # 打字效果
  effect: true
  # 循環或者只打字一次
  loop: false
  # source調用第三方服務
  # source: false 關閉調用
  # source: 1  調用搏天api的隨機語錄（簡體） 
  # source: 2  調用一言網的一句話（簡體） 
  # source: 3  調用一句網（簡體） 
  # source: 4  調用今日詩詞（簡體
  # subtitle 會先顯示 source , 再顯示 sub 的內容
  source: false
  # 如果有英文逗號' , ',請使用轉義字元 &#44;
  # 如果有英文雙引號' " ',請使用轉義字元 &quot;
  # 開頭不允許轉義字元，如需要，請把整個句子用雙引號包住
  # 例如 ”&quotNever put off till tomorrow what you can do today&quot"
  # 如果關閉打字效果，subtitle只會顯示sub的第一行文字
  sub:
    - 今日事&#44;今日畢
    - Never put off till tomorrow what you can do today
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-index-subtitle.gif)



### 主頁top_img顯示大小

> 適用於 版本號 >= V1.2.0

默認的顯示為全屏。site-info的區域會居中顯示

```yaml
# 主頁設置
# 默認top_img全屏，site_info在中間
# 使用默認, 都無需填寫（建議默認）
index_site_info_top: # 主頁標題距離頂部距離  例如 300px/300em/300rem/10%
index_top_img_height:  #主頁top_img高度 例如 300px/300em/300rem  不能使用百分比
```

注意：`index_top_img_height`的值不能使用百分比。
2個都不填的話，會使用默認值

舉例，當

```yaml
index_top_img_height: 400px
```

效果

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-index-top-img-setting.png)



### 頁面加載動畫preloader

當進入網頁時，因為加載速度的問題，可能會導致top_img圖片出現斷層顯示，或者網頁加載不全而出現等待時間，開啟preloader後，會顯示加載動畫，等頁面加載完，加載動畫會消失。

配置`butterly.yml`

```yaml
# 加載動畫 Loading Animation
preloader: true
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-preloader.gif)

## PWA

要為`Butterfly`配上 PWA 特性, 你需要如下幾個步驟:

1. 打開 hexo 工作目錄

2. `npm install hexo-offline --save` 或者 `yarn add hexo-offline`

3. 在根目錄創建 `hexo-offline.config.cjs` 文件，並增加以下內容。

```js
// offline config passed to workbox-build.
module.exports = {
  globPatterns: ['**/*.{js,html,css,png,jpg,gif,svg,webp,eot,ttf,woff,woff2}'],
  // 靜態文件合集，如果你的站點使用了例如 webp 格式的文件，請將文件類型添加進去。
  globDirectory: 'public',
  swDest: 'public/service-worker.js',
  maximumFileSizeToCacheInBytes: 10485760, // 緩存的最大文件大小，以字節為單位。
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [ // 如果你需要加載 CDN 資源，請配置該選項，如果沒有，可以不配置。
    // CDNs - should be CacheFirst, since they should be used specific versions so should not change
    {
      urlPattern: /^https:\/\/cdn\.example\.com\/.*/, // 可替換成你的 URL
      handler: 'CacheFirst'
    }
  ]
}
```

更多內容請查看 [hexo-offline](https://github.com/JLHwung/hexo-offline)的官方文檔

4. 在`主題配置文件`中開啟 pwa 選項。

```yaml
pwa:
  enable: true
  manifest: /img/pwa/manifest.json
  apple_touch_icon: /img/pwa/apple-touch-icon.png
  favicon_32_32: /img/pwa/32.png
  favicon_16_16: /img/pwa/16.png
  mask_icon: /img/pwa/safari-pinned-tab.svg
```

5. 在創建`source/`目錄中創建`manifest.json`文件。

```json
{
    "name": "string",
    "short_name": "Junzhou",
    "theme_color": "#49b1f5",
    "background_color": "#49b1f5",
    "display": "standalone",
    "scope": "/",
    "start_url": "/",
    "icons": [
        {
          "src": "images/pwaicons/36.png",
          "sizes": "36x36",
          "type": "image/png"
        },
        {
            "src": "images/pwaicons/48.png",
          "sizes": "48x48",
          "type": "image/png"
        },
        {
          "src": "images/pwaicons/72.png",
          "sizes": "72x72",
          "type": "image/png"
        },
        {
          "src": "images/pwaicons/96.png",
          "sizes": "96x96",
          "type": "image/png"
        },
        {
          "src": "images/pwaicons/144.png",
          "sizes": "144x144",
          "type": "image/png"
        },
        {
          "src": "images/pwaicons/192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
            "src": "images/pwaicons/512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
      ],
      "splash_pages": null
  }
```

你也可以通過 [Web App Manifest](https://app-manifest.firebaseapp.com/)快速創建`manifest.json`。（Web App Manifest 要求至少包含一個 512*512 像素的圖標）

6. 可以通過`Chrome`插件`Lighthouse`檢查 PWA 配置是否生效以及配置是否正確。
   
   - 打開博客頁面
   - 啟動`Lighthouse`插件 (`Lighthouse`插件要求至少包含一個 512*512 像素的圖標)

關於 PWA（漸進式增強 Web 應用）的更多內容請參閲 [Google Tools for Web Developers](https://developers.google.com/web/tools/lighthouse/audits/address-bar)

## 字數統計

要為`Butterfly`配上字數統計特性, 你需要如下幾個步驟:

1. 打開 hexo 工作目錄

2. `npm install hexo-wordcount --save` or `yarn add hexo-wordcount`

3. 修改 `主題配置文件`:

```yaml
wordcount:
  enable: true
  post_wordcount: true
  min2read: true
  total_wordcount: true
```

![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-doc-word-count.png)
![](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/hexo-theme-butterfly-docs-wordcount-totalcount.png)

## 圖片大圖查看模式

{% note info %}

只能開啟一個

{% endnote %}



{% tabs 圖片大圖查看模式 %}
<!-- tab fancybox -->
修改 `主題配置文件`

```yaml
# fancybox http://fancyapps.com/fancybox/3/
fancybox: true
```

![fancybox.gif](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/fancybox.gif)
<!-- endtab -->
<!-- tab medium_zoom -->
修改 `主題配置文件`

```yaml
medium_zoom: true
```

![medium_zoom.gif](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/medium_zoom.gif)
<!-- endtab -->
{% endtabs %}

## Snackbar 彈窗

Snackbar 彈窗,根據自己愛好開啟

修改 `主題配置文件`

```yaml
# Snackbar 彈窗
# https://github.com/polonel/SnackBar
# position 彈窗位置
# 可選 top-left / top-center / top-right / bottom-left / bottom-center / bottom-right
snackbar:
  enable: true
  position: bottom-left
  bg_light: '#49b1f5' #light mode時彈窗背景
  bg_dark: '#2d3035' #dark mode時彈窗背景
```

> 未開啟Snackbar

![snackbar_false.gif](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/snackbar_false.gif)

> 開啟Snackbar

![snackbar_true.gif](https://cdn.jsdelivr.net/gh/jerryc127/CDN/img/snackbar_true.gif)

## 其它配置

### CSS 前綴

有些 CSS 並不是所有瀏覽器都支持，需要增加對應的前綴才會生效。

開啟  `css_prefix` 後，會自動為一些 CSS 增加前綴。（會增加 20%的體積）

修改配置文件

```yaml
# Add the vendor prefixes to ensure compatibility
css_prefix: true
```

### Open Graph

在 `head` 裏增加一些 meta 資料，例如縮略圖、標題、時間等等。當你分享網頁到一些平台時，平台會讀取 Open Graph 的內容，展示縮略圖，標題等等信息。

修改配置文件

```yaml
# Open graph meta tags
# https://developers.facebook.com/docs/sharing/webmasters/
Open_Graph_meta: true
```

### Instantpage

當鼠標懸停到鏈接上超過 65 毫秒時，Instantpage 會對該鏈接進行預加載，可以提升訪問速度。

修改配置文件

```yaml
# https://instant.page/
# prefetch (預加載)
instantpage: true
```

### Pangu

> 如果你跟我一樣，每次看到網頁上的中文字和英文、數字、符號擠在一塊，就會坐立難安，忍不住想在它們之間加個空格。這個外掛正是你在網路世界走跳所需要的東西，它會自動替你在網頁中所有的中文字和半形的英文、數字、符號之間插入空白。

修改配置文件

```YAML
# https://github.com/vinta/pangu.js
# Insert a space between Chinese character and English character (中英文之間添加空格)
pangu:
  enable: false
  field: post # site/post
```

`field`只支持兩個參數，`post`(只在文章頁生效)和`site`(全站生效)

## Pjax

當用户點擊鏈接，通過ajax更新頁面需要變化的部分，然後使用HTML5的pushState修改瀏覽器的URL地址。

這樣可以不用重複加載相同的資源（css/js）， 從而提升網頁的加載速度。

```yaml
# Pjax [Beta]
# It may contain bugs and unstable, give feedback when you find the bugs.
# https://github.com/MoOx/pjax
pjax: 
  enable: true
  exclude:
    - /music/
    - /no-pjax/
```
{% note info %}

對於一些第三方插件，有些並不支持 pjax 。
你可以把**網頁**加入到 `exclude` 裏，這個網頁會被 pjax 排除在外。
點擊該網頁會重新加載網站

使用pjax後，一些自己DIY的js可能會無效，跳轉頁面時需要重新調用，請參考[Pjax文檔](https://github.com/MoOx/pjax)
使用pjax後，一些個別頁面加載的js/css，將會改為所有頁面都加載

{% endnote %}

{% note warning %}

Butterfly的Pjax目前仍有一些問題，請留意

- 使用谷歌廣告可能會報錯（例如自動廣告）

如果你在使用中發現問題，歡迎反饋Bugs

{% endnote %}

## Inject

> 2.3.0以上支持

如想添加額外的js/css/meta等等東西，可以在Inject裏添加，支持添加到head(`</body>`標籤之前)和bottom(`</html>`標籤之前)。

請注意：以標準的html格式添加內容

例如

```yaml
inject:
  head:
  	- <link rel="stylesheet" href="/self.css">
  bottom:
  	- <script src="xxxx"></script>
```

*留意:* 如果你的網站根目錄不是'/',使用本地圖片時，需加上你的根目錄。
例如：網站是 `https://yoursite.com/blog`,引用`css/xx.css`，則設置為`<link rel="stylesheet" href="/blog/css/xx.css">`

## CDN

配置文件中最後一部分CDN，裏面是主題所引用到的文件，可自行配置CDN。（非必要請勿修改，配置後請確認鏈接是否能訪問）

以下是一些CDN提供商：

- [jsdelivr](https://www.jsdelivr.com/)   👍主題使用
- [bootcdn](https://www.bootcdn.cn/)
- [cdnjs](https://cdnjs.com/)
- ......

{% btn '/posts/98d20436/',❓ Butterfly 安裝文檔(五) 主題問答,far fa-hand-point-right,block green right larger %}

