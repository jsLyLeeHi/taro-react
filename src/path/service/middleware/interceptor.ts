
import { XmToast } from '@/components/public'
import InterceptorMiddleware from '../package/interceptor'
const interceptor = new InterceptorMiddleware()
// 修改请求参数
interceptor.request.use((request) => {
  if (!request?.path) throw new Error('can not find path')
  // request.path = '/prefix' + request.path
  // 注意要将 request 参数返回
  return request
}, error => {
  XmToast.open(error.message)
  throw error
})

// 修改响应
interceptor.response.use((response) => {
  if (response.statusCode !== 200) {
    throw response?.data
  }
  if (response.data.success === false) {
    throw response?.data
  }
  return response.data
}, (error) => {
  throw error
})
export default interceptor