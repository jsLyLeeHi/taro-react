import BaseRouter from "./baseRouter"
import beforRouter from "./interceptor"
/**注册路由 */
const Router = new BaseRouter(beforRouter)
/**导出路由 */
export default Router

//--tabbar
/**跳转到 tabbar/index */
export function toTabbarIndex() {
  return Router.switch({ url: "/pages/tabbar/index/index" })
}
/**跳转到 tabbar/serve */
export function toTabbarManage() {
  return Router.switch({ url: "/pages/tabbar/serve/index" })
}
/**跳转到 tabbar/mine */
export function toTabbarMine() {
  return Router.switch({ url: "/pages/tabbar/mine/index" })
}

//--user-用户页面
/**跳转到 user/login 用户登录 页面 */
export function toUserLogin(params?: any) {
  return Router.navigate<null>({ url: "/pages/user/login/index" }, { data: params })
}