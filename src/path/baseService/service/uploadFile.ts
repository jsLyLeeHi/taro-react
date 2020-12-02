import Taro from '@tarojs/taro'
import Base from './base'
/**
 * 上传文件的二次封装
 */
export default class uploadFile extends Base {
    constructor(options: baseUpLoad.initOption) {
        super()
        this.options = options
    }
    private options: baseUpLoad.initOption

    /**
     * 上传文件
     * @reqOptions 允许重写请求的options
     * @fetchConfig 加载中展示的文字 和请求失败的弹窗配置
    */
    public uploadFile(reqOptions: baseUpLoad.Option, fetchConfig?: baseService.fetchConfig): Promise<Taro.uploadFile.SuccessCallbackResult & Taro.UploadTask> {
        const newOptions: Taro.uploadFile.Option = { ...this.options, ...reqOptions }
        const theUploadFile: Promise<Taro.uploadFile.SuccessCallbackResult & Taro.UploadTask> & Taro.UploadTask = Taro.uploadFile(newOptions)

        let UploadFile: Promise<Taro.uploadFile.SuccessCallbackResult & Taro.UploadTask> = new Promise((resolve, reject) => {
            fetchConfig?.loadingText && Taro.showLoading({ title: fetchConfig?.loadingText || '', mask: true })
            theUploadFile.then((res) => {
                fetchConfig?.loadingText && Taro.hideLoading()
                //使用use传入的方法，对不需要的数据拦截
                this.runUse(res).then((res) => {
                    this.changeableFunctions = []
                    resolve(res)
                }, (err) => {
                    fetchConfig?.loadingText && Taro.hideLoading()
                    if (Number(err.error) === 9) {
                        reject(this.errModal('请求已取消...'))
                        return
                    }
                    const errMsg = err.errMsg || err.errorMessage
                    if (errMsg) {
                        reject(this.errModal(errMsg))
                    } else {
                        reject(this.errModal('网络请求失败,请检查网络状态是否正常!!!'))
                    }
                })
            })
        })
        if (typeof theUploadFile.abort === 'function') { UploadFile['abort'] = theUploadFile.abort }
        if (typeof theUploadFile.offHeadersReceived === 'function') { UploadFile['offHeadersReceived'] = theUploadFile.offHeadersReceived }
        if (typeof theUploadFile.offProgressUpdate === 'function') { UploadFile['offProgressUpdate'] = theUploadFile.offProgressUpdate }
        if (typeof theUploadFile.onHeadersReceived === 'function') { UploadFile['onHeadersReceived'] = theUploadFile.onHeadersReceived }
        if (typeof theUploadFile.headersReceived === 'function') { UploadFile['headersReceived'] = theUploadFile.headersReceived }
        if (typeof theUploadFile.onProgressUpdate === 'function') { UploadFile['onProgressUpdate'] = theUploadFile.onProgressUpdate }
        if (typeof theUploadFile.progress === 'function') { UploadFile['progress'] = theUploadFile.progress }
        UploadFile.catch((err) => { this.showToastOrModal(err?.data, fetchConfig); this.changeableFunctions = [] })
        return UploadFile
    }
}