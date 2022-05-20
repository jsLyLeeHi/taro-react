export default {
  /**超时时间 */
  timeout: 50000,
  /**token缓存时间 */
  tokenCatcheTime: 86400000 * 2,
  /**错误重试次数 */
  retryCount: 2,
  /**请求域名 */
  baseURL: "http://192.168.62.119:8005",//
  // baseURL: "",//正式服
  /**上传文件 */
  // baseUploadURL: "http://192.168.62.119:8003",
  baseUploadURL: "",
}
/**服务器上的用户图片地址 */
export const imageUrl = "" //图片地址1
/**静态图片地址 */
export const imagecommonUrl = ""
/**使用webIcon组件时，使用的iconfont图标加载地址 */
export const iconUrl = "http://at.alicdn.com/t/font_3128401_8o4uz692zdu.js"