import Lock from '../package/lock'
import TaroStorage from "@path/tool/storage"
import config from "../config"
import { userStore } from '@/store'
import { Router } from '@/path/router'
function newLock() {
  return new Lock({
    async getValue() {
      return TaroStorage.getLocalStorage('localToken')
    },
    async setValue(token) {
      TaroStorage.setLocalStorage('localToken', token, config.tokenCatcheTime)
    },
    async clearValue() {
      TaroStorage.removeLocalStorage('localToken')
    },
  })
}
export const lock = { current: newLock() }
const wrapper = { current: Lock.createLockWrapper(lock.current) }

/**获取token的请求接口 */
function onToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    getUserToken({
      id: userStore.userInfo._id
    }).then((res) => {
      resolve(res.data)
    }).catch(() => {
      lock.current = newLock()
      wrapper.current = Lock.createLockWrapper(lock.current)
      Router.toTabbarIndex()
      reject()
    })
  })
}
export default async function (ctx, next) {
  if (ctx.request.skipToken === true) return next()
  // wrapper 会将所有请求拦截在这里，直到获取到 token 之后才放行
  const token = await wrapper.current(onToken)
  ctx.request["header"] = {
    ...(ctx.request?.header || {}),
    "x-auth-token": token
  }
  await next()
}
