import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { TypeAnimate } from './type'
// import './myanimate.scss'
import './animate.scss'
interface P {
    children?: any,
    animate: TypeAnimate[],
    style?: React.CSSProperties,
    animateFirstIn?: boolean
}
/**
 * @children 执行动画的元素 rednerProps函数 所有动画执行完毕将会收到参数animateEnd=true
 * @animate 需要依次执行的动画样式名称，动画需要依次执行
 * @animateFirstIn 是否初次进入就执行动画
 */
export default function Index(props: P) {
    //单个动画执行时长
    const animateDuration = 500
    //动态执行并且 查询当前动画是否结束
    const useAnimateEnd = onCheckAnimateEnd(props.animate, animateDuration)
    const useAnimateClass = onGetAnimateClass(props.animate, animateDuration)
    return <View style={props.style || {}} className={`animated ${useAnimateClass}`}>{props.children && props.children(useAnimateEnd)}</View>
}
/**
 * 获取当前动画class
 * @param allDuration 动画总时长
 * @param animateArr 动画数组
 */
function onGetAnimateClass(animateArr: string[] = [], animateDuration = 500) {
    const [myAnimateClass, setAnimateClass] = useState('')
    useEffect(() => {
        setAnimate(animateArr, (_animateclass) => {
            //对不必要的视图更新拦截
            if (myAnimateClass !== _animateclass) {
                setAnimateClass(_animateclass)
            }
        })
        /**
         * 
         * @param animate //动画列表
         * @param callBack 回调函数
         */
        let animateTimer: any = null
        function setAnimate(animate: TypeAnimate[], callBack: (animateClass: string) => void) {
            clearTimeout(animateTimer)
            let i = 0
            function _Animate() {
                clearTimeout(animateTimer)
                if (!animate[i]) return
                callBack(animate[i])
                animateTimer = setTimeout(() => {
                    clearTimeout(animateTimer)
                    animateTimer = null
                    i = i + 1
                    if (animate[i]) {
                        _Animate()
                    }
                }, animateDuration);
            }
            _Animate()
        }
        return () => {
            clearTimeout(animateTimer)
        }
    }, [animateArr])
    return myAnimateClass
}
/**
 * 检查动画是否执行完成
 * @param allDuration 动画总时长
 * @param animateArr 动画数组
 */
function onCheckAnimateEnd(animateArr: string[] = [], animateDuration = 500) {
    let allDuration = animateDuration * animateArr.length
    const [animateEnd, setAnimateEnd] = useState(true)
    useEffect(() => {
        onCheckAnimateEnd(allDuration, (isEnd) => {
            if (animateEnd !== isEnd) {
                setAnimateEnd(isEnd)
            }
        })
        /**
         * 动画是否执行完毕的检测
         * @param allDuration //动画时长
         * @param callBack //动画执行完毕回调
         */
        let timer: any = null
        function onCheckAnimateEnd(allDuration, callBack: (isEnd: boolean) => void) {
            setAnimateEnd(false)
            timer = setTimeout(() => {
                clearTimeout(timer)
                timer = null
                callBack(true)
            }, allDuration || 0);
        }
        return () => {
            clearTimeout(timer)
        }
    }, [animateArr])
    return animateEnd
}