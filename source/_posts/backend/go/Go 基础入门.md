---
title: Go 基础入门
date: 2026-09-18 13:16:52
updated: 2026-09-18 13:16:52
tags:
  - Go
  - Golang
categories:
  - Go
comments: false
cover: /img/covers/tech-go.png
top_img: /img/covers/tech-go.png
abbrlink: golang-basics
description: 从环境安装到语法、结构体、接口、错误处理、并发、测试与工程工具的 Go 入门指南。
toc: true
---

Go 是一门静态类型、编译型语言。它的语法不复杂，标准工具链完整，并发能力是语言的一部分，尤其适合编写 Web 服务、命令行工具、云原生基础设施和网络程序。

这篇文章从零开始介绍 Go 的核心知识。读完后，你应该能够创建 Go 项目、读懂常见代码，并独立写出一个带测试的小型程序。

<!-- more -->

## 安装与环境检查

从 [Go 官网](https://go.dev/dl/) 安装当前稳定版本，然后检查环境：

```bash
go version
go env GOROOT GOPATH GOPROXY
```

- `GOROOT`：Go SDK 的安装目录，通常不需要手动修改。
- `GOPATH`：下载依赖、安装命令等内容的工作目录。
- `GOPROXY`：模块代理地址。

现代 Go 项目使用 Go Modules 管理依赖，不需要把项目放进 `GOPATH`。

### 创建第一个项目

```bash
mkdir hello-go
cd hello-go
go mod init example.com/hello-go
```

创建 `main.go`：

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, Go!")
}
```

运行与构建：

```bash
go run .
go build .
```

`go run` 适合开发阶段快速运行；`go build` 会生成可执行文件。

## 程序的基本结构

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("当前时间：", time.Now().Format(time.DateTime))
}
```

几个必须先记住的规则：

- 每个 `.go` 文件都要声明所属的 `package`。
- 可执行程序必须包含 `package main` 和 `func main()`。
- `import` 引入的包必须被使用，否则无法通过编译。
- 同一个目录中的 Go 文件通常属于同一个包。
- 名字以大写字母开头时，可以被其他包访问；小写开头时只在当前包可见。

Go 使用 `gofmt` 统一格式，不需要争论缩进风格：

```bash
gofmt -w .
```

## 变量、常量与基础类型

### 变量声明

```go
package main

import "fmt"

func main() {
	var name string = "Ada"
	var age = 18
	city := "Hangzhou"

	var score int // 零值为 0
	var active bool // 零值为 false
	var note string // 零值为 ""

	fmt.Println(name, age, city, score, active, note)
}
```

`:=` 是短变量声明，只能在函数内部使用。至少要有一个新变量：

```go
x, y := 10, 20
x, z := 30, 40 // x 是赋值，z 是新变量
```

交换变量不需要临时值：

```go
x, y = y, x
```

### 常量与 iota

```go
const Pi = 3.1415926
const AppName = "demo"

const (
	StatusPending = iota
	StatusRunning
	StatusDone
)
```

`iota` 在一个常量组中从 `0` 开始递增，常用来声明枚举值。若枚举需要跨系统或长期存储，建议显式指定数值，避免调整顺序后含义发生变化。

### 常用基础类型

```go
var enabled bool = true
var count int = 42
var total int64 = 1_000_000
var ratio float64 = 0.75
var letter byte = 'A' // uint8 的别名
var char rune = '中'  // int32 的别名，表示 Unicode 码点
var message string = "你好，Go"
```

Go 不会自动进行不同数字类型之间的转换：

```go
var a int = 10
var b int64 = 20
sum := int64(a) + b
```

### 字符串、byte 与 rune

Go 字符串是只读字节序列，`len` 返回字节数，不是字符数：

```go
text := "Go语言"

fmt.Println(len(text))         // UTF-8 字节数
fmt.Println([]rune(text))      // Unicode 码点
fmt.Println(len([]rune(text))) // 字符数量
```

遍历字符串时，`range` 会按 rune 解码：

```go
for index, char := range "Go语言" {
	fmt.Printf("字节位置=%d 字符=%c\n", index, char)
}
```

频繁拼接字符串时使用 `strings.Builder`：

```go
var builder strings.Builder
builder.WriteString("Hello")
builder.WriteString(", Go")
result := builder.String()
```

## 条件、循环与 switch

### if

```go
if age := 20; age >= 18 {
	fmt.Println("成年人")
} else {
	fmt.Println("未成年人")
}
```

条件不需要括号，但代码块的大括号不能省略。`age` 的作用域仅限于这个 `if` 结构。

### for

Go 只有 `for` 一种循环语句：

