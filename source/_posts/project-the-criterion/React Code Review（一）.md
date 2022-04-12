---
title: React Code Review（一）
tags:
  - Code Review
categories: Code Review
comments: false
cover: >-
  https://img1.baidu.com/it/u=3096240423,462637224&fm=253&fmt=auto&app=138&f=JPEG?w=1141&h=500
sticky: 98
abbrlink: 12c7d59d
date: 2022-03-20 00:00:00
top_img:
---

## 状态合并

看一下如下代码，不知道大家会有什么感想？

```jsx
import React, { useState } from "react";

const Demo = () => {
  const [state1, setState1] = React.useState("");
  const [state2, setState2] = React.useState("");
  const [state3, setState3] = React.useState("");
  // 4,5,6,7....

  return <div>xxx</div>;
};
```

函数组件通过 useState 更新状态，这就会出现一个组件内出现大量 useState，看上去很不爽，但又没什么毛病。

是否可以像类组件一样，通过 setState 维护多个状态呢？

当然，我们改造一下。

```jsx
import React, { useState } from "react";

const Demo = () => {
  const [state, produce] = React.useState({
    state1: "",
    state2: "",
    state3: "",
  });
  const setState = (newState) => {
    produce({
      ...state,
      ...newState,
    });
  };

  return <div>xxx</div>;
};
```

咋一看代码还多了呢？这是因为我们简写了代码，让你产生了误解，实际项目中可能会有 N 个 useState 。

是否需要封装 useState 取决于实际情况，如果组件内 useState 过多的话可以仔细考虑下组件拆分是否合理。
