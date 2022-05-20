import Taro, { useDidShow } from "@tarojs/taro"
import { ScrollView } from '@tarojs/components'
import { ReactNode, useState, useEffect, useRef } from "react";
import { getRanLetter, isIphoneX } from "@path/tool/until";
import { getDomInfo } from '@/path/acrossAPI';
import React from "react"
import './index.scss'
interface TypePullRefresh {
  children?: ReactNode,
  /**是否去掉了系统导航栏，和config.ts中的配置一样 */
  navigationStyle?: "custom"
  renderButtom?: ReactNode,
  /**是否下拉刷新中 @default false */
  refresherLoading?: boolean,
  /**底部预留位置 */
  paddingBottom?: number,
  /**组件根样式 */
  className?: string,
  style?: React.CSSProperties,
  /**是否改变高度 */
  changeHeight?: any,
  /**触底加载更多 */
  onToLower?: () => void
  /**下拉刷新 */
  onRefresh?: () => void
}

function Index(props: TypePullRefresh) {
  const [UUID] = useState(getRanLetter(12));
  const [height, setHeight] = useState(600);
  const [paddingBtm, setPaddingBtm] = useState(0);
  const firstIn = useRef(true)
  useEffect(() => {
    Taro.nextTick(() => {
      getHeight(UUID, props.navigationStyle).then(h => setHeight(h))
    })
    firstIn.current === false
  }, [props.changeHeight])
  useDidShow(() => {
    if (firstIn.current === true) return
    Taro.nextTick(() => {
      getHeight(UUID, props.navigationStyle).then(h => setHeight(h))
    })
  })
  useEffect(() => {
    const isx = isIphoneX()
    if (typeof props.paddingBottom === "number") {
      setPaddingBtm(isx ? (props.paddingBottom + 64) : props.paddingBottom)
    } else if (props.renderButtom) {
      setPaddingBtm(isx ? ((props.paddingBottom || 120) + 64) : (props.paddingBottom || 120))
    } else {
      setPaddingBtm(isx ? 64 : 0)
    }
  }, [props.renderButtom, props.paddingBottom])

  /**触底加载更多 */
  function toLower() {
    if (props.refresherLoading) return;
    if (typeof props.onToLower === "function") props.onToLower()
  }
  /**下拉刷新 */
  function refresh() {
    if (props.refresherLoading) return;
    if (typeof props.onRefresh === "function") props.onRefresh()
  }
  return <>
    <ScrollView onScrollToLower={toLower} onRefresherRefresh={refresh}
      scrollY refresherTriggered={props.refresherLoading} id={UUID} refresherDefaultStyle="black" refresherBackground="#f6f9ff"
      className={props.className + ' pull-refresh'} refresherEnabled={typeof props.onRefresh === "function"}
      style={{ width: "100%", height: `${height}px`, boxSizing: "border-box", paddingBottom: Taro.pxTransform(paddingBtm), ...(props.style || {}) }}>
      {props.children}
    </ScrollView>
    {props.renderButtom}
  </>
}
export default React.memo(Index)

/**获取组件应有的高度 */
function getHeight(uuid: string, navigationStyle?: "custom"): Promise<number> {
  function isPc(list: string[], system: string) {
    const item = list.find(v => system.indexOf(v) >= 0)
    return !!item
  }
  return new Promise((resolve, reject) => {
    getDomInfo(`#${uuid}`).then((res) => {
      const barInfo = Taro.getSystemInfoSync()
      const statusBarHeight = isPc(["Windows", "windows", "Mac", "mac"], barInfo.system) ? 0 : barInfo.statusBarHeight
      const barHeight = navigationStyle === "custom" ? 0 : (statusBarHeight + 46)
      //46  小程序原生顶部导航栏高度
      resolve(barInfo.screenHeight - res.top - barHeight);
    }, reject);
  })
}