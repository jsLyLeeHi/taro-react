const path = require('path')
const config = {
  projectName: 'yizhao-work',
  date: '2020-8-5',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  resolve: {
      extensions: [".js", ".json", ".ts", ".tsx"],
  },
  alias: {
    '@components': path.resolve(__dirname, '..', 'src/components'),
    '@static': path.resolve(__dirname, '..', 'src/static'),
    '@path': path.resolve(__dirname, '..', 'src/path'),
    '@api': path.resolve(__dirname, '..', 'src/api')
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  defineConstants: {
    CONFIG: {
      APPID: JSON.stringify('wxbfd3801294e90fcb'),
      SECRET: JSON.stringify('096254ed4824a7f2d2139a48b5879680'),
      VERSION: JSON.stringify('1.0.0'),
      BASEURL: JSON.stringify('https://wechattest.yzhao.net:8081'),
      IMGLINK: JSON.stringify('https://imagecommon.yzhao.net')
    }
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
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
    }
  },
  h5: {
    esnextModules: ['taro-ui'],
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
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
