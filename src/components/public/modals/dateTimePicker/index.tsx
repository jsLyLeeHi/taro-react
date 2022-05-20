import React, { useEffect, useState } from 'react'
import { getPageInfo } from "@/path/acrossAPI";
import { DatetimePicker, Popup } from "@taroify/core"
import { DatetimePickerColumnType, DatetimePickerType } from "@taroify/core/datetime-picker/datetime-picker.shared";
import { renderGeneralModal } from "@/components/generalAnchor/data"
import dayjs from "dayjs";
import "./index.scss"

type TypeOptions = {
  /**标题 @default 请选择 */
  title?: React.ReactNode,
  /**拦截点击确认按钮 传入此函数将拦截确认按钮并触发此函数 */
  onPrevent?: (p: { onAffirm: (param?: any) => void, onCancel: () => void, setLoading: React.Dispatch<React.SetStateAction<boolean>> }) => void,
  /**确认按钮文字 @default "取消" */
  confirmText?: React.ReactNode,
  /**取消按钮文字 @default "确认" */
  cancelText?: React.ReactNode,
  /**返回的时间格式化 @default */
  template?: string,

  /**开始时间 @default 1970-01-01 */
  min?: Date
  /**结束时间 @default 2060-12-01 */
  max?: Date
  /**时间选择器展示的行 @default // ["year", "month", "day", "hour", "minute", "second"] */
  fields?: DatetimePickerColumnType[]
  /**选项过滤函数 */
  filter?(type: DatetimePickerColumnType, values: string[]): string[]
  /**选项格式化函数 */
  formatter?(type: DatetimePickerColumnType, value: string): string
  /**时间类型，可选值为 date time year-month month-day date-hour hour-minute @default datetime */
  type?: DatetimePickerType;
  /**默认选中的时间	 */
  defaultValue?: Date;
  /**选中的时间	 */
  value?: Date;
  /**是否为只读状态，只读状态下无法切换选项	 */
  readonly?: boolean;
  /**可见的选项相邻个数 @default 3 */
  siblingCount?: number;
  /**是否在点击遮罩层后关闭 @default true */
  closeable?: boolean
}

function Index(props: TypeOptions & { reject: () => void, resolve: (p: any) => void }) {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [defVal, setDefVal] = useState(props.value || new Date())
  /**取消 */
  function onCancel() {
    props.reject()
    setShow(false);
  }
  /**确认按钮 */
  function onAffirm() {
    function run(param?: any) {
      props.resolve(param || defVal)
      setShow(false);
    }
    if (typeof props.onPrevent === "function") {
      props.onPrevent({ onAffirm: run, onCancel, setLoading })
      return
    }
    run()
  }
  function onPickerChange(ev: Date) {
    setDefVal(ev)
  }
  useEffect(() => {
    setShow(true);
    if (props.value) {
      const _timestampValue = props.value.getTime()
      if (props.min) {
        const _timestampMin = props.min.getTime()
        setDefVal(_timestampValue < _timestampMin ? props.min : props.value)
      } else {
        setDefVal(props.value)
      }
    }
  }, [])
  return <Popup open={show} rounded onClose={onCancel} placement="bottom">
    <Popup.Backdrop closeable={props.closeable}></Popup.Backdrop>
    <DatetimePicker type={props.type} fields={props.fields} defaultValue={props.defaultValue} value={defVal} min={props.min} max={props.max}
      readonly={props.readonly} loading={loading} siblingCount={props.siblingCount} filter={props.filter} formatter={props.formatter} onChange={onPickerChange}>
      <DatetimePicker.Toolbar>
        <DatetimePicker.Button onClick={onCancel}>{props.cancelText || "取消"}</DatetimePicker.Button>
        <DatetimePicker.Title>{props.title || "请选择"}</DatetimePicker.Title>
        <DatetimePicker.Button type="confirm" onClick={onAffirm}>{props.confirmText || "确认"}</DatetimePicker.Button>
      </DatetimePicker.Toolbar>
    </DatetimePicker>
  </Popup>
}

const defaultFormatter = (_type: DatetimePickerColumnType, value: string) => {
  if (_type === "year") return value + "年"
  if (_type === "month") return value + "月"
  if (_type === "day") return value + "日"
  if (_type === "hour") return value + "时"
  if (_type === "minute") return value + "分"
  if (_type === "second") return value + "秒"
  return value
}
export const NodeId = "date-time-picker"
export default function (params: TypeOptions = {}): Promise<{ date: Date, formatDate: string }> {
  const defOptions: TypeOptions = {
    title: "请选择时间",
    min: new Date("1970-01-01"),
    max: new Date("2060-12-01"),
    value: new Date(),
    fields: ["year", "month", "day", "hour", "minute", "second"],
    formatter: defaultFormatter,
    closeable: false,
    ...(params || {})
  }
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
    function onResolve(ev: Date) {
      resolve({
        formatDate: dayjs(ev).format(defOptions.template),
        date: ev,
      })
      onClear()
    }
    function onReject() {
      reject()
      onClear()
    }
    renderGeneralModal({
      nodeId: NodeId,
      node: <Index {...defOptions} resolve={onResolve} reject={onReject} />,
      nowPageID
    })
  })
}