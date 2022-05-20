import { deepClone } from './object'

/**
 * 扁平化数组
 * @param arr 待处理的数组
 * @param idx 深度
 */
export const flatten = (arr: Array<any>, idx = 1): Array<any> => {
  if (Array.prototype.flat) {
    return Array.prototype.flat.call(arr, idx)
  }
  let count = 0
  return arr.reduce((flat, next) => flat.concat(Array.isArray(next) && ++count < idx ? flatten(next) : next), [])
}

/**
 * 随机排序数组
 * @param array 待排序数组
 * JavaScript专题之乱序:https://github.com/mqyqingfeng/Blog/issues/51
 */
export const shuffle = (array: Array<any>) => {
  let a = deepClone(array)
  let j, x, i
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i) // 取随机数组下标
    x = a[i - 1] // 取最后一个元素的值
    a[i - 1] = a[j] // 列表随机位置的值赋值到最后一个元素
    a[j] = x
  }
  return a
}
