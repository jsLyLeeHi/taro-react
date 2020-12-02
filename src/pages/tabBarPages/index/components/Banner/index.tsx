import React from 'react'
import { Swiper, SwiperItem } from "@tarojs/components";
import { ToolImgCdn } from '@components'
import "./index.scss";

interface P {
  list: any[],
  imgKey?: string
}

export default function Index(props: P) {
  return <Swiper className='my-banner' autoplay indicatorDots>
    {(props.list instanceof Array) ? props.list.map((val, idx) => <SwiperItem className='item' key={idx + 'banner'}>
      <ToolImgCdn src={props.imgKey ? val[props.imgKey] : val} size='690px*100%' />
    </SwiperItem>) : null}
  </Swiper>
}