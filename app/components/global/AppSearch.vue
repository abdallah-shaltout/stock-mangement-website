<template>
    <div class="mx-auto">
        <div class="rounded-full sm:rounded-lg fc pr-4 main-border pl-1 bg-white h-12">
            <input
                v-model="search"
                type="text"
                class="flex-1 focus:outline-none font-bold placeholder:font-normal"
                placeholder="بحث داحل لوحة التحكم"
                name="app-search"
            />
            <Button
                icon="pi pi-search"
                severity="secondary"
                class="!h-10 !w-10 aspect-square rounded-full sm:border-none sm:bg-transparent hover:!bg-transparent hover:!border-none"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { onClickOutside, useElementBounding } from '@vueuse/core'
    import { ref } from 'vue'
    const search = ref('')
    const showSearchResult = ref(false)
    const searchRef = ref<HTMLElement | null>(null)
    const searchResultRef = ref<HTMLElement | null>(null)
    onClickOutside(searchResultRef, () => {
        showSearchResult.value = false
    })
    const { x, width } = useElementBounding(searchRef)
</script>

<style></style>
