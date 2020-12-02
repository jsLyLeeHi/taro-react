import Taro from '@tarojs/taro'


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

export function getUUid() {
  //生成一个UUID
  var s: string[] = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s['19'] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "";

  var uuid = s.join("");
  return uuid;
}



export function getPageStyle(style?: string | React.CSSProperties | undefined) {
  //返回style
  if (typeof style === 'string') {
    return getUnit(style)
  } else if (typeof style === 'object') {
    for (let key in style) {
      if (typeof style[key] === 'string') {
        style[key] = getUnit(style[key])
      }
    }
    return style
  }
  return {}
}

export function getUnit(str: string = '', h5Beilv = 46.88) {
  //单位转换
  if (typeof str === 'string' && str.indexOf('px') != -1) {
    if (Taro.ENV_TYPE.WEAPP === Taro.getEnv() || Taro.ENV_TYPE.ALIPAY === Taro.getEnv()) {
      return str.replace('px', 'rpx')
    } else if (Taro.ENV_TYPE.WEB === Taro.getEnv()) {
      let _str = str
      if (_str && _str.indexOf('px') != -1) {
        _str = _str ? _str.replace('px', '') : ''
        if (_str && Number(_str)) { _str = Number(_str) / h5Beilv + 'rem' }
      }
      return _str
    } else {
      return str.replace('px', 'rem')
    }
  }
  return str || ''
}


export function getComponentHeight(className: string = '') {
  //获取组件高度
  return new Promise((resolve, reject) => {
    if (!className) { reject; return }
    if (Taro.ENV_TYPE.WEAPP === Taro.getEnv()) {
      const query = Taro.createSelectorQuery().selectViewport().scrollOffset().in(this.$scope);
      query.select(className).boundingClientRect((rects) => {
        resolve(rects)
      }).exec();
    } else if (Taro.ENV_TYPE.ALIPAY === Taro.getEnv()) {
      Taro.createSelectorQuery()
        .select(className).boundingClientRect().exec((rects) => {
          resolve(rects[0])
        })
    } else {
      reject()
    }
  })
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
