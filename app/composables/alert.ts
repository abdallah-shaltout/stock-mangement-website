import { toast } from 'vue-sonner'

export type ToastType = Pick<typeof toast, 'info' | 'success' | 'warning' | 'error' | 'loading'>
type ToastPosition =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center'

export interface AlertOptions {
    type?: keyof ToastType
    message: string
    description?: string
    duration?: number
    position?: ToastPosition
    closeButton?: boolean
    action?: {
        label: string
        onClick: () => void
    }
}

export const useAlert = ({
    type = 'success',
    message,
    description,
    duration = 2000,
    position = 'top-center',
    closeButton = false,
    action
}: AlertOptions) => {
    const toastOptions = { duration, position, description, closeButton, action }
    return toast[type](message, toastOptions)
}
