import { ReactNode } from "react";
import Taro from '@tarojs/taro'
/**锚点ID */
export const generalAnchorId = "onRenderGeneralAnchorId"
/**注入公共组件 */
export function renderGeneralModal(p: { nodeId: string, node: ReactNode, nowPageID: string }) {
  Taro.eventCenter.trigger(generalAnchorId + p.nowPageID, { nowPageID: p.nowPageID, node: p.node, nodeId: p.nodeId })
}