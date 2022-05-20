import Taro from "@tarojs/taro"
import config from "../config"
import interceptor from "../middleware/interceptor"
import lockToken from "../middleware/lockToken"
import errorTry from "../middleware/errorTry"
import loading from "../middleware/loading"
import errorModal from "../middleware/errorModal"
import create from "../create"
export * from "../type"


/**创建请求 文档: @example https://pre-quest.vercel.app/#/introduce */
const instance = create(Taro.request, {
  baseURL: config.baseURL,
  method: "GET",
  header: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})
//token无感刷新
instance.use(lockToken)
//错误重试
instance.use(errorTry)
//使用拦截器
instance.use(interceptor.run)
//loading
instance.use(loading)
//errorModal
instance.use(errorModal)


export default instance