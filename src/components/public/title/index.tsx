import React from 'react'
import { View, Text } from "@tarojs/components";
import { ToolIcon } from '@components'
import "./index.scss";

interface P {
  selectText: string,
  placeholder: string
}

export default function Index(props: P) {
  return <View className='index-serch'>
    <View className='item'>
      <Text>{props.selectText || ''}</Text>
      <ToolIcon icon='iconxiala' fontSize='22px' />
    </View>
    <View className='item'>
      <Text>{props.placeholder || ''}</Text>
      <ToolIcon icon='iconsousuo' fontSize='22px' />
    </View>
  </View>
}