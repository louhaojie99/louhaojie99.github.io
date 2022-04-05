---
title: 五、Vue2.x-Vue-router
tags: Vue2.x
categories: Vue2.x
cover: https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2Fv2-db7221c0d7ca752b2f88d7ca94939976_1440w.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645531271&t=ee378fdaea2d7c5a65a295534e38d247
abbrlink: c6b21199
date: 2019-04-09 00:00:00
---

### 第 1 节：Vue-router 入门

- 安装 vue-router

  ```bash
  npm install vue-router --save-dev
  ```

- 解读 router/index.js 文件

  ```javascript
  import Vue from "vue"; // 引入Vue
  import Router from "vue-router"; // 引入vue-router
  import Hello from "@/components/Hello"; // 引入根目录下的Hello.vue组件

  Vue.use(Router); //Vue全局使用Router

  export default new Router({
    routes: [
      // 配置路由，这里是个数组
      {
        // 每一个链接都是一个对象
        path: "/", // 链接路径
        name: "Hello", // 路由名称，
        component: Hello, // 对应的组件模板
      },
    ],
  });
  ```

- router-link 制作导航

  ```javascript
  <router-link to="/">[显示字段]</router-link>

  // to：是我们的导航路径，要填写的是你在router/index.js文件里配置的path值，如果要导航到默认首页，只需要写成 to=”/” ，
  // [显示字段] ：就是我们要显示给用户的导航名称，比如首页 新闻页。
  ```

### 第 2 节：vue-router 配置子路由

```javascript
import Vue from "vue";
import Router from "vue-router";
import Hello from "@/components/Hello";
import Hi from "@/components/Hi";
import Hi1 from "@/components/Hi1";
import Hi2 from "@/components/Hi2";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Hello",
      component: Hello,
    },
    {
      path: "/hi",
      component: Hi,
      children: [
        { path: "/", component: Hi },
        { path: "hi1", component: Hi1 },
        { path: "hi2", component: Hi2 },
      ],
    },
  ],
});
```

### 第 3 节：vue-router 如何参数传递

### 第 4 节：单页面多路由区域操作

### 第 5 节：vue-router 利用 url 传递参数

### 第 6 节：vue-router 的重定向-redirct

### 第 7 节：alias 别名的使用

### 第 8 节：路由的过度动画

### 第 9 节：mode 的设置和 404 页面处理

### 第 10 节：路由中的钩子

### 第 11 节：编程式导航
