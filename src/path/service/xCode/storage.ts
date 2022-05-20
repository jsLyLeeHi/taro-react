import { resolveTypeTree, typeTree } from './object'

type StorageName = 'localStorage' | 'sessionStorage'

interface Storage {
  setItem(key: string, value: any): void
  getItem(key: string): any
  removeItem(key: string): void
  clear(): void
}

function generate(target: any, fn: (target: any, args: any) => any) {
  return new Proxy(target, { apply: (_, __, args) => fn(target, args) })
}

export const Store = (ctx: any) => {
  const storageNames: StorageName[] = ['localStorage', 'sessionStorage']

  storageNames.forEach((storageName) => {
    const target = (ctx[storageName] || {}) as Storage

    target.setItem = generate(globalThis[storageName].setItem, (target, args) => {
      const [key, value] = args
      return Reflect.apply(target, globalThis[storageName], [key, JSON.stringify(typeTree(value))])
    })

    target.getItem = generate(globalThis[storageName].getItem, (target, args) => {
      const result = Reflect.apply(target, globalThis[storageName], args)
      return resolveTypeTree(JSON.parse(result))
    })

    target.removeItem = generate(globalThis[storageName].removeItem, (target, args) => {
      return Reflect.apply(target, globalThis[storageName], args)
    })

    target.clear = generate(globalThis[storageName].clear, (target, args) => {
      return Reflect.apply(target, globalThis[storageName], args)
    })

    ctx[storageName] = target
  })

  return ctx
}
