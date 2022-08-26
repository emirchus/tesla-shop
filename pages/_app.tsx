import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';
import { SWRConfig } from 'swr';
import { CartProvider, UiProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <UiProvider>
        <SWRConfig
          value={{
            fetcher: (url: string) => fetch(url).then(r => r.json())
          }}
        >
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </SWRConfig>
      </UiProvider>
    </CartProvider>
  );
}

export default MyApp;
