import { yzRequest } from "@path/service"


export function getJobList(p: {
    pageSize: number,
    pageNo: number
}) {
    return yzRequest({
        url: '/jobAndThirdJob/getJobAndThirdJobList', //仅为示例，并非真实的接口地址
        data: { city: "不限", provinceId: 1, pageNo: p.pageNo, pageSize: p.pageSize },
        method: 'POST'
    })
}