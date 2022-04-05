---
title: 十七、数据库操作-Mysql
tags: Mysql
categories: Mysql
cover: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-25182ac6197d798d6d8b22d3b0710cbf_1200x500.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645530798&t=e5c6ac493d1c8b04cd2a4740e1cc9870"
abbrlink: f3f278bc
date: 2019-03-17 00:00:00
---

# PHP 和 mysql

## 第一节

### webserver

​ Web Server 中文名称叫网页服务器或 web 服务器。WEB 服务器也称为 WWW(WORLD WIDE WEB)服务器，主要功能是提供网上信息浏览服务

​ Web 服务器可以解析(handles)HTTP 协议。当 Web 服务器接收到一个 HTTP 请求(request)，会返回一个 HTTP 响应(response)，例如送回一个 HTML 页面。为了处理一个请求(request)，Web 服务器可以响应(response)一个静态页面或图片，进行页面跳转(redirect)，或者把动态响应(dynamic response)的产生委托(delegate)给一些其它的程序例如 CGI 脚本，JSP(JavaServer Pages)脚本，servlets，ASP(Active Server Pages)脚本，服务器端(server-side)JavaScript，或者一些其它的服务器端技术。无论它们(译者注：脚本)的目的如何，这些服务器端的程序通常产生一个 HTML 的响应(response)来让浏览器可以浏览

通俗的讲，当你在浏览器输入一个网址的时候，就发起了一个 http 请求，请求某一个服务器，然后服务器 上的程序（服务端）决定给你什么网页

### Apache 服务器

Apache HTTP Server（简称 Apache）是 Apache 软件基金会的一个开放源码的网页服务器

apache 是世界使用排名第一的 Web 服务器软件。它可以运行在几乎所有广泛使用的计算机平台上，由于其跨平台和安全性被广泛使用，是最流行的 Web 服务器端软件之一。它快速、可靠并且可通过简单的 API 扩充，将 Perl/Python 等解释器编译到服务器中。同时 Apache 音译为阿帕奇。

Apache 的诞生极富有戏剧性。当 NCSAWWW 服务器项目停顿后，那些使用 NCSAWWW 服务器的人们开始交换他们用于该服务器的补丁程序，他们也很快认识到成立管理这些补丁程序的论坛是必要的。就这样，诞生了 Apache Group，后来这个团体在 NCSA 的基础上创建了 Apache。

### 集成环境安装

​ 许多人通过他们自己的经验认识到安装 Apache 服务器是件不容易的事儿。如果您想添加 MySQL（数据库，存数据）、PHP（后端编程语言），那就更难了。

​ WAMP（window+Apache+MySQL+PHP）是一个功能强大的建站集成软件包。

​ XAMPP（Apache+MySQL+PHP+PERL）是一个功能强大的建站集成软件包。

​ XAMPP 是一个易于安装且包含 MySQL、PHP 和 Perl 的 Apache 发行版。XAMPP 的确非常容易安装和使用：只需下载，解压缩，启动即可。

​ 安装包在群共享 软件安装包这个文件下，安装过程中一直下一步即可，最好不要更改设置。

​ 启动 xampp 软件，在 win 开始菜单-所有程序中找到如图的选项

![img](/w5-d1%20%20PHP%20mySQL.html.resources/20180511164637.png)

点击打开 xampp control，弹出如下图，点击两个 start 按钮，启动 apche 和 mysql

![img](/w5-d1%20%20PHP%20mySQL.html.resources/20180511165210.png)

最后结果下图，绿色的说明启动服务器和数据库成功

![img](/w5-d1%20%20PHP%20mySQL.html.resources/20180511165454.png)

然后再浏览器中输入你的 ip 地址，或者输入 127.0.0.1，就可以访问我们的服务器了

wamp-》启动，变绿，c/wamp/www 目录，里面的的东西都删除，放入自己的文件，127.0.0.1 localhost

http 默认的端口 80

https 默认的端口 443

http://localhost/

### php 运行环境介绍

PHP（PHP: Hypertext Preprocessor，中文名：“超文本预处理器”）是一种通用开源脚本语言。语法吸收了 C 语言、Java 和 Perl 的特点，利于学习，使用广泛，主要适用于 Web 开发领域。PHP 独特的语法混合了 C、Java、Perl 以及 PHP 自创的语法。它可以比 CGI 或者 Perl 更快速地执行动态网页。

php 程序开发快，运行快，技术本身学习快。嵌入于 HTML：因为 PHP 可以被嵌入于 HTML 语言，它相对于其他语言。编辑简单，实用性强，更适合初学者。

PHP 是运行在服务器端的脚本，可以运行在 UNIX、LINUX、WINDOWS、Mac OS、Android 等平台

