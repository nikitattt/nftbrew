import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import CollectionsForm from '../components/CollectionsForm'
import EmailForm from '../components/EmailForm'
import NavBar from '../components/NavBar'
import { useUser } from '../data/user'

const Email: NextPage = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const { data: userData, isLoading, isError } = useUser()

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
      <main className="px-8">
        {isLoading ? (
          <div className="mt-12">
            <p className="text-center font-bold text-grey">
              Let us load your profile...
            </p>
          </div>
        ) : (
          <div>
            {(!userData.email ||
              !userData.collections ||
              !userData.collections.length) && (
              <div className="bg-yellow-background max-w-xl mx-auto py-3 px-8 rounded-2xl mb-12">
                <p className="text-center text-orange font-bold text-lg">
                  You need to add {!userData.email && 'email '}{' '}
                  {!userData.email && 'and '}
                  {(!userData.collections || !userData.collections.length) &&
                    'some collections '}{' '}
                  before we can organise delivery of your NFT Brew tomorrow
                  morning
                </p>
              </div>
            )}

            <CollectionsForm collections={userData.collections} />
            <EmailForm
              email={userData.email}
              receiveReports={userData.receiveReports}
            />
          </div>
        )}
      </main>

      <footer className="my-20"></footer>
    </div>
  )
}

export default Email
