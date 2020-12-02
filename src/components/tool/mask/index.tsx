import React from 'react'
import { View } from '@tarojs/components'
import { ToolAnimate } from '@components'
import classnames from 'classnames'
import './index.scss'

interface P {
    renderModal?: any,
    isShow: boolean,
}
/**
 *遮罩层组件 
 *@renderModal renderProps子组件返回参数中带有遮罩真正关闭的状态
 *@isShow 是否展示
 */
export default function Index(props: P) {
    const inAnimate = ['fadeIn'], outAnimate = ['fadeOut']
    return <ToolAnimate animate={props.isShow ? inAnimate : outAnimate}>
        {(animateEnd) => {
            return <View className={classnames({ mask: true, hide: !props.isShow && animateEnd })} onClick={(e) => { e.stopPropagation() }}>
                {props.renderModal(props.isShow)}
            </View>
        }}
    </ToolAnimate>
}