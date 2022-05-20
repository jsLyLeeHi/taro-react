import request from "./request"
/**请求hooks使用方式 @example https://pre-quest.vercel.app/#/use-request?id=%e5%ae%89%e8%a3%85 */
export { default as useRequest } from './request/useRequest'
/**上传文件 */
export * from './request/upload'
export default request