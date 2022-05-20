import { XmlData } from "./fetchXml";
import { replaceHexToRgb } from "./replace";

const ATTRIBUTE_FILL_MAP = ['path'];


export const generateCase = (data: XmlData['svg']['symbol'][number], config?: {
  hexToRgb: boolean,
  color?: string | string[]
}) => {
  let template = `data:image/svg+xml,<svg viewBox='${data.$.viewBox}' xmlns='http://www.w3.org/2000/svg'>`;

  for (const domName of Object.keys(data)) {
    if (domName === '$') {
      continue;
    }

    const counter = {
      colorIndex: 0,
    };

    if (data[domName].$) {
      template += `<${domName}${addAttribute(domName, data[domName], counter, config)} />`;
    } else if (Array.isArray(data[domName])) {
      data[domName].forEach((sub) => {
        template += `<${domName}${addAttribute(domName, sub, counter, config)} />`;
      });
    }
  }

  template += `</svg>`;

  return template.replace(/<|>/g, (matched) => encodeURIComponent(matched));
};

const addAttribute = (domName: string, sub: XmlData['svg']['symbol'][number]['path'][number], counter: { colorIndex: number }, config?: {
  hexToRgb: boolean
  color?: string | string[]
}) => {
  let template = '';

  if (sub && sub.$) {
    if (ATTRIBUTE_FILL_MAP.includes(domName)) {
      sub.$.fill = sub.$.fill || '#333333';
    }

    for (const attributeName of Object.keys(sub.$)) {
      if (attributeName === 'fill') {
        let color: string | undefined;
        if (config?.hexToRgb) {
          color = replaceHexToRgb(sub.$[attributeName]);
        } else {
          color = sub.$[attributeName]
        }
        template += ` ${attributeName}='${getColor(color, counter.colorIndex, config?.color)}'`;
        counter.colorIndex += 1;
      } else {
        template += ` ${attributeName}='${sub.$[attributeName]}'`;
      }
    }
  }

  return template;
};
function getColor(defColor, index: number, color?: string | string[]) {
  const _color = fixColor(color)
  if (typeof _color === "string") {
    return _color
  }
  if (_color instanceof Array) {
    return _color[index] || defColor
  }
  return fixColor(defColor)
}


export function fixColor(color?: string | string[]) {
  if (!color) {
    return color
  }
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
