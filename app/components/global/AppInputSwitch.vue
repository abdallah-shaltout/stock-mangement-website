<template>
    <div
        class="group w-16 h-7 trans bg-slate-100 rounded-full relative cursor-pointer"
        @click="toggle"
        :class="[model ? activeColor : rejectedColor, groupClass]"
    >
        <span
            class="w-6 h-6 flex-center rounded-full absolute left-1 top-1/2 -translate-y-1/2 trans-all ease-in-out"
            :class="[
                model ? activeCircleColor : rejectedCircleColor,
                model ? 'left-[calc(100%-1.7rem)]' : '',
                circleClass
            ]"
        >
            <slot />
        </span>
    </div>
</template>

<script lang="ts" setup>
    const model = defineModel<boolean>()
    const emit = defineEmits(['controll:toggle'])
    const {
        disabled = false,
        activeColor = '!bg-primary',
        rejectedColor = 'bg-slate-100',
        rejectedCircleColor = 'bg-slate-400',
        activeCircleColor = 'bg-slate-100',
        controllToggle = false
    } = defineProps<{
        disabled?: boolean
        groupClass?: string
        circleClass?: string
        activeColor?: string
        rejectedColor?: string
        rejectedCircleColor?: string
        activeCircleColor?: string
        controllToggle?: boolean
    }>()

    function toggle() {
        if (disabled) return
        if (controllToggle) {
            emit('controll:toggle', !model.value)
            return
        }
        model.value = !model.value
    }
</script>
