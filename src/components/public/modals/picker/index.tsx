import { useState } from 'react'
import { Popup, Picker } from "@taroify/core"
import { renderGeneralModal } from "@/components/generalAnchor/data"
import { getPageInfo } from "@/path/acrossAPI"
import { getDefValue, showValue, NodeId, getDefIndex } from "./data"
import './index.scss'
export type TypeRangeItem = { [key: string]: any } | string
export interface TypePickerChange {
  value: number[],
  setRangeList: React.Dispatch<React.SetStateAction<TypeRangeItem[][]>>
  setValue: React.Dispatch<React.SetStateAction<any | any[]>>
}
export interface TypePicker {
  /**标题 @default 请选择 */
  title?: React.ReactNode,
  /**拦截点击确认按钮 传入此函数将拦截确认按钮并触发此函数 */
  onPrevent?: (p: { onAffirm: (param?: any | any[]) => void, onCancel: () => void, setLoading: React.Dispatch<React.SetStateAction<boolean>>, value: any | any[] }) => void,
  /**确认按钮文字 @default "取消" */
  confirmText?: React.ReactNode,
  /**取消按钮文字 @default "确认" */
  cancelText?: React.ReactNode,
  /**数据列表 */
  list: TypeRangeItem[][],
  /**默认选中的值,不传入则默认为[0,...] */
  value?: any | any[],
  /**标题需要读取哪个字段 @default title @default undefined */
  valueKey?: string,
  /**picker 改变执行，如果传入此函数，则需要手动设置选中的值 */
  onPickerChange?: (p: TypePickerChange) => void,
  /**是否为只读状态，只读状态下无法切换选项 @default false */
  readonly?: boolean,
  /**可见的选项相邻个数 @default 3 */
  siblingCount?: number,
  /**是否在点击遮罩层后关闭 @default true */
  closeable?: boolean
}
function Index(options: TypePicker & { resolve: (p: any | any[]) => void, reject: () => void, }) {
  const [show, onSetShow] = useState(true)
  const [rangeList, setRangeList] = useState<TypeRangeItem[][]>(options.list)
  const [checkValue, setValue] = useState<any | any[]>(getDefValue(options.value, options.list, options.valueKey))
  const [checkIndex, setIndex] = useState<number | number[]>(getDefIndex(options.value, options.list, options.valueKey))
  const [loading, setLoading] = useState(false)
  function onChange(ev: any | any[]) {
    if (typeof options.onPickerChange === "function") {
      options.onPickerChange({
        value: ev,
        setRangeList,
        setValue
      })
    } else {
      setValue(ev)
    }
    setIndex(getDefIndex(ev, options.list, options.valueKey))
  }
  function onCancel() {
    onSetShow(false)
    options.reject()
  }
  function onAffirm() {
    function run(param?: any | any[]) {
      onSetShow(false)
      options.resolve({
        value: param || checkValue,
        index: (checkIndex instanceof Array) ? (checkIndex.length === 1 ? checkIndex[0] : checkIndex) : checkIndex,
        item: options.list.length === 1 ? options.list[0][checkIndex[0]] : options.list.map((val, idx) => val[checkIndex[idx]])
      })
    }
    if (typeof options.onPrevent === "function") {
      options.onPrevent({ onAffirm: run, onCancel, value: checkValue, setLoading })
      return
    }
    run()
  }
  return (
    <Popup open={show} rounded placement="bottom" onClose={onCancel}>
      <Popup.Backdrop closeable={options.closeable}></Popup.Backdrop>
      <Picker loading={loading} readonly={options.readonly} siblingCount={options.siblingCount} value={checkValue} onChange={onChange} onCancel={onCancel} onConfirm={onAffirm}>
        <Picker.Toolbar>
          <Picker.Button>{options.cancelText || "取消"}</Picker.Button>
          <Picker.Title>{options.title || "请选择"}</Picker.Title>
          <Picker.Button>{options.confirmText || "确认"}</Picker.Button>
        </Picker.Toolbar>
        {rangeList.map((itemList, idx) => (
          <Picker.Column key={idx}>
            {(itemList instanceof Array) ? itemList.map((value, index) => (
              <Picker.Option key={index}>{showValue(value, options.valueKey)}</Picker.Option>
            )) : null}
          </Picker.Column>
        ))}
      </Picker>
    </Popup>
  )
}
export default function (params: TypePicker): Promise<{
  value: any | any[],
  index: number | number[],
  item: any | any[]
}> {
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
    function onResolve(ev) {
      resolve(ev)
      onClear()
    }
    function onReject() {
      reject()
      onClear()
    }
    renderGeneralModal({
      nodeId: NodeId,
      node: <Index {...params} resolve={onResolve} reject={onReject} />,
      nowPageID
    })
  })
}