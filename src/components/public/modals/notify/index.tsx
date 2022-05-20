import { Notify } from "@taroify/core"
import { NotifyColor } from "@taroify/core/notify/notify.shared"
import { getPageInfo } from "@/path/acrossAPI";
import { useEffect, useRef, useState } from 'react'
import { ReactNode } from "react";
import { renderGeneralModal } from "@/components/generalAnchor/data"
import './index.scss'
interface TypeRenderNotify {
  duration?: number;
  color?: NotifyColor;
  children: ReactNode;
}
export const NodeId = "xm-notify-id"
function Index(props: TypeRenderNotify & { onClose: () => void }) {
  const timer = useRef<any>(null)
  const [show, setShow] = useState(false)
  function onClose() {
    setShow(false)
    timer.current = setTimeout(props.onClose, 300);
  }
  useEffect(() => {
    clearTimeout(timer.current)
    setShow(true)
  }, [props])
  return <Notify open={show} duration={props.duration} color={props.color} onClose={onClose}>{props.children}</Notify>
}
function renderNotify(params: TypeRenderNotify) {
  return new Promise((resolve) => {
    const nowPageID = getPageInfo().routeID;
    function onClear() {
      renderGeneralModal({
        nodeId: NodeId,
        node: null,
        nowPageID
      })
      resolve(true)
    }
    renderGeneralModal({
      nodeId: NodeId,
      node: <Index {...params} onClose={onClear}>{params.children}</Index>,
      nowPageID
    })
  })
}
/**消息提示 */
const XmNotify = (params: TypeRenderNotify) => renderNotify(params)
/**通用消息提示 */
XmNotify["primary"] = function (title: string, duration: number = 1500) {
  return renderNotify({
    children: title,
    color: "primary",
    duration: duration
  })
}
/**成功消息提示 */
XmNotify["success"] = function (title: string, duration: number = 1500) {
  return renderNotify({
    children: title,
    color: "success",
    duration: duration
  })
}
/**警告消息提示 */
XmNotify["warning"] = function (title: string, duration: number = 1500) {
  return renderNotify({
    children: title,
    color: "warning",
    duration: duration
  })
}
/**危险消息提示 */
XmNotify["danger"] = function (title: string, duration: number = 1500) {
  return renderNotify({
    children: title,
    color: "danger",
    duration: duration
  })
}
export default XmNotify