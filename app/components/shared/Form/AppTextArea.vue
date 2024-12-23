<template>
    <LazySharedFormAppInput
        v-bind="{
            label,
            error,
            inputId
        }"
    >
        <template #content="{ id }">
            <Textarea
                v-model="model"
                class="w-full"
                v-bind="{
                    id,
                    disabled,
                    placeholder,
                    rows: 5,
                    autoResize: true
                }"
            />
        </template>
    </LazySharedFormAppInput>
</template>

<script lang="ts" setup>
    import type { InputProps } from '~/types'
    const model = defineModel<string>()
    const { placeholder = 'محتوى المنتج' } = defineProps<Partial<InputProps>>()
</script>
