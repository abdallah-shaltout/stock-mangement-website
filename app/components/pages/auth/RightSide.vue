<template>
    <div
        class="w-full h-full bg-gradient-to-tr from-violet-100 to-slate-100 flex-center flex-col gap-2"
    >
        <AppLogo class="scale-125" />

        <h2 class="text-4xl font-bold text-primary-text leading-[3rem] text-center">
            <span>{{ title }}</span>
            <br />
            <span class="text-primary">{{ tagline }}</span>
        </h2>

        <NuxtImg
            loading="lazy"
            :src="imageSrc"
            class="w-5/6 max-w-lg mt-4 mix-blend-multiply"
            alt="صورة التطبيق"
        />
    </div>
</template>
<script setup lang="ts">
    const { tagline = 'الباقي علينا', title = 'اطلب وسيب' } = defineProps<{
        imageSrc: string
        title?: string
        tagline?: string
    }>()
</script>
