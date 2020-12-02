import React, { Component } from 'react'
import './app.scss'
import 'taro-tailwind/dist/tailwind.css'
import { getAddress } from '@path/location'
import { CreateContext, TypeContextState, Provider } from './path/context'

@CreateContext()
class App extends Component<{}, TypeContextState> {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    getAddress().then((res)=>{
      console.log(res)
    })
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
