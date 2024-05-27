'use client'

import React from 'react'
import { Autocomplete, Box, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { SelectFieldProps } from './types'

export default function SelectField({
  name,
  label,
  options,
  isLoading,
  error,
  disabled,
}: SelectFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Box marginBottom={2}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={options}
            getOptionLabel={option => option?.nome ?? ''}
            isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
            disabled={disabled || isLoading}
            onChange={(event, value) => field.onChange(value ? value.codigo : '')}
            value={options.find(option => option.codigo === field.value) || null}
            renderInput={params => (
              <TextField
                {...params}
                label={label}
                error={!!errors[name] || error}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: <>{params.InputProps.endAdornment}</>,
                }}
              />
            )}
          />
        )}
      />
    </Box>
  )
}
