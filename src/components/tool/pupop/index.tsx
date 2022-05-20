import Taro from "@tarojs/taro"
import { View } from '@tarojs/components'
import React, { ReactNode, useEffect, useState } from "react"
import { getDomInfo } from "@path/acrossAPI";
import { XmAnimate } from '..'
import './index.scss'

interface TypeYzPupop {
  /**对其的顶部元素ID */
  topDomId?: string,
  children?: ReactNode,
  /**对齐方式 默认fixed */
  postion?: "fixed" | "absolute",
  placement?: "top" | "left" | "center" | "bottom" | "right",
  /**是否自动获取高度 */
  automaticHeight?: boolean,
  popupClassName?: string,
  show: boolean,
  onClose?: () => void,
}
export interface TypeDefAnimate { show: string, hide: string }
interface TypePostion {
  top: TypeDefAnimate,
  bottom: TypeDefAnimate,
  right: TypeDefAnimate,
  left: TypeDefAnimate,
  center: TypeDefAnimate,
}

function Index(props: TypeYzPupop) {
  const pageHeight = Taro.getSystemInfoSync().windowHeight
  const [popupHeight, setPopupHeight] = useState(pageHeight)
  const [maskAnimate, setMaskAnimate] = useState("")
  const [boxAnimate, setBoxAnimate] = useState("")


  const animateEnmu: TypePostion = {
    top: { show: 'fadeInDown', hide: 'fadeOutUp' },
    bottom: { show: 'fadeInUp', hide: 'fadeOutDown' },
    right: { show: 'fadeInRight', hide: 'fadeOutRight' },
    left: { show: 'fadeInLeft', hide: 'fadeOutLeft' },
    center: { show: 'bounceIn', hide: 'bounceOut' },
  }

  useEffect(() => {
    if (props.show) {
      setMaskAnimate("fadeIn")
      setBoxAnimate(animateEnmu[props.placement || "center"].show)
      if (!props.topDomId) return;
      getDomInfo(`#${props.topDomId}`).then((res) => {
        setPopupHeight(pageHeight - res.top)
      });
    } else {
      setMaskAnimate("fadeOut")
      setBoxAnimate(animateEnmu[props.placement || "center"].hide)
    }
  }, [props.show])
  return <>
    <XmAnimate show={props.show} animate={maskAnimate} onClick={props.onClose}
      style={{ position: props.postion || "fixed", height: popupHeight + "px" }} className="yz-pupop">
      <View className={`yz-popup-box yz-pupop-${props.placement || "center"}`}>
        <XmAnimate onClick={e => e.stopPropagation()} show animate={boxAnimate} className={`${props.popupClassName || 'popup-modal'} def-modal`}>
          {props.children}
        </XmAnimate>
      </View>
    </XmAnimate>
  </>
}
export default React.memo(Index)
