---
title: Python 精讲
date: 2026-10-01 00:00:00
updated: 2026-10-01 00:00:00
tags:
  - Python
categories:
  - Python
comments: false
cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&h=675&q=85"
abbrlink: python
description: Python 基础语法、核心机制与工程实践精讲。
toc: true
---

<!-- more -->

## 环境与运行

```bash
python --version
python -c "import sys; print(sys.executable)"

python                    # REPL
python hello.py           # 运行脚本
python -m package.cli     # 运行模块
python -c "print(2 ** 10)"
```

每个项目使用独立环境：

```bash
python -m venv .venv

# macOS / Linux
source .venv/bin/activate

# Windows PowerShell
.venv\Scripts\Activate.ps1

python -m pip install requests
python -m pip list
deactivate
```

使用 uv：

```bash
uv init demo
cd demo
uv python pin 3.14
uv add httpx
uv add --dev pytest ruff mypy
uv run python main.py
```

`.venv/` 不提交，`pyproject.toml` 和锁文件提交。编辑器、终端、测试必须使用同一个解释器。

## 变量与基础类型

### print、input 与变量

```python
print("Hello, Python!")
print("姓名", "Ada", sep=": ")
print("加载", end="...")
print("完成")

name = "Ada"
age = 18
height = 1.68

print(f"{name}，{age} 岁，身高 {height:.2f} 米")
```

`input()` 始终返回字符串：

```python
raw = input("请输入年龄：")

try:
    age = int(raw)
except ValueError:
    print(f"{raw!r} 不是整数")
else:
    print(f"明年 {age + 1} 岁")
```

多个变量与交换：

```python
x, y, z = 1, 2, 3
left = right = 0

a = "apple"
b = "banana"
a, b = b, a
```

变量是名字，赋值是名字绑定对象：

```python
first = [1, 2]
second = first
second.append(3)

print(first)           # [1, 2, 3]
print(first is second) # True
```

命名约定：

```python
student_name = "Ada"   # 变量、函数
MAX_RETRY_COUNT = 3    # 常量约定


class StudentProfile:  # 类
    pass
```

变量名区分大小写，不能以数字开头，也不能使用关键字：

```python
import keyword

print(keyword.iskeyword("class"))  # True
print(keyword.kwlist)
```

### 数字

```python
integer = 1_000_000
floating = 3.14
binary = 0b1010
hexadecimal = 0xFF
complex_number = 3 + 4j

print(7 + 2)   # 9
print(7 - 2)   # 5
print(7 * 2)   # 14
print(7 / 2)   # 3.5
print(7 // 2)  # 3
print(7 % 2)   # 1
print(2**10)   # 1024
```

`//` 向负无穷方向取整：

```python
print(7 // 2)        # 3
print(-7 // 2)       # -4
print(divmod(17, 5)) # (3, 2)
```

浮点数不能精确表示所有十进制小数：

```python
import math
from decimal import Decimal

print(0.1 + 0.2)                       # 0.30000000000000004
print(math.isclose(0.1 + 0.2, 0.3))    # True
print(Decimal("0.1") + Decimal("0.2"))  # 0.3
```

常用数字函数：

```python
print(abs(-42))
print(round(3.14159, 2))
print(min(3, 7, 1))
print(max(3, 7, 1))
print(sum([1, 2, 3]))
```

### bool 与 None

```python
is_student = True
is_graduated = False

print(3 > 2)
print(5 == 5)
print(5 != 3)
print(True + True)  # 2
```

以下值为假：`False`、`None`、数字零和空容器。

```python
values = [0, 0.0, "", [], {}, set(), None]
print([bool(value) for value in values])

result = None
if result is None:
    print("没有结果")
```

`bool("false")` 是 `True`。文本布尔值要显式解析：

```python
def parse_bool(text: str) -> bool:
    value = text.strip().lower()
    if value in {"1", "true", "yes", "on"}:
        return True
    if value in {"0", "false", "no", "off"}:
        return False
    raise ValueError(f"无法解析：{text!r}")
```

### 字符串

字符串不可变，索引从 `0` 开始，切片左闭右开：

```python
word = "Python"

print(word[0])      # P
print(word[-1])     # n
print(word[1:4])    # yth
print(word[:3])     # Pyt
print(word[3:])     # hon
print(word[::2])    # Pto
print(word[::-1])   # nohtyP
```

常用方法：

```python
text = "  hello, Python  "

clean = text.strip()
print(clean.upper())
print(clean.lower())
print(clean.title())
print(clean.replace("Python", "World"))
print(clean.startswith("hello"))
print(clean.endswith("Python"))
print(clean.find("Python"))  # 找不到返回 -1
print(clean.count("o"))

parts = clean.split(", ")
print(parts)
print(" / ".join(parts))
```

引号、转义与原始字符串：

```python
single = '他说："你好"'
double = "It's Python"
multiline = """第一行
第二行"""
windows_path = r"C:\Users\Ada\Desktop"

print("姓名\t年龄\nAda\t18")
```

f-string：

