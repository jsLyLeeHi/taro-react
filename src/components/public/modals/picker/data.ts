export function getDefValue(p: any | any[], list: any[][], valueKey?: string) {
  let _value: any | any[] = (list && list[0] && list[0][0]) ? showValue(list[0][0], valueKey) : ""
  if (p != null) return p
  if ((list instanceof Array) && list.length > 1) {
    _value = list.map((v) => {
      return (v && v[0]) ? showValue(v[0], valueKey) : ""
    })
    return _value
  }
  return _value
}
export function getDefIndex(p: any | any[], list: any[][], valueKey?: string) {
  if (p == null) return list.map(_v => 0)
  const idxArr: number[] = []
  list.map((fList, fListIdx) => {
    idxArr.push(0)
    for (let idx = 0; idx < fList.length; idx++) {
      const value = fList[idx];
      if ((p instanceof Array) ? showValue(p[fListIdx], valueKey) === showValue(value, valueKey) : showValue(p, valueKey) === showValue(value, valueKey)) {
        idxArr[fListIdx] = idx
        break
      }
    }
  })
  return idxArr
}

export function showValue(value: string | { [key: string]: string }, valueKey?: string) {
  return (typeof value === "string" ? value : value[valueKey || "title"]) || ""
}
export const NodeId = "picker-modal-id"