<template>
    <NuxtLink
        @click="$emit('Clicked:Route')"
        v-if="!item.items && item.route"
        v-ripple
        :to="item.route"
        class="menu-item"
    >
        <i :class="item.icon" v-if="item.icon.includes('bi ')"></i>
        <NuxtIcon :name="item.icon" filled v-else class="text-xl" />
        <span class="item-label">{{ item.label }}</span>
    </NuxtLink>
    <a v-else href="#" class="sub-menu-item">
        <div v-ripple class="menu-item justify-between" @click="expandSubMenu = !expandSubMenu">
            <div class="fc gap-2">
                <NuxtIcon
                    :name="item.icon"
                    filled
                    class="text-xl"
                    v-if="!item.icon.includes('bi ')"
                />
                <i :class="item.icon" class="text-xl" v-else></i>
                <span class="item-label">{{ item.label }}</span>
            </div>
            <i
                class="pi pi-chevron-down text-xs t-trans"
                :class="{ 'rotate-180': expandSubMenu }"
            ></i>
        </div>
        <Transition name="slide-down">
            <div v-if="expandSubMenu">
                <ul class="menu-list p-4">
                    <li v-for="(subItem, i) in item.items" :key="i">
                        <SidebarItem :item="subItem" />
                    </li>
                </ul>
            </div>
        </Transition>
    </a>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import type { link } from '~/types'
    defineProps<{
        item: link
    }>()

    defineEmits(['Clicked:Route'])

    const expandSubMenu = ref(false)
</script>
