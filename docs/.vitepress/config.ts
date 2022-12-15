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
  }
]

const sidebar = {
  '/nginx/': [
    {
      text: 'Nginx',
      items: [
        {
          text: '配置语法',
          link: '/nginx/configuration-syntax'
        },
        {
          text: '静态资源服务器',
          link: '/nginx/static-res-server'
        },
        {
          text: '代理服务器',
          link: '/nginx/proxy-server'
        }
      ]
    }
  ]
}

export default defineConfigWithTheme({
  title: '爬了个大坑',
  description: '乐观生活，开心编码',
  srcDir: './src',

  themeConfig: {
    nav,
    sidebar
  }
})
