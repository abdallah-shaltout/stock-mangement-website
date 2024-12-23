<template>
    <section>
        <div class="page-container">
            <h1 class="page-title">إدارة المخازن</h1>
            <div class="page-content">
                <DataTable
                    stripedRows
                    :value="items"
                    class="w-full center-header"
                    scrollable
                    dataKey="id"
                    removableSort
                    @sort="
                        (event: any) => {
                            restPage()
                            query.sort = getSortValue(event.sortField, event.sortOrder)
                        }
                    "
                >
                    <template #empty>
                        <p class="text-center text-secondary-text py-4">
                            لا توجد مخازن لعرضها في الوقت الحالي
                        </p>
                    </template>
                    <template #header>
                        <div class="flex-between flex-wrap gap-2">
                            <div class="fc gap-2 flex-wrap">
                                <LazySharedFormAppInputIcon
                                    class="flex-1"
                                    size="small"
                                    inputClass="placeholder:text-right"
                                    icon="pi pi-search"
                                    :label="null"
                                    v-model="query.number"
                                    fieldClass="dir-ltr"
                                    placeholder="رقم المخزن"
                                />
                                <LazySharedFormAppInputIcon
                                    class="flex-1"
                                    size="small"
                                    inputClass="placeholder:text-right"
                                    icon="pi pi-search"
                                    :label="null"
                                    v-model="query.name"
                                    fieldClass="dir-ltr"
                                    placeholder="اسم المخزن"
                                />
                            </div>

                            <Button
                                label="إعادة التصفية"
                                icon="pi pi-times"
                                size="small"
                                severity="secondary"
                                @click="restFilter"
                            />
                        </div>
                    </template>

                    <Column field="number" header="رقم المخزن">
                        <template #body="{ data }" v-auto-animate="$autoAnimate">
                            <span
                                class="pending w-3/4 h-4 rounded-full mx-auto"
                                v-if="pending"
                            ></span>
                            <span v-else class="flex-center whitespace-nowrap">
                                {{ data.number }}
                            </span>
                        </template>
                    </Column>

                    <Column field="name" header="اسم المخزن">
                        <template #body="{ data }" v-auto-animate="$autoAnimate">
                            <span
                                class="pending w-3/4 h-4 rounded-full mx-auto"
                                v-if="pending"
                            ></span>
                            <span v-else class="flex-center whitespace-nowrap">
                                {{ data.name }}
                            </span>
                        </template>
                    </Column>
                    <Column field="manager" header="اسم صاحب العهدة">
                        <template #body="{ data }" v-auto-animate="$autoAnimate">
                            <span
                                class="pending w-3/4 h-4 rounded-full mx-auto"
                                v-if="pending"
                            ></span>
                            <span v-else class="flex-center whitespace-nowrap">
                                {{ data.manager }}
                            </span>
                        </template>
                    </Column>

                    <Column header="الاجراءات">
                        <template #body="{ data }">
                            <LazySharedActionsButtons
                                :pending
                                class="max-w-150 mx-auto"
                                :actions="['edit', 'delete']"
                                @edit="
                                    () => {
                                        useAlert({
                                            message: 'التعديل غير مفعل في وضع ال DEMO'
                                        })
                                        // navigateTo({
                                        //     name: 'dashboard-product-edit-id',
                                        //     params: { id: data._id }
                                        // })
                                    }
                                "
                                @delete="
                                    (id: string) =>
                                        useAlert({
                                            message: 'الحذف غير مفعل في وضع ال DEMO'
                                        })
                                "
                            />
                        </template>
                    </Column>
                </DataTable>
                <div
                    class="flex-center sm:flex-col-reverse sm:gap-2 mt-5 overflow-x-auto custom-scroll"
                >
                    <LazyAppSelect
                        v-model="query.limit"
                        size="small"
                        v-if="data?.count && data?.count > 5"
                        :options="
                            [
                                { label: '5 مخازن', value: '5' },
                                { label: '10 مخازن', value: '10' },
                                { label: '15 مخزن', value: '15' },
                                { label: '25 مخزن', value: '25' },
                                { label: '50 مخزن', value: '50' }
                            ].map((ele) => {
                                return { label: `${ele.label}`, value: ele.value }
                            })
                        "
                        class="ml-5 sm:w-nine sm:mx-auto"
                    />
                    <Transition name="fade">
                        <LazyAppPaginate
                            v-if="data && data?.pages > 1"
                            :currentPage="data?.page || 1"
                            :totalPages="data?.pages || 3"
                            :disabled="pending"
                            @changePage="(page: number) => (query.page = page.toString())"
                        />
                    </Transition>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { useRouteQuery } from '@vueuse/router'
    import type { paginateResultType, storeType } from '~/types'
    import { getSortValue } from '~/libs/query'
    const query = reactive({
        limit: useRouteQuery<string>('limit', '10'),
        page: useRouteQuery<string>('page', '1'),
        sort: useRouteQuery<string>('sortBy', ''),
        name: useRouteQuery<string | undefined>('name'),
        number: useRouteQuery<string | undefined>('number')
    })

    function restPage() {
        query.page = '1'
    }

    watch(
        () => query,
        (newVal, oldVal) => {
            if (newVal.page === oldVal.page) {
                restPage()
            }
        }
    )

    const StoresResponse = ref<storeType[]>([])

    const { data, status } = useAPI<paginateResultType<storeType>>('/api/store', {
        query,

        onResponse: ({ response }) => {
            const data = response._data.data

            StoresResponse.value = data
        }
    })

    const items = computed(() =>
        pending.value ? [...new Array(+query.limit).fill(null)] : data.value?.data
    )

    function restFilter() {
        query.name = undefined
        query.number = undefined
        query.limit = '10'
        restPage()
    }

    const pending = computed(() => status.value === 'pending')
</script>
