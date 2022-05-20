/// <reference types="../package/types" />
import CancelToken from '../package/cancel-token'

export type RequestCore = any

declare module '../package/types' {
  interface PQRequest {
    url: string
    params?: PQ.Common
    data?: PQ.Common | string | ArrayBuffer
    responseType?: 'json' | 'text' | 'arraybuffer' | ({} & string)
    header?: PQ.Common
    dataType?: 'json' | ({} & string)
    getNativeRequestInstance?(value: Promise<RequestCore>): void
    cancelToken?: CancelToken
  }

  interface PQResponse<T = any> {
    data: T
    statusCode: number
    header: PQ.Common
  }
}
