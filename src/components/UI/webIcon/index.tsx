import { Loading } from "@taroify/core"
import Taro from "@tarojs/taro"
import { View } from '@tarojs/components'
import React, { useEffect, useState } from "react";
import { fetchXml } from './libs/fetchXml';
import { generateTaroComponent } from './libs/generateTaroComponent';
import { iconUrl } from "@/path/service/config";
import './index.scss'
interface TypeProps {
  icon: string,
  className?: string,
  color?: string | string[],
  onClick?: () => void,
  /** @example "100*120" | 120 */
  size?: string | number,
  style?: React.CSSProperties
}
function Index(props: TypeProps) {
  const { size, icon = "", color, style } = props
  const { width = toPx(22), height = toPx(22), } = getWhStyle(size) || style || {}
  const [iconsPath, setDefIcons] = useState<string>("")
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetchXml(iconUrl).then((res) => {
      const data = generateTaroComponent(res, { trim_icon_prefix: "icon", color, icon })
      setDefIcons(data)
    }).finally(()=>{
      setLoading(false)
    })
  }, [icon, color])
  return <>
    <View onClick={props.onClick} className={"xm-icon " + (props.className || "")}
      style={{ width, height, backgroundImage: `url("${iconsPath}")`, ...(style || {}) }}>
      {loading && <Loading />}
    </View>
  </>
}
export default React.memo(Index)












function toPx(p: number) {
  return Taro.pxTransform(p)
}
function getWhStyle(size?: string | number) {
  const _obj: { width?: string, height?: string } = {};
  if (typeof size === "string" && size.length > 0) {
    const [w, h] = size.split("*");
    if (w) {
      _obj.width = toPx(Number(w))
      if (!h) _obj.height = toPx(Number(w))
    }
    if (h) {
      _obj.height = toPx(Number(h))
      if (!w) _obj.height = toPx(Number(h))
    }
  }
  if (typeof size === "number") {
    _obj.width = toPx(size)
    _obj.height = toPx(size)
  }
  if (!_obj.width && !_obj.height) return null
  return _obj;
}