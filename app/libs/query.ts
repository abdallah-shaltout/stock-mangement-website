export function getSortValue(sortField: string, value: number): string {
    return sortField ? `${value < 0 ? '-' : ''}${sortField}` : ''
}
