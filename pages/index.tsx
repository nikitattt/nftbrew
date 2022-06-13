import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import NavBar from '../components/NavBar'

const SignInButtonBox = dynamic(() => import('../components/SignInButtonBox'), {
  ssr: false
})

const Home: NextPage = () => {
  const router = useRouter()
  const { data: session } = useSession()

  if (session && router.isReady) {
    router.push('/account')
  }

  return (
    <div className="font-sans bg-background text-black-text flex flex-col min-h-screen">
      <Head>
        <title>NFT Brew</title>
        <meta
          name="description"
          content="Get updates on you collections every day in the mailbox"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="mt-20 px-8">
        <div className="text-center">
          <h1 className="font-black text-5xl">Get nft collections overview</h1>
          <p className="mt-4 font-black text-4xl text-grey">
            in the inbox, every morning
          </p>
        </div>
        <div className="mt-20 max-w-4xl mx-auto rounded-2xl shadow-xl">
          <img
            className="rounded-2xl"
            // layout="fill"
            // objectFit="cover"
            src="/mail-report.png"
          />
        </div>
        <div className="mt-20">
          <SignInButtonBox text="Start brewing with your wallet" />
        </div>
        <p className="mt-20 text-center font-black text-2xl text-grey">Then</p>
        <h2 className="mt-20 text-center font-black text-3xl">
          Select collections to keep an eye on
        </h2>
        <h2 className="mt-20 text-center font-black text-3xl">Set the email</h2>
        <h2 className="mt-20 text-center font-black text-3xl">
          And enjoy nice overview every morning
        </h2>
        <div className="mt-20">
          <SignInButtonBox text="Get some nft brew in the morning" />
        </div>
      </main>
      <footer className="my-12"></footer>
    </div>
  )
}

export default Home
