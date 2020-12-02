import Taro from '@tarojs/taro'
import Base from './base'
/**
 * 请求的二次封装
 */
export default class Service extends Base {
    constructor(option: Taro.request.Option) {
        super()
        this.option = option
    }
    private option: Taro.request.Option
    /**
     * 发起请求 
     * @reqOptions 允许重写请求的options
     * @fetchConfig 加载中展示的文字 和请求失败的弹窗配置
    */
    public request(reqOptions: baseService.reqOptions, fetchConfig?: baseService.fetchConfig): baseService.RequestTask<any> {
        const newOption = { ...this.option, ...reqOptions }
        const myfetch: Taro.RequestTask<any> = Taro.request(newOption)
        let fetch: baseService.RequestTask<any> = new Promise((resolve, reject) => {
            fetchConfig?.loadingText && Taro.showLoading({ title: fetchConfig?.loadingText || '', mask: true })
            myfetch.then((res) => {
                fetchConfig?.loadingText && Taro.hideLoading()
                //使用use传入的方法，对不需要的数据拦截
                this.runUse(res).then((useRes) => {
                    this.changeableFunctions = []
                    resolve(useRes)
                }, (err) => {
                    reject(err)
                })
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
        if (typeof myfetch.abort === 'function') { fetch['abort'] = myfetch.abort }
        if (typeof myfetch.offHeadersReceived === 'function') { fetch['offHeadersReceived'] = myfetch.offHeadersReceived }
        if (typeof myfetch.onHeadersReceived === 'function') { fetch['onHeadersReceived'] = myfetch.onHeadersReceived }
        fetch.catch((err) => { this.showToastOrModal(err?.data, fetchConfig); this.changeableFunctions = [] })
        return fetch
    }
}