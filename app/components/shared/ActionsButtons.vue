<template>
    <div class="group relative">
        <button
            v-ripple
            class="flex-center hidden sm:flex w-8 h-8 rounded-full trans hover:bg-slate-100"
        >
            <i class="pi !text-sm !text-primary-text pi-ellipsis-h"></i>
        </button>
        <ul
            class="fc gap-1 sm:flex-col sm:absolute sm:p-2 sm:z-1 sm:hidden sm:group-hover:flex sm:bg-white sm:shadow sm:w-32 sm:left-0 sm:-bottom-2 sm:translate-y-full sm:rounded"
        >
            <li v-for="(item, idx) in actions" :key="idx" class="w-full">
                <button
                    @click="item.command"
                    v-ripple
                    v-auto-animate="$autoAnimate"
                    :class="[
                        'flex-center w-8 h-8 sm:w-full sm:gap-2 sm:justify-start sm:p-2 sm:rounded rounded-full trans hover:bg-slate-100',
                        item.btnClass ?? '',
                        pending ? 'pending !rounded-full' : ''
                    ]"
                >
                    <NuxtIcon
                        v-if="!pending"
                        :name="item.iconName"
                        :filled="item.iconName === 'edit'"
                        :class="['text-xl text-primary-text', item.iconClass]"
                    />
                    <!-- <i class="pi !text-sm" :class="item.icon"></i> -->
                    <span class="hidden sm:block text-sm font-medium">{{ item.label }}</span>
                </button>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
    const emit = defineEmits(['view', 'edit', 'delete'])

    const { actions: visibleActions = ['view', 'edit', 'delete'] } = defineProps<{
        pending?: boolean
        actions?: string[]
    }>()

    function focusBody() {
        document.body.focus()
    }
    const actions = markRaw(
        [
            {
                label: 'عرض',
                iconName: 'eye',
                iconClass: '',
                name: 'view',
                command: () => {
                    emit('view')
                    focusBody()
                }
            },
            {
                label: 'تعديل',
                iconName: 'edit',
                iconClass: '',
                name: 'edit',
                command: () => {
                    emit('edit')
                    focusBody()
                }
            },
            {
                label: 'حذف',
                iconName: 'trash',
                iconClass: 'text-rose-500 sm:text-light',
                btnClass: 'sm:bg-rose-500 sm:text-light',
                name: 'delete',
                command: () => {
                    emit('delete')
                    focusBody()
                }
            }
        ].filter((item) => visibleActions.includes(item.name))
    )
</script>
