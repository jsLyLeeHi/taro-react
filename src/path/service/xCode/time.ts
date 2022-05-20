/**
 * 根据日期判断今天周几
 * @param date 日期 格式为字符串2018-01-01
 */
export const getDateWeek = (date: string = formatDate()): string => {
  let weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  let myDate = new Date(Date.parse(date))
  return weekDay[myDate.getDay()]
}

/**
 * 判断两个日期相差几天
 * @param endDate 结束日期 格式为字符串2018-01-01
 * @param startDate 开始日期 格式为字符串2018-01-02
 */
export const dateDiffer = (endDate: string, startDate: string) => {
  const differ = new Date(Date.parse(endDate)).getTime() - new Date(Date.parse(startDate)).getTime()
  return Math.ceil(differ / (1000 * 60 * 60 * 24))
}

export const formatDate = (date: Date = new Date(), fmt: string = 'yyyy-MM-dd hh:mm:ss') => {
  const o: any = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}
