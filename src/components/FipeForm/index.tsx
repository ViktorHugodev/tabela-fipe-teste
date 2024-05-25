'use client'

import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
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

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  console.log(getValues('year'))
  const watchBrand = watch('brand')
  const watchModel = watch('model')
  const selectedYear = watch('year')
  useEffect(() => {
    if (watchBrand !== selectedBrand?.codigo) {
      const brand = brands?.find(b => b.codigo === watchBrand)
      if (brand) {
        setSelectedBrand(brand)
      }
      setSelectedModel(null) // Reseta o modelo quando a marca muda
      setValue('model', '') // Reseta o valor do modelo no formulário
      setValue('year', '') // Reseta o valor do ano no formulário
    }
  }, [watchBrand, setSelectedBrand, setSelectedModel, setValue, selectedBrand?.codigo, brands])

  useEffect(() => {
    if (watchModel !== selectedModel?.codigo) {
      const model = models?.find(m => m.codigo === watchModel)
      if (model) {
        setSelectedModel(model)
      }
      setValue('year', '') // Reseta o valor do ano no formulário
    }
  }, [watchModel, setSelectedModel, setValue, selectedModel?.codigo, models])

  const onSubmit = async (data: FormData) => {
    await fetchPrice(data.brand, data.model, data.year)
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' component='h1' gutterBottom>
        Tabela Fipe
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        Consulte o valor de um veículo de forma gratuita
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin='normal' error={!!errors.brand}>
          <InputLabel id='brand-label'>Marca</InputLabel>
          <Select
            labelId='brand-label'
            {...register('brand')}
            defaultValue='' // Valor padrão para evitar undefined
            disabled={isLoadingBrands}
          >
            <MenuItem value=''>
              <em>Selecione a Marca</em>
            </MenuItem>
            {isLoadingBrands ? (
              <MenuItem disabled value=''>
                <em>Carregando...</em>
              </MenuItem>
            ) : (
              brands?.map(brand => (
                <MenuItem key={brand.codigo} value={brand.codigo}>
                  {brand.nome}
                </MenuItem>
              ))
            )}
          </Select>
          {isLoadingBrands && <CircularProgress size={24} />}
        </FormControl>
        <FormControl fullWidth margin='normal' error={!!errors.model}>
          <InputLabel id='model-label'>Modelo</InputLabel>
          <Select
            labelId='model-label'
            {...register('model')}
            defaultValue='' // Valor padrão para evitar undefined
            disabled={!selectedBrand || isLoadingModels}
          >
            <MenuItem value=''>
              <em>{!selectedBrand ? 'Selecione a Marca primeiro' : 'Selecione o Modelo'}</em>
            </MenuItem>
            {isLoadingModels ? (
              <MenuItem disabled value=''>
                <em>Carregando...</em>
              </MenuItem>
            ) : (
              models?.map(model => (
                <MenuItem key={model.codigo} value={model.codigo}>
                  {model.nome}
                </MenuItem>
              ))
            )}
          </Select>
          {isLoadingModels && <CircularProgress size={24} />}
        </FormControl>
        {selectedBrand && selectedModel && (
          <FormControl fullWidth margin='normal' error={!!errors.year}>
            <InputLabel id='year-label'>Ano</InputLabel>
            <Select
              labelId='year-label'
              {...register('year')}
              defaultValue='' // Valor padrão para evitar undefined
              disabled={!selectedModel || isLoadingYears}
            >
              <MenuItem value=''>
                <em>Selecione o Ano</em>
              </MenuItem>
              {isLoadingYears ? (
                <MenuItem disabled value=''>
                  <em>Carregando...</em>
                </MenuItem>
              ) : (
                years?.map(year => (
                  <MenuItem key={year.codigo} value={year.codigo}>
                    {year.nome}
                  </MenuItem>
                ))
              )}
            </Select>
            {isLoadingYears && <CircularProgress size={24} />}
          </FormControl>
        )}
        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          disabled={!selectedYear}
        >
          Consultar preço
        </Button>
        {isLoadingPrice && <CircularProgress size={24} />}
        {priceError && <Alert severity='error'>{priceError}</Alert>}
        {price && (
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', textAlign: 'center' }}>
            <Typography variant='h5' component='h2' gutterBottom>
              Tabela Fipe: Preço {selectedBrand?.nome} {selectedModel?.nome} {watch('year')}
            </Typography>
            <Typography
              variant='h4'
              component='p'
              style={{
                color: 'white',
                backgroundColor: '#00a699',
                borderRadius: '20px',
                display: 'inline-block',
                padding: '10px 20px',
              }}
            >
              {price}
            </Typography>
            <Typography variant='body2' component='p' gutterBottom>
              Este é o preço de compra do veículo
            </Typography>
          </Paper>
        )}
      </form>
    </Container>
  )
}

export default FipeForm
