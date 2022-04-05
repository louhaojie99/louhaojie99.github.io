---
title: 项目规范-git commit提交信息
tags: git
categories: git
comments: false
cover: "https://rmt.ladydaily.com/fetch/tzk/storage/20210302234030.png"
abbrlink: 331abafc
date: 2019-07-29 00:00:00
top_img:
sticky: 102 # 置顶
---

## 前言

> 目的规范化团队的代码提交管理，方便与明确知道提交记录的目的。
>
> 便于程序员对提交历史进行追溯，了解发生了什么情况。
>
> 一旦约束了 commit message，意味着我们将慎重的进行每一次提交，不能再一股脑的把各种各样的改动都放在一个 git commit 里面，这样一来整个代码改动的历史也将更加清晰。
>
> 格式化的 commit message 才可以用于自动化输出 Change log。

## 提交预览

{% tabs test1 %}

<!-- tab 提交格式 -->

```bash
<type>(<scope>): <subject> // <类型>(<范围>): <主语>

参数说明：
1、scope(可选)
   scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
   例如在Angular，可以是location，browser，compile，compile，rootScope，
   ngHref，ngClick，  ngView等。如果你的修改影响了不止一个scope，你可以使用*代替。

2、subject(必须)
   subject是commit目的的简短描述，不超过50个字符。
   建议使用中文（感觉中国人用中文描述问题能更清楚一些）。
   结尾不加句号或其他标点符号。
```

<!-- endtab -->

<!-- tab 参数说明(type) -->

> 用于说明 git commit 的类别，只是允许使用下面的标识。
>
> 以下表格来自[阿里技术](https://zhuanlan.zhihu.com/p/182553920?utm_source=org.mozilla.firefox)

| 标识       | 含义                                                                                                                                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `feat`     | 新功能（feature）。                                                                                                                                                                                                   |
| `fix/to`   | 修复 bug，可以是 QA 发现的 BUG，也可以是研发自己发现的 BUG。<br />`fix`：产生 diff 并自动修复此问题。适合于一次提交直接修复问题。<br />`to`: 只产生 diff 不自动修复此问题。适合于多次提交。最终修复问题提交使用 fix。 |
| `docs`     | 文档（documentation）。                                                                                                                                                                                               |
| `style`    | 格式（不影响代码运行的变动）。                                                                                                                                                                                        |
| `refactor` | 重构（即不是新增功能，也不是修改 bug 的代码变动）。                                                                                                                                                                   |
| `perf`     | 优化相关，比如提升性能、体验。                                                                                                                                                                                        |
| `test`     | 增加测试。                                                                                                                                                                                                            |
| `chore`    | 构建过程或辅助工具的变动。                                                                                                                                                                                            |
| `revert`   | 回滚到上一个版本。                                                                                                                                                                                                    |
| `merge`    | 代码合并。                                                                                                                                                                                                            |
| `sync`     | 同步主线或分支的 Bug。                                                                                                                                                                                                |

<!-- endtab -->

<!-- tab 参数说明(scope) -->

`scope`(可选)

1、scope 用于说明 `commit 影响的范围`，比如`数据层`、`控制层`、`视图层`等等，视项目不同而不同。

2、例如在 Angular，可以是 location，browser，compile，compile，rootScope，ngHref，ngClick， ngView 等。如果你的修改影响了不止一个 scope，你可以使用\*代替。

<!-- endtab -->

<!-- tab 参数说明(subject) -->

`subject`(必须)

1、subject 是 commit 目的的`简短描述`，不超过 50 个字符。
2、``（感觉中国人用中文描述问题能更清楚一些）。 3、`结尾不加句号`或`其他标点符号`。

<!-- endtab -->

<!-- tab 示例 -->

```bash
// 严谨commit提交规范
fix(DAO): 登录功能表单缺少phone字段
feat(Controller): 用户查询接口开发

// 通常开发commit提交规范
feat：注册功能模块开发
feat：登录功能模块开发
fix：修复注册表单正则预校验
fix：修复登录表单正则预校验
```

<!-- endtab -->

{% endtabs %}

## vscode commit 规范化工具

vscode 中`Git-commit-plugin`插件可以快速生成提交模板。

设置项

- 展示 Emoji

  默认为 `true`。可在设置中修改

- 提交类型

  增加其他的提交类型，需要在 json 中添加。、

  ```json
  "GitCommitPlugin.CustomCommitType": [
    {
      "label": "customTypeName",
      "detail": "customTypeDetail"
    }
  ]
  ```

- subject 最大长度

  subject 的最大长度限制，默认为 20。可在设置中修改。

## 其他

- [项目 commit 规范案例](https://github.com/typicode/husky)
- [commit 文档](https://commitlint.js.org/#/)
- [博友 commit 提交规范文档](https://blog.csdn.net/y491887095/article/details/80594043)

## 文献参考

- [git commit 规范指南](https://segmentfault.com/a/1190000009048911)
- [如何规范你的 git commit？](https://zhuanlan.zhihu.com/p/182553920?utm_source=org.mozilla.firefox)
