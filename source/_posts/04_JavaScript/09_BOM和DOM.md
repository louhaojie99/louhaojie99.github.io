---
title: 九、BOM和DOM
tags: JavaScript
categories: JavaScript
cover: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-25182ac6197d798d6d8b22d3b0710cbf_1200x500.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645530798&t=e5c6ac493d1c8b04cd2a4740e1cc9870"
abbrlink: a253b181
date: 2019-03-09 00:00:00
---

# BOM / DOM（上）

## BOM

- BOM（Browser Object Model）： 浏览器对象模型

- 其实就是操作浏览器的一些能力

- 我们可以操作哪些内容

  1. 获取一些浏览器的相关信息（窗口的大小）

  2. 操作浏览器进行页面跳转

  3. 获取当前浏览器地址栏的信息

  4. 操作浏览器的滚动条

  5. 浏览器的信息（浏览器的版本）

  6. 让浏览器出现一个弹出框（alert/confirm/prompt）

- BOM 的核心就是 window 对象

- window 是浏览器内置的一个对象，里面包含着操作浏览器的方法

### 弹窗

1. `aleat()`是在浏览器弹出一个提示框

   ```javascript
   window.alert("我是一个提示框");
   // 这个弹出层知识一个提示内容，只有一个确定按钮，点击确定按钮以后，这个提示框就消失了
   ```

2. `confirm` 是在浏览器弹出一个询问框

   ```javascript
   var boo = window.confirm("我是一个询问框");
   console.log(boo);
   /*
      这个弹出层有一个询问信息和两个按钮
      当你点击确定的时候，就会得到 true，当你点击取消的时候，就会得到 false
   */
   ```

3. `prompt` 是在浏览器弹出一个输入框

   ```javascript
   var str = window.prompt("请输入内容：");
   console.log(str);
   /*
      这个弹出层有一个输入框和两个按钮
      当你点击取消的时候，得到的是 null
      当你点击确定的时候得到的就是你输入的内容
   */
   ```

### 获取浏览器窗口的尺寸

- ` innerHeight` 和 `innerWidth`，这两个方法分别是用来获取浏览器窗口的宽度和高度（包含滚动条的）

  ```javascript
  var windowHeight = window.innerHeight;
  console.log(windowHeight);

  var windowWidth = window.innerWidth;
  console.log(windowWidth);
  ```

### 浏览器地址信息

- 在 window 中有一个对象叫做 `location`
- 就是专门用来存储浏览器的地址栏内的信息的

1. `window.location.href`，这个属性存储的是浏览器地址栏内 url 地址的信息

   ```javascript
   console.log(window.location.href); // https://www.baidu.com/

   // 这个属性也可以给他赋值
   window.location.href = "https://www.jd.com/"; // 这个就会跳转页面到后面你给的那个地址
   ```

2. `window.location.reload()`，这个方法会重新加载一遍页面，就相当于刷新是一个道理

   ```javascript
   window.location.reload();
   // 注意：不要写在全局，不然浏览器就会一直处在刷新状态
   ```

### 浏览器的历史记录

- window 中有一个对象叫做 `history`
- 是专门用来存储历史记录信息的

1. `history.back`，是用来会退历史记录的，就是回到前一个页面，就相当于浏览器上的 ⬅️ 按钮

   ```javascript
   window.history.back();
   // 前提是你要有上一条记录，不然就是一直在这个页面，也不会回退
   ```

2. `history.forword`，是去到下一个历史记录里面，也就是去到下一个页面，就相当于浏览器上的 ➡️ 按钮

   ```javascript
   window.history.forward();
   // 前提是你要之前有过回退操作，不然的话你现在就是最后一个页面，没有下一个
   ```

### 浏览器的版本信息

- window 中有一个对象叫做 `navigator`
- 是专门用来获取浏览器信息的

1. `navigator.userAgent`，是获取的浏览器的整体信息

   ```javascript
   console.log(window.navigator.userAgent);
   // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36
   ```

2. `navigator.appName`， 获取的是浏览器的名称

   ```javascript
   console.log(window.navigator.appName);
   ```

3. `navigator.appVersion`，获取的是浏览器的版本号

   ```javascript
   console.log(window.navigator.appVersion);
   ```

4. `navigator.platform`，获取到的是当前计算机的操作系统

   ```
   console.log(window.navigator.platform);
   ```

### 浏览器的 onload 事件

