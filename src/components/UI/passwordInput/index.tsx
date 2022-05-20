import Taro from "@tarojs/taro"
import { View, Input, Text } from '@tarojs/components'
import React, { useEffect, useState } from 'react'
import { Loading } from "@taroify/core"
import './index.scss'

const tpx = (p: number) => Taro.pxTransform(p)
interface TypeProps {
  /**输入长度 */
  maxLength?: number,
  /**初始聚焦 */
  autoFocus?: boolean,
  /**是否显示加载中 */
  loading?: boolean,
  lable?: string,
  /**格子间距 */
  gutter?: number,
  /**单个格子宽高默认值100 */
  boxWH?: number,
  /**是否隐藏输入值 @default false */
  hidVal?: boolean,
  /**密码输入框展示类型 下划线类型 正方形类型 @default SquarePwd */
  type?: "UnderlinePwd" | "SquarePwd",
  /**满足输入条件时触发 */
  onAffirm?: (p: { value: string, onSetVal: React.Dispatch<React.SetStateAction<string>> }) => void,
  /**输入值 */
  onChange?: (ev: string) => void
}
function Index(props: TypeProps) {
  const _maxLength = props.maxLength || 6
  const [value, setValue] = useState("")
  const [focus, setFocus] = useState(props.autoFocus || false)
  /**生成默认的占位数组 */
  const [valueArr] = useState<string[]>(new Array(_maxLength).fill(''))
  useEffect(() => {
    setFocus(props.autoFocus || false)
  }, [props.autoFocus])
  function onSetVal(str: string) {
    setValue(str)
    if (typeof props.onChange === "function") props.onChange(str)
    if (str.length >= _maxLength && (typeof props.onAffirm === "function")) props.onAffirm({ value: str, onSetVal: setValue })
  }
  return (
    <View className="password-box-border">
      <View className="password-box" onClick={() => setFocus(true)} >
        {props.type === 'UnderlinePwd' ?
          <UnderlinePwd gutter={(props.gutter || 20) / 2} value={value} valueArr={valueArr.map((_, i) => value[i] || "")}
            focus={focus} boxWH={props.boxWH} hidVal={props.hidVal} /> :
          <SquarePwd gutter={(props.gutter || 20) / 2} value={value} valueArr={valueArr.map((_, i) => value[i] || "")}
            focus={focus} boxWH={props.boxWH} hidVal={props.hidVal} />}
        <Input disabled={props.loading} maxlength={_maxLength} onBlur={() => setFocus(false)} focus={focus} value={value} onInput={(e) => onSetVal(e.detail.value)} className="password-input" type="digit" />
      </ View>
      {props.lable ? <View className="password-box-lable s-sm c-red">{props.lable}</View> : null}
      {props.loading ? <View className="pay-word-mask">
        <Loading className="custom-color" size={Taro.pxTransform(40)} />
      </View> : null}
    </View>
  )
}
export default React.memo(Index)


//密码输入框
/**下划线类型的密码输入框 */
function UnderlinePwd(props: { valueArr: string[], focus: boolean, value: string, gutter: number, boxWH?: number, hidVal?: boolean }) {
  return <View className="password-underline">
    {props.valueArr.map((v, i) => (
      <View key={i} className={`password-underline-item ${v && "password-underline-item-ac"}`}
        style={{ marginLeft: tpx(props.gutter), marginRight: tpx(props.gutter), width: tpx(props.boxWH || 100), height: tpx(props.boxWH || 100) }}>
        {props.hidVal === true && v ? <View className="password-underline-dot"></View> : <Text>{v}</Text>}
        <View className={`${props.focus && (props.value.length !== i || 'password-underline-line-ac')} password-underline-line bg-main`}></View>
      </View>
    ))}
  </View>
}
/**正方形类型的密码输入框 */
function SquarePwd(props: { valueArr: string[], focus: boolean, value: string, gutter: number, boxWH?: number, hidVal?: boolean }) {
  return <View className="password-squarePwd">
    {props.valueArr.map((v, i) => (
      <View key={i} className={`password-squarePwd-item ${v && "password-squarePwd-item-ac"}`}
        style={{ marginLeft: tpx(props.gutter), marginRight: tpx(props.gutter), width: tpx(props.boxWH || 100), height: tpx(props.boxWH || 100) }}>
        {props.hidVal === true && v ? <View className="password-squarePwd-dot"></View> : <Text>{v}</Text>}
        <View className={`${props.focus && (props.value.length !== i || 'password-squarePwd-line-ac')} password-squarePwd-line bg-main`}></View>
      </View>
    ))}
  </View>
}
