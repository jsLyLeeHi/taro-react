 # 1.全局的公共组件api方式调用
 ## 1.picker选择器基础组件
 ### 使用
``` tsx
import { XmPickerModal } from "@/components/public";
XmPickerModal({
  value: ["哈哈哈1", "哈哈哈3"],
  list: [
    [{ title: "哈哈哈1" }],
    [{ title: "哈哈哈1" }],
  ],
  onPrevent(ev) {

  }
}).then((res) => {
  console.log(res);
})
```
 ### 参数
``` tsx
{
  /**标题 @default 请选择 */
  title?: React.ReactNode,
  /**传入此函数则拦截 */
  onPrevent?: (p: { onAffirm: (param?: any | any[]) => void, onCancel: () => void, setLoading: React.Dispatch<React.SetStateAction<boolean, value: any | any[] }) => void,
  /**确认按钮文字 @default "取消" */
  confirmText?: React.ReactNode,
  /**取消按钮文字 @default "确认" */
  cancelText?: React.ReactNode,
  /**数据列表 */
  list: ({ [key: string]: any } | string)[][],
  /**默认选中的值,不传入则默认为[0,...] */
  value?: any | any[],
  /**标题需要读取哪个字段 @default title @default undefined */
  valueKey?: string,
  /**picker 改变执行，如果传入此函数，则需要手动设置选中的值 */
  onPickerChange?: (p: TypePickerChange) => void,
  /**是否为只读状态，只读状态下无法切换选项 @default false */
  readonly?: boolean,
  /**可见的选项相邻个数 @default 3 */
  siblingCount?: number,
}
```
 ## 2.时间日期选择器组件
### 使用
``` tsx
import { XmDateTimePicker } from "@/components/public";
XmDateTimePicker({
  value: new Date("2030-02-01"),
  onPrevent(ev) {
  }
}).then((res) => {
  console.log(res);
})
```
 ### 参数
```tsx
{
  /**标题 @default 请选择 */
  title?: React.ReactNode,
  /**传入此函数则拦截 */
  onPrevent?: (p: { onAffirm: (param?: any) => void, onCancel: () => void, setLoading: React.Dispatch<React.SetStateAction<boolean }) => void,
  /**确认按钮文字 @default "取消" */
  confirmText?: React.ReactNode,
  /**取消按钮文字 @default "确认" */
  cancelText?: React.ReactNode,
  /**返回的时间格式化 @default */
  template?: string,

  /**开始时间 @default 1970-01-01 */
  min?: Date
  /**结束时间 @default 2060-12-01 */
  max?: Date
  /**时间选择器展示的行 @default // ["year", "month", "day", "hour", "minute", "second"] */
  fields?: DatetimePickerColumnType[]
  /**选项过滤函数 */
  filter?(type: DatetimePickerColumnType, values: string[]): string[]
  /**选项格式化函数 */
  formatter?(type: DatetimePickerColumnType, value: string): string
  /**时间类型，可选值为 date time year-month month-day date-hour hour-minute @default datetime */
  type?: DatetimePickerType;
  /**默认选中的时间	 */
  defaultValue?: Date;
  /**选中的时间	 */
  value?: Date;
  /**是否为只读状态，只读状态下无法切换选项	 */
  readonly?: boolean;
  /**可见的选项相邻个数 @default 3 */
  siblingCount?: number;
}
```
 ## 3.dialog对话框组件
 ### 使用
``` tsx
import { XmDialogModal } from "@/components/public";
XmDialogModal({
  title: "提示",
  content: "哈哈哈",
  onPrevent(ev) {
  }
}).then((res) => {
  console.log(res);
})
```
 ### 参数
```tsx
{
  /**标题 */
  title: React.ReactNode,
  /**内容 */
  content: React.ReactNode,
  /**传入此函数则拦截 */
  onPrevent?: (p: { onAffirm: (param?: any) => void, onCancel: () => void, setLoading: React.Dispatch<React.SetStateAction<boolean }) => void,
  /**确认按钮文字 @default "取消" */
  confirmText?: React.ReactNode,
  /**取消按钮文字 @default "确认" */
  cancelText?: React.ReactNode,
  /**是否隐藏取消按钮 @default false */
  hideCancelBtn?: boolean,
}
```
 ## 4.ActionSheet 动作面板组件
 ### 使用
``` tsx
import { XmActionSheetModal } from "@/components/public";
XmActionSheetModal<{ key: number }>({
  title: "测试标题啊三国时代呼唤地方",
  list: [{ name: "第一个", key: 1 }, { name: "第二个", key: 2 }],
  onPrevent({ onAffirm, item, setLoading, onCancel }) {
  },
  cancelText: "取消"
}).then((res) => {
  console.log(res);
})
```
 ### 参数
