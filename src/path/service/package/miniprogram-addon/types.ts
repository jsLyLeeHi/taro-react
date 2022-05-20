/// <reference types="../types" />
import CancelToken from '../cancel-token'

export type RequestCore = any

declare module '../types' {
  interface PQRequest {
    baseURL: string
    header?: PQ.Common
    params?: PQ.Common
    getNativeRequestInstance?(value: Promise<RequestCore>): void
    cancelToken?: CancelToken
  }
}

export interface DownLoadResponse {
  tempFilePath: string
}

export interface UploadResponse {
  data: string
  statusCode: number
}
