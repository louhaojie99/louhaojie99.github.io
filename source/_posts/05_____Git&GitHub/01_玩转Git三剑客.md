---
title: 玩转Git三剑客
tags: git
categories: git
cover: 'https://img1.baidu.com/it/u=1144986904,836932890&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=301'
abbrlink: baa0aba5
date: 2019-04-01 00:00:00
---

# GIT 的一些基础命令

## 基本常识

- **一般配置**

```bash
git --version					// 查看git版本内心戏
git config --global user.name	// 获取当前登录的用户
git config --global user.email	// 获取当前登录用户的邮箱
git config -l 					// 查看当前git的配置
git config --system --list		// 查看系统配置
git config --global --list		// 查看用户自己设置的配置
```

- **登录 git**

```bash
/* 如果刚没有获取到用户配置，则只能拉取代码，不能修改  要是使用git，你要告诉git是谁在使用 */
git config --global user.name 'louhaojie'    		//设置git账户，louhaojie为你的git账号，
git config --global user.email '851681631@qq.com'
```

- **初始化 git 仓库**

```bash
git init 	// 在前端项目工程文件夹下初始化一个仓库，此时文件里会得到一个 .git的隐藏文件夹
```

- **克隆 git 仓库**

```bash
git clone -b dev https://github.com/louhaojie99/vue-xm.git
```

- **建立链接进行基本操作**

```bash
技巧性：clone克隆下来仓库之后，把隐藏的  .git文件赋值到项目中，就进行了绑定

git remote rm origin			  - 先删除
xgit remote add origin git地址	- 再链接
git remote -v				      - 查看是否连接上
```

- **创建忽略文件**

```bash
touch .gitignore		// 不需要服务器端提交的内容可以写道忽略文件里
/*
	.git
	.idea
*/
```

- **查看目录**

```
ls -al
```

- **添加到暂存区中**

```bash
git add index.html
git add -A			// 全部添加到缓存区
git add .			// 全部添加到缓存区
```

- **添加到版本库中**

```bash
git commit -m "备注提交信息"
```

- **查看版本**

```bash
git log --oneline	// 所有提交的commit提交记录
```

- **比较差异**

  - 比较的是暂存区和工作区的差异

    ```bash
    git diff
    ```

  - 比较的是暂存区和历史区的差异

    ```bash
    git diff --cached
    ```

  - 比较的是历史区和工作区的差异（修改）

    ```bash
    git diff master
    ```

## 仓库的公钥的配置（ssh）

- **_设置本机绑定 SSH 公钥，实线免密码登录！_**（免密码登录，这一步挺重要的！）

```bash
第一步生成一个公钥：
1.在终端输运行命令：ssh-keygen
2.进入.ssh密钥目录：cd ~/.ssh
3.查看目录下的内容：ls
4.查看公钥内容：cat id_rsa.pub

第二步生成的公钥添加到码云当中：
...
第三步新建仓库：(公开/私有)
...
```

## GIT 常用操作

```bash
git status 						# 查看是否有文件被跟踪（也就是查看到暂存区的有哪些）
git add . 						# 添加所有的文件到暂存区
git commit -m '信息备注'     	 # 提交暂存区中的内容到本地仓库
git push     					# 本地仓库提交到远程仓库提交到远程仓库
```

## GIT 常用分支操作

```bash
git branch	   			# 列出当前的所有分支
git branch dev 			# 新建分支

git checkout -b 分支名  # 创建一个新的分支并且切换过去
git branch -d 分支名 	 # 删除指定的分支
git checkout master     # 切换分支

git merge 分支名 		  # 合并分支，合并指定分支名的分支到当前分支

git pull origin master	# 拉取远程最新的代码
git push origin master	# 推送本地代码到远程

git log 			   # 查看本地日志
git reflog             # 查看所有的日志，包含已经回退和删除的
git reset logid --hard # 回退代码到指定的位置
git rebase 			   # 变基
```

## 踩坑问题解决

- Git 提交时出现 Merge branch 'master' of ...之解决方法

```
问题出现的描述：
多人协作开发项目，在上传代码时通常会先pull一下远程代码，使本地与远程同步更新，
但是如果远程此时与自己代码存在冲突，在解决冲突后提交有时会出现“Merge branch ‘master’ of …”这条信息。
这是因为pull其本质是fetch+Merge的结合。
通常会分为以下两种情况：
1.如果远程分支超前于本地分支，并且本地也没有commit操作，此时pull会采用’fast-forward’模式，该模式不会产生合并节点，也即不产生"Merge branch ‘master’ of …"信息。
2.如果本地有commit提交，此时若存在冲突，pull拉取代码时远程和本地会出现分叉，会进行分支合并，就会产生"Merge branch ‘master’ of …"信息。

解决方法
使用git pull --rebase命令，如果没有冲突,则会直接合并，如果存在冲突，手动解决冲突即可，不会再产生那条多余的信息。如果你不想每次都rebase，可以在git bash里执行

git config --global pull.rebase true
这个配置就是告诉git在每次pull前先进行rebase操作。
```
