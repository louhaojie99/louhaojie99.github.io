---
title: 十一、事件-Event（上）
tags: JavaScript
categories: JavaScript
cover: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-25182ac6197d798d6d8b22d3b0710cbf_1200x500.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645530798&t=e5c6ac493d1c8b04cd2a4740e1cc9870"
abbrlink: e80cdd3
date: 2019-03-11 00:00:00
---

# 事件 Event

## 事件基础

```
JavaScript 事件是由访问 Web 页面的用户引起的一系列操作。
当用户执行某些操作的时候，再去执行一系列代码。或者用来获取事件的详细信息，
如鼠标位置、键盘按键等。
```

## 事件处理函数

```
javaScript可以处理的事件类型为：鼠标事件、键盘事件、HTML事件
所有的事件处理函数都会都有两个部分组成，on + 事件名称
```

## 常用鼠标事件（重点）

```
onclick:		 用户单击鼠标按钮
ondblclick:		 当用户双击主鼠标按钮时触发
onmousedown:	 当用户按下鼠标还未弹起时触发
onmouseup：		当用户释放鼠标按钮时触发
onmouseover：	当鼠标移到某个元素上方时触发
onmouseout：		当鼠标移出某个元素上方时触发
onmousemove：	当鼠标指针在元素上移动时触发
```

## 常用 HTML 事件（重点）

```
onload：		当页面或者资源完全加载后在 window 上面触发
onselect：	当用户选择文本框(input 或 textarea)中的一个或多个字符触发
onchange：	当文本框(input 或 textarea)内容改变且失去焦点后触发
onfocus：	当页面或者元素获得焦点时在 window 及相关元素上面触发
onblur：		当页面或元素失去焦点时在 window 及相关元素上触发
onresize：	当窗口或框架的大小变化时在 window 或框架上触发
onscroll：	当用户滚动带滚动条的元素时触发
```

## 事件对象

- 事件对象

  - 当触发某个事件时，会产生一个事件对象，这个对象包含着所有与事件有关的信息 。包括导致事件的元素、事件的类型、以及其它与特定事件相关的信息。

- 通过事件绑定的执行函数是可以得到一个隐藏参数的 。说明，浏览器会自动分配一个参数，这个参数其实就是 event 对象。

- **Event 对象获取方式 （兼容性）**

```
el.onclick=function(evt){
	let e = evt || window.event
}
```

## 事件对象属性

```
event.button属性
  当前事件触发时哪个鼠标按键被点击（onmousedown  0 左键 1 滚轮 2 右键）

clientX、clientY属性
  鼠标在可视区X坐标和Y坐标，即距离左边框和上边框的距离

screenX、screenY属性
  鼠标在屏幕区X坐标和Y坐标，即距离左屏幕和上屏幕的距离

offsetX、offsetY属性
  鼠标相对于事件源的X坐标和Y坐标

pageX、pageY
  鼠标相对于文档的X坐标和Y坐标
```

## 键盘事件（重点）

- 键盘事件**`keyup`**、**keydown**、**`keypress`**
  - onkeydown：当用户按下键盘上任意键触发，如果按住不放，会重复触发
  - onkeypress：当用户按下键盘上的字符键触发，如果按住不放，会重复触发
  - onkeyup：当用户释放键盘上的键触发

```javascript
组合键A、altkey、shiftkey
    altKey属性，boolean类型，表示发生事件的时候alt键是否被按下
    ctrlKey属性，boolean类型，表示发生事件的时候ctrl键是否被按下
    shiftKey属性，boolean类型，表示发生事件的时候shift键是否被按下 
    keyCode/which兼容

注意：事件源 target（事件在哪个元素上产生）
```

## 事件的冒泡&阻止冒泡传递

- 事件的冒泡 - 事件按照从最特定的事件目标到最不特定的事件目标(document 对象)的顺序触发。
  **`阻止事件冒泡`**：e.stopPropagation();

      - 注：低版本ie：**`e.cancelBubble = true;`**
