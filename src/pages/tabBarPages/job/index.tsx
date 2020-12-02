import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { ToolPage, loading, ToolTabBar } from '@components'
import './index.scss'
interface Index {

}
class Index extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <ToolPage renderBottom={<ToolTabBar />} style={{ paddingBottom: '100px' }}>
        <View onClick={() => {

          loading.show({ title: '嘿嘿嘿' })
          setTimeout(() => {
            loading.hide()
          }, 2000);
        }} style={{ marginTop: '20px', backgroundColor: 'blue', color: 'white', height: '200px' }}>啊实打实</View>
      </ToolPage>
    )
  }
}

export default Index

