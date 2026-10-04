---
title: CSS Flex 弹性布局
tags: css
categories:
  - css
comments: false
cover: /img/covers/tech-css.png
abbrlink: css-flex
date: 2018-01-01 16:42:28
top_img:
description: 从主轴与交叉轴出发，理解 Flex 容器、对齐、换行、弹性尺寸分配，以及导航栏、卡片和页面布局中的常见问题。
toc: true
---

## Flex 解决什么问题

Flexbox（弹性盒布局）适合沿一个方向排列项目，并分配剩余空间。导航栏、工具栏、图文列表、卡片内部结构，都可以使用 Flex。

例如，一行中有三个项目，希望它们垂直居中，并让最后一个项目靠右：

![导航栏中按钮前的自动外边距吸收剩余空间](/img/posts/css-flex/toolbar.svg)

不必计算按钮左侧的距离，也不必使用浮动。容器负责排列与对齐，项目负责自己的弹性尺寸。

### Flex 与 Grid 如何选择

| 需求 | 推荐方式 | 原因 |
| --- | --- | --- |
| 一行工具栏、导航、按钮组 | Flex | 主要沿一个方向排列 |
| 图标与文字并排 | Flex | 便于对齐和分配剩余宽度 |
| 卡片内的标题、正文、底部按钮 | Flex | 可沿纵向排列并把按钮推到底部 |
| 多行卡片需要严格对齐列宽 | Grid | 行列共同参与布局 |
| 页面同时划分导航、内容、侧栏 | Grid | 适合明确的二维区域 |

Flex 可以换行，但每一行独立分配空间，不会自动与上一行共享列宽。两者也可以组合：用 [CSS Grid 网格布局](/article/c5073f42.html) 划分页面区域，再用 Flex 排列区域内部的内容。

## 容器、项目与两条轴

设置 `display: flex` 的元素称为弹性容器，参与正常文档流的直接子元素成为弹性项目。更深层的后代不会因此自动成为这个容器的弹性项目。

```html
<div class="toolbar">
  <span>标识</span>
  <nav>导航</nav>
  <button type="button">登录</button>
</div>

<style>
  .toolbar {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .toolbar > button {
    margin-inline-start: auto;
  }
</style>
```

`display: flex` 创建块级弹性容器；`display: inline-flex` 创建行内级弹性容器，可与文字处于同一行。两者内部的 Flex 布局规则相同。

理解对齐前，先确定两条轴：

| 概念 | 说明 |
| --- | --- |
| 主轴 | 项目排列的主要方向，由 `flex-direction` 决定 |
| 交叉轴 | 与主轴垂直的方向 |
| 主轴起点、终点 | 项目排列开始和结束的位置 |
| 交叉轴起点、终点 | 项目及各行在交叉方向上的边界 |

下文示意以横排、从左到右的书写模式为例。轴的方向还受到 `writing-mode` 和 `direction` 影响，不能始终把主轴当作水平方向。

![row 与 column 的主轴、交叉轴方向对比](/img/posts/css-flex/axes.svg)

## 容器属性

### flex-direction：排列方向

| 值 | 横排、从左到右书写时的效果 |
| --- | --- |
| `row` | 默认值，从左向右排列 |
| `row-reverse` | 从右向左排列 |
| `column` | 从上向下排列 |
| `column-reverse` | 从下向上排列 |

```css
.stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
```

反向排列只改变视觉布局，不修改 DOM 顺序。正文、表单和导航应保持合理的源码顺序，避免视觉顺序与朗读、键盘访问顺序脱节。

### flex-wrap：空间不足时换行

默认值 `nowrap` 表示所有项目都放在同一条弹性行中。空间不足时，项目可能收缩，也可能因最小尺寸限制而溢出；并不会自动换行。

| 值 | 效果 |
| --- | --- |
| `nowrap` | 不换行 |
| `wrap` | 按交叉轴方向增加新行 |
| `wrap-reverse` | 换行，并翻转交叉轴起点与终点 |

```css
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
```

![同一容器内 nowrap 收缩与 wrap 换行对比](/img/posts/css-flex/wrap.svg)

`flex-flow` 是方向与换行的简写：

```css
.tags {
  display: flex;
  flex-flow: row wrap;
}
```

### justify-content：主轴对齐

`justify-content` 分配主轴上的剩余空间。Flex 尺寸计算完成后，如果已没有剩余空间，`space-between` 等值就不会产生额外间隔。

