import Taro from "@tarojs/taro"
const wpx = Taro.getSystemInfoSync().windowWidth / 750; //按照750的屏宽
import { canvasToTempFilePath, onSaveImage } from '@/path/acrossAPI'
import { XmToast } from "@components/public"

/**
 * 通过canvas生成图片
 * @param p 
 */
export function creatImageByCanvas(p: { canvasId: string, width: number, height: number }) {
  canvasToTempFilePath({
    x: 0,
    y: 0,
    width: p.width * wpx,
    height: p.height * wpx,
    destWidth: p.width * wpx,
    destHeight: p.height * wpx,
    canvasId: p.canvasId,
    fileType: "jpg",
    quality: 1,
  }).then((res) => {
    return onSaveImage(res.tempFilePath);
  }).then(() => {
    XmToast.open("保存成功");
  });
}