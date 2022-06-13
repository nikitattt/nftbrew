import '../styles/globals.css'
import type { AppProps } from 'next/app'

import '@rainbow-me/rainbowkit/styles.css'
import {
  wallet,
  connectorsForWallets,
  RainbowKitProvider,
  lightTheme
} from '@rainbow-me/rainbowkit'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { chain, createClient, WagmiConfig, configureChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'

const infuraId = process.env.INFURA_ID
const alchemyId = process.env.ALCHEMY_ID
const zoraApiKey = process.env.ZORA_API_KEY

const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    infuraProvider({ infuraId, priority: 0 }),
    alchemyProvider({ alchemyId, priority: 1 }),
    publicProvider()
  ]
)

//
// Injected connector shouldn’t be used if another
// injected wallet is available.
//
const needsInjectedWalletFallback =
  typeof window !== 'undefined' &&
  window.ethereum &&
  !window.ethereum.isMetaMask &&
  !window.ethereum.isCoinbaseWallet

//
// ! API might change in the future
//
const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      wallet.metaMask({ chains }),
      ...(needsInjectedWalletFallback ? [wallet.injected({ chains })] : []),
      wallet.walletConnect({ chains })
    ]
  },
  {
    groupName: 'More',
    wallets: [
      wallet.rainbow({ chains }),
      wallet.coinbase({ chains, appName: 'NFTBrew' }),
      wallet.ledger({ chains }),
      wallet.trust({ chains }),
      wallet.argent({ chains })
    ]
  }
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const rainbowTheme = lightTheme({
  accentColor: '#221B1A'
})

const client = new ApolloClient({
  uri: 'https://api.zora.co/graphql',
  cache: new InMemoryCache(),
  headers: {
    'X-API-KEY': zoraApiKey ?? ''
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={rainbowTheme}
        showRecentTransactions={true}
      >
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />{' '}
            <ToastContainer
              position="top-right"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </ApolloProvider>
        </SessionProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
