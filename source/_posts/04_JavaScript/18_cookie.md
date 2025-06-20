---
title: 十八、初次认识浏览器中Cookies
tags: JavaScript
categories: JavaScript
cover: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-25182ac6197d798d6d8b22d3b0710cbf_1200x500.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645530798&t=e5c6ac493d1c8b04cd2a4740e1cc9870'
abbrlink: e8cb078e
date: 2019-03-18 00:00:00
---

# 通信协议

定义：通信协议是指双方实体完成通信或服务所必须遵循的规则和约定。协议定义了数据单元使用的格式，信息单元应该包含的信息与含义，连接方式，信息发送和接收的时序，从而确保网络中数据顺利地传送到确定的地方。
总结一句话：交流的规则。比如：汉语、英语、德语、日语等。
在计算机通信中，通信协议用于实现计算机与网络连接之间的标准，网络如果没有统一的通信协议，电脑之间的信息传递就无法识别。 通信协议是指通信各方事前约定的通信规则，可以简单地理解为各计算机之间进行相互会话所使用的共同语言。两台计算机在进行通信时，必须使用的通信协议。
常见的协议有：TCP/IP 协议、HTTP 协议等等。

# HTTP

- `http` 是我们前后台交互的时候的传输协议（即超文本传输协议）

## HTTP 的工作流程

1. 和服务器建立链接
2. 建立链接后，发送一个请求给服务器（请求 request- req）
3. 服务器接受到请求以后进行相应的处理并给出一个回应（响应 response-res）
4. 断开于服务器的链接

### 和服务器建立链接

- 怎么和服务器建立链接呢？

- 需要保证客户端的接受和发送正常，服务器端的接受和发送正常

- 这里就涉及到一个东西叫做 `TCP/IP` 协议

- 建立链接的主要步骤叫做 `三次握手`

  1. 客户端发送一个消息给到服务端

     ```text
     此时：
     	服务端知道了 客户端可以正常发送消息
     	服务端知道了 服务端可以正常接受消息
     ```

  2. 服务端回给客户端一个消息

     ```text
     此时：
     	服务端知道了 客户端可以正常发送消息
     	服务端知道了 服务端可以正常接受消息
     	客户端知道了 客户端可以正常发送消息
     	客户端知道了 客户端可以正常接受消息
     	客户端知道了 服务端可以正常接受消息
     	客户端知道了 服务端可以正常发送消息
     ```

  3. 客户端再回给服务端一个消息

     ```text
     此时：
     	服务端知道了 客户端可以正常发送消息
     	服务端知道了 服务端可以正常接受消息
     	客户端知道了 客户端可以正常发送消息
     	客户端知道了 客户端可以正常接受消息
     	客户端知道了 服务端可以正常接受消息
     	客户端知道了 服务端可以正常发送消息
     	服务端知道了 服务端可以正常发送消息
     	服务端知道了 客户端可以正常接受消息
     ```

- 至此，依照 `TCP/IP` 协议的建立链接就建立好了

- 双方都知道双方可以正常收发消息

- 就可以进入到第二步，通讯了

### 发送一个请求

- 建立完链接以后就是发送请求的过程

- 我们的每一个请求都要把我们的所有信息都包含请求

- 每一个请求都会有一个 `请求报文`

- 在 `请求报文` 中会包含我们所有的请求信息（也就是我们要和服务端说的话都在里面）

- 我们的请求报文中会包含几个东西

  1. 请求行

     ```shell
     POST /user HTTP/1.1
     # POST 请求方式
     # /user 请求URL（不包含域名）     /-》根
     # HTTP/1.1 请求协议版本
     ```

  2. 请求头（请求头都是键值对的形式出现的）

     ```shell
     user-agent: Mozilla/5.0 # 产生请求的浏览器信息
     accept: application/json # 表示客户端希望接受的数据类型
     Content-Type: application/x-www-form-urlencoded # 客户端发送的实体数据格式
     Host: 127.0.0.1 # 请求的主机名（IP）
     ```

  3. 请求空行（请求头和请求主体之间要留一个空白行）

     ```shell
     # 就是一个空行
     ```

  4. 请求体（本次请求携带的数据）

     ```shell
     # GET 请求是没有请求体数据的   的地址栏 url里面
     # POST 请求才有请求体数据
     ```