```python
name = "Ada"
score = 95.678

print(f"{name} 的成绩是 {score:.2f}")
print(f"{score=}")
print(f"{255:#x}")
print(f"{1_000_000:,}")
```

文本与字节：

```python
text = "你好"
payload = text.encode("utf-8")
restored = payload.decode("utf-8")

assert restored == text
```

### 类型检查与转换

```python
value = 42

print(type(value))
print(isinstance(value, int))
print(isinstance(value, (int, float)))

print(int("42"))
print(float("3.14"))
print(str(2026))
print(list("abc"))
print(tuple([1, 2]))
print(set([1, 1, 2]))
```

`int(3.9)` 是截断，不是四舍五入；`int("3.14")` 会抛 `ValueError`。

## 运算符

| 类型 | 运算符 |
| --- | --- |
| 算术 | `+ - * / // % **` |
| 比较 | `== != < <= > >=` |
| 逻辑 | `and or not` |
| 成员 | `in`、`not in` |
| 身份 | `is`、`is not` |
| 位运算 | `& \| ^ ~ << >>` |
| 复合赋值 | `+= -= *= /= //= %= **=` |

```python
age = 25
has_id = True

print(18 <= age < 60)
print(age >= 18 and has_id)
print(age < 18 or age >= 60)
print(not has_id)
```

`and`、`or` 会短路，并返回决定结果的操作数：

```python
username = ""
display_name = username or "未登录"

print(1 and 2)  # 2
print(0 and 2)  # 0
print(1 or 2)   # 1
print(0 or 2)   # 2
```

`==` 比较值，`is` 比较对象身份：

```python
a = [1, 2]
b = [1, 2]
c = a

print(a == b)  # True
print(a is b)  # False
print(a is c)  # True
```

成员与位运算：

```python
print("Py" in "Python")
print(3 in [1, 2, 3])

a = 0b1010
b = 0b1100
print(a & b)   # 8
print(a | b)   # 14
print(a ^ b)   # 6
print(a << 1)  # 20
print(a >> 1)  # 5
```

## 数据容器

### 列表

列表有序、可变、允许重复值：

```python
values = [10, 20, 30, 20]

print(values[0])
print(values[-1])
print(values[1:3])

values[0] = 99
print(len(values))
print(20 in values)
print(values.count(20))
print(values.index(30))
```

增删改查：

```python
fruits = ["apple", "banana"]

fruits.append("orange")
fruits.insert(1, "pear")
fruits.extend(["mango", "grape"])

fruits.remove("banana")
last = fruits.pop()
first = fruits.pop(0)
del fruits[0:1]

print(last, first, fruits)
```

排序与反转：

```python
numbers = [3, 1, 4, 1, 5]

ordered = sorted(numbers)
descending = sorted(numbers, reverse=True)
numbers.sort()
numbers.reverse()

students = [
    {"name": "Ada", "score": 91},
    {"name": "Grace", "score": 96},
    {"name": "Guido", "score": 89},
]
ranking = sorted(students, key=lambda item: (-item["score"], item["name"]))
```

遍历：

```python
fruits = ["apple", "banana", "orange"]

for fruit in fruits:
    print(fruit)

for index, fruit in enumerate(fruits, start=1):
    print(index, fruit)
```

### 元组

元组有序、不可变：

```python
point = (10, 20)
single = (42,)
empty = ()

x, y = point
first, *middle, last = [1, 2, 3, 4, 5]

print(x, y)
print(first, middle, last)
```

函数的“多返回值”是元组：

```python
def get_min_max(values: list[int]) -> tuple[int, int]:
    return min(values), max(values)


lower, upper = get_min_max([3, 1, 9])
```

命名元组：

```python
from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
point = Point(10, 20)

print(point.x, point.y)
```

### 字典

字典保存键值对，键唯一且必须可哈希：

```python
user = {
    "name": "Ada",
    "age": 36,
    "skills": ["math", "python"],
}

print(user["name"])
print(user.get("city", "未知"))

user["age"] = 37
user["active"] = True
user.update(city="London", role="admin")
user.setdefault("theme", "light")
```

删除与遍历：

```python
user = {"name": "Ada", "age": 36, "active": True}

active = user.pop("active", None)
last_pair = user.popitem()

for key in user:
    print(key)

for value in user.values():
    print(value)

for key, value in user.items():
    print(key, value)
```

合并：

```python
defaults = {"theme": "light", "page_size": 20}
custom = {"theme": "dark"}

merged_1 = {**defaults, **custom}
merged_2 = defaults | custom

defaults.update(custom)
```

嵌套：

```python
students = [
    {"name": "Ada", "scores": {"math": 95, "python": 98}},
    {"name": "Grace", "scores": {"math": 99, "python": 96}},
]

for student in students:
    scores = student["scores"]
    average = sum(scores.values()) / len(scores)
    print(student["name"], average)
```

### 集合

集合无重复元素，适合成员判断和集合运算：

```python
python_users = {"Ada", "Grace", "Guido"}
java_users = {"Grace", "James"}

print(python_users & java_users)  # 交集
print(python_users | java_users)  # 并集
print(python_users - java_users)  # 差集
print(python_users ^ java_users)  # 对称差集
```

