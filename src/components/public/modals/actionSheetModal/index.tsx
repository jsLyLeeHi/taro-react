import { ActionSheet } from "@taroify/core"
import React, { useState } from 'react'
import { getPageInfo } from "@/path/acrossAPI";
import { renderGeneralModal } from "@/components/generalAnchor/data"

/**动作面板 */
export type TypeModalActionSheetItem<T> = T & { name?: React.ReactNode, disabled?: boolean, loading?: boolean, color?: string }
export interface TypeModalActionSheet<T> {
  title?: string,
  list: TypeModalActionSheetItem<T>[],
  /**拦截点击确认按钮 传入此函数将拦截确认按钮并触发此函数 */
  onPrevent?: (p: { onAffirm: () => void, onCancel: () => void, item: TypeModalActionSheetItem<T>, setLoading: (p: boolean) => void }) => void,
  cancelText?: string
  /**是否在点击遮罩层后关闭 @default true */
  closeable?: boolean
}
type TypeOptions<T> = TypeModalActionSheet<T> & { resolve: (p: TypeModalActionSheetItem<T>) => void, reject: () => void }
function Index<T>(props: TypeOptions<T>) {
  const [show, setShow] = useState(true)
  const [actionList, setActionList] = useState<TypeModalActionSheetItem<T>[]>(props.list || [])

  /**取消 */
  function onCancel() {
    props.reject()
    setShow(false);
  }
  /**确认按钮 */
  function onAffirm(ev: TypeModalActionSheetItem<T>, index: number) {
    function run(param?: any) {
      props.resolve(param || ev)
      setShow(false);
    }
    function setLoading(param: boolean) {
      const _list = [...actionList]
      _list[index].loading = param
      setActionList(_list)
    }
    if (typeof props.onPrevent === "function") {
      props.onPrevent({ onAffirm: run, onCancel, item: ev, setLoading })
      return
    }
    run()
  }
  return <ActionSheet open={show} onCancel={onCancel} onClose={onCancel} >
    <ActionSheet.Backdrop closeable={props.closeable}></ActionSheet.Backdrop>
    {props.title ? <ActionSheet.Header>{props.title}</ActionSheet.Header> : null}
    {(actionList instanceof Array) ? actionList.map((val, index) => (
      <ActionSheet.Action onClick={() => { onAffirm(val, index) }} key={index} name={val.name} loading={val.loading}
        disabled={val.disabled} style={val.color ? { color: val.color } : {}} />
    )) : null}
    {props.cancelText ? <ActionSheet.Button type="cancel">{props.cancelText}</ActionSheet.Button> : null}
  </ActionSheet>
}
export const NodeId = "action-sheet-modalid"
export default function <T>(params: TypeModalActionSheet<T>): Promise<any | TypeModalActionSheetItem<T>> {
  return new Promise((resolve, reject) => {
    const nowPageID = getPageInfo().routeID;
    function onClear() {
      setTimeout(() => {
        renderGeneralModal({
          nodeId: NodeId,
          node: null,
          nowPageID
        })
      }, 300);
    }
    function onResolve(ev: any | TypeModalActionSheetItem<T>) {
      resolve(ev)
      onClear()
    }
    function onReject() {
      reject()
      onClear()
    }
    renderGeneralModal({
      nodeId: NodeId,
      node: <Index<T> {...params} resolve={onResolve} reject={onReject} />,
      nowPageID
    })
  })
}
