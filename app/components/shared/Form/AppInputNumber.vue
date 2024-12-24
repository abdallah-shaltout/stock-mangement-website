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
                        size,
                        inputId: id,
                        placeholder,
                        disabled,
                        min,
                        max,
                        prefix,
                        suffix,
                        // useGrouping,
                        // inputClass: `flex-1 ${inputClass}`
                    }"
                    class="flex-1"
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
