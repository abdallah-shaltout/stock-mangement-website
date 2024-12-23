function ValidateMongoId(id: string) {
    return /^[0-9a-fA-F]{24}$/.test(id)
}

function ValidateImageSize(image: File, size: number) {
    const maxSize = size * 1024 * 1024

    if (image.size > maxSize) throw new Error('حجم الصورة اكبر من 2mb')
    return true
}

function ValidateImageType(image: File) {
    const allowedTypes = ['webp', 'jpg', 'jpeg', 'png'].map((type) => `image/${type}`)
    if (!allowedTypes.includes(image.type)) throw new Error('نوع الصورة غير مسموح به')
    return true
}

function ValidateImageUrl(url: string) {
    const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    if (!reg.test(url)) throw new Error('رابط الصورة غير صالح')
    return true
}

function ValidateImage(image: File | string | null) {
    if (!image) throw new Error('الصورة مطلوبة')
    if (image instanceof File) {
        ValidateImageType(image)
        ValidateImageSize(image, 2)
    }
    if (typeof image === 'string') {
        ValidateImageUrl(image)
    }

    return image
}

function validatePhoneNumber(val: string | undefined) {
    if (!val) return false
    return /^(015|010|012|011)\d{8}$/.test(val)
}

export { ValidateMongoId, ValidateImage, ValidateImageSize, ValidateImageType, validatePhoneNumber }