| 值 | 效果 |
| --- | --- |
| `flex-start` | 聚集在主轴起点 |
| `flex-end` | 聚集在主轴终点 |
| `center` | 整组项目居中 |
| `space-between` | 首尾项目靠两端，中间等距 |
| `space-around` | 每个项目两侧分配相等空间，内部间隔是边缘的两倍 |
| `space-evenly` | 边缘与项目之间的间隔相等 |

![六种 justify-content 主轴对齐方式](/img/posts/css-flex/justify.svg)

只有一个项目时，`space-between` 会把它放在主轴起点。需要单个项目居中时，直接使用 `center`。

### align-items：行内项目的交叉轴对齐

`align-items` 控制每一条弹性行内的项目如何沿交叉轴对齐。

| 值 | 效果 |
| --- | --- |
| `stretch` | 对交叉尺寸为 `auto` 的项目进行拉伸，仍受最小、最大尺寸约束 |
| `flex-start` | 对齐交叉轴起点 |
| `flex-end` | 对齐交叉轴终点 |
| `center` | 沿交叉轴居中 |
| `baseline` | 按文字基线对齐，适合不同字号的内容 |

在默认的 `row` 布局中，主轴水平、交叉轴垂直：

```css
.toolbar {
  display: flex;
  min-height: 64px;
  align-items: center;
}
```

若改为 `column`，`align-items: center` 就变为水平方向居中。Flex 中默认的 `normal` 对齐通常表现为 `stretch`；项目显式设置了交叉方向尺寸时，不会因 `stretch` 自动撑满该方向。

![五种 align-items 交叉轴对齐方式，包含拉伸和基线对齐](/img/posts/css-flex/align-items.svg)

### align-content：多行整体对齐

`align-content` 控制多行弹性容器中各条弹性行的分布。通常需要容器设置 `wrap`，并在交叉轴上留有额外空间，才能看出差异；它对 `nowrap` 的单行弹性容器无效。

```css
.tag-panel {
  display: flex;
  flex-wrap: wrap;
  height: 240px;
  align-content: flex-start;
  gap: 12px;
}
```

![两条弹性行的顶部聚集与两端分布](/img/posts/css-flex/align-content.svg)

可用值包括 `flex-start`、`flex-end`、`center`、`space-between`、`space-around`、`space-evenly` 和 `stretch`。它移动或拉伸的是弹性行；`align-items` 则对齐行内的项目。

### gap：项目与行之间的间距

```css
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
}
```

在 `row` 布局中，上例表示行间距为 16px、同一行项目间距为 24px；在 `column` 布局中，`row-gap` 是同一列项目的垂直间距，`column-gap` 是列间距。

`gap` 不给容器外边缘增加留白，外边距应通过容器的 `padding` 设置。它可以与 `justify-content` 同时使用，此时可见间隔可能还包含额外分配的空间。

## 项目属性与弹性尺寸

### flex-basis：分配空间前的基准尺寸

`flex-basis` 指定项目在主轴方向上的初始尺寸，随后再根据 `flex-grow`、`flex-shrink` 参与空间分配。

```css
.item {
  flex-basis: 200px;
}
```

在 `row` 中它对应初始宽度，在 `column` 中对应初始高度。默认值 `auto` 会参考主轴方向的 `width` 或 `height`；对应尺寸也为 `auto` 时，基准尺寸与内容有关。

当 `flex-basis` 为明确的非 `auto` 值时，Flex 的基准尺寸优先使用它，而非主轴方向的 `width` 或 `height`。最终尺寸仍会受内容、边框、内边距和 `min-*`、`max-*` 约束。

### flex-grow：有剩余空间时如何扩展

默认值为 `0`，表示不主动扩展。常见做法是使用 1、2 等权重分配剩余空间。

假设容器内容宽度为 600px，无间距、边框和内边距，三个项目的基准尺寸都是 100px，且没有最小、最大尺寸限制：

![600px 容器中按 1 比 2 比 1 分配新增宽度](/img/posts/css-flex/grow.svg)

计算过程：剩余空间为 `600 − 100 × 3 = 300px`，每份为 `300 ÷ 4 = 75px`；A、B、C 分别增加 75px、150px、75px，最终宽度为 175px、250px、175px。

比例作用于增加的空间，并非项目的最终宽度。若增长因子之和小于 1，它们可能只使用一部分剩余空间；实际布局中还有最小、最大尺寸导致的重新分配。

### flex-shrink：空间不足时如何收缩

默认值为 `1`。收缩并非只比较 `flex-shrink` 数值，还需要按项目的基准尺寸加权。

假设容器宽 300px，两个项目的基准尺寸分别为 200px、400px，`flex-shrink` 都是 1，且允许充分收缩：

