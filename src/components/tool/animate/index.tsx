import { View } from '@tarojs/components'
import React, { ReactNode, CSSProperties, useEffect, useState } from "react"
import './index.scss'
interface TypeYzAnimate {
  boxId?: string,
  show: boolean,
  children?: ReactNode,
  className?: string,
  animate: string,
  style?: string | CSSProperties,
  onClick?: (ev: any) => void
}
function Index(props: TypeYzAnimate) {
  const [open, setOpen] = useState(props.show)
  useEffect(() => {
    const _show = props.show
    if (_show) {
      setOpen(_show)
    } else {
      setTimeout(() => {
        setOpen(_show)
      }, 300);
    }
  }, [props.show])
  return (
    open ? <View id={props.boxId}
      className={`animated ${props.className || ""} ${props.animate || ""}`}
      style={props.style} onClick={props.onClick}>
      {props.children}
    </View> : null
  )
}
export default React.memo(Index)
