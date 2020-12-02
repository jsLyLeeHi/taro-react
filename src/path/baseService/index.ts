import { Service, UploadFile } from './service'
import { filtrationHttp, filtrationCode, filtrationQQCode, filtrationUploadCode, changeMD5 } from './until'
// import Base from './service/base'
const baseUrl = CONFIG.BASEURL

//创建请求实例
const commonService = new Service({
    url: baseUrl,
    header: {
        "client_type": "wechat_user",
        "content-type": "application/json;charset=UTF-8"
    },
})
//过滤http请求
commonService.use(filtrationHttp)

/** get请求 */
function get(data: any, fetchConfig?: baseService.fetchConfig) {
    commonService.useChangeable(filtrationCode(0))
    return commonService.request({ data: changeMD5(data), method: 'GET' }, fetchConfig)
}
/** post请求 */
function post(data: any, fetchConfig?: baseService.fetchConfig) {
    commonService.useChangeable(filtrationCode(0))
    return commonService.request({ data: changeMD5(data), method: 'POST' }, fetchConfig)
}
/**
 * 根据经纬度获取地理位置
 * @param data 
 */
function qqMapGet(data) {
    commonService.useChangeable(filtrationQQCode(0))
    return commonService.request({
        url: 'https://apis.map.qq.com/ws/geocoder/v1?key=QQABZ-E6V3J-OXUF4-KLBTR-7KP65-A6BPN&get_poi=1',
        data,
        method: 'GET',
    })
}


//创建上传实例
const newUploadFile = new UploadFile({ url: `${baseUrl}?bNo=1907`, formData: { ShopNo: '100276' }, header: { "Content-Type": "multipart/form-data" } })
//过滤http请求
newUploadFile.use(filtrationHttp)

/** 上传文件 */
function upLoadFile(filePath: string, fetchConfig?: baseService.fetchConfig) {
    newUploadFile.useChangeable(filtrationUploadCode())
    return newUploadFile.uploadFile({ name: 'file', filePath }, fetchConfig)
}


export default { get, post, upLoadFile, qqMapGet }