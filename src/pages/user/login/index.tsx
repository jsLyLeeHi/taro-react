import { XmPullRefresh } from "@/components/tool";
import { observer } from "mobx-react";
import React, { Fragment, useState } from "react";
import { Button } from "@taroify/core"
import { BaseRouter } from "@path/router"
function Index() {
  const [loginStatic, setloginStatic] = useState(false)
  return <XmPullRefresh>
    {loginStatic ? "已登录" : "未登录"}
    <Button onClick={() => { BaseRouter.setBackData(true); setloginStatic(true) }}>登录成功后用户点击左上角返回按钮</Button>
    <Button onClick={() => BaseRouter.back({ data: true })}>登录成功并且返回</Button>
  </XmPullRefresh>
}

const Higher = React.memo(observer(Index));
export default () => <Fragment><Higher /></Fragment>
