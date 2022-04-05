---
title: 六、webpack构建打包ts项目
tags: TypeScript
categories: TypeScript
cover: 'https://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/fdbe621f6b31fb31333381d541533fe2e8a61025b4acebb1f10c9f948a9ffce78a532557a1a789d30807b98f07b23952?pictype=scale&from=30113&version=3.3.3.3&uin=851681631&fname=10_ts.jpg&size=750'
abbrlink: 61ded8c6
date: 2020-01-06 00:00:00
---

#### 相关配置依赖项介绍

```bash
# 生成package.json
npm init -y

# 开发依赖
npm i -D webpack webpack-cli typescript ts-loader   

# 生成tsconfig.json
tsc --init  

# 编译打包
npm run build 

# 自动生成html文件
npm i html-webpack-plugin -D     

# webpack开发服务器, 根据项目的改变自动去刷新
npm i webpack-dev-server -D       

# 打包清除dist目录, 保证打包代码最新
npm i clean-webpack-plugin -D      

# 打包代码兼容低版本浏览器
npm i -D @babel/core @babel/preset-env babel-loader core-js 
```

#### webpack.config.js

```javascript
// 引入一个包
const path = require('path')
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// webpack中所有的配置信息都应该写在module.exports中
module.exports = {
	// 指定入口文件
	entry: './src/index.ts',
	// 指定打包文件所在的目录
	output: {
		// 指定打包文件的目录
		path: path.resolve(__dirname, 'dist'),
		// 打包后文件的文件
		filename: 'bundle.js',
		// 告诉webpack不使用箭头函数
		environment: {
			arrowFunction: false,
		},
	},
	// 指定webpack打包时要使用的模块
	module: {
		// 指定加载的规则
		rules: [
			{
				// test指定的是规则生效的文件
				test: /\.ts$/,
				// 要使用的loader
				use: [
					// 配置babel
					{
						// 指定加载器
						loader: 'babel-loader',
						// 设置babel
						options: {
							// 设置预定义的环境
							presets: [
								[
									// 指定环境插件
									'@babel/preset-env',
									// 配置信息
									{
										// 要兼容的目标浏览器
										targets: {
											chrome: '90',
										},
										// 只当corejs版本
										corejs: '3',
										// 使用corejs的方式			usage表示按需加载
										useBuiltIns: 'usage',
									},
								],
							],
						},
					},
					'ts-loader',
				],
				// 要排除的文件
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		/* 自动生成html文件,引入相关的资源 */
		new HTMLWebpackPlugin({
			// title: '你好世界',
			template: './src/index.html', // 生成模板
		}),
		/* 打包清除dist目录, 保证打包代码最新 */
		new CleanWebpackPlugin(),
	],
	mode: 'development', // development为开发者环境，production为生产环境变量 ，还有一个为none
	// 用来设置引用模块
	resolve: {
		extensions: ['.ts', '.js'],
	},
}
```

