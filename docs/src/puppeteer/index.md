# Puppeteer

[`官方文档`](https://pptr.dev/) | [`API`](https://pptr.dev/api/puppeteer.puppeteernode)

Puppeteer 是一个 Node 库，它提供了一个高级 API 来通过 DevTools 协议控制 Chromium 或 Chrome。Puppeteer 默认以 headless 模式运行，但是可以通过修改配置文件运行“有头”模式。  

## 能做什么？

浏览器中手动执行的绝大多数操作都可以使用 Puppeteer 来完成， 比如：
- 生成页面 PDF、PNG、JPG
- 自动提交表单，进行 UI 测试，键盘输入等
- 创建一个时时更新的自动化测试环境。 使用最新的 JavaScript 和浏览器功能直接在最新版本的Chrome中执行测试。

## puppeteer-core

`puppeteer-core` 是一个的轻量级的 `Puppeteer` 版本，用于启动现有浏览器安装或连接到远程安装  
默认的 `puppeteer` 会下载 `Chromium`，`puppeteer-core` 不会


## pdf 页面页脚踩的坑 

要添加页眉页脚注意生成pdf方法选项的四个参数：`displayHeaderFooter`,`margin`,`headerTemplate`,`footerTemplate`
- `displayHeaderFooter` 要设置为true
- `headerTemplate`,`footerTemplate` 都要有值，比如我只有页脚，那么 `headerTemplate = ''` 可以等于空字符串，如果不设置会发现页脚也没有效果
- `margin` 上下的margin也要设置不设置你会发现页眉页脚没有显示

页脚如何显示pdf总页数和页码？

通过两个css显示 `pageNumber` 页码，`totalPages` 总页数，比如：
```js
// 页脚 第x页，共x页
const footerTemplate = `<span>第<span class="pageNumber"></span>页， 共<span class="totalPages"></span>页</span>`
```