```tsx
{
  title?: string,
  list: TypeModalActionSheetItem<T>[],
  /**传入此函数则拦截 */
  onPrevent?: (p: { onAffirm: () => void, onCancel: () => void, item: TypeModalActionSheetItem<T>, setLoading: (p: boolean) => void }) => void,
  cancelText?: string
}
```
 ## 5.密码输入框弹窗组件
 ### 使用
``` tsx
import { XmPasswordModal } from "@/components/public";
XmPasswordModal({
  title: "请输入密码",
  onAffirm(ev) {
    if (ev.password === "123123") {
      ev.setLoading(true)
      setTimeout(() => {
        ev.setLoading(false)
        ev.onClose()
      }, 1200);
    } else {
      ev.onSetVal("")
    }
  },
})
```
 ### 参数
```tsx
{
  /**标题 @default 请输入支付密码 */
  title?: string,
  /**是否隐藏输入值 @default false */
  hidVal?: boolean,
  /**副标题 */
  lable?: string,
  /**密码输入框展示类型 下划线类型 正方形类型 @default SquarePwd */
  type?: "UnderlinePwd" | "SquarePwd",
  /**输入密码长度默认 6 */
  passwordLen?: number,
  onAffirm: (p: TypeChange) => void
  onClose?: () => void
}
```
 ## 6.分享组件
 ### 使用
``` tsx
import { XmShareModal } from "@/components/public";
XmShareModal({
  list: [
    { icon: "color_caihong", name: "分享好友", openType: "share", key: "weixin" },
    { icon: "color_chuang", name: "分享海报", key: "poster" }
  ],
  onPrevent(ev) {
    if (ev.item.key === "poster") {
      ev.setLoading(true)
      setTimeout(() => {
        ev.onAffirm()
        ev.setLoading(false)
      }, 1200);
    } else {
      ev.onAffirm()
    }
  }
}).then((res) => {
  console.log(res);
})
```
 ### 参数
```tsx
{
  key: string | number,
  /**图标 */
  icon: TypeIcons,
  /**图标颜色 */
  iconColor?: string | string[],
  /**标题 */
  name: string,
  /**open-type 的合法值 */
  openType?: ButtonProps.openType,
  /**分享的数据 */
  shareInfo?: any,
  /**Loading状态 */
  loading?: boolean
}
```
 ## 7.Toast 轻提示
 ### 使用
``` tsx
import { XmToast } from "@/components/public";
//轻提示
XmToast.open("轻提示")
//loading
const onHideLoading = XmToast.loading()
setTimeout(() => {
  onHideLoading()
}, 1200);
//成功
XmToast.success()
//错误
XmToast.fail()
//自定义配置提示
XmToast({ children: "呵呵呵" })
```
 ### 参数
```tsx
{
  /**type	提示类型，可选值为 loading success fail html	string	text */
  type?: ToastType;
  /**position	弹出位置，可选值为 top bottom	string	center */
  position?: ToastPosition;
  /**icon	自定义图标，支持传入图标名称或图片链接	ReactNode	- */
  icon?: ReactNode;
  /**duration	动画时长，单位毫秒	number | string	300 */
  duration?: number;
  /**children	文本内容	ReactNode	- */
  children: ReactNode;
  /**是否隐藏 */
  isHide?: boolean
}
```

 ## 8.Notify 消息提示
 ### 使用
``` tsx
import { XmNotify } from "@/components/public";
//primary
XmNotify.primary("primary")
//success
XmNotify.success("success")
//danger
XmNotify.danger("danger")
//错误
XmNotify.warning("warning")
//自定义配置提示
XmNotify({ children: "哈哈哈" })
```
 ### 参数
```tsx
{
  duration?: number;
  color?: "primary" | "success" | "warning" | "danger";
  children: ReactNode;
}
```
***
 # 2.路由增强
 ## 1.实现多页面路由回调
```tsx
import { BaseRouter } from "@path/router"
//跳转发起
Router.navigate<string>(
  { url: "/pages/mineEdit/index" }, 
  { data: params }
).then((res)=>{
  //哈哈哈
  console.log(res)
})
//设置页面返回所携带的参数
BaseRouter.setBackData("哈哈哈")
//页面返回并携带参数
BaseRouter.back({data:"哈哈哈"})
```
 ## 2.实现路由拦截
