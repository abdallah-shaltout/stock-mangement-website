<template>
    <LazySharedFormAppInput
        v-bind="{
            label,
            error,
            inputId
        }"
    >
        <template #content="{ id }">
            <InputGroup class="dir-ltr">
                <InputGroupAddon
                    ><span class="md:hidden">site.com</span
                    ><span>{{ route }}</span></InputGroupAddon
                >
                <InputText
                    v-model="model"
                    v-bind="{
                        id,
                        placeholder,
                        disabled
                    }"
                />
            </InputGroup>
        </template>
    </LazySharedFormAppInput>
</template>

<script lang="ts" setup>
    import type { inputUrlProps } from '~/types'

    const model = defineModel<string | undefined>()

    const { route = 'product' } = defineProps<Partial<inputUrlProps>>()
</script>
