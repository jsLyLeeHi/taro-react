module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
    BASEURL: JSON.stringify('https://wechat.yzhao.net:8085'),
  },
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
