import React from 'react'
import { render, screen } from '@testing-library/react'
import FipePrice from '../FipePrice'

test('renders FipePrice component with correct data', () => {
  render(<FipePrice price='R$ 50.000,00' brandName='Audi' modelName='A4' year='2020' />)

  expect(screen.getByText(/Tabela Fipe: Preço Audi A4 2020/i)).toBeInTheDocument()
  expect(screen.getByText(/R\$ 50.000,00/i)).toBeInTheDocument()
  expect(screen.getByText(/Este é o preço de compra do veículo/i)).toBeInTheDocument()
})
