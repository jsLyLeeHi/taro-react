
import Taro from '@tarojs/taro'
const ENV_TYPE = process.env.TARO_ENV
const globalData = {}

const storage = {
    // 获取会话内存储的值
    getSessionStorage(key: string = '') {
        try {
            if (ENV_TYPE === 'h5') {
                // 对象方式获取值
                return JSON.parse(sessionStorage.getItem(key) || '').data
            } else {
                //小程序需要写入全局变量
                return globalData[key]
            }
        } catch (err) {
            return null
        }
    },
    // 写入会话内缓存
    setSessionStorage(key: string, value: any) {
        let tmpData = { data: value }
        try {
            if (ENV_TYPE === 'h5') {
                sessionStorage.setItem(key, JSON.stringify(tmpData))
            } else {
                globalData[key] = tmpData.data
            }
            return true
        } catch (err) {
            return false
        }
    },
    // 移除会话内的单个存储
    removeSessionStorage(key: string) {
        try {
            if (ENV_TYPE === 'h5') {
                // 对象方式获取值
                return sessionStorage.removeItem(key)
            } else {
                //小程序需要写入全局变量
                return delete globalData[key]
            }
        } catch (err) {
            return null
        }
    },
    //本地永久存储写入有效期，有效期内会取出来，失效后会清空
    setLocalStorage(key: string, value: any, exp: number) {
        let tmpData = { data: value, exp, startTime: new Date().getTime() }
        if (ENV_TYPE === 'h5') {
            // 对象方式获取值
            localStorage.setItem(key, JSON.stringify(tmpData))
        } else {
            //小程序需要写入全局变量
            Taro.setStorageSync(key, tmpData)
        }
    },
    // 处理数据本地数据缓存返回
    handleLocalDataBack(tmpData: any, key: string) {
        let returnData = null
        let date = new Date().getTime();
        // 如果有设置过期时间
        if (tmpData && tmpData.exp) {
            if (date - tmpData.startTime > tmpData.exp) {
                //缓存过期，清除缓存，返回false
                ENV_TYPE === 'h5' ? localStorage.removeItem(key) : Taro.removeStorageSync(key);
                returnData = null
            } else {
                //缓存未过期，返回值
                returnData = tmpData.data;
            }
        } else {
            returnData = tmpData
        }
        return returnData
    },
    // 移除所有的h5过期的本地缓存
    removeAllH5Exp() {
        let localItemsLength = localStorage.length
        let that = this
        for (let index = 0; index < localItemsLength; index++) {
            let key = localStorage.key(index) || ''
            that.handleLocalDataBack(JSON.parse(localStorage.getItem(key) || ''), key)
        }
    },
    // 移除所有的wx-mini过期的本地缓存
    removeAllWxMiniExp() {
        let that = this;
        Taro.getStorageInfo({
            success: function (res) {
                let keys = res.keys
                keys.forEach(key => {
                    that.handleLocalDataBack(Taro.getStorageSync(key), key)
                })
            }
        })
    },
    // 移除所有的本地存储
    removeAllLocal() {
        if (ENV_TYPE === 'h5') {
            localStorage.clear()
        } else {
            Taro.clearStorageSync()
        }
    },
    // 移除本地所有的过期的缓存
    removeAllLocalExp() {
        if (ENV_TYPE === 'h5') {
            this.removeAllH5Exp()
        } else {
            this.removeAllWxMiniExp()
        }
    },
    //本地取出存储的值
    getLocalStorage(key: string) {
        let tmpData = null
        if (ENV_TYPE === 'h5') {
            // 对象方式获取值
            tmpData = JSON.parse(localStorage.getItem(key) || '{}')
            return this.handleLocalDataBack(tmpData, key)
        } else {
            //小程序需要写入全局变量
            tmpData = Taro.getStorageSync(key) ? Taro.getStorageSync(key) : null
            return this.handleLocalDataBack(tmpData, key)
        }
    },
    //本地删除存储
    removeLocalStorage(key: string) {
        if (ENV_TYPE === 'h5') {
            // 对象方式获取值
            localStorage.removeItem(key)
        } else {
            //小程序需要写入全局变量
            Taro.removeStorageSync(key)
        }
    }
}

export default storage
