<template>
    <main>
        <AppHeader v-model="showSidebar" />
        <div class="custom-scroll h-screen-svh overflow-y-auto">
            <NuxtPage
                :class="[
                    'default-layout-page',
                    'custom-scroll',
                    { 'mr-[320px] md:mr-0': showSidebar }
                ]"
            />
            <AppSidebar class="app-sidebar" :class="{ active: showSidebar }" />
            <span
                class="side-bar-mask"
                :class="{ active: showSidebar }"
                @click="showSidebar = false"
            ></span>
            <AppFooter class="sm:mb-16" :class="{ 'mr-[320px] md:mr-0': showSidebar }" />
            <LazyMobileNav />
        </div>
    </main>
</template>

<script setup lang="ts">
    import { useStorage } from '@vueuse/core'
    const { isMobile } = useScreen()
    const showSidebar = useStorage('showSidebar', isMobile.value ? false : true, sessionStorage)
    provide('showSidebar', showSidebar)
</script>