js 运行需要 js 引擎，php 运行也需要 php 引擎，服务器上只有安装了 php 运行环境（php 引擎），才能运行 php 代码！

### 服务器的根目录

​ 安装 xampp 的时候，默认把这个软件安装到了 C:\xampp 这个路径下，这个路径下面我们可以找到 apach，mysql，php 这三个软件的安装路径，一般不要动他们！

​ ![img](/w5-d1%20%20PHP%20mySQL.html.resources/1.png)

上面图片中的 htdocs 文件夹（htmldocuments），就是我们服务器的根目录，只要你在浏览器输入我们服务器的域名或者 ip 地址就能访问这个文件夹下的文档！

去看看里面都有什么文件，在浏览器中输入你自己的 ip 地址，访问这个服务器试一试。

你会发现出现的是英文网页，因为访问服务器的时候会优先让浏览器显示 index 开头的文件， 比如 index.html ,index.php 等等，所以说一般我们的首页都是 index.html。

vscode 插件 PHP Intelephense

现在我们可以先把 htdocs 这个文件夹里面的文件全部删掉，放入你写好的网页，在浏览器输入自己的 ip，看看能不能显示出来！

尝试创建要给 01.php 文件，写下面的代码

```
<?php

echo 'hello world' ;//必须加分号

echo '<h1>haha</h1>' ;

?>
```

在浏览器中输入自己的 ip 地址，看看效果！

如果看到了鼎鼎大名的 hello world，恭喜你已入坑 php（php 是世界上最好的语言，哈哈）

然后听你们帅（fang）气（pi）的翔哥给你们讲一个真实的故事。。。![img](</w5-d1%20%20PHP%20mySQL.html.resources/timg%20(1).gif>)

## PHP 基础语法

- 我们一定要知道，php 是另一个语言了，不再是我们的 `html` / `javascript` 了
- 一个别的语言就有人家语言的规则

## php 文件

- 我们在写 `javascript` 的时候，是一个 `.js` 文件
- 我们在写 `html` 的时候，是一个 `.html` 文件
- **php 的代码写在一个 `.php` 后缀的文件中**

### php 文件的书写

- 所有的 php 代码都要写在一个 php 的范围内

- 要求以 `<?php` 开头

- 要求以 `?>` 结尾

  ```php
  <?php

    # php 的代码写在这里

  ?>
  ```

### 简单了解 php 的语法

- 每个语言都会有自己的语法
- 接下来我们就简单了解一下 php 的语法规则
- `php` 里面有一个必须要注意的点 **每一个语句后面都要有 `;`**

#### 定义变量

- 在 php 中没有 `var` 关键字给我们定义变量

- 直接使用 `$` 来确定一个变量

  ```php
  <?php

    # 下面就是一个定义了一个变量，并且赋值为 100
    # 变量名就是 $num
    $num = 100;

    $boo = true;

    # 下面是一个字符串
    $str = "你好 php";


  ?>
  ```

```

```

输出语法（打印） + 把一些内容给到请求的宿主 + echo 你要输出的内容; + 只能输出所谓的基本数据类型 + print_r(你要输出的内容); + 可以输出复杂数据类型 + var_dump(你要输出的内容); + 会把每一个数据的详细信息一起输出

````



#### 条件语句

