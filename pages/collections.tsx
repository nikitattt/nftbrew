import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import CollectionsForm from '../components/CollectionsForm'
import EmailForm from '../components/EmailForm'
import NavBar from '../components/NavBar'
import { useUser } from '../data/user'

const Collections: NextPage = () => {
  const router = useRouter()
  const { data: session } = useSession()

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
      <main className="mt-20 px-8"></main>

      <footer className="my-12"></footer>
    </div>
  )
}

export default Collections
