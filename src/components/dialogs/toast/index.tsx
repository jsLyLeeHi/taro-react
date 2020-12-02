import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { ToolMask, ToolAnimate, ToolIcon } from '@components'
import { IconType } from '../../tool/Icon'
import './index.scss'
interface P {
    onHide: () => void
}
interface S {
    loadingText: string
    isShow: boolean
    icon: IconType
}
export interface TypeApi { title: string, icon?: IconType, timeout?: number }
/**
 * loading组件
 * @param onHide 组件点击隐藏方法
 */
export default class Index extends Component<P, S> {
    constructor(props) {
        super(props)
        this.state = {
            loadingText: '',
            icon: '',
            isShow: false
        }
    }
    static defaultProps = {

    }
    onIsShow(pram: TypeApi) {
        this.setState({ isShow: true, loadingText: pram.title, icon: pram.icon || '' })
    }
    onIsHide() {
        this.setState({ isShow: false })
    }
    render() {
        const { isShow, loadingText, icon } = this.state
        let inAnimate = ['fadeIn'], outAnimate = ['fadeOut']
        return <ToolMask isShow={isShow} renderModal={() => (
            <View className='loading-box'>
                <ToolAnimate animate={isShow ? inAnimate : outAnimate}>
                    {() => {
                        return icon ? <View className='loadingIcon'>
                            <ToolIcon icon={icon} />
                            <Text className='text'>{loadingText || '加载中...'}</Text>
                        </View> : <View className='loadingToast'>
                                <Text>{loadingText || '加载中...'}</Text>
                            </View>
                    }}
                </ToolAnimate>
            </View>
        )} />
    }
}