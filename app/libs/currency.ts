function formatCurrency(amount: number) {
    try {
        if (!amount) return 0
        return `${new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EGP',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount)}`
            .replace('EGP', '')
            .replace('.00', '')
            .trimStart()
    } catch (error) {
        return 0
    }
}

export { formatCurrency }
