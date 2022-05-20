import Taro from "@tarojs/taro"
import pageData from "./pageData"
import { MyCompose, TypeUseFunceion } from "./until"
/**路由参数携带 */
export interface TypeRouterOptions {
  /**路由参数 只能在非tabbar页面使用，注意:tabbar页面不支持参数携带，传入也没用 */
  data?: any,
  /**在路由跳转之前做些啥 */
  before?: () => Promise<boolean>
}
class MyRouter extends MyCompose {
  constructor(beforRouterMiddleware?: TypeUseFunceion[] | TypeUseFunceion) {
    super()
    if (beforRouterMiddleware instanceof Array) {
      beforRouterMiddleware.map(val => {
        this.use(val)
      })
    }
    if (beforRouterMiddleware instanceof Function) {
      this.use(beforRouterMiddleware)
    }
  }
  /**
   * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 Taro.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
   * @param param 
   * @param data 
   */
  navigate<T>(params: Taro.reLaunch.Option, options: TypeRouterOptions = {}) {
    return new Promise<T | null>(async (resolve, reject) => {
      if (options.before instanceof Function) await options.before()
      this.runUse({ router: params.url, data: options.data || null }).then(() => {
        Taro.navigateTo({
          url: pageData.set(params.url, options.data || null, resolve).url,
        }).catch(reject)
      }, reject)
    })
  }
  /**
   * 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
   * @param param 
   * @param data 
   */
  redirect<T>(params: Taro.redirectTo.Option, options: TypeRouterOptions = {}) {
    return new Promise<T | null>(async (resolve, reject) => {
      if (options.before instanceof Function) await options.before()
      this.runUse({ router: params.url, data: options.data || null }).then(() => {
        Taro.redirectTo({
          url: pageData.set(params.url, options.data || null, resolve).url,
        }).catch(reject)
      }, reject)
    })
  }
  /**
   * 关闭所有页面，打开到应用内的某个页面
   * @param param 
   * @param data 
   */
  reLaunch<T>(params: Taro.reLaunch.Option, options: TypeRouterOptions = {}) {
    return new Promise<T | null>(async (resolve, reject) => {
      if (options.before instanceof Function) await options.before()
      this.runUse({ router: params.url, data: options.data || null }).then(() => {
        Taro.reLaunch({
          url: pageData.set(params.url, options.data || null, resolve).url,
        }).catch(reject)
      }, reject)
    })
  }
  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面,tabBar跳转不可携带参数
   * @param param 
   */
  switch(params: Taro.switchTab.Option, options: TypeRouterOptions = {}) {
    return new Promise<boolean>(async (resolve, reject) => {
      if (options.before instanceof Function) await options.before()
      this.runUse({ router: params.url, data: null }).then(() => {
        Taro.switchTab({
          url: params.url,
        }).then(() => {
          resolve(true)
        }).catch(reject)
      }, reject)
    })
  }
  /**
   * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。
   * 清空当前页面缓存的数据
   * @param delta 
   */
  back(params?: { delta?: number, data?: any }) {
    if (params?.data != null) pageData.setBackData(params?.data)
    Taro.navigateBack({ delta: params?.delta })
  }
  /**
   * 获取上一个页面传入的参数
   */
  getData<T>(): T {
    return pageData.get()?.data || null
  }
  /**
   * 设置当前页面返回上一页面需要携带的数据
   */
  setBackData<T>(data: T) {
    return pageData.setBackData<T>(data)
  }
}

export default MyRouter