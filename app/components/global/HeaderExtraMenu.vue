<template>
    <div class="fc gap-3">
        <NuxtLink :to="{ name: 'index' }">
            <button
                class="rounded-full flex-center w-9 h-9 bg-slate-100 trans hover:bg-slate-200 text-primary-text"
                v-ripple
            >
                <NuxtIcon name="bell" class="text-lg" />
            </button>
        </NuxtLink>
        <NuxtLink :to="{ name: 'index' }">
            <button
                class="rounded-full flex-center w-9 h-9 bg-slate-100 trans hover:bg-slate-200 text-primary-text"
                v-ripple
            >
                <NuxtIcon name="gear" class="text-lg" />
            </button>
        </NuxtLink>
        <NuxtLink :to="{ name: 'index' }">
            <button
                class="rounded-full flex-center w-9 h-9 bg-slate-100 trans hover:bg-slate-200 text-primary-text"
                v-ripple
            >
                <NuxtIcon name="avatar" class="text-lg" />
            </button>
        </NuxtLink>
    </div>
</template>
