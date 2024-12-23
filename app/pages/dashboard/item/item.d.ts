import type { base } from '~/types'

export interface ItemType extends base {
    code: string
    name: string
    unit: string
    price: number
    stockBalances: {
        store: Types.ObjectId
        balance: number
    }[]
}
