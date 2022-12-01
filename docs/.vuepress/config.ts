import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '爬坑记录',
  description: '记录爬的每个坑',
  theme: defaultTheme({
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
  })
})
