import React from 'react'
import { View, Text } from '@tarojs/components'

interface P {
  title: string,
  list: any[],
  itemKey?: string
  onClick?: (index: number) => void
}

export default function CountItem(props: P) {
  return <View className='count-item'>
    <View className='title'>{props.title || ''}</View>
    <View className='count-item-count'>
      {props.list && props.list.map((val, index) => {
        return <View className='item' key={index + 'count-item'} onClick={() => { props.onClick && props.onClick(index) }}>
          <View className='btn'>
            <Text className='one-ellipsis'>{val}</Text>
          </View>
        </View>
      })}
    </View>
  </View>
}