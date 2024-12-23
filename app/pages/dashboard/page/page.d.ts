import type { base, ItemType } from '~/types'

export interface PageType extends base {
    number: number // رقم الصفحة في الكتاب
    item: ItemType // الصنف المرتبط بالصفحة
    store: {
        _id: string
        name: string
    }
    book: number // رقم الكتاب
    balance: number
}