```python
skills = set()
skills.add("Python")
skills.update(["Git", "SQL"])
skills.discard("Java")

print("Python" in skills)
```

去重：

```python
values = [3, 1, 3, 2, 1]

unordered = list(set(values))
ordered = list(dict.fromkeys(values))

assert ordered == [3, 1, 2]
```

`frozenset` 是不可变集合，可作为字典键：

```python
permissions = frozenset({"read", "write"})
mapping = {permissions: "editor"}
```

### 推导式

```python
squares = [number**2 for number in range(10)]
even_squares = [number**2 for number in range(10) if number % 2 == 0]
labels = ["even" if number % 2 == 0 else "odd" for number in range(5)]

score_map = {name: len(name) for name in ["Ada", "Grace"]}
letters = {char.lower() for char in "Hello"}
total = sum(number**2 for number in range(1_000_000))
```

嵌套推导式：

```python
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [value for row in matrix for value in row]
```

超过两层或含复杂副作用时改用普通循环。

### 可变对象、浅拷贝与深拷贝

```python
import copy

original = [[1, 2], [3, 4]]
alias = original
shallow = original.copy()
deep = copy.deepcopy(original)

original[0].append(99)

print(alias)
print(shallow)
print(deep)
```

二维列表：

```python
bad_matrix = [[0] * 3] * 3
good_matrix = [[0] * 3 for _ in range(3)]

bad_matrix[0][0] = 1
print(bad_matrix)
```

可变默认参数：

```python
def bad_add(item: str, items: list[str] = []) -> list[str]:
    items.append(item)
    return items


def add_item(item: str, items: list[str] | None = None) -> list[str]:
    if items is None:
        items = []
    items.append(item)
    return items
```

## 流程控制

### if / elif / else

```python
score = 86

if score >= 90:
    level = "A"
elif score >= 80:
    level = "B"
elif score >= 60:
    level = "C"
else:
    level = "D"

status = "通过" if score >= 60 else "未通过"
```

真值判断直接写变量：

```python
items: list[str] = []

if not items:
    print("列表为空")
```

### for、range、enumerate 与 zip

```python
for number in range(5):
    print(number)

for number in range(2, 10, 2):
    print(number)

for number in range(5, 0, -1):
    print(number)
```

```python
names = ["Ada", "Grace", "Guido"]
scores = [91, 96, 89]

for index, name in enumerate(names, start=1):
    print(index, name)

for name, score in zip(names, scores, strict=True):
    print(name, score)
```

九九乘法表：

```python
for row in range(1, 10):
    for column in range(1, row + 1):
        print(f"{column}×{row}={column * row}", end="\t")
    print()
```

### while、break 与 continue

```python
count = 3

while count > 0:
    print(count)
    count -= 1
```

输入校验：

```python
while True:
    raw = input("输入 1~100：").strip()
    try:
        number = int(raw)
    except ValueError:
        print("请输入整数")
        continue

    if 1 <= number <= 100:
        break

    print("超出范围")
```

`break` 结束循环，`continue` 跳过本轮，`else` 在未执行 `break` 时运行：

```python
target = 7

for value in [2, 4, 6, 8]:
    if value == target:
        print("找到")
        break
else:
    print("未找到")
```

判断质数：

```python
from math import isqrt


def is_prime(number: int) -> bool:
    if number < 2:
        return False

    for divisor in range(2, isqrt(number) + 1):
        if number % divisor == 0:
            return False
    return True
```

### match / case

```python
def http_status(code: int) -> str:
    match code:
        case 200:
            return "OK"
        case 400 | 404:
            return "Client Error"
        case value if 500 <= value < 600:
            return "Server Error"
        case _:
            return "Unknown"
```

结构化匹配：

```python
def handle_event(event: dict[str, object]) -> str:
    match event:
        case {"type": "click", "x": int(x), "y": int(y)}:
            return f"click({x}, {y})"
        case {"type": "key", "key": "Enter" | "Return"}:
            return "confirm"
        case _:
            return "unknown"
```

## 函数

### 定义、调用与返回值

```python
def greet(name: str) -> str:
    """返回问候语。"""
    return f"Hello, {name}"


def divide(a: float, b: float) -> tuple[float, float]:
    return a / b, a % b


message = greet("Ada")
quotient, remainder = divide(10, 3)
```

没有 `return` 时返回 `None`；`return` 还可提前结束函数：

```python
def check_age(age: int) -> str:
    if age < 0:
        return "无效年龄"
    if age < 18:
        return "未成年"
    return "成年"
```

### 位置参数、关键字参数与默认值

```python
def introduce(
    name: str,
    age: int,
    city: str = "未知",
    *,
    active: bool = True,
) -> str:
    return f"{name}, {age}, {city}, active={active}"


print(introduce("Ada", 36))
print(introduce(name="Grace", age=28, city="New York", active=False))
```

完整参数语法：

