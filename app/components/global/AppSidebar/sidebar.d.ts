interface link {
    label: string
    icon: string
    route?: {
        name: string
        params?: any
        query?: any
        hash?: string
    }
    items?: link[]
}

interface sidebarItemType {
    title?: string
    items?: link[]
}

export type { link, sidebarItemType }
