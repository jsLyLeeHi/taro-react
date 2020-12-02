
import Taro from '@tarojs/taro'

/**
 * 获取微信小程序当前页面信息
 */
export function nowPage() {
    const pageArr = Taro.getCurrentPages()
    const _nowPage = pageArr[pageArr.length - 1]
    return _nowPage
}

/**
 * 获取当前页面ID
 * h5时为单页应用，因此H5中的页面ID为pageId='container'
 */
const boxId = 'ui-page'
export function getPageId() {
    const env = Taro.getEnv()
    let pageId = ''
    if (env === Taro.ENV_TYPE.WEAPP) {
        pageId = `${boxId}${nowPage().getPageId()}`
    } else if (env === Taro.ENV_TYPE.ALIPAY) {
        pageId = `${boxId}${nowPage().$viewId}`
    } else if (env === Taro.ENV_TYPE.WEB) {
        pageId = 'app'
    }
    return pageId
}