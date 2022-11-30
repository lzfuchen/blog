import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',
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
