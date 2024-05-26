'use client'

import React from 'react'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { useFormContext } from 'react-hook-form'

interface SelectFieldProps {
  name: string
  label: string
  options: { codigo: string; nome: string }[]
  isLoading: boolean
  error: boolean
  disabled: boolean
}

export default function SelectField({
  name,
  label,
  options,
  isLoading,
  error,
  disabled,
}: SelectFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <FormControl fullWidth margin='normal' error={!!errors[name] || error} variant='outlined'>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        {...register(name)}
        id={`${name}-select`}
        defaultValue=''
        disabled={disabled || isLoading}
        label={label}
      >
        <MenuItem value=''>
          <em>Selecione {label}</em>
        </MenuItem>
        {isLoading ? (
          <MenuItem disabled value=''>
            <em>Carregando...</em>
          </MenuItem>
        ) : (
          options.map(option => (
            <MenuItem key={option.codigo} value={option.codigo}>
              {option.nome}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  )
}
