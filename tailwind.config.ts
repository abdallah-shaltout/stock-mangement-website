import colors from 'tailwindcss/colors'
import type { Config } from 'tailwindcss'
import type { PluginAPI } from 'tailwindcss/types/config'

function generateSizes(options: {
    from: number
    to: number
    step: number
    keyStart?: string
    keyEnd?: string
    valueStart?: string
    valueEnd?: string
}) {
    const { from, to, step, keyStart = '', keyEnd = '', valueStart = '', valueEnd = '' } = options
    const res: Record<string, string> = {}
    for (let i = from; i <= to; i += step) {
        res[`${keyStart}${i}${keyEnd}`] = `${valueStart}${i}${valueEnd}`
    }
    return res
}

const minMaxSizes = generateSizes({
    from: 100,
    to: 800,
    step: 50,
    valueEnd: 'px'
})

export default {
    content: [
        './app/components/**/*.{js,vue,ts}',
        './app/layouts/**/*.vue',
        './app/pages/**/*.vue',
        './app/plugins/**/*.{js,ts}',
        './app/app.vue',
        './app/error.vue'
    ],
    safelist: [
        {
            pattern: /col-span-[1-2]/ // لمطابقة col-span-1 و col-span-2
        },
        {
            pattern: /grid-cols-[1-9]|grid-cols-1[0-2]/ // لمطابقة grid-cols-1 إلى grid-cols-12
        },

        'app-card',
        'bg-red-500',
        'bg-green-500'
    ],
    darkMode: 'class',
    theme: {
        fontFamily: {
            tajawal: ['Tajawal', 'sans-serif'],
            roboto: ['Roboto', 'sans-serif']
        },
        container: {
            center: true
        },
        screens: {
            xxl: { max: '1600px' },

            xl: { max: '1400px' },

            lg: { max: '1200px' },

            md: { max: '992px' },

            sm: { max: '768px' },

            xs: { max: '577px' }
        },
        flex: {
            ...generateSizes({
                from: 0,
                to: 12,
                step: 1
            })
        },
        extend: {
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
                '6xl': '3rem'
            },
            zIndex: {
                ...generateSizes({
                    from: 1,
                    to: 5,
                    step: 1
                }),
                ...generateSizes({
                    from: 100,
                    to: 1000,
                    step: 100
                })
            },
            aspectRatio: {
                desktopBanner: '4/1',
                tabletBanner: '2.5/1'
            },
            minWidth: {
                ...minMaxSizes
            },

            minHeight: {
                ...minMaxSizes
            },
            maxWidth: {
                '8xl': '1440px',
                ...minMaxSizes,
                nine: '90%'
            },
            maxHeight: {
                ...minMaxSizes
            },
            width: {
                nine: '90%',
                ...minMaxSizes,
                '50w': '50vw',
                '75w': '75vw'
            },
            height: {
                nine: '90%',
                'screen-svh': '100svh',
                ...minMaxSizes
            },
            colors: {
                // primary: "#003285",
                // secondary: "#d0572e",
                dark: colors.gray[600],
                'dark-50': colors.gray[400],
                light: colors.slate[100],
                'light-50': colors.slate[200],

                'primary-text': colors.gray[700],
                'secondary-text': colors.gray[400],
                'hash-text': colors.gray[300],

                // PrimeVue Colors

                primary: 'rgb(var(--primary-500))',
                'primary-50': 'rgb(var(--primary-50))',
                ...generateSizes({
                    from: 100,
                    to: 900,
                    step: 100,
                    keyStart: 'primary-',
                    valueStart: 'rgb(var(--primary-',
                    valueEnd: '))'
                }),
                'primary-950': 'rgb(var(--primary-950))'
            }
        }
    },
    plugins: [
        function ({ addUtilities }: PluginAPI) {
            const newUtilities = {
                '.dir-rtl': {
                    direction: 'rtl !important'
                },
                '.dir-ltr': {
                    direction: 'ltr !important'
                }
            }
            addUtilities(newUtilities, {
                respectImportant: true
            })
        }
    ]
} satisfies Config
