<template>
    <div>
        <LazySharedSectionGroup title="الأمان والحماية">
            <div class="form-group">
                <form class="form-group">
                    <div class="flex-between">
                        <span class="text-lg text-primary-text">تغيير كلمة المرور</span>
                        <Button
                            @click="options.enableEdit = true"
                            label="تغيير"
                            size="small"
                            severity="contrast"
                            class="px-6"
                        />
                    </div>
                </form>
            </div>
        </LazySharedSectionGroup>
        <LazyAppDialog animateFrom="bottom" v-model="options.enableEdit">
            <div class="box-content w-[40vw] sm:w-auto max-w-nine sm:max-w-full">
                <div class="flex-between mb-2">
                    <span class="group-section-title small">تغيير كلمة المرور</span>
                    <Button
                        icon="pi pi-times"
                        @click="options.enableEdit = false"
                        rounded
                        text
                        size="small"
                        severity="contrast"
                    />
                </div>

                <hr class="my-4" />

                <form class="fl-5" v-auto-animate="$autoAnimate" @submit.prevent="HandlerSubmit">
                    <LazySharedFormAppInputPassword
                        inputClass="!rounded-xl"
                        :label="null"
                        v-model="formData.oldPassword"
                        :error="errors.oldPassword"
                        placeholder="كلمة المرور الحالية"
                    />
                    <LazySharedFormAppInputPassword
                        inputClass="!rounded-xl"
                        :label="null"
                        v-model="formData.newPassword"
                        :error="errors.newPassword"
                        placeholder="كلمة المرور الجديدة"
                    />
                    <LazySharedFormAppInputPassword
                        inputClass="!rounded-xl"
                        :label="null"
                        v-model="formData.confirmNewPassword"
                        :error="errors.confirmNewPassword"
                        placeholder="تاكيد كلمة المرور الجديدة"
                    />
                    <div class="flex-between">
                        <Button
                            label="تغيير كلمة المرور"
                            severity="contrast"
                            :disabled="!meta.valid"
                            size="small"
                            type="submit"
                        />
                        <Button
                            label="إلغاء"
                            @click="
                                () => {
                                    resetForm()
                                    options.enableEdit = false
                                }
                            "
                            severity="secondary"
                            size="small"
                        />
                    </div>
                </form>
            </div>
        </LazyAppDialog>
    </div>
</template>

<script setup lang="ts">
    import { usePasswordForm } from '~/forms'

    const { errors, formData, HandlerSubmit, resetForm, options, meta } = usePasswordForm()
</script>
