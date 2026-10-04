---
title: CSS Grid 网格布局
tags: css
categories:
  - css
comments: false
cover: /img/covers/tech-css.png
abbrlink: c5073f42
date: 2018-01-02 20:18:36
top_img:
---

## 栅格介绍

### 名词解释

CSS 网格布局(Grid Layout) 是 CSS 中最强大的布局系统。 这是一个二维系统，这意味着它可以同时处理列和行。

栅格系统与 FLEX 弹性布局有相似之处理，都是由父容器包含多个项目元素的使用。

Grid 可以同时划分行和列。下面是两行三列的网格，数字代表六个直接子元素，默认按行依次放置：

```text
+---+---+---+
| 1 | 2 | 3 |
+---+---+---+
| 4 | 5 | 6 |
+---+---+---+
```

### 兼容性

使用前应根据项目需要支持的浏览器版本确认兼容性。

常见现代浏览器已支持基础 Grid 布局；IE 10/11 使用较早的语法，不能直接套用本文示例。具体版本支持情况请查看 [Can I use：CSS Grid](https://caniuse.com/css-grid)。`subgrid` 等扩展特性需要单独查询支持情况。

可以用特性查询为旧浏览器保留普通文档流布局：

```css
.layout > * {
  margin-bottom: 12px;
}

@supports (display: grid) {
  .layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .layout > * {
    margin-bottom: 0;
  }
}
```

## 基本知识

下面了解栅格有关的元素说明，可以帮助你更好的使用栅格。

| 概念 | 含义 | 两行三列网格中的例子 |
| --- | --- | --- |
| 网格容器 | 设置 `display: grid` 或 `inline-grid` 的元素 | 包含所有格子的父元素 |
| 网格项目 | 容器的直接子元素 | 编号 1～6 的元素 |
| 网格线 | 划分行、列的边界 | 3 条行线、4 条列线 |
| 网格轨道 | 相邻两条平行网格线之间的空间 | 一整行或一整列 |
| 单元格 | 一行与一列交叉的空间 | 一个格子 |
| 网格区域 | 一个或多个单元格组成的矩形 | 跨两列的内容区 |
| 间距 | 相邻轨道之间的空隙 | `row-gap`、`column-gap` |

下文文字示意图中的 `.` 表示未放置项目的单元格，字母表示跨格项目；边框仅用于说明结构，不按像素比例绘制。

## 声明容器

### 块级容器

效果：`article` 是块级网格容器，排在前面的文字之后另起一行。400px × 200px 的内容区被分成两行四列，每格为 100px × 100px。

```text
前面的文字
+---+---+---+---+
| 1 | 2 | 3 | 4 |
+---+---+---+---+
| 5 | 6 | 7 | 8 |
+---+---+---+---+
```

```html
<style>
  * {
    padding: 0;
    margin: 0;
  }

  body {
    padding: 200px;
  }

  article {
    width: 400px;
    height: 200px;
    border: solid 5px silver;
    display: grid;
    grid-template-rows: 50% 50%;
    grid-template-columns: 25% 25% 25% 25%;
  }

  article div {
    background: blueviolet;
    background-clip: content-box;
    padding: 10px;
    border: solid 1px #ddd;
  }
</style>

后盾人
<article>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</article>
```

### 行级容器

效果：把上例改成 `display: inline-grid` 后，容器外部表现为行内级盒子，空间足够时可与文字处于同一行；内部仍保持两行四列。行内对齐可通过 `vertical-align` 调整。

```css
display: inline-grid;
```

## 划分行列

栅格有点类似表格，也 `行` 和 `列`。使用 `grid-template-columns` 规则可划分列数，使用 `grid-template-rows` 划分行数。

### 固定宽度

下面是使用固定宽度划分两行三列的的示例，当容器宽度过大时将漏白。

效果：两行各高 100px，三列各宽 100px，恰好铺满 300px × 200px 的内容区。若只增大容器宽度而不改变列宽，右侧会留下空白。

```html
<style>
  * {
    padding: 0;
    margin: 0;
  }
  body {
    padding: 200px;
  }
  article {
    width: 300px;
    height: 200px;
    border: solid 5px silver;
    display: grid;
    grid-template-rows: 100px 100px;
    grid-template-columns: 100px 100px 100px;
  }
  article div {
    background: blueviolet;
    background-clip: content-box;
    padding: 10px;
    border: solid 1px #ddd;
  }
</style>
...

<article>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</article>
```

### 百分比

可以使用使用百分比自动适就容器。

效果：两行分别占容器高度的 50%，四列分别占容器宽度的 25%。容器尺寸改变时，轨道尺寸随之变化；另加 `gap` 时需留意百分比轨道与间距之和可能超过容器。

```css
display: grid;
grid-template-rows: 50% 50%;
grid-template-columns: 25% 25% 25% 25%;
```

### 重复设置

使用 `repeat` 统一设置值，第一个参数为重复数量，第二个参数是重复值

效果：两行两列，每行、每列均占对应尺寸的 50%。

```text
+---+---+
| 1 | 2 |
+---+---+
| 3 | 4 |
+---+---+
```

```css
grid-template-rows: repeat(2, 50%);
grid-template-columns: repeat(2, 50%);
```

可以设置多个值来定义重复，下面定义了四列，以 `100px、50px` 重复排列。

效果：重复的是一组列宽，最终得到四列。

```text
列号：  1      2      3      4
列宽：100px   50px  100px   50px
```

```css
display: grid;
grid-template-rows: repeat(2, 50%);
grid-template-columns: repeat(2, 100px 50px);
```

### 自动填充

`auto-fill` 根据容器尺寸与指定的轨道尺寸，自动计算可容纳的轨道数量。

效果：300px 宽的容器可放下三条 100px 列轨道，200px 高的容器可放下两条 100px 行轨道。`auto-fill` 自动计算轨道数量，轨道宽高仍由这里的 100px 决定。

```css
width: 300px;
height: 200px;
display: grid;
grid-template-rows: repeat(auto-fill, 100px);
grid-template-columns: repeat(auto-fill, 100px);
```

### 比例划分

使用 `fr` 单位按比例分配网格容器中的可用剩余空间。下面分别演示与固定宽度组合、重复定义比例轨道。

#### 单位组合

效果：第一列固定为 100px，剩余 200px 按 1∶2 分给第二、三列，约为 66.7px、133.3px；两行也按 1∶2 分配 200px 高度。这里按空内容、无额外间距计算，内容的最小尺寸可能影响实际结果。

```css
width: 300px;
height: 200px;
display: grid;
grid-template-rows: 1fr 2fr;
grid-template-columns: 100px 1fr 2fr;
```

#### 重复定义

效果：两行各占 50px；四列按 1∶2∶1∶2 分配 300px 宽度（忽略内容最小尺寸限制）。

```text
列号： 1     2     3     4
列宽：50px 100px  50px 100px
```

```css
width: 300px;
height: 100px;
display: grid;
grid-template-rows: repeat(2, 1fr);
grid-template-columns: repeat(2, 1fr 2fr);
```

### 自动空间

下面为第二个栅格列使用`auto`来让其获取所有剩余空间

效果：第一列宽 20vw，第三列宽 30vw，第二列的 `auto` 轨道在满足内容尺寸后吸收可分配空间。示例只有三个项目，排在第一行，第二行为空。

```html
<style>
  main {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 20vw auto 30vw;
  }
  div {
    background: blueviolet;
    border: solid 1px #ddd;
    color: white;
    padding: 5px;
  }
</style>
<main>
  <div>后盾人</div>
  <div>向军老师</div>
  <div>HDCMS.COM</div>
</main>
```

### 组合定义

`grid-template` 是 `grid-template-rows`、`grid-template-columns`、`grid-template-areas` 的三个属性的简写。

下面使用`grid-template`实现三行三列的布局

效果：声明三行三列，每格为 100px × 100px。示例只有六个项目，因此第三行保留为空。

```text
+---+---+---+
| 1 | 2 | 3 |
+---+---+---+
| 4 | 5 | 6 |
+---+---+---+
| . | . | . |
+---+---+---+
```

```html
<style>
  .app {
    display: grid;
    grid-template: repeat(3, 100px) / repeat(3, 100px);
    width: 300px;
    height: 300px;
  }

  .app > div {
    border: solid 1px red;
    box-sizing: border-box;
  }
</style>
<div class="app">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

下面是使用 `grid-template` 同时声明 `grid-template-rows、grid-template-columns`。

```html
<style>
  main {
    display: grid;
    grid-template: 10vh 20vh 10vh/ 30vw 1fr;
  }
  div {
    background: blueviolet;
    border: solid 1px #ddd;
    color: white;
    padding: 5px;
  }
</style>
<main>
  <div href="">后盾人</div>
  <div href="">向军老师</div>
  <div href="">HDCMS.COM</div>
  <div href="">后盾人</div>
  <div href="">向军老师</div>
  <div href="">HDCMS.COM</div>
</main>
```

效果：三行的高度依次为 10vh、20vh、10vh；第一列宽 30vw，第二列分配剩余宽度。六个项目按行排列。

```text
          30vw   1fr
10vh    |  1  |  2  |
20vh    |  3  |  4  |
10vh    |  5  |  6  |
```

下面是使用`grid-template` 定义 `grid-template-areas` ，有关`grid-template-areas`的使用方法会在下面介绍。

声明的命名区域如下。注意：区域名不会自动绑定元素，仍需通过 `grid-area` 指定。下方代码把第二个元素放在第二行的第二至第三列，第三个元素放在第三行第一列；第一个元素自动放入第一行第一列。

```text
声明区域：
header   .       .
.        main    .
footer   footer  .

实际项目位置：
1        .       .
.        2       2
3        .       .
```

```html
<style>
  main {
    display: grid;
    grid-template:
      "header . ." 10vh
      ". main ." 20vh
      "footer footer ." 10vh;
  }
  div {
    background: blueviolet;
    border: solid 1px #ddd;
    color: white;
    padding: 5px;
  }
  div:nth-child(2) {
    grid-area: 2/2/3/4;
    background-color: cadetblue;
  }
  div:nth-child(3) {
    grid-area: 3/1/4/2;
    background-color: darkorange;
  }
</style>
<main>
  <div href="">后盾人</div>
  <div href="">向军老师</div>
  <div href="">HDCMS.COM</div>
</main>
```

### minmax

使用 `minmax` 方法可以设置取值范围，下列在行高在 `最小100px ~ 最大1fr` 间取值。

效果：在 300px 高的容器中，第一行固定 100px，第二行以 100px 为下限并分配剩余空间，因此为 200px；两列分别为 100px 和剩余的 200px。

```css
width: 300px;
height: 300px;
display: grid;
grid-template-rows: 100px minmax(100px, 1fr);
grid-template-columns: 100px 1fr;
```

## 间距定义

### 行间距

使用 `row-gap` 设置行间距。

效果：两行之间留出 30px 空隙，两行各分得 `(200px − 30px) / 2 = 85px`；三列之间没有间距，每列为 100px。

```css
width: 300px;
height: 200px;
display: grid;
grid-template-rows: repeat(2, 1fr);
grid-template-columns: repeat(3, 1fr);
row-gap: 30px;
```

### 列间距

使用 `column-gap` 定义列间距。

效果：三列之间有两段 20px 空隙，每列分得 `(300px − 40px) / 3 ≈ 86.7px`；两行各为 100px。

```css
width: 300px;
height: 200px;
display: grid;
grid-template-rows: repeat(2, 1fr);
grid-template-columns: repeat(3, 1fr);
column-gap: 20px;
```

### 组合定义

使用 `gap` 规则可以一次定义行、列间距，如果间距一样可以只设置一个值。

**设置行列间距为 20px 与 10px**

效果：两行之间相隔 20px，三列之间各相隔 10px。行高为 90px，列宽约为 93.3px；`gap` 不在容器四周额外添加留白。

```css
width: 300px;
height: 200px;
display: grid;
grid-template-rows: repeat(2, 1fr);
grid-template-columns: repeat(3, 1fr);
gap: 20px 10px;
```

**统一设置行列间距为 20px**

效果：行间距和列间距统一为 20px。沿用上例的容器尺寸时，两行各高 90px，三列各宽约 86.7px。

```css
gap: 20px;
```

## 栅格命名

栅格线可以使用命名与编号找到，方便控制指定栅格，或将内容添加到指定栅格中。

网格线从 1 开始编号，三列有四条列线。负数从显式网格末端倒数，最后一条线为 -1；行线的编号方式相同。

```text
正数： 1       2       3       4
       | 第1列 | 第2列 | 第3列 |
负数：-4      -3      -2      -1
```

### 独立命名

可以为每个栅格独立命名来进行调用。

相邻轨道可共用同一条线，这条线也可以拥有多个名字。代码中的元素位于第二行、第二列：行范围为 `r2-start / r2-end`，列范围为 `c1-end / c3-start`。

```text
+---+---+---+
| . | . | . |
+---+---+---+
| . | A | . |
+---+---+---+
| . | . | . |
+---+---+---+
```

```css
<style>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        padding-top: 50px;
    }

    article {
        margin: 0 auto;
        width: 300px;
        height: 300px;
        border: solid 5px silver;
        display: grid;
        grid-template-rows: [r1-start] 100px [r1-end r2-start] 100px [r2-end r3-start] 100px [r3-end];

        grid-template-columns: [c1-start] 100px [c1-end c2-start] 100px [c2-end c3-start] 100px [c3-end];
    }

    div {
        background: blueviolet;
        background-clip: content-box;
        border: solid 1px blueviolet;
        padding: 10px;
        box-sizing: border-box;
        color: white;
    }

    div:first-child {
        grid-row-start: r2-start;
        grid-column-start: c1-end;
        grid-row-end: r2-end;
        grid-column-end: c3-start;
    }
