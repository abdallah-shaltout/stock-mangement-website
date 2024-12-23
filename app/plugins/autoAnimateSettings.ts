const autoAnimateSettings = {
    disrespectUserMotionPreference: true,
    easing: 'ease-in-out',
    duration: 300
} as const
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.globalProperties.$autoAnimate = autoAnimateSettings
})
