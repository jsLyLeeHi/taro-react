
import Taro from "@tarojs/taro"
import { View } from '@tarojs/components'
import React from "react";
import getIcon from "./icons"
import './index.scss'
export type TypeIcons = 'tuichudenglu' | 'gouwuchekong' | 'xiugai' | 'laba' | 'tousujianyi' | 'kefu' | 'qiche' | 'diancan1' | 'fangzi' | 'fangzi2' | 'xiyiji' | 'dasao' | 'Invoice' | 'zaocan' | 'fangwumianji' | 'chuanglian' | 'back' | 'home' | 'gengduosheshi' | 'jianshenfang2' | 'youyongchi2' | 'hangzhengjiulang2' | 'huiyishi2' | 'canting2' | 'tingchechang2' | 'ditu_dingwei_o' | 'a-Passengerdetails-outlined' | 'tingchechang' | 'diancanfuwuchahua' | 'querenwanchengrenwudanchuangchahua' | 'jiudianfuwuchahua' | 'lijituifangdanchuangchahua' | 'huiyishi' | 'tijiaochenggongdanchuangchahua' | 'jianshenfang' | 'jian' | 'shijian2' | 'shijian' | 'sousuo' | 'rili' | 'xingjijiudian' | 'gouxuan' | 'WiFi' | 'shezhi' | 'hangzhengjiulang' | 'chuang' | 'wujiaoxing-xianxing' | 'tianjia' | 'guanzhugongzhonghao' | 'youyongchi' | 'ditu' | 'jia' | 'xiaoxizhongxin' | 'jiage' | 'guanyuwomen' | 'wujiaoxing-mianxing' | 'canting'
interface TypeProps {
  icon: TypeIcons,
  className?: string,
  color?: string | string[],
  onClick?: () => void,
  /** @example "100*120" | 120 */
  size?: string | number,
  style?: React.CSSProperties
}
function Index(props: TypeProps) {
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
  const { size, icon = "", color, style } = props
  const { width = toPx(22), height = toPx(22), } = getWhStyle(size) || style || {}
  return <View onClick={props.onClick} className={"xm-icon " + props.className}
    style={{ width, height, backgroundImage: 'url("' + getIcon(icon, { color, width, height }) + '")', ...(style || {}) }}></View>
}
export default React.memo(Index)
