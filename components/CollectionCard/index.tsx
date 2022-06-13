import { useNFT } from '@zoralabs/nft-hooks'
import clsx from 'clsx'

const CollectionCard = ({
  collectionAddress
}: {
  collectionAddress: string
}) => {
  const { data } = useNFT(collectionAddress, '1')

  if (!data) {
    return <div className="bg-white bg-opacity-60 rounded-2xl h-12" />
  }

  console.log(data)

  return (
    <div className="flex flex-row bg-white bg-opacity-60 rounded-2xl py-4 px-4 items-center">
      <div className="h-14 w-14 rounded-full mr-4">
        {data.metadata?.imageUri ? (
          <img className="rounded-full" src={data.metadata?.imageUri} />
        ) : (
          <div
            className={clsx(
              'h-14 w-14 rounded-full bg-gradient-to-r',
              Math.random() < 0.5 ? 'from-purple to-blue' : 'from-red to-purple'
            )}
          />
        )}
      </div>
      <div className="flex flex-col font-bold text-xs">
        <p className="text-lg">
          <span className="text-grey">Name:</span> {data.nft?.contract.name}
        </p>
        <p>
          <span className="text-grey">Address:</span>{' '}
          {data.nft?.contract.address}
        </p>
        <p>
          <span className="text-grey">Symbol:</span> {data.nft?.contract.symbol}
        </p>
      </div>
    </div>
  )
}

export default CollectionCard