- 这个不在是对象了，而是一个事件，是在页面所有资源加载完毕后执行的

  ```javascript
  window.onload = function () {
    console.log("页面已经加载完毕触发的");
  };
  ```

  - **使用场景：**

  1. 在 html 页面中把 js 写在 head 里面

     ```html
     <html>
       <head>
         <meta charset="UTF-8" />
         <script>
           // 这个代码执行的时候，body 还没有加载
           // 这个时候我们就获取不到 body 中的那个 div

           // 就需要使用 window.onload 事件
           window.onload = function () {
             // 这个函数会在页面加载完毕以后在执行
             // 那么这个时候页面的 DOM 元素都已经加载了，我们就可以获取 div 了
           };
         </script>
       </head>
       <body>
         <div></div>
       </body>
     </html>
     ```

  2. 在 html 页面中把 js 写在 body 最后面

     ```html
     <html>
       <head>
         <meta charset="UTF-8" />
       </head>
       <body>
         <div></div>

         <script>
           // 这个代码执行的时候，body 已经加载完毕了
           // 在这里就可以获取到 div，写不写 window.onload 就无所谓了

           window.onload = function () {
             // 这个函数会在页面加载完毕以后在执行
             // 那么这个时候页面的 DOM 元素都已经加载了，我们就可以获取 div 了
           };
         </script>
       </body>
     </html>
     ```

### 浏览器的 onscroll 事件

- 这个 onscroll 事件是当浏览器的滚动条滚动的时候触发

- 或者鼠标滚轮滚动的时候出发

  ```javascript
  window.onscroll = function () {
    console.log("浏览器滚动了");
  };
  // 注意：前提是页面的高度要超过浏览器的可是窗口才可以
  ```

- **浏览器滚动的距离:**

1. `scrollTop`，获取的是页面向上滚动的距离

   ```javascript
   // 一共有两个获取方式
   -document.body.scrollTop - document.documentElement.scrollTop;

   window.onscroll = function () {
     console.log(document.body.scrollTop);
     console.log(document.documentElement.scrollTop);
   };

   /*
     两种方式的区别：
     IE浏览器：
     		)没有 `DOCTYPE` 声明的时候，用这两个都行
    		)有 `DOCTYPE` 声明的时候，只能用 `document.documentElement.scrollTop`
    		
     Chrome 和 FireFox：
     		)没有 `DOCTYPE` 声明的时候，用 `document.body.scrollTop`
     		)有 `DOCTYPE` 声明的时候，用 `document.documentElement.scrollTop`
     Safari：
     		)两个都不用，使用一个单独的方法 `window.pageYOffset `
   */
   ```

2. `scrollLeft`，获取页面向左滚动的距离

   ```javascript
   // 一共有两个获取方式
   -document.body.scrollLeft - document.documentElementLeft;

   window.onscroll = function () {
     console.log(document.body.scrollLeft);
     console.log(document.documentElement.scrollLeft);
   };
   ```

## DOM（上）

- DOM（Document Object Model）： 文档对象模型
- 其实就是操作 html 中的标签的一些能力
- 我们可以操作哪些内容
  - 获取一个元素
  - 移除一个元素
  - 创建一个元素
  - 向页面里面添加一个元素
  - 给元素绑定一些事件
  - 获取元素的属性
  - 给元素添加一些 css 样式
- DOM 的核心对象就是 docuemnt 对象
- document 对象是浏览器内置的一个对象，里面存储着专门用来操作元素的各种方法
- DOM： 页面中的标签，我们通过 js 获取到以后，就把这个对象叫做 DOM 对象

### 获取 dom 元素常用方式

1. `getElementById`，是通过标签的 id 名称来获取标签的

   ```html
   // 因为在一个页面中 id 是唯一的，所以获取到的就是一个元素
   <body>
     <div id="box"></div>
     <script>
       var box = document.getElementById("box");
       console.log(box); // <div></div>
     </script>
   </body>
   ```

2. `getElementsByClassName`，是用过标签的 class 名称来获取标签的

   ```html
   /* 因为页面中可能有多个元素的 class 名称一样，所以获取到的是一组元素
   哪怕你获取的 class 只有一个，那也是获取一组元素，只不过这一组中只有一个 DOM
   元素而已 */
   <body>
     <div calss="box"></div>
     <script>
       var box = document.getElementsByClassName("box");
       console.log(box); // [<div></div>]
       console.log(box[0]); // <div></div>
     </script>
   </body>
   ```

