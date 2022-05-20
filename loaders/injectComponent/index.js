
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./taro-inject-component-loader.cjs.production.min.js')
} else {
  module.exports = require('./taro-inject-component-loader.cjs.development.js')
}
