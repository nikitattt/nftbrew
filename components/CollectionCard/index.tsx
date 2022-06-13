import { useNFT, useNFTMetadata } from '@zoralabs/nft-hooks'
import Button, { ButtonType } from '../Button'

const CollectionCard = ({
  collectionAddress
}: {
  collectionAddress: string
}) => {
  const { data } = useNFT(collectionAddress)

  if (!data) {
    return <div className="bg-white bg-opacity-60 rounded-2xl h-12" />
  }

  return (
    <div className="bg-white bg-opacity-60 rounded-2xl py-4 px-4">
      <div className="flex flex-col font-bold text-xs">
        {/* <p className="text-lg">
          <span className="text-grey">Name:</span> {data.contract.name}
        </p>
        <p>
          <span className="text-grey">Address:</span> {data.contract.address}
        </p> */}
      </div>
    </div>
  )
}

export default CollectionCard
