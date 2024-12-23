function getDate(date: string | Date = new Date()) {
    const d = new Date(date)
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate()}`
}

export type TimeUnits = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'
type TimeResultTarget = 'milliseconds' | 'seconds'
type GetTimeTarget = 'before' | 'after'
const timeUnitMultipliers: Record<TimeUnits, number> = {
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000
}

export type convertTimeUnitsType = {
    value: number
    unit: TimeUnits
    target?: TimeResultTarget
}
function convertTimeUnits({ value, unit, target = 'milliseconds' }: convertTimeUnitsType): number {
    const res = value * timeUnitMultipliers[unit]
    return target === 'milliseconds' ? res : res / 1000
}

function getTime({
    value,
    unit,
    target = 'after',
    startOfDay = false
}: {
    value: number
    unit: TimeUnits
    target?: GetTimeTarget
    startOfDay?: boolean
}) {
    const timeOffset = convertTimeUnits({ value, unit })
    const date = new Date(Date.now() + (target === 'before' ? -timeOffset : timeOffset))
    if (startOfDay) date.setHours(0, 0, 0, 0)
    return date
}

export { getDate, convertTimeUnits, getTime }
