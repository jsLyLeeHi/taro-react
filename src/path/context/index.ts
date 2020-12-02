
export * from './decorator'
export * from './context'

export interface TypeContextState {
    ProviderValue: number
    userInfo: {
        name: string,
        age: string
    },
}
export const defContextState = {
    ProviderValue: 0,
    userInfo: {
        name: '',
        age: ''
    }
}








