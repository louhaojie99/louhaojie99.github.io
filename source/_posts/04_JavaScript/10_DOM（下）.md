---
title: 十、DOM（下）
tags: JavaScript
categories: JavaScript
cover: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-25182ac6197d798d6d8b22d3b0710cbf_1200x500.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645530798&t=e5c6ac493d1c8b04cd2a4740e1cc9870"
abbrlink: 5883fa92
date: 2019-03-10 00:00:00
---

# DOM（下）

- `DOM` 树就是我们 `html` 结构中一个一个的节点构成的
- 不光我们的标签是一个节点，我们写的文本内容也是一个节点，注释，包括空格都是节点

## DOM 节点

- `DOM` 的节点我们一般分为常用的三大类 **元素节点** / **文本节点** / **属性节点**
- 什么是分类，比如我们在获取元素的时候，通过各种方法获取到的我们叫做元素节点（标签节点）
- 比如我们标签里面写的文字，那么就是文本节点
- 写在每一个标签上的属性，就是属性节点

### 元素节点

- 我们通过 `getElementBy...` 获取到的都是元素节点

### 属性节点

- 我们通过 `getAttribute` 获取的就是元素的属性节点

### 文本节点

- 我们通过 `innerText` 获取到的就是元素的文本节点

### 获取节点

- `childNodes`：获取某一个节点下 **所有的子一级节点**

  ```html
  <body>
    <div>
      <p>hello</p>
    </div>

    <script>
      // 这个 oDiv 获取的是页面中的 div 元素，就是一个元素节点
      var oDiv = document.querySelector("div");

      console.log(oDiv.childNodes);
      /*
      	NodeList(3) [text, p, text]
        0: text
        1: p
        2: text
        length: 3
        __proto__: NodeList
      */
    </script>
  </body>
  ```

  - 我们会发现，拿到以后是一个伪数组，里面有三个节点
  - 一个 `text`：从 `<div> 一直到 <p>` 中间有一个换行和一堆空格，这个是第一个节点，是一个文本节点
  - 一个 `p`：这个 `p` 标签就是第二个节点，这个是一个元素节点
  - 一个 `text`：从 `</p> 一直到 </div>` 中间有一个换行和一堆空格，这个是第三个节点，是一个文本节点
  - 这个时候就能看到我们有不同的节点类型了

- `children` ：获取某一节点下所有的子一级 **元素节点**

  ```html
  <body>
    <div>
      <p>hello</p>
    </div>

    <script>
      // 这个 oDiv 获取的是页面中的 div 元素，就是一个元素节点
      var oDiv = document.querySelector("div");

      console.log(oDiv.children);
      /*
      	HTMLCollection [p]
        0: p
        length: 1
        __proto__: HTMLCollection
      */
    </script>
  </body>
  ```

  - 我们发现只有一个节点了，因为 `children` 只要元素节点
  - div 下面又只有一个元素节点，就是 `p`
  - 所以就只有一个，虽然只有一个，但是也是一个 **伪数组**

- `firstChild`：获取某一节点下子一级的 **第一个节点**

  ```html
  <body>
    <div>
      <p>hello</p>
    </div>

    <script>
      // 这个 oDiv 获取的是页面中的 div 元素，就是一个元素节点
      var oDiv = document.querySelector("div");

      console.log(oDiv.firstChild); // #text
    </script>
  </body>
  ```

  - 这个是只获取一个节点，不再是伪数组了
  - 获取的是第一个
  - 第一个就是 `<div> 一直到 <p>` 的那个换行和空格，是个文本节点

- `lastChild`：获取某一节点下子一级的 **最后一个节点**

  ```html
  <body>
    <div>
      <p>hello</p>
    </div>

    <script>
      // 这个 oDiv 获取的是页面中的 div 元素，就是一个元素节点
      var oDiv = document.querySelector("div");

      console.log(oDiv.lastChild); // #text
    </script>
  </body>
  ```

  - 只获取一个节点，不再是伪数组
  - 获取的是最后一个
  - 最后一个就是 `</p> 一直到 </div>` 之间的换行和空格，是个文本节点

- `firstElementChild`：获取某一节点下子一级 **第一个元素节点**

  ```html
  <body>
    <div>
      <p>hello</p>
    </div>

    <script>
      // 这个 oDiv 获取的是页面中的 div 元素，就是一个元素节点
      var oDiv = document.querySelector("div");

      console.log(oDiv.firstElementChild); // <p>hello</p>
    </script>
  </body>
  ```

  - 只获取一个节点，不在是伪数组
  - 获取的是第一个 **元素节点**
  - 第一个元素节点就是 `p` 标签，是一个元素节点

