import { defineConfigWithTheme, ThemeOptions } from 'vitepress'

const nav = [
  {
    text: 'Vue2',
    activeMatch: `^/vue2/`,
    link: '/vue2/',
  },
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
  },
  {
    text: 'MySQL',
    activeMatch: `^/mysql/`,
    link: '/mysql/'
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
  ],
  '/mysql/': [
    {
      text: 'MySQL',
      items: [
        {
          text: '基础',
          link: '/mysql/'
        },
        {
          text: '进阶',
          link: '/mysql/advanced'
        }
      ]
    }
  ],
  '/vue2/': [
    {
      text: 'Vue2.7.14',
      items: [
        {
          text: 'keep-alive',
          link: '/vue2/keep-alive'
        }
      ]
    }
  ]
}

export default defineConfigWithTheme({
  title: '我的爬坑心得',
  description: '乐观生活，开心编码',
  srcDir: './src',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav,
    sidebar
  }
})
