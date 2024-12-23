interface paginateOptionsType {
    count: number
    page: number
    limit: number
    pages: number
    hasNextPage: boolean
    hasPrevPage: boolean
    nextPage: number
    prevPage: number
    lastPage: number
    status: 'success' | 'fail'
}

export type paginateResultType<T = any> = {
    data: T[]
} & paginateOptionsType

export interface base {
    _id: string
    createdAt: Date
    updatedAt: Date
}
