import { Image } from '@tarojs/components'
import React, { useEffect, useState } from 'react'
import { getImageSrc, getWhStyle } from '@/path/tool/until'
import './index.scss'
interface TypeProps {
  src: string,
  static?: boolean,
  defaultImage?: string,
  showMenuByLongpress?: boolean,
  className?: string,
  mode?: keyof TypeImageModal,
  lazyLoad?: boolean,
  size?: string | number,
  onClick?: (_url: string) => void,
  style?: React.CSSProperties
}

function Index(props: TypeProps) {
  const [imgUrl, setImgUrl] = useState("")
  function onError() {
    setImgUrl(props.defaultImage || getImageSrc("icon/img-error.jpg", true))
  }
  useEffect(() => {
    if (!props.src) onError()
    else setImgUrl(getImageSrc(props.src, props.static))
  }, [props.src])
  function onImageClick() {
    if (props.onClick instanceof Function) props.onClick(imgUrl)
  }
  return (
    <Image onClick={onImageClick} showMenuByLongpress={props.showMenuByLongpress} src={imgUrl} onError={onError}
      className={props.className} mode={props.mode} lazy-load={props.lazyLoad}
      style={{ ...(getWhStyle(props.size) || {}), ...(props.style || {}) }} />
  )
}
export default React.memo(Index)



/** mode 的合法值 */
interface TypeImageModal {
  /** 缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素 */
  scaleToFill
  /** 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。 */
  aspectFit
  /** 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。 */
  aspectFill
  /** 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变 */
  widthFix
  /** 缩放模式，高度不变，宽度自动变化，保持原图宽高比不变 */
  heightFix
  /** 裁剪模式，不缩放图片，只显示图片的顶部区域 */
  top
  /** 裁剪模式，不缩放图片，只显示图片的底部区域 */
  bottom
  /** 裁剪模式，不缩放图片，只显示图片的中间区域 */
  center
  /** 裁剪模式，不缩放图片，只显示图片的左边区域 */
  left
  /** 裁剪模式，不缩放图片，只显示图片的右边区域 */
  right
  /** 裁剪模式，不缩放图片，只显示图片的左上边区域 */
  'top left'
  /** 裁剪模式，不缩放图片，只显示图片的右上边区域 */
  'top right'
  /** 裁剪模式，不缩放图片，只显示图片的左下边区域 */
  'bottom left'
  /** 裁剪模式，不缩放图片，只显示图片的右下边区域 */
  'bottom right'
}