- 接下来看一个完整的请求报文

  ```shell
  POST /user HTTP/1.1      # 请求行
  Host: www.user.com
  Content-Type: application/x-www-form-urlencoded
  accept: application/json
  User-agent: Mozilla/5.0.     # 以上是首部
  #（此处必须有一空行）  # 空行分割header和请求内容
  name=world   # 请求体


  GET /login?username=11&password=123 HTTP/1.1      # 请求行
  Host: www.user.com
  Content-Type: application/x-www-form-urlencoded
  accept: application/json
  User-agent: Mozilla/5.0.     # 以上是首部
  #（此处必须有一空行）  # 空行分割header和请求内容
  # 请求体内容是空的
  ```

### 接受一个响应

- 客户端的请求发送到服务端以后

- 服务端进行对应的处理

- 会给我们返回一个响应

- 每一个响应都会有一个 `响应报文`

- 在 `响应报文` 中会包含我们所有的响应信息（也就是服务端在接受到客户端请求以后，给我们的回信）

- 我们的 `响应报文` 中会包含几个信息

  1. 状态行

     ```shell
     HTTP/1.1 200 OK
     # HTTP/1.1 服务器使用的 HTTP 协议版本
     # 200 响应状态码
     # OK 对响应状态码的简单解释
     ```

  2. 响应头

     ```shell
     Date: Jan, 14 Aug 2019 12:42:30 GMT # 服务器时间
     Server: Apache/2.4.23 (Win32) OpenSSL/1.0.2j PHP/5.4.45 # 服务器类型
     Content-Type: text/html # 服务端给客户端的数据类型
     Content-Length: 11 # 服务端给客户端的数据长度
     ```

  3. 响应体

     ```shell
     hello world
     # 服务端给客户端的响应数据
     ```

### 断开于服务端的链接

- 之前我们的建立链接是基于 `TCP/IP` 协议的 `三次握手`
- 我们的断开链接是基于 `TCP/IP` 协议的 `四次挥手`
  1. 客户端发送一个我要断开的消息给服务端
  2. 服务端接受到以后发送一个消息告诉客户端我已经进入关闭等待状态
  3. 服务端再次发送一个消息告诉客户端，这个是我的最后一次消息给你，当我再接受到消息的时候就会关闭
  4. 客户端接受到服务端的消息以后，告诉服务器，我已经关闭，这个是给你的最后一个消息

### 完成一个 HTTP 请求

- 至此，一个 HTTP 请求就完整的完成了
- 一个 HTTP 请求必须要包含的四个步骤就是
  1. 建立链接
  2. 发送请求
  3. 接受响应
  4. 断开链接
- 在一个 HTTP 请求中，请求的部分有请求报文，接受响应的部分有响应报文
- 请求报文包含
  1. 请求行
  2. 请求头
  3. 请求空行
  4. 请求体
- 响应报文
  1. 状态行
  2. 响应头
  3. 响应体

## 常见的 HTTP 响应状态码

- 在一个 HTTP 请求的响应报文中的状态行会有一个响应状态码
- 这个状态码是用来描述本次响应的状态的
- 通常会出现五种状态码
  1. 100 ~ 199
  2. 200 ~ 299
  3. 300 ~ 399
  4. 400 ~ 499
  5. 500 ~ 599

### 100 ~ 199

- 一般我们看不到，因为表示请求继续
- 100： 继续请求，前面的一部分内容服务端已经接受到了，正在等待后续内容
- 101： 请求者已经准备切换协议，服务器页表示同意

### 200 ~ 299

