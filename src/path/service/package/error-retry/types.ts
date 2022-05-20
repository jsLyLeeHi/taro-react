import { PQError, PQRequest } from '../types'

export type RetryControl = (opt: PQRequest, err: PQError) => boolean

export interface MiddlewareOptions {
  retryCount?: number
  retryControl?: RetryControl
}

declare module '../types' {
  export interface PQRequest {
    retryCount?: number
  }
}
