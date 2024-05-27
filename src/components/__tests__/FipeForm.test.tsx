import React, { act } from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'

import FipeForm from '../FipeForm'
import FipeProvider from '@/context/FipeContext'

interface WrapperProps {
  children: React.ReactNode
}

function Wrapper({ children }: WrapperProps) {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}

jest.mock('../../utils/fetcher', () => ({
  fetcher: jest.fn(url => {
    if (url.includes('/api/brands')) {
      return Promise.resolve([{ codigo: '1', nome: 'Marca 1' }])
    }
    if (url.includes('/api/models')) {
      return Promise.resolve([{ codigo: '1', nome: 'Modelo 1' }])
    }
    if (url.includes('/api/years')) {
      return Promise.resolve([{ codigo: '2020', nome: '2020' }])
    }
    return Promise.resolve([])
  }),
}))

test('renders FipeForm component', async () => {
  await act(async () => {
    render(
      <FipeProvider>
        <Wrapper>
          <FipeForm />
        </Wrapper>
      </FipeProvider>,
    )
  })

  expect(screen.getByText(/Tabela Fipe/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/Marca/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/Modelo/i)).toBeInTheDocument()
})

test('displays the year field when brand and model are selected', async () => {
  await act(async () => {
    render(
      <FipeProvider>
        <Wrapper>
          <FipeForm />
        </Wrapper>
      </FipeProvider>,
    )
  })

  fireEvent.change(screen.getByLabelText(/Marca/i), { target: { value: '1' } })

  await waitFor(() => expect(screen.getByLabelText(/Modelo/i)).toBeInTheDocument())

  fireEvent.change(screen.getByLabelText(/Modelo/i), { target: { value: '1' } })
})

test('submits the form correctly', async () => {
  await act(async () => {
    render(
      <FipeProvider>
        <Wrapper>
          <FipeForm />
        </Wrapper>
      </FipeProvider>,
    )
  })

  fireEvent.change(screen.getByLabelText(/Marca/i), { target: { value: '1' } })

  await waitFor(() => expect(screen.getByLabelText(/Modelo/i)).toBeInTheDocument())

  fireEvent.change(screen.getByLabelText(/Modelo/i), { target: { value: '1' } })
})
