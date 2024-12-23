<template>
    <p class="form-error-msg" v-if="error && error !== 'Required' && type === 'message'">
        {{ error }}
    </p>
</template>

<script lang="ts" setup>
    const { error, type = 'message' } = defineProps<{
        error: string | undefined
        type?: 'message' | 'toast'
    }>()

    watch(
        () => error,
        () => {
            if (type === 'toast' && error) {
                useAlert({
                    type: 'error',
                    message: error,
                    closeButton: true,
                    position: 'top-center'
                })
            }
        }
    )
</script>
