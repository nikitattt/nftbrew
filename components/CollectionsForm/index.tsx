import { Collection } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { AccountState, useAccountStore } from '../../state/account'
import Button, { ButtonType } from '../Button'

const CollectionsForm = ({
  collections
}: {
  collections: Array<Collection>
}) => {
  const router = useRouter()
  const { data: session } = useSession()

  const setCollections = useAccountStore(
    (state: AccountState) => state.setCollections
  )

  if (!session && router.isReady) {
    router.push('/')
  }

  return (
    <div className="mt-20 max-w-lg mx-auto text-center">
      <p className="font-black text-2xl">Your collections:</p>
      <div className="mt-4">
        <Button
          text="Add Collections"
          onClick={() => {
            if (collections) {
              setCollections(collections)
            }
            router.push('/collections')
          }}
          expanded={true}
        />
      </div>
      <p className="mt-4 max-w-sm mx-auto font-black text-sm text-purple">
        Collection selection in still in development. We are on it and will
        launch ASAP. In meantime, you can save your email and we will reach back
        to you when we fully launch 💪
      </p>
    </div>
  )
}

export default CollectionsForm