- 2 开头的都是表示成功，本次请求成功了，只不过不一样的状态码有不一样的含义（语义化）
- 200： 标准请求成功（一般表示服务端提供的是网页）
- 201： 创建成功（一般是注册的时候，表示新用户信息已经添加到数据库）
- 203： 表示服务器已经成功处理了请求，但是返回的信息可能来自另一源
- 204： 服务端已经成功处理了请求，但是没有任何数据返回

### 300 ~ 399

- 3 开头也是成功的一种，但是一般表示重定向
- 301： 永久重定向
- 302： 临时重定向
- 304： 使用的是缓存的数据
- 305： 使用代理

### 400 ~ 499

- 4 开头表示客户端出现错误了
- 400： 请求的语法服务端不认识
- 401： 未授权（你要登录的网站需要授权登录）
- 403： 服务器拒绝了你的请求
- 404： 服务器找不到你请求的 URL
- 407： 你的代理没有授权
- 408： 请求超时
- 410： 你请求的数据已经被服务端永久删除

### 500 ~ 599

- 5 开头的表示服务端出现了错误
- 500： 服务器内部错误
- 503： 服务器当前不可用（过载或者维护）
- 505： 请求的协议服务器不支持

## 常见的 HTTP 请求方式

- 每一个 HTTP 请求在请求行里面会有一个东西叫做请求方式
- 接口文档
- 不同的请求方式代表的含义不同
  1. GET： 一般用于获取一些信息使用（获取列表）
  2. POST： 一般用于发送一些数据给服务端（登录）
  3. PUT： 一般用于发送一些数据给服务当让其添加新数据（注册）
  4. DELETE： 一般用于删除某些数据
  5. HEAD： 类似于 GET 的请求，只不过一般没有响应的具体内容，用于获取报文头
  6. CONNECT： HTTP/1.1 中预留的方式，一般用于管道链接改变为代理的时候使用
  7. PATCH： 是和 PUT 方式类似的一个方式，一般用于更新局部数据
  8. OPTIONS： 允许客户端查看服务端性能
- 我们比较常用的就是 GET 和 POST
- restful api 客户端使用 GET、POST、PUT、DELETE4 个表示操作方式的动词对服务端资源进行操作：GET 用来获取资源，POST 用来新建资源（也可以用于更新资源），PUT 用来更新资源，DELETE 用来删除资源

### GET 请求

- 参数以 `querystring` 的形式发送，也就是直接拼接在 请求路径的后面（xxx.com/aaa？username=1212&password=1212）
- GET 请求会被浏览器主动缓存
- GET 请求根据不同的浏览器对 url 长度是有限制的
  - IE： 2083 个字符
  - FireFox： 65536 个字符
  - Safari： 80000 个字符
  - Opera： 190000 个字符
  - Chrome： 8182 个字符
  - APACHE(server)： 理论上接受的最大长度是 8192 个字符（有待商榷）
- 对参数的类型有限制，只接受 ASCII 码的格式
- GET 请求是明文发送，相对不安全

### POST 请求

- 参数以 `request body`的形式发送，也就是放在请求体中
- POST 请求不会被浏览器主动缓存，除非手动设置
- POST 请求理论上是没有限制的，除非服务端做了限制
- 对参数类型没有限制，理论上可以传递任意数据类型，只不过要和请求头对应
- POST 请求是密文发送，相对安全

# cookie 的概念

指某些网站为了辨别用户身份，进行 session（会话）跟踪而存储在用户本地终端上的数据（通常经过加密）。以文本形式存在。
谷歌浏览器存储地址： C:\Users\用户名\AppData\Local\Google\Chrome\User Data\Default\文件夹下的 Cookies 文件。
注：cookie 只有在服务器环境下才有用

禁用 cookie：改变浏览器的 cookie 设置。如果浏览器完全禁止 cookie 功能的话，大多数网站的基本功能无法正常使用。

### cookie 的特点

