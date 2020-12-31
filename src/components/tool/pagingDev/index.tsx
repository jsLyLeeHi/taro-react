
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from "@tarojs/components";
import { ToolNoData } from '@components'
import { calculatePageH } from "./until"
import "./index.scss";

interface P {
  renderTop: any
  children: any
  getList: (upData) => Promise<any>
  pageSize?: number
  noDataImgPath?: string
  noDataText?: string
  hideNodata?: boolean //是否显示暂无数据组件
  refresherEnabled?: boolean   //是否开始下拉刷新
}

export default function Index(props: P) {
  const scrollH = calculatePageH()
  const { loading, setPageIndex, hasEd, pageIndex, setHasEd, _onGetList, dataList } = onGetList(props)
  function onInit() {
    setPageIndex(1)
    setHasEd(false)
    _onGetList()
  }
  useEffect(() => {
    onInit()
    return () => {

    }
  }, [])
  function onToLower() {
    if (hasEd) return
    setPageIndex(pageIndex + 1)
    _onGetList()
  }
  console.log(dataList)
  return <View className='pagingIndex' id="pagingIndexBox">
    {props.renderTop}
    <ScrollView scrollY onScrollToLower={onToLower} refresherEnabled={props.refresherEnabled}
      onRefresherRefresh={onInit} refresherTriggered={loading} style={{ height: `${scrollH}px` }} id="pagingScrollBox" className='scrollBox'>
      {props.children ? props.children(dataList) : null}
      {props.hideNodata ? null : <ToolNoData loading={loading} list={dataList || []} hasEd={hasEd} noDataImgPath={props.noDataImgPath} noDataText={props.noDataText} />}
    </ScrollView>
  </View>
}


function onGetList(props: P) {
  let [pageIndex, setPageIndex] = useState(1)
  const [dataList, set_List] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [hasEd, setHasEd] = useState(false)
  const _pageSize = props.pageSize || 10

  function _getList() {
    _onGetList({
      _getList: props.getList,
      _pageIndex: pageIndex,
      _pageSize,
      setLoading
    }).then(({ list: _dataList, PageRecord }) => {
      if ((_dataList instanceof Array)) {
        let list: any[] = pageIndex > 1 ? dataList.concat(_dataList) : _dataList
        set_List(list)
        setHasEd(list.length >= PageRecord)
      } else {
        setHasEd(true)
      }
    })
  }

  return {
    loading,
    dataList,
    setPageIndex,
    pageIndex,
    setHasEd,
    _onGetList: hasEd ? () => { } : _getList,
    hasEd
  }
}

function _onGetList(params: {
  _getList: (upData) => Promise<any>,
  _pageIndex: number,
  _pageSize: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}): Promise<{
  list: any[],
  PageRecord: number
}> {
  return new Promise((resolve, reject) => {
    if (typeof params._getList !== 'function') return reject()
    params.setLoading(true)
    params._getList({
      index: params._pageIndex,
      size: params._pageSize
    }).then((res) => {
      params.setLoading(false)
      resolve(res.data)
    }, (res) => {
      params.setLoading(false)
      reject(res)
    })
  })
}