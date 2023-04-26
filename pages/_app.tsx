import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createClient, configureChains } from "wagmi"
import { evmos, evmosTestnet } from 'wagmi/chains'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { SessionProvider } from "next-auth/react"
import Layout from 'components/layout'
import { Toaster } from 'react-hot-toast'
import { publicProvider } from "wagmi/providers/public"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const { chains, provider } = configureChains(
  [evmos, evmosTestnet],
  [publicProvider()]
)

const client = createClient({
  autoConnect: true,
  provider,
})

const queryClient = new QueryClient()

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return (
    <WagmiConfig client={client}>
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
        <div><Toaster /></div>
      </QueryClientProvider>
    </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp
