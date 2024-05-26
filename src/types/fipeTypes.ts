export interface Brand {
  codigo: string
  nome: string
}

export interface Model {
  codigo: string
  nome: string
}

export interface Year {
  codigo: string
  nome: string
}

export interface FipeContextType {
  brands: Brand[] | undefined
  models: Model[] | undefined
  years: Year[] | undefined
  selectedBrand: Brand | null
  selectedModel: Model | null
  setSelectedBrand: (brand: Brand | null) => void
  setSelectedModel: (model: Model | null) => void
  fetchPrice: (brand: string, model: string, year: string) => Promise<string | null>
  isLoadingBrands: boolean
  isLoadingModels: boolean
  isLoadingYears: boolean
  isLoadingPrice: boolean
  priceError: string | null
  price: string | null
}
