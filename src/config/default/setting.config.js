// This configuration is the default setting of the system. For the setting items that need to be modified, add the modified items in src/config/config.js. It can also be modified directly in this file.
module.exports = {
  lang: 'US', //Language, US(English)
  theme: {
    //theme
    color: '#1890ff', //theme color
    mode: 'dark', //theme mode can be dark, light and night
    success: '#52c41a', //Success color
    warning: '#faad14', //Warning color
    error: '#f5222d' //error color
  },
  layout: 'side', //Navigation layout, optional side and head, respectively side navigation and top navigation
  fixedHeader: false, //Fixed head status bar, true: fixed, false: not fixed
  fixedSideBar: true, //Fix the sidebar, true: fixed, false: not fixed
  fixedTabs: false, //Fixed tab header, true: fixed, false: not fixed
  pageWidth: 'fixed', //Content area width, fixed: fixed width, fluid: fluid width
  weekMode: false, //Color weak mode, true: open, false: not open
  multiPage: false, //Multi-tab mode, true: open, false: not open
  hideSetting: false, //Hide the setting drawer, true: hide, false: not hide
  systemName: 'Vue Admin', //system name
  copyright: '2020 Devteam Studio Produced', //copyright
  asyncRoutes: false, //Load routes asynchronously, true: enable, false: not enable
  showPageTitle: true, //Whether to display the page title (the page title in the PageLayout layout), true: display, false: not display
  filterMenu: true, //Filter the menu according to permissions, true: filter, false: no filter
  animate: {
    //Animation settings
    disabled: false, //Disable animation, true: disable, false: enable
    name: 'bounce', //Animation effects, please refer to ./animate.config.js for supported animation effects
    direction: 'left' //Animation direction, the direction of the animation when switching pages, refer to ./animate.config.js
  },
  footerLinks: [
    //Link at the bottom of the page, {link:'link address', name:'name/display text', icon:'icon, support ant design vue icon library'}
    { link: 'https://vuejs.org', name: 'Pro Home' },
    { link: 'https://github.com/Devteamvietnam/vue-admin', icon: 'github' },
    { link: 'https://ant.design', name: 'Ant Design' }
  ]
}
