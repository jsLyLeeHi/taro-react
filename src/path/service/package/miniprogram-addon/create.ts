import { PreQuest } from '../core'
import { RequestCore } from './types'
import { adapter } from './adapter'
import { Config } from '../types'

export function createUpload(request: RequestCore, options?: Config) {
  return PreQuest.create(adapter(request), options)
}

export function createDownload(request: RequestCore, options?: Config) {
  return PreQuest.create(adapter(request), options)
}
