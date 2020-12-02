import React from 'react'
import { View, Text } from "@tarojs/components";
import { ToolImgCdn } from '@components'
import "./index.scss";

interface P {
  list: {
    icon: string,
    title: string,
  }[],
  row?: number,
  onClick?: (index: number) => void
}
/**
 * 
 * @param list 
 * @param row number 默认值  5 
 */
export default function Index(props: P) {
  return <View className='index-nav1'>
    {props.list.map((val, index) => {
      return <View className='item' key={index + 'nav1'} style={{ width: `${100 / (props.row || 5)}%` }} onClick={() => { props.onClick && props.onClick(index) }}>
        <ToolImgCdn src={val.icon} size="90px*90px" style={{ borderRadius: '24px' }} />
        <Text>{val.title}</Text>
      </View>
    })}
  </View>
}