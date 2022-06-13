import { ConnectButton } from '@rainbow-me/rainbowkit'
import Button, { ButtonAnimation } from '../Button'

const SignInButtonBox = ({ text }: { text: string }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <ConnectButton.Custom>
        {({ openConnectModal }) => {
          return (
            <div className="">
              <Button
                text={text}
                onClick={openConnectModal}
                expanded={true}
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