</style>
...

<article>
	<div>后盾人</div>
</article>
```

### 自动命名

对于重复设置的栅格系统会自动命名，使用时使用 `c 1、c 2` 的方式定位栅格。

效果：`repeat()` 重复创建同名网格线。`r-start 2` 表示第二条名为 `r-start` 的行线，`c-start 2` 表示第二条同名列线；元素放在第二行、第二列，并在对应的 `r-end 2`、`c-end 2` 结束。

```css
<style>
    article {
        margin: 0 auto;
        width: 300px;
        height: 300px;
        border: solid 5px silver;
        display: grid;
        grid-template-rows: repeat(3, [r-start] 100px [r-end]);
        grid-template-columns: repeat(3, [c-start] 100px [c-end]);
    }

    div {
        background: blueviolet;
        background-clip: content-box;
        border: solid 1px blueviolet;
        padding: 10px;
        box-sizing: border-box;
        color: white;
    }

    div:first-child {
        grid-row-start: r-start 2;
        grid-column-start: c-start 2;
        grid-row-end: r-end 2;
        grid-column-end: c-end 2;
    }
</style>
...

<article>
	<div>houdunren</div>
</article>
```

## 元素定位

| 样式属性          | 说明         |
| ----------------- | ------------ |
| grid-row-start    | 行开始栅格线 |
| grid-row-end      | 行结束栅格线 |
| grid-column-start | 列开始栅格线 |
| grid-column-end   | 列结束栅格线 |

上面几个样式属性可以使用以下值

| 属性值        | 说明                               |
| ------------- | ---------------------------------- |
| Line          | 栅格络                             |
| span 数值     | 栅格包含的栅格数量                 |
| span 区域名称 | 栅格包含到指定的区域名称           |
| auto          | 自动设置，默认为一个网格宽度和高度 |

> 有关区域名称请查看下面内容

### 根据栅格线

通过设置具体的第几条栅格线来设置区域位置，设置的数值可以是正数和负数。

效果：行线 2 到 4、列线 2 到 4 围成一个 2 × 2 区域，位于四行四列网格的中央。

```text
+---+---+---+---+
| . | . | . | . |
+---+---+---+---+
| . | A     | . |
+---+       +---+
| . |       | . |
+---+---+---+---+
| . | . | . | . |
+---+---+---+---+
```

```html
<style>
  * {
    padding: 0;
    margin: 0;
  }

  body {
    padding-left: 200px;
    padding-top: 200px;
  }

  article {
    border: solid 5px blueviolet;
    width: 400px;
    height: 400px;
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(4, 1fr);
  }

  article div {
    background: blueviolet;
    grid-row-start: 2;
    grid-row-end: 4;
    grid-column-start: 2;
    grid-column-end: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    color: white;
  }
