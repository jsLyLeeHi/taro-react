import Taro from "@tarojs/taro"
/**
 * 微信用户-通过code获取用户信息
 */
export namespace TypeRegisterByCode {
  /**
   * 请求参数
   */
  type parameter = {
    code: string,
    encryptedData: string,
    iv: string,
  }
  /**
   * 返回参数
   */
  type returnedVal = {
    accessToken: string
    avatar: string
    mobile: string
    nickName: string
    region: string
    openid: string
    birthday: string
    refreshToken: string
    sex: keyof Taro.UserInfo.gender
    userId: string
    /**顾客酒店id */
    customerHotelId: string | null
    longTerm: boolean
    /**顾客房间id */
    roomId: string | null
    /**服务员酒店id */
    waiterHotelId: string | null
  }
}
/**
 * 完善用户信息
 */
export namespace TypeUpdateUserInfo {
  /**
   * 请求参数
   */
  type parameter = {
    nickName: string,
    sex: keyof Taro.UserInfo.gender,
    avatar: string,
    region: string,
    birthday: string,
    userId: string,
  }
  /**
   * 返回参数
   */
  type returnedVal = boolean
}
/**
 * 刷新tokne
 */
export namespace TypeRefreshToken {
  /**
   * 请求参数
   */
  type parameter = {
    refreshToken: string
  }
  /**
   * 返回参数
   */
  type returnedVal = boolean
}
/**
 * 获取新的用户信息
 */
export namespace TypeGetUserByid {
  /**
   * 请求参数
   */
  type parameter = {
    userId: string
  }
  /**
   * 返回参数
   */
  type returnedVal = boolean
}
/**
 * 获取用户消息列表
 */
export namespace TypeGetUserMessageList {
  /**
   * 请求参数
   */
  type parameter = {
    toUser: string
    status?: "0" | "1",
    /** 删除状态，1删除，0未删除*/
    delStatus?: "0" | "1",
  }

  type Item = {
    /** 消息id*/
    smsId: string,
    /** 类型*/
    type: string,
    /** 收件人*/
    toUserName: string,
    /** 发件人*/
    fromUserName: string,
    /** 任务名称*/
    taskName: string,
    /** 发送时间*/
    sendTime: string,
    /** 任务id*/
    taskId: string,
    /** 退房时间*/
    checkoutTime?: string,
    /** 读取状态，0未读,1已读*/
    status: "0" | "1",
    /** 删除状态，1删除，0未删除*/
    delStatus: "0" | "1",
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
 * 修改用户消息已读状态
 */
export namespace TypeChangeUserMessageReadState {
  /**
   * 请求参数
   */
  type parameter = TypeGetUserMessageList.Item
  /**
   * 返回参数
   */
  type returnedVal = boolean
}
/**
 * 获取富文本数据
 */
export namespace TypeGetRichTextConfigById {
  type TypeId = 1 | 2 | 3 | 4 | 5
  /**
   * 请求参数
   */
  type parameter = {
    /**
     * 1:关于我们
     * 2:用户协议
     * 3.首页文本介绍
     * 4.首页背景图片
     * 5:关注公众号富文本
     */
    id: TypeId
  }
  /**
   * 返回参数
   */
  type returnedVal = {
    content: string
    id: TypeId
    setName: string
  }
}
/**
 * 获取是否有用户未读消息
 */
export namespace TypeGetMsgReadState {
  /**
   * 请求参数
   */
  type parameter = {
    /**
     * 1:关于我们
     * 2:用户协议
     * 5:关注公众号富文本
     */
    userId: string
  }
  /**
   * 是否有未读消息 true 有
   */
  type returnedVal = boolean
}