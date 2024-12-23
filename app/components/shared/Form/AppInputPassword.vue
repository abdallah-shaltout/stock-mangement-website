<template>
    <LazySharedFormAppInput
        v-bind="{
            label,
            error,
            inputId
        }"
    >
        <template #content="{ id }">
            <IconField>
                <InputIcon class="pi pi-lock" />
                <InputText
                    :type="toggle ? 'text' : 'password'"
                    v-bind="{
                        id,
                        placeholder,
                        disabled
                    }"
                    v-model="model"
                    :class="['w-full dir-ltr placeholder:text-right', inputClass]"
                />
                <InputIcon
                    @click="toggle = !toggle"
                    class="pi cursor-pointer"
                    :class="{ 'pi-eye': !toggle, 'pi-eye-slash': toggle }"
                />
            </IconField>
        </template>
    </LazySharedFormAppInput>
</template>

<script lang="ts" setup>
    import type { inputPasswordProps } from '~/types'

    const model = defineModel<string>()
    const toggle = ref<boolean>(false)
    defineProps<Partial<inputPasswordProps>>()
</script>