```python
def request(
    url: str,
    /,
    method: str = "GET",
    *headers: str,
    timeout: float = 5.0,
    **options: object,
) -> None:
    print(url, method, headers, timeout, options)
```

- `/` 前：仅位置参数；
- `*args`：额外位置参数，类型为元组；
- `*` 后：仅关键字参数；
- `**kwargs`：额外关键字参数，类型为字典。

### args 与 kwargs

```python
def add(*numbers: float) -> float:
    return sum(numbers)


def print_info(**info: object) -> None:
    for key, value in info.items():
        print(f"{key}={value}")


def call(func, *args, **kwargs):
    return func(*args, **kwargs)


print(add(1, 2, 3))
print_info(name="Ada", age=36)
```

解包调用：

```python
numbers = [3, 4]
options = {"sep": " -> ", "end": "\n"}

print(*numbers, **options)
```

### 默认值只计算一次

```python
from datetime import datetime


def create_record(created_at: datetime | None = None) -> dict[str, datetime]:
    if created_at is None:
        created_at = datetime.now()
    return {"created_at": created_at}
```

默认值不要直接使用列表、字典、集合或 `datetime.now()`。

### 作用域、global、nonlocal 与闭包

名字查找顺序：Local → Enclosing → Global → Built-in。

```python
language = "Python"


def show_language() -> str:
    return language
```

`global` 修改模块级变量：

```python
score = 0


def add_score(points: int) -> None:
    global score
    score += points
```

`nonlocal` 修改最近的外层函数变量：

```python
def make_counter(start: int = 0):
    count = start

    def increment(step: int = 1) -> int:
        nonlocal count
        count += step
        return count

    return increment


counter = make_counter(10)
print(counter())
print(counter(2))
```

### lambda 与高阶函数

```python
square = lambda number: number**2
larger = lambda a, b: a if a > b else b

print(square(5))
print(larger(3, 7))
```

`map`、`filter`、`reduce`：

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

doubled = list(map(lambda number: number * 2, numbers))
evens = list(filter(lambda number: number % 2 == 0, numbers))
product = reduce(lambda left, right: left * right, numbers, 1)

print(doubled, evens, product)
```

多数转换和过滤用推导式更清楚：

```python
numbers = [1, 2, 3, 4, 5]
doubled_evens = [number * 2 for number in numbers if number % 2 == 0]
```

排序键：

```python
from operator import itemgetter

users = [
    {"name": "Ada", "age": 36},
    {"name": "Grace", "age": 28},
]

print(sorted(users, key=itemgetter("age")))
```

### 递归

递归需要基准条件：

```python
def factorial(number: int) -> int:
    if number < 0:
        raise ValueError("number 不能为负数")
    if number <= 1:
        return 1
    return number * factorial(number - 1)
```

缓存重复计算：

```python
from functools import cache


@cache
def fibonacci(number: int) -> int:
    if number < 0:
        raise ValueError("number 不能为负数")
    if number < 2:
        return number
    return fibonacci(number - 1) + fibonacci(number - 2)
```

递归展开嵌套列表：

```python
def flatten(values: list[object]) -> list[object]:
    result: list[object] = []
    for value in values:
        if isinstance(value, list):
            result.extend(flatten(value))
        else:
            result.append(value)
    return result
```

Python 不做尾递归优化。普通累加和深层数据优先使用循环或显式栈。

## 模块与包

### 导入

```python
import json
import statistics as stats
from pathlib import Path
from random import randint
```

避免 `from module import *`。查看模块：

```python
import math

print(dir(math))
help(math.sqrt)
```

自定义模块：

```python
# math_tools.py
PI = 3.1415926


def add(a: float, b: float) -> float:
    return a + b


def circle_area(radius: float) -> float:
    return PI * radius**2
```

```python
# main.py
import math_tools
from math_tools import circle_area

print(math_tools.add(2, 3))
print(circle_area(2))
```

模块首次导入时执行顶层代码，随后通常从 `sys.modules` 复用。模块顶层不要发请求、启动线程或修改外部状态。

### `__name__` 与入口

```python
def main() -> int:
    print("程序启动")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

直接运行时 `__name__ == "__main__"`；被导入时是模块名。

### 包结构与导入路径

```text
demo/
├── pyproject.toml
├── src/
│   └── demo/
│       ├── __init__.py
│       ├── cli.py
│       └── services/
│           ├── __init__.py
│           └── report.py
└── tests/
```

`src/demo/services/report.py`：

```python
def build_report() -> str:
    return "report ready"
```

`src/demo/services/__init__.py`：

```python
from .report import build_report

__all__ = ["build_report"]
```

`src/demo/cli.py`：

```python
from demo.services import build_report


def main() -> None:
    print(build_report())


if __name__ == "__main__":
    main()
```

含相对导入的模块使用模块方式运行：

```bash
python -m pip install -e .
python -m demo.cli
```

`src` 布局不会自动加入模块搜索路径，先安装项目再运行包内模块。

循环导入通常说明职责混乱。优先拆出共同模块，而不是到处写函数内导入。

### 第三方依赖

