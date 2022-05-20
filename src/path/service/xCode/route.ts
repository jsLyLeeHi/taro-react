/**
 * URL参数转对象
 * @param searchParams 字符串(默认location.search)
 */
export const convertSearchParamsToObj = (searchParams: string = location.search) => {
  const obj: Record<string, string> = {}
  if (globalThis.URLSearchParams) {
    const params: any = new URLSearchParams(searchParams)
    for (let i of params) {
      const [key, value] = i
      obj[key] = decodeURI(value)
    }
  } else {
    const param = searchParams.match(/([^&=\?]+)=?([^&]*)/g) || []
    for (let i of param) {
      const [key, value] = i.split('=')
      obj[key] = decodeURI(value)
    }
  }
  return obj
}

/**
 * 对象转URL参数
 * @param searchObj 默认空对象
 */
export const convertObjToSearchParams: (searchObj: Record<string, string>) => string = (searchObj = {}) => {
  let searchParams = ''
  for (let i in searchObj) {
    searchParams = searchParams + `${i}=${encodeURI(searchObj[i])}&`
  }
  return searchParams.slice(0, -1)
}

// reference: https://github.com/axios/axios/blob/master/lib/helpers/isAbsoluteURL.js
export function isAbsoluteURL(url: string) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}
