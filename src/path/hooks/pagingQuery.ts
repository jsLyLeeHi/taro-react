import { useRef, useState } from "react"
import { PQResponse } from '@/path/service/package/types'
export type TypePagingData<T> = {
  list: T[]
  total: number
}
/**获取列表数据的函数 */
type TypeGetListFn<P, T> = (params: P) => Promise<PQResponse<TypePagingData<T>>>
type TypePagingInfo<T> = {
  /**列表参数 */
  list: T[],
  /**数据总数 */
  total: number,
  /**是否还有更多 */
  hasMore: boolean,
  /**是否加载中 */
  loading: boolean,
  /**是否下拉刷新中 */
  refresherLoading: boolean,
  /**是否网络请求错误 */
  netWorkError: boolean,
}
/**返回参数 */
type TypeReturnVal<T, P> = {
  /**请求传入参数 */
  pagingParams: P,
  /**设置请求传入参数 */
  setPagingParams: (ev: P) => void
  /**清空数据内容 */
  onPageingClear: () => void
  /**重新设置列表中某一项的数据,valKey:需要对比的数据 不传则对比Item */
  setPagingItem: (p: T, valKey?: string) => void
  /**下拉刷新 */
  initPagingQuery: (refresherLoading?: boolean) => void,
  /**上滑加载 */
  loadPagingMore: () => void,
  /**分页参数 */
  pagingInfo: TypePagingInfo<T>,
}
/**分页参数配置项 */
const defPagingKeys = { pageNo: "page", pageSize: "limit", pageTotal: "total", dataList: "list" }
/**
* 分页查询hooks 
* ```tsx
* import { XmPullRefresh,XmNoData } from "@/components/tool";
* const { pagingParams, setPagingParams, pagingInfo, initPagingQuery, loadPagingMore } = usePagingQuery<TypeItem,TypeParams>(getList,{});
*<XmPullRefresh renderButtom={<YzTabbar />} refresherLoading={pagingInfo.refresherLoading} onRefresh={initPagingQuery} onToLower={loadPagingMore}>
*  {pagingInfo.list.map((val, index) => <ComponentItem key={index} detail={val} />)}
*  <XmNoData title="暂无数据" {...pagingInfo} />
*</XmPullRefresh>
* ```
*/
export function usePagingQuery<T, P>(onGetList: TypeGetListFn<P, T>, params: P, pagingKeys = defPagingKeys): TypeReturnVal<T, P> {
  const paramsObj = useRef<P>({ [pagingKeys.pageNo]: 1, [pagingKeys.pageSize]: 10, ...params })
  const [pagingParams, setPagingParams] = useState<P>(paramsObj.current)
  const [pagingInfo, setPageInfo] = useState<TypePagingInfo<T>>({ list: [], total: 0, hasMore: true, loading: false, refresherLoading: false, netWorkError: false })
  /**设置传入参数 */
  function setParams(params: P) {
    paramsObj.current = { ...paramsObj.current, ...(params || {}) }
    setPagingParams(paramsObj.current)
  }
  /**设置列表中的某项数据 */
  function setPagingItem(item: T, valKey?: string) {
    const _idx = pagingInfo.list.findIndex(v => valKey ? v[valKey] === item[valKey] : v === item)
    const _list = [...pagingInfo.list]
    _list[_idx] = item
    setPageInfo({
      ...pagingInfo,
      list: _list
    })
  }
  /**获取列表数据 */
  function getList() {
    onGetList(paramsObj.current).then((res) => {
      const _list = paramsObj.current[pagingKeys.pageNo] === 1 ? res.data[pagingKeys.dataList] : pagingInfo.list.concat(res.data[pagingKeys.dataList])
      setPageInfo({
        ...pagingInfo,
        list: _list,
        total: res.data[pagingKeys.pageTotal],
        hasMore: !(_list.length >= res.data[pagingKeys.pageTotal]),
        loading: false,
        refresherLoading: false,
        netWorkError: false,
      })
    }).catch(() => {
      setParams({
        ...paramsObj.current,
        [pagingKeys.pageNo]: 1,
      })
      setPageInfo({
        ...pagingInfo,
        loading: false,
        hasMore: true,
        refresherLoading: false,
        netWorkError: true,
        list: [],
      })
    })
  }
  /**下拉刷新 */
  function initPagingQuery(refresherLoading: boolean = true) {
    setPageInfo({
      ...pagingInfo,
      loading: true,
      hasMore: true,
      refresherLoading,
      netWorkError: false,
      list: [],
    })
    setParams({
      ...paramsObj.current,
      [pagingKeys.pageNo]: 1
    })
    paramsObj.current[pagingKeys.pageNo] = 1
    getList()
  }
  /**上滑加载 */
  function loadPagingMore() {
    if (!pagingInfo.hasMore) return
    setParams({
      ...paramsObj.current,
      [pagingKeys.pageNo]: paramsObj.current[pagingKeys.pageNo] + 1
    })
    setPageInfo({
      ...pagingInfo,
      loading: true,
    })
    getList()
  }
  function onPageingClear() {
    setParams({
      ...paramsObj.current,
      [pagingKeys.pageNo]: 1,
      ...params
    })
    setPageInfo({
      ...pagingInfo,
      loading: false,
      hasMore: true,
      refresherLoading: false,
      netWorkError: false,
      list: [],
    })
  }
  return {
    pagingParams,
    pagingInfo,
    onPageingClear,
    setPagingParams: setParams,
    setPagingItem,
    initPagingQuery,
    loadPagingMore,
  }
}