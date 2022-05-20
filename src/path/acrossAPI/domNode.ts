// import { $ } from "@path/likeJq"
import Taro from "@tarojs/taro"




// /**
//  * 获取元素的高度和距离顶部的距离
//  * @param id 
//  */
// export function getDomInfo(id: string): Promise<{ top: number, height: number, width: number }> {
//   return new Promise((resolve, reject) => {
//     setTimeout(async () => {
//       const _dom = $(id)
//       if (!_dom) {
//         reject()
//         return
//       }
//       Promise.all([_dom.top(), _dom.height(), _dom.width()]).then(([top, height, width]) => {
//         let _data = {
//           top,
//           height,
//           width
//         }
//         resolve(_data)
//       }, reject)
//     }, 30);
//   })
// }
/**
 * 获取元素的高度和距离顶部的距离
 * @param id 
 */
export function getDomInfo(id: string): Promise<{
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
}> {
  return new Promise((resolve, reject) => {
    if (!id) return reject()
    const query = Taro.createSelectorQuery()                // 创建节点查询器 query
    query.select(id).boundingClientRect()    // 这段代码的意思是选择Id=productServe的节点，获取节点位置信息的查询请求
    query.exec((res) => {
      if (res && res.length && res[0] != null) {
        resolve(res[0])
      } else {
        reject()
      }
    })
  })
}