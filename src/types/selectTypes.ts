export interface FipeOption {
  codigo: string
  nome: string
}
export interface SelectFieldProps {
  name: string
  label: string
  options: FipeOption[]
  isLoading: boolean
  error: boolean
  disabled: boolean
}
