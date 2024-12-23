import { encryptData, decryptData, type EncryptedData } from './encrypt'
import { type convertTimeUnitsType } from './date'
import { deleteCookies, getCookies, saveCookies } from './cookie'
function parseJson<T>(str: string): T | null {
    try {
        return JSON.parse(str) as T
    } catch {
        return null
    }
}

function strJson<T>(val: T): string {
    try {
        return JSON.stringify(val)
    } catch (error) {
        return ''
    }
}

function saveStorage<T>({
    name,
    value,
    encrypt = false,
    store = 'localStorage',
    maxAge = { value: 90, unit: 'day' }
}: {
    name: string
    value: T
    encrypt?: boolean
    store?: 'localStorage' | 'sessionStorage' | 'cookies'
    maxAge?: convertTimeUnitsType
}) {
    try {
        const obj = {
            localStorage: () => {
                try {
                    const data = encrypt ? encryptData<T>(value) : value
                    localStorage.setItem(name, strJson(data))
                    return data
                } catch {
                    return null
                }
            },
            sessionStorage: () => {
                try {
                    const data = encrypt ? encryptData<T>(value) : value
                    sessionStorage.setItem(name, strJson(data))
                    return data
                } catch {
                    return null
                }
            },
            cookies: () => {
                try {
                    return saveCookies(name, value, {
                        encrypt,
                        maxAge
                    })
                } catch {
                    console.log()
                    return null
                }
            }
        }
        return obj[store]()
    } catch {
        console.log('i found the error in saveStorage')
        return null
    }
}

function getStorage<T>({
    name,
    decrypt = false,
    store = 'localStorage'
}: {
    name: string
    decrypt?: boolean
    store?: 'localStorage' | 'sessionStorage' | 'cookies'
}) {
    try {
        if (['localStorage', 'sessionStorage'].includes(store)) {
            let storage: any
            if (store === 'localStorage') {
                if (import.meta.client) {
                    storage = localStorage.getItem(name)
                }
            }
            if (store === 'sessionStorage') {
                if (import.meta.client) {
                    storage = sessionStorage.getItem(name)
                }
            }
            if (!storage) return null
            const parsedData = parseJson<T>(storage)
            if (!parsedData) return null
            if (decrypt) {
                const { encryptedData, hmac } = parsedData as unknown as EncryptedData // First cast to 'unknown'
                return decryptData<T>(encryptedData, hmac)
            }
            return parsedData
        }

        return getCookies<T>({
            name,
            decrypt
        })
    } catch (error) {
        console.log(error)
        console.log('i found the error in getStorage')
        return null
    }
}

function deleteStorage({
    name,
    store = 'localStorage'
}: {
    name: string
    store?: 'localStorage' | 'sessionStorage' | 'cookies'
}) {
    try {
        const obj = {
            localStorage: () => {
                localStorage.removeItem(name)
            },
            sessionStorage: () => {
                sessionStorage.removeItem(name)
            },
            cookies: () => {
                deleteCookies(name)
            }
        }
        return obj[store]()
    } catch {
        console.log('i found the error in deleteStorage')
        return
    }
}

export { saveStorage, getStorage, deleteStorage }
