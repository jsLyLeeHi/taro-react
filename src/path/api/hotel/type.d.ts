
import { TypePagingData } from "@/path/hooks/pagingQuery"
import { TypeIcons } from '@/components/ui'
/**
 * 查询酒店列表
 */
export namespace TypeFindHotelByName {
  /**
   * 请求参数
   */
  type parameter = {
    name: string,
    page?: number,
    limit?: number
  }
  type Item = {
    banner: string
    createTime: string
    files: string[]
    enable: number
    expiresTime: string
    icon: string
    id: string
    introduce: string
    lat: number
    levelTag: string
    limit: number
    lng: number
    location: string
    name: string
    notice: string
    page: number
    phone: string
    serviceTag: string
    tradeArea: string
    updateTime: string
    welcome: string
  }
  /**
   * 返回参数
   */
  type returnedVal = TypePagingData<Item>
}
/**
 * 根据酒店id查询酒店信息
 */
export namespace TypeFindHotelById {
  /**
   * 请求参数
   */
  type parameter = {
    id: string,
  }
  /**
   * 返回参数
   */
  type returnedVal = TypeFindHotelByName.Item
}
/**
 * 根据酒店房间id查询酒店信息
 */
export namespace TypeFindHotelByRoomId {
  /**
   * 请求参数
   */
  type parameter = {
    roomId: string,
  }
  /**
   * 返回参数
   */
  type returnedVal = TypeFindHotelByName.Item
}
/**
 * 获取酒店设施列表
 */
export namespace TypeGetListFacility {
  /**
   * 请求参数
   */
  type parameter = {
    hotelId: string,
    loading: boolean
  }
  type Item = {
    contentId: number
    createTime: string
    files: string[]
    hotelId: string
    icon: TypeIcons
    id: string
    introduce: string
    limit: number
    name: string
    page: number
    status: number
    updateTime: string
  }
  /**
   * 返回参数
   */
  type returnedVal = Item[]
}
/**
 * 获取酒店房型列表
 */
export namespace TypeGetRoomTypeListByHotelId {
  /**
   * 请求参数
   */
  type parameter = {
    hotelId: string,
  }
  //type 类型，size面积，shape 床型，isWindow是否有窗，0否，1是，breakfast 是否有早餐，0否，1是，introduce介绍，files 图片
  type Item = {
    /**图片列表 */
    bannerList: string[]
    /**是否有早餐 0无早，1单早，2双早 */
    breakfast: 0 | 1 | 2
    hotelId: string
    id: string
    introduce: string
    /**是否有窗，0否，1是 2部分有*/
    window: 0 | 1 | 3
    /**床型 */
    shape: string
    /**面积 */
    size: number
    /**类型 */
    type: string
  }
  /**
   * 返回参数
   */
  type returnedVal = Item[]
}
/**
 * 员工绑定酒店
 */
export namespace TypeUserEmployRelation {
  /**
   * 请求参数
   */
  type parameter = {
    employId: string,
  }
  /**
   * 返回参数
   */
  type returnedVal = string
}
/**
 * 绑定酒店
 */
export namespace TypeUserHotelRelation {
  /**
   * 请求参数
   */
  type parameter = {
    userId: string,
    roomId: string,
    hotelId: string
  }
  /**
   * 返回参数
   */
  type returnedVal = string
}
/**
 * 解绑酒店
 */
export namespace TypeUserHotelUnRelation {
  /**
   * 请求参数
   */
  type parameter = {
    roomId: string
  }
  /**
   * 返回参数
   */
  type returnedVal = any
}
/**
 * 查询用户所在房间的信息
 */
export namespace TypeGetRoomById {
  /**
   * 请求参数
   */
  type parameter = {
    roomId: string,
    hotelId: string
  }
  /**
   * 返回参数
   */
  type returnedVal = {
    banner: string
    breakfast: string
    createTime: string
    files: string[]
    hotelId: string
    id: string
    introduce: string
    isWindow: string
    limit: number
    number: string
    page: number
    shape: string
    size: number
    type: string
    updateTime: string
    wifiName: string
    wifiPw: string
  }
}
/**
 * 酒店服务列表
 */
export namespace TypeGetHotelServerByHotelId {
  /**
   * 请求参数
   */
  type parameter = {
    hotelId: string
  }

  type Item = {
    hotelId: string
    icon: TypeIcons
    id: string
    name: string
    serverId: string
  }
  /**
   * 返回参数
   */
  type returnedVal = Item[]
}