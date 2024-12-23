<template>
    <section>
        <div class="page-container">
            <h1 class="page-title">حسابي</h1>
            <div class="fl-5">
                <div v-motion-pop-bottom>
                    <Transition name="fade" mode="out-in">
                        <LazySkeletonProfileInfoSkeleton v-if="pending" />
                        <LazyPagesProfileInfoSection v-else />
                    </Transition>
                </div>
                <div v-motion-pop-bottom>
                    <Transition name="fade" mode="out-in">
                        <LazySkeletonProfileSecuritySkeleton v-if="pending" />
                        <LazyPagesProfileSecuritySection v-else />
                    </Transition>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import type { UserType } from '~/types'

    const { status } = useAPI<UserType>('/api/auth/me', {
        onResponse: ({ response }) => {
            const data = response._data
            const AuthStore = useAuthStore()
            AuthStore.setUser(data)
        }
    })

    const pending = computed(() => status.value === 'pending')
</script>
