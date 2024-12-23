<template>
    <div class="relative">
        <ul class="flex-center space-x-2" v-auto-animate="$autoAnimate">
            <li>
                <button
                    v-ripple
                    @click="goToLastPage"
                    :disabled="activePage === totalPages || disabled"
                    class="paginate-btn arrow"
                >
                    <i class="pi pi-angle-double-right"></i>
                </button>
            </li>
            <li>
                <button
                    v-ripple
                    @click="goToNextPage"
                    :disabled="activePage === totalPages || disabled"
                    class="paginate-btn arrow"
                >
                    <i class="pi pi-angle-right"></i>
                </button>
            </li>

            <li v-for="page in pagesToShow" :key="page">
                <button
                    v-ripple
                    @click="changePage(page)"
                    :disabled="disabled"
                    :class="{
                        active: page === activePage
                    }"
                    class="paginate-btn"
                >
                    <span>{{ page }}</span>
                </button>
            </li>

            <li>
                <button
                    v-ripple
                    @click="goToPreviousPage"
                    :disabled="activePage === 1 || disabled"
                    class="paginate-btn arrow"
                >
                    <i class="pi pi-angle-left"></i>
                </button>
            </li>

            <li>
                <button
                    v-ripple
                    @click="goToFirstPage"
                    :disabled="activePage === 1 || disabled"
                    class="paginate-btn arrow"
                >
                    <i class="pi pi-angle-double-left"></i>
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    const {
        totalPages = 5,
        currentPage = 3,
        disabled = false
    } = defineProps<{
        totalPages: number | undefined
        currentPage: number | undefined
        disabled?: boolean
    }>()

    const emit = defineEmits<{
        (event: 'changePage', page: number): void
    }>()

    const activePage = ref<number>(currentPage)

    watch(activePage, (val: number) => {
        activePage.value = val
        emit('changePage', val)
    })
    watch(
        () => currentPage,
        (val: number) => {
            activePage.value = val
        }
    )

    const pagesToShow = computed(() => {
        let pages = []
        const startPage = Math.max(1, activePage.value - 2)
        const endPage = Math.min(totalPages, activePage.value + 2)
        for (let i = endPage; i >= startPage; i--) {
            pages.push(i)
        }
        return pages
    })

    function goToFirstPage() {
        if (activePage.value !== 1) {
            activePage.value = 1
        }
    }

    function goToPreviousPage() {
        if (activePage.value > 1) {
            activePage.value -= 1
        }
    }

    function goToNextPage() {
        if (activePage.value < totalPages) {
            activePage.value += 1
        }
    }

    function goToLastPage() {
        if (activePage.value !== totalPages) {
            activePage.value = totalPages
        }
    }

    function changePage(page: number) {
        if (activePage.value !== page) {
            activePage.value = page
        }
    }
</script>
