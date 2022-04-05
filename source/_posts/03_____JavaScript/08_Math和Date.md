---
title: 八、Math和Date
tags: JavaScript
categories: JavaScript
cover: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-25182ac6197d798d6d8b22d3b0710cbf_1200x500.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645530798&t=e5c6ac493d1c8b04cd2a4740e1cc9870"
abbrlink: 318dac24
date: 2019-03-08 00:00:00
---

# Math 和 Date

- Math 是 js 的一个内置对象，提供了一堆的方法帮助我们操作 **数字**
- Date 是 js 的一个内置对象，提供了一堆的方法帮助我们操作 **时间**

## Math

- `random`、`round`、`abs`、`ceil`、`floor`、`max`、`min`、`PI`

1. `Math.random()`，用来生成一个`0 ~ 1`之间的随机数，生成的数字包含 0 ，但是不包含 1

   ```javascript
   var num = Math.random();
   console.log(num); // 得到一个随机数

   /* 应用场景：随机点名 */
   var names = [
     "娄豪杰",
     "温亚帅",
     "窦全磊",
     "老许",
     "刘旭",
     "殷逸",
     "张朗",
     "罗慧",
   ];
   var timer = setInterval(() => {
     let index = Math.floor(Math.random() * names.length);
     // console.log(names[index])
     if (names[index] === "浩瀚") {
       console.log(`${names[index]}：我要请大家吃饭！！！`);
       clearInterval(timer);
     }
   }, 500);
   ```

2. `Math.round()`，四舍五入

   ```javascript
   let num1 = 4.4999;
   let num2 = 4.5;
   console.log(Math.round(num1)); // 4
   console.log(Math.round(num2)); // 5
   ```

3. `Math.abs`，绝对值

   ```javascript
   var num = -10;
   console.log(math.abs(num)); // 10
   ```

4. `Math.ceil`，是将一个小数 **向上取整** 得到的整数

   ```javascript
   var num = 10.1;
   console.log(Math.ceil(num)); // 11
   ```

5. `Math.floor`，是将一个小数 **向下取整** 的到的整数

   ```javascript
   var num = 10.1;
   console.log(Math.floor(num)); // 10
   ```

6. `Math.max`，得到的是你传入的几个数字之中 **最大** 的那个数字

   ```javascript
   var str = "1, 2, 3, 4, 5";
   console.log(Math.max(str)); // 5
   ```

7. `Math.min`，得到的是你传入的几个数字之中 **最小** 的那个数字

   ```
   var str = "1, 2, 3, 4, 5"
   console.log(Math.min(str))	// 1
   ```

8. `Math.PI`,得到的是 `π` 的值，也就是 `3.1415936...`

   ```
   var num = Math.PI
   console.log(num); // 3.141592653589793
   // 因为计算机的计算精度问题，只能得到小数点后 15 位
   ```

## Date

- `js` 提供的内置构造函数，专门用来获取时间的

1. 测试程序执行了多久

   ```javascript
   var start = Date.now(); // 时间戳
   for (let i = 0; i < 200000000; i++) {
     console.log(i);
   }
   var end = Date.now();
   console.log((end - start) / 1000 + "秒");
   ```

2. 日期对象转为时间戳

   ```javascript
   var date = new Date();
   console.log(date * 1); // 方式一
   console.log(Number(date)); // 方式二
   ```

3. 时间戳转为日期对象

   ```javascript
   var timestamp = 1616372410777;
   console.log(new Date(timestamp)); // Mon Mar 22 2021 08:20:10 GMT+0800 (中国标准时间)
   ```

4. **获取当前时间并且格式化**

   ```javascript
   let date = new Date();
   let year = date.getFullYear(),
     month = date.getMonth() + 1,
     day = date.getDate(),
     hour = date.getHours(),
     minute = date.getMinutes(),
     second = date.getSeconds();
   month < 10 ? (month = "0" + month) : month;
   day < 10 ? (day = "0" + day) : day;
   hour < 10 ? (hour = "0" + hour) : hour;
   minute < 10 ? (minute = "0" + minute) : minute;
   second < 10 ? (second = "0" + second) : second;
   console.log(`${year}-${month}-${day} ${hour}:${minute}:${second}`);
   // 2021-03-22 08:16:00
   ```

5. **封装格式化时间函数**

   ```javascript
   function dateFormat(date, format = "YYYY-MM-DD HH:mm:ss") {
     const config = {
       YYYY: date.getFullYear(),
       MM: date.getMonth() + 1,
       DD: date.getDate(),
       HH: date.getHours(),
       mm: date.getMinutes(),
       ss: date.getSeconds(),
     };
     config.MM < 10 ? (config.MM = "0" + config.MM) : config.MM;
     config.DD < 10 ? (config.DD = "0" + config.DD) : config.DD;
     config.HH < 10 ? (config.HH = "0" + config.HH) : config.HH;
     config.mm < 10 ? (config.mm = "0" + config.mm) : config.mm;
     config.ss < 10 ? (config.ss = "0" + config.ss) : config.ss;
     for (const key in config) {
       format = format.replace(key, config[key]);
     }
     return format;
   }
   // 使用方式
   var date = new Date();
   console.log(dateFormat(date, "YYYY-MM-DD HH:mm:ss"));
   ```

6. `Monment.js`日期处理类库

   - 依赖安装方式：npm install moment --save 或者 yarn add moment

   ```javascript
   /* cdn引入使用方式 */
   <script src="https://cdn.bootcdn.net/ajax/libs/moment.js/2.9.0/moment.min.js">

   // 获取当前时间
   let curTime = moment().format('YYYY-MM-DD HH:mm:ss');
   console.log(curTime)	// 2021-03-22 12:00:00

   // 传入时间进行格式化处理
   let date = moment('1998-05-23 12:00:00')
   console.log(date.format('YYYY-MM-DD HH:mm:ss'))     // 1998-05-23 12:00:00
   ```

## 定时器的使用

- `setInterval`和`setTimeout `

- 语法：setInterval（func，time）
  - 有两个参数，第一个参数是一个函数，第二个参数是时间间隔，单位是毫秒
  - 每间隔 time 毫秒，会执行一次函数
  - setInterval 的返回值是一个数字

```javascript
// 计时器每1秒执行一次
let num = 0;
let timer = setInterval(function () {
  console.log("豪杰真帅");
  num++;
  if (num === 10) {
    clearInterval(timer);
  }
}, 1000);

// 延时器延迟一秒执行
setTimeout(function () {
  console.log("豪杰真帅");
}, 1000);
```
