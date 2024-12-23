<template>
    <div
        @click="toggle"
        :class="[
            'app-radio group',
            `${model === value ? '!bg-primary' : '!border-gray-300 hover:bg-slate-100 '}`,
            customClass?.groupClass
        ]"
    >
        <input
            type="radio"
            class="hidden"
            :name="name"
            :id="inputId"
            :value="value"
            :disabled="disabled"
        />
        <i :class="['pi text-xs text-light font-bold', `${model === value ? 'pi-check' : ''}`]"></i>
    </div>
</template>

<script lang="ts" setup>
    const model = defineModel<string | number>()

    const {
        disabled = false,
        name = 'input-radio',
        inputId = 'input-radio',
        value = 'none-value'
    } = defineProps<{
        name?: string
        inputId?: string
        value?: string | number
        disabled?: boolean
        customClass?: {
            radioClass?: string
            groupClass?: string
        }
    }>()

    function toggle() {
        if (disabled) return
        model.value = value
    }
</script>
