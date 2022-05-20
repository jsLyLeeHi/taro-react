import { View, Text } from "@tarojs/components"
import { Popup } from "@taroify/core"
import { useState } from 'react'
import PasswordInput from "@components/ui/passwordInput"
import { renderGeneralModal } from "@/components/generalAnchor/data"
import './index.scss'
import { getPageInfo } from "@/path/acrossAPI"
type TypeChange = {
  onClose: () => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  password: string,
  onSetVal: React.Dispatch<React.SetStateAction<string>>
}
/**密码输入框 */
export type TypeModalPassWord = {
  /**标题 @default 请输入支付密码 */
  title?: string,
  /**是否隐藏输入值 @default false */
  hidVal?: boolean,
  /**副标题 */
  lable?: string,
  /**密码输入框展示类型 下划线类型 正方形类型 @default SquarePwd */
  type?: "UnderlinePwd" | "SquarePwd",
  /**输入密码长度默认 6 */
  passwordLen?: number,
  /**是否在点击遮罩层后关闭 @default true */
  closeable?: boolean
  onAffirm: (p: TypeChange) => void
  onClose?: () => void
}
function Index(options: TypeModalPassWord) {
  const [show, setShow] = useState(true)
  const [loading, setLoading] = useState(false)
  /**取消 */
  function onCancel() {
    if (typeof options.onClose === "function") {
      options.onClose()
    }
    setShow(false);
  }
  /**满足输入条件 */
  function onAffirm({ value, onSetVal }) {
    options.onAffirm({
      password: value,
      onClose: onCancel,
      setLoading,
      onSetVal
    })
  }

  return (
    <Popup open={show} rounded onClose={onCancel} transaction={"taroify-dialog-bounce"}>
      <Popup.Backdrop closeable={options.closeable}></Popup.Backdrop>
      <View className="pay-word">
        <View className="pay-password c-gray-8 f-weight-bold s-lg">{options.title || "请输入支付密码"}</View>
        <PasswordInput loading={loading} boxWH={80} autoFocus={show} maxLength={options.passwordLen} type={options.type} hidVal={options.hidVal} onAffirm={onAffirm} />
        <View className="s-sm pay-find">
          <Text className="c-red">{options.lable || ""}</Text>
          <Text className="c-main">找回密码</Text>
        </View>
      </View>
    </Popup>
  )
}
export const NodeId = "password-modal-id"
export default function (params: TypeModalPassWord) {
  const nowPageID = getPageInfo().routeID;
  function onClear() {
    setTimeout(() => {
      renderGeneralModal({
        nodeId: NodeId,
        node: null,
        nowPageID
      })
    }, 300);
  }
  function onPwassWord(ev: TypeChange) {
    params.onAffirm(ev)
  }
  function onClose() {
    onClear()
  }
  renderGeneralModal({
    nodeId: NodeId,
    node: <Index {...params} onAffirm={onPwassWord} onClose={onClose} />,
    nowPageID
  })
}