![按 200 比 400 的权重收缩两个项目](/img/posts/css-flex/shrink.svg)

计算过程：需要缩减 `600 − 300 = 300px`；权重为 `1 × 200 : 1 × 400 = 1 : 2`，A 缩减 100px、B 缩减 200px，最终分别为 100px、200px。

需要固定尺寸的图标或侧栏，可以禁止收缩：

```css
.icon {
  flex: 0 0 40px;
}
```

### flex：三个属性的简写

```css
.item {
  flex: 1 1 200px;
  /* flex-grow: 1; flex-shrink: 1; flex-basis: 200px; */
}
```

| 写法 | 对应值 | 适用情况 |
| --- | --- | --- |
| `flex: initial` | `0 1 auto` | 默认行为，不增长、可收缩 |
| `flex: auto` | `1 1 auto` | 以自身尺寸为基础增长或收缩 |
| `flex: none` | `0 0 auto` | 保持自身尺寸，不增长、不收缩 |
| `flex: 1` | 浏览器通常展开为 `1 1 0%` | 常用于平分空间 |
| `flex: 0 0 160px` | `0 0 160px` | 固定主轴基准尺寸 |

`flex: 1` 并不总能得到等宽项目：内容的自动最小尺寸和不同的内边距仍可能影响结果。容器主轴尺寸不确定时，`0%` 与 `0` 也可能表现不同，需要明确基准时可写为 `flex: 1 1 0`。

### 自动最小尺寸：为什么项目缩不下去

横向 Flex 项目默认的 `min-width: auto` 经常让长单词、地址或不换行文本撑开布局。允许正文区域收缩时，可以显式设置 `min-width: 0`：

```css
.content {
  flex: 1 1 0;
  min-width: 0;
}

.title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

若希望长地址换行而不是省略，可使用 `overflow-wrap: anywhere`。纵向 Flex 中，内部滚动区域经常需要相应地设置 `min-height: 0`。

### align-self：单个项目的交叉轴对齐

```css
.toolbar {
  display: flex;
  align-items: center;
}

.toolbar > .special {
  align-self: flex-start;
}
```

`align-self` 覆盖该项目的 `align-items` 对齐方式，常见值包括 `auto`、`flex-start`、`flex-end`、`center`、`baseline`、`stretch`。Flex 不提供逐项主轴对齐的 `justify-self` 效果，需要通过自动外边距等方式处理。

### auto 外边距：把项目推向一侧

自动外边距会在对齐计算前吸收该轴上的正剩余空间。工具栏中可以让操作区吸收左侧空间：

```css
.actions {
  margin-inline-start: auto;
}
```

![自动外边距把操作区推向主轴终点](/img/posts/css-flex/auto-margin.svg)

一个项目左右都有 `auto` 外边距时，可以分配两侧剩余空间实现居中。空间不足时则没有额外空间可供吸收。

### order：视觉排序

`order` 默认是 0，值越小越靠前，相同值仍按源码顺序排列。

```css
.featured {
  order: -1;
}
```

`order` 不会改变 DOM 顺序，也不保证键盘导航和读屏顺序同步变化。只在视觉调整确有必要时使用，不能替代合理的 HTML 结构。

## 实战：响应式卡片列表

![卡片宽屏等高排列、窄屏换行及底部链接对齐](/img/posts/css-flex/cards.svg)

下面是可直接保存为 HTML 文件运行的示例。容器变窄时卡片自动换行；同一行的卡片高度一致，各卡片中的按钮靠底部排列。

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Flex 卡片布局</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px;
      font-family: system-ui, sans-serif;
      line-height: 1.7;
      color: #243247;
      background: #f3f6fa;
    }
    .cards {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      max-width: 960px;
      margin-inline: auto;
    }
    .card {
      flex: 1 1 240px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      padding: 24px;
      border: 1px solid #d6deea;
      border-radius: 12px;
      background: white;
      overflow-wrap: anywhere;
    }
    .card h2 { margin: 0 0 12px; }
    .card p { margin: 0 0 24px; }
    .card a {
      align-self: flex-start;
      margin-top: auto;
      color: #175bc2;
    }
  </style>
</head>
<body>
  <main class="cards" aria-label="布局学习资料">
    <article class="card">
      <h2>排列方向</h2>
      <p>先确定主轴，再选择对齐方式。</p>
      <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-direction">阅读方向说明</a>
    </article>
    <article class="card">
      <h2>弹性尺寸</h2>
      <p>项目以基准尺寸参与布局，再根据剩余空间增长或收缩。内容更长时，同一行的其他卡片仍可以与它保持等高。</p>
      <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex">阅读尺寸说明</a>
    </article>
    <article class="card">
      <h2>自动换行</h2>
      <p>调窄浏览器窗口，观察卡片如何进入下一行。</p>
      <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap">阅读换行说明</a>
    </article>
  </main>
</body>
</html>
```

