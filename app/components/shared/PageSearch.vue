<template>
    <form @submit.prevent="() => $emit('search', search)">
        <LazySharedFormAppInputIcon
            icon="pi pi-search"
            v-model="search"
            :label="null"
            :placeholder="placeholder"
            class="w-full"
            :size="isMobile ? 'small' : undefined"
        />
    </form>
</template>

<script setup lang="ts">
    const search = defineModel<string>({ required: true })
    const { isMobile } = useScreen()
    defineEmits(['search'])
    const { placeholder = 'بحث' } = defineProps<{
        placeholder?: string
    }>()
</script>