- `lastElementChild`：获取某一节点下子一级 **最后一个元素节点**

  ```html
  <body>
    <div>
      <p>hello</p>
      <p>world</p>
    </div>

    <script>
      // 这个 oDiv 获取的是页面中的 div 元素，就是一个元素节点
      var oDiv = document.querySelector("div");

      console.log(oDiv.lastElementChild); // <p>world</p>
    </script>
  </body>
  ```

  - 只获取一个节点，不在是伪数组
  - 获取的是最后一个 **元素节点**
  - 最后一个元素节点是 `<p>world</p>`，是一个元素节点

- `nextSibling`：获取某一个节点的 **下一个兄弟节点**

  ```html
  <body>
    <ul>
      <li id="a">hello</li>
      <li id="b">world</li>
      <li id="c">!!!</li>
    </ul>

    <script>
      // 这个 oLi 获取的是页面中的 li 元素，就是一个元素节点
      var oLi = document.querySelector("#b");

      console.log(oLi.nextSibling); // #text
    </script>
  </body>
  ```

  - 只获取一个节点，不在是伪数组
  - 获取的是 `id="b"` 这个 `li` 的下一个兄弟节点
  - 因为 `id="b"` 的下一个节点，是两个 `li` 标签之间的换行和空格，所以是一个文本节点

- `previousSibling`：获取某一个节点的 **上一个兄弟节点**

  ```html
  <body>
    <ul>
      <li id="a">hello</li>
      <li id="b">world</li>
      <li id="c">!!!</li>
    </ul>

    <script>
      // 这个 oLi 获取的是页面中的 li 元素，就是一个元素节点
      var oLi = document.querySelector("#b");

      console.log(oLi.previousSibling); // #text
    </script>
  </body>
  ```

  - 只获取一个节点，不在是伪数组
  - 获取的是 `id="b"` 这个 `li` 的上一个兄弟节点
  - 因为 `id="b"` 的上一个节点，是两个 `li` 标签之间的换行和空格，所以是一个文本节点

- `nextElementSibling`：获取某一个节点的 **下一个元素节点**

  ```html
  <body>
    <ul>
      <li id="a">hello</li>
      <li id="b">world</li>
      <li id="c">!!!</li>
    </ul>

    <script>
      // 这个 oLi 获取的是页面中的 li 元素，就是一个元素节点
      var oLi = document.querySelector("#b");

      console.log(oLi.nextElementSibling); // <li id="c">!!!</li>
    </script>
  </body>
  ```

  - 只获取一个节点，不在是伪数组
  - 获取的是 `id="b"` 这个 `li` 的下一个兄弟元素节点
  - 因为 `id="b"` 的下一个兄弟元素节点就是 `id="c"` 的 `li`，是一个元素节点

- `previousElementSibling`：获取某一个节点的 **上一个元素节点**

  ```html
  <body>
    <ul>
      <li id="a">hello</li>
      <li id="b">world</li>
      <li id="c">!!!</li>
    </ul>

    <script>
      // 这个 oLi 获取的是页面中的 li 元素，就是一个元素节点
      var oLi = document.querySelector("#b");

      console.log(oLi.previousElementSibling); // <li id="a">hello</li>
    </script>
  </body>
  ```

  - 只获取一个节点，不在是伪数组
  - 获取的是 `id="b"` 这个 `li` 的上一个兄弟元素节点
  - 因为 `id="b"` 的上一个兄弟元素节点就是 `id="a"` 的 `li`，是一个元素节点

- `parentNode`：获取某一个节点的 **父节点**

  ```html
  <body>
    <ul>
      <li id="a">hello</li>
      <li id="b">world</li>
      <li id="c">!!!</li>
    </ul>

    <script>
      // 这个 oLi 获取的是页面中的 li 元素，就是一个元素节点
      var oLi = document.querySelector("#b");

      console.log(oLi.parentNode); // <ul>...</ul>
    </script>
  </body>
  ```

  - 只获取一个节点，不在是伪数组
  - 获取的是当前这个 `li` 的父元素节点
  - 因为这个 `li` 的父亲就是 `ul`，所以获取到的就是 `ul`，是一个元素节点

