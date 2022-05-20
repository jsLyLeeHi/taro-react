import Taro from '@tarojs/taro'
import config from "../config"
import { isJsonStr, isObj } from "@path/tool/verify"
/**单个文件上传 */
export function uploadFile(params: Taro.uploadFile.Option, options: { showLoading: boolean } = { showLoading: false }): Promise<{
  code: number
  data: string
  message: string
  success: boolean
}> {
  options.showLoading && Taro.showLoading({ title: '加载中' })
  params.url = params.url.indexOf("http") === 0 ? params.url : config.baseUploadURL + params.url
  const _params = {
    header: getUpLoadHeader(params.header || {}),
    ...params,
  }
  return Taro.uploadFile(_params).then((res: any) => {
    const _resData = isJsonStr(res.data) ? JSON.parse(res.data) : res.data
    if (isObj(_resData) && !_resData.success && _resData.msg) throw _resData
    if (res.statusCode !== 200) throw _resData
    return _resData
  }).catch((res) => {
    Taro.showToast(res.errMsg || res.msg)
    throw res
  }).finally(() => {
    Taro.hideLoading()
  })
}

function getUpLoadHeader(header: Object = {}) {
  let _header = {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    ...header
  }
  return _header
}


interface TypeUploadFileMoreParams {
  /** 开发者服务器地址 */
  url: string
  /** 要上传文件资源的路径 */
  filePath: string[]
  /** 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容 */
  name: string
  /** HTTP 请求 Header，Header 中不能设置 Referer */
  header?: TaroGeneral.IAnyObject
  /** HTTP 请求中其他额外的 form data */
  formData?: TaroGeneral.IAnyObject
  /** 超时时间，单位为毫秒 */
  timeout?: number
  /** 上传的文件名
   * @supported h5
   */
  fileName?: string
}
interface TypeUploadFileMore {
  code: number,
  data: string[],
  message: string,
  success: boolean,
}
/**多个文件上传 */
export function uploadFileMore(params: TypeUploadFileMoreParams, options: { showLoading: boolean } = { showLoading: false }): Promise<TypeUploadFileMore> {
  const _reqList = params.filePath.map(v => uploadFile({
    ...params,
    filePath: v
  }, options))
  return new Promise((resolve, reject) => {
    Promise.all(_reqList).then((res) => {
      const _data: TypeUploadFileMore = {
        code: 0,
        data: [],
        message: "",
        success: false,
      }
      res.map(v => {
        _data.code = v.code
        _data.message = v.message
        _data.success = v.success
        _data.data.push(v.data)
      })
      resolve(_data)
    }, reject)
  })
}