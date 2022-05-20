/**
 * 判断元素类型
 */
export const is = (ele: any) => {
  const type = Object.prototype.toString.call(ele)
  return type.match(/^\[object\s([A-Za-z]+)\]$/)![1].toLowerCase()
}

/**
 * 深拷贝
 * 参考: https://juejin.im/post/5d6aa4f96fb9a06b112ad5b1
 */
export const deepClone: (data: any, weakMap?: WeakMap<any, any>) => any = (data = {}, weakMap = new WeakMap()) => {
  const eleType = is(data)
  if (eleType === 'array') {
    let result = []
    for (let i in data) {
      result.push(deepClone(data[i]))
    }
    return result
  } else if (eleType === 'object') {
    // 解决对象属性循环引用
    const cacheData = weakMap.get(data)
    if (cacheData) return cacheData
    let result: { [index: string]: string } = {}
    // 这里可以考虑一下为什么set要在for循环之前
    weakMap.set(data, result)
    for (let i in data) {
      result[i] = deepClone(data[i], weakMap)
    }
    return result
  } else if (eleType === 'map') {
    let result = new Map()
    for (let [key, value] of data) {
      result.set(key, deepClone(value))
    }
    return result
  } else if (eleType === 'set') {
    let result = new Set()
    for (let value of data.values()) {
      result.add(deepClone(value))
    }
    return result
  } else if (eleType === 'symbol') {
    return Object(Symbol.prototype.valueOf.call(data))
  } else if (eleType === 'date') {
    return new Date(data)
  } else if (eleType === 'regexp') {
    const reFlags = /\w*$/
    const result = new data.constructor(data.source, reFlags.exec(data))
    result.lastIndex = data.lastIndex
    return result
  } else {
    return data
  }
}

/**
 * 数据类型树
 */
export const typeTree: (data: any) => any = (data) => {
  const eleType = is(data)
  if (eleType === 'array') {
    let result = []
    for (let i in data) {
      result.push(typeTree(data[i]))
    }
    return { type: eleType, value: result }
  } else if (eleType === 'object') {
    let result: { [index: string]: any } = {}
    for (let i in data) {
      result[i] = typeTree(data[i])
    }
    return { type: eleType, value: result }
  } else if (eleType === 'map') {
    let result = []
    for (let [key, value] of data) {
      result.push([typeTree(key), typeTree(value)])
    }
    return { type: eleType, value: result }
  } else if (eleType === 'set') {
    let result = []
    for (let value of data.values()) {
      result.push(typeTree(value))
    }
    return { type: eleType, value: result }
  } else if (eleType === 'symbol') {
    return { type: eleType, value: data.description }
  } else if (eleType === 'date') {
    return { type: eleType, value: data.getTime() }
  } else if (eleType === 'regexp') {
    return { type: eleType, value: [data.source, data.flags] }
  } else {
    return { type: eleType, value: data }
  }
}

// 解析数据类型树
export const resolveTypeTree = ({ type, value }: { type: string; value: any }): any => {
  const data = value
  if (type === 'array') {
    let result = []
    for (let i in data) {
      result.push(resolveTypeTree(data[i]))
    }
    return result
  } else if (type === 'object') {
    let result: { [index: string]: any } = {}
    for (let i in data) {
      result[i] = resolveTypeTree(data[i])
    }
    return result
  } else if (type === 'map') {
    let result = new Map()
    for (let [key, value] of data) {
      result.set(resolveTypeTree(key), resolveTypeTree(value))
    }
    return result
  } else if (type === 'set') {
    let result = new Set()
    for (let value of data.values()) {
      result.add(resolveTypeTree(value))
    }
    return result
  } else if (type === 'symbol') {
    return Symbol(data)
  } else if (type === 'date') {
    return new Date(data)
  } else if (type === 'regexp') {
    return new RegExp(data[0], data[1])
  } else {
    return data
  }
}

/**
 * 两个对象是否相等
 * @param data1 对比项1
 * @param data2 对比项2
 */
export const deepEqual: (data1: any, data2: any) => boolean = (data1, data2) => {
  const eleType = is(data1)
  const eleType2 = is(data2)
  if (eleType !== eleType2) return false
  if (eleType === 'array') {
    if (data1.length !== data2.length) return false
    for (let i = 0; i < data1.length; i++) {
      if (!deepEqual(data1[i], data2[i])) return false
    }
    return true
  } else if (eleType === 'object') {
    for (let i in data1) {
      if (!deepEqual(data1[i], data2[i])) return false
    }
    return true
  } else if (eleType === 'map') {
    for (let [key, value] of data1) {
      if (!deepEqual(key, key)) return false
      if (!deepEqual(value, value)) return false
    }
    return true
  } else if (eleType === 'set') {
    for (let value of data1.values()) {
      if (!deepEqual(value, value)) return false
    }
    return true
  } else if (eleType === 'symbol') {
    return data1.description === data2.description
  } else if (eleType === 'date') {
    return data1.getTime() === data2.getTime()
  } else if (eleType === 'regexp') {
    return data1.source === data2.source && data1.flags === data2.flags
  } else {
    return data1 === data2
  }
}

// deep merge common object
export const merge = <T>(...args: (Record<string, any> | undefined)[]): T => {
  return args.reduce((t, c) => {
    if (!c) return t

    const data = Object.entries(c)
    const length = data.length

    for (let i = 0; i < length; i++) {
      const [key, value] = data[i]

      if (is(value) === 'object') {
        t[key] = merge(t[key], value)
      } else {
        Object.assign(t, { [key]: value })
      }
    }

    return t
  }, {} as any)
}
