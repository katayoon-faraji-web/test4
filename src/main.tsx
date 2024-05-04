import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RTLProvider } from './theme/RTLProvider.tsx'
import { Provider } from "react-redux";
import { store } from './redux/store.ts'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


import { MutationCache, QueryCache, QueryClient,QueryClientProvider } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import errorHandler from './hooks/errorHandler.ts'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => {
      console.log(err)

      if ((err as any)?.response?.status === 500) {
        toast.error('اررور سمت سرور - ۵۰۰')
      }

      const isValidShape = errorHandler(err)
      if (typeof isValidShape !== 'undefined') {
        errorHandler(err)
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (err) => {
      console.log(err)

      if ((err as any)?.response?.status >= 500) {
        toast.error('اررور سمت سرور - ۵۰۰')
      }

      const isValidShape = errorHandler(err)
      if (typeof isValidShape !== 'undefined') {
        errorHandler(err)
      }
    },
  }),
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RTLProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App/>
        </Provider>
      </QueryClientProvider>
    </RTLProvider>
    

          
)
