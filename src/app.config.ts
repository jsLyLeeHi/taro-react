export default {
  pages: [
    'pages/tabBarPages/index/index',
    'pages/tabBarPages/job/index',
    'pages/tabBarPages/mine/index',
    'pages/toolPage/selectCity/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  permission: {
    "scope.userLocation": {
      "desc": "开启定位服务，以便按照您的位置为您推荐更匹配的岗位信息"
    }
  },
  tabBar: {
    custom: true,
    color: '#212121',
    selectedColor: '#212121',
    backgroundColor: '#ebebeb',
    list: [
      { pagePath: 'pages/tabBarPages/index/index', text: '首页', iconPath: './static/images/tabBar/index.png', selectedIconPath: './static/images/tabBar/index-selected.png' },
      { pagePath: 'pages/tabBarPages/job/index', text: '岗位推荐', iconPath: './static/images/tabBar/job.png', selectedIconPath: './static/images/tabBar/job-selected.png' },
      { pagePath: 'pages/tabBarPages/mine/index', text: '我的', iconPath: './static/images/tabBar/mine.png', selectedIconPath: './static/images/tabBar/mine-selected.png' },
    ]
  },
}
