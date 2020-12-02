
import React, { Component } from 'react'
import { View, Text, Block } from '@tarojs/components'
import { ToolImgCdn } from '@components'
import './index.scss'


type P = {
	loading: boolean,
	list: any,
	hasEd: boolean,

	noDataImgPath: string
	noDataText: string
}
class Index extends Component<P> {
	static options = { addGlobalClass: true }
	static defaultProps = {
		loading: false,
		list: [],
		hasEd: false,
		noDataImgPath: 'img_cart_no_date.png',
		noDataText: '暂无数据'
	}
	constructor(props) {
		super(props);
	}
	state = {

	}
	render() {
		let { loading, list, hasEd, noDataImgPath, noDataText } = this.props;
		return (
			<View className='nodata-box mb20'>
				{loading ?
					<Text className='text-gray'>加载中...</Text>
					:
					<Block>
						{list.length > 0 ?
							<Text className='text-small c-gray'>{hasEd ? '没有更多了' : '上拉加载更多'}</Text>
							:
							<View className='ac mt30 mb30 pt20 pb20'>
								<ToolImgCdn src={noDataImgPath} size='220px*220px' />
								<View className='text-big c-gray pt20 mt20'>{noDataText}</View>
							</View>
						}
					</Block>
				}
			</View>
		)
	}
}
export default Index;