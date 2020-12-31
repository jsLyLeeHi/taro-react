import React from 'react'
import { View } from "@tarojs/components";
import { ToolImgCdn } from '@components'
import "./index.scss";

interface P {
  list: any[],
  imgKey?: string,
  onItemClick?: (index) => void
}

// export default function Index(props: P) {
//   return <View className='index-nav2'>
//     {props.list.map((val, index) => {
//       return <ToolImgCdn onClick={() => {
//         props.onItemClick && props.onItemClick(index)
//       }} key={index + 'nav2'} src={props.imgKey ? val[props.imgKey] : val} size='160px*100px' style={{ borderRadius: '16px' }} />
//     })}
//   </View>
// }

export default function Index(props: P) {
  return <View className="max-w-full m-10 flex p-6 bg-white rounded-lg shadow-xl" onClick={() => {
    props.onItemClick && props.onItemClick(1)
  }}>
    <View className="flex-shrink-0">
      <ToolImgCdn className="h-20 w-20" src="https://imgm.gmw.cn/attachement/jpg/site215/20200929/5388955273616208843.jpg"></ToolImgCdn>
    </View>
    <View className="ml-6 pt-1">
      <View className="text-xl text-gray-900 leading-tight">确认弹出框</View>
      <View className="text-base text-gray-600 leading-normal">请点击</View>
    </View>
  </View>
}