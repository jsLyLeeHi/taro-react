import React from 'react'
import { Text } from "@tarojs/components";
import { TypeIcon } from './icon'
import { getPageStyle } from '@static/js/until'
import "@static/iconfont/iconfont.scss"

interface P {
  icon: TypeIcon
  fontSize?: string //fontSize
  onclick?: () => void
  style?: React.CSSProperties
}
export type IconType = TypeIcon

export default function Index(props: P) {
  let _style: React.CSSProperties = props.style || {}
  if (props.fontSize) {
    _style['fontSize'] = props.fontSize
  }
  return <Text style={getPageStyle(_style)} className={`icon iconfont ${props.icon}`} onClick={props.onclick && props.onclick.bind(this)}></Text>
}