<template>
    <LazySharedFormAppInput
        v-bind="{
            label,
            error,
            inputId
        }"
    >
        <template #content="{ id }">
            <IconField :class="fieldClass">
                <InputIcon v-if="iconPos === 'right'" :class="icon" />
                <InputText
                    v-bind="{
                        id,
                        type,
                        disabled,
                        placeholder
                    }"
                    v-model="model"
                    :class="['w-full', inputClass]"
                />
                <InputIcon v-if="iconPos === 'left'" :class="icon" />
            </IconField>
        </template>
    </LazySharedFormAppInput>
</template>

<script lang="ts" setup>
    import type { inputIconProps } from '~/types'

    const model = defineModel<string>()
    const { icon = 'pi pi-lock', iconPos = 'left' } = defineProps<Partial<inputIconProps>>()
</script>
