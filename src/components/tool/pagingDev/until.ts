
import { useState } from 'react'
import { getSystemInfoSync } from "@tarojs/taro"
import { $ } from '@path/extend'

const wH = getSystemInfoSync().windowHeight
/**
 * 动态计算Scroll高度返回一个高度的响应值
 */
export function calculatePageH(id: string): number {
    const [_scrollH, setScrollH] = useState(0)
    Promise.all([getDomInfo(`#${id}box`), getDomInfo(`#${id}scrollbox`)]).then(([_domBoxInfo, _domInfo]) => {
        let _H = _domBoxInfo.height - _domInfo.top
        if (_domBoxInfo.height === _domInfo.top) {
            //由于ScrollView层的默认高度设置为了0
            //如果外层元素的高度等于ScrollView之于顶部的高度  那么此组件无论有没有外部元素包裹，高度实际上为手机高度
            _H = wH - _domInfo.top
        }
        setScrollH(_H)
    })
    return _scrollH
}
/**
 * 获取元素的高度和距离顶部的距离
 * @param id 
 */
export function getDomInfo(id: string): Promise<{ top: number, height: number }> {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            const _dom = $(id)
            if (!_dom) {
                reject()
                return
            }
            Promise.all([_dom.top(), _dom.height()]).then(([top, height]) => {
                let _data = {
                    top,
                    height
                }
                resolve(_data)
            }, reject)
        }, 30);
    })
}