import { TypeRegisterByCode, TypeGetMsgReadState } from "@path/api/user/type"

export type TypeLoginParamsPhone = { mobile: string }
export type TypeLoginParamsWx = { encryptedData: string, iv: string, code: string }

export type TypeCheckLogin = {
  toLogin: boolean
  dialogMsg?: string
}
export interface TypeUserStore {
  userInfo: TypeRegisterByCode.returnedVal,
  setUserInfo: (p: TypeRegisterByCode.returnedVal) => void,
}