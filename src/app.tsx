import { Component } from 'react'
import { userStore } from './store'
import { Provider } from 'mobx-react'
import { onApplyUpdate } from './path/tool/until';
import { mainPageList } from "@/app.config"
import { getPageInfo } from './path/acrossAPI';
import { Router } from './path/router';
import { XmDialogModal } from './components/public';
import "@static/scss/variable.css"
import "@static/scss/base.scss";
import './app.scss'

const store = {
  userStore,
}
/**对当前路由权限检查 */
function checkRoute() {
  const _pageRote = getPageInfo().route
  const _item = mainPageList.find(v => v.url === _pageRote)
  if (_item?.needLogin && !store.userStore.userInfo.userId) {
    XmDialogModal({
      title: "提示",
      content: "您需要登录后才能使用此功能",
      closeable: false,
      hideCancelBtn: true
    }).then(() => {
      Router.toTabbarIndex()
    })
    return
  }
}
class App extends Component {
  componentDidMount() { }

  componentDidShow() {
    onApplyUpdate()
  }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 就是要渲染的页面
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
