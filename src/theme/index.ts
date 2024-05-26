'use client'
import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      main: '#5B03BD',
    },
    background: {
      default: '#F9F7FC',
    },
  },
})

export default theme
