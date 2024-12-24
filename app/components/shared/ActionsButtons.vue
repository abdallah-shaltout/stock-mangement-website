<template>
    <div>
        <ul class="fc gap-1">
            <li v-for="(item, idx) in actions" :key="idx" class="w-full">
                <button
                    @click="item.command"
                    v-ripple
                    v-auto-animate="$autoAnimate"
                    :class="[
                        'flex-center w-8 h-8  rounded-full trans hover:bg-slate-100',
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
                    <!-- <span class="hidden sm:block text-sm font-medium">{{ item.label }}</span> -->
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
                iconClass: 'text-rose-500',
                btnClass: '',
                name: 'delete',
                command: () => {
                    emit('delete')
                    focusBody()
                }
            }
        ].filter((item) => visibleActions.includes(item.name))
    )
</script>
