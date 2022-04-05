---
title: 项目规范-前端环境搭建
tags: 前端环境
categories: 前端环境
comments: false
cover: >-
  https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3290089585,3378733730&fm=26&gp=0.jpg
abbrlink: c7112139
date: 2019-07-28 00:00:00
top_img:
sticky: 100 # 置顶
---

# 前端开发工具环境搭建

## vscode 常用插件安装

- **基础常用**

```bash
Chinese (Simplified) Language Pack for Visual Studio Code		# vscode中文汉化
HTML Boilerplate		           # 使用 HTML 模版插件
Auto Close Tag				       # 自动添加HTML / XML关闭标签（必备）
More ActionsAuto Rename Tag		   # 自动重命名配对的HTML / XML标签(必备)
Color Info					       # 颜色提示
HTML Snippets	                   # 超级实用且初级的 H5代码片段以及提示
CSS Peek					       # 使用此插件，你可以追踪至样式表中 CSS 类和 ids 定义的地方
Path Intellisense			       # 路径提示
Class autocomplete for HTML        # 智能提示HTML class =“”属性（必备）
Bracket Pair Colorizer             # 颜色识别匹配括号
open in browser		               # 打开html文件插件
view in browser			           # 打开html文件插件
Live Server					       # 打开html文件插件

```

- **重要必备**

```bash
NPM							       # Node Package Manager（node包管理器）
Npm Intellisense(node必备)         # require 时的包提示
Debugger for Chrome			       # dug断点测试
json5 syntax                       # json5支持
indent-rainbow                     # 凸显缩进着色，让你的缩进一目了然
GitLens                            # 在代码中显示每一行代码的提交历史
Bootstrap 3 Snippets	           # bootstrap3语法提示
jQuery Code Snippets (推荐)        # jQuery代码智能提示
Beautify				           # 格式化 html ,js,css
IntelliSense for CSS class names (推荐)             # 智能提示 css 的 class 名
JavaScript Code Snippets	# 用于编写js，ts，React，Vue，HHTML等的代码片段，以及ES6语法支持

```

- **vue 开发必备插件**

```json
Vetur
介绍：
	Vue多功能集成插件，包括：语法高亮，智能提示，emmet，错误提示，格式化，
	自动补全，debugger。vscode官方钦定Vue插件，Vue开发者必备。

配置代码片段 vue.json
{
  // Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and
  // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
  // same ids are connected.
  // Example:
  // "Print to console": {
  // 	"prefix": "log",
  // 	"body": [
  // 		"console.log('$1');",
  // 		"$2"
  // 	],
  // 	"description": "Log output to console"
  // }

  "Print to console": {
    "prefix": "vue",
    "body": [
      "<template>",
      "<div class='$2'>$5</div>",
      "</template>",
      "",
      "<script>",
      "",
      "export default {",
      "//import引入的组件需要注入到对象中才能使用",
      "components: {},",
      "data() {",
      "//这里存放数据",
      "return {",
      "",
      "};",
      "},",
      "//监听属性 类似于data概念",
      "computed: {},",
      "//监控data中的数据变化",
      "watch: {},",
      "//方法集合",
      "methods: {",
      "",
      "},",
      "//生命周期 - 创建完成（可以访问当前this实例）",
      "created() {",
      "",
      "},",
      "//生命周期 - 挂载完成（可以访问DOM元素）",
      "mounted() {",
      "",
      "},",
      "beforeCreate() {},   //生命周期 - 创建之前",
      "beforeMount() {},    //生命周期 - 挂载之前",
      "beforeUpdate() {},   //生命周期 - 更新之前",
      "updated() {},        //生命周期 - 更新之后",
      "beforeDestroy() {},  //生命周期 - 销毁之前",
      "destroyed() {},      //生命周期 - 销毁完成",
      "activated() {},      //如果页面有keep-alive缓存功能，这个函数会触发",
      "}",
      "</script>",
      "<style lang='less' scoped>",
      "//@import url($3); 引入公共css类",
      "$4",
      "</style>"
  ],
    "description": "Log output to console"
  }
}

```

- **react 开发必备插件**

```bash
React/Redux/react-router Snippets (推荐)(react必备) # React/Redux/react-router语法智能提示
```

- **开发工具主题配置**

```bash
Icon Fonts                   # vscode图标集
Dracula Official(推荐)       # 很好看的一款主题风格（吸血鬼）
One Dark Pro		 	     # 推荐使用主题
```

- **chrome 常用插件推荐网站-极简插件**

```
https://chrome.zzzmh.cn/
```
