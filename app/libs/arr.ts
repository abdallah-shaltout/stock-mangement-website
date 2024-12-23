function getDifferent({
    oldData,
    newData
}: {
    oldData: Record<string, any>
    newData: Record<string, any>
}) {
    if (!oldData || !newData || oldData === newData) return {}

    return Object.keys(oldData).reduce((result: Record<string, any>, key) => {
        const oldValue = oldData[key]
        const newValue = newData[key]

        const areObjects =
            typeof oldValue === 'object' &&
            oldValue !== null &&
            typeof newValue === 'object' &&
            newValue !== null

        if (areObjects) {
            if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
                result[key] = newValue
            }
        } else if (oldValue !== newValue) {
            result[key] = newValue
        }

        return result
    }, {})
}

export { getDifferent }
