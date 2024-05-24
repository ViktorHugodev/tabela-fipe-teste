// context/FipeContext.tsx
'use client'

import React, { createContext, ReactNode, useContext, useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

interface FipeContextType {
  brands: { codigo: string; nome: string }[] | undefined
  models: { codigo: string; nome: string }[] | undefined
  fetchModels: (brand: string) => void
}

const FipeContext = createContext<FipeContextType | undefined>(undefined)

export default function FipeProvider({ children }: { children: ReactNode }) {
  const { data: brands } = useSWR('/api/brands', fetcher, {
    revalidateOnFocus: false,
  })
  console.log('🚀 ~ FipeProvider ~ brands:', brands)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const { data: models } = useSWR(
    selectedBrand ? `/api/models?brand=${selectedBrand}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  )

  const fetchModels = (brand: string) => {
    setSelectedBrand(brand)
  }

  return (
    <FipeContext.Provider value={{ brands, models, fetchModels }}>{children}</FipeContext.Provider>
  )
}

export const useFipe = () => {
  const context = useContext(FipeContext)
  if (!context) {
    throw new Error('needs a provider')
  }
  return context
}
