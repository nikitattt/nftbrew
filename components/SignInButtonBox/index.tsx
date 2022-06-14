import { ConnectButton } from '@rainbow-me/rainbowkit'
import { getCsrfToken, signIn } from 'next-auth/react'
import { SiweMessage } from 'siwe'
import { useSignMessage, Connector, useAccount } from 'wagmi'
import Button, { ButtonAnimation } from '../Button'

const SignInButtonBox = ({ text }: { text: string }) => {
  const { data: account } = useAccount()

  const { signMessageAsync, error: signError, isLoading } = useSignMessage()

  const handleLogin = async (address: string, connector: Connector) => {
    try {
      // Prepare SIWE sign message
      const callbackUrl = '/'
      const message = new SiweMessage({
        domain: window.location.host,
        address: address!,
        statement:
          "Hi! Signing this message proves you own this wallet and nothing else. It's free and doesn't grant transaction rights.",
        uri: window.location.origin,
        version: '1',
        chainId: await connector.getChainId(),
        nonce: await getCsrfToken()
      })

      // Sign SIWE message
      const signature = await signMessageAsync({
        message: message.prepareMessage()
      })

      // Sign is with NextAuth
      signIn('credentials', {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (account?.address && account?.connector) {
    return (
      <div className="w-fit mx-auto">
        <div>
          <Button
            text={
              isLoading ? 'Check your wallet' : "Last Step: Confirm it's you"
            }
            onClick={() => {
              if (!isLoading) {
                handleLogin(account.address!, account.connector!)
              }
            }}
            expanded={false}
            animation={ButtonAnimation.sm}
          />
        </div>
        {signError && (
          <div className="text-center text-lg text-red font-sans font-black">
            {signError.message}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-fit mx-auto">
      <ConnectButton.Custom>
        {({ openConnectModal }) => {
          return (
            <div>
              <Button
                text={text}
                onClick={openConnectModal}
                expanded={false}
                animation={ButtonAnimation.sm}
              />
            </div>
          )
        }}
      </ConnectButton.Custom>
    </div>
  )
}

export default SignInButtonBox
