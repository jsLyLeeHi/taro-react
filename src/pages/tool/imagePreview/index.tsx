import { View, Swiper, SwiperItem } from "@tarojs/components";
import { observer } from "mobx-react";
import { XmImage, XmNavbar } from "@/components/tool";
import React, { useState, Fragment } from "react";
import { BaseRouter } from "@/path/router";
import "./index.scss";
function Index() {
  const data = BaseRouter.getData<{ list: { image: string, detail: string }[] }>()
  const imageList = data?.list || []
  const [value, setValue] = useState(0)
  return (
    <>
      <XmNavbar color="#fff" title={`${value + 1}/${imageList.length}`} />
      <View className="image-preview bg-black">
        <Swiper circular current={value} onChange={(ev) => setValue(ev.detail.current)} className="image-preview-swiper">
          {imageList.map((val, idx) => (
            <SwiperItem key={idx}>
              <XmImage src={val.image} mode="widthFix" className='image-preview-img' />
              <View className="image-preview-count c-white s-sm">{val.detail}</View>
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    </ >
  );
}

const Higher = React.memo(observer(Index));
export default () => <Fragment><Higher /></Fragment>