- 在 php 中使用条件语句和 js 基本一致

  ```php
  <?php

  $boo = true;

  if ($boo) {
    echo '你好，欢迎观临！';
  } else {
    echo '您还没有登陆';
  }

  ?>
````

#### 循环语句

- 在 php 中循环语句和 js 基本一致

  ```php
  <?php

  $num = 5;

  for ($i = 0; $i < $num; $i++) {
    echo 'hello php';
  }

  ?>
  ```

#### 字符串拼接

- 在 php 中，字符串拼接不再是使用 `+` 进行拼接了，而是使用 `.` 进行拼接

  ```php
  $str = 'hello ';
  $str2 = 'world';
  $str3 = $str . $str2;
  echo $str3;
  # 得到的就是 hello world
  ```

#### 数组

- 在 php 中的数组和 js 中特别不一样

  ```php
  <?php

    # 创建一个数组
    $arr = array(1, 2, 3);

    print_r($arr);
    # Array ( [0] => 1 [1] => 2 [2] => 3 )
    # 这个就类似于我们 js 中的数组，按照索引来的

    # 创建一个关联数组
    $arr2 = array('name' => 'Jack', 'age' => 18, 'gender' => '男')
    print_r($arr2)
    # Array ( [name] => Jack [age] => 18 [gender] => 男 )
    # 这个就类似于我们 js 中的 对象，键值对的形式

  ?>
  ```

## **第二节**

### 数据库（mysql）概念（数据库，表，主键）

数据库（Database）是按照数据结构来组织、存储和管理数据的仓库，

每个数据库都有一个或多个不同的 API 用于创建，访问，管理，搜索和复制所保存的数据。

我们也可以将数据存储在文件中，但是在文件中读写数据速度相对较慢。

所以，现在我们使用关系型数据库管理系统（RDBMS）来存储和管理的大数据量。所谓的关系型数据库，是建立在关系模型基础上的数据库，借助于集合代数等数学概念和方法来处理数据库中的数据。

MySQL 是一个关系型数据库管理系统，由瑞典 MySQL AB 公司开发，目前属于 Oracle 公司。MySQL 是一种关联数据库管理系统，关联数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。

​

- - 数据库: 数据库是一些关联表的集合
  - 数据表: 表是数据的矩阵。在一个数据库中的表看起来像一个简单的电子表格。（类似 Excel 表格）
  - 主键：主键是唯一的。一个数据表中只能包含一个主键。你可以使用主键来查询数据。（类似人的身份证信息）

### 数据类型

​ MySQL 支持多种类型，大致可以分为三类：数值、日期/时间和字符串(字符)类型。

#### **数值类型**

INT 或 INTEGER 大整数值

decimal 类型可以精确地表示非常大或非常精确的小数 ，用于定义货币要求精确度高的数据

#### **字符串类型**

VARCHAR 变长字符串

#### **日期和时间类型**

DATETIME 混合日期和时间值 格式 YYYY-MM-DD HH:MM:SS

### navcat 操作数据库

#### 0-安装 navcat 软件

软件在群共享中(navicat112_premium_cs_x64.exe)，有 32 位和 64 位的，一般现在的系统都是 64 位的，点 击 navicat112_premium_cs_x64.exe 安装，安装过程中全部下一步即可。安装完成后软件包里还有一个 PatchNavicat.exe，点击破解激活

​ ![img](/w5-d1%20%20PHP%20mySQL.html.resources/20180514213855.png)

#### 1-启动数据库

打开 xmpp-control pannel， 如图启动 mysql 数据库

​ ![img](/w5-d1%20%20PHP%20mySQL.html.resources/20180514213004.png)

#### 2-连接数据库

打开桌面上的 Navicat 图标

​ ![img](/w5-d1%20%20PHP%20mySQL.html.resources/20180514214009.png)

打开软件以后点击 连接，选择 mysql

​ ![img](/w5-d1%20%20PHP%20mySQL.html.resources/20180514214324.png)

弹出如下界面，连接名随便起一个,密码为空不用谢，点击确定就连接上了数据库

![img](/w5-d1%20%20PHP%20mySQL.html.resources/20180514214817.png)

#### 3-创建数据库

​ 双击列表中 test，就能打开数据库连接，点击左键，选中 新建数据库 ，如下图

![img](/w5-d1%20%20PHP%20mySQL.html.resources/20180514215527.png)

输入数据库名称 ，选择 uft-8 字符集

![img](/w5-d1%20%20PHP%20mySQL.html.resources/20180514221444.png)

#### 4-创建表

​ 选中 表，点击新建表 即可创建 数据表

![img](/w5-d1%20%20PHP%20mySQL.html.resources/20180514215816.png)

#### 5-在表中添加字段

​ 在表中添加如下字段，并将 id 设置为主键

id 是用户的的主要标识信息，注意将 id 设置为自动递增

usename 是用户名

time 是时间

money 是金钱

![img](/w5-d1%20%20PHP%20mySQL.html.resources/20180514220351.png)

![img](/w5-d1%20%20PHP%20mySQL.html.resources/20180514221044.png)

#### 6-保存表

![img](/w5-d1%20%20PHP%20mySQL.html.resources/20180514220659.png)

### navcat 数据填充

选中 student 表，出现如下界面，界面底部有增加，删除，保存按钮，点击增加按钮，出现一行数据（红色的），输入姓名，时间（点击三个点选择时间），金钱，点击下面对号保存数据。（注意 id 不用写，是自动增长的）

​

![img](/w5-d1%20%20PHP%20mySQL.html.resources/20180514222027.png)

### 把表中数据导出为 Excel 表格

![img](/w5-d1%20%20PHP%20mySQL.html.resources/20180514223050.png)

### mysql 增删改查数据

#### 查询

```
SELECT

student.id,

student.username,

student.time,

student.money

FROM

student

WHERE

