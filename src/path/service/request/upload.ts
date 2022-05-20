import { createUpload } from '../package/miniprogram-addon'
import Taro from "@tarojs/taro"
import config from '../config'

// 传入原生方法。这样可以适配各个小程序平台
export const prequestUpLoad = createUpload(Taro.uploadFile, { baseURL: config.baseUploadURL })