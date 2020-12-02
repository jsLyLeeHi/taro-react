import Taro from '@tarojs/taro'
import compose from 'koa-compose'
import { RouterConfig, IRoute, NavigateOptions, NavigateType, ROUTE_KEY } from './common'
import { PageData } from './page-data'
import { formatPath } from './utils'

export class Router {
  private static _config?: RouterConfig

  /** 初始化配置 */
  static config(config: RouterConfig) {
    Router._config = config
  }
  /**
   * 页面跳转
   * @param route 目标路由对象
   * @param options 跳转选项
   */
  static async navigateFn<T = Taro.General.CallbackResult>(route: IRoute, options: NavigateOptions): Promise<T> {
    if (options.params![ROUTE_KEY]) throw Error('params 中 route_key 为保留字段，请用其他名称')
    const route_key = (options.params![ROUTE_KEY] = Date.now() + '')

    if (options.data) {
      PageData.setPageData(route_key, options.data)
    }

    const middlwares = [...(Router._config?.middlewares || []), ...(route.beforeRouteEnter || [])]
    const fn = compose(middlwares)
    await fn({ route, params: options.params })

    return new Promise((res, rej) => {
      PageData.setPagePromise(route_key, { res, rej })
    })
  }

  /**
   * 页面跳转
   * @param route 目标路由对象
   * @param options 跳转选项
   */
  static async navigateTo<T = Taro.General.CallbackResult>(route: IRoute, options?: NavigateOptions): Promise<T> {
    options = { ...{ type: NavigateType.navigateTo, params: {} }, ...options }
    let url = formatPath(route, options.params!)
    Taro.navigateTo({ url })
    return this.navigateFn(route, options)
  }

  /**
 * 页面跳转
 * @param route 目标路由对象
 */
  static async redirectTo<T = Taro.General.CallbackResult>(route: IRoute): Promise<T> {
    let options = { type: NavigateType.navigateTo, params: {} }
    let url = formatPath(route, options.params!)
    Taro.redirectTo({ url })
    return this.navigateFn(route, options)
  }

  /**
 * 页面跳转
 * @param route 目标路由对象
 */
  static async switchTab<T = Taro.General.CallbackResult>(route: IRoute): Promise<T> {
    let options = { type: NavigateType.navigateTo, params: {} }
    let url = formatPath(route, options.params!)
    Taro.switchTab({ url })
    return this.navigateFn(route, options)
  }

  /**
 * 页面跳转
 * @param route 目标路由对象
 */
  static async reLaunch<T = Taro.General.CallbackResult>(route: IRoute): Promise<T> {
    let options = { type: NavigateType.navigateTo, params: {} }
    let url = formatPath(route, options.params!)
    Taro.reLaunch({ url })
    return this.navigateFn(route, options)
  }



  /** 返回上一个页面 */
  static back() {
    return Taro.navigateBack()
  }

  /** 发送 backData、backError 数据到上一个页面 */
  static emitBack() {
    PageData.emitBack()
  }

  /**
   * 获取上一个页面携带过来的数据
   * @param default_data 默认数据
   */
  static getData<T = any>(default_data?: T): T | undefined {
    return PageData.getPageData(default_data)
  }

  /**
   * 返回上一个页面并返回数据。
   * 如果是 class 页面组件，请在页面级组件使用 @RouterEmit 装饰，
   * 如果是函数组件，请调用 useRouter，否则 backData 无法成功返回数据到上一个页面
   * @param data 返回的数据
   */
  static backData(data?: any) {
    PageData.setBackData(data)
    return Router.back()
  }

  /**
   * 返回上一个页面并抛出异常
   * 如果是 class 页面组件，请在页面级组件使用 @RouterEmit 装饰，
   * 如果是函数组件，请调用 useRouter，否则 backError 无法成功抛出异常到上一个页面
   * @param err 抛出的异常
   */
  static backError(err: any) {
    PageData.setBackError(err)
    return Router.back()
  }
}