```go
for i := 0; i < 3; i++ {
	fmt.Println(i)
}

count := 0
for count < 3 {
	count++
}

for {
	break
}
```

使用 `range` 遍历集合：

```go
names := []string{"Ada", "Bob", "Carol"}

for index, name := range names {
	fmt.Println(index, name)
}

for _, name := range names {
	fmt.Println(name)
}
```

不需要的返回值使用空标识符 `_` 忽略。

### switch

```go
switch day := time.Now().Weekday(); day {
case time.Saturday, time.Sunday:
	fmt.Println("周末")
default:
	fmt.Println("工作日")
}
```

Go 的 `case` 默认不会继续执行下一分支，因此通常不需要 `break`。

不带表达式的 `switch` 可以替代较长的 `if else`：

```go
switch {
case score >= 90:
	fmt.Println("优秀")
case score >= 60:
	fmt.Println("及格")
default:
	fmt.Println("需要继续努力")
}
```

## 数组、切片与 map

### 数组

数组长度是类型的一部分，实际项目中更多使用切片：

```go
var first [3]int
second := [3]int{10, 20, 30}
third := [...]int{1, 2, 3, 4}
```

`[3]int` 与 `[4]int` 是不同类型。

### 切片

切片可以理解为对底层数组某一段区域的描述：

```go
numbers := []int{10, 20, 30}
numbers = append(numbers, 40)

part := numbers[1:3] // [20 30]

fmt.Println(len(numbers)) // 长度
fmt.Println(cap(numbers)) // 容量
fmt.Println(part)
```

使用 `make` 预分配容量：

```go
items := make([]string, 0, 100)
items = append(items, "first")
```

删除指定位置的元素：

```go
index := 1
numbers = append(numbers[:index], numbers[index+1:]...)
```

复制切片：

```go
source := []int{1, 2, 3}
target := make([]int, len(source))
copy(target, source)
```

直接赋值不会复制底层数据：

```go
source := []int{1, 2, 3}
alias := source
alias[0] = 100

fmt.Println(source) // [100 2 3]
```

### map

```go
scores := map[string]int{
	"Ada": 95,
	"Bob": 88,
}

scores["Carol"] = 91

score, exists := scores["Ada"]
if exists {
	fmt.Println(score)
}

delete(scores, "Bob")
```

读取 `nil map` 是安全的，但写入会 panic。需要写入时使用字面量或 `make` 初始化：

```go
users := make(map[string]string)
users["1"] = "Ada"
```

map 的遍历顺序不固定；需要稳定顺序时，先取出 key 并排序。

## 函数

### 参数与返回值

```go
func add(a, b int) int {
	return a + b
}

func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("除数不能为 0")
	}
	return a / b, nil
}
```

Go 函数可以返回多个值，最常见的形式是“结果 + 错误”。

可变参数：

```go
func sum(values ...int) int {
	total := 0
	for _, value := range values {
		total += value
	}
	return total
}

fmt.Println(sum(1, 2, 3))
```

### 函数也是值

```go
func calculate(a, b int, operation func(int, int) int) int {
	return operation(a, b)
}

result := calculate(3, 4, func(a, b int) int {
	return a * b
})
```

闭包可以访问外层变量：

```go
func counter() func() int {
	value := 0
	return func() int {
		value++
		return value
	}
}
```

### defer

`defer` 会把调用推迟到当前函数返回前执行，常用于释放资源：

```go
file, err := os.Open("config.json")
if err != nil {
	return err
}
defer file.Close()
```

多个 `defer` 按后进先出的顺序执行。尽量在确认资源创建成功后立即声明释放逻辑。

## 指针

指针保存变量的内存地址：

```go
func increment(value *int) {
	(*value)++
}

count := 1
increment(&count)
fmt.Println(count) // 2
```

Go 没有指针运算。使用指针通常是为了修改原值，或者避免复制较大的结构体。

切片、map、channel、函数和接口本身已经包含引用语义，通常不需要再传它们的指针。

## 结构体与方法

### 定义结构体

```go
type User struct {
	ID    int
	Name  string
	Email string
}

user := User{
	ID:    1,
	Name:  "Ada",
	Email: "ada@example.com",
}

fmt.Println(user.Name)
```

使用命名字段初始化更容易维护，不依赖字段声明顺序。

### 方法

```go
type Rectangle struct {
	Width  float64
	Height float64
}

func (r Rectangle) Area() float64 {
	return r.Width * r.Height
}

func (r *Rectangle) Scale(factor float64) {
	r.Width *= factor
	r.Height *= factor
}
```

- 值接收者得到结构体副本，适合只读且较小的类型。
- 指针接收者可以修改原值，也能避免复制。
- 同一个类型的方法通常统一选择值接收者或指针接收者。