</style>
...

<article>
  <div>后盾人</div>
</article>
```

### 根据栅格命名

效果：`r1-end / r3-start` 围住第二行，`c2-start / c3-start` 围住第二列；元素只占中间一个单元格。

```text
+---+---+---+
| . | . | . |
+---+---+---+
| . | A | . |
+---+---+---+
| . | . | . |
+---+---+---+
```

```html
<style>
  article {
    margin: 0 auto;
    width: 300px;
    height: 300px;
    border: solid 5px silver;
    display: grid;
    grid-template-rows: [r1-start] 100px [r1-end r2-start] 100px [r2-end r3-start] 100px [r3-end];
    grid-template-columns: [c1-start] 100px [c1-end c2-start] 100px [c2-end c3-start] 100px [c3-end];
  }

  div {
    background: blueviolet;
    background-clip: content-box;
    border: solid 1px blueviolet;
    padding: 10px;
    box-sizing: border-box;
  }

  div:first-child {
    grid-row-start: r1-end;
    grid-column-start: c2-start;
    grid-row-end: r3-start;
    grid-column-end: c3-start;
  }
</style>
...

<article>
  <div>houdunren</div>
</article>
```

### 根据自动命名

对于重复设置的栅格系统会自动命名，使用时使用 `c 1、c 2` 的方式定位栅格。

效果：行、列分别选择第二组同名起止线，将项目定位在三行三列网格的中间一格。

```html
<style>
  article {
    margin: 0 auto;
    width: 300px;
    height: 300px;
    border: solid 5px silver;
    display: grid;
    grid-template-rows: repeat(3, [r-start] 100px [r-end]);
    grid-template-columns: repeat(3, [c-start] 100px [c-end]);
  }

  div {
    background: blueviolet;
    background-clip: content-box;
    border: solid 1px blueviolet;
    padding: 10px;
    box-sizing: border-box;
    color: white;
  }

  div:first-child {
    grid-row-start: r-start 2;
    grid-column-start: c-start 2;
    grid-row-end: r-end 2;
    grid-column-end: c-end 2;
  }
