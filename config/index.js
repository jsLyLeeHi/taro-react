const path = require('path')
const config = {
  projectName: 'taro-react',
  date: '2021-9-7',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  alias: {
    //根目录
    '@': path.resolve(__dirname, '..', 'src'),
    //组件文件夹
    '@components': path.resolve(__dirname, '..', 'src/components'),
    //静态文件目录
    '@static': path.resolve(__dirname, '..', 'src/static'),
    //公用文件目录
    '@path': path.resolve(__dirname, '..', 'src/path'),
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  framework: 'react',
  // sass: {
  //   resource: path.resolve(__dirname, '..', 'src/static/scss/variable.scss')
  // },
  mini: {
    miniCssExtractPluginOption: {
      ignoreOrder: true, // https://github.com/NervJS/taro/issues/7160
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    webpackChain(chain) {
      chain.merge({
        module: {
          rule: {
            //全局注入锚点组件
            injectBaseComponentLoader: {
              test: /\.tsx$/,
              use: [{
                //锚点组件-全局组件锚点功能，路由返回监听锚点功能
                loader: path.resolve(__dirname, '../loaders/injectComponent/index.js'),
                options: {
                  importPath: '@components/generalAnchor',
                  componentName: "XmGeneralAnchor",
                  isPage(filePath) {
                    // 兼容 windows
                    const formatFilePath = filePath.replace(/\\/g, '/')
                    if ((formatFilePath.indexOf("/pages/") > -1) && (formatFilePath.indexOf("/index.tsx") > -1) && (formatFilePath.indexOf("/components/") === -1)) {
                      return true
                    }
                    return false
                  }
                },
              }],
            },
          },
        },
      });
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
