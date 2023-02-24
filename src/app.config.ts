export const mainPageList = [
  //tabbar页面
  { url: 'pages/tabbar/index/index', needLogin: false },//介绍
  { url: 'pages/tabbar/serve/index', needLogin: false },//服务
  { url: 'pages/tabbar/mine/index', needLogin: false },//个人中心
  //用户相关
  { url: 'pages/user/login/index', needLogin: false },//登录页面
  //工具页面
  { url: 'pages/tool/imagePreview/index', needLogin: false},//图片预览页面
  { url: 'pages/tool/richTextPage/index', needLogin: false},//富文本展示页面
  { url: 'pages/tool/webViewPage/index', needLogin: false},//h5展示页面
]

export default {
  pages: mainPageList.map(val => val.url),
  tabBar: {
    custom: true,
    color: "#353535",
    selectedColor: "#353535",
    list: [
      {
        pagePath: "pages/tabbar/index/index",
        text: "首页",
        iconPath: "static/images/tabBar/home.png",
        selectedIconPath: "static/images/tabBar/home1.png"
      },
      {
        pagePath: "pages/tabbar/serve/index",
        text: "服务",
        iconPath: "static/images/tabBar/serve.png",
        selectedIconPath: "static/images/tabBar/serve1.png"
      },
      {
        pagePath: "pages/tabbar/mine/index",
        text: "个人中心",
        iconPath: "static/images/tabBar/mine.png",
        selectedIconPath: "static/images/tabBar/mine1.png"
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  permission: {
    "scope.userLocation": {
      desc: "需要获取您的位置"
    }
  }
}
