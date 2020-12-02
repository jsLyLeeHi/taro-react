import baseService from '@path/baseService'
import storage from '@static/js/storage'
import Taro from '@tarojs/taro'
import { modal, notify } from '@components'
/**
 * 获取用户经纬度信息，外加用户经纬度信息权限处理
 * loaction = { latitude: res.latitude, longitude: res.longitude}
 */
export function getUserLocation() {
    return new Promise((resolve, reject) => {
        /**
         * 用户位置信息权限处理
         */
        function getUserJurisdiction() {
            Taro.getSetting({
                success: (res) => {
                    // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
                    // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
                    // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
                    // 拒绝授权后再次进入重新授权
                    if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
                        // console.log('authSetting:status:拒绝授权后再次进入重新授权', res.authSetting['scope.userLocation'])
                        modal.show({
                            title: '位置授权',
                            content: '需要获取你的地理位置，请确认授权',
                            onConfirm() {
                                Taro.openSetting({
                                    success: function (dataAu) {
                                        // console.log('dataAu:success', dataAu)
                                        if (dataAu.authSetting["scope.userLocation"] == true) {
                                            //再次授权，调用wx.getLocation的API
                                            getWxLocation(dataAu)
                                        } else {
                                            reject()
                                        }
                                    }
                                })
                            },
                            onCancel() {
                                // notify.show({ title: '您已经取消了地理位置授权' })
                                reject()
                            }
                        })
                    }
                    // 初始化进入，未授权
                    else if (res.authSetting['scope.userLocation'] == undefined) {
                        // console.log('authSetting:status:初始化进入，未授权', res.authSetting['scope.userLocation'])
                        //调用wx.getLocation的API
                        getWxLocation(res)
                    }
                    // 已授权
                    else if (res.authSetting['scope.userLocation']) {
                        // console.log('authSetting:status:已授权', res.authSetting['scope.userLocation'])
                        //调用wx.getLocation的API
                        getWxLocation(res)
                    } else {
                        //未知授权状态,作为失败处理
                        reject()
                    }
                }
            })
        }
        /**
         * 微信获得经纬度
         * {latitude: res.latitude,longitude: res.longitude}
         */
        function getWxLocation(userLocation?: any) {
            Taro.getLocation({
                type: "wgs84",
                success: function (res) {
                    // console.log('getLocation:success', res)
                    const loaction = {
                        latitude: res.latitude,
                        longitude: res.longitude
                    }
                    resolve(loaction)
                },
                fail: function (res) {
                    // console.log('getLocation:fail', res)
                    if (res.errMsg === 'getLocation:fail:auth denied') {
                        reject()
                        return
                    }
                    if (!userLocation || !userLocation.authSetting['scope.userLocation']) {
                        getUserJurisdiction()
                    } else if (userLocation.authSetting['scope.userLocation']) {
                        modal.show({
                            title: '',
                            content: '请在系统设置中打开定位服务',
                            onConfirm: () => {
                                resolve()
                            },
                            onCancel: () => {
                                reject()
                            }
                        })
                    } else {
                        reject()
                    }
                }
            })
        }
        getWxLocation()
    })
}



/**
 * 调用地图接口，获取详细地理位置信息
 * 当前地址缓存1小时，时间超出则重新获取位置信息
 * @cacheTime 缓存时间  单位：小时
 * {id: 0,parentId: 0,areaName: '贵阳市',type: -1}
 */
export function getAddress(cacheTime = 1) {
    return new Promise((resolve, reject) => {
        const addressMsg = storage.getLocalStorage('userAddressInfo')
        if (addressMsg != null) {
            resolve(addressMsg)
            return
        }
        getUserLocation().then((res: any) => {
            return baseService.qqMapGet({
                location: `${res.latitude},${res.longitude}`,
            })
        }).then((res: any) => {
            const province = res.data.result.address_component
            const address = {
                id: 0,
                parentId: 0,
                areaName: province.city,
                type: -1
            }
            //当前地址缓存1小时，时间超出重新获取位置信息
            storage.setLocalStorage('userAddressInfo', address, 60 * 60 * 1000 * cacheTime || 1)
            resolve(address)
        }).catch(err => {
            notify.show({ title: '地理位置获取失败', type: 'danger' })
            reject(err)
        })
    })
}