<template>
    <aside>
        <span class="sidebar-sm-top-shape hidden sm:block"></span>
        <div class="fc gap-2 mb-2 border-b pb-4 hidden md:flex sm:hidden">
            <AppLogo />
        </div>
        <ul class="overflow-y-auto h-full custom-scroll fl sm:pt-3">
            <li v-for="(item, i) in sidebarItems" :key="i">
                <span class="menu-text" v-if="item.title">{{ item.title }}</span>
                <ul class="menu-list">
                    <li v-for="(link, idx) in item.items" :key="idx">
                        <LazySidebarItem :item="link" @clicked:Route="ClickedRoute" />
                    </li>
                </ul>
            </li>
            <li class="mt-auto">
                <LazySidebarItem
                    @clicked:Route="ClickedRoute"
                    :item="{
                        label: 'الاعدادات',
                        icon: 'gear',
                        route: {
                            name: 'dashboard-settings'
                        }
                    }"
                />
            </li>
            <li>
                <LazySidebarItem
                    @clicked:Route="ClickedRoute"
                    :item="{
                        label: 'الملف الشخصي',
                        icon: 'bi bi-person-circle',
                        route: {
                            name: 'account-profile'
                        }
                    }"
                />
            </li>
            <li>
                <button class="fc gap-2 menu-item w-full" @click="Signout">
                    <i class="pi pi-sign-out"></i>
                    <span>تسجيل الخروج</span>
                </button>
            </li>
        </ul>
    </aside>
</template>

<script setup lang="ts">
    const showSidebar = inject<any>('showSidebar')
    import type { sidebarItemType } from '~/types'
    import sidebarItemsData from '@/assets/config/sidebar'
    const sidebarItems = ref<sidebarItemType[]>([...sidebarItemsData])
    const { isMobile } = useScreen()

    function ClickedRoute() {
        if (!isMobile.value) return
        showSidebar.value = false
    }

    async function Signout() {
        const AuthStore = useAuthStore()
        await AuthStore.SignOut()
        ClickedRoute()
    }
</script>

