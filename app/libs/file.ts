import { addApiData } from './api'

const FIT_OPTIONS = ['cover', 'contain', 'fill', 'inside', 'outside'] as const
const CROP_MODES = [
    'scale',
    'fit',
    'limit',
    'mfit',
    'fill',
    'lfill',
    'pad',
    'lpad',
    'mpad',
    'crop',
    'thumb',
    'imagga_crop',
    'imagga_scale'
] as const

const FolderNames = ['product', 'category', 'banner', 'brand', 'avatar', 'other'] as const

type FolderName = (typeof FolderNames)[number]
type FitOption = (typeof FIT_OPTIONS)[number]
type CropMode = (typeof CROP_MODES)[number]

interface EagerTransformation {
    readonly width: number
    readonly height: number
    readonly crop: CropMode
}

interface FileUploadOptions<Resize = boolean> {
    readonly resize?: Resize
    readonly width?: number
    readonly height?: number
    readonly quality?: number
    readonly fit?: FitOption
    readonly eagers?: readonly EagerTransformation[]
}

const handleOptions = (options: Partial<FileUploadOptions>) => {
    const obj = {
        resize: options.resize ? 'yes' : 'no',
        width: options.width,
        height: options.height,
        quality: options.quality ?? 70,
        eagers: options.eagers,
        fit: options.fit
    }
    const res = Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => {
            if (['width', 'height'].includes(_)) {
                if (obj.resize === 'no') return false
            }
            return value !== null && value !== undefined
        })
    )
    return res
}

function getFormData(file: File | string) {
    if (typeof file === 'string') {
        return {
            url: file
        }
    }
    const formData = new FormData()
    formData.append('image', file)
    return formData
}

export async function uploadImage({
    file,
    options = {},
    folder = 'other'
}: {
    file: File | string
    options?: Partial<FileUploadOptions>
    folder?: FolderName
}): Promise<string | null> {
    try {
        const formData = getFormData(file)
        const dataOptions = handleOptions(options)

        const { secure_url } = await addApiData<{
            secure_url: string
        }>({
            path: `/api/file/${folder}`,
            body: formData,
            options: {
                query: {
                    ...dataOptions,
                    fieldName: 'image'
                }
            }
        })
        return secure_url
    } catch (error) {
        return null
    }
}
