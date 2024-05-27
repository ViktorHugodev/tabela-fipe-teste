import theme from '@/theme'
import type { Metadata } from 'next'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import FipeProvider from '@/context/FipeContext'
import { CssBaseline } from '@mui/material'

export const metadata: Metadata = {
  title: 'Tabela FIPE - Busca',
  description: 'Vejo o valor de qualquer veículo de acordo com a tabela FIPE',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR'>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <FipeProvider>{children}</FipeProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
