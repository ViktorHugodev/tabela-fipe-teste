// components/FipeForm.tsx
'use client'

import React, { useEffect } from 'react'

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
} from '@mui/material'
import { useFipe } from '@/context/FipeContext'

interface FormData {
  brand: string
  model: string
}

const schema = yup.object().shape({
  brand: yup.string().required('Marca é obrigatória'),
  model: yup.string().required('Modelo é obrigatório'),
})

export default function FipeForm() {
  const { brands, models, fetchModels } = useFipe()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const selectedBrand = watch('brand')

  useEffect(() => {
    if (selectedBrand) {
      setValue('model', '')
      fetchModels(selectedBrand)
    }
  }, [selectedBrand, setValue, fetchModels])

  const onSubmit = (data: FormData) => {
    console.log(data)
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
          <Select labelId='brand-label' {...register('brand')} defaultValue=''>
            <MenuItem value=''>
              <em>Selecione a Marca</em>
            </MenuItem>
            {brands?.map(brand => (
              <MenuItem key={brand.codigo} value={brand.codigo}>
                {brand.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin='normal' error={!!errors.model}>
          <InputLabel id='model-label'>Modelo</InputLabel>
          <Select
            labelId='model-label'
            {...register('model')}
            defaultValue=''
            disabled={!selectedBrand}
          >
            <MenuItem value=''>
              <em>Selecione o Modelo</em>
            </MenuItem>
            {models?.map(model => (
              <MenuItem key={model.codigo} value={model.codigo}>
                {model.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type='submit' variant='contained' color='primary' fullWidth>
          Consultar preço
        </Button>
      </form>
    </Container>
  )
}
