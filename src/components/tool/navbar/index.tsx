import AppConfig from '@/app.config'
import { XmIcon } from '@/components/ui'
import { getPageInfo, setTitle } from '@/path/acrossAPI'
import { BaseRouter } from '@/path/router'
import { toTabbarIndex } from '@/path/router/routers'
import { View } from '@tarojs/components'
import Taro from "@tarojs/taro"
import React, { useEffect, useState } from "react"
import './index.scss'

function Index(props: { fixed?: boolean, color?: string, title?: string }) {
  const { statusBarHeight } = Taro.getSystemInfoSync()
  const pageLength = getPageInfo().list.length
  const [isTabbar, setIsTabbar] = useState(false)
  const { fixed = true } = props
  function onBack() {
    if (pageLength > 1) {
      BaseRouter.back()
    } else {
      toTabbarIndex()
    }
  }
  useEffect(() => {
    if (props.title) {
      setTitle(props.title)
    }
  }, [props.title])
  useEffect(() => {
    const tabbarList = AppConfig.tabBar.list
    const _nowPage = getPageInfo()
    const _isTabbar = !!tabbarList.find(v => `/${v.pagePath}` === _nowPage.route)
    setIsTabbar(_isTabbar)
  }, [])
  return (
    isTabbar ? <View className={`xm-navbar-tabbar-box ${fixed ? 'xm-navbar-fixed' : ''}`} style={{ marginTop: `${statusBarHeight}px` }}>
      {props.title ? <View className='xm-navbar-title s-lg-1' style={{ color: props.color }}>{props.title}</View> : null}
    </View> :
      <View className={`xm-navbar-box ${fixed ? 'xm-navbar-fixed' : ''}`} style={{ marginTop: `${statusBarHeight}px` }}>
        <View className='xm-navbar-icon' onClick={onBack}>
          <XmIcon color={props.color} icon={pageLength > 1 ? "back" : "home"} size={36} />
        </View>
        {props.title ? <View className='xm-navbar-title s-lg-1' style={{ color: props.color }}>{props.title}</View> : null}
      </View>
  )
}
export default React.memo(Index)
