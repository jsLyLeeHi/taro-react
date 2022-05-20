import { XmImage, XmNavbar, XmPullRefresh, XmTabbar } from "@/components/tool";
import { observer } from "mobx-react";
import { getImageSrc } from "@/path/tool/until";
import { View } from '@tarojs/components'
import React, { Fragment } from "react";
import { userStore } from "@/store";
import "./index.scss";
function Index() {
  return <>
    <XmNavbar title="个人中心" color="#fff" />
    <XmPullRefresh navigationStyle="custom" className="bg-gray-2" renderButtom={<XmTabbar />}>
      <View className="mine-page-top" style={{ backgroundImage: `url("${getImageSrc("page-top/1.png", true)}")` }}></View>
      <View className="mine-header bg-white">
        <XmImage src={userStore.userInfo.avatar} className="header-img" />
        <View className="s-lg-2 c-gray-8 one-ellipsis mine-header-text">{userStore.userInfo.nickName}</View>
      </View>
    </XmPullRefresh>
  </>
}

const Higher = React.memo(observer(Index));
export default () => <Fragment><Higher /></Fragment>
