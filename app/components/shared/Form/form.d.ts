export interface InputProps {
    label: string | null
    placeholder: string
    error: string | undefined
    inputId: string
    disabled: boolean
}

export interface inputUrlProps extends InputProps {
    route: string
}

export interface inputPasswordProps extends InputProps {
    icon: string
    size: 'small' | 'large'
    inputClass: string
}
export interface inputNumberProps extends InputProps {
    prefix: string
    suffix: string
    min: number
    max: number
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

export interface Props1 {
    label: string | null
    placeholder: string
    error: string | undefined
    inputId: string
}
export type Props = Partial<Props1>
