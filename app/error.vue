<template>
    <div class="h-screen flex-center flex-col gap-4" v-if="!hiddenError">
        <h1 class="text-7xl font-bold">{{ error?.statusCode }}</h1>
        <p class="text-3xl">{{ error?.message || 'خطأ غير معروف' }}</p>
        <NuxtLink :to="{ name: 'index' }">
            <Button size="large" label="الرجوع للصفحة الرئيسية" />
        </NuxtLink>
    </div>
</template>
<script setup lang="ts">
    import type { NuxtError } from '#app'
    const { error } = defineProps({
        error: Object as () => NuxtError
    })

    console.log(error)

    const hiddenError = computed(() => (error?.statusCode || 500) >= 500)

    function clearAndRedirect() {
        clearError()
        navigateTo({ name: 'index' })
    }

    onMounted(() => {
        setTimeout(clearAndRedirect, 5000)
    })
</script>
