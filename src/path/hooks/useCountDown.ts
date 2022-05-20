import { useState } from "react"
/**
 * 倒计时
 * @param {*} count 开始计时时间  defalut 60
 * @param {*} int 计时时间  defalut 1
 */
 export function useCountDown(countNum = 60, int = 1000): { codeMsg: { countNum: number; codeEnd: boolean; }; reSet: () => void; onCodeRun: () => void } {
  const [codeMsg, onSetCodeMsg] = useState({ countNum, codeEnd: true })
  let timer: any = null
  function run() {
    onSetCodeMsg({ countNum: codeMsg.countNum - 1, codeEnd: false })
    timer = setTimeout(() => {
      if (codeMsg.countNum > 0) {
        run()
      } else {
        onSetCodeMsg({ countNum: countNum, codeEnd: true })
      }
    }, int)
  }
  return {
    codeMsg,
    reSet: () => {
      onSetCodeMsg({ countNum: countNum, codeEnd: true })
      clearTimeout(timer)
    },
    onCodeRun: function () {
      if (!codeMsg.codeEnd) return
      clearTimeout(timer)
      run()
    }
  }
}