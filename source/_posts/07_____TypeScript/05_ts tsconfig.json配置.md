---
title: 五、ts tsconfig.json配置
tags: TypeScript
categories: TypeScript
cover: 'https://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/fdbe621f6b31fb31333381d541533fe2e8a61025b4acebb1f10c9f948a9ffce78a532557a1a789d30807b98f07b23952?pictype=scale&from=30113&version=3.3.3.3&uin=851681631&fname=10_ts.jpg&size=750'
abbrlink: 60ded8c6
date: 2020-01-05 00:00:00
---

#### TypeScript 编译选项配置文件学习

```json
{
	/**
	 * TypeScript 编译选项配置文件学习
	 * 说明：tsconfig.json 是ts编译器的配置文件，ts编译器可以根据它的信息来对代码进行编译
	 *
	 * 常用三块功能：include  exclude   compilerOptions
	 * "include" 用来指定哪些ts文件需要被编译
	 *           路径: **表示任意目录
	 *           *表示任意文件
	 *
	 * "exclude" 用来指定哪些ts文件需要不被编译
	 *           默认值: ["node_modules", "bower_components", "jspm_packages"]
	 *
	 * "compilerOptions" 编译程序任选项
	 */
	"include": [
		// 用来指定哪些ts文件需要被编译
		"./src/**/*"
	],
	"exclude": [
		// 用来指定哪些ts文件需要不被编译
		"./src/exclude/**/*",
		"./src/hello.ts"
	],
	"compilerOptions": {
		/* 基本的选项 */
		"target": "es2015", // 用来指定被编译成的js目标版本, 默认ES3版本
		"module": "system", // 指定要使用的模块化的规范  es2015  commonjs  system  cmd
		"lib": [
			// 指定要包含在编译中的库文件
			"dom",
			"esnext",
			"es2015.promise"
		],
		"outDir": "./dist", // 指定编译后的文件所在目录
		"outFile": "./dist/app.js", // 将代码合并为一个文件
		"allowJs": true, // 允许javascript文件被编译
		"checkJs": true, // 检查报告.js文件中的错误.
		"removeComments": true, // 编译后不发出注释输出
		"noEmit": false, // 不生成编译后的文件
		"noEmitOnError": false, // 当有错误时,不生成编译后的文件

		/* 编译选项，语法检查相关 */
		"strict": false, // 所有严格检查的总开关
		"alwaysStrict": false, // 用来设置编译后的文件是否使用严格模式, 默认false
		"noImplicitAny": true, // 不允许隐士的any类型
		"noImplicitThis": true, // 不允许不明确类型的this
		"strictNullChecks": true // 严格的检查空值
	}
}
```
