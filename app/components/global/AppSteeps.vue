<template>
    <div class="w-nine max-w-3xl py-4 mb-auto relative flex-between">
        <span class="bg-gray-300 h-0.5 w-full absolute left-0 top-1/2 -translate-y-1/2"></span>
        <span
            :style="{ width: progressWidth }"
            class="bg-primary h-0.5 absolute right-0 top-1/2 -translate-y-1/2 trans-all duration-1000"
        ></span>
        <div v-for="(steep, idx) in stepsItems" class="relative">
            <button
                @click="GoToStep(idx)"
                v-ripple
                :class="{ '!bg-primary !text-light delay-300': activeIndex >= idx }"
                class="bg-white border text-hash-text border-primary relative z-1 w-12 h-12 rounded-full trans"
                :key="idx"
            >
                <slot :steepProps="steep" name="icon">
                    <i class="pi text-xl" :class="steep.icon"></i>
                </slot>
            </button>
            <slot :label="steep.label" name="label">
                <span
                    v-if="showLabel"
                    class="absolute w-fit whitespace-nowrap left-1/2 -translate-x-1/2 -bottom-2 translate-y-full font-medium trans"
                    :class="{ 'text-primary  delay-300': activeIndex >= idx }"
                    >{{ steep.label }}</span
                >
            </slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const emit = defineEmits(['changeActiveIndex'])

    const {
        activeIndex = 0,
        canGoNext = true,
        canGoBack = true,
        stepsItems = [],
        showLabel = false
    } = defineProps<{
        stepsItems: { icon: string; label?: string }[]
        activeIndex?: number
        canGoNext?: boolean
        canGoBack?: boolean
        showLabel?: boolean
    }>()

    const currentActiveIndex = ref(activeIndex ?? 0)
    const progressWidth = computed(() => {
        if (stepsItems.length === 1) return '0%'
        return `${(currentActiveIndex.value / (stepsItems.length - 1)) * 100}%`
    })
    function GoToStep(idx: number) {
        if (!canGoNext && idx > currentActiveIndex.value) return
        if (!canGoBack && idx < currentActiveIndex.value) return
        currentActiveIndex.value = idx
        emit('changeActiveIndex', idx)
    }
    watch(
        () => activeIndex,
        (idx: number) => {
            if (idx > stepsItems.length - 1) return
            currentActiveIndex.value = idx
            emit('changeActiveIndex', idx)
        }
    )
</script>
