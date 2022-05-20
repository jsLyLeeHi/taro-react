import Taro from "@tarojs/taro"
export type TypeMyRequest = {
  /**接口主路径 */
  baseURL: string
  /**接口路径 */
  path: string
}
export type TypePrerequest = Taro.request.Option & TypeMyRequest
export type TypePreresult = Taro.request.SuccessCallbackResult
export type TypeService<T> = {
  success: boolean,
  data: T
}
/// <reference types="./package/types" />

declare module './package/types' {
  interface PQRequest extends PQ.PresetOption {
    /**接口主路径 */
    baseURL: string
    /**接口路径 */
    path: string
    timeout?: number
    headers?: PQ.Common
    /**该接口是否不传入token @default false */
    skipToken?: boolean,
    /**是否显示loading @default loading */
    loading?: "loading" | boolean
    /**是否在点击遮罩层后关闭 @default true */
    closeable?: boolean
    /**缓存数据时间-时间戳 cacheTime<=0则永久缓存 默认永久缓存 @default 0 如果cacheType是sessionStorage则不需要设置缓存时间 */
    cacheTime?: number
    /**缓存方式，localStorage本地缓存，sessionStorage缓存 如果是sessionStorage则不需要设置缓存时间,默认当前小程序内缓存 */
    cacheType?: "localStorage" | "sessionStorage"
    /**失败提示的方式，"toast" | "dialog" @default toast */
    toastType?: "toast" | "dialog"
    /**错误重试次数 @default 2 */
    errorRetry?: number,
    /**错误重试条件 @requires boolean true 重试 false 不重试 */
    retryControl?: (opt: TypePrerequest, e?: Error) => boolean,
  }

  interface PQResponse<T> {
    success: boolean,
    data: T
    code: number
    message: string
    error: {
      code: number
      message: string
    }
  }
}

export { }