3. `getElementsByTagName`，是用过标签的 标签 名称来获取标签的

   ```html
   /* 因为页面中可能有多个元素的 标签 名称一样，所以获取到的是一组元素
   哪怕真的只有一个这个标签名，那么也是获取一组元素，只不过这一组中只有一个 DOM
   元素而已 */
   <body>
     <div></div>
     <script>
       var box = document.getElementsByTagName("div");
       console.log(box); // [<div></div>]
       console.log(box[0]); // <div></div>
     </script>
   </body>
   ```

4. `querySelector`，是按照选择器的方式来获取元素

   ```javascript
   /*
     也就是说，按照我们写 css 的时候的选择器来获取
     这个方法只能获取到一个元素，并且是页面中第一个满足条件的元素
   */
   console.log(document.querySelector("div")); // 获取页面中的第一个 div 元素
   console.log(docuemnt.querySelector(".box")); // 获取页面中第一个有 box 类名的元素
   console.log(document.querySelector("#box")); // 获取页面中第一个 id 名为 box 的元素
   ```

5. `querySelectorAll`，是按照选择器的方式来获取元素

   ```javascript
   // 这个方法能获取到所有满足条件的元素，以一个伪数组的形式返回
   console.log(document.querySelectorAll("div")); // 获取页面中的所有的 div 元素
   console.log(docuemnt.querySelectorAll(".box")); // 获取页面中所有有 box 类名的元素
   ```

### 操作 dom 属性

- 通过我们各种获取元素的方式获取到页面中的标签以后
- 我们可以直接操作 DOM 元素的属性，就能直接把效果展示在页面上

1. `innerHTML`，获取元素内部的 HTML 结构

   ```html
   <!-- 第一种使用方式是：获取dom元素内部的结构 -->
   <body>
     <div>
       <p>hello world</p>
     </div>
     <script>
       var div = document.querySelector("div");
       console.log(div.innerHTML);
       /* <p>hello world</p> */
     </script>
   </body>

   <!-- 第二种使用方式是设置dom元素的内容 -->
   <body>
     <div></div>
     <script>
       var div = document.querySelector("div");
       div.innerHTML = "<p>hello</p>";
     </script>
   </body>
   ```

2. `innerText`，获取元素内部的文本（只能获取到文本内容，获取不到 html 标签）

   ```html
   <!-- 第一种使用方式是：获取dom元素内部的文本 -->
   <body>
     <div>
       <p>hello world</p>
     </div>
     <script>
       var div = document.querySelector("div");
       console.log(div.innerText);
       /* hello world */
     </script>
   </body>

   <!-- 第二种使用方式是设置dom元素的内容 -->
   <body>
     <div></div>
     <script>
       var div = document.querySelector("div");
       div.innerText = "hello";
     </script>
   </body>
   ```

3. `getAttribute`，获取元素的某个属性（包括自定义属性）

   ```html
   <body>
     <div a="100" class="box"></div>

     <script>
       var div = document.querySelector("div");
       console.log(div.getAttribute("a")); // 100
       console.log(div.getAttribute("class")); // box
     </script>
   </body>
   ```

4. `setAttribute`，给元素设置一个属性（包括自定义属性）

   ```html
   <body>
     <div></div>
     <script>
       var div = document.querySelector("div");
       div.setAttribute("a", 100);
       div.setAttribute("class", "box");
       console.log(div); // <div a="100" class="box"></div>
     </script>
   </body>
   ```

5. `removeAttribute`，直接移除元素的某个属性

   ```html
   <body>
     <div a="100" class="box"></div>
     <script>
       var div = document.querySelector("div");
       div.removeAttribute("class");
       console.log(div); // <div a="100"></div>
     </script>
   </body>
   ```

6. `style`，专门用来给元素添加 css 样式的（添加的都是行内样式）

   ```html
   <body>
     <div></div>
     <script>
       var div = document.querySelector("div");
       div.style.width = "100px";
       div.style.height = "100px";
       div.style.backgroundColor = "pink";
       console.log(div);
       // <div style="width: 100px; height: 100px; background-color: pink;"></div>
     </script>
   </body>
   ```

7. `className`，专门用来操作元素的 类名的

   ```html
   <!-- 获取dom元素身上有哪些类名 -->
   <body>
     <div class="box"></div>

     <script>
       var div = document.querySelector("div");
       console.log(div.className); // box
     </script>
   </body>

   <!-- 
   	也可以设置元素的类名，不过是全覆盖式的操作 
   	在设置的时候，不管之前有没有类名，都会全部被设置的值覆盖
   -->
   <body>
     <div class="box"></div>

     <script>
       var div = document.querySelector("div");
       div.className = "test";
       console.log(div); // <div class="test"></div>
     </script>
   </body>
   ```
