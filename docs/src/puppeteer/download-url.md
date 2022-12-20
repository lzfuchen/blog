
# 使用 puppeteer-core 对应版本 chromium 下载链接怎么找？

打开 `node_modules/puppeteer-core/lib/esm/puppeteer/node/BrowserFetcher.js` 文件  
搜索 `downloadURL` 看到如下代码，这个方法的返回值就是下载链接，接下来我们查找对应参数
```js
function downloadURL(product, platform, host, revision) {
    const url = util.format(downloadURLs[product][platform], host, revision, archiveName(product, platform, revision));
    return url;
}
```

搜索 `downloadURLs` 看到如下代码
```js
const downloadURLs = {
    chrome: {
        linux: '%s/chromium-browser-snapshots/Linux_x64/%d/%s.zip',
        mac: '%s/chromium-browser-snapshots/Mac/%d/%s.zip',
        mac_arm: '%s/chromium-browser-snapshots/Mac_Arm/%d/%s.zip',
        win32: '%s/chromium-browser-snapshots/Win/%d/%s.zip',
        win64: '%s/chromium-browser-snapshots/Win_x64/%d/%s.zip',
    },
    firefox: {
        linux: '%s/firefox-%s.en-US.%s-x86_64.tar.bz2',
        mac: '%s/firefox-%s.en-US.%s.dmg',
        win32: '%s/firefox-%s.en-US.%s.zip',
        win64: '%s/firefox-%s.en-US.%s.zip',
    },
};
```
以 `mac chrome` 为例，丢赢链接如下：
```text
`%s/chromium-browser-snapshots/Linux_x64/%d/%s.zip`
```

第二个参数查找 `browserConfig` 看到如下代码
```js
const browserConfig = {
    chrome: {
        host: 'https://storage.googleapis.com',
    },
    firefox: {
        host: 'https://archive.mozilla.org/pub/firefox/nightly/latest-mozilla-central',
    },
};
```
替换第一个 `%s` 链接如下所示：
```text
https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/%d/%s.zip
```

第三个参数 查找 `node_modules/puppeteer-core/lib/esm/puppeteer/revisions.js` 文件
```js
export const PUPPETEER_REVISIONS = Object.freeze({
    chromium: '1069273',
    firefox: 'latest',
});
```
替换第二个 `%d` `URL` 如下所示：  
```text
https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/1069273/%s.zip
```
  
第三个参数还是在 `BrowserFetcher.js` 下查找 `archiveName` 方法
```js
function archiveName(product, platform, revision) {
    switch (product) {
        case 'chrome':
            switch (platform) {
                case 'linux':
                    return 'chrome-linux';
                case 'mac_arm':
                case 'mac':
                    return 'chrome-mac';
                case 'win32':
                case 'win64':
                    // Windows archive name changed at r591479.
                    return parseInt(revision, 10) > 591479
                        ? 'chrome-win'
                        : 'chrome-win32';
            }
        case 'firefox':
            return platform;
    }
}
```
最终结果如下:
- `https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/1069273/chrome-mac.zip`