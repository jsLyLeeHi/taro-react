## 文件说明
___

#### config
**项目配置文件：可配置环境变量等**

#### src
**项目文件**

#### src/baseService
**数据请求封装：详见注释**

#### src/components/
**组件目录：详见注释**

#### src/components/dialogs
**对话框组件目录：此类组件以api方式调用，**
**需要在页面引入ToolPage组件作为组件容器**
**调用api的时候会将组件动态的注入ToolPage中**
**loading   notify   modal**
``` js
import React, { Component } from 'react'
import { ToolPage modal, notify } from '@components'
import './index.scss'
import { Button } from '@tarojs/components'
class Index extends Component {
  render() {
    return <ToolPage>
      <Button onClick={() => {
        notify.show({
          title: '提示框1',
        })
      }}>modal</Button>
    </ToolPage>
  }
}

export default Index


```


#### src/redux
**redux状态管理文件夹**