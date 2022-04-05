---
title: 四、Vue2.x-实例和内置组件
tags: Vue2.x
categories: Vue2.x
cover: https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2Fv2-db7221c0d7ca752b2f88d7ca94939976_1440w.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645531271&t=ee378fdaea2d7c5a65a295534e38d247
abbrlink: 5bfc10aa
date: 2019-04-08 00:00:00
---

### 第 1 节：实例方法

#### ）$mount 方法

- $mount 方法是用来挂载我们的扩展的

  ```html
  <div id="app">{{message}}</div>

  <script type="text/javascript">
    var jspang = Vue.extend({
      template: `<p>{{message}}</p>`,
      data: function () {
        return {
          message: "Hello ,I am JSPang",
        };
      },
    });
    var vm = new jspang().$mount("#app");
  </script>
  ```

#### ）$destory()卸载方法

- 用$destroy()进行卸载，我写了一个 button 按钮，点击后卸载整个挂载

  ```html
  <button onclick="destroy()">卸载</button> destroy(){ vm.$destroy(); }
  ```

#### ）$nextTick()

- 用于在 create 生命周期或者 methods 方法中也能获取到 dom 对象

  ```html
  <div id="app">
    <div ref="hj">HJ</div>
  </div>
  <script type="text/javascript">
    new Vue({
      el: "#app",
      data() {
        return {};
      },
      methods: {
        getDom() {
          let _this = this;
          this.$nextTick(() => {
            let dom = _this.$refs.hj;
          });
        },
      },
    });
  </script>
  ```

### 第 2 节：实例事件（不常用）

- 实例事件就是在构造器外部写一个调用构造器内部的方法。这样写的好处是可以通过这种写法在构造器外部调用构造器内部的数据。

- 一、$on 在构造器外部添加事件。

  ```javascript
  app.$on("reduce", function () {
    console.log("执行了reduce()");
    this.num--;
  });
  ```

- 二、$once 执行一次的事件

  ```javascript
  app.$once("reduceOnce", function () {
    console.log("只执行一次的方法");
    this.num--;
  });
  ```

- 三、$off 关闭事件

  ```javascript
  //关闭事件
  function off() {
    app.$off("reduce");
  }
  ```

### 第 3 节：内置组件 - slot（插槽）

- slot 是标签的内容扩展，也就是说你用 slot 就可以在自定义组件时传递给组件内容，组件接收内容并输出。

  ```html
  <!-- 普通插槽的用法 -->
  <div id="app">
      <Child>
      	<template>你好世界</div>
      </Child>
  </div>
  <script>
  import Child from './components/Child'
  new Vue({
  	el:'#app',
      components:{
          Child: {
          	template: `
  				<div>
  					<slot></slot>
  				<div>`
      	}
      }
  })
  </script>
  ```


  <!-- 具名插槽的用法 -->
  <div id="app">
      <Child>
      	<div slot="head">我是页眉信息</div>
          <div slot="body">我是主体信息</div>
          <div slot="foot">我是页脚信息</div>
      </Child>
  </div>
  <script>
  import Child from './components/Child'
  new Vue({
  	el:'#app',
      components:{
          Child: {
          	template: `
  				<div>
  					<slot name="head"></slot>
  					<slot name="body"></slot>
  					<slot name="foot"></slot>
  				<div>`
      	}
      }
  })
  </script>
  ```

  ```