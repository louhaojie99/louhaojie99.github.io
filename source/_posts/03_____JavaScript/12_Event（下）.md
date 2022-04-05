---
title: 十二、事件-Event（下）
tags: JavaScript
categories: JavaScript
cover: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-25182ac6197d798d6d8b22d3b0710cbf_1200x500.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645530798&t=e5c6ac493d1c8b04cd2a4740e1cc9870"
abbrlink: 74c03895
date: 2019-03-12 00:00:00
---

# 事件 Event

## 事件的默认行为及阻止

- 浏览器的默认行为
  - JavaScript 事件本身所具有的属性，例如 a 标签的跳转，Submit 按钮的提交，右键菜单，文本框的输入等。

```
阻止默认行为的方式
1、w3c的方法是e.preventDefault()
2、IE则是使用e.returnValue = false;
3、函数内部return false;

自定义右键菜单
  oncontextmenu
```

## DOM2 级事件处理程序

### 添加事件监听器

- **添加事件监听器**：**`ele.addEventListener(事件名，处理函数，布尔值)`**
  - 注意：适用于现代浏览器（IE9、10、11 | ff, chorme, safari, opera）
  - 注意：事件名不带 on，处理函数为函数引用，布尔值代表冒泡(内到外)或捕获（外到内）
  - element.addEventListener(“click”,function(){},false);//false 事件冒泡
  - element.addEventListener(“click”,function(){},true);//true 事件捕获

### 移除事件监听器

- **移除事件监听器**：**`removeEventListener(事件名，处理函数)`**

### IE8 以下的事件监听器

- IE8 及以下的事件监听器：attachEvent(事件名，处理函数)，detachEvent(事件名，处理函数)事件名带 on

## 事件委托机制

- 事件委托
  - 利用事件冒泡的原理，把本应添加给某元素上的事件委托给他的父级（外层）。
  - **使用案例**
    如果一个 ul 中有很多 li，循环遍历所有的 li，给 li 添加事件效率比较低，我们可以监听 ul 的点击事件，利用子元素的点击事件都会冒泡到父元素的特点，就可以知道什么时候点击了 li。好处：效率高，可以给未来元素添加事件

## 事件对象（重点）

- 拖拽效果
  - 拖拽原理三个事件：onmousedown、onmousemove、onmouseup

```
实现思路：
1：给目标元素添加onmousedown事件，拖拽的前提是在目标元素按下鼠标左键。

2：当onmousedown发生以后，此刻给document添加onmousemove事件，意味着此刻鼠标在网页的移动都将改变目标元素的位置。

3：在onmousemove事件中，设定目标元素的left和top，公式：
目标元素的left = 鼠标的clientX – （鼠标和元素的横坐标差，即offsetX）
目标元素的top = 鼠标的clientY– （鼠标和元素的纵坐标差，即offsetY）。

4：当onmousedown发生以后，此刻给document添加onmouseup事件，意味着此刻鼠标在网页的任意位置松开鼠标，都会放弃拖拽的效果。

5：在onmouseup事件中，取消document的onmousemove事件即可。
```
