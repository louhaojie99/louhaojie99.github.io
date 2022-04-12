---
title: 如何统计代码行数
tags: node
categories: node
comments: false
cover: >-
  https://img2.baidu.com/it/u=4219523668,985220258&fm=253&fmt=auto&app=138&f=JPEG?w=980&h=460
abbrlink: 7fc9133d
date: 2022-04-12 00:00:00
top_img:
---

刚接手了一个项目，老板让我统计一下代码行数，不看不知道，一看吓一跳，一起看看你写了多少代码吧。

Node Version: `14.18.1`

终端执行`node ./line.js` 即可。

```javascript
// line.js
const fs = require('fs');
const path = require('path');

const folderPaths = [path.resolve('./', 'src')];
const excludes = ['nide_modules', 'demo', 'static', 'docs', '__mocks__', 'dist'];

let fileCount = 0;
let lineCount = 0;

// 获取行数
const getLines = filePath => {
  const res = fs.readFileSync(filePath);
  const lines = res.toString().split('\n');
  return lines.length;
};

// 去除 excludes 目录
const avaliableFile = filePath => {
  const currentSplitPaths = filePath.split('/');
  const paths = new Set(excludes.concat(currentSplitPaths));
  return Array.from(paths).length === excludes.length + currentSplitPaths.length;
};

const scanDir = (folderPath, dir) => {
  try {
    const files = fs.readdirSync(folderPath);
    files.forEach(filename => {
      const director = path.join(`${folderPath}/`, filename);
      const stats = fs.statSync(director);
      if (stats.isDirectory()) {
        scanDir(director, dir ? `${dir}.${filename}` : filename);
      }
      if (stats.isFile() && avaliableFile(director)) {
        fileCount += 1;
        lineCount += getLines(director);
      }
    });
  } catch (err) {
    console.info(err);
  }
};

folderPaths.forEach(folderPath => {
  scanDir(folderPath);
});

console.log(fileCount, lineCount);
```