```bash
python -m pip install requests
python -m pip install "requests>=2.32,<3"
python -m pip show requests
python -m pip uninstall requests
```

新项目把依赖写入 `pyproject.toml`，应用项目提交锁文件。

## 文件与数据

### 打开模式

| 模式 | 作用 | 不存在 | 已存在 |
| --- | --- | --- | --- |
| `r` | 只读 | 报错 | 读取 |
| `w` | 覆盖写 | 创建 | 清空 |
| `a` | 追加写 | 创建 | 保留 |
| `x` | 独占创建 | 创建 | 报错 |
| `b` | 二进制模式 | 与主模式组合 | 读写 bytes |
| `+` | 增加读写能力 | 与主模式组合 | 注意指针位置 |

### 文本读写

```python
from pathlib import Path

path = Path("notes.txt")

with path.open("w", encoding="utf-8") as file:
    file.write("第一行\n")
    file.writelines(["第二行\n", "第三行\n"])

with path.open("r", encoding="utf-8") as file:
    for line_number, line in enumerate(file, start=1):
        print(line_number, line.rstrip("\n"))
```

常用读取方法：

```python
with open("notes.txt", "r", encoding="utf-8") as file:
    all_text = file.read()

with open("notes.txt", "r", encoding="utf-8") as file:
    first_line = file.readline()
    remaining_lines = file.readlines()
```

大文件逐行或分块读取，不要一次性 `read()`。

### 二进制与文件指针

```python
data = "你好".encode("utf-8")

with open("data.bin", "wb") as file:
    file.write(data)

with open("data.bin", "rb") as file:
    payload = file.read()

print(payload.decode("utf-8"))
```

```python
with open("data.bin", "rb") as file:
    print(file.tell())
    file.seek(2)
    print(file.tell())
    chunk = file.read(4)
```

### pathlib

```python
from pathlib import Path

path = Path("data") / "users" / "ada.json"

print(path.name)
print(path.stem)
print(path.suffix)
print(path.parent)
print(path.resolve())
print(path.exists())

path.parent.mkdir(parents=True, exist_ok=True)
path.write_text("{}", encoding="utf-8")

for json_file in path.parent.glob("*.json"):
    print(json_file)
```

### JSON、CSV 与 TOML

```python
import json
from pathlib import Path

data = {"name": "Ada", "skills": ["math", "python"]}
path = Path("user.json")

path.write_text(
    json.dumps(data, ensure_ascii=False, indent=2),
    encoding="utf-8",
)
loaded = json.loads(path.read_text(encoding="utf-8"))
```

```python
import csv

with open("users.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "score"])
    writer.writeheader()
    writer.writerows([
        {"name": "Ada", "score": 91},
        {"name": "Grace", "score": 96},
    ])
```

Python 3.11+ 可用 `tomllib` 读取 TOML：

```python
import tomllib
from pathlib import Path

with Path("pyproject.toml").open("rb") as file:
    config = tomllib.load(file)
```

不要加载不可信 `pickle`，反序列化可能执行任意代码。

## 异常处理

常见异常：

| 异常 | 含义 |
| --- | --- |
| `NameError` | 名字未定义 |
| `TypeError` | 类型不支持当前操作 |
| `ValueError` | 类型正确但值非法 |
| `IndexError` | 序列索引越界 |
| `KeyError` | 字典键不存在 |
| `AttributeError` | 对象没有该属性 |
| `ZeroDivisionError` | 除数为零 |
| `FileNotFoundError` | 文件不存在 |
| `ModuleNotFoundError` | 模块不存在 |
| `StopIteration` | 迭代器耗尽 |
| `RecursionError` | 递归过深 |

完整结构：

```python
def parse_number(text: str) -> int | None:
    try:
        number = int(text)
    except ValueError as error:
        print(f"转换失败：{error}")
        return None
    else:
        print("转换成功")
        return number
    finally:
        print("处理结束")
```

捕获多种具体异常：

```python
def read_item(data: dict[str, list[str]], key: str, index: int) -> str | None:
    try:
        return data[key][index]
    except KeyError:
        print(f"键不存在：{key}")
    except IndexError:
        print(f"索引越界：{index}")
    except TypeError:
        print("数据类型错误")
    return None
```

异常链：

```python
from pathlib import Path


def read_port(path: Path) -> int:
    try:
        return int(path.read_text(encoding="utf-8").strip())
    except FileNotFoundError:
        return 8000
    except ValueError as error:
        raise ValueError(f"端口配置无效：{path}") from error
```

自定义异常：

```python
class InsufficientBalanceError(Exception):
    pass


def withdraw(balance: int, amount: int) -> int:
    if amount <= 0:
        raise ValueError("amount 必须大于 0")
    if amount > balance:
        raise InsufficientBalanceError(f"余额 {balance}，请求 {amount}")
    return balance - amount
```

`try` 只包可能失败的最小范围；捕获能够处理的具体异常；`assert` 只检查内部不变量。

## 面向对象

### 类与对象

