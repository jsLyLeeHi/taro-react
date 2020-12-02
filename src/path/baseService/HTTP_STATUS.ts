function get_http_msg(RES_CODE) {
    switch (Number(RES_CODE)) {
        case 200:
            return { state: true, msg: `成功` }
            break;
        case 201:
            return { state: true, msg: `已创建` }
            break;
        case 202:
            return { state: false, msg: `已接受，但尚未处理` }
            break;
        case 203:
            return { state: false, msg: `非授权信息` }
            break;
        case 204:
            return { state: false, msg: `无内容` }
            break;
        case 205:
            return { state: false, msg: `重置内容` }
            break;
        case 206:
            return { state: false, msg: `部分内容` }
            break;


        case 300:
            return { state: false, msg: `多种选择` }
            break;
        case 301:
            return { state: false, msg: `永久移动` }
            break;
        case 302:
            return { state: false, msg: `临时移动` }
            break;
        case 303:
            return { state: false, msg: `查看其他位置` }
            break;
        case 304:
            return { state: false, msg: `未修改` }
            break;
        case 305:
            return { state: false, msg: `使用代理` }
            break;
        case 307:
            return { state: false, msg: `临时重定向` }
            break;


        case 400:
            return { state: false, msg: `错误请求` }
            break;
        case 401:
            return { state: false, msg: `未授权` }
            break;
        case 403:
            return { state: false, msg: `拒绝请求` }
            break;
        case 404:
            return { state: false, msg: `找不到请求` }
            break;
        case 405:
            return { state: false, msg: `禁用请求中指定的方法` }
            break;
        case 406:
            return { state: false, msg: `无法使用请求的内容特性响应` }
            break;
        case 407:
            return { state: false, msg: `需要代理授权` }
            break;
        case 408:
            return { state: false, msg: `网络请求超时,请检查网络后再试` }
            break;
        case 409:
            return { state: false, msg: `服务器在完成请求时发生冲突` }
            break;
        case 410:
            return { state: false, msg: `资源已永久删除` }
            break;
        case 411:
            return { state: false, msg: `需要有效长度` }
            break;
        case 412:
            return { state: false, msg: `未满足前提条件` }
            break;
        case 413:
            return { state: false, msg: `请求实体过大` }
            break;
        case 414:
            return { state: false, msg: `请求的 URI 过长` }
            break;
        case 415:
            return { state: false, msg: `不支持的媒体类型` }
            break;
        case 416:
            return { state: false, msg: `请求范围不符合要求` }
            break;
        case 417:
            return { state: false, msg: `未满足期望值` }
            break;



        case 500:
            return { state: false, msg: `服务器内部错误` }
            break;
        case 501:
            return { state: false, msg: `尚未实施` }
            break;
        case 502:
            return { state: false, msg: `错误网关` }
            break;
        case 503:
            return { state: false, msg: `服务不可用` }
            break;
        case 504:
            return { state: false, msg: `网关超时` }
            break;
        case 505:
            return { state: false, msg: `HTTP 版本不受支持` }
            break;

        default:
            return { state: false, msg: `HTTP请求状态码` }
            break;
    }
}

function GET_HTTP_STATUS(RES_CODE) {
    const str = '获取数据出现问题,请检查网络情况或联系客服协助处理！'
    if (!RES_CODE) {
        return { state: false, msg: str }
    }
    const _MSG = get_http_msg(RES_CODE)
    _MSG.msg = str + _MSG.msg
    return _MSG
}



export default GET_HTTP_STATUS