import { observable } from 'mobx'
import { TypeRegisterByCode } from "@path/api/user/type"
import { getDefUserInfo } from "@path/api/user/defData"
import storage from '@/path/tool/storage'
import config from "@/path/service/config"
import { lock } from "@path/service/middleware/lockToken"
import { TypeUserStore } from "./type"
const storageName = "storageUserInfo"
export default observable<TypeUserStore>({
  userInfo: storage.getLocalStorage(storageName) || getDefUserInfo(),
  /**清空登录信息 */
  clearUserInfo() {
    this.setUserInfo(getDefUserInfo())
  },
  /**更新用户信息 */
  setUserInfo(user: TypeRegisterByCode.returnedVal) {
    this.userInfo = user
    lock.current.setValue(user.accessToken)
    storage.setLocalStorageSync(storageName, user, config.tokenCatcheTime)
  },
})