### 组合

Go 没有传统的类继承，通常通过结构体嵌入实现组合：

```go
type Address struct {
	City string
}

type Employee struct {
	Name string
	Address
}

employee := Employee{
	Name:    "Ada",
	Address: Address{City: "Hangzhou"},
}

fmt.Println(employee.City)
```

## 接口

接口描述行为，不要求显式声明“实现了某接口”：

```go
type Speaker interface {
	Speak() string
}

type Person struct {
	Name string
}

func (p Person) Speak() string {
	return "你好，我是 " + p.Name
}

func introduce(s Speaker) {
	fmt.Println(s.Speak())
}
```

只要类型拥有接口要求的全部方法，它就自动满足该接口。

接口应尽量小，并由使用方定义。标准库中常见的单方法接口包括 `io.Reader`、`io.Writer` 和 `fmt.Stringer`。

### 类型断言与类型 switch

```go
func describe(value any) {
	switch current := value.(type) {
	case string:
		fmt.Println("字符串：", current)
	case int:
		fmt.Println("整数：", current)
	default:
		fmt.Printf("未知类型：%T\n", current)
	}
}
```

`any` 是 `interface{}` 的别名，表示任意类型。不要为了“灵活”而到处使用 `any`，明确的类型更安全。

## 错误处理

Go 把错误当作普通值处理：

```go
content, err := os.ReadFile("config.json")
if err != nil {
	return fmt.Errorf("读取配置文件: %w", err)
}

fmt.Println(string(content))
```

使用 `%w` 包装错误，可以保留原始错误链：

```go
if errors.Is(err, os.ErrNotExist) {
	fmt.Println("文件不存在")
}
```

检查自定义错误类型：

```go
var pathError *os.PathError
if errors.As(err, &pathError) {
	fmt.Println("失败路径：", pathError.Path)
}
```

错误信息通常使用小写开头且不加句号，方便上层继续包装。

### panic 与 recover

`panic` 表示程序进入了无法正常继续的状态，不应代替普通错误返回。配置缺失、网络失败、用户输入错误等可预期问题都应该返回 `error`。

`recover` 只在延迟函数中生效，通常用于服务器边界防止单个请求导致整个进程退出。

## 泛型基础

泛型适合表达“同一套算法适用于一组类型”：

```go
type Number interface {
	~int | ~int64 | ~float64
}

func Sum[T Number](values []T) T {
	var total T
	for _, value := range values {
		total += value
	}
	return total
}

fmt.Println(Sum([]int{1, 2, 3}))
fmt.Println(Sum([]float64{1.5, 2.5}))
```

`~int` 表示底层类型为 `int` 的类型也可以满足约束。

如果普通函数或接口已经足够清晰，不必强行使用泛型。

## 包与模块

一个简单项目可以这样组织：

```text
hello-go/
├── go.mod
├── main.go
└── calculator/
    ├── calculator.go
    └── calculator_test.go
```

`calculator/calculator.go`：

```go
package calculator

func Add(a, b int) int {
	return a + b
}
```

在 `main.go` 中使用：

```go
package main

import (
	"fmt"

	"example.com/hello-go/calculator"
)

func main() {
	fmt.Println(calculator.Add(2, 3))
}
```

依赖管理常用命令：

```bash
go get github.com/google/uuid
go mod tidy
go list -m all
```

- `go get` 添加或升级依赖。
- `go mod tidy` 补充缺失依赖，并清理未使用依赖。
- `go.mod` 和 `go.sum` 都应该提交到版本控制。

## JSON

结构体字段通过标签控制 JSON 名称：

```go
type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email,omitempty"`
}

user := User{ID: 1, Name: "Ada"}

data, err := json.Marshal(user)
if err != nil {
	log.Fatal(err)
}
fmt.Println(string(data))
```

反序列化：

```go
var decoded User
if err := json.Unmarshal(data, &decoded); err != nil {
	log.Fatal(err)
}
```

只有导出的字段，也就是大写字母开头的字段，才能被 `encoding/json` 处理。

## Goroutine 与 Channel

### 启动 Goroutine

在函数调用前加 `go`，函数就会并发执行：

```go
func printMessage(message string) {
	fmt.Println(message)
}

go printMessage("后台任务")
```

主函数退出时，其他 goroutine 会直接结束。不要使用固定时长的 `time.Sleep` 等待任务，应使用 `WaitGroup`、channel 或更高层的并发工具同步。

```go
var wg sync.WaitGroup

for i := 1; i <= 3; i++ {
	wg.Add(1)
	go func(id int) {
		defer wg.Done()
		fmt.Println("任务", id)
	}(i)
}

