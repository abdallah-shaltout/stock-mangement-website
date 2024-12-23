import { useConfirm } from 'primevue/useconfirm'
import type { ConfirmationOptions } from 'primevue/confirmationoptions'

export const useGlobalStore = defineStore('global', () => {
    const confirm = useConfirm()
    function __confirm(options: ConfirmationOptions) {
        return confirm.require({
            message: 'هل تريد الاستمرار؟',
            position: 'top',
            blockScroll: true,
            header: 'تأكيد',
            ...options
        })
    }
    const loading = ref<boolean>(false)

    const LoginDialog = reactive({
        show: false,
        redirectUrl: ''
    })

    return {
        __confirm,
        loading,
        LoginDialog
    }
})
