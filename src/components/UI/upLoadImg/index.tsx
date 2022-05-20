import Taro from "@tarojs/taro"
import { View } from '@tarojs/components'
import React from "react";
import { onChooseImg } from "@/path/acrossAPI";
import { uploadFileMore } from "@/path/service/request/uploadOld";
import { XmIcon } from "..";
import { XmImage } from "@/components/tool";
import { getImageSrc } from "@/path/tool/until";
import './index.scss'

function Index(props: { list: string[] | string, separator?: string, maxlength?: number, onChange?: (list: string[] | string) => void, disable?: boolean }) {
  const _maxlength = props.maxlength || 5
  const imgList = ((typeof props.list === "string") && props.list.length) ? props.list.split(props.separator || ",") : (props.list instanceof Array) ? props.list : []

  async function onUpLoad() {
    const _imgArr = await onChooseImg({ count: _maxlength - imgList.length })
    const _resimgList = await uploadFileMore({
      url: "/file/upload",
      filePath: _imgArr,
      name: "file"
    })
    const _newList = _resimgList.data.map(v => ({ url: v, type: "", name: v, path: "" }))
    const _list = [...(_newList || []).map(v => v.name), ...imgList]
    onImgChange(_list)
  }
  function onDelete(idx: number) {
    if (idx >= 0) {
      const _list = [...imgList]
      _list.splice(idx, 1)
      onImgChange(_list)
    }
  }

  function onImgChange(_list: string[]) {
    if (typeof props.onChange === "function") {
      props.onChange((typeof props.list === "string") ? _list.join(props.separator || ",") : _list)
    }
  }
  function onPriview(index: number = 0) {
    Taro.previewImage({
      urls: imgList.map(v => getImageSrc(v)),
      current: getImageSrc(imgList[index])
    })
  }
  return <>
    <View className="yz-uploadimg">
      {imgList.length < _maxlength && !props.disable ? (
        <View className="yz-uploadimg-item-box">
          <View className="yz-uploadimg-item bg-gray-2" onClick={onUpLoad}>
            <XmIcon size={40} icon="tianjia"></XmIcon>
          </View>
        </View>
      ) : null}
      {imgList.map((val, index) => (
        <View className="yz-uploadimg-item-box">
          <View className="yz-uploadimg-item" onClick={() => onPriview(index)}>
            <XmImage className="yz-uploadimg-item-image bg-gray-2" src={val}></XmImage>
            {!props.disable ? <View className="yz-uploadimg-item-lable bg-main" onClick={e => { e.stopPropagation(); onDelete(index) }}>
              <XmIcon size={16} icon="tianjia"></XmIcon>
            </View> : null}
          </View>
        </View>
      ))}
    </View>
  </>
}
export default React.memo(Index)