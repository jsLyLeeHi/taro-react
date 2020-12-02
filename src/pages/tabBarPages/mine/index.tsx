import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { ToolTabBar, ToolPage } from '@components'
import './index.scss'
interface Index {

}
class Index extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <ToolPage renderBottom={<ToolTabBar />} style={{ paddingBottom: '100px' }}>
        <View style={{ marginTop: '20px', backgroundColor: 'yellow', color: 'white', height: '200px' }}>啊实打实</View>
        <View style={{ marginTop: '20px', backgroundColor: 'yellow', color: 'white', height: '200px' }}>啊实打实</View>
        <View style={{ marginTop: '20px', backgroundColor: 'yellow', color: 'white', height: '200px' }}>啊实打实</View>
        <View style={{ marginTop: '20px', backgroundColor: 'yellow', color: 'white', height: '200px' }}>啊实打实</View>
        <View style={{ marginTop: '20px', backgroundColor: 'yellow', color: 'white', height: '200px' }}>啊实打实</View>
        <View style={{ marginTop: '20px', backgroundColor: 'yellow', color: 'white', height: '200px' }}>啊实打实</View>
        <View style={{ marginTop: '20px', backgroundColor: 'yellow', color: 'white', height: '200px' }}>啊实打实</View>
        <View style={{ marginTop: '20px', backgroundColor: 'yellow', color: 'white', height: '200px' }}>啊实打实</View>
      </ToolPage>
    )
  }
}

export default Index

