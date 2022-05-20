import { Toast, Loading } from "@taroify/core"
import { View } from "@tarojs/components";
import { ToastPosition, ToastType } from "@taroify/core/toast/toast.shared"
import { getPageInfo } from "@/path/acrossAPI";
import { useEffect, useState, ReactNode, useRef } from 'react'
import { renderGeneralModal } from "@/components/generalAnchor/data"
import './index.scss'
interface TypeRenderToast {
  /**type	提示类型，可选值为 loading success fail html	string	text */
  type?: ToastType;
  /**position	弹出位置，可选值为 top bottom	string	center */
  position?: ToastPosition;
  /**icon	自定义图标，支持传入图标名称或图片链接	ReactNode	- */
  icon?: ReactNode;
  /**duration	动画时长，单位毫秒	number | string	300 */
  duration?: number;
  /**children	文本内容	ReactNode	- */
  children: ReactNode;
  /**是否隐藏 */
  isHide?: boolean
  /**是否在点击遮罩层后关闭 @default true */
  closeable?: boolean
}
export const NodeId = "xm-toast-id"
function Index(props: TypeRenderToast & { onClose: () => void }) {
  const timer = useRef<any>(null)
  const [show, setShow] = useState(false)
  function onClose() {
    setShow(false)
    timer.current = setTimeout(props.onClose, 300);
  }
  useEffect(() => {
    if (props.isHide === true) {
      onClose()
    } else {
      clearTimeout(timer.current)
      setShow(true)
    }
  }, [props])
  return <View className="toast-bg">
    <Toast.Backdrop closeable={props.closeable}></Toast.Backdrop>
    <Toast open={show} type={props.type} icon={props.icon} position={props.position}
      duration={props.duration} onClose={onClose}>{props.children}</Toast>
  </View>
}
function renderToast(params: TypeRenderToast, nowPageID = getPageInfo().routeID) {
  return new Promise((resolve) => {
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
/**轻提示函数 */
const XmToast = (params: TypeRenderToast) => renderToast(params)
/**轻提示 */
XmToast["open"] = function (title: string = "提示", params?: { duration?: number, closeable?: boolean }) {
  const { duration = 1500, closeable } = params || {}
  return renderToast({
    children: title,
    duration,
    closeable
  })
}
/**显示loading @returns onHideLoading() 为了保证每个页面的loading能被准确的hide */
XmToast["loading"] = function (title: string = "加载中...", params?: { duration?: number, closeable?: boolean }) {
  const { duration = 2 * 60 * 1000, closeable } = params || {}
  const _pageId = getPageInfo().routeID
  renderToast({
    icon: <Loading />,
    children: title,
    duration,
    closeable
  }, _pageId)
  return function () {
    return renderToast({
      icon: <Loading />,
      children: title,
      isHide: true,
      duration: 0
    }, _pageId)
  }
}
/**隐藏指定页面的loading,默认隐藏函数执行时用户所在页面的loading */
XmToast["hideLoading"] = function (pageId?: string) {
  return renderToast({
    icon: <Loading />,
    children: null,
    isHide: true,
    duration: 0
  }, pageId)
}
/**成功提示 */
XmToast["success"] = function (title: string = "成功", params?: { duration?: number, closeable?: boolean }) {
  const { duration = 1500, closeable } = params || {}
  return renderToast({
    type: "success",
    children: title,
    duration,
    closeable
  })
}
/**错误提示 */
XmToast["fail"] = function (title: string = "失败", params?: { duration?: number, closeable?: boolean }) {
  const { duration = 1500, closeable } = params || {}
  return renderToast({
    type: "fail",
    children: title,
    duration,
    closeable
  })
}
export default XmToast