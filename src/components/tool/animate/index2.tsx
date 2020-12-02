import React from 'react'
import { View } from '@tarojs/components'
import { TypeAnimate } from './type'
import { isEqual } from '../../../static/js/until'
// import './myanimate.scss'
import './animate.min.css'

interface P {
    renderChilden?: any,
    animate: TypeAnimate[],
    animateDuration: number,
    style: React.CSSProperties,
    animateFirstIn: boolean
}
interface S {
    animateEnd: boolean,
    animateClass: string
}
/**
 * @renderChilden 执行动画的元素 rednerProps函数 所有动画执行完毕将会收到参数animateEnd=true
 * @animate 需要依次执行的动画样式名称，动画需要依次执行
 * @animateDuration 单个动画执行时长
 * @animateFirstIn 是否初次进入就执行动画
 */
class Index extends React.Component<P, S> {
    constructor(props) {
        super(props)
        this.state = {
            animateEnd: true,
            animateClass: ''
        }
    }

    static defaultProps = {
        animate: [],
        animateDuration: 300,
        animateFirstIn: false,
        style: {}
    }
    timer: any = null
    componentWillReceiveProps(nextProps: P) {
        const { animate } = this.props
        if (!isEqual(nextProps.animate, animate)) {
            this.animateInit(nextProps)
        }
    }
    componentDidMount() {
        const { animateFirstIn } = this.props
        animateFirstIn && this.animateInit(this.props)
    }
    animateInit(nextProps: P) {
        const { animateDuration } = this.props
        let allDuration = animateDuration * nextProps.animate.length
        this.onCheckAnimateEnd(allDuration)
        this.setAnimate(nextProps.animate)
    }
    onCheckAnimateEnd(allDuration) {
        clearTimeout(this.timer)
        this.setState({
            animateEnd: false
        }, () => {
            this.timer = setTimeout(() => {
                this.setState({
                    animateEnd: true
                })
                clearTimeout(this.timer)
                this.timer = null
            }, allDuration || 0);
        })
    }
    animateTimer: any = null
    setAnimate(animate: TypeAnimate[]) {
        const { animateDuration } = this.props
        clearTimeout(this.animateTimer)
        let i = 0
        const _this = this
        function _Animate() {
            clearTimeout(_this.animateTimer)
            if (!animate[i]) return
            _this.setState({
                animateClass: animate[i]
            })
            _this.animateTimer = setTimeout(() => {
                clearTimeout(_this.animateTimer)
                _this.animateTimer = null
                i = i + 1
                if (animate[i]) {
                    _Animate()
                }
            }, animateDuration);
        }
        _Animate()
    }
    render() {
        const { animateEnd, animateClass } = this.state
        const { style } = this.props
        return <View style={style} className={`animated ${animateClass}`}>{this.props.renderChilden(animateEnd)}</View>
    }
}

export default Index