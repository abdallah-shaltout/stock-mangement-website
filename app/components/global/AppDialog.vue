<template>
    <Teleport to="body">
        <Transition :name="`dialog-animate-${animateFrom}`">
            <div
                v-if="show"
                class="fixed inset-0 z-200 trans-all bg-black/40 backdrop-blur-sm w-full h-full flex-center fade-in"
            >
                <div :class="[contentClass]" ref="targetDialog" class="dialog-content">
                    <slot :close="ClickOutside">
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae nemo
                            numquam illum culpa iste. Nobis reiciendis minima officia aliquid eaque!
                        </p>
                    </slot>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
    const emit = defineEmits(['ClickOutside'])

    const {
        closeOnEscape = true,
        contentClass = 'box sm:w-nine',
        animateFrom = 'top'
    } = defineProps<{
        closeOnEscape?: boolean
        contentClass?: string
        animateFrom?: 'top' | 'bottom' | 'left' | 'right'
    }>()


    

    const targetDialog = ref(null)
    const show = defineModel<boolean>({
        default: false
    })

    onClickOutside(targetDialog, ClickOutside)
    function ClickOutside() {
        emit('ClickOutside')
        if (closeOnEscape) {
            show.value = false
        }
    }
</script>

<style>
    @import '~/assets/css/dialogAnimate.css';
</style>
