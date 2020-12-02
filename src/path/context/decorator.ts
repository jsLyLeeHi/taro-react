import { TypeContextState, defContextState } from './index'

/**
 * 更新全局数据
 */
export let stateStore: TypeDisPatch = () => { }


/**
 * app.tsx的装饰器
 */
export function CreateContext() {
    return function <T extends new (...args: any[]) => any>(constructor: T) {
        return class extends constructor {
            constructor() {
                super()
                stateStore = this.setState.bind(this)
            }
            state: TypeContextState = JSON.parse(JSON.stringify(defContextState))
        };
    }
}



type S = TypeContextState
export type TypeDisPatch = <K extends keyof S>(
    state: ((prevState: Readonly<S>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
    callback?: () => void
) => void