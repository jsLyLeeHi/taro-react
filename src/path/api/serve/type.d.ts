/**
 * 新增服务
 */
export namespace TypeHotelTaskAdd {
  /**
   * 请求参数
   */
  type parameter = {
    /**任务名称 */
    taskName: string,
    /**房间id */
    roomId: string,
    /**服务时间 */
    serverTime?: string,
    /**是否立刻服务 */
    immediately?: boolean,
    /**服务id */
    serviceId: string,
    /**酒店id */
    hotelId: string,
    /**任务内容 */
    taskContent?: string,
    /** 备注 */
    remark?: string
    /**文件id */
    fileId?: string
  }
  /**
   * 返回参数
   */
  type returnedVal = boolean
}
/**
 * 服务列表
 */
export namespace TypeGetHotelTaskList {
  /**任务状态，0: 未完成 1: 完成 2: 取消 */
  type TypeStatus = 0 | 1 | 2
  /**
   * 请求参数
   */
  type parameter = {
    /**任务名称 */
    userId: string,
    /**日期 */
    createTime?: string,
    /**任务状态，0: 未完成 1: 完成 2: 取消 */
    status: TypeStatus
    /**酒店id */
    hotelId: string,
  }
  type Item = {
    createTime: string
    fileId: string
    finishTime: string
    remark: string
    roomId: string
    serviceId: string
    status: number
    taskContent: string
    taskId: string
    taskName: string
    userId: string
  }
  /**
   * 返回参数
   */
  type returnedVal = {
    list: Item[],
    total: number
  }
}
/**
 * 菜单列表
 */
export namespace TypeGetMenuDishes {
  /**
   * 请求参数
   */
  type parameter = {
    /**酒店id */
    hotelId: string,
    id: string
  }

  type SkuChildItem = {
    childerId: string
    dishesId: string
    name: string
    sizeId: string
  }
  type SkuItem = {
    childer: SkuChildItem[]
    dishesId: string
    name: string
    sizeId: string
  }
  type Item = {
    endTime: string
    groupId: string
    id: string
    image: string
    isDeliver: number
    list: SkuItem[]
    name: string
    price: number
    rate: number
    startTime: string
    time: string
  }
  /**
   * 返回参数
   */
  type returnedVal = {
    list: Item[],
    total: number
  }
}
/**
 * 菜品订单详情
 */
export namespace TypeGetMenuOrderDetail {
  /**
   * 请求参数
   */
  type parameter = {
    /**订单id */
    taskId: string,
  }
  type Item = {
    id: string,
    name: string,
    image: string,
    groupId: string,
    price: number,
    rate: string,
    isDeliver: string,
    startTime: string,
    endTime: string,
    spec: string,
    dishNum: number
  }
  /**
   * 返回参数
   */
  type returnedVal = {
    taskId: string,
    taskName: string,
    serviceId: string,
    immediately: boolean,
    status: number,
    hotelId: string,
    roomId: string,
    fileId: string,
    createTime: string,
    finishTime: string,
    serverTime: string,
    remark: string,
    userId: string,
    dishesList: Item[]
  }
}
/**
 * 菜单选项列表列表
 */
export namespace TypeGetMenuList {
  /**
   * 请求参数
   */
  type parameter = {
    /**酒店id */
    hotelId: string,
  }
  type Item = {
    hotelId: string
    id: string
    name: string
  }
  /**
   * 返回参数
   */
  type returnedVal = Item[]
}
/**
 * 获取酒店员工任务统计
 */
export namespace TypeTaskCountByUserId {
  /**
   * 请求参数
   */
  type parameter = {
    /**用户id */
    userId: string,
    /**酒店id */
    hotelId: string,
  }
  /**
   * 返回参数
   */
  type returnedVal = {
    /**未完成 */
    unfinishedCount: number,
    /**已完成 */
    finishedCount: number
  }
}
/**
 * 修改任务状态
 */
export namespace TypeUpdateTask {
  /**
   * 请求参数
   */
  type parameter = {
    /**任务id */
    taskId: string,
    status: TypeGetHotelTaskList.TypeStatus
  }
  /**
   * 返回参数
   */
  type returnedVal = boolean
}
/**
 * 获取服务的介绍信息
 */
export namespace TypeGetNoticeDetails {
  /**
   * 请求参数
   */
  type parameter = {
    /**酒店id */
    hotelId: string,
    /**服务id */
    serverId: string
  }
  /**
   * 返回参数
   */
  type returnedVal = {
    banner: string[]
    dep: string
    deps: string
    goodsList: {
      fileContent: string
      hotelId: string
      id: string
      img: string
      name: string
    }[]
    hotelId: string
    id: string
    introduce: string
    models: string[]
    qrCode: string
    serverId: string
    specia: string
    status: number
  }
}