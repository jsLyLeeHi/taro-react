import React, { ReactNode, useEffect, useRef, useState } from "react";
import { getPageInfo } from "@/path/acrossAPI";
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { generalAnchorId } from "./data"
import './index.scss'

function Index() {
  type TypeOptionNode = { nodeId: string, node: ReactNode }[]
  let generalAnchorList = useRef<TypeOptionNode>([])
  const [renderModal, setRenderModal] = useState<TypeOptionNode>([])
  function setModal(params: { node: ReactNode, nodeId: string, list: TypeOptionNode }) {
    const itemIndex = params.list.findIndex(v => v.nodeId === params.nodeId)
    let list = [...generalAnchorList.current]
    const _item = { nodeId: params.nodeId, node: params.node }
    if (itemIndex < 0) {
      list.push(_item)
    } else {
      list[itemIndex] = _item
    }
    generalAnchorList.current = list
    setRenderModal(generalAnchorList.current)
  }
  useEffect(() => {
    const funName = generalAnchorId + getPageInfo().routeID;
    Taro.eventCenter.on(funName, (p: { nowPageID: any, node: ReactNode, nodeId: string }) => {
      setModal({ ...p, list: generalAnchorList.current })
    });
    return () => {
      Taro.eventCenter.off(funName)
    }
  }, [])
  return <View>{renderModal.map(v => <View>{v.node}</View>)}</View>
}
/**全局API组件锚点 */
export default React.memo(Index)