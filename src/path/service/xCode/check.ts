import { is } from './object'

/**
 * 判断字符串是整数
 */
export const isInteger = (num: string) => /^-?\d+$/.test(num)

/**
 * 判断字符串是正数
 */
export const isPositiveNumber = (num: string) => /^\d+(\.\d+)?$/.test(num)

/**
 * 判断字符串是负数
 */
export const isNegativeNumber = (num: string) => /^-\d+(\.\d+)?$/.test(num)

/**
 * 判断字符串是正整数
 */
export const isPositiveInteger = (num: string) => /^\d+$/.test(num)

/**
 * 判断字符串是负整数
 */
export const isNegativeInteger = (num: string) => /^-\d+$/.test(num)

/**
 * 判断字符串是浮点数
 */
export const isFloat = (num: string) => /^-?\d+\.\d+$/.test(num)

/**
 * 判断字符串是正浮点数
 */
export const isPositiveFloat = (num: string) => /^\d+\.\d+$/.test(num)

/**
 * 判断字符串是负浮点数
 */
export const isNegativeFloat = (num: string) => /^-\d+\.\d+$/.test(num)

/**
 * 判断是身份证
 */
export const isIdCard = (value: string) =>
  /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
    value,
  )

/**
 * 判断是邮箱
 */
export const isEmail = (value: string) =>
  /^[0-9A-Za-z]+(\.[0-9A-Za-z]+)?@[0-9A-Za-z]+(\.[0-9A-Za-z]+)?\.[A-Za-z]+/.test(value)

/**
 * 数据是否为空
 * undefined、null、0、''、 {}、[] 判断为空
 */
export const isEmpty = (data: any): boolean => {
  switch (is(data)) {
    case 'undefined':
    case 'null':
    case 'string':
    case 'number':
      return !data
    case 'object':
      return !Object.keys(data).length
    case 'array':
      return !data.length
    case 'map':
    case 'set':
      return !data.size
  }
  return true
}
