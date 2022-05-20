import { getPageInfo } from "@/path/acrossAPI"
import { getUrlParam, urlEncode } from "@path/tool/until"
import Taro from "@tarojs/taro"


/**获取小程序传入参数 */
export function getAppletParams() {
	const _pages = Taro.getCurrentPages()
	const _now = _pages[_pages.length - 1]
	return _now.options || null
}
/**将原始路由URL参数中加入路由标记 */
export function changeRouterUrl(url: string, key: string) {
  const routerParams = getUrlParam(url) || {}
  routerParams[key] = getPageInfo().routeID + ""
  let _url = urlEncode(routerParams)
  if (_url[0] === "&") {
    _url = _url.replace("&", "?")
  }
  return {
    url: url.split("?")[0] + (_url || ""),
    key: routerParams[key]
  }
}


export interface TypeUseFunceion { (res: { router: string; data: object }, next: (res?: any) => void, error: (msg?: string) => void): void }
export class MyCompose {
  protected useFunctions: any[] = []

  /**
   * 初始化函数执行前需要执行的函数
  */
  public use(fn: TypeUseFunceion) {
    if (typeof fn === 'function' && Array.isArray(this.useFunctions)) {
      this.useFunctions.push(fn)
    }
  }
  /**
   * 依次使用use函数传入的函数
  */
  protected runUse(cxt): Promise<any> {
    let i = 0
    let useFns = [...this.useFunctions]
    return new Promise((resolve, reject) => {
      function next() {
        const nextFn = useFns[i];
        i++
        if (!nextFn || typeof nextFn !== 'function') {
          resolve(true)
          return
        }
        nextFn(cxt, next.bind(this), reject);
      }
      next.call(this);
    })
  }
}
export function getKeyInMap(_map: Map<string, any>): string[] {
  const _list: string[] = [], _keys = _map.keys()
  for (const key of _keys) {
    _list.push(key)
  }
  return _list
}