```python
class Dog:
    species = "Canis familiaris"

    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age = age

    def bark(self) -> str:
        return f"{self.name}: Woof!"

    def __repr__(self) -> str:
        return f"Dog(name={self.name!r}, age={self.age})"


dog_1 = Dog("Buddy", 3)
dog_2 = Dog("Max", 5)

print(dog_1.bark())
print(dog_1)
print(isinstance(dog_1, Dog))
```

实例属性属于对象，类属性由类共享。通过实例赋值会创建同名实例属性：

```python
class Config:
    theme = "light"


first = Config()
second = Config()
first.theme = "dark"

print(first.theme)
print(second.theme)
print(Config.theme)
```

### dataclass 与可变字段

```python
from dataclasses import dataclass, field


@dataclass(slots=True)
class Box:
    name: str
    items: list[str] = field(default_factory=list)


first = Box("first")
second = Box("second")
first.items.append("book")

print(second.items)  # []
```

### classmethod 与 staticmethod

```python
from dataclasses import dataclass
from datetime import date as calendar_date
from typing import Self


@dataclass(frozen=True)
class Date:
    year: int
    month: int
    day: int

    @classmethod
    def from_string(cls, text: str) -> Self:
        year, month, day = map(int, text.split("-"))
        if not cls.is_valid(year, month, day):
            raise ValueError(f"无效日期：{text}")
        return cls(year, month, day)

    @staticmethod
    def is_valid(year: int, month: int, day: int) -> bool:
        try:
            calendar_date(year, month, day)
        except ValueError:
            return False
        return True


date = Date.from_string("2026-07-22")
```

### 继承、super 与鸭子类型

```python
class Animal:
    def __init__(self, name: str) -> None:
        self.name = name

    def speak(self) -> str:
        raise NotImplementedError


class Dog(Animal):
    def __init__(self, name: str, breed: str) -> None:
        super().__init__(name)
        self.breed = breed

    def speak(self) -> str:
        return "Woof"


class Cat(Animal):
    def speak(self) -> str:
        return "Meow"


for animal in [Dog("Buddy", "Corgi"), Cat("Mimi")]:
    print(animal.name, animal.speak())

print(Dog.mro())
```

鸭子类型只关心能力：

```python
class EmailSender:
    def send(self, message: str) -> None:
        print(f"Email: {message}")


class SmsSender:
    def send(self, message: str) -> None:
        print(f"SMS: {message}")


def notify(sender, message: str) -> None:
    sender.send(message)
```

`super()` 按 MRO 寻找下一个实现，`mro()` 可查看实际查找顺序。

### property 与常用协议

```python
class Account:
    def __init__(self, balance: int = 0) -> None:
        self.balance = balance

    @property
    def balance(self) -> int:
        return self._balance

    @balance.setter
    def balance(self, value: int) -> None:
        if value < 0:
            raise ValueError("余额不能为负数")
        self._balance = value
```

| 方法 | 作用 |
| --- | --- |
| `__repr__`、`__str__` | 对象表示 |
| `__eq__`、`__lt__` | 比较 |
| `__len__`、`__getitem__`、`__contains__` | 容器协议 |
| `__iter__`、`__next__` | 迭代协议 |
| `__enter__`、`__exit__` | 上下文管理 |
| `__call__` | 可调用对象 |
| `__hash__` | 哈希容器 |

### 描述符与抽象基类

```python
class Positive:
    def __set_name__(self, owner: type, name: str) -> None:
        self.storage_name = f"_{name}"

    def __get__(self, instance, owner=None):
        if instance is None:
            return self
        return getattr(instance, self.storage_name)

    def __set__(self, instance, value: float) -> None:
        if value <= 0:
            raise ValueError("值必须大于 0")
        setattr(instance, self.storage_name, value)


class Product:
    price = Positive()

    def __init__(self, price: float) -> None:
        self.price = price
```

```python
from abc import ABC, abstractmethod


class Repository(ABC):
    @abstractmethod
    def get(self, item_id: int) -> object | None:
        pass
```

元类控制类的创建，默认元类是 `type`。业务代码优先使用类装饰器或 `__init_subclass__`。

## 迭代器与生成器

### 可迭代对象与迭代器

```python
values = [10, 20, 30]
iterator = iter(values)

print(next(iterator))
print(next(iterator))
print(next(iterator))
# 再次 next 会抛 StopIteration
```

`for` 会自动调用 `iter()`、`next()` 并处理 `StopIteration`。

自定义迭代器：

```python
class CountDown:
    def __init__(self, start: int) -> None:
        self.current = start

    def __iter__(self) -> "CountDown":
        return self

    def __next__(self) -> int:
        if self.current <= 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value


print(list(CountDown(3)))
```

### 生成器

```python
from collections.abc import Iterator


def count_to(limit: int) -> Iterator[int]:
    number = 1
    while number <= limit:
        yield number
        number += 1


generator = count_to(3)
print(next(generator))
print(list(generator))
```

`yield` 返回一个值并暂停，下次从暂停处继续：

```python
def steps():
    print("step 1")
    yield 1
    print("step 2")
    yield 2
```

委托生成：

