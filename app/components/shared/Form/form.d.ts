export interface InputProps {
    label: string | null
    placeholder: string
    error: string | undefined
    inputId: string
    size: 'small' | 'large'
    disabled: boolean
    inputClass: string
}

export interface inputUrlProps extends InputProps {
    route: string
}

export interface inputPasswordProps extends InputProps {
    icon: string
    inputClass: string
}
export interface inputNumberProps extends InputProps {
    prefix: string
    suffix: string
    min: number
    max: number
    useGrouping: boolean
}
export interface inputIconProps extends inputPasswordProps {
    type: 'text' | 'password'
    fieldClass: string
    iconPos: 'left' | 'right'
}
export interface inputDateProps extends Omit<InputProps, 'placeholder'> {}

export interface inputCheckSlugProps extends inputUrlProps {
    initValue: string
    minLength: number
}
