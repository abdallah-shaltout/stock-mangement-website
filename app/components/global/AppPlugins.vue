<template>
    <div>
        <Toaster dir="rtl" position="top-right" theme="light" />
        <ConfirmDialog class="app-confirm" :draggable="false"></ConfirmDialog>
        <Transition name="fade-blur">
            <LazyAppLoading />
        </Transition>
    </div>
</template>

<script lang="ts" setup>
    import { Toaster } from 'vue-sonner'
</script>
