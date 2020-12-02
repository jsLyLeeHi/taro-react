import React from 'react'
import ToolLoading from './index'
import { appendDom } from '../until'
import { TypeApi } from './index'


class Dialog {
    create() {
        return new Promise((resolve) => {
            const modal = <ToolLoading onHide={this.hide.bind(this)} ref={node => resolve(node)} />
            appendDom(modal, 'loading')
        })
    }

    /**消息队列集合 */
    private actions: TypeApi[] = []
    /**队列是否执行中 */
    private isInStep: boolean = false
    /**
     * 执行队列
     */
    private actionsStep() {
        if (this.actions.length > 0) {
            this.isInStep = true
            const _param = this.actions[0]
            this.actions.shift()
            this.create().then((Ref: ToolLoading) => {
                Ref.onIsShow(_param)
                setTimeout(() => {
                    this.hide()
                    setTimeout(() => {
                        this.actionsStep()
                    }, 520);
                }, _param.timeout || 2000);
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
        this.create().then((Ref: ToolLoading) => {
            Ref.onIsHide()
        })
    }
}
export default new Dialog()