student.id = 1 Limit 10
```

上面语句查询了 id 为 1 的学生信息,返回十条数据

也可以

```
SELECT  *  FROM  student  WHERE  student.id > 1 Limit 10
```

#### 插入

INSERT INTO student (username, time, money) VALUES ('赵云', '2018-05-15 23:53:52', '44');

#### 修改

UPDATE student SET username='韩信' WHERE (id='10')

#### 删除

DELETE FROM student WHERE (id='4')

---

### php 代码中使用 mysql

#### php 链接 mySql

连接到 MySQL 服务器:

```
$dbhost = 'localhost:3306';  // mysql服务器主机地址

$dbuser = 'root';            // mysql用户名

$dbpass = '';          // mysql用户名密码

$conn = mysqli_connect($dbhost, $dbuser, $dbpass);

if($conn )

{

  echo '数据库连接成功！';

}
```

#### 在 php 代码中执行 sql 语句 查询

$retval = mysqli_query( $conn, $sql )

conn 是数据库链接

sql 是一个字符串，里面写 sql 语句

retval 是一个结果集（对象）

```
<?php

//先链接数据库


// 设置编码，防止中文乱码

mysqli_query($conn , "set names utf8");

//编写sql语句

$sql = 'SELECT  *  FROM  student  WHERE  student.id > 1';

//选择要查询的数据库名称

mysqli_select_db( $conn, 'db1' );

//查询数据，返回查询的结果集

$retval = mysqli_query( $conn, $sql );

if(! $retval )

{

​    die('无法读取数据: ' . mysqli_error($conn));

}


?>
```

查询结果集处理

mysqli_fetch_array 从结果集中取得一行作为数字数组或关联数组，如果结果集中有多条结果，第一调用函数，获取第一条结果，第二次调用能获取第二条结果，所有我们可以用循环遍历结果集

用法 mysqli*fetch_array(\_result,resulttype*)

| 参数         | 描述                                                                                                  |
| :----------- | :---------------------------------------------------------------------------------------------------- |
| _result_     | 必需。规定由 mysqli_query()、mysqli_store_result() 或 mysqli_use_result() 返回的结果集标识符。        |
| _resulttype_ | 可选。规定应该产生哪种类型的数组。可以是以下值中的一个：MYSQLI_ASSOC 或者 MYSQLI_NUM 或者 MYSQLI_BOTH |

```
while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC))

{
	echo  $row['username'];

}
```

#### 插入

```
<?php

$dbhost = 'localhost:3306';  // mysql服务器主机地址

$dbuser = 'root';            // mysql用户名

$dbpass = '';          // mysql用户名密码

$conn = mysqli_connect($dbhost, $dbuser, $dbpass);

if(! $conn )

{

  die('连接失败: ' . mysqli_error($conn));

}

echo '连接成功<br />';

// 设置编码，防止中文乱码

mysqli_query($conn , "set names utf8");



$username = '鲁班七号';

$money = '250';

$time = '2018-03-06';

//注意这里在字符串内部也可以写变量

$sql = "INSERT INTO student ".

​        "(username,money, time) ".

​        "VALUES ".

​        "('$username','$money','$time')";



mysqli_select_db( $conn, 'db1' );

$retval = mysqli_query( $conn, $sql );

if(! $retval )

{

  die('无法插入数据: ' . mysqli_error($conn));

}

echo "数据插入成功\n";

mysqli_close($conn);

?>
```

#### 修改

```
<?php

$dbhost = 'localhost:3306';  // mysql服务器主机地址

$dbuser = 'root';            // mysql用户名

$dbpass = '';          // mysql用户名密码

$conn = mysqli_connect($dbhost, $dbuser, $dbpass);

if(! $conn )

{

  die('连接失败: ' . mysqli_error($conn));

}

echo '连接成功<br />';

// 设置编码，防止中文乱码

mysqli_query($conn , "set names utf8");



$sql = "UPDATE student SET username='韩信33' WHERE (id='10')";



mysqli_select_db( $conn, 'db1' );

$retval = mysqli_query( $conn, $sql );

if(! $retval )

{

  die('无法更改数据: ' . mysqli_error($conn));

}

echo "数据更新成功\n";

mysqli_close($conn);

?>
```

#### 删除

```
<?php

$dbhost = 'localhost:3306';  // mysql服务器主机地址

$dbuser = 'root';            // mysql用户名

$dbpass = '';          // mysql用户名密码

$conn = mysqli_connect($dbhost, $dbuser, $dbpass);

if(! $conn )

{

  die('连接失败: ' . mysqli_error($conn));

}

echo '连接成功<br />';

// 设置编码，防止中文乱码

mysqli_query($conn , "set names utf8");





$sql = "DELETE FROM student WHERE (id='6')";



mysqli_select_db( $conn, 'db1' );

$retval = mysqli_query( $conn, $sql );

if(! $retval )

{

​    die('无法删除数据: ' . mysqli_error($conn));

}

echo '数据删除成功！';

mysqli_close($conn);

?>
```
