import React from 'react'
import Modal, { P, TypeModalConfig } from './index'
import { appendDom } from '../until'
type TypeApi = P & TypeModalConfig

class Dialog {
    constructor() {
    }
    /**创建节点 */
    private create(parm?: P) {
        return new Promise((resolve) => {
            const modal = <Modal onConfirm={parm?.onConfirm} ref={node => resolve(node)} />
            appendDom(modal, 'modal')
        })
    }
    /**
     * 向队列中添加数据 并且执行队列
     * @param parm 队列数据
     */
    show(param: TypeApi) {
        this.create().then((Ref: Modal) => {
            Ref.onIsShow({ ...param })
        })
    }
    hide() {
        this.create().then((Ref: Modal) => {
            Ref.onIsHide()
        })
    }
}
export default new Dialog()