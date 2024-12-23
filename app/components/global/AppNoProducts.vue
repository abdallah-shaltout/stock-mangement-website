<template>
    <div class="flex-center flex-col py-14 mx-auto">
        <p :class="titleClass">{{ title }}</p>
        <NuxtImg
            loading="lazy"
            :src="image"
            alt="لا يوجد منتجات"
            :class="['mix-blend-multiply max-w-400 sm:max-w-nine', imageClass]"
        />
    </div>
</template>

<script setup lang="ts">
    const {
        title = 'لا يوجد منتجات',
        titleClass = 'text-3xl text-center text-primary-text font-bold',
        imageClass = '',
        images = [
            'https://res.cloudinary.com/dmjopl46j/image/upload/v1727473283/static%20assets/image_fx___26_-removebg-preview-transformed-transformed_1_idume4.png',
            'https://res.cloudinary.com/dmjopl46j/image/upload/v1727467839/static%20assets/image_fx___14_-removebg-preview-transformed_1_-min_bhbxtr.png'
        ]
    } = defineProps<{
        title?: string
        images?: string[]
        titleClass?: string
        imageClass?: string
    }>()

    const image = computed(() => images[Math.floor(Math.random() * images.length)])
</script>
