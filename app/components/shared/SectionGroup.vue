<template>
    <div class="page-content">
        <div class="flex-between">
            <slot name="title" :toggle="toggle" :title="title">
                <h2
                    :class="[
                        'group-section-title',
                        titleClass ?? '',
                        !Closable ? '!cursor-default' : ''
                    ]"
                    @click="toggle"
                >
                    <p>{{ title }}</p>
                </h2>
            </slot>
            <slot name="actions">
                <button
                    v-ripple
                    v-if="Closable"
                    class="w-10 h-10 rounded-full trans hover:bg-slate-100 flex-center"
                    @click="toggle"
                >
                    <i
                        class="pi pi-chevron-down t-trans"
                        :class="{ 'rotate-180': showContent }"
                    ></i>
                </button>
            </slot>
        </div>
        <Transition name="slide-down">
            <div v-show="showContent" :key="id" :id="id">
                <div class="main-border border-0 border-t mt-5">
                    <slot />
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
    const id = useId()
    const {
        title = 'العنوان هنا',
        open = false,
        Closable = false
    } = defineProps<{
        title: string
        open?: boolean
        titleClass?: string
        Closable?: boolean
    }>()

    const showContent = ref(open || !Closable)

    defineExpose({ showContent })
    function toggle() {
        if (!Closable) return
        showContent.value = !showContent.value
    }
</script>
