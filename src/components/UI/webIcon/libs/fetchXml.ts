import { parseString } from 'xml2js';
import service from "@path/service"

export interface XmlData {
  svg: {
    symbol: Array<{
      $: {
        viewBox: string;
        id: string;
      };
      path: Array<{
        $: {
          d: string;
          fill?: string;
        };
      }>;
    }>;
  }
}

export const fetchXml = async (url): Promise<XmlData> => {
  try {
    const data = await service.get(url, { skipToken: true, cacheType: "sessionStorage", loading: false })
    const matches = String(data).match(/'<svg>(.+?)<\/svg>'/);
    if (matches) {
      return new Promise<XmlData>((resolve, reject) => {
        parseString(`<svg>${matches[1]}</svg>`, { rootName: 'svg' }, (err: Error, result: XmlData) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }
    throw new Error('You provide a wrong symbol url');
  } catch (e) {
    throw e;
  }
};