</style>
...

<article>
  <div>houdunren</div>
</article>
```

### 根据偏移量

使用 `span` 可以设置包含栅格的数量或包含到的区域名称。

| 示例                | 说明          |
| ------------------- | ------------- |
| grid-row-end: span 2 | 从行起点向下跨 2 行 |
| grid-row-start: span 2 | 从行终点向上跨 2 行 |
| grid-column-end: span 2 | 从列起点向右跨 2 列 |
| grid-column-start: span 2 | 从列终点向左跨 2 列 |

效果：从第二条行线、第二条列线开始，各跨一个轨道，项目占据第二行第二列。`span 1` 表示跨一个轨道，并非结束在编号为 1 的线。

```text
+---+---+---+
| . | . | . |
+---+---+---+
| . | A | . |
+---+---+---+
| . | . | . |
+---+---+---+
```

```html
<style>
  article {
    margin: 0 auto;
    width: 300px;
    height: 300px;
    border: solid 5px silver;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }

  div {
    background: blueviolet;
    background-clip: content-box;
    border: solid 1px blueviolet;
    padding: 10px;
    box-sizing: border-box;
    color: white;
    font-size: 25px;
  }

  div:first-child {
    grid-row-start: 2;
    grid-column-start: 2;
    grid-row-end: span 1;
    grid-column-end: span 1;
  }
</style>
...

<article>
  <div></div>
</article>
```

### 简写模式

`grid-row` 同时设置行起止线，`grid-column` 同时设置列起止线，格式都是 `起点 / 终点`。

例如，下面的简写让元素覆盖第二、三行和第二、三列，效果与前面四行四列网格中的中央 2 × 2 区域相同。

```css
grid-row: 2/4;
grid-column: 2/4;
```

### grid-area

`grid-area`更加简洁是同时对 `grid-row` 与 `grid-column` 属性的组合声明。

语法结构如下：

```css
grid-row-start/grid-column-start/grid-row-end/grid-column-end。
```

下面是将元素定位在中间的示例。

效果：`grid-area: 2 / 2 / 3 / 3` 把元素放在三行三列网格的中间一格。四个值依次是行起点、列起点、行终点、列终点。

```text
+---+---+---+
| . | . | . |
+---+---+---+
| . | A | . |
+---+---+---+
| . | . | . |
+---+---+---+
```

```html
<style>
  * {
    padding: 0;
    margin: 0;
  }

  body {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  }

  header {
    grid-area: 2/2/3/3;
    background: #e67e22;
  }
</style>

<body>
  <header></header>
</body>
```

### BOOTSTRAP

下面是 bootstrap 栅格系统的开发，根据指定的样式自动设置栅格大小。

效果：使用 CSS Grid 模拟十二列栅格。第一行按 1、3、6、2 列分配宽度，第二行分成三个各跨四列的项目；这里是自定义实现，并非引入 Bootstrap。

```text
第一行：| 1 |    3    |         6         |  2  |
第二行：|      4     |       4      |     4     |
```

```html
<style>
  * {
    padding: 0;
    margin: 0;
  }

  body {
    padding-top: 200px;
  }

  .container {
    margin: 0 auto;
    border: solid 5px silver;
    width: 1020px;
    height: 320px;
  }

  .row {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 10px 10px;
  }

  div {
    background: blueviolet;
    height: 100px;
    background-clip: content-box;
    padding: 10px;
    box-sizing: border-box;
    border: solid 1px blueviolet;
    font-size: 35px;
  }

  .c-1 {
    grid-column: span 1;
  }

  .c-2 {
    grid-column-end: span 2;
  }

  .c-3 {
    grid-column-end: span 3;
  }

  .c-4 {
    grid-column-end: span 4;
  }

  .c-5 {
    grid-column-end: span 5;
  }

  .c-6 {
    grid-column-end: span 6;
  }

  .c-7 {
    grid-column-end: span 7;
  }

  .blue {
    background: #904fa9;
  }

  .green {
    background: #eebc31;
  }
</style>
...

<article class="container">
  <section class="row">
    <div class="c-1 blue">1</div>
    <div class="c-3 blue">3</div>
    <div class="c-6 blue">6</div>
    <div class="c-2 blue">2</div>
  </section>
  <section class="row">
    <div class="c-4 green">4</div>
    <div class="c-4 green">4</div>
    <div class="c-4 green">4</div>
  </section>
