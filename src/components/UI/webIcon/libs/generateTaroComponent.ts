import { XmlData } from './fetchXml';
import { generateCase } from "./taroutils"

interface Config {
  trim_icon_prefix: string;
  color?: string | string[]
  icon: string
}
export const generateTaroComponent = (data: XmlData, config: Config) => {
  const item = data.svg.symbol.find(v => {
    const iconId = v.$.id;
    const iconIdAfterTrim = config.trim_icon_prefix ?
      iconId.replace(new RegExp(`^${config.trim_icon_prefix}(.+?)$`), (_, value) => value.replace(/^[-_.=+#@!~*]+(.+?)$/, '$1'))
      : iconId;
    return config.icon === iconIdAfterTrim
  })
  return item ? generateCase(item, { hexToRgb: true, color: config.color }) : ""
};

