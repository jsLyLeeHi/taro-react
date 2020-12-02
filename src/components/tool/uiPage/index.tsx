import React from 'react'
import { ScrollView, View } from '@tarojs/components'
import { getPageStyle } from '@static/js/until'
import { getPageId } from '@static/js/wxInfo'
import './index.scss'

interface P {
    renderTop?: React.ReactNode,
    children?: React.ReactNode,
    renderBottom?: React.ReactNode,
    style?: React.CSSProperties,
}
/**
 *页面组件  用于放一些通用组件
 */
export default function Index(props: P) {
    return <View className='UI-page' id={`${getPageId()}`} style={getPageStyle(props.style)}>
        {props.renderTop ? <View className='render-top'>{props.renderTop}</View> : null}
        <ScrollView scrollY className='page-box'>
            {props.children}
        </ScrollView>
        {props.renderBottom ? <View className='render-bottom'>{props.renderBottom}</View> : null}
    </View>
}