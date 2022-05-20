import { View } from '@tarojs/components'
import { Empty, Loading, Divider } from "@taroify/core"
import React from "react"
import { getImageSrc } from '@/path/tool/until'
import './index.scss'

function Index(props: { nodataSrc?: string, srcType?: boolean, netWorkError?: boolean, title?: string, loading?: boolean, list?: any[], total?: number }) {
  return (
    <View className="yz-nodata-box">
      {props.netWorkError === true ? <Empty>
        <Empty.Image src="network" />
        <Empty.Description>{"请求出错了，请稍后再试"}</Empty.Description>
      </Empty> : props.loading ? (
        <View className="yz-nodata-loading"><Loading size="24px">加载中...</Loading></View>
      ) : !props.list?.length ? (
        <Empty>
          <Empty.Image src={props.srcType == null ? props.nodataSrc : getImageSrc(props.nodataSrc, props.srcType)} />
          <Empty.Description>{props.title || "暂无数据"}</Empty.Description>
        </Empty>
      ) : (Number(props.list?.length || 0)) < Number(props.total || 0) ? (
        <Divider>加载更多</Divider>
      ) : (Number(props.list?.length || 0)) === Number(props.total || 0) ? (
        <Divider>我是有底线的</Divider>
      ) : null}
    </View>
  )
}
export default React.memo(Index)
