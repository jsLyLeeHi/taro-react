
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from "@tarojs/components";
import { ToolNoData } from '@components'
import { calculatePageH } from "./until"
import "./index.scss";

interface P {
  renderTop: any
  children: any
  getList: (upData) => Promise<{
    [proName: string]: any
    data: {
      PageRecord: number,
      list: any[]
    }
  }>//获取数据的函数
  pageSize?: number//每页数据数量
  noDataImgPath?: string //没有数据时显示的图片
  noDataText?: string//没有数据时显示的提示文字
  hideNodata?: boolean //是否显示暂无数据组件
  refresherEnabled?: boolean   //是否开始下拉刷新
  id: string//组件ID
}

export default function Index(props: P) {
  const scrollH = calculatePageH(props.id)
  const { loading, setPageIndex, hasEd, pageIndex, setHasEd, _onGetList, dataList } = onGetList(props)
  function onInit() {
    setPageIndex(1)
    setHasEd(false)
    _onGetList()
  }
  useEffect(() => {
    onInit()
  }, [])
  function onToLower() {
    if (hasEd || loading) return
    setPageIndex(pageIndex + 1)
    _onGetList()
  }
  return <View className='pagingIndex' id={`${props.id}box`}>
    {props.renderTop}
    <ScrollView scrollY onScrollToLower={onToLower} refresherEnabled={props.refresherEnabled}
      onRefresherRefresh={onInit} refresherTriggered={loading} id={`${props.id}scrollbox`} className='scrollBox'
      style={{ height: `${scrollH}px` }}>
      {props.children ? props.children(dataList) : null}
      {props.hideNodata ? null : <ToolNoData loading={loading} list={dataList || []} hasEd={hasEd} noDataImgPath={props.noDataImgPath} noDataText={props.noDataText} />}
    </ScrollView>
  </View>
}

/**
 * 获取数据的hooks函数
 * 
 * @param props P
 */
function onGetList(props: P) {
  let [pageIndex, setPageIndex] = useState(1)
  const [dataList, set_List] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [hasEd, setHasEd] = useState(false)
  const _pageSize = props.pageSize || 10

  function _getList() {
    _onGetList({
      _getdata: props.getList,
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
    _onGetList: _getList,
    hasEd
  }
}


/**
 * 
 * @param params 
 *  _getdata: (upData) => Promise<any>,//获取数据的函数
 *  _pageIndex: number,//当前页码
 *  _pageSize: number,//每页数据数量
 *  setLoading: React.Dispatch<React.SetStateAction<boolean>> //设置loading状态的hooks函数
 */
function _onGetList(params: {
  _getdata: (upData) => Promise<any>,
  _pageIndex: number,
  _pageSize: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}): Promise<{
  list: any[],
  PageRecord: number
}> {
  return new Promise((resolve, reject) => {
    if (typeof params._getdata !== 'function') return reject()
    params.setLoading(true)
    params._getdata({
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