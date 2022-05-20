import { TypeFindHotelByName, TypeGetRoomById, TypeGetRoomTypeListByHotelId,TypeGetHotelServerByHotelId } from "./type"
/**
 * 默认的酒店数据
 */
export function getDefHotelInfo(): TypeFindHotelByName.Item {
  return {
    banner: "",
    createTime: "",
    enable: 0,
    expiresTime: "",
    icon: "",
    id: "",
    files: [],
    introduce: "",
    lat: 0,
    levelTag: "",
    limit: 0,
    lng: 0,
    location: "",
    name: "",
    notice: "",
    page: 0,
    phone: "",
    serviceTag: "",
    tradeArea: "",
    updateTime: "",
    welcome: "",
  }
}
/**
 * 默认的房间数据
 */
export function getDefRoomInfo(): TypeGetRoomById.returnedVal {
  return {
    banner: "",
    breakfast: "",
    createTime: "",
    files: [],
    hotelId: "",
    id: "",
    introduce: "",
    isWindow: "",
    limit: 0,
    number: "",
    page: 0,
    shape: "",
    size: 0,
    type: "",
    updateTime: "",
    wifiName: "",
    wifiPw: "",
  }
}
/**
 * 默认的房间类型数据
 */
export function getDefRoomTypeInfo(): TypeGetRoomTypeListByHotelId.Item {
  return {
    banner: "",
    /**是否有早餐 0否，1是 */
    breakfast: "0",
    createTime: "",
    /**图片列表 */
    files: [],
    hotelId: "",
    id: "",
    introduce: "",
    /**是否有窗，0否，1是 */
    isWindow: "0",
    limit: 0,
    number: "",
    page: 0,
    /**床型 */
    shape: "",
    /**面积 */
    size: 0,
    /**类型 */
    type: "",
    updateTime: "",
    wifiName: "",
    wifiPw: "",
  }
}
/**
 * 默认的房间类型数据
 */
export function getDefHotelServerByHotelId(): TypeGetHotelServerByHotelId.Item {
  return {
    hotelId: "",
    icon: "Invoice",
    id: "",
    name: "",
    serverId: "",
  }
}