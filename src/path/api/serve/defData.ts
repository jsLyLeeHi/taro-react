import { TypeHotelTaskAdd, TypeGetNoticeDetails, TypeGetMenuOrderDetail } from "./type"
/**
 * 新增服务默认的表单数据
 */
export function getDefHotelTaskAddParams(): TypeHotelTaskAdd.parameter {
  return {
    /**任务名称 */
    taskName: "",
    /**房间id */
    roomId: "",
    /**服务时间 */
    serverTime: "",
    immediately: false,
    /**任务内容 */
    taskContent: "",
    /** 备注 */
    remark: "",
    /**文件id */
    fileId: "",
    serviceId: "",
    hotelId: ""
  }
}
/**
 * 新增服务默认的表单数据
 */
export function DefGetNoticeDetails(): TypeGetNoticeDetails.returnedVal {
  return {
    banner: "",
    dep: "",
    deps: "",
    goodsList: [],
    hotelId: "",
    id: "",
    introduce: "",
    models: "",
    qrCode: "a",
    serverId: "",
    specia: "",
    status: 0
  }
}
/**
 * 菜品订单详情
 */
export function DefGetMenuOrderDetail(): TypeGetMenuOrderDetail.returnedVal {
  return {
    taskId: "",
    taskName: "",
    serviceId: "",
    immediately: false,
    status: 0,
    hotelId: "",
    roomId: "",
    fileId: "",
    createTime: "",
    finishTime: "",
    serverTime: "",
    remark: "",
    userId: "",
    dishesList: []
  }
}