外层 `.cards` 管理水平方向的排列与换行，内层 `.card` 用纵向 Flex 排列内容。`margin-top: auto` 吸收正文下方的剩余空间，使链接贴近卡片底部。

这个方案会让最后一行的卡片继续增长。如果需要最后一行保持与前面相同的列宽，应考虑 Grid，或为 Flex 项目设置合适的宽度上限。

## 实战：固定侧栏与可收缩正文

![宽屏固定侧栏与弹性正文、窄屏上下排列](/img/posts/css-flex/sidebar.svg)

```html
<div class="layout">
  <aside class="sidebar">目录</aside>
  <main class="main-content">
    <h1>正文标题</h1>
    <p>这里的正文占据剩余宽度，较窄屏幕下改为上下排列。</p>
  </main>
</div>

<style>
  .layout {
    display: flex;
    gap: 24px;
  }
  .sidebar {
    flex: 0 0 200px;
  }
  .main-content {
    flex: 1 1 0;
    min-width: 0;
    overflow-wrap: anywhere;
  }
  @media (max-width: 640px) {
    .layout {
      flex-direction: column;
    }
    .sidebar,
    .main-content {
      flex: 0 1 auto;
    }
  }
</style>
```

切换成 `column` 后，`flex-basis` 控制的方向从宽度变为高度，所以需要重置原本的 200px 基准值，避免侧栏意外变成固定高的区域。

## 实战：固定头部与内部滚动

![320px 高容器中的固定头部与独立滚动正文](/img/posts/css-flex/scroll.svg)

```html
<section class="panel">
  <header class="panel-header">消息列表</header>
  <div class="panel-body">
    <p>列表内容……</p>
    <p>继续添加内容，超过可用高度后将在此区域内滚动。</p>
  </div>
</section>

<style>
  .panel {
    display: flex;
    flex-direction: column;
    height: 320px;
    border: 1px solid #ccd4df;
  }
  .panel-header {
    flex: none;
    padding: 16px;
    background: #eef2f7;
  }
  .panel-body {
    flex: 1 1 0;
    min-height: 0;
    overflow: auto;
    padding: 16px;
  }
</style>
```

关键是外层有明确高度，内部区域允许收缩并设置滚动。嵌套多层 Flex 时，如果某一层仍被内容的最小高度撑开，也需要检查那一层的 `min-height`。

## 常见问题速查

| 现象 | 检查与处理 |
| --- | --- |
| 设置 `align-items: center` 后没有垂直居中 | 确认是否为 `row`，以及交叉轴方向是否有可用空间 |
| `align-content` 没有效果 | 检查是否设置 `wrap`、交叉轴是否有剩余空间 |
| `space-between` 没有拉开距离 | 项目增长或自动外边距可能已经吸收剩余空间 |
| 固定宽度的图标被挤小 | 默认允许收缩，可使用 `flex-shrink: 0` 或 `flex: none` |
| 长文本撑破容器 | 项目设置 `min-width: 0`，再选择换行或省略策略 |
| 纵向区域无法内部滚动 | 检查外层高度、`min-height: 0` 和 `overflow: auto` |
| 三个项目设置相同宽度却提前换行 | 把 `gap`、边框、内边距、外边距一起纳入尺寸计算 |
| `justify-self` 不生效 | Flex 项目主轴对齐使用自动外边距或容器对齐属性 |
| `stretch` 不生效 | 检查项目是否设置了明确的交叉尺寸或自动外边距 |
| 最后一行卡片被撑宽 | 每行独立增长；需要严格列对齐时考虑 Grid |

## 兼容性与资料

基础 Flex 布局已被常见现代浏览器支持，但 Flex 容器中的 `gap`、逻辑属性和部分对齐值进入浏览器的时间不同。本文示例采用现代语法；需要兼容旧浏览器时，应分别确认这些特性的支持情况。

尤其要注意：`@supports (gap: 1px)` 只能判断浏览器是否支持该声明，不能证明它支持在 Flex 中使用 `gap`，因为浏览器可能只在 Grid 中支持它。

- [MDN：Flexbox 基本概念](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)
- [MDN：flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)
- [Can I use：Flexbox](https://caniuse.com/flexbox)
- [Can I use：Flexbox gap](https://caniuse.com/flexbox-gap)
- [CSS Grid 网格布局](/article/c5073f42.html)
