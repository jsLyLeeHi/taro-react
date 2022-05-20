import React, { useEffect, useRef, useState } from 'react'
import Taro from "@tarojs/taro"
import { getPageInfo } from "@/path/acrossAPI";
import { Loading, Empty } from "@taroify/core"
import { renderGeneralModal } from "@/components/generalAnchor/data"
import { View } from "@tarojs/components"
import { XmImage } from "@/components/tool"
import './index.scss'

type TypeOptions = {
  show?: boolean,
  type?: "loading" | "image" | "default" | "error" | "search" | "network",
  imgSrc?: string,
  /**描述文字 @default loading ? 加载中... */
  description?: string,
  /**children	文本内容	ReactNode	- */
  children?: React.ReactNode;
}

function Index(props: TypeOptions) {
  const [isShow, setIsShow] = useState(true)
  const timer = useRef<any>(null)
  useEffect(() => {
    if (!props.show) {
      timer.current = setTimeout(() => {
        setIsShow(props.show || false)
      }, 300);
    } else {
      clearTimeout(timer.current)
      setIsShow(props.show || false)
    }
  }, [props])


  const PRESET_IMAGES = ["default", "error", "search", "network"]
  function obtainImageUrl(image?: string) {
    if (image && PRESET_IMAGES.includes(image)) {
      return `https://img.yzcdn.cn/vant/empty-image-${image}.png`
    }
    return image
  }
  const _imageSrc = obtainImageUrl(props.type) || props.imgSrc
  return isShow ? <View className='page-state' onClick={e => e.stopPropagation()}>
    {props.type === "loading" ? <Loading size={Taro.pxTransform(36)} type="spinner" direction="vertical">{props.description || "加载中..."}</Loading> :
      props.type != null ? (
        <Empty>
          {_imageSrc ? <XmImage className='page-state-image' src={_imageSrc} /> : null}
          <Empty.Description>{props.description || null}</Empty.Description>
        </Empty>
      ) : null}
    {props.children}
  </View> : null
}

export const NodeId = "page-state-id"
export default function (params?: TypeOptions) {
  const nowPageID = getPageInfo().routeID;
  setTimeout(() => {
    renderGeneralModal({
      nodeId: NodeId,
      node: <Index {...params} />,
      nowPageID
    })
  }, 0);
  return {
    hide: function () {
      const options: TypeOptions = { ...(params || {}), show: false }
      renderGeneralModal({
        nodeId: NodeId,
        node: <Index {...options} />,
        nowPageID
      })
    },
    show: function (newParams?: TypeOptions) {
      const _params = { ...(newParams || {}), show: true }
      setTimeout(() => {
        renderGeneralModal({
          nodeId: NodeId,
          node: <Index {..._params} />,
          nowPageID
        })
      }, 0);
    },
  }
}