import React from 'react'
import { View, Text } from "@tarojs/components";
import { ToolIcon } from '@components'
import { Router } from '@path/router'
import "./index.scss";

interface P {
  selectText: string,
  placeholder: string
}

export default function Index(props: P) {
  async function onNavChooseCity() {
    const data = await Router.navigateTo({
      url: '/pages/toolPage/selectCity/index',
    }, {
      params: {
        a: 1
      }
    })
    console.log(data)
  }


  return <View className='index-serch'>
    <View className='item' onClick={onNavChooseCity}>
      <Text>{props.selectText || ''}</Text>
      <ToolIcon icon='iconxiala' fontSize='22px' />
    </View>
    <View className='item'>
      <Text>{props.placeholder || ''}</Text>
      <ToolIcon icon='iconsousuo' fontSize='22px' />
    </View>
  </View>
}