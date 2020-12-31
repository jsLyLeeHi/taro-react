import React from 'react'
import Notify from './index'
import { appendDom } from '../until'
import { TypeApi } from './index'

class Dialog {
    /**消息队列集合 */
    private actions: TypeApi[] = []
    /**队列是否执行中 */
    private isInStep: boolean = false
    private create() {
        return new Promise((resolve) => {
            const modal = <Notify ref={node => resolve(node)} />
            appendDom(modal, 'notify')
        })
    }
    /**
     * 执行队列
     */
    private actionsStep() {
        if (this.actions.length > 0) {
            this.isInStep = true
            const _param = this.actions[0]
            this.actions.shift()
            this.create().then((Ref: Notify) => {
                Ref.onIsShow(_param)
                setTimeout(() => {
                    this.actionsStep()
                }, (_param.timeout || 2000) + 400);
            })
        } else {
            this.isInStep = false
        }
    }
    show(param: TypeApi) {
        this.actions.push(param)
        if (!this.isInStep) {
            this.actionsStep()
        }
    }
    hide() {
        this.actions = []
        this.create().then((Ref: Notify) => {
            Ref.onIsHide()
        })
    }
}
export default new Dialog()