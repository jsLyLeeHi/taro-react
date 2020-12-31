import React, { Component } from 'react'
import { ScrollView } from "@tarojs/components";
import { ToolNoData } from '@components'
import "./index.scss";

interface P {
  children?: any//列表DOM
  renderTop?: any//列表的头部显示DOM
  refresherEnabled: boolean   //是否开始下拉刷新
  pageSize: number//页总数
  readyLoad: boolean //是否在组件加载完成立即加载数据
  hideNodata: boolean //是否显示暂无数据组件
  noDataImgPath?: string//没有数据时显示的图片
  noDataText?: string//没有数据时显示的文字
  getListFn: (upData) => Promise<any>  //获取列表数据的方法  此方法返回一个promise
}
interface S {
  pageList: any[] //列表数据
  pageIndex: number //当前页码
  hasEd: boolean  //是否还有更多
  isLoading: boolean
  refresherTriggered: boolean //是否开启下拉刷新
}

class Index extends Component<P, S> {
  static defaultProps = {
    defUpData: {},
    readyLoad: true,
    pageSize: 10,
    refresherEnabled: false,
    hideNodata: false
  };
  constructor(props) {
    super(props);
    this.state = {
      pageList: [],
      pageIndex: 1,
      isLoading: false,
      hasEd: false,
      refresherTriggered: false
    };
  }
  componentDidMount() {
    const { readyLoad } = this.props
    if (readyLoad) {
      this.onGetList()
    }
  }
  onInit() {
    this.setState({
      pageIndex: 1,
      hasEd: false,
      refresherTriggered: true
    }, () => {
      this.onGetList()
    })
  }

  onGetList() {
    if (this.props.getListFn) {
      this.setState({
        isLoading: true,
      }, () => {
        const { pageSize } = this.props
        const { pageIndex, pageList, refresherTriggered } = this.state
        this.props.getListFn({ page_index: pageIndex, page_size: pageSize }).then((res: { data: any }) => {
          let rData = res.data || {},
            list: any[] = pageIndex > 1 ? pageList.concat(rData.list) : rData.list
          let hasEd = list.length >= rData.PageRecord
          const _state = {
            isLoading: false,
            pageList: list,
            hasEd: hasEd
          }
          if (refresherTriggered) {
            _state['refresherTriggered'] = false
          }
          this.setState(_state)
        }).catch(() => {
          const _state = {
            isLoading: false,
          }
          if (refresherTriggered) {
            _state['refresherTriggered'] = false
          }
          this.setState(_state)
        })
      })
    }

  }
  onToLower() {
    const { pageIndex, hasEd } = this.state
    if (hasEd) return
    this.setState({
      pageIndex: pageIndex + 1
    }, () => {
      this.onGetList()
    })
  }
  render() {
    const { pageList, hasEd, isLoading, refresherTriggered } = this.state
    const { hideNodata, refresherEnabled, noDataImgPath, noDataText } = this.props
    return (
      <ScrollView refresherEnabled={refresherEnabled} refresherTriggered={refresherTriggered} onRefresherRefresh={this.onInit.bind(this)}
        className='paging-index' scrollY onScrollToLower={this.onToLower.bind(this)} >
        {this.props.renderTop}
        {pageList ? this.props.children(pageList) : null}
        {hideNodata ? null : <ToolNoData loading={isLoading} list={pageList || []} hasEd={hasEd} noDataImgPath={noDataImgPath} noDataText={noDataText} />}
      </ScrollView>
    );
  }
}
export default Index;
