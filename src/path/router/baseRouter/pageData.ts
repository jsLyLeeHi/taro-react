import { Current } from "@tarojs/taro"
import { deepClone, getUUid } from "@path/tool/until"
import { changeRouterUrl, getAppletParams } from "./until"
import { getPageInfo } from "@/path/acrossAPI"
import { getKeyInMap } from "./until"
/**路由的标识符key值 */
const routerKey = getUUid()
//原始路由参数
interface TypeRouterParams { [key: string]: any }
/**路由参数携带 */
export interface TypePageDataItem { [key: string]: any, data: any, callBack: (alue: unknown) => void, backData: any, key: string }

/**全局路由数据缓存数据 */
const routerPageData: Map<string, TypePageDataItem> = new Map()


/**设置路由值 @returns {url:新的路由地址 data:设置后的路由数据} */
function set(url: string, item: any, callBack: (value: unknown) => void = () => { }) {
  const routerData = changeRouterUrl(url, routerKey)
  const dataItem: TypePageDataItem = {
    data: item,
    callBack,
    backData: null,
    key: routerData.key
  }
  routerPageData.set(routerData.key, dataItem)
  return {
    data: deepClone(routerPageData),
    url: routerData.url
  }
}
/**获取路由数据 @returns TypePageDataItem */
function get() {
  const _params = getAppletParams() as unknown
  const TaroRouterParams: TypeRouterParams = (_params as TypeRouterParams) || { [routerKey]: "", data: null }
  return routerPageData.get(TaroRouterParams[routerKey]) as TypePageDataItem
}
/**设置页面返回携带的参数 */
function setBackData<T>(data: any): T {
  const _params = getAppletParams() as unknown
  const TaroRouterParams: TypeRouterParams = (_params as TypeRouterParams) || { [routerKey]: "", data: null }
  const item = routerPageData.get(TaroRouterParams[routerKey])
  if (item) {
    item["backData"] = data
  }
  return data
}
/**监听页面返回 */
function monitorPageBack(paged: TypePageDataItem) {
  if (paged?.callBack instanceof Function) paged.callBack(paged.backData || null)
  onKeepDataClear()
}
/**动态清空路由中无用的数据 */
function onKeepDataClear() {
  setTimeout(() => {
    const keysListInRouterPageData = getKeyInMap(routerPageData)
    const routeInfo = getPageInfo()
    keysListInRouterPageData.map((v) => {
      let isInRoute = false
      routeInfo.list.map((value) => {
        if (v === value.routeID + "") isInRoute = true
      })
      if (!isInRoute) {
        routerPageData.delete(v)
      }
    })
  }, 0);
}
Current['_page'] = Current.page
Object.defineProperties(Current, {
  page: {
    set: function (page) {
      if (page === undefined || page === null) {
        this._page = page
        return
      }
      const _pageData = get()
      const _fn = page.onUnload
      page.onUnload = function () {
        if (_fn instanceof Function) _fn(...arguments)
        monitorPageBack(_pageData)
      }
      this._page = page
    },
    get: function () {
      return this._page
    },
  },
})
export default {
  data: routerPageData,
  set,
  get,
  setBackData,
  monitorPageBack,
}