- `attributes`：获取某一个 **元素节点** 的所有 **属性节点**

  ```html
  <body>
    <ul>
      <li id="a" a="100" test="test">hello</li>
    </ul>

    <script>
      // 这个 oLi 获取的是页面中的 li 元素，就是一个元素节点
      var oLi = document.querySelector("#a");

      console.log(oLi.attributes);
      /*
      	NamedNodeMap {0: id, 1: a, 2: test, id: id, a: a, test: test, length: 3}
        0: id
        1: a
        2: test
        length: 3
        a: a
        id: id
        test: test
        __proto__: NamedNodeMap
      
      */
    </script>
  </body>
  ```

  - 获取的是一组数据，是该元素的所有属性，也是一个伪数组
  - 这个 `li` 有三个属性，`id` / `a` / `test` 三个，所以就获取到了这三个

### 节点属性

- 我们已经知道节点会分成很多种，而且我们也能获取到各种不同的节点

- 接下来我们就来聊一些各种节点之间属性的区别

- 我们先准备一段代码

  ```html
  <body>
    <ul test="我是 ul 的一个属性">
      <li>hello</li>
    </ul>

    <script>
      // 先获取 ul
      var oUl = document.querySelector("ul");

      // 获取到 ul 下的第一个子元素节点，是一个元素节点
      var eleNode = oUl.firstElementChild;

      // 获取到 ul 的属性节点组合，因为是个组合，我们要拿到节点的话要用索引
      var attrNode = oUl.attributes[0];

      // 获取到 ul 下的第一个子节点，是一个文本节点
      var textNode = oUl.firstChild;
    </script>
  </body>
  ```

#### nodeType

- `nodeType`：获取节点的节点类型，用数字表示

  ```javascript
  console.log(eleNode.nodeType); // 1
  console.log(attrNode.nodeType); // 2
  console.log(textNode.nodeType); // 3
  ```

  - `nodeType === 1` 就表示该节点是一个 **元素节点**
  - `nodeType === 2` 就表示该节点是一个 **属性节点**
  - `nodeType === 3` 就表示该节点是一个 **注释节点**

#### nodeName

- `nodeName`：获取节点的节点名称

  ```javascript
  console.log(eleNode.nodeName); // LI
  console.log(attrNode.nodeName); // test
  console.log(textNode.nodeName); // #text
  ```

  - 元素节点的 `nodeName` 就是 **大写标签名**
  - 属性节点的 `nodeName` 就是 **属性名**
  - 文本节点的 `nodeName` 都是 **#text**

#### nodeValue

- `nodeValue`： 获取节点的值

  ```javascript
  console.log(eleNode.nodeValue); // null
  console.log(attrNode.nodeValue); // 我是 ul 的一个属性
  console.log(textNode.nodeValue); // 换行 + 空格
  ```

  - 元素节点没有 `nodeValue`
  - 属性节点的 `nodeValue` 就是 **属性值**
  - 文本节点的 `nodeValue` 就是 **文本内容**

#### 汇总

| -        | nodeType | nodeName   | nodeValue |
| -------- | -------- | ---------- | --------- |
| 元素节点 | 1        | 大写标签名 | null      |
| 属性节点 | 2        | 属性名     | 属性值    |
| 文本节点 | 3        | \#text     | 文本内容  |

## 操作 DOM 节点

- 我们所说的操作无非就是 **增删改查（CRUD）**
- 创建一个节点（因为向页面中增加之前，我们需要先创建一个节点出来）
- 向页面中增加一个节点
- 删除页面中的某一个节点
- 修改页面中的某一个节点
- 获取页面中的某一个节点

### 创建一个节点

- `createElement`：用于创建一个元素节点

  ```javascript
  // 创建一个 div 元素节点
  var oDiv = document.createElement("div");

  console.log(oDiv); // <div></div>
  ```

  - 创建出来的就是一个可以使用的 div 元素

- `createTextNode`：用于创建一个文本节点

  ```javascript
  // 创建一个文本节点
  var oText = document.createTextNode("我是一个文本");

  console.log(oText); // "我是一个文本"
  ```

### 向页面中加入一个节点

- `appendChild`：是向一个元素节点的末尾追加一个节点

- 语法： `父节点.appendChild(要插入的子节点)`

  ```javascript
  // 创建一个 div 元素节点
  var oDiv = document.createElement("div");
  var oText = document.createTextNode("我是一个文本");

  // 向 div 中追加一个文本节点
  oDiv.appendChild(oText);

  console.log(oDiv); // <div>我是一个文本</div>
  ```

- `insertBefore`：向某一个节点前插入一个节点

