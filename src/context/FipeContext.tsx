'use client'

import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { Brand, FipeContextType, Model, Year } from '@/types/fipeTypes'

const FipeContext = createContext<FipeContextType | undefined>(undefined)

export default function FipeProvider({ children }: { children: ReactNode }) {
  const [selectedBrand, setSelectedBrandState] = useState<Brand | null>(null)
  const [selectedModel, setSelectedModelState] = useState<Model | null>(null)
  const [price, setPrice] = useState<string | null>(null)
  const [priceError, setPriceError] = useState<string | null>(null)
  const [isLoadingPrice, setIsLoadingPrice] = useState(false)

  const {
    data: brands,
    error: brandsError,
    isLoading: isLoadingBrands,
  } = useSWR('/api/brands', fetcher, {
    revalidateOnFocus: false,
    fallbackData: [],
    dedupingInterval: 3600000, // 1h
    suspense: true,
  })

  const {
    data: models,
    error: modelsError,
    isLoading: isLoadingModels,
  } = useSWR(selectedBrand ? `/api/models?brand=${selectedBrand.codigo}` : null, fetcher)

  const {
    data: years,
    error: yearsError,
    isLoading: isLoadingYears,
  } = useSWR(
    selectedModel
      ? `/api/years?brand=${selectedBrand?.codigo}&model=${selectedModel.codigo}`
      : null,
    fetcher,
  )
  const setSelectedBrand = useCallback((brand: Brand | null) => {
    setSelectedBrandState(brand)
    setSelectedModelState(null)
    setPrice(null)
    setPriceError(null)
  }, [])

  const setSelectedModel = useCallback((model: Model | null) => {
    setSelectedModelState(model)
    setPrice(null)
    setPriceError(null)
  }, [])

  const fetchPrice = useCallback(async (brand: string, model: string, year: string) => {
    setIsLoadingPrice(true)
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
    } finally {
      setIsLoadingPrice(false)
    }
  }, [])

  if (brandsError || modelsError || yearsError) {
    console.error('Failed to fetch data:', brandsError || modelsError || yearsError)
  }

  return (
    <FipeContext.Provider
      value={{
        isLoadingModels,
        isLoadingPrice,
        isLoadingYears,
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
