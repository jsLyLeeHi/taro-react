import { XmNavbar, XmPullRefresh, XmTabbar } from "@/components/tool";
import { getImageSrc } from "@/path/tool/until";
import { observer } from "mobx-react";
import { View } from '@tarojs/components'
import React, { Fragment } from "react";
import { XmIcon } from "@/components/ui";
import { userStore } from "@/store";
import "./index.scss";
function Index() {
  
  return <>
    <XmNavbar color="#fff" title="酒店服务" />
    <View className="serve-page-top" style={{ backgroundImage: `url("${getImageSrc("page-top/1.png", true)}")` }}>
      <View className="serve-top-left c-white">
        <View className="serve-top-mb serve-top-name two-ellipsis">Hi，{userStore.userInfo.nickName}</View>
        <View>您需要什么服务呢？</View>
      </View>
      <XmIcon className="serve-top-icon" icon="jiudianfuwuchahua" size="249*187" />
    </View>
    <XmPullRefresh navigationStyle="custom" className="bg-gray-2" renderButtom={<XmTabbar />}>
      
    </XmPullRefresh>
  </>
}

const Higher = React.memo(observer(Index));
export default () => <Fragment><Higher /></Fragment>
