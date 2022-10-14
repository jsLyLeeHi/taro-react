import { Button, Popup } from "@taroify/core"
import { ButtonColor } from "@taroify/core/button/button.shared"
import { ButtonProps } from "@tarojs/components/types/Button"
import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { getPageInfo } from "@/path/acrossAPI";
import { renderGeneralModal } from "@/components/generalAnchor/data"
import './index.scss'

type TypeOptions = {
  /**顶部图片 */
  renderTop?: React.ReactNode,
  /**标题 */
  title?: React.ReactNode,
  /**内容 */
  content?: React.ReactNode,
  /**组件初始化的时候触发此函数 */
  onInit?: (p: { onAffirm: (param?: any) => void, onCancel: () => void, setLoading: React.Dispatch<React.SetStateAction<boolean>> }) => void,
  /**拦截点击确认按钮 传入此函数将拦截确认按钮并触发此函数 */
  onPrevent?: (p: { onAffirm: (param?: any) => void, onCancel: () => void, setLoading: React.Dispatch<React.SetStateAction<boolean>>, params: any }) => void,
  /**确认按钮文字 @default "确认" */
  confirmText?: React.ReactNode,
  /**取消按钮文字 @default "取消" */
  cancelText?: React.ReactNode,
  /**确认按钮style @default "" */
  confirmCloor?: ButtonColor,
  /**是否隐藏取消按钮 @default false */
  hideCancelBtn?: boolean,
  /**openType */
  openType?: ButtonProps.OpenType,
  /**是否在点击遮罩层后关闭 @default true */
  closeable?: boolean
  placement?: "top" | "right" | "bottom" | "left",
}

function Index(props: TypeOptions & { reject: () => void, resolve: (p: any) => void }) {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  /**取消 */
  function onCancel() {
    props.reject()
    setShow(false);
  }
  function onResolve(ev: any) {
    function run(param?: any) {
      props.resolve(param || ev)
      setShow(false);
    }
    if (typeof props.onPrevent === "function") {
      props.onPrevent({ onAffirm: run, onCancel, setLoading, params: ev })
      return
    }
    run()
  }
  /**确认按钮 */
  function onAffirm(ev) {
    if (props.openType != null) return
    onResolve(ev)
  }
  /**获取用户信息 */
  function onGetUserInfo(ev) {
    onResolve(ev)
  }
  /**获取用户手机号 */
  function onGetPhoneNumber(ev) {
    if (ev.detail.errMsg === "getPhoneNumber:ok") {
      onResolve(ev)
    } else {
      onCancel()
    }
  }
  useEffect(() => {
    setShow(true);
    if (typeof props.onInit === "function") {
      props.onInit({ onAffirm: onAffirm, onCancel, setLoading })
    }
  }, [])
  return <View className="xm-dialog-box">
    <Popup placement={props.placement} open={show} rounded onClose={onCancel}>
      <Popup.Backdrop closeable={props.closeable}></Popup.Backdrop>
      <View className="xm-dialog">
        {props.renderTop ? <View className="dialog-image-box">{props.renderTop}</View> : null}
        {props.title !== null ? <View className="dialog-title t-center s-md-2 c-gray-8">{props.title}</View> : null}
        {props.content !== null ? <View className="dialog-content s-sm c-gray-6">{props.content}</View> : null}
        <View className="dialog-actions">
          {props.hideCancelBtn === true ? null : <Button onClick={onCancel} shape="round" className="dialog-btn">{props.cancelText || "取消"}</Button>}
          <Button shape="round" className="dialog-btn" openType={props.openType} color={props.confirmCloor || "primary"} loading={loading}
            onGetUserInfo={onGetUserInfo} onGetPhoneNumber={onGetPhoneNumber} onClick={onAffirm}
          >{props.confirmText || "确定"}</Button>
        </View>
      </View>
    </Popup>
  </View>
}

export const NodeId = "dialog-modal-id"
export default function (params: TypeOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    const nowPageID = getPageInfo().routeID;
    function onClear() {
      return new Promise((resolve) => {
        setTimeout(() => {
          renderGeneralModal({
            nodeId: NodeId,
            node: null,
            nowPageID
          })
          resolve(true)
        }, 300);
      })
    }
    function onResolve(ev) {
      onClear().then(() => {
        resolve(ev)
      })
    }
    function onReject() {
      onClear().then(() => {
        reject()
      })
    }
    renderGeneralModal({
      nodeId: NodeId,
      node: <Index {...params} resolve={onResolve} reject={onReject} />,
      nowPageID
    })
  })
}