```python
from collections.abc import Iterator


def flatten(values: list[object]) -> Iterator[object]:
    for value in values:
        if isinstance(value, list):
            yield from flatten(value)
        else:
            yield value
```

生成器按需计算，适合大文件、分页、流水线和无限序列。

## 装饰器与上下文管理器

### 装饰器

```python
from collections.abc import Callable
from functools import wraps
from time import perf_counter
from typing import ParamSpec, TypeVar

P = ParamSpec("P")
R = TypeVar("R")


def timed(func: Callable[P, R]) -> Callable[P, R]:
    @wraps(func)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
        started = perf_counter()
        try:
            return func(*args, **kwargs)
        finally:
            print(f"{func.__name__}: {perf_counter() - started:.6f}s")

    return wrapper


@timed
def total(values: list[int]) -> int:
    return sum(values)
```

带参数装饰器：

```python
from collections.abc import Callable
from functools import wraps


def repeat(times: int):
    def decorator(func: Callable[[], None]):
        @wraps(func)
        def wrapper() -> None:
            for _ in range(times):
                func()

        return wrapper

    return decorator


@repeat(3)
def hello() -> None:
    print("hello")
```

### 上下文管理器

```python
class ManagedResource:
    def __enter__(self) -> "ManagedResource":
        print("acquire")
        return self

    def __exit__(self, exc_type, exc_value, traceback) -> bool:
        print("release")
        return False


with ManagedResource() as resource:
    print(resource)
```

函数式上下文管理器：

```python
from collections.abc import Iterator
from contextlib import contextmanager
from pathlib import Path
from tempfile import TemporaryDirectory


@contextmanager
def temporary_workspace() -> Iterator[Path]:
    with TemporaryDirectory() as directory:
        yield Path(directory)
```

## 类型注解与泛型

注解服务于阅读、IDE 和静态检查，不自动校验运行时数据：

```python
name: str = "Ada"
age: int = 36
scores: list[float] = [91.0, 96.0]
profile: dict[str, object] = {"name": name, "age": age}


def average(values: list[float]) -> float:
    if not values:
        raise ValueError("values 不能为空")
    return sum(values) / len(values)


def find_user(user_id: int) -> str | None:
    return "Ada" if user_id == 1 else None


def log(message: str) -> None:
    print(message)
```

结构类型：

```python
from collections.abc import Callable, Iterable, Sequence
from typing import Literal, TypeAlias, TypedDict

UserId: TypeAlias = int
Mode: TypeAlias = Literal["read", "write"]


class UserRow(TypedDict):
    id: UserId
    name: str
    tags: list[str]


def transform(
    values: Iterable[int],
    operation: Callable[[int], str],
) -> list[str]:
    return [operation(value) for value in values]


def first(values: Sequence[str]) -> str | None:
    return values[0] if values else None
```

泛型与协议：

```python
from collections.abc import Iterable
from typing import Protocol, TypeVar

T = TypeVar("T")


def first_or_default(values: Iterable[T], default: T) -> T:
    return next(iter(values), default)


class SupportsClose(Protocol):
    def close(self) -> None: ...


def close_safely(resource: SupportsClose) -> None:
    resource.close()
```

少用 `Any`。未知值用 `object`，再用 `isinstance` 缩小类型。

## 异步与并发

| 模型 | 适合 |
| --- | --- |
| 线程 | 阻塞 I/O、同步库 |
| 进程 | CPU 密集计算 |
| asyncio | 大量非阻塞 I/O |

### async / await

```python
import asyncio


async def get_data() -> str:
    await asyncio.sleep(1)
    return "data"


async def main() -> None:
    result = await get_data()
    print(result)


if __name__ == "__main__":
    asyncio.run(main())
```

顺序等待约两秒，并发等待约一秒：

```python
import asyncio
from time import perf_counter


async def fetch(name: str, seconds: float) -> str:
    await asyncio.sleep(seconds)
    return f"{name} done"


async def run_sequentially() -> list[str]:
    return [await fetch("A", 1), await fetch("B", 1)]


async def run_concurrently() -> list[str]:
    return list(await asyncio.gather(fetch("A", 1), fetch("B", 1)))


async def main() -> None:
    for operation in (run_sequentially, run_concurrently):
        started = perf_counter()
        result = await operation()
        elapsed = perf_counter() - started
        print(operation.__name__, result, f"{elapsed:.2f}s")


if __name__ == "__main__":
    asyncio.run(main())
```

结构化并发：

```python
import asyncio


async def fetch(name: str, seconds: float) -> str:
    await asyncio.sleep(seconds)
    return f"{name} done"


async def main() -> None:
    tasks: list[asyncio.Task[str]] = []

    async with asyncio.TaskGroup() as group:
        tasks.append(group.create_task(fetch("A", 1)))
        tasks.append(group.create_task(fetch("B", 1)))

    print([task.result() for task in tasks])


if __name__ == "__main__":
    asyncio.run(main())
```

异步迭代：

