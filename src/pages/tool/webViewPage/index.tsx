import { WebView } from "@tarojs/components";
import { observer } from "mobx-react";
import React, { Fragment } from "react";
import { BaseRouter } from "@/path/router";
import "./index.scss";
function Index() {
  const data = BaseRouter.getData() as any
  return <WebView src={data?.url || ""}></WebView>
}
const Higher = React.memo(observer(Index));
export default () => <Fragment><Higher /></Fragment>
