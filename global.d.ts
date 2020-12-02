declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd';
    [key: string]: any;
  }
}

/**当前小程序配置*/
declare const CONFIG: {
  /**小程序appid*/
  APPID: string,
  /**小程序secret*/
  SECRET: string,
  /**小程序版本号*/
  VERSION: string,
  /**图片域名*/
  IMGLINK: string,

  /**接口域名*/
  BASEURL: string
}
