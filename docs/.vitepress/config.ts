import { defineConfigWithTheme, ThemeOptions } from 'vitepress'

const nav = [
  {
    text: 'Nginx',
    activeMatch: `^/nginx/`,
    link: '/nginx/'
  },
  {
    text: 'Docker',
    activeMatch: `^/docker/`,
    link: '/docker/'
  },
  {
    text: 'Puppeteer',
    activeMatch: `^/puppeteer/`,
    link: '/puppeteer/'
  }
]

const sidebar = {
  '/puppeteer/': [
    {
      text: 'Puppeteer',
      items: [
        {
          text: 'chromium 下载链接',
          link: '/puppeteer/download-url'
        },
        {
          text: '服务端优化',
          link: '/puppeteer/server-optimize'
        }
      ]
    }
  ]
}

export default defineConfigWithTheme({
  title: '我的爬坑心得',
  description: '乐观生活，开心编码',
  srcDir: './src',

  themeConfig: {
    nav,
    sidebar,
    footer: {
      copyright: `<div><a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=61042402000124" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="/beian.png" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">陕公网安备 61042402000124号</p></a></div>`
    }
  }
})
