import { ConnectButton } from '@rainbow-me/rainbowkit'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useConnect, useDisconnect } from 'wagmi'

const NavBar = () => {
  const { isConnected } = useConnect()
  const { disconnect } = useDisconnect()

  const { data: session } = useSession()

  const handleLogout = async () => {
    try {
      //Sign Out from NextAuth
      signOut()

      // Disconnect wallet if connected
      if (isConnected) {
        disconnect()
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (session && session.address) {
    const address = String(session.address)
    var styledAddress =
      address.slice(0, 6) +
      '...' +
      address.slice(address.length - 4, address.length)

    return (
      <div className="flex flex-row justify-between items-center px-8 py-4">
        <div className="h-14 w-14 relative">
          <Image src="/icon.png" layout="fill" />
        </div>
        <div className="flex flex-row items-center gap-4">
          <button
            onClick={() => handleLogout()}
            className="h-8 text-center border-black-text border-2 rounded-xl hover:text-white hover:bg-black-text"
          >
            <p className="px-6 font-sans text-base font-bold">
              {styledAddress} Logout
            </p>
          </button>
        </div>
      </div>
    )
  }

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
