import config from "../config"
import errorRetryMiddleware from '../package/error-retry'
import { lock } from "./lockToken"

export default errorRetryMiddleware({
  // 错误重试次数
  retryCount: config.retryCount,

  // opt 为 Request 类型，通过该函数，你可以控制那些接口需要错误重试
  retryControl(_opt, e: any) {
    if ((e?.msg || e?.message) === "Token is not valid") {
      lock.current.clear()
      return true
    }
    return false
  },
})