1：chrome 和 safari 没有对 cookie 的个数做限制，一般浏览器限制同一域名数量为 50 个。
2：cookie 文件的总大小一般为 4KB（同一个域名）。
3：只能使用文本文件。
4：读取有域名限制。 域名 www.baidu.com www.taobao.com so.com
不可跨域读取,只能由来自 写入 cookie 的 同一域名 的网页可进行读取。 简单的讲就是,谁写的 cookie,谁才有权利读取 (身份牌是我发你的,当然只有我能读取,你媳妇儿的手机自动连接了邻居老王家的 wifi,你知道这意味着什么吗?)
5：时效限制。
每个 cookie 都有时效,最短的有效期是,会话级别:就是当浏览器关闭,那么 cookie 立即销毁。

- cookie 是一个以字符串的形式存储数据的位置
- 每一个 HTTP 请求都会在请求头中携带 cookie 到服务端
- 每一个 HTTP 响应都会在响应头中携带 cookie 到客户端
- 也就是说，cookie 是不需要我们手动设置，就会自动在 客户端 和 服务端之间游走的数据
- 我们只是需要设置一下 cookie 的内容就可以

### cookie 的使用-前端操作 cookie (CRUD)

#### 添加 cookie：

```
document.cookie = “key=value”; // 一次写入一个键值对
document.cookie = 'test1=hello';
document.cookie = 'test2=world';
//在浏览器中查看一下现在的cookie是什么样子   打开控制台 点击application 就能看到cookies
//注意 document.cookie一次只能写入一个 Cookie，而且写入并不是覆盖，而是添加
```

#### 读取 cookie：

```
document.cookie // "test1=hello; test2=world"
上面代码从document.cookie一次性读出两个 Cookie，它们之间使用 分号空格 分隔。必须手动还原，才能取出每一个 Cookie 的值。

var cookies = document.cookie.split('; ');

for (var i = 0; i < cookies.length; i++) {
      console.log(cookies[i]);
}
// foo=bar// baz=bar
```

#### 修改 cookie：

```
document.cookie = “key=value”;  // 修改名为key的cookie值

document.cookie = 'test2=hah';
document.cookie // "test1=hello; test2=hah"

上面代码修改了test2对应的值
```

#### 删除 cookie：

```
将cookie值覆盖为空，并将失效时间设置为过去的时间。

var oDate = new Date();
oDate.setDate(oDate.getDate() -7);
document.cookie = “test=;expires=”+ oDate;
//将cookie的过期时间设置为 7天前，test 这个cookie 就获取不到了
```

### cookie 的属性

#### 失效时间

expires ，没有设置失效时间的 cookie 在浏览器关闭以后就会自动删除，如果设置了失效时候在未来的时间，就可以让 cookie 保存的时间长一点
设置失效时间：document.cookie = “key=value;expires=”+ oDate;

var oDate = new Date();
oDate.setDate(oDate.getDate() + 7);
document.cookie = “key=value;expires=”+ oDate;
上面代码设置 cookie 的过期时间为 7 天以后

#### 设置域名：domain

设置域名：document.cookie = “key=value;domain=www.baidu.com“;
注：必须在绑定域名的服务器才可以设置域名，上不同服务器之间的 cookie 文件不能共享。

#### 设置路径：path

设置路径： document.cookie = “key=value;path=/“;

注：在同一路径下的网页可以共享 cookie，路径不同时，不可以访问。

document.cookie = “key=value;path=/“;

设置 cookie 的路径为跟路径，这样我们网站下的所有页面可以共享 cookie

## cookie 的封装

增加/修改 cookie 函数：

```
function setCookie(name,value,iDay){
    var newDate = new Date();
    newDate.setDate(newDate.getDate()+iDay);

    document.cookie=name+"="+value+";expires="+newDate+";path=/";


}
```

获取 cookie 函数：

```
function getCookie(name){

    let cookie = document.cookie;
    var arr = cookie.split("; ");
    for(var i =0; i<arr.length; i++){
        var arr2 = arr[i].split("=");
        if(arr2[0] == name){
            return arr2[1];
        }
    }
}
```

删除 cookie 函数：

```
function removeCookie(name){
      setCookie(name,1,-100);
}
```
