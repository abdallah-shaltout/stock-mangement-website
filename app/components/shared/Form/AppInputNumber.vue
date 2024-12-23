<template>
    <LazySharedFormAppInput
        v-bind="{
            label,
            error,
            inputId
        }"
    >
        <template #content="{ id }">
            <div class="fc gap-2.5">
                <InputNumber
                    v-model="model"
                    v-bind="{
                        inputId: id,
                        placeholder,
                        disabled,
                        min,
                        max,
                        prefix,
                        suffix
                    }"
                    class="flex-1"
                    input-class="dir-ltr"
                />
                <slot />
            </div>
        </template>
    </LazySharedFormAppInput>
</template>

<script lang="ts" setup>
    import type { inputNumberProps } from '~/types'

    const model = defineModel<number>()
    defineProps<Partial<inputNumberProps>>()
</script>
