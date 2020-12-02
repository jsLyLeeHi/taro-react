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
    show(param: TypeApi) {
        this.create().then((Ref: ToolLoading) => {
            Ref.onIsShow({ ...param })
        })
    }
    hide() {
        this.create().then((Ref: ToolLoading) => {
            Ref.onIsHide()
        })
    }
}
export default new Dialog()