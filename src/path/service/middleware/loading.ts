import { XmToast } from "@/components/public"
export default async function (ctx, next) {
  if (ctx.request?.loading === false) {
    await next()
  } else {
    const onHIdeLoading = XmToast.loading("加载中...", { closeable: ctx.request?.closeable })
    try {
      await next()
      onHIdeLoading()
    } catch (error) {
      onHIdeLoading()
    }
  }
}