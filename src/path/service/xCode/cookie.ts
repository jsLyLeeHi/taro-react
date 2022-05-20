export class Cookie {
  cookiesMap: Map<string, string>

  constructor() {
    this.cookiesMap = (() => {
      const cookies: Array<Array<string>> = document.cookie.split(';').map((n) => {
        const [first, ...Other] = n.split('=')
        return [first.trim(), Other.join('=')]
      })
      const cookiesMap = new Map()
      for (let i of cookies) cookiesMap.set(i[0], i[1])
      return cookiesMap
    })()
  }

  get(key: string) {
    return decodeURIComponent(this.cookiesMap.get(key) || '')
  }

  set(key: string, value: string, expired: number = 24 * 60 * 60 * 1000) {
    const date = new Date(+new Date() + expired)
    document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + date.toUTCString()
  }

  has(key: string) {
    return !!this.cookiesMap.get(key)
  }

  remove(key: string) {
    this.set(key, '', -1)
    return !this.has(key)
  }

  clear() {
    for (let [name] of this.cookiesMap) {
      this.remove(name)
    }
  }
}
