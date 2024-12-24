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
                    dataKey="_id"
                    filterDisplay="row"
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
                        <div class="flex-between sm:flex-col gap-2">
                            <Button
                                label="تصدير البيانات"
                                icon="pi pi-download"
                                size="small"
                                class="sm:w-full sm:hidden"
                                severity="contrast"
                                @click="
                                    () => {
                                        useAlert({
                                            message: 'تم تصدير البيانات بنجاح',
                                            type: 'success'
                                        })
                                    }
                                "
                            />
                            <Button
                                label="إعادة التصفية"
                                icon="pi pi-times"
                                size="small"
                                class="sm:w-full"
                                severity="secondary"
                                @click="restFilter"
                            />
                        </div>
                    </template>

                    <Column field="book" header="رقم الدفتر" :showFilterMenu="false" sortable>
                        <template #body="{ data }" v-auto-animate="$autoAnimate">
                            <span
                                class="pending w-3/4 h-4 rounded-full mx-auto"
                                v-if="pending"
                            ></span>
                            <span v-else class="flex-center whitespace-nowrap">
                                {{ data.book }}
                            </span>
                        </template>

                        <template #filter>
                            <LazySharedFormAppInput
                                v-model="query.book"
                                v-bind="{
                                    label: null,
                                    useGrouping: false,
                                    inputClass: 'w-100 sm:w-50 mx-auto dir-ltr text-center',
                                    size: 'small'
                                }"
                            />
                        </template>
                    </Column>
                    <Column field="number" header="رقم الصفحة" :showFilterMenu="false" sortable>
                        <template #body="{ data }" v-auto-animate="$autoAnimate">
                            <span
                                class="pending w-3/4 h-4 rounded-full mx-auto"
                                v-if="pending"
                            ></span>
                            <span v-else class="flex-center whitespace-nowrap">
                                {{ data.number }}
                            </span>
                        </template>
                        <template #filter>
                            <LazySharedFormAppInput
                                v-model="query.number"
                                v-bind="{
                                    label: null,
                                    useGrouping: false,
                                    inputClass: 'w-100 sm:w-50 mx-auto dir-ltr text-center',
                                    size: 'small'
                                }"
                            />
                        </template>
                    </Column>
                    <Column field="item.code" header="رقم الصنف" :showFilterMenu="false" sortable>
                        <template #body="{ data }" v-auto-animate="$autoAnimate">
                            <span
                                class="pending w-3/4 h-4 rounded-full mx-auto"
                                v-if="pending"
                            ></span>
                            <span v-else class="flex-center whitespace-nowrap">
                                {{ data.item.code }}
                            </span>
                        </template>
                        <template #filter>
                            <LazySharedFormAppInput
                                v-model="query.code"
                                v-bind="{
                                    label: null,
                                    inputClass: 'w-150 sm:w-100 mx-auto dir-ltr ',
                                    size: 'small'
                                }"
                            />
                        </template>
                    </Column>
                    <Column field="item.name" header="أسم الصنف" :showFilterMenu="false">
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
                        <template #filter>
                            <LazySharedFormAppInput
                                v-model="query.name"
                                v-bind="{
                                    label: null,
                                    useGrouping: false,
                                    inputClass: 'w-full dir-rtl ',
                                    size: 'small'
                                }"
                            />
                        </template>
                    </Column>
                    <Column field="item.unit" header="الوحدة" :showFilterMenu="false">
                        <template #body="{ data }" v-auto-animate="$autoAnimate">
                            <span
                                class="pending w-3/4 h-4 rounded-full mx-auto"
                                v-if="pending"
                            ></span>
                            <span v-else class="flex-center whitespace-nowrap">
                                {{ data.item.unit }}
                            </span>
                        </template>
                        <template #filter>
                            <Select
                                v-model="query.unit"
                                class="mx-auto w-full"
                                v-bind="{
                                    optionLabel: 'label',
                                    optionValue: 'value',
                                    placeholder: 'الوحدة',
                                    size: 'small',

                                    options: ['عدد', 'طقم', 'زوج', 'متر'].map((ele) => {
                                        return { label: `${ele}`, value: ele }
                                    })
                                }"
                            />
                        </template>
                    </Column>
                    <Column field="balance" header="الرصيد" :showFilterMenu="false">
                        <template #body="{ data }" v-auto-animate="$autoAnimate">
                            <span
                                class="pending w-3/4 h-4 rounded-full mx-auto"
                                v-if="pending"
                            ></span>
                            <span v-else class="flex-center whitespace-nowrap">
                                {{ data.balance }}
                            </span>
                        </template>
                        <template #filter>
                            <LazySharedFormAppInput
                                v-model="query.balance"
                                v-bind="{
                                    label: null,
                                    useGrouping: false,
                                    inputClass: 'w-100 sm:w-50 mx-auto dir-ltr text-center',
                                    size: 'small'
                                }"
                            />
                        </template>
                    </Column>
                    <!-- <Column field="item.price" header="السعر" :showFilterMenu="false">
                        <template #body="{ data }" v-auto-animate="$autoAnimate">
                            <span
                                class="pending w-3/4 h-4 rounded-full mx-auto"
                                v-if="pending"
                            ></span>
                            <span v-else class="flex-center whitespace-nowrap">
                                {{ formatCurrency(data.item.price) }} جنية
                            </span>
                        </template>
                    </Column> -->
                    <Column field="store.name" header="المخزن" :showFilterMenu="false">
                        <template #body="{ data }" v-auto-animate="$autoAnimate">
                            <span
                                class="pending w-3/4 h-4 rounded-full mx-auto"
                                v-if="pending"
                            ></span>
                            <span v-else class="flex-center whitespace-nowrap">
                                {{ data.store.name }}
                            </span>
                        </template>
                        <template #filter>
                            <Select
                                v-model="query.store"
                                class="mx-auto w-full"
                                v-bind="{
                                    optionLabel: 'label',
                                    optionValue: 'value',
                                    placeholder: 'المخزن',
                                    size: 'small',

                                    options: [
                                        {
                                            label: 'اللواري',
                                            value: '67695fae733ecdc921152d2e'
                                        }
                                    ]
                                }"
                            />
                        </template>
                    </Column>

                    <Column header="الاجراءات">
                        <template #body="{ data }">
                            <LazySharedActionsButtons
                                :pending
                                class="max-w-150 sm:w-100 mx-auto"
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
                    <Select
                        v-model="query.limit"
                        size="small"
                        class="ml-5 sm:mx-auto sm:w-nine"
                        optionLabel="label"
                        optionValue="value"
                        :options="
                            [5, 10, 15, 25, 40, 50].map((ele) => {
                                return { label: `${ele} ${ele > 11 ? 'صنف' : 'أصناف'} في الصفحة`, value: ele?.toString() }
                            })
                        "
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
    import { sliceString } from '~/libs'
    const query = reactive({
        limit: useRouteQuery<string>('limit', '10'),
        page: useRouteQuery<string>('page', '1'),
        sort: useRouteQuery<string>('sortBy', ''),
        code: useRouteQuery<string | undefined>('code', ''),
        name: useRouteQuery<string | undefined>('name', ''),
        unit: useRouteQuery<string | undefined>('unit', ''),
        balance: useRouteQuery<string | undefined>('balance', ''),
        store: useRouteQuery<string | undefined>('store', ''),
        book: useRouteQuery<string | undefined>('book', ''),
        number: useRouteQuery<string | undefined>('pageNumber', ''),
        populate: JSON.stringify([
            { path: 'item', select: 'code name unit' },
            { path: 'store', select: 'name' }
        ])
    })

    function restPage() {
        query.page = '1'
    }

    // watch(query, (newVal, oldVal) => {
    //     if (newVal.page === oldVal.page) {
    //         restPage()
    //     }
    // })

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
        query.code = ''
        query.name = ''
        query.unit = ''
        query.store = ''
        query.book = ''
        query.number = ''
        query.balance = ''
        query.limit = '10'
        query.sort = ''
        restPage()
        useAlert({ message: 'تم اعادة التصفية بنجاح', type: 'success' })
    }

    const pending = computed(() => status.value === 'pending')
</script>
