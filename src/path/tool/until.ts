import Taro from "@tarojs/taro"
import { imageUrl, imagecommonUrl } from "@/path/service/config";
/**
 * 深拷贝
*/
export function deepClone<T extends Object>(obj: T): T {
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  let result: any
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result
}

/**
 * 判断是否全相等
*/
export function isEqual(obj1: any, obj2: any) {
  function isObj(obj1) {
    return typeof obj1 === 'object' && obj1 != null
  }
  if (!isObj(obj1) || !isObj(obj2)) {
    return obj1 === obj2
  }
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  if (obj1Keys.length !== obj2Keys.length) {
    return false
  }
  for (let key in obj1) {
    const res = isEqual(obj1[key], obj2[key])
    if (!res) {
      return false
    }
  }
  return true
}


/**数组扁平化  */
export function flatrn(arr) {
  //非数组
  if (!Array.isArray(arr)) return arr
  //已经是平级数组
  if (!arr.some(item => item instanceof Array)) return arr
  const res = Array.prototype.concat.apply([], arr)
  return flatrn(res)
}



/**生成一个随机字符串  */
export function randomWord(len = 4) {
  let str = "",
    range = len,
    d = new Date().getTime(),
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  for (let i = 0; i < range; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return `${d}${str}`;
}

/**生成随机字母 */
export function getRanLetter(len: number = 4) {
  var result: string[] = [];
  for (var i = 0; i < len; i++) {
    var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
    //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
    result.push(String.fromCharCode(65 + ranNum));
  }
  return result.join('');
}

export function getUUid() {
  //生成一个UUID
  var s: string[] = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr(((s['19'] as any) & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "";

  var uuid = s.join("");
  return uuid;
}

//函数防抖    不立即执行函数，在规定时间之后执行函数 interval(规定时间)
/**
 * @fn 执行函数
 * @interval  防抖时长
*/
export function debounce(fn, interval) {
  let timer: NodeJS.Timeout | null = null;
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null
    }, interval)
  }
}
/**将size转化为宽高 @example "100*100" | 100 */
export function getWhStyle(size?: string | number) {
  function toPx(p: number) {
    return Taro.pxTransform(p)
  }
  const _obj: { width?: string, height?: string } = {};
  if (typeof size === "string" && size.length > 0) {
    const [w, h] = size.split("*");
    if (w) {
      _obj.width = toPx(Number(w))
      if (!h) _obj.height = toPx(Number(w))
    }
    if (h) {
      _obj.height = toPx(Number(h))
      if (!w) _obj.height = toPx(Number(h))
    }
  }
  if (typeof size === "number") {
    _obj.width = toPx(size)
    _obj.height = toPx(size)
  }
  if (!_obj.width && !_obj.height) return null
  return _obj;
}

//函数节流     在某个时间间隔之后执行一次函数，类似阀门一样定期开放执行一次函数
/**
 * @fn 执行函数
 * @interval  防抖时长
*/
export function throttle(fn, interval = 100) {
  var timer: NodeJS.Timeout | null = null;     //触发时间
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null
    }, interval);
  }
}



export function replaceAll(str, AFindText, ARepText) {
  //替换字符串中所有的AFindText
  let raRegExp = new RegExp(AFindText, "g");
  return str.replace(raRegExp, ARepText);
}


export function encryptStr(str, regArr, ARepText = '*') {
  let regtext = '',
    Reg: any = null,
    replaceText = ARepText;
  //replaceStr('18819322663',[3,5,3],0)
  //result：188*****663
  regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
  Reg = new RegExp(regtext);
  let replaceCount = replaceText.repeat(regArr[1]);
  return str.replace(Reg, '$1' + replaceCount + '$2')
}

/**
 * 转换url参数
 * @param url
 * @returns
 */
export function getUrlParam(url): any {
  let query: any = null;
  function run(_str) {
    const pairs = _str.split("&");
    for (let i = 0; i < pairs.length; i++) {
      if (query == null) query = {}
      const pair = pairs[i].split("=");
      let _data: any = null
      if (pair[1] === "null") {
        _data = null
      } else if (pair[1] === "false") {
        _data = false
      } else if (pair[1] === "true") {
        _data = true
      } else if (pair[1] === "undefined") {
        _data = undefined
      } else {
        _data = pair[1];
      }
      query[pair[0]] = _data
    }
  }
  if (url.indexOf("?") != -1) {
    url = "?" + url.split("?")[1]
    const str = url.substr(1);
    run(str)
  } else {
    run(url)
  }
  return query;  // 返回对象
}

