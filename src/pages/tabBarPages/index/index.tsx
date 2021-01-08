import React from 'react'
// import { View } from '@tarojs/components'
import { ToolPage, UiIndexSerch, ToolPagingDev, modal, ToolTabBar, notify } from '@components'
import IndexBanner from './components/Banner'
import IndexNav1 from './components/nav1'
import IndexNav2 from './components/nav2'
import './index.scss'
import { View } from '@tarojs/components'
import { getJobList } from "@api/index"

interface Index {
  state: {

  }//
}
function getList(updata): Promise<{ data: { PageRecord: number, list: any[] } }> {
  return new Promise((resolve, reject) => {
    getJobList({
      pageNo: updata.index,
      pageSize: updata.size
    }).then((res) => {
      const _data = {
        data: {
          PageRecord: res.data.totalElements,
          list: res.data.dataList
        }
      }
      resolve(_data)
    }, reject)
  })
}
export default function Index() {
  return <ToolPage renderBottom={<ToolTabBar />} style={{ paddingBottom: '100px' }}>
    <ToolPagingDev id='pageIndex' refresherEnabled getList={getList} renderTop={<UiIndexSerch selectText={'贵阳'} placeholder='请输入想要找的岗位名称' />}>
      {(_list) => <View>
        <IndexBanner list={[]} imgKey='photo' />

        <IndexNav1 list={[{ icon: '/recruitApplyFor/index/1.png', title: '销售' }, { icon: '/recruitApplyFor/index/2.png', title: '市场' },
        { icon: '/recruitApplyFor/index/3.png', title: '运营' }, { icon: '/recruitApplyFor/index/4.png', title: '产品' },
        { icon: '/recruitApplyFor/index/5.png', title: '更多' }]} />

        <IndexNav2 onItemClick={() => {
          modal.show({
            title: '嘿嘿1',
            content: <View style={{ color: 'red' }}>"modal-box"</View>,
            showClose: true,
            buttons: [{ text: '呵呵' }],
          })
        }} list={['/recruitApplyFor/index/6.png', '/recruitApplyFor/index/7.png', '/recruitApplyFor/index/8.png',
          '/recruitApplyFor/index/9.png']} />
        <View>
          {(_list instanceof Array) ? _list.map((val, index) => (
            <View onClick={() => {
              notify.show({ title: "啊实打实的" })
              notify.show({ title: "啊实打实的" })
              notify.show({ title: "啊实打实的" })
              notify.show({ title: "啊实打实的" })
              notify.show({ title: "啊实打实的" })
              notify.show({ title: "啊实打实的" })
            }} key={index + 'item'} style={{ width: '100%', height: '100rpx', marginTop: '20px', backgroundColor: 'red' }}>{val.jobName}</View>
          )) : null}
        </View>
      </View>}
    </ToolPagingDev>

  </ToolPage>
}

