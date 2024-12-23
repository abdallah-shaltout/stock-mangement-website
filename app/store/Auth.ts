import type { UserType } from '~/types'
import { deleteStorage, deleteToken, saveStorage, saveToken } from '~/libs'
import { addApiData, deleteApiData } from '~/libs/api'
export const useAuthStore = defineStore('auth', () => {
    const user = ref<UserType | null>(null)
    const globalStore = useGlobalStore()
    async function Signin(username: string, password: string) {
        try {
            globalStore.loading = true
            const res = await addApiData<{
                user: UserType
                token: string
            }>({
                path: '/api/auth/signin',
                body: {
                    username,
                    password
                }
            })

            setUser(res.user)
            saveToken(res.token)
            navigateTo({ name: 'index' })
        } finally {
            globalStore.loading = false
        }
    }

    async function SignOut() {
        try {
            clearUser()
        } catch (error) {
            console.error(error)
        } finally {
            deleteToken()
            nextTick(() =>
                navigateTo({
                    name: 'auth-signin'
                })
            )
        }
    }

    function setUser(data: UserType, save: boolean = true) {
        let res: UserType
        if (!user.value) {
            res = {
                ...data
            }
        } else {
            res = {
                ...user.value,
                ...data
            }
        }

        user.value = res
        if (!save) return
        saveStorage({
            name: 'user',
            value: res,
            encrypt: true
        })
    }

    function clearUser() {
        user.value = null
        deleteStorage({ name: 'user' })
    }

    return {
        Signin,
        SignOut,
        user,
        setUser,
        clearUser
    }
})
