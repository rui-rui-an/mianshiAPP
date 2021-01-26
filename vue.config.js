// 项目根目录中创建了`vue.config.js`
// 导包
const autoprefixer = require('autoprefixer')
// 导包
const pxtorem = require('postcss-pxtorem')
const path = require('path')
// 暴露出去
module.exports = {
  // css属性如何处理
  css: {
    // 处理的选项
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          // 使用 pxtorem库进行转换
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.join(__dirname, './src/style/var.less')]
    }
  }
}
