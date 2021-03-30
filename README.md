## 用户使用指南

### 前后端一体化的时候
`s-function new midway-hooks-react` (前后端一体化) 代码结构为`mw new faas-hooks-react`
`s-function new midway-hooks-vue` (前后端一 体化) [TODO]
项目结构为
```
- src
  - apis
    - lambda
  - page
  - index.html
- f.yml
- s.yml
- midwat.config.ts (@midwayjs/hooks配置)
```
> tips: 使用midway一体化的项目时候, 肯定是全新的项目。所以直接放在当前的文件目录即可
脚手架npm包

```
'faas-hooks-react': {
  desc: 'A serverless boilerplate with react and use hooks',
  package: '@midwayjs-examples/serverless-boilerplate-hooks-react',
  group: 'Serverless',
}
// https://github.com/midwayjs/midway-serverless-examples
```

### 前后端分别部署使用，比如：
`hexo init hexo-site && s-function new functions`

项目结构为
```
- src
  - page
  - index.html
- functions
  - index.ts
- f.yml
- s.yml
```

脚手架npm包
```
faas: {
  desc: 'A serverless boilerplate for aliyun fc, tencent scf and so on',
  package: '@midwayjs-examples/serverless-boilerplate-standard',
  group: 'Serverless',
}
```
这里需要注意：faas的目录为`function`, 并且在原来的前端项目中，需要新增
f.yml,tsconfig.json以及pakage.json中关于serverless部分。

## 注意
`.servless`文件夹是默认的部署文件目录。通过midway的build命令生成(f.yml中有体现)

#### 问题
s.yml 一体化配置规范

默认midway-hooks方案配置如下:
``` yml
frontend:
  sourceDir: src
  outputDir: build
# faas: // 默认 不支持修改
#   sourceDir: src/apis
#   outputDir: dist // 不支持更改
#   routers:
#     - baseDir: lambda
#       basePath: /api
```

非一体化方案配置默认如下:
> frontend 配置根据前端框架来决定, 比如hexo默认为
`{sourceDir:'source', outputDir:'public'}`

> faas 配置中默认文件夹为 function, 输出目录为dist (不支持改变...)

``` yml
frontend: // [动态判断]
  sourceDir: src
  outputDir: build
# faas: // 默认 不支持修改
#   sourceDir: functions
#   outputDir: dist // 不支持更改
```


## 遗留问题
1. dist冲突问题? 由于后端文件midway写死的是dist，所以前端脚手架比如vue-cli使用的时候默认为dist。和faas冲突了如何处理?
答：在执行后端 deploy的时候，先执行前端build，检查dist目录是不是被占用了，如果是则建议用户修改为build
2. 在midway-hooks中，我们知道`midway.config.ts`是配置前端或者后端的运行目录等。其实和s.yml的配置可能会冲突
比如s.yml配置下面路径
```
frontend:
  sourceDir: source
  outputDir: build
```
但是后端`midway.config.ts`中默认配置为:
```
export default defineConfig({
  source: './src/apis',
  build: {
    viteOutDir: './build',
  },
  routes: [
    {
      baseDir: 'lambda',
      basePath: '/api',
    },
  ],
});
```
可以看到前端的默认的路径为src,和s.yml中冲突了
答：在执行deploy的时候进行对比修正，但是考虑到其实只能检测前端build的目录的字段。暂时不考虑冲突，全部以s.yml为主。
