/**
 * 查找DOM
 */
export const $ = (name: string): HTMLElement | null => document.querySelector(name)

/**
 * 为元素添加类名
 * @param element DOM元素
 * @param value 要添加的类名
 */
export const addClassName = (element: HTMLElement, value: string) => {
  element.classList.add(value)
}

/**
 * 获取元素滚动位置
 */
export const getScrollPosition = () => {
  return {
    top: document.documentElement.scrollTop || document.body.scrollTop,
    left: document.documentElement.scrollLeft || document.body.scrollLeft,
  }
}

/**
 * 获取窗口大小
 */
export const getWindowSize = () => {
  return {
    width: globalThis.innerWidth || document.documentElement.clientWidth,
    height: globalThis.innerHeight || document.documentElement.clientHeight,
  }
}

/**
 * 元素后插入节点
 * @param newElement 要插入的新元素
 * @param targetElement 插入的目标元素
 */
export const insertAfter = (newElement: HTMLElement, targetElement: HTMLElement) => {
  const parent = targetElement.parentNode

  if (!parent) return

  if (parent.lastChild === targetElement) {
    parent.appendChild(newElement)
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling)
  }
}

/**
 * 动态插入 script 到 html
 * @param url
 * @param callback
 */
export const createScript = (url: string, callback?: () => void) => {
  const _script = document.createElement('script')
  _script.type = 'text/javascript'
  _script.async = true
  _script.src = url

  _script.onload = function () {
    callback && callback()
  }
  document.body.appendChild(_script)
}

/**
 * 获取DOM元素路径
 * @param ele DOM元素
 */
export const getDomPath = (ele: HTMLElement): string => {
  const prefix = ' '
  const parentNodeIsCommonNode = ele.parentElement && ele.parentElement.nodeType === 1

  if (!ele.parentElement || !ele.parentNode) return ''

  // 处理ID
  if (ele.id) {
    // 这里递归 ele.parentNode，类型不匹配
    return getDomPath(ele.parentElement) + `${parentNodeIsCommonNode ? prefix : ''}#${ele.id} `
  }

  // 处理类
  if (ele.className) {
    const classList: any = ele.classList
    const classDesc = ele.tagName.toLowerCase() + [...classList].map((n) => '.' + n).join('')
    if (parentNodeIsCommonNode) {
      const nodes = ele.parentNode.querySelectorAll(classDesc)
      if (nodes.length > 1) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i] === ele) {
            return (
              getDomPath(ele.parentElement) +
              `${(parentNodeIsCommonNode ? prefix : '') + classDesc}:nth-of-type(${i + 1})`
            )
          }
        }
      } else {
        return getDomPath(ele.parentElement) + (parentNodeIsCommonNode ? prefix : '') + classDesc
      }
    } else {
      return classDesc
    }
  }

  // 处理TAG标签
  if (parentNodeIsCommonNode) {
    // 这里注意是 children。 childNodes的话还包含字符串空白等无关的元素节点
    const nodes = ele.parentNode.children
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i] === ele) {
        return (
          getDomPath(ele.parentElement) +
          `${parentNodeIsCommonNode ? prefix : ''}${ele.tagName.toLowerCase()}:nth-child(${i + 1}) `
        )
      }
    }
  } else {
    return ele.tagName.toLowerCase()
  }

  return ''
}
