import { RichText } from "@tarojs/components";
import { observer } from "mobx-react";
import React, { Fragment } from "react";
import { BaseRouter } from "@/path/router";
import { formatRichText } from "@/path/tool/until";
import { setTitle } from "@/path/acrossAPI";
import "./index.scss";
function Index() {
  const data = BaseRouter.getData<{ richText?: string, title?: string }>() as any
  if (typeof data?.title === "string") {
    setTitle(data.title)
  }
  return <RichText style="white-space: pre-wrap" nodes={formatRichText(data?.richText || "")}></RichText>
}
const Higher = React.memo(observer(Index));
export default () => <Fragment><Higher /></Fragment>
