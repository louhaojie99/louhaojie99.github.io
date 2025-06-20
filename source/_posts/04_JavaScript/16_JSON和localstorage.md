---
title: 十六、JSON与localstorage
tags: JavaScript
categories: JavaScript
cover: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-25182ac6197d798d6d8b22d3b0710cbf_1200x500.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645530798&t=e5c6ac493d1c8b04cd2a4740e1cc9870"
abbrlink: ea5835a8
date: 2019-03-16 00:00:00
---

# JSON 字符串和对象的转换

[JSON]()([JavaScript]() Object Notation, JS 对象简谱) 是一种轻量级的数据交换格式。它基于 [ECMAScript] (欧洲计算机协会制定的 js 规范)的一个子集，采用完全独立于编程语言的文本格式来存储和表示数据。简洁和清晰的层次结构使得 JSON 成为理想的数据交换语言。 易于人阅读和编写，同时也易于机器解析和生成，并有效地提升网络传输效率

注意 json 字符串中的属性名只能是字符串，并且只能用双引号。属性值如果是字符串的话，也只能使用双引号

```
let str = '{"name":"李四","age":18}'

let productsStr = '[{"pname":"iphone11","price":1000},{"pname":"iphone12","price":2000}]'

```

## 把 json 字符串转为 js 中的对象

```
 JSON.parse(str)
```

## 把 js 中的对象 z 转化为 json 字符串

```
let obj = {
				name:'zhangsan',
				age:18,
				sex:true,
				aa:null,
				// bbb:undefined,
				children:[{name:'xiaoming'},{name:'xiaohong'}]

			}
```

##

```
JSON.stringify(obj);
```

JSON 常见报错

## eval 函数

eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。

```

eval("x=10;y=20;document.write(x*y)")

document.write(eval("2+2"))

var x=10

document.write(eval(x+17))

var A = '{  "a": 1 , "b" : "hello"}';
JSON.parse(A)

eval("("+A+")");//把字符串 转为对象
```

# localstorge

## 什么是 localStorage

在 HTML5 中，新加入了一个 localStorage 特性，这个特性主要是用来作为本地存储来使用的，
解决了 cookie 存储空间不足的问题(cookie 中每条 cookie 的存储空间为 4k)，
localStorage 中一般浏览器支持的是 5M 大小，这个在不同的浏览器中 localStorage 会有所不同

## localStorage 的优势

1、localStorage 拓展了 cookie 的 4K 限制

2、localStorage 会可以将第一次请求的数据直接存储到本地，这个相当于一个 5M 大小的针对于前端页面的数据库，相比于 cookie 可以节约带宽，但是这个却是只有在高版本的浏览器中才支持的

## localStorage 的局限

1、浏览器的大小不统一，并且在 IE8 以上的 IE 版本才支持 localStorage 这个属性

2、目前所有的浏览器中都会把 localStorage 的值类型限定为 string 类型，这个在对我们日常比较常见的 JSON 对象类型需要一些转换

## localStorage 的写入

localStorage 只支持 string 类型的存储

            //写入c字段
          localStorage.setItem("c",3);

## localStorage 的读取

            var c=localStorage.getItem("c");
            console.log(c)

localStorage 的修改
改这个步骤比较好理解，思路跟重新更改全局变量的值一样

localStorage.setItem("c",3);

将 localStorage 中的某个键值对删除
localStorage.removeItem("a");

将 localStorage 的所有内容清除

localStorage.clear();

localStorage 其他注意事项
一般我们会将 JSON(js 中的对象)存入 localStorage 中，但是在 localStorage 会自动将 localStorage 转换成为字符串形式
这个时候我们可以使用 JSON.stringify()这个方法，来将 JSON 转换成为 JSON 字符串

            var data={
                name:'zhangsan',
                sex:'man',
            };
            var d=JSON.stringify(data);
            storage.setItem("data",d);
            //将JSON字符串转换成为JSON对象输出
            var json=storage.getItem("data");
            var jsonObj=JSON.parse(json);

思考怎么往 localStorage 中存入数组，并且可以向 localStorage 中这个数组中添加元素
