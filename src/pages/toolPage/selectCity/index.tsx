import React from 'react'
import { View, ScrollView } from '@tarojs/components'
import { ToolPage, UiSidebar } from '@components'
import { useRouter } from '@path/router'
import CountItem from './countItem'
import './index.scss'


export default function Index() {
  const { backData } = useRouter()
  let list = ['贵阳市', '贵阳市', '贵阳市', '贵阳市贵阳市贵阳市贵阳市贵阳市', '贵阳市', '贵阳市', '贵阳市', '贵阳市', '贵阳市', '贵阳市', '贵阳市', '贵阳市', '贵阳市', '贵阳市', '贵阳市', '贵阳市', '贵阳市',]
  function onChoose() {
    console.log('Router')
    backData({ cityName: '深圳', adcode: 'xxxx' })
  }
  return <ToolPage>
    <View className='select-city-page'>
      <UiSidebar list={list} index={0} />
      <ScrollView scrollY className='page-count'>
        <CountItem list={list} title='热门城市' onClick={onChoose} />
        <CountItem list={list} title='热门城市' onClick={onChoose} />
        <CountItem list={list} title='热门城市' onClick={onChoose} />
      </ScrollView>
    </View>
  </ToolPage>
}