```python
import asyncio
from collections.abc import AsyncIterator


async def ticker(count: int) -> AsyncIterator[int]:
    for value in range(count):
        await asyncio.sleep(0.1)
        yield value


async def consume() -> None:
    async for value in ticker(3):
        print(value)


if __name__ == "__main__":
    asyncio.run(consume())
```

协程里不要直接调用 `time.sleep()`、同步网络请求或重 CPU 计算。异步提升的是等待期间的利用率，不是单个计算速度。

常规 CPython 仍有 GIL；free-threaded 是可选构建。

## 常用标准库

| 任务 | 模块 |
| --- | --- |
| 路径与文件 | `pathlib`、`shutil`、`tempfile` |
| 系统与进程 | `os`、`sys`、`subprocess` |
| 日期时间 | `datetime`、`zoneinfo` |
| 数据格式 | `json`、`csv`、`tomllib` |
| 集合工具 | `collections` |
| 迭代工具 | `itertools` |
| 函数工具 | `functools` |
| 数学 | `math`、`statistics`、`decimal` |
| 正则 | `re` |
| 安全随机 | `secrets` |
| 哈希 | `hashlib`、`hmac` |
| 日志 | `logging` |
| 命令行 | `argparse` |
| 并发 | `asyncio`、`concurrent.futures` |
| 测试 | `unittest`、`unittest.mock` |
| 性能 | `timeit`、`cProfile`、`tracemalloc` |

```python
from collections import Counter, defaultdict, deque
from itertools import chain, islice

counts = Counter("abracadabra")
groups: defaultdict[str, list[int]] = defaultdict(list)
queue: deque[str] = deque(["first"])
first_five = list(islice(chain(range(3), range(3, 10)), 5))
```

安全令牌使用 `secrets`：

```python
import secrets

token = secrets.token_urlsafe(32)
```

外部进程使用参数列表：

```python
import subprocess
import sys

result = subprocess.run(
    [sys.executable, "--version"],
    check=True,
    capture_output=True,
    text=True,
)
```

## 测试与工程化

### 项目结构

```text
my_project/
├── pyproject.toml
├── uv.lock
├── README.md
├── src/
│   └── my_project/
│       ├── __init__.py
│       ├── cli.py
│       └── service.py
└── tests/
    └── test_service.py
```

### pyproject.toml

```toml
[project]
name = "my-project"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
  "httpx>=0.28,<1",
]

[dependency-groups]
dev = [
  "mypy>=1.18",
  "pytest>=8",
  "ruff>=0.12",
]

[tool.pytest.ini_options]
testpaths = ["tests"]

[tool.ruff]
line-length = 100
target-version = "py311"

[tool.ruff.lint]
select = ["E", "F", "I", "B", "UP"]

[tool.mypy]
python_version = "3.11"
strict = true
```

```bash
uv sync
uv run ruff format --check .
uv run ruff check .
uv run mypy src
uv run pytest
uv lock --check
```

### pytest

```python
import pytest


def divide(a: float, b: float) -> float:
    if b == 0:
        raise ValueError("除数不能为零")
    return a / b


def test_divide() -> None:
    assert divide(6, 3) == 2


def test_divide_rejects_zero() -> None:
    with pytest.raises(ValueError, match="不能为零"):
        divide(1, 0)


@pytest.mark.parametrize(
    ("value", "expected"),
    [(0, "even"), (1, "odd"), (2, "even")],
)
def test_parity(value: int, expected: str) -> None:
    result = "even" if value % 2 == 0 else "odd"
    assert result == expected
```

### logging、调试与性能

```python
import logging

logger = logging.getLogger(__name__)


def process(user_id: int) -> None:
    logger.info("processing user", extra={"user_id": user_id})
```

```bash
python -m timeit "sum(range(1000))"
python -m cProfile -s cumulative app.py
```

- `breakpoint()` 查看变量与调用栈；
- `timeit` 比较小片段；
- `cProfile` 找整体热点；
- `tracemalloc` 查内存增长；
- 先测量，再优化。

### 综合示例：成绩排名

`students.json`：

```json
[
  {"name": "Ada", "scores": [95, 98, 96]},
  {"name": "Grace", "scores": [99, 96, 97]},
  {"name": "Guido", "scores": [88, 92, 90]}
]
```

```python
import json
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True, slots=True)
class Student:
    name: str
    scores: tuple[float, ...]

    @property
    def average(self) -> float:
        if not self.scores:
            raise ValueError(f"{self.name} 没有成绩")
        return sum(self.scores) / len(self.scores)


def load_students(path: Path) -> list[Student]:
    raw = json.loads(path.read_text(encoding="utf-8"))
    students: list[Student] = []

    for item in raw:
        scores = tuple(map(float, item["scores"]))
        if not scores:
            raise ValueError(f"{item['name']} 没有成绩")
        students.append(Student(name=item["name"], scores=scores))

    return students


def build_ranking(students: list[Student]) -> list[Student]:
    return sorted(students, key=lambda student: (-student.average, student.name))


for index, student in enumerate(
    build_ranking(load_students(Path("students.json"))),
    start=1,
):
    print(f"{index:>2}. {student.name:<12} {student.average:>6.2f}")
```
