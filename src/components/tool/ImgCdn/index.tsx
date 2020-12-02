import React, { Component } from 'react'
import { Image } from '@tarojs/components'
import { getPageStyle } from '@static/js/until'
import "./index.scss";



type P = {
  src: string | undefined;
  size: string;//此属性只能传入宽高  并且以*分割  10px*20px  style中的宽高会被size中的覆盖
  className: string;
  style: string | React.CSSProperties | undefined  
  defImg: string;//默认图片
  onClick: () => void
  mode?: "scaleToFill" | "aspectFit" | "aspectFill" | "widthFix" | "top" | "bottom" | "center" | "left" | "right" | "top left" | "top right" | "bottom left" | "bottom right" | undefined
};

class Index extends Component<P> {
  static options = {
    addGlobalClass: true
  }
  static defaultProps = {
    defImg: '',
    size: '',
    className: '',
    style: {},
    borderRadius: '',
    onClick: () => { }
  };
  constructor(props) {
    super(props);
  }
  getSrc(url = "", defImg = '') {
    if (typeof url != "string") {
      throw "The Url must be string in components/imgcdn:function getSrc";
    };
    if (url.indexOf("http") != -1 || url.indexOf("data:image") != -1) {
      return url;
    }
    return url ? `${CONFIG.IMGLINK}${url}` : CONFIG.IMGLINK + defImg;
  }

  render() {
    const { src, size, defImg, mode, style, className } = this.props;
    const _imgurl = this.getSrc(src || '', defImg || "")
    if (size && style) {
      const _size = size.split('*')
      if (_size.length) {
        style['width'] = _size[0]
      }
      if (_size.length > 1) {
        style['height'] = _size[1]
      }
    }
    const _style = getPageStyle(style)
    return (
      <Image
        className={className}
        mode={mode || 'scaleToFill'}
        style={_style}
        src={_imgurl}
        onClick={this.props.onClick}
      ></Image>
    );
  }
}
export default Index;
