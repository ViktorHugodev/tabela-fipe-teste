import { Box, Typography } from '@mui/material'
import { FipePriceProps } from './types'

export default function FipePrice({ brandName, modelName, year, price }: FipePriceProps) {
  return (
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
        Tabela Fipe: Preço {brandName} {modelName} {year}
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
  )
}
