import { useState } from "react"
import { TypePrerequest } from "../type"
import { UpperMethod } from '../package/types'
import service from "./index"

interface TypeRequest {
  /**该接口是否不传入token @default false */
  skipToken?: boolean,
  /**缓存数据时间-时间戳 cacheTime<=0则永久缓存 默认永久缓存 @default 0 如果cacheType是sessionStorage则不需要设置缓存时间 */
  cacheTime?: number
  /**缓存方式，localStorage本地缓存，sessionStorage缓存 如果是sessionStorage则不需要设置缓存时间,默认当前小程序内缓存 */
  cacheType?: "localStorage" | "sessionStorage"
  /**错误重试次数 @default 2 */
  errorRetry?: number,
  /**错误重试条件 @requires boolean true 重试 false 不重试 */
  retryControl?: (opt: TypePrerequest, e?: Error) => boolean,
  method?: UpperMethod,
}

/**请求hooks使用方式 @example https://pre-quest.vercel.app/#/use-request?id=%e5%ae%89%e8%a3%85 */
export default function useRequest<P, T>(url: string, config: TypeRequest, defResult: T) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [resData, setResData] = useState<T>(defResult)
  function run(params?: P) {
    return new Promise((resolve, reject) => {
      setLoading(true)
      setError(false)
      service<Taro.request.SuccessCallbackResult<T>>(url, { loading: false, data: params, ...(config || {}) }).then((res) => {
        setResData(res.data as unknown as T)
        resolve(res.data)
      }).finally(() => {
        setLoading(false)
      }).catch(() => {
        reject()
        setError(true)
      })
    })
  }
  return {
    run,
    resData,
    loading,
    error
  }
}