export function urlEncode(param: any, key?: any, encode?: any) {
  if (param == null) return '';
  var paramStr = '';
  var t = typeof (param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
};

/**打开文件 PDF等 */
export function onOpenFile(src: string) {
  Taro.downloadFile({
    url: src,
    success: function (res) {
      const filePath = res.tempFilePath
      Taro.openDocument({
        filePath: filePath,
      })
    }
  })
}

/**
 * 获取路由或者二维码参数
 * @returns
 */
export function getShareParams() {
  const _params = Taro.getCurrentInstance().router?.params
  const codeScene: any = _params?.scene
  const TaroRouterParams = _params
  if (codeScene) {
    return getUrlParam(decodeURIComponent(codeScene))
  } else if (JSON.stringify(TaroRouterParams) !== '{}') {
    return TaroRouterParams
  } else {
    return null
  }
}
/**不全base64 */
export function finishBase64(s: string) {
  if ((typeof s === "string") && s.indexOf('base64') > -1) return s
  return s ? "data:image/jpeg;base64," + s : ''
}
/**
 * 将图片转换为base64
 * @returns
 */
export function ImageToBase64(src: string): Promise<{ base64: string, soundBase64: string }> {
  return new Promise((resolve, reject) => {
    Taro.getFileSystemManager().readFile({
      filePath: src,
      encoding: "base64",
      success: (res: any) => {
        resolve({
          base64: finishBase64(res.data),
          soundBase64: res.data
        })
      },
      fail: reject
    })
  })
}

/**base64图片转为本地图片 */
export function base64ToSrc(base64data: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if ((typeof base64data === "string") && base64data.indexOf("http") > -1) {
      resolve(base64data)
      return
    }
    if (!base64data) {
      reject()
      return
    }
    const fsm = Taro.getFileSystemManager();
    const FILE_BASE_NAME = 'tmp_base64src'; //自定义文件名
    const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
    if (!format) {
      reject("ERROR_BASE64SRC_WRITE");
    }
    const filePath = `${Taro.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
    const buffer = Taro.base64ToArrayBuffer(bodyData);
    fsm.writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',
      success() {
        resolve(filePath);
      },
      fail() {
        reject("ERROR_BASE64SRC_WRITE");
      },
    });
  })
};

export function getImageSrc(src = "", staticImg: boolean = false) {
  if ((typeof src != "string") || !src) return `${imagecommonUrl}ver4/logo.png`;
  /**http图片 */
  if (src.indexOf("http") > -1) return src;
  /**base64图片 */
  if (src.indexOf("base64") > -1) return src;
  /**未拼接http的 http图片 */
  if ((src.indexOf(".gif") > 0) || (src.indexOf(".png") > 0) || (src.indexOf(".jpg") > 0) || (src.indexOf(".jpeg") > 0)) {
    return src ? `${staticImg ? imagecommonUrl : imageUrl}${src}` : "";
  }
  return finishBase64(src)
}

/**
 * 检测小程序更新
 */
export function onApplyUpdate() {
  if (Taro.canIUse('getUpdateManager')) {
    const updateManager = Taro.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          Taro.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res) {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
        updateManager.onUpdateFailed(function () {
          Taro.showModal({
            title: '已经有新版本了哟~',
            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
          })
        })
      }
    })
  } else {
    Taro.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
}

/**判断是否苹果X手机 */
export function isIphoneX() {
  const sys = Taro.getSystemInfoSync()
  return sys.screenHeight !== sys.safeArea.bottom
}

/**转化处理富文本 */
export function formatRichText(html: string) {
  let newContent = html.replace(/<img[^>]*>/gi, function (match) {
    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
    match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
    return match;
  });
  newContent = newContent.replace(/style="[^"]+"/gi, function (match) {
    match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
    return match;
  });
  newContent = newContent.replace(/<br[^>]*\/>/gi, '');
  newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
  return newContent;
}