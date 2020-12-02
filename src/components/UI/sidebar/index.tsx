import React from 'react'
import { View, Text, ScrollView } from "@tarojs/components";
import "./index.scss";

interface P {
  list: any[]
  itemKey?: string,
  index?: number
  onClick?: (index: number) => void
}

export default function Index(props: P) {
  return <ScrollView className='ui-sidebar' scrollY>
    {props.list && props.list.map((val, idx) => {
      return <View className='item' key={idx + 'item'} onClick={() => {
        props.onClick && props.onClick(idx)
      }}>
        <View className={`line ${props.index === idx ? 'line-checked' : ''}`}></View>
        <Text className='text'>{val}</Text>
      </View>
    })}
  </ScrollView>
}