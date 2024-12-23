import { convertTimeUnits, type convertTimeUnitsType } from './date'
import { encryptData, decryptData, type EncryptedData } from './encrypt'
function saveCookies<T = any>(
    name: string,
    value: T,
    options: {
        encrypt?: boolean
        maxAge?: convertTimeUnitsType
    }
) {
    const { encrypt = false, maxAge = { value: 90, unit: 'day', target: 'seconds' } } = options

    const cookie = useCookie<any>(name, {
        maxAge: convertTimeUnits(maxAge),
        secure: true,
        sameSite: 'strict'
    })

    if (encrypt) {
        const data = encryptData<T>(value)
        cookie.value = data
        return data
    } else {
        cookie.value = value
        return value
    }
}

function getCookies<T = any>({
    name,
    decrypt = false
}: {
    name: string
    decrypt?: boolean
}): T | undefined {
    const cookie = useCookie<T>(name, {
        secure: true
    })
    if (decrypt && cookie.value) {
        const { encryptedData, hmac } = cookie.value as unknown as EncryptedData
        return decryptData<T>(encryptedData, hmac)
    } else {
        return cookie.value
    }
}
function deleteCookies<T = any>(name: string) {
    const cookie = useCookie<T | null>(name, {
        secure: true
    })
    cookie.value = null
}

export { saveCookies, getCookies, deleteCookies }
