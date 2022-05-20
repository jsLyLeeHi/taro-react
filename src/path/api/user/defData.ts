import { TypeRegisterByCode } from "./type"
/**
 * 获取默认的用户数据
 */
export function getDefUserInfo(): TypeRegisterByCode.returnedVal {
  return {
    accessToken: "",
    avatar: "",
    mobile: "",
    nickName: "",
    openid: "",
    refreshToken: "",
    sex: 0,
    userId: "",
    region: "",
    birthday: ""
  }
}