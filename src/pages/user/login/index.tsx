import { XmPullRefresh } from "@/components/tool";
import { observer } from "mobx-react";
import React, { Fragment, useState } from "react";
import { Button } from "@taroify/core"
import { BaseRouter, Router } from "@path/router"
import { useDidShow } from "@tarojs/taro";
function Index() {
  const RouterData = BaseRouter.getData<{ index: number }>()
  useDidShow(() => {
    console.log(RouterData.index, "useDidShowuseDidShow");
  })

  const [loginStatic, setloginStatic] = useState(false)
  return <XmPullRefresh>
    {loginStatic ? "已登录" : "未登录"}
    <Button onClick={() => { BaseRouter.setBackData(true); setloginStatic(true) }}>登录成功后用户点击左上角返回按钮</Button>
    <Button onClick={() => BaseRouter.back({ data: true })}>登录成功并且返回</Button>
    <Button onClick={() => {
      Router.toUserLogin({ index: RouterData.index + 1 }).then((res) => {
        console.log(res, "返回了");
      })
    }}>噢噢噢</Button>
  </XmPullRefresh>
}

const Higher = React.memo(observer(Index));
export default () => <Fragment><Higher /></Fragment>
