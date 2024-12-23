import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import type { UserType, ValidateFieldType } from '~/types'
import { validatePhoneNumber } from '~/libs'
import { updatePassword, updateProfileInfo } from './profile.service'

export type profileFormType = Pick<UserType, 'name' | 'username' | 'phoneNumber'>

export function useProfileInfoForm({ user }: { user?: profileFormType }) {
    const validationSchema = toTypedSchema(
        zod.object({
            username: zod.string().min(3, 'اسم المستخدم يجب ان يكون اكثر من 3 احرف'),
            name: zod
                .string()
                .min(3, 'الاسم الاول يجب ان يكون اكثر من 3 احرف')
                .max(20, 'الاسم الاول يجب ان يكون اقل من 20 احرف'),
            phoneNumber: zod
                .string()
                .length(11, 'رقم الهاتف يجب ان يكون 11 رقم')
                .refine(
                    validatePhoneNumber,
                    'رقم الهاتف يجب ان يكون 11 رقم ويبدا ب 015, 010, 012, 011'
                )
        })
    )
    const { defineField, errors, handleSubmit, resetForm, meta } = useForm({
        validationSchema,
        initialValues: user
    })
    const formData = reactive<profileFormType>({
        name: defineField<'name', string>('name')[0] as ValidateFieldType,
        username: defineField<'username', string>('username')[0] as ValidateFieldType,
        phoneNumber: defineField<'phoneNumber', string>('phoneNumber')[0] as ValidateFieldType
    })

    const options = reactive<{
        enableEdit: boolean
    }>({
        enableEdit: false
    })

    async function onSubmit() {
        const GlobalStore = useGlobalStore()
        try {
            GlobalStore.loading = true

            if (!meta.value.dirty) {
                return useAlert({
                    type: 'info',
                    message: 'لم تقم بتغيير أي شيء',
                    duration: 5000,
                    position: 'top-center'
                })
            }

            if (!user) return

            await updateProfileInfo({
                newProfileInfo: formData,
                oldProfileInfo: user,
                callback: () => {
                    const AuthStore = useAuthStore()
                    AuthStore.setUser(formData as UserType)
                    options.enableEdit = false
                }
            })
        } catch (error) {
            console.error(error)
        } finally {
            GlobalStore.loading = false
        }
    }

    const HandlerSubmit = handleSubmit(onSubmit)

    return {
        formData,
        HandlerSubmit,
        resetForm,
        errors,
        options,
        meta
    }
}

export type passwordFormType = {
    oldPassword: string
    newPassword: string
    confirmNewPassword: string
}

export function usePasswordForm() {
    const validationSchema = toTypedSchema(
        zod
            .object({
                oldPassword: zod.string().min(6, 'كلمة المرور القديمة يجب ان تكون اكثر من 6 احرف'),
                newPassword: zod.string().min(6, 'كلمة المرور الجديدة يجب ان تكون اكثر من 6 احرف'),
                confirmNewPassword: zod
                    .string()
                    .min(6, 'تأكيد كلمة المرور يجب ان يكون اكثر من 6 احرف')
            })
            .refine((data) => data.newPassword === data.confirmNewPassword, {
                message: 'كلمة المرور غير متطابقة'
            })
    )

    const { defineField, errors, handleSubmit, resetForm, meta } = useForm({
        validationSchema
    })

    const formData = reactive<passwordFormType>({
        oldPassword: defineField<'oldPassword', string>('oldPassword')[0] as ValidateFieldType,
        newPassword: defineField<'newPassword', string>('newPassword')[0] as ValidateFieldType,
        confirmNewPassword: defineField<'confirmNewPassword', string>(
            'confirmNewPassword'
        )[0] as ValidateFieldType
    })

    const options = reactive<{
        enableEdit: boolean
    }>({
        enableEdit: false
    })

    async function onSubmit() {
        const GlobalStore = useGlobalStore()
        try {
            GlobalStore.loading = true

            await updatePassword({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
                callback: () => {
                    options.enableEdit = false
                }
            })
        } catch (error) {
            console.error(error)
        } finally {
            GlobalStore.loading = false
        }
    }

    const HandlerSubmit = handleSubmit(onSubmit)

    return {
        formData,
        HandlerSubmit,
        resetForm,
        errors,
        options,
        meta
    }
}