</article>
```

## 区域定位

通过 `grid-area` 属性可以将元素放在指定区域中。`grid-area`由`grid-row-start`、`grid-column-start`、`grid-row-end`、`grid-column-end` 的简写模式。

### 编号定位

下例中将元素放在容器的中心位置中的栅格中。

效果：`grid-area: 2 / 2 / 4 / 4` 跨越第二、三行和第二、三列，覆盖中间四个单元格。

```text
+---+---+---+---+
| . | . | . | . |
+---+---+---+---+
| . | A     | . |
+---+       +---+
| . |       | . |
+---+---+---+---+
| . | . | . | . |
+---+---+---+---+
```

```html
<style>
  article {
    margin: 0 auto;
    width: 400px;
    height: 400px;
    border: solid 5px silver;
    display: grid;
    grid-template-rows: repeat(4, 100px);
    grid-template-columns: repeat(4, 100px);
  }

  div {
    background: blueviolet;
    background-clip: content-box;
    padding: 10px;
    border: solid 1px blueviolet;
    font-size: 30px;
    color: white;
  }

  article div:first-child {
    grid-area: 2/2/4/4;
  }
</style>
...

<article class="container">
  <div>1</div>
</article>
```

### 命名定位

同样是上面的例子可以使用栅格线命名来附加元素。

```css
article {
  margin: 0 auto;
  width: 400px;
  height: 400px;
  border: solid 5px silver;
  display: grid;
  grid-template-rows: repeat(auto-fill, [r] 100px);
  grid-template-columns: repeat(auto-fill, [l] 100px);
}
article div {
  background: blueviolet;
  background-clip: content-box;
  padding: 10px;
  border: solid 1px blueviolet;
  font-size: 30px;
  color: white;
}
article div:first-child {
  grid-area: r 2 / l 2 / r 4 / l 4;
}
```

## 区域声明

区域是由多个单元格构成，使用 `grid-template-areas`可以定义栅格区域，并且栅格区域必须是矩形的。

### 区域布局

下面是使用栅格区域布局移动端页面结构

效果：页头、页脚横跨四列，中间一行由导航、跨两列的主内容和侧栏组成。行高分别为 80px、剩余高度、50px。

```text
+-----+------+------+-------+
|          header           |
+-----+------+------+-------+
| nav |     main    | aside |
+-----+------+------+-------+
|          footer           |
+-----+------+------+-------+
```

```html
<style>
  body {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: 80px 1fr 50px;
    grid-template-columns: 100px 1fr 50px 60px;
    grid-template-areas:
      "header header header header"
      "nav main main aside"
      "footer footer footer footer";
  }

  main {
    /* 完整的写法，推荐使用下面的简写方式*/
    /* grid-area: main-start/main-start/main-end/main-end; */
    grid-area: main;
    background: #e9eeef;
  }

  header {
    background: #2ec56c;
    grid-area: header;
  }

  nav {
    background: #e1732c;
    grid-area: nav;
  }

  aside {
    grid-area: aside;
    background: #eebc31;
  }

  footer {
    grid-area: footer;
    background: #904fa9;
  }
</style>

<body>
  <header></header>
  <nav></nav>
  <main></main>
  <aside></aside>
  <footer></footer>
</body>
```

### 简写形式

使用 grid-template 进行栅格划分会更简洁。

语法格式为：

```css
grid-template:
  "栅格名称 栅格名称 栅格名称 栅格名称" 行高
  "栅格名称 栅格名称 栅格名称 栅格名称" 行高
  "栅格名称 栅格名称 栅格名称 栅格名称" 行高/列宽 列宽 列宽 列宽;
```

下面是使用 grid-template 进行简写的示例

```html
<style>
  body {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template:
      "header header header header" 80px
      "nav main main aside" auto
      "footer footer footer footer" 50px/100px auto 50px 60px;
  }

  main {
    /* 完整的写法，推荐使用下面的简写方式*/
    /* grid-area: main-start/main-start/main-end/main-end; */
    grid-area: main;
    background: #e9eeef;
  }

  header {
    background: #2ec56c;
    grid-area: header;
  }

  nav {
    background: #e1732c;
    grid-area: nav;
  }

  aside {
    grid-area: aside;
    background: #eebc31;
  }

  footer {
    grid-area: footer;
    background: #904fa9;
  }
</style>

<body>
  <header></header>
  <nav></nav>
  <main></main>
  <aside></aside>
  <footer></footer>
</body>
```

### 区域命名

系统会为区域自动命名，上例中的会产生 `header-start` 水平与垂直同名的起始区域与 `header-end`水平与垂直同名的区域终止。

命名区域会生成对应的起止网格线名称：

| 区域 | 行方向的起止线 | 列方向的起止线 |
| --- | --- | --- |
| `header` | `header-start / header-end` | `header-start / header-end` |
| `main` | `main-start / main-end` | `main-start / main-end` |
| `footer` | `footer-start / footer-end` | `footer-start / footer-end` |

同名线在两个轴上分别解析，因此 `grid-area: main` 可以展开为 `main-start / main-start / main-end / main-end`。

下面使用区域命名部署的效果

下例中，第一个元素从页头顶边延伸到主内容底边，横跨全部三列；第二个元素单独占据页脚区域。

```text
+-------------------+
|         1         |
|   header + main   |
+-------------------+
|         2         |
|       footer      |
+-------------------+
```

```html
<style>
  article {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: 80px 1fr 50px;
    grid-template-columns: 80px 1fr 1fr;
    grid-template-areas:
      "header header header"
      "nav main main"
      "footer footer footer";
  }

  div {
    background: blueviolet;
    background-clip: content-box;
    border: solid 1px blueviolet;
    padding: 10px;
    box-sizing: border-box;
    color: white;
    font-size: 25px;
  }

  div:nth-child(1) {
    grid-area: header-start/nav-start/main-end/main-end;
  }

  div:nth-child(2) {
    grid-area: footer-start/footer-start/footer-end/footer-end;
  }
</style>
...

<article>
  <div></div>
  <div></div>
