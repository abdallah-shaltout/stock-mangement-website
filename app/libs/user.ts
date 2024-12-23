import type { UserType } from '~/types'
import { deleteStorage, getStorage, saveStorage } from './storage'
import { getApiData } from './api'

export async function SignedIn() {
    try {
        const AuthStore = useAuthStore()
        if (AuthStore.user) return AuthStore.user
        const token = getStorage<string>({
            name: 'accessToken',
            store: 'cookies'
        })
        const user = getStorage<UserType>({
            name: 'user',
            decrypt: true
        })

        if (token) {
            if (user) {
                AuthStore.setUser(user)
                return user
            } else {
                const res = await getApiData<UserType>({
                    path: '/api/auth/me'
                })
                if (res) {
                    AuthStore.setUser(res)
                    return res
                }
            }
        }
        if (user) {
            deleteStorage({
                name: 'user'
            })
        }

        return null
    } catch {
        return null
    }
}

export function saveToken(token: string) {
    saveStorage({
        name: 'accessToken',
        value: token,
        store: 'cookies'
    })
    saveStorage({
        name: 'accessToken',
        value: token,
        store: 'localStorage'
    })
}

export function deleteToken() {
    deleteStorage({
        name: 'accessToken',
        store: 'cookies'
    })
    deleteStorage({
        name: 'accessToken',
        store: 'localStorage'
    })
}

export function getToken() {
    let token: string | null | undefined
    token = getStorage<string>({
        name: 'accessToken',
        store: 'cookies'
    })

    if (!token)
        token = getStorage<string>({
            name: 'accessToken',
            store: 'localStorage'
        })
    return token
}
