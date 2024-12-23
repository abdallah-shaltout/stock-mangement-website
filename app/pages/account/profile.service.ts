import { getDifferent, updateApiData } from '~/libs'
import type { profileFormType } from '~/forms'
export async function updateProfileInfo({
    newProfileInfo,
    oldProfileInfo,
    callback
}: {
    newProfileInfo: profileFormType
    oldProfileInfo: profileFormType
    callback?: (res: profileFormType) => void
}) {
    try {
        const res = await updateApiData<profileFormType>({
            path: '/api/user/updateProfile',
            body: getDifferent({
                newData: newProfileInfo,
                oldData: oldProfileInfo
            })
        })
        if (callback) callback(res)
        useAlert({
            type: 'success',
            message: 'تم تحديث المعلومات الشخصية بنجاح',
            duration: 3000
        })
    } catch {}
}

export async function updatePassword({
    newPassword,
    oldPassword,
    callback
}: {
    newPassword: string
    oldPassword: string
    callback?: (res: profileFormType | null) => void
}) {
    try {
        const res = await updateApiData<profileFormType>({
            path: '/api/auth/changePassword',
            body: { newPassword, oldPassword }
        })
        if (callback) callback(res)
        useAlert({
            type: 'success',
            message: 'تم تحديث كلمة المرور بنجاح',
            duration: 3000
        })
    } catch {}
}
