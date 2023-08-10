import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '@/themes'
import { AuthProvider, RecetaProvider, UiProvider } from '@/context'
import { DeviceProvider } from '@/context/device'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig 
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <AuthProvider>
        <DeviceProvider>
          <RecetaProvider>
            <UiProvider>
              <ThemeProvider theme={ lightTheme }>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </UiProvider>
          </RecetaProvider>
        </DeviceProvider>
      </AuthProvider>
    </SWRConfig>
  )
}
