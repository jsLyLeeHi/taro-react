// refer: https://github.com/rxaviers/async-pool/blob/master/lib/es7.js
export const asyncPool = async <T, N>(poolLimit: number, array: T[], iteratorFn: (i: T, list: T[]) => Promise<N>) => {
  const ret: Promise<N>[] = []
  const executing: Promise<void>[] = []

  for (const item of array) {
    // iteratorFn Promise 化，防止 iteratorFn 返回的不是 Promise
    const p = Promise.resolve().then(() => iteratorFn(item, array))
    ret.push(p)

    // 控制并发
    if (poolLimit <= array.length) {
      // iteratorFn 执行后，从执行队列中删除任务
      const e: Promise<void> = p.then(() => {
        executing.splice(executing.indexOf(e), 1)
      })
      // 异步，所以 push 先执行
      executing.push(e)
      if (executing.length >= poolLimit) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}
