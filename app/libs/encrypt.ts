import CryptoJS from 'crypto-js'

export interface EncryptedData {
    encryptedData: string
    hmac: string
}
function fixDecryptSpecialChars(str: string): string {
    return str
        .replaceAll('-10-plus-', '+')
        .replaceAll('-11-slash-', '/')
        .replaceAll('-12-equal-', '=')
        .replaceAll('-13-underscore-', '_')
        .replaceAll('-14-space-', ' ')
}
function encryptData<T = Record<string, unknown>>(data: T): EncryptedData {
    const runtime = useRuntimeConfig()
    const { cryptoKey, cryptoHMAC } = runtime.public

    const jsonString = JSON.stringify(data)
    const encryptedData = CryptoJS.AES.encrypt(jsonString, cryptoKey).toString()
    const hmac = CryptoJS.HmacSHA256(encryptedData, cryptoHMAC).toString()
    return { encryptedData, hmac }
}

function decryptData<T = any>(encryptedData: string, hmac: string): T | undefined {
    const runtime = useRuntimeConfig()
    const { cryptoKey, cryptoHMAC } = runtime.public

    const computedHmac = CryptoJS.HmacSHA256(encryptedData, cryptoHMAC).toString()
    if (computedHmac !== hmac) {
        throw new Error('Data integrity check failed')
    }

    const bytes = CryptoJS.AES.decrypt(encryptedData, cryptoKey)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as T
}

export { encryptData, decryptData, fixDecryptSpecialChars }
