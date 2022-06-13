import { Collection } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Button, { ButtonType } from '../Button'

const CollectionsForm = ({
  collections
}: {
  collections: Array<Collection>
}) => {
  const router = useRouter()
  const { data: session } = useSession()

  if (!session && router.isReady) {
    router.push('/')
  }

  return (
    <div className="mt-20 max-w-lg mx-auto text-center">
      <p className="font-black text-2xl">Your collections</p>
      <div className="mt-4">
        <Button
          text="Add Collections"
          onClick={() => router.push('/collections')}
          expanded={true}
        />
      </div>
    </div>
  )
}

export default CollectionsForm
