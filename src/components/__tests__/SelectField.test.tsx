import React from 'react'
import { render, screen } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'
import AutocompleteField from '../SelectFields'
interface WrapperProps {
  children: React.ReactNode
}

function Wrapper({ children }: WrapperProps) {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}

test('renders AutocompleteField component', function () {
  render(
    <Wrapper>
      <AutocompleteField
        name='brand'
        label='Marca'
        options={[{ codigo: '1', nome: 'Audi' }]}
        isLoading={false}
        error={false}
        disabled={false}
      />
    </Wrapper>,
  )
  expect(screen.getByLabelText(/Marca/i)).toBeInTheDocument()
})
