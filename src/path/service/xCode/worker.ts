/**
 * 创建Worker,计算耗时任务
 * 参考自: http://www.ruanyifeng.com/blog/2018/07/web-worker.html
 * @param fn worker中要执行的函数
 */
export const createWorker = (
  fn: Function,
  options?: {
    type?: WorkerType
    credentials?: RequestCredentials
    name?: string
  },
): Worker => {
  const blob = new Blob(['(' + fn.toString() + ')()'])
  const url = URL.createObjectURL(blob)
  if (options) {
    return new Worker(url, options)
  }
  return new Worker(url)
}
