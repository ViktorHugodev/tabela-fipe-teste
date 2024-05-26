'use client'

import React, { useEffect } from 'react'

import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material'
import { useFipe } from '@/context/FipeContext'
import SelectField from '../SelectFields'
interface FormData {
  brand: string
  model: string
  year: string
}

const schema = yup.object().shape({
  brand: yup.string().required('Marca é obrigatória'),
  model: yup.string().required('Modelo é obrigatório'),
  year: yup.string().required('Ano é obrigatório'),
})

const FipeForm = () => {
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
    isLoadingPrice,
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

                <Box display='flex' justifyContent='center' mt={2}>
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
          </Box>
        </Container>
      </Box>
      {price && (
        <Box
          minHeight='30vh'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          sx={{
            gap: 2,
            backgroundColor: '#DCF5F2',
          }}
        >
          <Typography variant='subtitle1' component='p' gutterBottom>
            Tabela Fipe: Preço {selectedBrand?.nome} {selectedModel?.nome} {watch('year')}
          </Typography>
          <Typography
            variant='h4'
            component='p'
            style={{
              color: 'white',
              backgroundColor: '#00a699',
              borderRadius: '20px',
              padding: '10px 20px',
            }}
          >
            {price}
          </Typography>
          <Typography variant='body2' component='p' gutterBottom>
            Este é o preço de compra do veículo
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default FipeForm
