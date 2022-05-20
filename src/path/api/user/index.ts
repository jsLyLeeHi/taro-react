import service, { useRequest } from "@/path/service"
import {
  TypeRegisterByCode, TypeUpdateUserInfo, TypeRefreshToken, TypeGetUserByid, TypeGetUserMessageList, TypeGetRichTextConfigById,
  TypeChangeUserMessageReadState, TypeGetMsgReadState
} from "./type"
/**通过code注册 */
export function registerByCode(params: TypeRegisterByCode.parameter) {
  return service.post<TypeRegisterByCode.returnedVal>("/mini-program/wxLogin", { data: params, skipToken: true, loading: false })
}
/**完善用户信息 */
export function updateUserInfo(params: TypeUpdateUserInfo.parameter) {
  return service.post<TypeUpdateUserInfo.returnedVal>("/mini-program/updateUser", { data: params, loading: false })
}
/**完善用户信息 */
export function useUpdateUserInfo() {
  return useRequest<TypeUpdateUserInfo.parameter, TypeUpdateUserInfo.returnedVal>("/mini-program/updateUser", { method: "POST" }, false)
}
/**刷新用户token */
export function refreshToken(params: TypeRefreshToken.parameter) {
  return service.post<TypeRegisterByCode.returnedVal>(`/mini-program/refresh/${params.refreshToken}`, { skipToken: true })
}
/**获取新的用户信息 */
export function getUserByid(params: TypeGetUserByid.parameter) {
  return service.get<TypeRegisterByCode.returnedVal>(`/mini-program/getUserByid`, { data: params, loading: false })
}
/**获取是否有用户未读消息 */
export function getMsgReadState(params: TypeGetMsgReadState.parameter) {
  return service.get<TypeGetMsgReadState.returnedVal>("/hotelMessage/hasMessage", { data: params, loading: false })
}
/**获取用户消息列表 */
export function getUserMessageList(params: TypeGetUserMessageList.parameter) {
  return service.post<TypeGetUserMessageList.returnedVal>(`/hotelMessage/getHotelMessage`, { data: params, loading: false })
}
/**修改用户消息已读状态 */
export function changeUserMessageReadState(params: TypeChangeUserMessageReadState.parameter) {
  return service.post<TypeChangeUserMessageReadState.returnedVal>(`/hotelMessage/updateHotelMessage`, { data: params })
}
/**获取富文本数据 */
export function getRichTextConfigById(params: TypeGetRichTextConfigById.parameter, loading?: boolean) {
  return service.get<TypeGetRichTextConfigById.returnedVal>(`/mini-program/feign/getConfigById`, { data: params, skipToken: true, loading: loading === undefined ? true : loading })
}