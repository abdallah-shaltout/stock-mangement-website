export default defineNuxtConfig({
    devtools: { enabled: false },

    future: {
        compatibilityVersion: 4
    },

    devServer: {
        port: 5173
    },

    vite: {
        server: {
            hmr: {
                overlay: false
            }
        }
    },

    runtimeConfig: {
        public: {
            apiBase: process.env.SERVER_BASE_URL,
            cryptoKey: process.env.CRYPTO_KEY,
            cryptoHMAC: process.env.CRYPTO_HMAC,
            storeUrl: process.env.STORE_URL,
            motion: {
                directives: {
                    'pop-bottom': {
                        initial: {
                            scale: 0,
                            opacity: 0,
                            y: 100
                        },
                        visibleOnce: {
                            scale: 1,
                            opacity: 1,
                            y: 0
                        }
                    }
                }
            }
        }
    },

    router: {
        options: {
            scrollBehaviorType: 'smooth'
        }
    },

    debug: false,
    pages: true,

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },

    css: ['~/assets/css/master.css'],
    ssr: false,
    spaLoadingTemplate: true,

    app: {
        pageTransition: { name: 'layout-animation', mode: 'out-in' },
        layoutTransition: { name: 'layout-animation', mode: 'out-in' },
        head: {
            title: 'Abdallah Shaltout - Full Stack Developer',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1.0',
            htmlAttrs: {
                lang: 'ar',
                dir: 'rtl'
            },
            link: [
                {
                    rel: 'icon',
                    type: 'image/svg+xml',
                    href: '/fav.svg'
                }
            ],
            meta: [
                {
                    name: 'description',
                    content:
                        "Hello, I'm Abdullah Shaltout a Full Stack Developer passionate about creating beautiful and user-friendly websites. I understand both front-end and back-end development and am excited to bring my skills to a professional setting. As a quick learner and a team player, I'm confident in being a valuable asset to any web development team."
                }
            ]
        }
    },

    primevue: {
        usePrimeVue: true,
        options: {
            ripple: true
        },
        importTheme: { from: '@/themes/primevue-theme.ts' }
    },

    pinia: {
        storesDirs: ['./app/store/**']
    },

    modules: [
        '@formkit/auto-animate/nuxt',
        '@nuxt/image',
        '@primevue/nuxt-module',
        '@pinia/nuxt',
        'nuxt-icons',
        '@vueuse/nuxt',
        '@vueuse/motion/nuxt'
    ],

    plugins: ['~/plugins/autoAnimateSettings', '~/plugins/api'],
    compatibilityDate: '2024-09-21'
})
