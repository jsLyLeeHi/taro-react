import service, { useRequest } from "@/path/service"
import {
  TypeHotelTaskAdd, TypeGetHotelTaskList, TypeGetMenuDishes, TypeGetMenuList, TypeTaskCountByUserId, TypeUpdateTask,
  TypeGetNoticeDetails, TypeGetMenuOrderDetail
} from "./type"
/**新增服务 */
export function useHotelTaskAdd() {
  return useRequest<TypeHotelTaskAdd.parameter, TypeHotelTaskAdd.returnedVal>("/hotelTask/add", { method: "POST" }, false)
}
/**新增服务 */
export function hotelTaskAdd(params: TypeHotelTaskAdd.parameter) {
  return service.post<TypeHotelTaskAdd.returnedVal>("/hotelTask/add", { data: params, loading: false })
}
/**菜单菜品列表 */
export function getMenuDishes(params: TypeGetMenuDishes.parameter) {
  return service.post<TypeGetMenuDishes.returnedVal>(`/mini-program/feign/findDishesByMenuId`, { data: params, loading: false })
}
/**菜品订单详情 */
export function getMenuOrderDetail(params: TypeGetMenuOrderDetail.parameter) {
  return service.get<TypeGetMenuOrderDetail.returnedVal>(`/hotelTask/find`, { data: params, loading: false })
}
/**菜单选项列表列表 */
export function getMenuList(params: TypeGetMenuList.parameter) {
  return service.post<TypeGetMenuList.returnedVal>(`/mini-program/feign/getMenuById`, { data: params })
}
/**获取服务的介绍信息 */
export function getNoticeDetails(params: TypeGetNoticeDetails.parameter, loading?: boolean) {
  return service.post<TypeGetNoticeDetails.returnedVal>(`/mini-program/feign/details`, { data: params, loading: loading === undefined ? true : loading })
}



/**获取酒店员工任务统计 */
export function getTaskCountByUserId(params: TypeTaskCountByUserId.parameter) {
  return service.get<TypeTaskCountByUserId.returnedVal>(`/hotelTask/getTaskCountByUserId`, { data: params, loading: false })
}
/**获取酒店员工任务列表 */
export function getHotelTaskList(params: TypeGetHotelTaskList.parameter) {
  return service.post<TypeGetHotelTaskList.returnedVal>(`/hotelTask/listUserTask`, { data: params, loading: false })
}
/**修改任务状态 */
export function updateTask(params: TypeUpdateTask.parameter) {
  return service.post<TypeUpdateTask.returnedVal>("/hotelTask/updateTask", { data: params, loading: false })
}