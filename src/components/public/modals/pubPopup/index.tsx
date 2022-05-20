import { Popup } from "@taroify/core"
import { View } from '@tarojs/components'
import React, { useEffect, useState } from 'react'
import { renderGeneralModal } from "@/components/generalAnchor/data"
import { getPageInfo } from "@/path/acrossAPI"
import './index.scss'
type PopupPlacement = "top" | "right" | "bottom" | "left";
/**密码输入框 */
export type TypeModalPassWord = {
  /**@default true */
  show?: boolean,
  placement?: PopupPlacement,
  children: React.ReactNode
  onClose?: () => void
  /**是否在点击遮罩层后关闭 @default true */
  closeable?: boolean
}
function Index(options: TypeModalPassWord) {
  const [show, setShow] = useState<boolean>()
  /**取消 */
  function onCancel() {
    if (typeof options.onClose === "function") {
      options.onClose()
    }
    setShow(false);
  }
  useEffect(() => {
    setShow(options.show);
  }, [options.show])
  
  
  return <View className="pub-popup-box">
    <Popup open={show} rounded onClose={onCancel} placement={options.placement}>
      <Popup.Backdrop closeable={options.closeable}></Popup.Backdrop>
      {options.children}
    </Popup>
  </View>
}
export const NodeId = "pub-popup-modal-id"
export default function (params: TypeModalPassWord) {
  const nowPageID = getPageInfo().routeID;
  if (params["show"] == null) params["show"] = true
  function onClear() {
    setTimeout(() => {
      renderGeneralModal({
        nodeId: NodeId,
        node: null,
        nowPageID
      })
    }, 300);
  }
  renderGeneralModal({
    nodeId: NodeId,
    node: <Index {...params} onClose={onClear} />,
    nowPageID
  })
  return {
    hide: function () {
      const _params = { ...params, show: false }
      renderGeneralModal({
        nodeId: NodeId,
        node: <Index {..._params} />,
        nowPageID
      })
      onClear()
    }
  }
}
