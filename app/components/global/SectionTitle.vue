<template>
    <div class="flex-between py-4">
        <h2 class="section-title">
            {{ title }}
        </h2>
        <NuxtLink :to="link">
            <Button
                icon="pi pi-chevron-left"
                rounded
                severity="secondary"
                label="عرض المزيد"
                size="small"
            />
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
    defineProps<{
        title: string
        link: any
    }>()
</script>

<style></style>
