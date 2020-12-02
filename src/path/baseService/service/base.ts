import Taro from '@tarojs/taro'
import { notify } from '@components'
export default class Base {
    protected useFunctions: any[] = []
    protected changeableFunctions: any[] = []

    /**
     * 传入对返回数据做预处理的函数--这些预处理函数是固定的,使用之后将不会删除，下次请求将继续使用
     * @function(res, next, error)
     * 
     * @res 请求返回的参数
     * @next 对请求的参数做处理后执行下一步,如果next传入参数,那么请求的.then方法中将会接收到此参数
     * @error 执行此函数 请求接口将直接抛出错误，并且传入string错误信息提示用户,
    */
    public use(fn: baseService.useFunceion) {
        if (typeof fn === 'function' && Array.isArray(this.useFunctions)) {
            this.useFunctions.push(fn)
        }
    }
    /**
     * 传入对返回数据做预处理的函数--这些预处理函数是可变的,使用之后将删除
     * @function(res, next, error)
     * 
     * @res 请求返回的参数
     * @next 对请求的参数做处理后执行下一步,如果next传入参数,那么请求的.then方法中将会接收到此参数
     * @error 执行此函数 请求接口将直接抛出错误，并且传入string错误信息提示用户,
    */
    public useChangeable(fn: baseService.useFunceion) {
        if (typeof fn === 'function' && Array.isArray(this.changeableFunctions)) {
            this.changeableFunctions.push(fn)
        }
    }
    /** 
     * 请求失败时弹出对话框 
    */
    protected showToastOrModal(resData: any, fetchConfig?: baseService.fetchConfig) {
        let resMessage = resData.message || resData.msg || resData.err_msg || ('未知错误:' + JSON.stringify(resData))
        //确保在loading消失后再弹出对话框
        setTimeout(() => {
            if (fetchConfig?.toastType === 'notify' || fetchConfig?.toastType == null) {
                notify.show({
                    title: resMessage || '提示',
                    type: 'danger',
                    timeout: 2000
                })
            } else if (fetchConfig?.toastType === 'modal') {
                Taro.showModal({
                    title: '提示',
                    content: resMessage,
                    showCancel: false,
                    success: function (res) {
                        if (res.confirm && typeof fetchConfig?.confirm === 'function') {
                            fetchConfig.confirm()
                        }
                    }
                })
            } else if (fetchConfig?.toastType === 'toast') {
                Taro.showToast({ title: resMessage, icon: 'none' })
            }
        }, 20);
    }
    /** 
     * 格式化错误数据 
    */
    protected errModal(err_msg: string) {
        return {
            data: {
                msg: err_msg,
            }
        }
    }
    /**
     * 依次使用use函数传入的函数
    */
    protected runUse(res): Promise<any> {
        let i = 0
        let useFns = [...this.useFunctions, ...this.changeableFunctions]
        return new Promise((resolve, reject) => {
            let resData = res
            function next(newResData: any) {
                if (arguments.length) {
                    resData = newResData
                }
                let nextFn = useFns[i];
                i++
                if (!nextFn || typeof nextFn !== 'function') {
                    resolve(resData)
                    return
                }
                nextFn(resData, next.bind(this), reject);
            }
            next.call(this);
        })
    }
}