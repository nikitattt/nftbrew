import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar'

const Home: NextPage = () => {
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
      <main className="mt-20">
        <div className="text-center">
          <h1 className="font-black text-5xl">Get nft collections overview</h1>
          <p className="mt-4 max-w-max mx-auto font-black text-4xl text-grey">
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
        <div className="mt-12"></div>
      </main>
      <footer className=""></footer>
    </div>
  )
}

export default Home
