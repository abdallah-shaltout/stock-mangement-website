<template>
    <div class="input-group relative" v-auto-animate="$autoAnimate">
        <label v-if="label !== null" :for="inputIdComputed" class="form-label">{{ label }}</label>
        <slot name="content" :id="inputIdComputed">
            <InputText
                v-model="model"
                v-bind="{
                    placeholder,
                    disabled,
                    id: inputIdComputed
                }"
            />
        </slot>
        <slot name="error">
            <LazyValidateErrorMessage :error="error" />
        </slot>
    </div>
</template>

<script lang="ts" setup>
    import type { InputProps } from '~/types'

    const model = defineModel<string>()
    const id = useId()

    const { label = 'العنوان', inputId } = defineProps<Partial<InputProps>>()

    const inputIdComputed = computed(() => inputId || `input-${id}-${label}`)
</script>
