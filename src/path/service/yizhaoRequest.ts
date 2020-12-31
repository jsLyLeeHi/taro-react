import Taro from '@tarojs/taro'
import taroStorage from '@static/js/storage'
import GET_HTTP_STATUS from './HTTP_STATUS'
import { notify } from '@components'

const baseUrl = CONFIG.BASEURL

function getHeader(header: Object = {}) {
    let _header = {
        'content-type': 'application/json;charset=UTF-8', // 默认值
        'client_type': 'wechat_user', // 默认值
        ...header
    }
    const _userInfo = taroStorage.getLocalStorage('userInfo')
    if (_userInfo) {
        _header['authorization'] = _userInfo.token
    }
    return _header
}


const interceptor = function (chain) {
    const requestParams = chain.requestParams
    requestParams['header'] = getHeader(requestParams.header || {})
    requestParams.url = baseUrl + requestParams.url
    return chain.proceed(requestParams).then(res => {
        //拦截http请求状态
        const _state = GET_HTTP_STATUS(res.statusCode)
        if (_state.success) {
            //拦截业务请求状态
            const _resData = res.data
            if (_resData.success) {
                return _resData
            }
            notify.show({ type: 'danger', title: _resData.message })
            return _resData
        }
        notify.show({ type: 'danger', title: _state.message })
        return _state
    }).catch((res) => {
        notify.show({ type: 'danger', title: res.errMsg })
        return res
    })
}
Taro.addInterceptor(interceptor)
export default Taro.request






