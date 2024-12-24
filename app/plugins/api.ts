import { getToken } from '~/libs'

declare module '#app' {
    interface NuxtApp {
        $api: typeof $fetch
    }
}

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const api = $fetch.create<any>({
        baseURL: config.public.apiBase,
        credentials: 'include',

        onRequest({ options }) {
            options.query = Object.fromEntries(
                Object.entries(options.query || {}).filter(
                    ([_, value]) => value !== '' && value !== undefined
                )
            )
            let token = getToken()
            if (!token) return
            options.headers.set('Authorization', `Bearer ${token}`)
            options.headers.set('authorization', `Bearer ${token}`)
        },
        onResponseError({ response, options }) {
            if (options.headers.get('stopAlert') === 'yes') return
            const messages: string[] = []
            const data = response._data
            if (data.error) messages.push(...data.error)
            if (data.message) messages.push(data.message)

            messages.forEach((message: string) => {
                useAlert({
                    message: message,
                    type: 'error',
                    duration: 3000
                })
            })
        }
    })
    return {
        provide: {
            api
        }
    }
})
