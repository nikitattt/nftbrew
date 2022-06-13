import '../styles/globals.css'
import type { AppProps } from 'next/app'

import '@rainbow-me/rainbowkit/styles.css'
import {
  wallet,
  connectorsForWallets,
  RainbowKitProvider,
  lightTheme
} from '@rainbow-me/rainbowkit'
import { chain, createClient, WagmiConfig, configureChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

const infuraId = process.env.INFURA_ID
const alchemyId = process.env.ALCHEMY_ID

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
      wallet.coinbase({ chains, appName: 'Bomerang' }),
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={rainbowTheme}
        showRecentTransactions={true}
      >
        <Component {...pageProps} />{' '}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
