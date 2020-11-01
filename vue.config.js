let path = require('path')
const webpack = require('webpack')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const {getThemeColors, modifyVars} = require('./src/utils/themeUtil')
const {resolveCss} = require('./src/utils/theme-color-replacer-extend')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const productionGzipExtensions = ['js', 'css']
const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    nprogress: 'NProgress',
    clipboard: 'ClipboardJS',
    '@antv/data-set': 'DataSet'
  },
  css: [
  ],
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.3.4/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
    '//cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js',
    '//cdn.jsdelivr.net/npm/clipboard@2.0.6/dist/clipboard.min.js',
    '//cdn.jsdelivr.net/npm/@antv/data-set@0.11.4/build/data-set.min.js'
  ]
}

module.exports = {
  devServer: {
    port: 8085
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "./src/theme/theme.less")],
    }
  },
  configureWebpack: config => {
    config.entry.app = ["babel-polyfill", "whatwg-fetch", "./src/main.js"];
    config.performance = {
      hints: false
    }
    config.plugins.push(
      new ThemeColorReplacer({
        fileName: 'css/theme-colors-[contenthash:8].css',
        matchColors: getThemeColors(),
        injectCss: true,
        resolveCss
      })
    )
  // Ignore all locale files of moment.js
  config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
  // Compress resources into gzip format in production environment
  if (isProd) {
    // add `CompressionWebpack` plugin to webpack plugins
    config.plugins.push(new CompressionWebpackPlugin({
      algorithm:'gzip',
      test: new RegExp('\\.(' + productionGzipExtensions.join('|') +')$'),
      threshold: 10240,
      minRatio: 0.8
    }))
  }
  // if prod, add externals
  if (isProd) {
    config.externals = assetsCDN.externals
  }
},
chainWebpack: config => {
  // Turn off the colormin item of css compression in the production environment, because this optimization conflicts with the theme color replacement function
  if (isProd) {
    config.plugin('optimize-css')
      .tap(args => {
          args[0].cssnanoOptions.preset[1].colormin = false
        return args
      })
  }
  // Use CDN in production environment
  if (isProd) {
    config.plugin('html')
      .tap(args => {
        args[0].cdn = assetsCDN
      return args
    })
  }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: modifyVars(),
          javascriptEnabled: true
        }
      }
    }
  },
  publicPath: isProd ? '/vue-admin/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false
}
