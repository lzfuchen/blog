import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '爬坑记录',
  description: '记录爬的每个坑',
  theme: defaultTheme({
    lastUpdated: false,
    contributors: false,
    navbar: [
      {
        text: 'VUE',
        link: '/vue'
      },

      {
        text: '关于',
        children: [
          {
            text: 'github',
            link: 'https://github.com/lzfuchen'
          }
        ]
      }
    ]
    // sidebar: [
    //   {
    //     text: 'Nginx',
    //     link: '/nginx/',
    //     children: [
    //       {
    //         text: '基本概要',
    //         link: '/nginx'
    //       },
    //       {
    //         text: '语法配置',
    //         link: '/nginx/configuration-syntax'
    //       },
    //       {
    //         text: '静态资源服务器',
    //         link: '/nginx/static-res-server'
    //       },
    //       {
    //         text: '代理服务器',
    //         link: '/nginx/proxy-server'
    //       }
    //     ]
    //   }
    // ]
  })
})
