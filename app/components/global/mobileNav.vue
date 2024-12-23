<template>
    <div
        class="hidden sm:flex fixed bottom-0 left-0 w-full rounded-t-2xl bg-white h-16 z-300 main-border-t"
    >
        <div class="flex-between w-full px-4">
            <LazySharedAppMenuBtn
                :class="{ active: showSidebar }"
                @click="showSidebar = !showSidebar"
            />
            <NuxtLink :to="{ name: 'index' }">
                <button class="tab-menu-btn" v-ripple>
                    <NuxtIcon name="gear" class="text-2xl" />
                </button>
            </NuxtLink>
            <NuxtLink :to="{ name: 'index' }">
                <button class="tab-menu-btn" v-ripple>
                    <NuxtIcon name="bell" class="text-2xl" />
                </button>
            </NuxtLink>
            <NuxtLink :to="{ name: 'index' }">
                <button class="tab-menu-btn" v-ripple>
                    <NuxtIcon name="avatar" class="text-2xl" />
                </button>
            </NuxtLink>
            <NuxtLink :to="{ name: 'index' }">
                <button class="tab-menu-btn" v-ripple>
                    <NuxtIcon name="home" class="text-2xl" />
                </button>
            </NuxtLink>
        </div>
    </div>
</template>
<script lang="ts" setup>
    const showSidebar = inject<ComputedRef<boolean>>('showSidebar')






    const links = markRaw([
        {
            
        }
    ])
</script>
