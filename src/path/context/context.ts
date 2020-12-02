import { defContextState } from './index'
import { createContext } from 'react'

/**
 * 创建context
 */
export const { Consumer, Provider } = createContext(defContextState)