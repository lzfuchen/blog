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
    sidebar
  }
})
