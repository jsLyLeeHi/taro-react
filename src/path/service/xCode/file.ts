/**
 * 转换图片URL为base64地址
 * 压缩图片
 * @param imgURL 图片的URL地址
 * @param ratio 压缩率
 */
export const convertImgUrlToBase64 = (imgURL: string, ratio = 0.1): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.setAttribute('crossOrigin', 'Anonymous')
    img.src = imgURL
    img.onload = function () {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject('can not find 2d context')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      // const type = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase()
      // let dataURL = canvas.toDataURL("image/" + type, 0.8)
      // IOS下jpeg之外的图片越压缩越大
      let dataURL = canvas.toDataURL('image/jpeg', ratio)
      resolve(dataURL)
    }
    img.onerror = function (e) {
      reject('图片加载失败,错误详情:' + e)
    }
  })
}

/**
 * 转换base64为blob
 * @param dataURL base64文件
 */
export const convertBase64ToBlob = (dataURL: string): Promise<Blob> => {
  const arr = dataURL.split(',') || []
  const mime = arr[0]!.match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return Promise.resolve(new Blob([u8arr], { type: mime }))
}

/**
 * 将资源文件URL转换为Blob对象
 * @param imgURL 资源文件URL
 * @param callback 可选回调函数
 * @returns {Void|Promise} 有回调函数无返回,没有回调函数,返回Promise
 */
export const convertURLToBlob = (imgURL: string, callback?: (data: Blob) => void): any => {
  const http = new XMLHttpRequest()
  http.open('GET', imgURL, true)
  http.responseType = 'blob'
  http.send()
  if (callback) {
    http.onload = function () {
      if (this.status === 200 || this.status === 0) {
        callback(this.response)
      }
    }
  } else {
    return new Promise((resolve, reject) => {
      http.onload = function () {
        if (this.status === 200 || this.status === 0) {
          resolve(this.response)
        } else {
          reject(this.response)
        }
      }
    })
  }
}

/**
 * 获取文件类型
 */
export const getFileExt = (fileName: string) => {
  const ext = fileName.match(/\.([a-zA-Z]+)(?:[\?#]|$)/g)
  return ext && ext[0].toLowerCase()
}

/**
 * 获取文件名称
 */
export const isImg = (fileName: string) => {
  const exts = ['.jpg', '.jpeg', '.png']
  return exts.includes(getFileExt(fileName) || '')
}
