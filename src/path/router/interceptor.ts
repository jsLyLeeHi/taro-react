
import { mainPageList } from "@/app.config"
import { toUserLogin } from "./routers"
const _mainPages = [...mainPageList].map(val => { val.url = "/" + val.url; return val })
const routersPagesArr = [..._mainPages]
/**路由拦截器 */
export default [
  /**登录拦截 */
  function (ctx, next, error) {
    const needLoginItem = routersPagesArr.find(val => val.url === ctx.router)
    if (needLoginItem && needLoginItem.needLogin) {
      toUserLogin().then((res) => {
        if (res != null) {
          next()
        } else {
          error()
        }
      }).catch(() => {
        error()
      })
    } else {
      next()
    }
  },
]