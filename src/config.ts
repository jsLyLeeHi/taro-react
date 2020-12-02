export const Urls = {
    test: {
        // wxUrl: 'https://zgxcxpay.kantuzhuan.com:444/WebInterface.ashx',
        wxUrl: 'https://zgxcxpay.kantuzhuan.com:444/HGInterface.ashx',
        url: 'https://zgxcxpay.kantuzhuan.com:444/HGInterface.ashx',
        phoneUrl: 'https://zgxcxpay.kantuzhuan.com:444/WebInterface.ashx'
    },
    yufabu: {
        url: 'http://zggl.kantuzhuan.com:3000/mock/6',
        wxUrl: 'https://zgxcxpay.kantuzhuan.com:444/WebInterface.ashx',
    },
    zhengshi: {
        url: 'https://sslzggj.weikezhanggui.com/A/HGInterface.ashx',
        wxUrl: 'https://sslzggj.weikezhanggui.com/A/HGInterface.ashx',
        phoneUrl: 'https://sslzggj.weikezhanggui.com/A/WebInterface.ashx'
    },
}


const ver: 'test' | 'yufabu' | 'zhengshi' = 'test'//发布环境
const versionNo = '1.0.6'//版本号


const config = {
    test: {
        versionNo: versionNo,
        imageLinks: 'https://imagecommon.yzhao.net',
        appid: 'wxbfd3801294e90fcb',
        secret: '096254ed4824a7f2d2139a48b5879680',
    },
}

export default Object.assign(config[ver], Urls[ver])