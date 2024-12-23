import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

type ApiOptions = NitroFetchOptions<NitroFetchRequest>
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiMethodParams {
    path: string
    options?: ApiOptions
    body?: any
}
interface ApiRequestConfig extends ApiMethodParams {
    method?: HttpMethod
}

/**
 * Generic API request handler that supports all HTTP methods
 */
async function apiRequest<T = any>({ path, options = {}, body, method = 'GET' }: ApiRequestConfig) {
    return useNuxtApp().$api<T>(path, {
        ...(body && { body }),
        method,
        ...options
    })
}

/**
 * Convenience methods for different HTTP verbs using object parameters
 */
export const apiUtils = {
    get: <T = any>({ path, options }: ApiMethodParams) => apiRequest<T>({ path, options }),

    post: <T = any>({ path, body, options }: ApiMethodParams) =>
        apiRequest<T>({ path, body, options, method: 'POST' }),

    put: <T = any>({ path, body, options }: ApiMethodParams) =>
        apiRequest<T>({ path, body, options, method: 'PUT' }),

    delete: <T = any>({ path, options }: ApiMethodParams) =>
        apiRequest<T>({ path, options, method: 'DELETE' })
}

// Alternative named exports if preferred
export const {
    get: getApiData,
    post: addApiData,
    put: updateApiData,
    delete: deleteApiData
} = apiUtils
