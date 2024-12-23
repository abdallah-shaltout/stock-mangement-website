import type { base } from '~/types'

export interface UserType extends base {
    name: string
    username: string
    phoneNumber: string
    password: string
    role: string
    permissions: string[]
    active: boolean
}
