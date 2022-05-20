
import Taro from '@tarojs/taro'
import { XmDialogModal } from "@components/public"
/**
 * 获取用户经纬度信息，外加用户经纬度信息权限处理
 * loaction = { latitude: res.latitude, longitude: res.longitude}
 */
export function getUserLocation() {
  return new Promise<{ latitude: number, longitude: number }>((resolve, reject) => {
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
            // log('authSetting:status:拒绝授权后再次进入重新授权', res.authSetting['scope.userLocation'])
            XmDialogModal({ title: "授权", content: "需要获取你的地理位置，请确认授权" }).then(() => {
              Taro.openSetting({
                success: function (dataAu) {
                  // log('dataAu:success', dataAu)
                  if (dataAu.authSetting["scope.userLocation"] == true) {
                    //再次授权，调用wx.getLocation的API
                    getWxLocation(dataAu)
                  } else {
                    reject()
                  }
                }
              })
            }).catch(reject)
          }
          // 初始化进入，未授权
          else if (res.authSetting['scope.userLocation'] == undefined) {
            // log('authSetting:status:初始化进入，未授权', res.authSetting['scope.userLocation'])
            //调用wx.getLocation的API
            getWxLocation(res)
          }
          // 已授权
          else if (res.authSetting['scope.userLocation']) {
            // log('authSetting:status:已授权', res.authSetting['scope.userLocation'])
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
          // log('getLocation:success', res)
          const loaction = {
            latitude: res.latitude,
            longitude: res.longitude
          }
          resolve(loaction)
        },
        fail: function (res) {
          // log('getLocation:fail', res)
          if (res.errMsg === 'getLocation:fail:auth denied') {
            reject()
            return
          }
          if (!userLocation || !userLocation.authSetting['scope.userLocation']) {
            getUserJurisdiction()
          } else if (userLocation.authSetting['scope.userLocation']) {
            XmDialogModal({ title: "提示", content: "请在系统设置中打开定位服务" }).then(resolve).catch(reject)
          } else {
            reject()
          }
        }
      })
    }
    getWxLocation()
  })
}