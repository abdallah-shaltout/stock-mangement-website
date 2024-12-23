import type { UseFetchOptions } from 'nuxt/app'

export function useLazyAPI<T>(
    url: string | (() => string),
    options: Omit<UseFetchOptions<T>, 'default'> = {}
) {
    return useLazyFetch(url, {
        ...options,
        $fetch: useNuxtApp().$api
    })
}
