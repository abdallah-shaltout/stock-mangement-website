<template>
    <header class="app-header main-border">
        <div class="container-fluid fc">
            <LazyAppLogo class="md:hidden" />
            <div class="flex-between flex-1 gap-5 md:gap-1">
                <LazySharedAppMenuBtn
                    :class="{ active: model }"
                    @click="model = !model"
                    class="sm:hidden"
                />
                <!-- <LazyAppSearch class="flex-2 sm:w-full" /> -->
                <LazyHeaderExtraMenu class="sm:hidden" />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
    const model = defineModel<boolean>()
</script>
