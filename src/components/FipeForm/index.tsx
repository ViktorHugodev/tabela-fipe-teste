'use client'

import React, { useEffect, Suspense } from 'react'

import { FormProvider, useForm } from 'react-hook-form'
import { Button, Container, Typography, Box, CircularProgress } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFipe } from '@/context/FipeContext'

import SelectField from '../SelectFields'
import { schema } from './schema'
import { FormData } from './types'
import FipePrice from '../FipePrice'

export default function FipeForm() {
  const {
    brands,
    models,
    years,
    selectedBrand,
    selectedModel,
    setSelectedBrand,
    setSelectedModel,
    fetchPrice,
    isLoadingBrands,
    isLoadingModels,
    isLoadingYears,
    priceError,
    price,
  } = useFipe()

  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const { handleSubmit, setValue, watch } = methods

  const watchBrand = watch('brand')
  const watchModel = watch('model')
  const selectedYear = watch('year')

  useEffect(() => {
    if (watchBrand !== selectedBrand?.codigo) {
      const brand = brands?.find(b => b.codigo === watchBrand)
      if (brand) {
        setSelectedBrand(brand)
      }
      setSelectedModel(null)
      setValue('model', '')
      setValue('year', '')
    }
  }, [watchBrand, setSelectedBrand, setSelectedModel, setValue, selectedBrand?.codigo, brands])

  useEffect(() => {
    if (watchModel !== selectedModel?.codigo) {
      const model = models?.find(m => m.codigo === watchModel)
      if (model) {
        setSelectedModel(model)
      }
      setValue('year', '')
    }
  }, [watchModel, setSelectedModel, setValue, selectedModel?.codigo, models])

  const onSubmit = async (data: FormData) => {
    await fetchPrice(data.brand, data.model, data.year)
  }

  return (
    <Box display='flex-col' alignItems='center' justifyContent='center' minHeight='100vh'>
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='70vh'>
        <Container maxWidth='sm'>
          <Typography variant='h2' component='h1' gutterBottom textAlign='center'>
            Tabela Fipe
          </Typography>
          <Typography variant='subtitle1' component='p' gutterBottom textAlign='center'>
            Consulte o valor de um veículo de forma gratuita
          </Typography>

          <Box
            sx={{
              backgroundColor: '#fff',
              padding: 4,
              borderRadius: 2,
            }}
          >
            <Suspense fallback={<CircularProgress />}>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <SelectField
                    name='brand'
                    label='Marca'
                    options={brands || []}
                    isLoading={isLoadingBrands}
                    error={!!priceError}
                    disabled={false}
                  />

                  <SelectField
                    name='model'
                    label='Modelo'
                    options={models || []}
                    isLoading={isLoadingModels}
                    error={!!priceError}
                    disabled={!selectedBrand}
                  />
                  {selectedBrand && selectedModel && (
                    <SelectField
                      name='year'
                      label='Ano'
                      options={years || []}
                      isLoading={isLoadingYears}
                      error={!!priceError}
                      disabled={!selectedModel}
                    />
                  )}

                  <Box display='flex' justifyContent='center'>
                    <Button
                      sx={{ textTransform: 'none' }}
                      type='submit'
                      variant='contained'
                      color='primary'
                      disabled={!selectedYear}
                    >
                      Consultar preço
                    </Button>
                  </Box>
                </form>
              </FormProvider>
            </Suspense>
          </Box>
        </Container>
      </Box>
      {price && (
        <FipePrice
          brandName={selectedBrand?.nome || ''}
          modelName={selectedModel?.nome || ''}
          year={watch('year')}
          price={price}
        />
      )}
    </Box>
  )
}