</article>
```

### 区域占位

使用一个或多个 连续的`.` 定义区域占位。

效果：`top` 占左侧上方两格，`bottom` 横跨底部三列，点号位置不属于任何命名区域。空区域仍可供其他自动放置的项目使用。

```text
+-----+-----+-----+
| top |  .  |  .  |
+     +-----+-----+
|     |  .  |  .  |
+-----+-----+-----+
|     bottom      |
+-----+-----+-----+
```

```html
<style>
  * {
    padding: 0;
    margin: 0;
  }

  article {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: repeat(3, 33.3%);
    grid-template-columns: repeat(3, 33.3%);
    grid-template-areas:
      "top . ."
      "top . ."
      "bottom bottom bottom";
  }

  .top {
    background: blueviolet;
    grid-area: top;
    font-size: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .bottom {
    background: orange;
    grid-area: bottom;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
  }
</style>
...

<article>
  <div class="top">houdunren.com</div>
  <div class="bottom">后盾人</div>
</article>
```

## 栅格流动

在容器中设置`grid-auto-flow` 属性可以改变单元格排列方式。

| 选项   | 说明                                   |
| ------ | -------------------------------------- |
| column | 按列排序                               |
| row    | 按行排列                               |
| dense  | 元素使用前面空余栅格（下面有示例说明） |

### 基本使用

下例将单元按列排序流动

效果：默认按行先放满一行；`grid-auto-flow: column` 则先从上到下放满一列，再进入下一列。

```text
row（默认）       column
+---+---+        +---+---+
| 1 | 2 |        | 1 | 3 |
+---+---+        +---+---+
| 3 | 4 |        | 2 | 4 |
+---+---+        +---+---+
```

```html
<style>
  article {
    width: 400px;
    height: 400px;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    border: solid 5px silver;
    grid-auto-flow: column;
  }

  div {
    background: blueviolet;
    background-clip: content-box;
    padding: 10px;
    font-size: 35px;
    color: white;
  }
</style>
...

<article>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</article>
```

### 强制填充

当元素在栅格中放不下时，将会发生换行产生留白，使用`grid-auto-flow: row dense;` 可以执行填充空白区域操作。

效果：项目 1 占第一行前两列，项目 2 被指定到第二列，因此进入下一行。启用 `dense` 后，后续项目 3 会回填第一行第三列的空位。

```text
row               row dense
+---+---+---+     +---+---+---+
| 1     | . |     | 1     | 3 |
+---+---+---+     +---+---+---+
| . | 2 | 3 |     | 4 | 2 | . |
+---+---+---+     +---+---+---+
| 4 | . | . |     | . | . | . |
+---+---+---+     +---+---+---+
```

`dense` 只改变视觉位置，不改变 DOM、朗读或键盘导航顺序。对有明确阅读顺序的内容，应谨慎使用。

```html
<style>
  * {
    padding: 0;
    margin: 0;
  }

  body {
    padding-left: 200px;
    padding-top: 200px;
  }

  article {
    width: 600px;
    height: 600px;
    display: grid;
    grid-template-rows: repeat(3, 200px);
    grid-template-columns: repeat(3, 200px);
    border: solid 5px silver;
    grid-auto-flow: row dense;
  }

  div {
    background: blueviolet;
    background-clip: content-box;
    padding: 10px;
    font-size: 35px;
    color: white;
  }

  article div:nth-child(1) {
    grid-column: 1 / span 2;
    background: #000;
  }

  article div:nth-child(2) {
    grid-column: 2 / span 1;
  }
</style>
...

<article>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</article>
```

## 对齐管理

可以通过属性方便的定义栅格或元素的对齐方式

| 选项            | 说明                                             | 对象     |
| --------------- | ------------------------------------------------ | -------- |
| justify-content | 所有栅格在容器中的水平对齐方式，容器有额外空间时 | 栅格容器 |
| align-content   | 所有栅格在容器中的垂直对齐方式，容器有额外空间时 | 栅格容器 |
| align-items     | 栅格内所有元素的垂直排列方式                     | 栅格容器 |
| justify-items   | 栅格内所有元素的横向排列方式                     | 栅格容器 |
| align-self      | 元素在栅格中垂直对齐方式                         | 栅格元素 |
| justify-self    | 元素在栅格中水平对齐方式                         | 栅格元素 |

可以分成三个层级理解对齐属性（下文以水平书写模式为例）：

- `*-content`：把整组网格轨道放到容器的哪个位置。
- `*-items`：把每个项目放到各自网格区域的哪个位置。
- `*-self`：单独调整某个项目在其网格区域内的位置。

`justify-*` 控制行内轴，`align-*` 控制块轴；在通常的横排页面中分别对应水平、垂直方向。

### 栅格对齐

justify-content 与 align-content 用于控制栅格的对齐方式，比如在栅格的尺寸小于容器的尺寸时，控制栅格的布局方式。

justify-content 属性的值如下

| 值            | 说明                                                                     |
| ------------- | ------------------------------------------------------------------------ |
| start         | 容器左边                                                                 |
| end           | 容器右边                                                                 |
| center        | 容器中间                                                                 |
| stretch       | 撑满容器                                                                 |
| space-between | 第一个栅格靠左边，最后一个栅格靠右边，余下元素平均分配空间               |
| space-around  | 每个元素两侧的间隔相等。所以，栅格之间的间隔比栅格与容器边距的间隔大一倍 |
| space-evenly  | 栅格间距离完全平均分配                                                   |

align-content 属性的值如下

| 值            | 说明                                                                     |
| ------------- | ------------------------------------------------------------------------ |
| start         | 容器顶边                                                                 |
| end           | 容器底边                                                                 |
| center        | 容器垂直中间                                                             |
| stretch       | 撑满容器                                                                 |
| space-between | 第一个栅格靠左边，最后一个栅格靠右边，余下元素平均分配空间               |
| space-around  | 每个元素两侧的间隔相等。所以，栅格之间的间隔比栅格与容器边距的间隔大一倍 |
| space-evenly  | 栅格间距离完全平均分配                                                   |

效果：600px × 600px 的内容区放置两行两列、每格 200px 的轨道。水平方向的 200px 剩余空间全部放在两列之间；垂直方向的 200px 剩余空间分成三份，顶部、行间、底部各约 66.7px。

```text
水平方向：| 200px | 间隔200px | 200px |
垂直方向：顶部66.7px → 200px → 间隔66.7px → 200px → 底部66.7px
```

```css
border: solid 5px silver;
width: 600px;
height: 600px;
display: grid;
grid-template-columns: 200px 200px;
grid-template-rows: 200px 200px;
justify-content: space-between;
align-content: space-evenly;
```

下面是栅格水平与垂直居中对齐的示例

效果：两行轨道合计高 30vh，在 100vh 高的容器中整体垂直居中，上下各留 35vh。两列组成的整体也水平居中；第二列为 `auto`，其宽度受内容尺寸影响。

```html
<style>
  main {
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template: 10vh 20vh / 30vw auto;
    justify-content: center;
    align-content: center;
  }
  div {
    background: blueviolet;
    border: solid 1px #ddd;
    color: white;
    padding: 5px;
    box-sizing: border-box;
  }
  div:nth-child(1) {
    background-color: #3498db;
  }
  div:nth-child(2) {
    background-color: #f1c40f;
  }
  div:nth-child(3) {
    background-color: #2ecc71;
  }
  div:nth-child(4) {
    background-color: #9b59b6;
  }
</style>
<main>
  <div href="">后盾人</div>
  <div href="">向军老师</div>
  <div href="">HDCMS</div>
  <div href="">后盾人</div>
</main>
```

### 元素对齐

justify-items 与 align-items 用于控制所有栅格内元素的对齐方式

justify-items 用于控制元素的水平对齐方式，可用的属性值如下

| 值      | 说明               |
| ------- | ------------------ |
| start   | 元素对齐栅格的左边 |
| end     | 元素对齐栅格的右边 |
| center  | 元素对齐栅格的中间 |
| stretch | 水平撑满栅格       |

align-items 用于控制元素的垂直对齐方式，可用的属性值如下

| 值      | 说明                   |
| ------- | ---------------------- |
| start   | 元素对齐栅格的顶边     |
| end     | 元素对齐栅格的底边     |
| center  | 元素对齐栅格的垂直中间 |
| stretch | 垂直撑满栅格           |

下面是将元素在所在栅格中水平、垂直居中的示例

效果：容器的一行分成四个等宽区域，每个项目按自身内容尺寸放在所属区域的中心。居中的是项目，而非把四条列轨道缩成一组。

```text
+---------+---------+---------+---------+
|         |         |         |         |
|   [1]   |   [2]   |   [3]   |   [4]   |
|         |         |         |         |
+---------+---------+---------+---------+
```

```html
<style>
  main {
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template: 20vh / repeat(4, 1fr);
    justify-items: center;
    align-items: center;
  }
  div {
    background-clip: content-box;
    border: solid 1px #ddd;
    color: white;
    padding: 10px;
    box-sizing: border-box;
  }
  div:nth-child(1) {
    background-color: #3498db;
  }
  div:nth-child(2) {
    background-color: #f1c40f;
  }
  div:nth-child(3) {
    background-color: #2ecc71;
  }
  div:nth-child(4) {
    background-color: #9b59b6;
  }
</style>
<main>
  <div href="">后盾人</div>
  <div href="">向军老师</div>
  <div href="">HDCMS</div>
  <div href="">后盾人</div>
</main>
```

下面是所有元素在所在栅格中居中对齐的示例

效果：两行两列各占一半视口，每个项目分别在自己的区域内水平、垂直居中。

```text
+-----------+-----------+
|           |           |
|    [1]    |    [2]    |
|           |           |
+-----------+-----------+
|           |           |
|    [3]    |    [4]    |
|           |           |
+-----------+-----------+
```

```html
<style>
  main {
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template: 50vh 1fr / 50vw 1fr;
    /* justify-content: center; */
    /* align-content: center; */
    justify-items: center;
    align-items: center;
  }
  div {
    background: blueviolet;
    border: solid 1px #ddd;
    color: white;
    padding: 5px;
    box-sizing: border-box;
  }
  div:nth-child(1) {
    background-color: #3498db;
  }
  div:nth-child(2) {
    background-color: #f1c40f;
  }
  div:nth-child(3) {
    background-color: #2ecc71;
  }
  div:nth-child(4) {
    background-color: #9b59b6;
  }
</style>
<main>
  <div href="">后盾人</div>
  <div href="">向军老师</div>
  <div href="">HDCMS</div>
  <div href="">后盾人</div>
</main>
```

### 元素独立控制

justify-self 与 align-self 控制单个栅格内元素的对齐方式，属性值与 justify-items 和 align-items 是一致的。

效果：第一个项目在自身网格区域内靠右、垂直居中；第四个项目靠左、垂直居中。其他项目继续使用容器的 `justify-items`、`align-items` 设置。

```css
div:first-child {
  justify-self: end;
  align-self: center;
}

div:nth-child(4) {
  justify-self: start;
  align-self: center;
}
```

### 组合简写

#### place-content

用于控制栅格的对齐方式，语法如下：

```css
place-content: <align-content> <justify-content>;
```

#### place-items

控制所有元素的对齐方式，语法结构如下：

```css
place-items: <align-items> <justify-items>;
```

#### place-self

控制单个元素的对齐方式

```css
place-self: <align-self> <justify-self>;
```

## 自动排列

当栅格无法放置内容时，系统会自动添加栅格用于放置溢出的元素，我们需要使用以下属性控制自动添加栅格的尺寸。

### 属性说明

| 选项              | 说明                                                   | 对象 |
| ----------------- | ------------------------------------------------------ | ---- |
| grid-auto-rows    | 控制自动增加的栅格行的尺寸，grid-auto-flow:row; 为默认 | 容器 |
| grid-auto-columns | 控制自动增加的栅格列的尺寸，grid-auto-flow: column;    | 容器 |

### 自动栅格行

下面定义了 2X2 的栅格，但有多个元素，系统将自动创建栅格用于放置额外元素。我们使用 grid-auto-rows 来控制增加栅格的行高。

效果：前四个项目占满显式的两行两列，第五、六个项目进入自动创建的第三行，行高由 `grid-auto-rows: 50px` 决定。

```text
50px | 1 | 2 |  显式行
50px | 3 | 4 |  显式行
50px | 5 | 6 |  隐式行
```

```html
<style>
  main {
    display: grid;
    grid-template-rows: repeat(2, 50px);
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 50px;
    grid-auto-columns: 200px;
  }
  div {
    background: blueviolet;
    background-clip: content-box;
    border: solid 1px #ddd;
    color: white;
  }
</style>
<main>
  <div href="">我的音乐</div>
  <div href="">西方音乐</div>
  <div href="">北方音乐</div>
  <div href="">后盾人</div>
  <div href="">向军老师</div>
  <div href="">训练营</div>
</main>
```

### 自动行列

下面创建了 2X2 栅格，我们将第 2 个 DIV 设置的格栅已经超过了四个栅格，所以系统会自动创建栅格。

效果：第二个项目被放到第五行第五列，浏览器在显式的两行两列之外补出隐式轨道。新增行高为 10vh，新增列宽为 10vw。

```text
       第1列 第2列 第3列 第4列 第5列
第1行    1     .     .     .     .
第2行    .     .     .     .     .
第3行    .     .     .     .     .
第4行    .     .     .     .     .
第5行    .     .     .     .     2
```

```html
<style>
  main {
    display: grid;
    grid-template-rows: repeat(2, 50px);
    grid-template-columns: repeat(2, 1fr);
    grid-auto-columns: 10vw;
    grid-auto-rows: 10vh;
  }
  div {
    background: blueviolet;
    background-clip: content-box;
    border: solid 1px #ddd;
    color: white;
  }
  div:nth-child(2) {
    grid-area: 5 / 5 / 6 / 6;
  }
</style>
<main>
  <div href="">后盾人</div>
  <div href="">向军老师</div>
</main>
```

## 综合简写

grid 是简写属性，可以用来设置：

- 显式网格属性 grid-template-rows、grid-template-columns 和 grid-template-areas，
- 隐式网格属性 grid-auto-rows、grid-auto-columns 和 grid-auto-flow，

`grid` 不包含间距属性，行列间距需要另外使用 `gap` 设置。

使用语法:

```css
<'grid-template'> | <'grid-template-rows'> / [ auto-flow && dense? ] <'grid-auto-columns'>? | [ auto-flow && dense? ] <'grid-auto-rows'>? / <'grid-template-columns'>
```

### 行列划分

下面使用 grid 布局内容，将 body 容器的栅格居中排列，将 main 容器内的栅格内的元素居中排列。

效果：外层 `body` 的 `place-content: center center` 把内部网格轨道整体居中；内层 `main` 声明一行四列，并用 `place-items: center center` 让四个项目在各自单元格内居中。

```html
<style>
  body {
    display: grid;
    place-content: center center;
    width: 100vw;
    height: 100vh;
  }
  main {
    display: grid;
    grid: 10vh / repeat(4, 1fr);
    place-items: center center;
  }
  div {
    background-clip: content-box;
    border: solid 1px #ddd;
    color: white;
    padding: 10px;
    box-sizing: border-box;
  }
  div:nth-child(1) {
    background-color: #3498db;
  }
  div:nth-child(2) {
    background-color: #f1c40f;
  }
  div:nth-child(3) {
    background-color: #2ecc71;
  }
  div:nth-child(4) {
    background-color: #9b59b6;
  }
</style>
<main>
  <div href="">后盾人</div>
  <div href="">向军老师</div>
  <div href="">HDCMS</div>
  <div href="">后盾人</div>
</main>
```

### 定义区域

使用 grid 也可以定义栅格区域

效果：页头高 50px，页脚高 60px，中间行分配剩余高度；导航列宽 100px，内容列分配剩余宽度。页头和页脚横跨两列。

```text
          100px       auto
       +---------+-------------+
 50px  |        header         |
       +---------+-------------+
 auto  |   nav   |    main     |
       +---------+-------------+
 60px  |        footer         |
       +---------+-------------+
```

```html
<style>
  main {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid:
      "header header" 50px
      "nav main" auto
      "footer footer" 60px/100px auto;
  }
  div {
    border: solid 1px #ddd;
    color: white;
    padding: 10px;
    box-sizing: border-box;
  }
  div:nth-child(1) {
    background-color: #3498db;
    grid-area: header;
  }
  div:nth-child(2) {
    background-color: #f1c40f;
    grid-area: nav;
  }
  div:nth-child(3) {
    background-color: #2ecc71;
    grid-area: main;
  }
  div:nth-child(4) {
    background-color: #9b59b6;
    grid-area: footer;
  }
</style>
<main>
  <div href="">后盾人</div>
  <div href="">向军老师</div>
  <div href="">HDCMS</div>
  <div href="">后盾人</div>
</main>
```

## 文献参考

- [向军大叔 CSS Grid 网格布局教程](https://doc.houdunren.com/css/11%20%E6%A0%85%E6%A0%BC%E7%B3%BB%E7%BB%9F.html#%E6%A0%B9%E6%8D%AE%E6%A0%85%E6%A0%BC%E7%BA%BF)
- [阮一峰 CSS Grid 网格布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
