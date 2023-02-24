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
    sidebar,
    footer: {
      copyright: `<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=61042402000124" style="display:flex;align-item:center;line-height:20px;"><img src="/beian.png"/><span style="margin-left:5px; color:#939393;">陕公网安备 61042402000124号</span></a>`
    }
  }
})
