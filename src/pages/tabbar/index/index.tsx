import { XmPullRefresh, XmTabbar } from "@/components/tool";
import { observer } from "mobx-react";
import React, { Fragment } from "react";
import { Button } from "@taroify/core"
import { XmDialogModal, XmToast, XmPickerModal, XmDateTimePicker, XmActionSheetModal, XmPasswordModal, XmNotify } from "@/components/public";
import { Router } from "@/path/router";
function Index() {
  return <XmPullRefresh renderButtom={<XmTabbar />}>
    <Button onClick={() => {
      XmDialogModal({
        title: "哈哈",
        content: "呵呵"
      })
    }}>XmDialogModal</Button>
    <Button onClick={() => {
      XmToast.open("哈哈哈")
    }}>XmToast.open</Button>
    <Button onClick={() => {
      XmToast.loading("加载中")
    }}>XmToast.loading</Button>
    <Button onClick={() => {
      XmToast.success("成功")
    }}>XmToast.success</Button>
    <Button onClick={() => {
      XmNotify.success("成功")
    }}>XmNotify.success</Button>
    <Button onClick={() => {
      XmPickerModal({
        title: "选择性别",
        list: [["1", "2", "3"]]
      }).then((res) => {
        console.log(res);
      })
    }}>XmPickerModal</Button>
    <Button onClick={() => {
      XmDateTimePicker({
        title: "选择时间",
      }).then((res) => {
        console.log(res);
      })
    }}>XmPickerModal</Button>
    <Button onClick={() => {
      XmActionSheetModal({
        title: "选择xx",
        list: [
          { name: "哈哈1" },
          { name: "哈哈2" },
          { name: "哈哈3" }
        ]
      }).then((res) => {
        console.log(res);
      })
    }}>XmActionSheetModal</Button>
    <Button onClick={() => {
      XmPasswordModal({
        title: "选择xx",
        onAffirm(ev) {
          console.log(ev);
          ev.setLoading(true)
          setTimeout(() => {
            ev.onClose()
            ev.setLoading(false)
          }, 1000);
        }
      })
    }}>XmPasswordModal</Button>
    <Button onClick={() => {
      Router.toUserLogin({ index: 1 }).then((res) => {
        console.log(res, "index页面返回了");
      })
    }}>路由跳转</Button>
  </XmPullRefresh>
}

const Higher = React.memo(observer(Index));
export default () => <Fragment><Higher /></Fragment>
