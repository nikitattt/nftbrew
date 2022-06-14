import { Collection } from '@prisma/client'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import NavBar from '../components/NavBar'
import { AccountState, useAccountStore } from '../state/account'
import { useQuery, gql } from '@apollo/client'
import Button, { ButtonType } from '../components/Button'
import CollectionCard from '../components/CollectionCard'
import { toast } from 'react-toastify'
import { upsertUserData } from '../data/user'

const SEARCH_COLLECTIONS = gql`
  query SearchCollections($text: String!) {
    search(
      query: { text: $text }
      pagination: { limit: 50 }
      filter: { entityType: COLLECTION }
    ) {
      nodes {
        name
        collectionAddress
        entity {
          ... on Collection {
            symbol
            totalSupply
          }
        }
      }
    }
  }
`

const Collections: NextPage = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [searchText, setSearchText] = useState('')
  const [inUpdate, setInUpdate] = useState(false)
  const [showSaveRemainder, setShowSaveRemainder] = useState(false)

  const collections = useAccountStore(
    (state: AccountState) => state.collections
  )

  const addCollection = useAccountStore(
    (state: AccountState) => state.addCollection
  )
  const removeCollection = useAccountStore(
    (state: AccountState) => state.removeCollection
  )

  const { loading, error, data } = useQuery(SEARCH_COLLECTIONS, {
    variables: { text: searchText }
  })

  if (!session && router.isReady) {
    router.push('/')
  }

  const handleCollections = async () => {
    if (collections) {
      setInUpdate(true)
      const done = await upsertUserData({ collections: collections })
      if (done) {
        toast.success('Saved Collections!')
        router.push('/account')
      } else {
        toast.error("Couldn't Save Collections :(")
      }
      setInUpdate(false)
    }
  }

  let collectionsFromSearch: any[] = data
    ? JSON.parse(JSON.stringify(data.search.nodes))
    : []

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
        <div
          className={clsx(
            showSaveRemainder &&
              'bg-yellow-background w-fit mx-auto py-8 px-8 text-center rounded-2xl'
          )}
        >
          <div className="w-fit mx-auto flex flex-col sm:flex-row gap-4">
            <Button
              text="Back"
              onClick={() => {
                router.push('/account')
              }}
              type={ButtonType.secondary}
            />
            <Button
              text="Save My Collections"
              onClick={() => !inUpdate && handleCollections()}
              type={ButtonType.main}
            />
          </div>
          <p
            className={clsx(
              showSaveRemainder
                ? 'mt-6 text-orange text-2xl font-bold'
                : 'invisible'
            )}
          >
            Don't forget to save updates!
          </p>
        </div>
        <div className="mt-20 text-center">
          <p className="font-black text-2xl">Your collections:</p>
        </div>
        <div className="mt-8 max-w-2xl mx-auto flex flex-col gap-4">
          {collections &&
            collections.map(function (collection, place) {
              return (
                <div key={place}>
                  <CollectionCard
                    collectionAddress={collection.address}
                    onRemoveClick={() => {
                      //   removeCollection(collection)
                      toast.warning(
                        'Sorry, we still working on collection removal functionality'
                      )
                    }}
                  />
                </div>
              )
            })}
        </div>
        <div className="text-black font-bold max-w-2xl mx-auto text-xs text-center my-4">
          <p className="mt-12">
            Due to the current characteristics of Zora API, sometimes it's hard
            to find the collection you are looking for by the keywords since
            Zora might show all similar "copy" collections too and in this case
            the best way is to get address of the collections from, for example,{' '}
            <a
              href="https://looksrare.org/collections"
              target="_blank"
              rel="noreferrer"
            >
              LookRare
            </a>{' '}
            website.
          </p>
          <p className="mt-2">
            For this, open collection of your interest there and copy its
            address from the URL.
          </p>
          <p>
            For example, for the BAYC collection:
            https://looksrare.org/collections/
            <span className="text-red">
              0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D
            </span>
          </p>
          <p className="mt-2">
            Paste this address into search bar and add it to your collection.
          </p>
        </div>
        <div className="mt-8 text-center">
          <p className="font-black text-2xl">Search for a collection:</p>
        </div>
        <div className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={searchText}
            placeholder="Collection Name"
            onChange={(e) => setSearchText(e.target.value)}
            className={clsx(
              'h-12 w-full font-black text-xl pt-px px-4 rounded-2xl',
              'bg-white bg-opacity-60 caret-grey-dark text-grey-dark outline-grey',
              'placeholder:text-grey-light'
            )}
          />
          <Button text="Search" onClick={() => {}} />
        </div>
        {loading ? (
          <p className="mt-4 text-center font-bold text-xl text-grey">
            Loading...
          </p>
        ) : (
          <div className="mt-4 max-w-2xl mx-auto flex flex-col gap-4">
            {collectionsFromSearch.map(function (collection, place) {
              if (
                collection.entity &&
                collection.entity?.totalSupply !== null &&
                collection.entity?.totalSupply !== 0
              ) {
                return (
                  <div
                    key={place}
                    className="flex flex-row justify-between items-center bg-white bg-opacity-60 rounded-2xl py-4 px-4"
                  >
                    <div className="flex flex-col font-bold text-xs">
                      <p className="text-lg">
                        <span className="text-grey">Name:</span>{' '}
                        {collection.name}
                      </p>
                      <p>
                        <span className="text-grey">Symbol:</span>{' '}
                        {collection.entity?.symbol}
                      </p>
                      <p>
                        <span className="text-grey">Total Supply:</span>{' '}
                        {collection.entity?.totalSupply}
                      </p>
                      <p>
                        <span className="text-grey">Address:</span>{' '}
                        {collection.collectionAddress}
                      </p>
                    </div>
                    <Button
                      text="Add"
                      onClick={() => {
                        setShowSaveRemainder(true)
                        addCollection({
                          address: collection.collectionAddress
                        })
                        toast.info(
                          "Don't forget to save your updates with the button at the top!"
                        )
                      }}
                    />
                  </div>
                )
              } else return
            })}
          </div>
        )}
      </main>

      <footer className="my-20"></footer>
    </div>
  )
}

export default Collections
