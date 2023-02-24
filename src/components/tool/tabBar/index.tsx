import Taro from "@tarojs/taro"
import { View } from '@tarojs/components';
import YzImage from '@components/tool/image';
import { observer } from 'mobx-react'
import AppJson from "@/app.config";
import { deepClone } from '@/path/tool/until';
import { BaseRouter } from "@path/router"
import React, { useEffect, useRef } from "react"

import './index.scss'

/** 底部导航栏组件二次封装*/
function Index() {
  const tabBarConfig = useRef(deepClone(AppJson)?.tabBar)
  const _list = useRef(tabBarConfig.current?.list || [])
  const nowPage = useRef(getNowPage());
  /**获取tabbar栏目的图片 */
  function getTabBarImg(image: string) {
    const _src = image.split("tabBar/")[1]
    const requireContext = require(`@/static/images/tabBar/` + _src);
    return requireContext
  }
  function onRouter(url: string) {
    BaseRouter.switch({
      url: `/${url}`
    })
  }
  useEffect(() => {
    if (Taro.ENV_TYPE.ALIPAY === Taro.getEnv()) {
      Taro.hideTabBar()
    }
  }, [])

  function getNowPage() {
    const _p = Taro.getCurrentPages()
    return _p[_p.length > 0 ? _p.length - 1 : 0]
  }
  return (
    <View className="xm-tabbar bg-gray-2 iphonex-bottom">
      {_list.current.map((val, i) => (
        <View key={i} className="xm-tabbar-item s-md" onClick={() => onRouter(val.pagePath)}>
          <YzImage size="40*40" src={getTabBarImg(val.pagePath === nowPage.current.route ? val.selectedIconPath : val.iconPath)} />
          <View style={`color: ${val.pagePath === nowPage.current.route ? tabBarConfig.current.selectedColor : tabBarConfig.current.color};`}>{val.text}</View>
        </View>
      ))}
    </View>
  )
}

export default React.memo(observer(Index))