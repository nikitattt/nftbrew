import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import NavBar from '../components/NavBar'
import SignInButtonBox from '../components/SignInButtonBox'

const Email: NextPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (!session && router.isReady) {
    router.push('/')
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
          <h1 className="font-black text-5xl">Enter Email</h1>
        </div>
      </main>
      <footer className="my-12"></footer>
    </div>
  )
}

export default Email
