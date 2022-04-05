---
title: 三、Vue2.x-选项
tags: Vue2.x
categories: Vue2.x
cover: https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2Fv2-db7221c0d7ca752b2f88d7ca94939976_1440w.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645531271&t=ee378fdaea2d7c5a65a295534e38d247
abbrlink: 1c2ffdec
date: 2019-04-07 00:00:00
---

### 第 1 节：methods 方法

```html
<!-- 
	场景一：基础用法
-->
<div id="app">
  {{ number }}
  <p><button @click="增加">add</button></p>
</div>

<script type="text/javascript">
  var app = new Vue({
    el: "#app",
    data: {
      number: 1,
    },
    methods: {
      // 第一种写法
      add: function () {
        this.number++;
      },
      // 第二种写法
      add() {
        this.number++;
      },
    },
  });
</script>

<!-- 
	场景二：methods中传递参数
-->
<div id="app">
  <p><button @click="add(10)">增加</button></p>
</div>

<script type="text/javascript">
  var app = new Vue({
    el: "#app",
    data: {
      number: 1,
    },
    methods: {
      // 第一种写法
      add: function (n) {
        console.log(n); // 10
      },
      // 第二种写法
      add(n) {
        console.log(n); // 10
      },
    },
  });
</script>

<!-- 
	场景三：methods中传递$event参数
          // 传递的$event参数都是关于你点击鼠标的一些事件和属性。
-->
<button @click="”add(2,$event)”">add</button>
```

### 第 2 节：computed 计算属性

- computed 的作用主要是对原数据进行改造输出。改造输出：包括格式的编辑，大小写转换，顺序重排，添加符号……

```html
<!-- 示例一：格式化价格数据 -->
<div id="app">{{ newPrice }}</div>
<script type="text/javascript">
  new Vue({
    el: "#app",
    data: {
      price: 100,
    },
    computed: {
      newPrice: function () {
        return (this.price = "￥" + this.price + "元");
      },
    },
  });
</script>

<!-- 
示例二：用计算属性反转数组 
    例如：我们得到了一个新闻列表的数组，它的顺序是安装新闻时间的顺序正序排列的，也就是早反生的新闻排在前面。
    这是反人类的，我们需要给他反转。这时我们就可以用到我们的计算属性了。
-->
<div id="app">{{ reverseNews }}</div>
<script>
  new Vue({
    el: "#app",
    data: {
      newsList: [
        {
          title: "香港或就“装甲车被扣”事件追责 起诉涉事运输公司",
          date: "2017/3/10",
        },
        { title: "日本第二大准航母服役 外媒：针对中国潜艇", date: "2017/3/12" },
        {
          title: "中国北方将有明显雨雪降温天气 南方阴雨持续",
          date: "2017/3/13",
        },
        {
          title: "起底“最短命副市长”：不到40天落马，全家被查",
          date: "2017/3/23",
        },
      ],
    },
    computed: {
      reverseNews: function () {
        return this.newsList.reverse();
      },
    },
  });
</script>
```

### 第 3 节：watch 数据监听

- 数据变化的监控经常使用，我们可以先来看一个简单的数据变化监控的例子。例如天气预报的穿衣指数，它主要是根据温度来进行提示的，当然还有其它的，咱们就不考虑了。

```html
<div id="app">{{ `今天的天气温度是：${37.5}℃，适合穿${clothes}出门` }}</div>
<script>
  new Vue({
    el: "#app",
    data: {
      degree: 37.5,
      clothes: "短袖",
    },
    // watch的中的函数不会立即执行，只有监控的树发生变化时候才会进行触发
    watch: {
      degree(newVal, oldVal) {
        if (newVal > 37.5) {
          this.clothes = "短袖";
        } else if (newVal < 37.5 && newVal > 30) {
          this.clothes = "长袖";
        } else {
          this.clothes = "棉袄";
        }
      },
    },
  });
</script>
```

- watch 的 handler 方法 immediate 属性和 deep 属性

```html
<div id="app">{{ `今天的天气温度是：${37.5}℃，适合穿${clothes}出门` }}</div>
<script>
  new Vue({
    el: "#app",
    data: {
      degree: 37.5,
      clothes: "短袖",
    },
    watch: {
      degree: {
        handler(newVal, oldVal) {
          if (newVal > 37.5) {
            this.clothes = "短袖";
          } else if (newVal < 37.5 && newVal > 30) {
            this.clothes = "长袖";
          } else {
            this.clothes = "棉袄";
          }
        },
        immediate: true, // 立即执行一次
        // deep: true			// 用于深度监听{ name: "hj", child: { age: 22 } }对象或者数组
      },
    },
  });
</script>
```

### 第 4 节：minxins 混入选项操作

- Mixins 一般有两种用途：
  1. 在你已经写好了构造器后，需要增加方法或者临时的活动时使用的方法，这时用混入会减少源代码的污染。
  2. 很多地方都会用到的公用方法，用混入的方法可以减少代码量，实现代码重用。

```html
// 创建mixins文件夹 -> mixins.js
<script>
  const mixins = {
    data() {
      return {};
    },
    methods: {},
  };
  export default mixins;
</script>
```
