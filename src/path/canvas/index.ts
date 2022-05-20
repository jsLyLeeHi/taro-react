
/**
 * 判断文字是否超出最大宽度，超出则阶段并且显示省略号
 * @param _ctx 
 * @param str 
 * @param maxW 
 * @returns 
 */
export function tailorLongStr(_ctx: Taro.CanvasContext, str: string, maxW: number) {
  if (typeof str !== "string") return ""
  str = str.split('\n').join(' ')
  const _nameWidth = _ctx.measureText(str).width
  if (_nameWidth > maxW) {
    const _strLen = parseInt(maxW / (_nameWidth / str.length) + "")
    str = str.substring(0, _strLen) + "..."
  }
  return str
}
interface TypeRoundRect {
  x: number, y: number, w: number, h: number, r: number, boderOrBg: "border" | "background",
  borderColor?: string, bgColor?: string, hasShadow?: boolean
}
/**
* 
* @param {CanvasContext} ctx canvas上下文
* @param {number} x 圆角矩形选区的左上角 x坐标
* @param {number} y 圆角矩形选区的左上角 y坐标
* @param {number} w 圆角矩形选区的宽度
* @param {number} h 圆角矩形选区的高度
* @param {number} r 圆角的半径
* @param {number} borderColor 边框颜色
* @param {number} bgColor 背景颜色
*/
export function roundRect(ctx, params: TypeRoundRect) {
  // 开始绘制
  ctx.beginPath()
  if (params.hasShadow) {
    ctx.setShadow(0, 10, 20, 'rgba(13, 153, 146, 0.19)')
  }



  // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
  // 这里是使用 fill 还是 stroke都可以，二选一即可
  if (params.boderOrBg === "background") {
    ctx.setFillStyle('transparent')
  } else {
    ctx.setStrokeStyle('transparent')
  }
  // 左上角
  ctx.arc(params.x + params.r, params.y + params.r, params.r, Math.PI, Math.PI * 1.5)

  // border-top
  ctx.moveTo(params.x + params.r, params.y)
  ctx.lineTo(params.x + params.w - params.r, params.y)
  ctx.lineTo(params.x + params.w, params.y + params.r)
  // 右上角
  ctx.arc(params.x + params.w - params.r, params.y + params.r, params.r, Math.PI * 1.5, Math.PI * 2)

  // border-right
  ctx.lineTo(params.x + params.w, params.y + params.h - params.r)
  ctx.lineTo(params.x + params.w - params.r, params.y + params.h)
  // 右下角
  ctx.arc(params.x + params.w - params.r, params.y + params.h - params.r, params.r, 0, Math.PI * 0.5)

  // border-bottom
  ctx.lineTo(params.x + params.r, params.y + params.h)
  ctx.lineTo(params.x, params.y + params.h - params.r)
  // 左下角
  ctx.arc(params.x + params.r, params.y + params.h - params.r, params.r, Math.PI * 0.5, Math.PI)

  // border-left
  ctx.lineTo(params.x, params.y + params.r)
  ctx.lineTo(params.x + params.r, params.y)

  //背景颜色
  ctx.fillStyle = params.bgColor || '#ffffff'; //若是给定了值就用给定的值否则给予默认值  
  //边框颜色
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = params.borderColor || '#000000';

  // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
  if (params.boderOrBg === "background") {
    ctx.fill()
  } else {
    ctx.stroke()
  }
  ctx.restore();
  ctx.closePath()
  // 剪切
  // ctx.clip()

  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
}

export function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
/**
* 绘制等边三角形
* @param ctx 
* @param params 
*/
export function drawTriangle(ctx: any, params = {
  left: 100,
  top: 100,
  size: 40,
  rotate: 20
}) {
  //填充三角形（等边）
  ctx.beginPath();
  const height = params.size * Math.sin(Math.PI / 3);//计算等边三角形的高
  ctx.moveTo(params.left + params.size / 2, params.top); //从A（100,0）开始
  ctx.lineTo(params.left, params.top + height);//从A(100,0)开始，画到B (0,173)结束
  ctx.lineTo(params.left + params.size, params.top + height); //B(0,173)-C(200,173)
  ctx.fillStyle = '#00ff00';//以纯色绿色填充
  ctx.fill(); //闭合形状并且以填充方式绘制出来
  ctx.closePath()
}