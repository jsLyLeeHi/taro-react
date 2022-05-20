import { useState } from 'react'
import { View, Text, ButtonProps } from '@tarojs/components'
import { Button, Popup } from '@taroify/core'
import { renderGeneralModal } from "@/components/generalAnchor/data"
import { XmIcon } from '@components/ui';
import { TypeIcons } from '@components/ui/icon';
import { getPageInfo } from '@/path/acrossAPI'
import './index.scss'

export interface TypeBtnShareItem {
  key: string | number,
  /**图标 */
  icon: TypeIcons,
  /**图标颜色 */
  iconColor?: string | string[],
  /**标题 */
  name: string,
  /**open-type 的合法值 */
  openType?: ButtonProps.openType,
  /**分享的数据 */
  shareInfo?: any,
  /**Loading状态 */
  loading?: boolean
}
type TypeOptions = {
  title?: string,
  list: TypeBtnShareItem[],
  /**是否在点击遮罩层后关闭 @default true */
  closeable?: boolean
  /**拦截点击确认按钮 传入此函数将拦截确认按钮并触发此函数 */
  onPrevent?: (p: { onAffirm: () => void, onCancel: () => void, item: TypeBtnShareItem, setLoading: (p: boolean) => void }) => void,
}
function Index(props: TypeOptions & { resolve: (p: TypeBtnShareItem) => void, reject: () => void, }) {
  const [show, setShow] = useState(true)
  const [actionList, setActionList] = useState<TypeBtnShareItem[]>(props.list || [])
  /**取消 */
  function onCancel() {
    props.reject()
    setShow(false);
  }
  /**选择单项 */
  function onAffirm(ev: TypeBtnShareItem, index: number) {
    function run() {
      props.resolve(ev)
      setShow(false);
    }
    function setLoading(param: boolean) {
      const _list = [...actionList]
      _list[index].loading = param
      setActionList(_list)
    }
    if (typeof props.onPrevent === "function") {
      props.onPrevent({ onAffirm: run, onCancel, item: ev, setLoading })
      return
    }
    run()
  }
  return <Popup open={show} placement="bottom" onClose={onCancel}>
    <Popup.Backdrop closeable={props.closeable}></Popup.Backdrop>
    <View className="share-popup iphonex-bottom">
      <View className="share-popup-title t-center s-lg c-gray-8">{props.title ? props.title : "分享至"}</View>
      <View className="share-popup-options">
        {actionList.map((val, idx) => (
          <Button variant="text" loading={val.loading} className="share-popup-item" onClick={() => onAffirm(val, idx)} data-shareInfo={val.shareInfo} key={idx} openType={val.openType}>
            <XmIcon icon={val.icon} color={val.iconColor} size={50} />
            <Text className="s-sm c-gray-8">{val.name}</Text>
          </Button>
        ))}
      </View>
      <View className="share-popup-btn t-center s-md c-gray-8" onClick={onCancel}>取消</View>
    </View>
  </Popup>
}
export const NodeId = "share-modal-id"
export default function (params: TypeOptions) {
  return new Promise((resolve, reject) => {
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
    function onResolve(ev) {
      resolve(ev)
      onClear()
    }
    function onReject() {
      reject()
      onClear()
    }
    renderGeneralModal({
      nodeId: NodeId,
      node: <Index {...params} resolve={onResolve} reject={onReject} />,
      nowPageID
    })
  })
}
