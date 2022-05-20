// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  plugins: [
    [
      "import",
      {
        "libraryName": "@taroify/core",
        "libraryDirectory": "",
        "style": true,
      },
      "@taroify/core",
    ],
  ],
  presets: [
    ['taro', {
      framework: 'react',
      ts: true
    }]
  ]
}
