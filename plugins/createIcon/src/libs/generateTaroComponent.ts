import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import glob from 'glob';
import colors from 'colors';
import { XmlData } from './fetchXml';
import { Config } from './getConfig';
import { generateCase } from "./taroutils"
export const generateTaroComponent = (data: XmlData, config: Config) => {
  const svgTemplates: string[] = [];
  const names: string[] = [];
  const saveDir = path.resolve(config.save_dir);
  const fileName = 'index';
  mkdirp.sync(saveDir);
  glob.sync(path.join(saveDir, '*')).forEach((file) => fs.unlinkSync(file));
  data.svg.symbol.forEach((item) => {
    const iconId = item.$.id;
    const iconIdAfterTrim = config.trim_icon_prefix
      ? iconId.replace(
        new RegExp(`^${config.trim_icon_prefix}(.+?)$`),
        (_, value) => value.replace(/^[-_.=+#@!~*]+(.+?)$/, '$1')
      )
      : iconId;

    names.push(iconIdAfterTrim);
    svgTemplates.push(
      `"${iconIdAfterTrim}":"${generateCase(item, { hexToRgb: true })}",`
    );

    console.log(`${colors.green('√')} Generated icon "${colors.yellow(iconId)}"`);
  });
  fs.writeFileSync(
    path.join(saveDir, fileName + '.tsx'),
    `
import Taro from "@tarojs/taro"
import { View } from '@tarojs/components'
import React from "react";
import getIcon from "./icons"
import './index.scss'
export type TypeIcons = ${names.map(v => `'${v}'`).join(" | ")}
interface TypeProps {
  icon: TypeIcons,
  className?: string,
  color?: string | string[],
  onClick?: () => void,
  /** @example "100*120" | 120 */
  size?: string | number,
  style?: React.CSSProperties
}
function Index(props: TypeProps) {
  function toPx(p: number) {
    return Taro.pxTransform(p)
  }
  function getWhStyle(size?: string | number) {
    const _obj: { width?: string, height?: string } = {};
    if (typeof size === "string" && size.length > 0) {
      const [w, h] = size.split("*");
      if (w) {
        _obj.width = toPx(Number(w))
        if (!h) _obj.height = toPx(Number(w))
      }
      if (h) {
        _obj.height = toPx(Number(h))
        if (!w) _obj.height = toPx(Number(h))
      }
    }
    if (typeof size === "number") {
      _obj.width = toPx(size)
      _obj.height = toPx(size)
    }
    if (!_obj.width && !_obj.height) return null
    return _obj;
  }
  const { size, icon = "", color, style } = props
  const { width = toPx(${config.default_icon_size}), height = toPx(${config.default_icon_size}), } = getWhStyle(size) || style || {}
  return <View onClick={props.onClick} className={"xm-icon " + props.className}
    style={{ width, height, backgroundImage: 'url("' + getIcon(icon, { color, width, height }) + '")', ...(style || {}) }}></View>
}
export default React.memo(Index)
`
  );
  fs.writeFileSync(path.join(saveDir, 'untils.ts'), `
export function fixColor(color: string | string[]) {
  if (typeof color === 'string') {
    return color.indexOf('#') === 0 ? hex2rgb(color) : color;
  }
  return color.map(function (item) {
    return item.indexOf('#') === 0 ? hex2rgb(item) : item;
  });
}
export function hex2rgb(hex: any) {
  var rgb: number[] = [];
  hex = hex.substr(1);
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, '$1$1');
  }
  hex.replace(/../g, function (color) {
    rgb.push(parseInt(color, 0x10));
    return color;
  });
  return 'rgb(' + rgb.join(',') + ')';
}
  `)
  fs.writeFileSync(path.join(saveDir, 'icons.ts'), `
import { fixColor } from "./untils"
export default function (icon: string, p: { color?: string | string[], width: string | number, height: string | number }) {
  const colors = fixColor(p.color || "")
  const gc=(idx,dc)=>(typeof colors === 'string' ? colors : colors[idx]) || dc
  const iconlist={
    ${svgTemplates.join('\n')}
  }
  return iconlist[icon]
}`)
  fs.writeFileSync(path.join(saveDir, 'index.scss'), `
  .xm-icon {
    background-repeat: no-repeat;
    display: inline-block;
  }
  `)
  console.log(`\n${colors.green('√')} All icons have been putted into dir: ${colors.green(config.save_dir)}\n`);
};

