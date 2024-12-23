<template>
    <section class="min-h-svh flex flex-row-reverse">
        <div class="flex-1 md:hidden">
            <LazyPagesAuthRightSide
                imageSrc="https://res.cloudinary.com/dmjopl46j/image/upload/v1727476918/static%20assets/image_fx___27_-removebg-preview-transformed-transformed_ip3ma5.png"
            />
        </div>
        <div class="flex-1 flex-center flex-col min-w-500">
            <h1 class="text-3xl font-medium text-primary-text w-nine max-w-xl">تسجيل الدخول</h1>
            <p class="text-secondary-text w-nine max-w-xl mt-2 text-sm">
                سجل الدخول, لتستمتع بعرض منتجات مخصصة لك.
            </p>
            <form class="mt-14 w-nine max-w-xl fl-5" @submit.prevent="Signin">
                <LazySharedFormAppInputIcon
                    size="large"
                    inputClass="!rounded-xl placeholder:text-right"
                    icon="pi pi-user"
                    :label="null"
                    v-model="user.username"
                    fieldClass="dir-ltr"
                    placeholder="اسم المستخدم او البريد الالكتروني"
                />
                <LazySharedFormAppInputPassword
                    size="large"
                    inputClass="!rounded-xl"
                    :label="null"
                    v-model="user.password"
                    placeholder="كلمة المرور"
                />

                <NuxtLink
                    :to="{ name: 'auth-forget-password' }"
                    class="text-dark hover:underline hover:underline-offset-6"
                >
                    نسيت كلمة السر
                </NuxtLink>
                <Button label="تسجيل الدخول" severity="primary" rounded type="submit" />
            </form>
        </div>
    </section>
</template>

<script lang="ts" setup>
    const authStore = useAuthStore()
    const user = reactive({
        username: '',
        password: ''
    })

    function Signin() {
        if (!user.username || !user.password)
            return useAlert({
                type: 'error',
                message: 'يجب ملئ جميع الحقول'
            })

        if (user.username.length < 5)
            return useAlert({
                type: 'error',
                message: 'اسم المستخدم يجب أن يكون أطول من ٥ حروف',
                duration: 3000
            })

        if (user.password.length < 8)
            return useAlert({
                type: 'error',
                message: 'كلمة المرور يجب أن تكون أطول من ٨ حروف على الأقل',
                duration: 3000
            })
        authStore.Signin(user.username, user.password)
    }

    definePageMeta({
        layout: 'auth',
        notRequiredAuth: true
    })
</script>
