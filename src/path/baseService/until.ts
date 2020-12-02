import GET_HTTP_STATUS from './HTTP_STATUS'
import { md5 } from './MD5'

/**
 * 验证网络请求状态是否正确
 */
export function filtrationHttp(res: Taro.request.SuccessCallbackResult<any>, next, error) {
    const HTTP_STATUS = GET_HTTP_STATUS(res.statusCode)
    if (HTTP_STATUS.state) {
        next()
    } else {
        error(res)
    }
}

/**
 * 验证返回的数据是否为需要的数据
 */
export function filtrationCode(trueCode: number) {
    return function (res: Taro.request.SuccessCallbackResult<any>, next, error) {
        if (Number(res.data.code) === trueCode) {
            next()
        } else {
            error(res)
        }
    }
}

/**
 * 验证QQ地理位置接口返回的数据是否为需要的数据
 */
export function filtrationQQCode(trueCode: number) {
    return function (res: Taro.request.SuccessCallbackResult<any>, next, error) {
        if (Number(res.data.status) === trueCode) {
            next()
        } else {
            error(res)
        }
    }
}

/**
 * 验证返回的数据是否为需要的数据
 */
export function filtrationUploadCode() {
    return function (res: Taro.request.SuccessCallbackResult<any>, next, error) {
        if (typeof res.data === 'string') {
            const resData = JSON.parse(res.data)
            if (resData.fileUrl) {
                next(resData.fileUrl)
            } else {
                error(resData)
            }
        }
    }
}


/**
 * 将请求数据转换为md5格式
 */
export function changeMD5(data: any) {
    if (data.hasOwnProperty('MD5')) {
        if (data.MD5) {
            let arr = data.MD5.split('&')
            // 声明一个字符串数组
            let newData: string[] = []
            arr.map((val) => {
                newData.push(data[val])
            })
            data['MD5'] = md5(arr.join('&') + '&=*' + newData.join('*')).toUpperCase()
        } else {
            // 声明两个字符串数组
            let a: string[] = [], b: string[] = []
            for (let key in data) {
                if (key != 'bNo') {
                    a.push(key)
                    b.push(data[key])
                }
            }
            data['MD5'] = md5(a.join('&') + '&=*' + b.join('*')).toUpperCase()
        }
    }
    return data
}