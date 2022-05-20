import { XmDialogModal, XmToast } from "@/components/public"
export default async function (ctx, next) {
  await next()
  if (ctx.response?.statusCode !== 200) {
    const _type = ctx.request.toastType
    const _msgArr = ctx.response?.data?.errors
    let _msg = ""
    if (_msgArr instanceof Array) {
      const _arr = _msgArr.map((val) => {
        return val?.msg
      })
      _msg = _arr.join("，")
    }
    const msg = ctx.response?.data?.message || ctx.response?.data?.msg || _msg || "请求失败，请稍后再试"
    if (_type === "toast" || _type === undefined) return XmToast.open(msg)
    if (_type === "dialog") return XmDialogModal({
      title: "提示",
      content: msg,
      hideCancelBtn: true
    })
  }
}