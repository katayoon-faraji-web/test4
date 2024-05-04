import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { ReactNode } from 'react'

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [ rtlPlugin],
})

interface Props {
  children: ReactNode
}

export function RTLProvider({ children }: Props) {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>
}
