import { SignedIn } from '~/libs'
export default defineNuxtRouteMiddleware(async (to) => {
    try {
        if (import.meta.server) return

        const url = new URL(window.location.href)
        if (url.hostname === '192.168.1.2') return
        const user = await SignedIn()

        if (to.meta.notRequiredAuth) {
            return user ? navigateTo({ name: 'index' }) : undefined
        } else {
            return user ? undefined : navigateTo({ name: 'auth-signin' })
        }
    } catch (error) {
        console.error('RequiredAuth error middleware', error)
    }
})
