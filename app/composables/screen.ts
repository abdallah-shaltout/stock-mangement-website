export const useScreen = () => {
    const breakpoints = useBreakpoints({
        mobile: 0,
        tablet: 768,
        laptop: 992,
        desktop: 1200
    })
    const { active } = breakpoints

    return {
        isMobile: computed(() => active().value === 'mobile'),
        isTablet: computed(() => active().value === 'tablet'),
        isDesktop: computed(() => active().value === 'desktop'),
        breakpoints,
        active
    }
}
