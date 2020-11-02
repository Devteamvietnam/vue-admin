module.exports = {
  title:'Vue Admin',
  description:'Vue Admin',
  base:'/vue-admin-docs/',
  head: [
    ['link', {rel:'icon', href:'/favicon.ico' }]
  ],
  themeConfig: {
    logo:'/logo.png',
    repo:'Devteamvietnam/vue-admin',
    docsDir:'docs',
    editLinks: true,
    editLinkText:'Help us edit this page on Github',
    nav: [
      {text:'Guide', link:'/'},
      {text:'Configuration', link:'/develop/layout'},
      {text:'Theme', link:'/advance/theme'},
    ],
    lastUpdated:'Last Updated',
    sidebar: [
      {
        title:'Start',
        collapsable: false,
        children: [
          '/start/use','/start/faq'
        ]
      },
      {
        title:'Development',
        collapsable: false,
        children: [
          '/develop/layout','/develop/router','/develop/page','/develop/theme','/develop/service','/develop/mock'
        ]
      },
      {
        title:'Advanced',
        collapsable: false,
        children: [
          '/advance/i18n','/advance/async','/advance/authority','/advance/login','/advance/guard','/advance/interceptors'
        ]
      },
      {
        title:'Other',
        collapsable: false,
        children: [
          '/other/upgrade','/other/community'
        ]
      }
    ],
    nextLinks: true,
    prevLinks: true,
  },
  plugins: ['@vuepress/back-to-top', require('./plugins/alert')],
  markdown: {
    lineNumbers: true
  }
}