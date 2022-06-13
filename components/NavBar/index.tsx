import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import { useAccount } from 'wagmi'

const NavBar = () => {
  const { data: connectedAccount } = useAccount()

  return (
    <div className="flex flex-row justify-between items-center px-8 py-4">
      <div className="h-14 w-14 relative">
        <Image src="/icon.png" layout="fill" />
      </div>
      <div className="flex flex-row items-center gap-4">
        {/* {connectedAccount && <ConnectButton showBalance={false} />} */}
        <ConnectButton showBalance={false} />
      </div>
    </div>
  )
}

export default NavBar
