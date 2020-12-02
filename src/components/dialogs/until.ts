import { getPageId } from '@static/js/wxInfo'
import ReactDOM from 'react-dom'

export function appendDom(Dom, type: string) {
    const PAGEID = getPageId()
    const _viewId = PAGEID + (type || 'type')
    let viewedById = document.getElementById(_viewId);
    if (!viewedById) {
        const componentBox = createBox(PAGEID, type)
        const uiPage = document.getElementById(PAGEID);
        uiPage?.appendChild(componentBox)
        viewedById = componentBox
    }
    ReactDOM.render(Dom, viewedById);
}

/**
 * 为当前创建的组件生成一个盒子
 * @param PAGEID 当前页面ID
 * @param type 创建的组件类型
 */
export function createBox(PAGEID: string, type: string) {
    let _viewedById: any = null
    const _view = document.createElement('view')
    _view.id = PAGEID + (type || 'type')
    _viewedById = _view
    return _viewedById
}