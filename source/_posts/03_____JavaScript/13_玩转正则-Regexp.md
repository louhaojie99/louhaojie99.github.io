---
title: 十三、玩转正则-RegExp
tags: JavaScript
categories: JavaScript
cover: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-25182ac6197d798d6d8b22d3b0710cbf_1200x500.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645530798&t=e5c6ac493d1c8b04cd2a4740e1cc9870"
abbrlink: abbe594b
date: 2019-03-13 00:00:00
---

# 正则表达式 - Regexp

## 1：正则的概念

- 正则表达式(regular expression)是一个描述字符规则的对象。可以用来检查一个字符串是否含有某个子字符串，将匹配的子字符串做替换或者从某个字符串中取出符合某个条件的子串等。
  为什么要用正则：
  前端往往有大量的表单数据校验工作，采用正则表达式会使得数据校验的工作量大大减轻。常用效果：邮箱、手机号、身份证号等。

## 2：创建方式

- 第一种方式：

```javascript
  var reg = new RegExp(“study”，“ig”);   // 第二个参数为修饰符
```

- i：表示忽略大小写 ignore。
  g：表示全局匹配，查找所有匹配而非在找到第一个匹配后停止 global。

- 第二种方式：

```javascript
var reg = /study/gi;
```

## 3：正则对象方法

- test： 正则实例对象的 test 方法返回一个布尔值，表示当前模式是否能匹配参数字符串

```javascript
  /cat/.test('cats and dogs') // true

  上面代码验证参数字符串之中是否包含cat，结果返回true。
  如果正则表达式带有g修饰符，则每一次test方法都从上一次结束的位置开始向后匹配
```
