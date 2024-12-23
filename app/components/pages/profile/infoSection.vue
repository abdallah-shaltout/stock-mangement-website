<template>
    <LazySharedSectionGroup title="البيانات الاساسية">
        <template #actions>
            <div class="fc gap-2" v-auto-animate="$autoAnimate">
                <Button
                    label="تعديل"
                    @click="options.enableEdit = !options.enableEdit"
                    v-if="!options.enableEdit"
                    size="small"
                    severity="contrast"
                    class="px-6"
                />
                <Button
                    label="حفظ"
                    icon="pi pi-check"
                    v-if="options.enableEdit"
                    severity="contrast"
                    size="small"
                    :disabled="!meta.valid"
                    @click="HandlerSubmit"
                />
                <Button
                    label="الغاء"
                    icon="pi pi-times"
                    severity="secondary"
                    v-if="options.enableEdit"
                    text
                    size="small"
                    @click="
                        () => {
                            resetForm()
                            options.enableEdit = false
                        }
                    "
                />
            </div>
        </template>
        <div class="form-group">
            <form class="form-group">
                <LazySharedFormAppInputIcon
                    label="الاسم"
                    v-model="formData.name"
                    icon="pi pi-user"
                    iconPos="right"
                    placeholder="احمد"
                    :disabled="!options.enableEdit"
                    :error="errors.name"
                />

                <div class="flex-center gap-3">
                    <LazySharedFormAppInputIcon
                        label="اسم المستخدم"
                        v-model="formData.username"
                        icon="pi pi-user"
                        placeholder="manager2"
                        fieldClass="dir-ltr"
                        :disabled="!options.enableEdit"
                        inputClass="dir-ltr"
                        :error="errors.username"
                        class="flex-1"
                    />
                    <LazySharedFormAppInputIcon
                        label="رقم الهاتف"
                        v-model="formData.phoneNumber"
                        icon="pi pi-phone"
                        iconPos="right"
                        placeholder="015...."
                        :disabled="!options.enableEdit"
                        fieldClass="dir-ltr"
                        inputClass="dir-ltr"
                        :error="errors.phoneNumber"
                        class="flex-1"
                    />
                </div>
            </form>
        </div>
    </LazySharedSectionGroup>
</template>

<script lang="ts" setup>
    import { useProfileInfoForm, type profileFormType } from '~/forms'
    const authStore = useAuthStore()

    const { errors, formData, HandlerSubmit, resetForm, options, meta } = useProfileInfoForm({
        user: authStore.user as profileFormType
    })
</script>
