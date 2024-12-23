<template>
    <div>
        <Select
            v-model="selectValue"
            :options="options"
            optionLabel="label"
            optionValue="value"
            :placeholder="placeholder"
            :size
        />
    </div>
</template>

<script setup lang="ts">
    const selectValue = defineModel<string>({
        default: ''
    })
    const emit = defineEmits(['change'])
    const {
        options,
        placeholder = 'ترتيب حسب',
        size
    } = defineProps<{
        options: { label: string; value: string; icon?: string }[]
        placeholder?: string
        size?: 'small' | 'large'
    }>()

    watch(selectValue, (val) => {
        emit('change', val)
    })
</script>