- 语法： `父节点.insertBefore(要插入的节点，插入在哪一个节点的前面)`

  ```html
  <body>
    <div>
      <p>我是一个 p 标签</p>
    </div>

    <script>
      var oDiv = document.querySelector("div");
      var oP = oDiv.querySelector("p");

      // 创建一个元素节点
      var oSpan = document.createElement("span");

      // 将这个元素节点添加到 div 下的 p 的前面
      oDiv.insertBefore(oSpan, oP);

      console.log(oDiv);
      /*
      	<div>
      		<span></span>
      		<p>我是一个 p 标签</p>
      	</div>
      */
    </script>
  </body>
  ```

### 删除页面中的某一个节点

- `removeChild`：移除某一节点下的某一个节点

- 语法：`父节点.removeChild(要移除的字节点)`

  ```html
  <body>
    <div>
      <p>我是一个 p 标签</p>
    </div>

    <script>
      var oDiv = document.querySelector("div");
      var oP = oDiv.querySelector("p");

      // 移除 div 下面的 p 标签
      oDiv.removeChild(oP);

      console.log(oDiv); // <div></div>
    </script>
  </body>
  ```

### 修改页面中的某一个节点

- `replaceChild`：将页面中的某一个节点替换掉

- 语法： `父节点.replaceChild(新节点，旧节点)`

  ```html
  <body>
    <div>
      <p>我是一个 p 标签</p>
    </div>

    <script>
      var oDiv = document.querySelector("div");
      var oP = oDiv.querySelector("p");

      // 创建一个 span 节点
      var oSpan = document.createElement("span");
      // 向 span 元素中加点文字
      oSpan.innerHTML = "我是新创建的 span 标签";

      // 用创建的 span 标签替换原先 div 下的 p 标签
      oDiv.replaceChild(oSpan, oP);

      console.log(oDiv);
      /*
      	<div>
      		<span>我是新创建的 span 标签</span>
      	</div>
      */
    </script>
  </body>
  ```

## 获取元素的非行间样式

- 我们在操作 `DOM` 的时候，很重要的一点就是要操作元素的 `css` 样式

- 那么在操作 `css` 样式的时候，我们避免不了就要获取元素的样式

- 之前我们说过可以用 `元素.style.xxx` 来获取

- 但是这个方法只能获取到元素 **行间样式**，也就是写在行内的样式

  ```html
  <style>
    div {
      width: 100px;
    }
  </style>
  <body>
    <div style="height: 100px;">
      <p>我是一个 p 标签</p>
    </div>

    <script>
      var oDiv = document.querySelector("div");
      console.log(oDiv.style.height); // 100px
      console.log(oDIv.style.width); // ''
    </script>
  </body>
  ```

- 不管是外链式还是内嵌式，我们都获取不到该元素的样式

- 这里我们就要使用方法来获取了 **`getComputedStyle`** 和 **`currentStyle`**

- 这两个方法的作用是一样的，只不过一个在 **非 IE** 浏览器，一个在 **IE** 浏览器

### getComputedStyle（非 IE 使用）

- 语法：`window.getComputedStyle(元素, null).要获取的属性`

  ```html
  <style>
    div {
      width: 100px;
    }
  </style>
  <body>
    <div style="height: 100px;">
      <p>我是一个 p 标签</p>
    </div>

    <script>
      var oDiv = document.querySelector("div");
      console.log(window.getComputedStyle(oDiv).width); // 100px
      console.log(window.getComputedStyle(oDiv).height); // 100px
    </script>
  </body>
  ```

  - 这个方法获取行间样式和非行间样式都可以

### currentStyle（IE 使用）

- 语法： `元素.currentStyle.要获取的属性`

  ```html
  <style>
    div {
      width: 100px;
    }
  </style>
  <body>
    <div style="height: 100px;">
      <p>我是一个 p 标签</p>
    </div>

    <script>
      var oDiv = document.querySelector("div");
      console.log(oDiv.currentStyle.width); // 100px
      console.log(oDiv.currentStyle.height); // 100px
    </script>
  </body>
  ```

## 获取元素的偏移量

- 就是元素在页面上的什么位置
- 我们有几个属性来获取，**`offsetLeft`** 和 **`offsetTop`** 和 **`offsetWidth`** 和 **`offsetHeight`**

### offsetLeft 和 offsetTop

- 获取的是元左边的偏移量和上边的偏移量
- 分成两个情况来看
- 没有定位的情况下
  - 获取元素边框外侧到页面内侧的距离
- 有定位的情况下
  - 获取元素边框外侧到定位父级边框内侧的距离（其实就是我们写的 `left` 和 `top` 值）

### offsetWidth 和 offsetHeight

- 获取元素 `内容宽高 + padding宽高 + border宽高` 的和