wg.Wait()
```

### Channel

Channel 用于在 goroutine 之间传递数据：

```go
results := make(chan int)

go func() {
	results <- 21 * 2
}()

result := <-results
fmt.Println(result)
```

带缓冲的 channel：

```go
queue := make(chan string, 2)
queue <- "first"
queue <- "second"

close(queue)

for item := range queue {
	fmt.Println(item)
}
```

通常由发送方关闭 channel。关闭表示不会再发送新值，不是清理资源的必选步骤。

### select

`select` 同时等待多个 channel 操作：

```go
select {
case result := <-results:
	fmt.Println(result)
case <-time.After(2 * time.Second):
	fmt.Println("执行超时")
}
```

### Context

网络请求和后台任务通常通过 `context.Context` 传递取消信号与截止时间：

```go
ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
defer cancel()

request, err := http.NewRequestWithContext(
	ctx,
	http.MethodGet,
	"https://example.com",
	nil,
)
if err != nil {
	return err
}

response, err := http.DefaultClient.Do(request)
```

`context.Context` 通常作为函数的第一个参数传入，不要把它保存在结构体里。

## 一个最小 HTTP 服务

标准库已经包含可用的 HTTP 服务器：

```go
package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Response struct {
	Message string `json:"message"`
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	json.NewEncoder(w).Encode(Response{Message: "ok"})
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/health", healthHandler)

	server := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}

	log.Println("服务已启动：http://localhost:8080")
	log.Fatal(server.ListenAndServe())
}
```

运行并访问：

```bash
go run .
curl http://localhost:8080/health
```

生产服务还应设置读取、写入和空闲超时，并实现优雅退出。

## 测试

测试文件以 `_test.go` 结尾，测试函数以 `Test` 开头：

```go
package calculator

import "testing"

func TestAdd(t *testing.T) {
	tests := []struct {
		name string
		a    int
		b    int
		want int
	}{
		{name: "positive", a: 2, b: 3, want: 5},
		{name: "negative", a: -2, b: -3, want: -5},
		{name: "zero", a: 0, b: 0, want: 0},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			got := Add(test.a, test.b)
			if got != test.want {
				t.Fatalf("Add(%d, %d) = %d, want %d", test.a, test.b, got, test.want)
			}
		})
	}
}
```

常用测试命令：

```bash
go test ./...
go test -cover ./...
go test -race ./...
go test -run TestAdd ./calculator
```

`-race` 可以检测运行时发生的数据竞争。涉及并发的代码应定期执行该检查。

基准测试函数以 `Benchmark` 开头：

```go
func BenchmarkAdd(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Add(10, 20)
	}
}
```

```bash
go test -bench=. -benchmem ./...
```

## 常用工具链

```bash
go fmt ./...        # 格式化代码
go vet ./...        # 检查常见可疑代码
go test ./...       # 运行全部测试
go test -race ./... # 检查数据竞争
go mod tidy         # 整理模块依赖
go build ./...      # 编译全部包
go doc fmt.Println  # 查看文档
```

编辑器推荐安装官方 `gopls` 语言服务器。保存时自动执行格式化和 import 整理，可以减少很多机械工作。

## 常见误区

### 忽略错误

```go
data, _ := os.ReadFile("config.json")
```

除非你能明确说明错误不影响结果，否则不要随意用 `_` 丢弃错误。

### 把 nil 切片当作异常值

```go
var items []string
items = append(items, "Go") // 合法
```

`nil` 切片可以读取、遍历和 `append`，很多函数直接返回 `nil` 切片即可。需要输出 JSON 数组时，再根据接口约定决定返回 `nil` 还是空切片。

### 无限制创建 Goroutine

每个请求都无限启动 goroutine，可能耗尽内存、连接或文件描述符。处理大量任务时应使用并发上限、worker pool 或信号量。

### 复制包含锁的结构体

`sync.Mutex` 使用后不能复制。包含锁的结构体通常使用指针传递，并把方法定义为指针接收者。

### 过度抽象

Go 倾向于清晰直接的代码。先写具体实现，当确实出现多个实现或测试替身时，再提取小接口。

## 推荐的学习顺序

1. 熟悉变量、流程控制、函数、切片和 map。
2. 掌握结构体、方法、接口与错误处理。
3. 学会使用包、Go Modules、格式化和测试工具。
4. 再学习 goroutine、channel、context 和并发安全。
5. 用标准库完成一个 CLI 或 HTTP API 项目。

入门阶段最重要的不是记住所有语法，而是养成三个习惯：始终处理错误、为核心逻辑编写测试、让工具链自动格式化和检查代码。
