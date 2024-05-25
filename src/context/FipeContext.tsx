'use client'

import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

interface FipeContextType {
  brands: { codigo: string; nome: string }[] | undefined
  models: { codigo: string; nome: string }[] | undefined
  years: { codigo: string; nome: string }[] | undefined
  selectedBrand: string | null
  selectedModel: string | null
  setSelectedBrand: (brand: string) => void
  setSelectedModel: (model: string) => void
  fetchPrice: (brand: string, model: string, year: string) => Promise<string | null>
  isLoadingBrands: boolean
  priceError: string | null
  price: string | null
}

const FipeContext = createContext<FipeContextType | undefined>(undefined)

export default function FipeProvider({ children }: { children: ReactNode }) {
  const [selectedBrand, setSelectedBrandState] = useState<string | null>(null)
  const [selectedModel, setSelectedModelState] = useState<string | null>(null)
  const [price, setPrice] = useState<string | null>(null)
  const [priceError, setPriceError] = useState<string | null>(null)
  const {
    data: brands,
    error: brandsError,
    isLoading: isLoadingBrands,
  } = useSWR('/api/brands', fetcher, {
    revalidateOnFocus: false,
    fallbackData: [],
    dedupingInterval: 3600000, // 1h
  })

  const { data: models, error: modelsError } = useSWR(
    selectedBrand ? `/api/models?brand=${selectedBrand}` : null,
    fetcher,
  )

  const { data: years, error: yearsError } = useSWR(
    selectedModel ? `/api/years?brand=${selectedBrand}&model=${selectedModel}` : null,
    fetcher,
  )
  const setSelectedBrand = useCallback((brand: string) => {
    setSelectedBrandState(brand)
    setSelectedModelState(null)
    setPrice(null)
    setPriceError(null)
  }, [])

  const setSelectedModel = useCallback((model: string) => {
    setSelectedModelState(model)
    setPrice(null)
    setPriceError(null)
  }, [])
  const fetchPrice = useCallback(async (brand: string, model: string, year: string) => {
    setPriceError(null)
    try {
      const response = await fetch(`/api/price?brand=${brand}&model=${model}&year=${year}`)
      const result = await response.json()
      if (response.ok) {
        setPrice(result.Valor)
        return result.Valor
      } else {
        setPriceError(result.error)
        return null
      }
    } catch (error) {
      setPriceError('Failed to fetch price')
      return null
    }
  }, [])

  if (brandsError || modelsError || yearsError) {
    console.error('Failed to fetch data:', brandsError || modelsError || yearsError)
  }

  return (
    <FipeContext.Provider
      value={{
        fetchPrice,
        price,
        priceError,
        isLoadingBrands,
        brands,
        models,
        years,
        selectedBrand,
        selectedModel,
        setSelectedBrand,
        setSelectedModel,
      }}
    >
      {children}
    </FipeContext.Provider>
  )
}

export const useFipe = () => {
  const context = useContext(FipeContext)
  if (!context) {
    throw new Error('useFipe must be used within a FipeProvider')
  }
  return context
}
