import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { ToolMask, ToolAnimate, ToolIcon } from '@components'
import './index.scss'
export interface P {
    onConfirm?: (idx) => void
    onCancel?: () => void
    buttons?: { text: string, color?: string }[]
    showClose?: Boolean
}
interface S {
    isShow: boolean
}
export interface TypeModalConfig {
    title: string
    content: JSX.Element | string
}
export default class Index extends Component<P, S & TypeModalConfig> {
    constructor(props) {
        super(props)
        this.state = {
            isShow: true,
            title: '',
            content: '',
        }
    }
    static defaultProps = {
        onConfirm: () => { },
        onCancel: () => { },
        showClose: false,
        buttons: []
    }
    onIsShow(parm: TypeModalConfig) {
        const _state = {
            isShow: true,
            title: parm.title,
            content: parm.content
        }
        this.setState(_state)
    }
    onIsHide() {
        this.setState({ isShow: false })
    }
    render() {
        const { buttons, showClose } = this.props
        const { isShow, title, content } = this.state
        const _bounceInDown = ['bounceIn'], _bounceOutDown = ['bounceOut']
        return <ToolMask isShow={isShow} renderModal={() => (
            <View className='modal-box'>
                <ToolAnimate animate={isShow ? _bounceInDown : _bounceOutDown}>
                    {() => (
                        <View className='modal'>
                            <View className='title'>{title || '提示'}</View>
                            {showClose ? <View className="close" onClick={this.props.onCancel && this.props.onCancel.bind(this)}>
                                <ToolIcon fontSize="24px" icon='iconcha' />
                            </View> : null}
                            <View className='text'>{content || ''}</View>
                            {buttons && buttons.length ? <View className='modal-footer'>
                                {buttons.map((val, idx) => {
                                    return <View key={idx + 'item'} className='footer-item' style={{ color: val.color }}
                                        onClick={this.props.onConfirm && this.props.onConfirm.bind(this, idx)}>{val.text}</View>
                                })}
                            </View> : null}
                        </View>
                    )}
                </ToolAnimate>
            </View>
        )} />
    }
}