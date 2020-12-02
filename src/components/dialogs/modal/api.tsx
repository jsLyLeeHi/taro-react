import React from 'react'
import Modal, { P, TypeModalConfig } from './index'
import { appendDom } from '../until'
type TypeApi = P & TypeModalConfig
const defItem = function () {
    return {
        title: '提示',
        content: "内容",
        buttons: [{ text: '取消' }, { text: '确认', color: '#39ccc4' }]
    }
}

class Dialog {
    constructor() {
    }
    private itemParam: TypeApi = defItem()
    /**弹窗队列集合 */
    private actions: TypeApi[] = []
    /**队列是否执行中 */
    private isInStep: boolean = false
    /**创建节点 */
    private create() {
        return new Promise((resolve) => {
            const modal = <Modal buttons={this.itemParam?.buttons} showClose={this.itemParam?.showClose}
                onCancel={this.itemParam?.onCancel} onConfirm={this.itemParam?.onConfirm} ref={node => resolve(node)} />
            appendDom(modal, 'modal')
        })
    }
    /**
     * 执行队列
     */
    private actionsStep() {
        if (this.actions.length > 0) {
            this.isInStep = true
            const _parm = this.actions[0]
            const __onConfirm = _parm.onConfirm ? _parm.onConfirm : () => { }
            const __onCancel = _parm.onCancel ? _parm.onCancel : () => { }
            const nextStep = () => {
                setTimeout(() => {
                    this.actionsStep()
                }, 520);
            }
            _parm.onConfirm = (_idx) => {
                nextStep()
                this.hide()
                __onConfirm(_idx)
            }
            _parm.onCancel = () => {
                nextStep()
                this.hide()
                __onCancel()
            }
            _parm['buttons'] = _parm?.buttons || [{ text: '取消' }, { text: '确认', color: '#39ccc4' }]
            this.itemParam = _parm
            this.create().then((Ref: Modal) => {
                Ref.onIsShow({ title: _parm.title, content: _parm.content })
            })
            this.actions.shift()
        } else {
            this.itemParam = defItem()
            this.isInStep = false
        }
    }
    /**
     * 向队列中添加数据 并且执行队列
     * @param title: string  弹窗标题
     * @param content: JSX.Element | string  弹窗内容
     * @param onConfirm:(index)=>{}?: 用户点击按钮，buttons?: { text: string, color?: string }[]
     * @param buttons?:  按钮列表，{ text: string, color?: string }[]
     * @param showClose?:  是否展示右上角关闭按钮
     * @example
     * ```tsx
     * modal.show({
     *   title: '嘿嘿',
     *   content: "阿萨阿萨",
     *   onConfirm: (idx)=>{
     *      if(idx===1){
     *          //do something
     *      }
     *   },
     *   buttons:[{ text: '取消' }, { text: '确认', color: '#39ccc4' }]
     * }).then((idx)=>{
     *      if(idx===1){
     *          //do something
     *      }
     *   })
     * ```
     */
    show(parm: P & TypeModalConfig) {
        return new Promise((resolve, reject) => {
            let _onConfirm = parm.onConfirm || function () { }
            parm['onConfirm'] = (idx) => {
                resolve(idx)
                _onConfirm(idx)
            }
            let _onCancel = parm.onCancel || function () { }
            parm['onCancel'] = () => {
                reject()
                _onCancel()
            }
            this.actions.push(parm)
            if (!this.isInStep) {
                this.actionsStep()
            }
        })
    }
    hide() {
        this.create().then((Ref: Modal) => {
            Ref.onIsHide()
        })
    }
}
export default new Dialog()