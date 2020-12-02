function get_http_msg(RES_CODE) {
    switch (Number(RES_CODE)) {
        case 200:
            return { success: true, message: `成功` }
            break;
        case 201:
            return { success: true, message: `已创建` }
            break;
        case 202:
            return { success: false, message: `已接受，但尚未处理` }
            break;
        case 203:
            return { success: false, message: `非授权信息` }
            break;
        case 204:
            return { success: false, message: `无内容` }
            break;
        case 205:
            return { success: false, message: `重置内容` }
            break;
        case 206:
            return { success: false, message: `部分内容` }
            break;


        case 300:
            return { success: false, message: `多种选择` }
            break;
        case 301:
            return { success: false, message: `永久移动` }
            break;
        case 302:
            return { success: false, message: `临时移动` }
            break;
        case 303:
            return { success: false, message: `查看其他位置` }
            break;
        case 304:
            return { success: false, message: `未修改` }
            break;
        case 305:
            return { success: false, message: `使用代理` }
            break;
        case 307:
            return { success: false, message: `临时重定向` }
            break;


        case 400:
            return { success: false, message: `错误请求` }
            break;
        case 401:
            return { success: false, message: `未授权` }
            break;
        case 403:
            return { success: false, message: `拒绝请求` }
            break;
        case 404:
            return { success: false, message: `找不到请求` }
            break;
        case 405:
            return { success: false, message: `禁用请求中指定的方法` }
            break;
        case 406:
            return { success: false, message: `无法使用请求的内容特性响应` }
            break;
        case 407:
            return { success: false, message: `需要代理授权` }
            break;
        case 408:
            return { success: false, message: `网络请求超时,请检查网络后再试` }
            break;
        case 409:
            return { success: false, message: `服务器在完成请求时发生冲突` }
            break;
        case 410:
            return { success: false, message: `资源已永久删除` }
            break;
        case 411:
            return { success: false, message: `需要有效长度` }
            break;
        case 412:
            return { success: false, message: `未满足前提条件` }
            break;
        case 413:
            return { success: false, message: `请求实体过大` }
            break;
        case 414:
            return { success: false, message: `请求的 URI 过长` }
            break;
        case 415:
            return { success: false, message: `不支持的媒体类型` }
            break;
        case 416:
            return { success: false, message: `请求范围不符合要求` }
            break;
        case 417:
            return { success: false, message: `未满足期望值` }
            break;



        case 500:
            return { success: false, message: `服务器内部错误` }
            break;
        case 501:
            return { success: false, message: `尚未实施` }
            break;
        case 502:
            return { success: false, message: `错误网关` }
            break;
        case 503:
            return { success: false, message: `服务不可用` }
            break;
        case 504:
            return { success: false, message: `网关超时` }
            break;
        case 505:
            return { success: false, message: `HTTP 版本不受支持` }
            break;

        default:
            return { success: false, message: `HTTP请求状态码` }
            break;
    }
}


function GET_HTTP_STATUS(RES_CODE) {
    const str = '获取数据出现问题,请检查网络情况或联系客服协助处理！'
    if (!RES_CODE) {
        return { success: false, message: str }
    }
    const _MSG = get_http_msg(RES_CODE)
    if (!_MSG.success) {
        _MSG.message = str + _MSG.message
    }
    return _MSG
}




export default GET_HTTP_STATUS