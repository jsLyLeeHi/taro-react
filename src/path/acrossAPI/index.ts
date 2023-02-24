
import Taro from "@tarojs/taro"
import { XmDialogModal, XmToast } from "@components/public"
//跨端api
export * from "./domNode"



/**
 * 获取页面数据
 */
export function getPageInfo() {
  const _pages = Taro.getCurrentPages()
  const _now = _pages[_pages.length - 1]
  const list = _pages.map(val => {
    return {
      url: "/" + val?.route,
      routeID: val?.$taroParams?.$taroTimestamp
    }
  })
  return {
    route: "/" + _now?.route,
    routeID: _now?.$taroParams?.$taroTimestamp,
    list
  }
}


export function setTitle(text) {
  Taro.setNavigationBarTitle({
    title: text
  })
}

//调起微信支付
export function onRequestPayment(_rd) {
  return new Promise((resolve, reject) => {
    Taro.requestPayment({
      timeStamp: _rd.timeStamp,
      nonceStr: _rd.nonceStr,
      package: _rd.packages,
      signType: "MD5",
      paySign: _rd.sign,
      success: resolve,
      fail(fail) {
        if (fail.errMsg == "requestPayment:cancel" || fail.errMsg == "requestPayment:fail cancel") {
          XmToast.open("您取消支付了")
          reject()
        } else {
          XmDialogModal({ title: "提示", content: fail.errMsg }).finally(reject)
        }
      }
    });
  })
}

/**
 * 从本地相册选择图片或使用相机拍照。
*
*@supported — weapp, h5, rn, alipay, swan
*
*@example
*
*onChooseImg({
*  count: 1, // 默认9
*  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
*  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
*  success: function (res) {
*    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
*    var tempFilePaths = res.tempFilePaths
*  }
*})
*@see — https ://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseImage.html
*
 * @param options
 */
export function onChooseImg(options: Taro.chooseImage.Option = {}): Promise<string[]> {
  return new Promise((resolve, reject) => {
    Taro.chooseImage({
      count: 1,
      ...options,
      success(res) {
        resolve(res.tempFilePaths)
      },
      fail: reject
    })
  })
}




/** 把当前画布指定区域的内容导出生成指定大小的图片。在 `draw()` 回调里调用该方法才能保证图片导出成功。
 *
 * **Bug & Tip：**
 *
 * 1.  `tip`: 在 `draw` 回调里调用该方法才能保证图片导出成功。
 * @example
 * ```tsx
 * Taro.canvasToTempFilePath({
 *   x: 100,
 *   y: 200,
 *   width: 50,
 *   height: 50,
 *   destWidth: 100,
 *   destHeight: 100,
 *   canvasId: 'myCanvas',
 *   success: function (res) {
 *     console.log(res.tempFilePath)
 *   }
 * })
 * ```
 * @supported weapp, h5
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html
 */
export function canvasToTempFilePath(option: Taro.canvasToTempFilePath.Option, component?: Taro.General.IAnyObject | undefined): Promise<Taro.canvasToTempFilePath.SuccessCallbackResult> {
  return Taro.canvasToTempFilePath(option, component)
}

/**
 * 写入图片到本地
 * @param base64Str
 * @returns
 */
export function writeFile(base64Str: string): Promise<string> {
  const onHideLoading = XmToast.loading("读取中...")
  return new Promise((resolve, reject) => {
    let base64Image = base64Str; // 后台返回的base64数据的回车换行换为空字符''
    const fsm = Taro.getFileSystemManager();  //文件管理器
    // const FILE_BASE_NAME = 'tmp_base64src'; //文件名
    const format = 'png'; //文件后缀
    const timestamp = (new Date()).getTime();//获取一个当前时间戳，用于区分每一个小程序码，防止多次写进的小程序码图片都一样（建议通过不同的商品id来区分不同的小程序码）
    const buffer = Taro.base64ToArrayBuffer(base64Image),//base 转二进制
      filePath = `${Taro.env.USER_DATA_PATH}/${timestamp}.${format}`; //文件名
    fsm.writeFile({ //写文件
      filePath,
      data: buffer,
      encoding: 'binary',
      success() {
        Taro.getImageInfo({ //读取图片
          src: filePath,
          success: function (res) {
            onHideLoading()
            let img = res.path;
            resolve(img);//把需要画出来的图片的临时url暴露出去
          },
          fail() {
            onHideLoading()
            reject()
          },
        })
      },
      fail() {
        onHideLoading()
        reject()
      }
    })
  })
}


/**
 * 保存图片授权
 * @param imageUrl  图片地址
 * @returns
 */
export function onSaveImage(imageUrl: string) {
  return new Promise((resolve, reject) => {
    function save() {
      Taro.saveImageToPhotosAlbum({
        filePath: imageUrl,
        success() {
          resolve(true)
        },
        fail() {
          XmToast.open("图片保存失败")
          reject()
        }
      })
    }
    // 获取用户是否开启用户授权相册
    Taro.getSetting({
      success(res) {
        // 如果没有则获取授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          Taro.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              save()
            },
            fail() {
              XmDialogModal({ title: "提示", content: "您尚未授权保存图片，是否去授权？", confirmText: "去授权" }).then(() => {
                Taro.openSetting({
                  success() {
                    save()
                  }
                })
              }).catch(() => {
                XmToast.open("图片保存失败，您未授权")
                reject()
              })
            }
          })
        } else {
          save()
        }
      },
      fail() {
        XmToast.open("获取授权信息失败")
        reject()
      }
    })
  })
}
/** 获取图片信息。网络图片需先配置download域名才能生效。
  * @supported weapp, h5, rn, alipay, swan
  * @example
  * ```tsx
  * Taro.getImageInfo({
  *   src: 'images/a.jpg',
  *   success: function (res) {
  *     console.log(res.width)
  *     console.log(res.height)
  *   }
  * })
  * Taro.chooseImage({
  *   success: function (res) {
  *     Taro.getImageInfo({
  *       src: res.tempFilePaths[0],
  *       success: function (res) {
  *         console.log(res.width)
  *         console.log(res.height)
  *       }
  *     })
  *   }
  * })
  * ```
  * @see https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.getImageInfo.html
  */
export function getImageInfo(option: Taro.getImageInfo.Option) {
  return Taro.getImageInfo(option)
}

/**
 * 获取登录凭证
 */
export function getCode(): Promise<string> {
  return new Promise((resolve, reject) => {
    Taro.login({
      success(res) {
        if (res.errMsg === "login:ok") {
          resolve(res.code)

        } else {
          reject()
          XmToast.open('获取登录凭证失败！！！')
        }
      },
      fail() {
        reject()
        XmToast.open('获取登录凭证失败！！！')
      }
    })
  })
}

/**
 *切换小程序同步当前用户信息和登录状态
 *  **/

export function navigateToMiniProgram(option: Taro.navigateToMiniProgram.Option) {
  if (!option.appId) return;
  const _extraData = option.extraData || {}
  Taro.navigateToMiniProgram({
    appId: option.appId,
    extraData: _extraData
  });
}