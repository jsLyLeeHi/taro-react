import { XmPullRefresh, XmTabbar } from "@/components/tool";
import { observer } from "mobx-react";
import React, { Fragment } from "react";
import { Button } from "@taroify/core"
import { XmDialogModal, XmToast, XmPickerModal, XmDateTimePicker, XmActionSheetModal, XmPasswordModal, XmNotify } from "@/components/public";
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
      const hideLoading = XmToast.loading("加载中")
      setTimeout(() => {
        hideLoading()
      }, 3000);
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
  </XmPullRefresh>
}

const Higher = React.memo(observer(Index));
export default () => <Fragment><Higher /></Fragment>