```tsx
import { BaseRouter } from "@path/router"
//单个路由拦截
Router.navigate<string>(
  { url: "/pages/mineEdit/index" }, 
  { 
    data: params,
    before(){ return new Promise() } 
  }
).then((res)=>{
  //哈哈哈
  console.log(res)
})
//全局路由拦截
/**注册路由 */
const Router = new BaseRouter((ctx, next, error)=>{
  if ( ctx.xxx!=="xxx" ){
    next()
  } else {
    error()
  }
})
```
 ## 3.实现路由ts参数提示
```tsx
/**跳转到xxx页面 */
export function toMineEdit(params: string) {
  return Router.navigate<string>({ url: "/pages/mineEdit/index" }, { data: params })
}
```
***
 # 3.请求封装
 ## 配置
```tsx
//全局配置 config.ts
{
  /**超时时间 */
  timeout: 50000,
  /**token缓存时间 */
  tokenCatcheTime: 86400000 * 2,
  /**错误重试次数 */
  retryCount: 2,
  /**请求域名 */
  baseURL: "http://localhost:8000"
}
//请求配置
{
  /**接口主路径 */
  baseURL: string
  /**接口路径 */
  path: string
  /**token */
  'Blade-Auth': string,
  /**该接口是否不传入token @default false */
  skipToken?: boolean,
  /**是否显示loading @default true */
  loading?: boolean
  /**缓存数据时间-时间戳 cacheTime<=0则永久缓存 默认永久缓存 @default 0 如果cacheType是sessionStorage则不需要设置缓存时间 */
  cacheTime?: number
  /**缓存方式，localStorage本地缓存，sessionStorage缓存 如果是sessionStorage则不需要设置缓存时间,默认当前小程序内缓存 */
  cacheType?: "localStorage" | "sessionStorage"
  /**错误重试次数 @default 2 */
  errorRetry: number,
  /**错误重试条件 @requires boolean true 重试 false 不重试 */
  retryControl: (opt: RequestOption<TypePrerequest>, e?: Error) => boolean,
}
```
 ## 1.请求缓存
```tsx
service.get("url", { cacheType: "sessionStorage"|"sessionStorage" })
```
 ## 2.请求合并
相同的两个请求将被合并，只向服务器发送一次请求，返回相同的参数
 ## 3.错误重试
```tsx
service.get("url", { errorRetry: 2, retryControl: (opt: RequestOption<TypePrerequest>, e?: Error) })
```
 ## 4.token无感刷新
* /src/path/service/middleware/lockToken.ts
***
# 4.全局组件注入
* 在config/index.js中配置
```tsx
webpackChain(chain) {
  chain.merge({
    module: {
      rule: {
        //全局注入锚点组件
        injectBaseComponentLoader: {
          test: /\.tsx$/,
          use: [{
            //锚点组件-全局组件锚点功能，路由返回监听锚点功能
            loader: path.resolve(__dirname, '../loaders/injectComponent/index.js'),
            options: {
              importPath: '@components/generalAnchor',
              componentName: "XmGeneralAnchor"
            },
          }],
        },
      },
    },
  });
},
```
 # 5.svg icon组件,icon本地模式
 ## 配置:iconfont.json
```json
{
  // www.iconfont.com中的图标地址
  "symbol_url": "http://at.alicdn.com/t/font_1802649_gwjvjqx064.js",
  //保存的icon组件文件路径
  "save_dir": "src/components/ui/icon",
  //保持的icon名称
  "trim_icon_prefix": "icon",
  //默认图标大小
  "default_icon_size": 22
}

```
 ## 使用方式
* 1.cd plugins/createIcon
* 2.npm i 
* 3.npm run build
* 4.cd ../.. 
* 5.npm run icon
* 执行完成将直接生成icon组件
***

# 6.svg webIcon
## 配置path/server/config.ts
* 1. export const iconUrl = "http://at.alicdn.com/t/font_3128401_8o4uz692zdu.js"
* 2. 解开 /src/components/ui/index.ts webIcon注释

# 7.XmPullRefresh 搭配 usePagingQuery
## 使用方式

```tsx
function Index() {
  const { pagingInfo, initPagingQuery, loadPagingMore } = usePagingQuery<TypeList.Item, TypeList.parameter>(getList, {})
  useEffect(() => {
    initPagingQuery(false)
  }, [])
  return <XmPullRefresh className="community-list bg-gray-2" refresherLoading={pagingInfo.refresherLoading} onRefresh={initPagingQuery} onToLower={loadPagingMore}>
      {pagingInfo.list.map(v => (
        <View>v</View>
      ))}
      <XmNoData {...pagingInfo} title="暂无数据" />
    </XmPullRefresh>
}

export default () => <Index></Index>

```
