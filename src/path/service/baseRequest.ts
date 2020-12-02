import Taro from '@tarojs/taro'
import GET_HTTP_STATUS from './HTTP_STATUS'
import { notify } from '@components'

// function getHeader(header: Object = {}) {
//     let _header = {
//         'content-type': 'application/json;charset=UTF-8', // 默认值
//         'client_type': 'wechat_user', // 默认值
//         ...header
//     }
//     return _header
// }


const interceptor = function (chain) {
    const requestParams = chain.requestParams
    // requestParams['header'] = getHeader(requestParams.header || {})
    console.log(requestParams)
    return chain.proceed(requestParams).then(res => {
        //拦截http请求状态
        const _state = GET_HTTP_STATUS(res.statusCode)
        if (_state.success) {
            //拦截业务请求状态
            return res
        } else {
            notify.show({ type: 'danger', title: '_state.message' })
        }
        throw _state
    })
}
Taro.addInterceptor(interceptor)
export default Taro.request






