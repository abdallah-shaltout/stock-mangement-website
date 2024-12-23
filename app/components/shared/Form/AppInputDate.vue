<template>
    <LazySharedFormAppInput
        v-bind="{
            label,
            error,
            inputId
        }"
    >
        <template #content="{ id: inputId }">
            <DatePicker v-model="model" showIcon :inputId class="dir-ltr" dateFormat="yy/mm/dd" />
        </template>
    </LazySharedFormAppInput>
</template>

<script lang="ts" setup>
    import type { inputDateProps } from '~/types'
    const model = defineModel<Date>()
    defineProps<Partial<inputDateProps>>()
</script>
