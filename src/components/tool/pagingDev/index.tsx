
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from "@tarojs/components";
import { ToolNoData } from '@components'
import { calculatePageH } from "./until"
import "./index.scss";

interface P {
  children: any
  getList: (upData) => Promise<{
    [proName: string]: any
    data: {
      PageRecord: number,
      list: any[]
    }
  }>//获取数据的函数
  id: string//组件ID
  renderTop?: any//组件顶部固定的栏目，不随着页面滚动
  pageSize?: number//每页数据数量
  noDataImgPath?: string //没有数据时显示的图片
  noDataText?: string//没有数据时显示的提示文字
  hideNodata?: boolean //是否显示暂无数据组件
  refresherEnabled?: boolean   //是否开始下拉刷新
}

/**
 * 
 * @param renderTop?: any//组件顶部固定的栏目，不随着页面滚动
 * @param pageSize?: number//每页数据数量
 * @param noDataImgPath?: string //没有数据时显示的图片
 * @param noDataText?: string//没有数据时显示的提示文字
 * @param hideNodata?: boolean //是否显示暂无数据组件
 * @param refresherEnabled?: boolean   //是否开始下拉刷新
 * @param id: string//组件ID
 * 
 * 
 * @param children
 * ```tsx
 *  <ToolPagingDev id='pageIndex' refresherEnabled getList={getList} renderTop={<UiIndexSerch selectText={'贵阳'} placeholder='请输入想要找的岗位名称' />}>
 *      {(_list) => _list.map((val) => (
 *        <View key={val.id}>{val.jobName}</View>
 *     ))}
 *  </ToolPagingDev>
 * ```
 * 
 * @param getList 
 *  ```tsx
 * function getList(updata): Promise<{ data: { PageRecord: number, list: any[] } }> {
 *  return new Promise((resolve, reject) => {
 *   getJobList({
 *     pageNo: updata.index,
 *     pageSize: updata.size
 *   }).then((res) => {
 *     const _data = {
 *       data: {
 *         PageRecord: res.data.totalElements,
 *         list: res.data.dataList
 *       }
 *     }
 *     resolve(_data)
 *   }, reject)
 * })
 *}
 * ```
 */

export default function Index(props: P) {
  const scrollH = calculatePageH(props.id)
  const { loading, setPageIndex, hasEd, pageIndex, setHasEd, _onGetList, dataList } = onGetList(props)
  function onInit() {
    let _pageIndex = 1
    setPageIndex(_pageIndex)
    setHasEd(false)
    _onGetList(_pageIndex)
  }
  useEffect(() => {
    onInit()
  }, [])
  function onToLower() {
    if (hasEd || loading) return
    let _pageIndex = pageIndex + 1
    setPageIndex(_pageIndex)
    _onGetList(_pageIndex)
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

  function _getList(_pIdx: number) {
    _onGetList({
      _getdata: props.getList,
      _pageIndex: _pIdx,
      _pageSize,
      setLoading
    }).then(({ list: _dataList, PageRecord }) => {
      if ((_dataList instanceof Array)) {
        let list: any[] = _pIdx > 1 ? dataList.concat(_dataList) : _dataList
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