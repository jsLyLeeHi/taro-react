import service from "@/path/service"
import {
  TypeFindHotelByName, TypeGetListFacility, TypeFindHotelById, TypeUserHotelRelation, TypeGetRoomById,
  TypeGetRoomTypeListByHotelId, TypeUserHotelUnRelation, TypeGetHotelServerByHotelId, TypeFindHotelByRoomId,
  TypeUserEmployRelation
} from "./type"
/**查询酒店列表 */
export function findHotelByName(params: TypeFindHotelByName.parameter) {
  return service.post<TypeFindHotelByName.returnedVal>(`/mini-program/feign/findHotelByName`, { data: params, skipToken: true, loading: false })
}
/**根据酒店id查询酒店信息 */
export function findHotelById(params: TypeFindHotelById.parameter) {
  return service.post<TypeFindHotelById.returnedVal>(`/mini-program/feign/findHotelById`, { data: params, skipToken: true, cacheType: "sessionStorage" })
}
/**根据酒店房间id查询酒店信息 */
export function findHotelByRoomId(params: TypeFindHotelByRoomId.parameter) {
  return service.get<TypeFindHotelById.returnedVal>(`/mini-program/feign/getHotelByRoomId`, { data: params, skipToken: true, cacheType: "sessionStorage" })
}
/**获取酒店设施列表 */
export function getListFacility(params: TypeGetListFacility.parameter) {
  return service.get<TypeGetListFacility.returnedVal>(`/mini-program/feign/listNoPaging/${params.hotelId}`, { skipToken: true, loading: params.loading })
}
/**获取酒店房型列表 */
export function getRoomTypeListByHotelId(params: TypeGetRoomTypeListByHotelId.parameter) {
  return service.get<TypeGetRoomTypeListByHotelId.returnedVal>(`/mini-program/feign/getRoomTypeList`, { data: params, skipToken: true, loading: false })
}
/** 员工绑定酒店 {userId，roomId，hotelId} */
export function userEmployRelation(params: TypeUserEmployRelation.parameter) {
  return service.get<TypeUserEmployRelation.returnedVal>(`/mini-program/userEmployRelation`, { data: params })
}
/** 绑定用户酒店及房间信息。post {userId，roomId，hotelId} */
export function userHotelRelation(params: TypeUserHotelRelation.parameter) {
  return service.post<TypeUserHotelRelation.returnedVal>(`/mini-program/userHotelRelation`, { data: params })
}
/** 解绑用户酒店及房间信息。post {userId，hotelId} */
export function userHotelUnRelation(params: TypeUserHotelUnRelation.parameter) {
  return service.get<TypeUserHotelUnRelation.returnedVal>(`/mini-program/userHotelUnRelation`, { data: params })
}
/**查询用户所在房间的信息 */
export function getRoomById(params: TypeGetRoomById.parameter) {
  return service.get<TypeGetRoomById.returnedVal>(`/mini-program/feign/getRoomById`, { data: params, cacheType: "sessionStorage" })
}
/**酒店服务列表 */
export function getHotelServerByHotelId(params: TypeGetHotelServerByHotelId.parameter) {
  return service.get<TypeGetHotelServerByHotelId.returnedVal>(`/mini-program/feign/getHotelServerByHotelId`, { data: params })
}