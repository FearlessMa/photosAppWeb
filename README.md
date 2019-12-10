# tree使用，tags操作

* ree -I 'node_modules' >tree.md

```js
├── README.md
├── package.json
├── public
│   └── index.html
├── src
│   ├── app.tsx
│   ├── components
│   │   ├── layout
│   │   │   ├── index.less
│   │   │   ├── index.tsx
│   │   │   ├── logo.less
│   │   │   └── logo.tsx
│   │   └── menu
│   │       └── index.tsx
│   ├── declareTS
│   │   ├── IFCspace.d.ts
│   │   └── index.d.ts
│   ├── index.tsx
│   ├── pages
│   │   └── login
│   │       ├── index.tsx
│   │       ├── loginUI.less
│   │       └── loginUI.tsx
│   ├── router.tsx
│   ├── server
│   │   ├── api.ts
│   │   ├── fetchData.ts
│   │   └── index.ts
│   ├── store
│   │   ├── actionCreator.ts
│   │   ├── actionTypes.ts
│   │   ├── index.ts
│   │   └── reducer.ts
│   └── utils
│       └── index.ts
├── tree.md
├── tsconfig.json
└── webpack
    ├── webpack.common.js
    └── webpack.dev.js

```

* tag操作

```json
// 新增标签
 git tag -a v1.0.0 -m '第一个版本'
//  查看所有tag
 git tag
//  push到远端
 git push origin v1.0.0
//  查看指定tag
 git show v1.0.0
```

* git 本地push远程

```json

 git init                    #把当前目录变成git可以管理的仓库
 git add readme.txt          #添加一个文件，也可以添加文件夹
 git add -A                  #添加全部文件
 git commit -m "some commit" #提交修改
 git status                  #查看是否还有未提交
 git log                     #查看最近日志
 git reset --hard HEAD^      #版本回退一个版本
 git reset --hard HEAD^^     #版本回退两个版本
 git reset --hard HEAD~100   #版本回退多个版本
 git remote add origin +地址 #远程仓库的提交（第一次链接）
 git push -u origin master   #仓库关联
 git push                    #远程仓库的提交（第二次及之后）

```

## 知识点记录

* export 导出的类型是Module

```js
/* 
  params:  
  Module {default: {…}, __esModule: true, Symbol(Symbol.toStringTag): "Module"}
  default: {fetchLogin: ƒ}
  loginSagas: Object
  fetchLogin: ƒ (_a, action)
  __proto__: Object
  Symbol(Symbol.toStringTag): "Module"
  __esModule: true
  get loginSagas: ƒ ()
  __proto__: Object 
*/

// Object.prototype.toString.call(params):  [object Module]

```

* export default 导出的是 Object

```js
/*
  params:  
  {fetchLogin: ƒ}
  fetchLogin: ƒ (_a, action)
  __proto__: Object
*/
//  Object.prototype.toString.call(params):  [object Object]

```