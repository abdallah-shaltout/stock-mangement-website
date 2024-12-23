import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const AuraPressets = definePreset(Aura, {
    semantic: {
        primary: {
            50: 'rgb(var(--primary-50))',
            100: 'rgb(var(--primary-100))',
            200: 'rgb(var(--primary-200))',
            300: 'rgb(var(--primary-300))',
            400: 'rgb(var(--primary-400))',
            500: 'rgb(var(--primary-500))',
            600: 'rgb(var(--primary-600))',
            700: 'rgb(var(--primary-700))',
            800: 'rgb(var(--primary-800))',
            900: 'rgb(var(--primary-900))',
            950: 'rgb(var(--primary-950))'
        }
    }
})

export default {
    preset: AuraPressets,
    options: {
        darkModeSelector: '.p-dark'
    }
}
