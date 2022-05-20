import {XmlData} from "./fetchXml";
import {replaceHexToRgb} from "./replace";

const ATTRIBUTE_FILL_MAP = ['path'];


export const generateCase = (data: XmlData['svg']['symbol'][number], config?: {
  hexToRgb:boolean,
}) => {
  let template = `data:image/svg+xml,<svg viewBox='${data.$.viewBox}' width='"+p.width+"' height='"+p.height+"' xmlns='http://www.w3.org/2000/svg'>`;

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

const addAttribute = (domName: string, sub: XmlData['svg']['symbol'][number]['path'][number], counter: { colorIndex: number },  config?: {
  hexToRgb:boolean
}) => {
  let template = '';

  if (sub && sub.$) {
    if (ATTRIBUTE_FILL_MAP.includes(domName)) {
      // Set default color same as in iconfont.cn
      // And create placeholder to inject color by user's behavior
      sub.$.fill = sub.$.fill || '#333333';
    }

    for (const attributeName of Object.keys(sub.$)) {
      if (attributeName === 'fill') {
        let color :string | undefined;
        if(config?.hexToRgb){
          color = replaceHexToRgb(sub.$[attributeName]);
        }else {
          color = sub.$[attributeName]
        }
        template += ` ${attributeName}='"+ gc(${counter.colorIndex},'${color}')+"'`;
        counter.colorIndex += 1;
      } else {
        template += ` ${attributeName}='${sub.$[attributeName]}'`;
      }
    }
  }

  return template;
};
