<template>
    <section>
        <div class="page-container">
            <h1 class="page-title">الإعدادات</h1>
            <div class="page-content">
                <Button
                    label="مسح ال Cache"
                    icon="pi pi-trash"
                    severity="secondary"
                    @click="
                        () => {
                            deleteApiData({
                                path: '/clearCache'
                            }).then((res) => {
                                useAlert({
                                    message: res.message,
                                    type: 'success'
                                })
                            })
                        }
                    "
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { deleteApiData } from '~/libs'
</script>
