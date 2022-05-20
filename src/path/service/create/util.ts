import TaroStorage from "@path/tool/storage"
import { PQRequest } from '../package/types'
/**判断是否缓存 */
export function isCache(finalOption: PQRequest & { cacheType?: "sessionStorage" | "localStorage", cacheTime?: number }) {
  const _storageKey = JSON.stringify({
    url: finalOption.path,
    data: finalOption.data || {},
    header: finalOption.header || {}
  })
  let _returnData = null
  if (finalOption.cacheType === "sessionStorage" || finalOption.cacheType === "localStorage") {
    const _data = finalOption.cacheType === "sessionStorage" ? TaroStorage.getSessionStorage(_storageKey) : TaroStorage.getLocalStorage(_storageKey)
    if (_data?.response != null) _returnData = _data?.response
  }
  return {
    isAwait: !!_returnData,
    onAwait(resolve) {
      setTimeout(() => {
        resolve(_returnData)
      }, 100);
    },
    onCache(res: any) {
      if (finalOption.cacheType === "sessionStorage") {
        TaroStorage.setSessionStorage(_storageKey, {
          response: res,
          request: finalOption
        })
      }
      if (finalOption.cacheType === "localStorage") {
        TaroStorage.setLocalStorage(_storageKey, {
          response: res,
          request: finalOption
        }, finalOption.cacheTime)
      }
    }
  }
}
const cacheMap: Map<string, { list: { request: any, backtrack: { resolve: Function, reject: Function } }[], request: any }> = new Map()
/**是否有相同的请求 */
export function merageRequest(finalOption: PQRequest) {
  const _storageKey = JSON.stringify({
    url: finalOption.path,
    data: finalOption.data || {},
  })

  /**得到请求结果后触发请求 */
  function onTrigger({ response, isSuccess }) {
    const _newCacheMapData = cacheMap.get(_storageKey)
    const _list = _newCacheMapData?.list || []
    _list.map((v) => {
      isSuccess ? v.backtrack.resolve(response) : v.backtrack.reject(response)
    })
    cacheMap.delete(_storageKey)
  }
  // 判断当前请求是否处于等待中
  const _cacheMapData = cacheMap.get(_storageKey)
  if (!_cacheMapData) {
    cacheMap.set(_storageKey, {
      list: [],
      request: finalOption
    })
  }
  return {
    isAwait: !!_cacheMapData,
    onAwait(resolve, reject) {
      const _cacheList = _cacheMapData?.list || []
      _cacheList.push({
        request: finalOption,
        backtrack: { resolve, reject },
      })
      cacheMap.set(_storageKey, {
        list: _cacheList,
        request: finalOption
      })
    },
    onSuccess(res: any) {
      onTrigger({ response: res, isSuccess: true })
    },
    onError(res: any) {
      onTrigger({ response: res, isSuccess: false })
    }
  }
}