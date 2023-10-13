
# 源码调试

1. 拉取vue2.7.14代码，执行`pnpm install`，执行`pnpm dev`，如果没有安装`rollup`，可以全局安装`rollup`
2. 在`dist`文件夹下面，创建`package.json`,添加如下内容
```json
{
  "name": "vue-debug",
  "version": "0.1.0",
  "private": true,
  "main": "vue-debug.js",
  "scripts": {
    "dev": "vue-cli-service serve",
    "build": "vue-cli-service build"
  },
  "dependencies": {},
  "devDependencies": {}
}
```
3. 在 `dist` 目录下执行 `npm link`
4. 用vue脚手架创建一个vue2新项目，执行`npm link vue-debug`
5. 开始愉快地调试代码吧。

## new Vue() 发生了什么事情?
```js
function Vue(options) {
  this._init(options) // _init 在initMixin方法中，挂载到了Vue原型对象上面
}
```
