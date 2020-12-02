import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { ToolImgCdn } from '@components'
import { Router } from '@path/router'
import Taro from '@tarojs/taro'
import './index.scss'
const AppJson = require('../../../app.config')
/**
 * 底部导航栏组件
 * 自动读取当前项目的app.config中的底部导航栏配置
 */
export default function Index() {
    const tabBarConfig = AppJson.default ? AppJson.default.tabBar : {}
    const [nowPage, setNowPage] = useState<string>('')
    const [isTabBarPage, setIsTabBarPage] = useState<Boolean>(false)

    useEffect(() => {
        const _pageList = Taro.getCurrentPages()
        const _nowPage = _pageList[_pageList.length > 0 ? _pageList.length - 1 : 0]
        setNowPage(_nowPage.route)
        const _item = tabBarConfig.list ? tabBarConfig.list.find(val => val.pagePath === _nowPage.route) : []
        setIsTabBarPage(!!_item)
    }, [])
    return isTabBarPage ? <View className='tabbar-box' style={{ backgroundColor: tabBarConfig.backgroundColor || '' }}>
        {tabBarConfig.list ? tabBarConfig.list.map((val, index) => {
            const selected = val.pagePath === nowPage
            return <View className='item' key={index} onClick={() => { Router.switchTab({ url: `/${val.pagePath}` }) }}>
                <ToolImgCdn src={getTabBarImg(selected ? val.selectedIconPath : val.iconPath)} size='40px*40px' />
                <View className='text' style={{ color: selected ? tabBarConfig.selectedColor : tabBarConfig.color }}>{val.text}</View>
            </View>
        }) : null}
    </View> : null
}

function getTabBarImg(src) {
    const requireContext = require.context('../../../', true, /\.(png|jpg)$/);
    return requireContext(src).default
}