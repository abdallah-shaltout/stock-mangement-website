<template>
    <section>
        <div class="page-container">
            <h1 class="page-title">إدارة الدفاتر والصفحات</h1>
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
                            لا توجد أصناف لعرضها في الوقت الحالي
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
                                    v-model="query.book"
                                    fieldClass="dir-ltr"
                                    placeholder="رقم الدفتر"
                                />
                                <LazySharedFormAppInputIcon
                                    class="flex-1"
                                    size="small"
                                    inputClass="placeholder:text-right"
                                    icon="pi pi-search"
                                    :label="null"
                                    v-model="query.number"
                                    fieldClass="dir-ltr"
                                    placeholder="رقم الصفحة"
                                />
                                <LazySharedFormAppInputIcon
                                    class="flex-1"
                                    size="small"
                                    inputClass="placeholder:text-right"
                                    icon="pi pi-search"
                                    :label="null"
                                    v-model="query.code"
                                    fieldClass="dir-ltr"
                                    placeholder="رقم الصنف"
                                />
                                <LazySharedFormAppInputIcon
                                    class="flex-1"
                                    size="small"
                                    inputClass="placeholder:text-right"
                                    icon="pi pi-search"
                                    :label="null"
                                    v-model="query.name"
                                    placeholder="اسم الصنف"
                                />

                                <LazyAppSelect
                                    class="flex-1"
                                    v-model="query.unit"
                                    placeholder="الوحدة"
                                    :options="
                                        ['عدد', 'طقم', 'زوج', 'متر'].map((ele) => {
                                            return { label: `${ele}`, value: ele }
                                        })
                                    "
                                />
                                <LazySharedFormAppInputIcon
                                    size="small"
                                    inputClass="placeholder:text-right"
                                    icon="pi pi-search"
                                    :label="null"
                                    v-model="query.balance"
                                    fieldClass="dir-ltr"
                                    placeholder="الرصيد"
                                />
                                <LazyAppSelect
                                    v-model="query.store"
                                    placeholder="المخزن"
                                    :options="[
                                        {
                                            label: 'مخزن اللواري',
                                            value: '67695fae733ecdc921152d2e'
                                        }
                                    ]"
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

                    <Column field="book" header="رقم الدفتر">
                        <template #body="{ data }" v-auto-animate="$autoAnimate">
                            <span
                                class="pending w-3/4 h-4 rounded-full mx-auto"
                                v-if="pending"
                            ></span>
                            <span v-else class="flex-center whitespace-nowrap">
                                {{ data.book }}
                            </span>
                        </template>
                    </Column>
                    <Column field="number" header="رقم الصفحة">
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
                    <Column field="item.code" header="رقم الصنف">
                        <template #body="{ data }" v-auto-animate="$autoAnimate">
                            <span
                                class="pending w-3/4 h-4 rounded-full mx-auto"
                                v-if="pending"
                            ></span>
                            <span v-else class="flex-center whitespace-nowrap">
                                {{ data.item.code }}
                            </span>
                        </template>
                    </Column>
                    <Column field="item.name" header="أسم الصنف">
                        <template #body="{ data }" v-auto-animate="$autoAnimate">
                            <span
                                class="pending w-3/4 h-4 rounded-full mx-auto"
                                v-if="pending"
                            ></span>
                            <span v-else class="whitespace-nowrap">
                                {{
                                    sliceString({
                                        str: data.item.name,
                                        max: 60
                                    })
                                }}
                            </span>
                        </template>
                    </Column>
                    <Column field="item.unit" header="الوحدة">
                        <template #body="{ data }" v-auto-animate="$autoAnimate">
                            <span
                                class="pending w-3/4 h-4 rounded-full mx-auto"
                                v-if="pending"
                            ></span>
                            <span v-else class="flex-center whitespace-nowrap">
                                {{ data.item.unit }}
                            </span>
                        </template>
                    </Column>
                    <Column field="balance" header="الرصيد">
                        <template #body="{ data }" v-auto-animate="$autoAnimate">
                            <span
                                class="pending w-3/4 h-4 rounded-full mx-auto"
                                v-if="pending"
                            ></span>
                            <span v-else class="flex-center whitespace-nowrap">
                                {{ data.balance }}
                            </span>
                        </template>
                    </Column>
                    <Column field="item.price" header="السعر">
                        <template #body="{ data }" v-auto-animate="$autoAnimate">
                            <span
                                class="pending w-3/4 h-4 rounded-full mx-auto"
                                v-if="pending"
                            ></span>
                            <span v-else class="flex-center whitespace-nowrap">
                                {{ formatCurrency(data.item.price) }} جنية
                            </span>
                        </template>
                    </Column>
                    <Column field="store.name" header="المخزن">
                        <template #body="{ data }" v-auto-animate="$autoAnimate">
                            <span
                                class="pending w-3/4 h-4 rounded-full mx-auto"
                                v-if="pending"
                            ></span>
                            <span v-else class="flex-center whitespace-nowrap">
                                {{ data.store.name }}
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
                        :options="
                            [
                                { label: '5 أصناف', value: '5' },
                                { label: '10 أصناف', value: '10' },
                                { label: '15 صنف', value: '15' },
                                { label: '25 صنف', value: '25' },
                                { label: '50 صنف', value: '50' }
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
    import type { paginateResultType, ItemType } from '~/types'
    import { getSortValue } from '~/libs/query'
    import { formatCurrency, sliceString } from '~/libs'
    const query = reactive({
        limit: useRouteQuery<string>('limit', '10'),
        page: useRouteQuery<string>('page', '1'),
        sort: useRouteQuery<string>('sortBy', ''),
        code: useRouteQuery<string | undefined>('code'),
        name: useRouteQuery<string | undefined>('name'),
        unit: useRouteQuery<string | undefined>('unit'),
        balance: useRouteQuery<string | undefined>('balance'),
        store: useRouteQuery<string | undefined>('store'),
        book: useRouteQuery<string | undefined>('book'),
        number: useRouteQuery<string | undefined>('number'),
        populate: JSON.stringify([
            { path: 'item', select: 'code name price unit' },
            { path: 'store', select: 'name' }
        ])
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

    const ItemsResponse = ref<ItemType[]>([])

    const { data, status } = useAPI<paginateResultType<ItemType>>('/api/page', {
        query,

        onResponse: ({ response }) => {
            const data = response._data.data

            ItemsResponse.value = data
        }
    })

    const items = computed(() =>
        pending.value ? [...new Array(+query.limit).fill(null)] : data.value?.data
    )

    function restFilter() {
        query.code = undefined
        query.name = undefined
        query.unit = undefined
        query.limit = '10'
        restPage()
    }

    const pending = computed(() => status.value === 'pending')
</script>
