import { createError, createRequestUrl, ErrorCode } from "../package/helper"
import { Config, PQRequest, PQResponse, Adapter } from '../package/types'
import { isCache, merageRequest } from "./util"
import { PreQuest } from "../package/core"
import { RequestCore } from './types'

export default function myCreate(core: RequestCore, options?: Config, wrapper = (v: Adapter) => v) {
  return PreQuest.create(wrapper(adapter(core)), options)
}
export function adapter(request: RequestCore) {
  return (opt: Config): Promise<PQResponse> => {
    return new Promise((resolve, reject) => {
      const finalOption = (opt || {}) as PQRequest
      const url = createRequestUrl(finalOption)


      const _cacheInfo = isCache(finalOption)
      if (_cacheInfo.isAwait) return _cacheInfo.onAwait(resolve)
      const _mergeInfo = merageRequest(finalOption)
      if (_mergeInfo.isAwait) return _mergeInfo.onAwait(resolve, reject)

      const { getNativeRequestInstance, cancelToken, ...rest } = finalOption

      const instance = request({
        url,
        ...rest,
        success(res) {
          resolve(res)
          _mergeInfo.onSuccess(res)
          _cacheInfo.onCache(res)
        },
        fail(e: any) {
          reject(e)
          _mergeInfo.onError(e)
        },
      })

      if (cancelToken) {
        cancelToken.promise.then(cancel => {
          if (!instance) return

          // 如果支持取消方法
          if (instance.abort) return instance.abort()

          // 如果不支持，则直接抛出错误
          reject(createError(ErrorCode.abort, cancel, opt))
        })
      }

      getNativeRequestInstance?.(instance)
    })
  }
}
