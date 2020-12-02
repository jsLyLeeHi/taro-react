import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { ToolAnimate } from '@components'
import classnames from 'classnames'
import './index.scss'

enum notifyType {
    'primary' = '#1989fa',
    'success' = '#07c160',
    'danger' = '#ee0a24',
    'warning' = '#ff976a',
}
export type NotifyState = 'primary' | 'danger' | 'success' | 'warning'
export type TypeApi = { title: string, type?: NotifyState, timeout?: number }

interface P {

}
interface S {
    loadingText: string
    type: NotifyState
    isShow: boolean
}
export default class Index extends Component<P, S> {
    constructor(props) {
        super(props)
        this.state = {
            loadingText: '',
            type: 'primary',
            isShow: true
        }
    }
    static defaultProps = {

    }
    onIsShow(p: TypeApi) {
        this.setState({ isShow: true, loadingText: p.title, type: p.type || 'primary' })
        setTimeout(() => {
            this.onIsHide()
        }, p.timeout || 2000);
    }
    onIsHide() {
        this.setState({ isShow: false })
    }
    onHide() {
        this.setState({ isShow: false })
    }
    render() {
        const { isShow, loadingText, type } = this.state
        const inAnimate = ['slideInDown'], outAnimate = ['slideOutUp']
        return <View className={classnames({ 'notify-box': true })}>
            <ToolAnimate animate={isShow ? inAnimate : outAnimate}>
                {(animateEnd: boolean) => {
                    return <View style={{ backgroundColor: notifyType[type] }} className={classnames({ 'notify': true, hide: !isShow && animateEnd })}>
                        <Text>{loadingText || 'notify...'}</Text>
                    </View>
                }}
            </ToolAnimate>
        </View>
    }
}