import { gql, useQuery } from '@apollo/client'
import clsx from 'clsx'
import Button from '../Button'

const SEARCH_COLLECTIONS = gql`
  query TokenData($address: String!) {
    token(token: { address: $address, tokenId: "1" }) {
      token {
        tokenContract {
          name
          symbol
          totalSupply
        }
        image {
          mediaEncoding {
            ... on ImageEncodingTypes {
              thumbnail
            }
          }
        }
      }
    }
  }
`

const CollectionCard = ({
  collectionAddress,
  onRemoveClick
}: {
  collectionAddress: string
  onRemoveClick?: () => void
}) => {
  const { loading, error, data } = useQuery(SEARCH_COLLECTIONS, {
    variables: { address: collectionAddress }
  })

  if (!data) {
    return <div className="bg-white bg-opacity-60 rounded-2xl h-12" />
  }

  console.log(data)

  const imageUrl = data.token.token.image.mediaEncoding.thumbnail ?? ''
  const name = data.token.token.tokenContract.name ?? ''
  const totalSupply = data.token.token.tokenContract.totalSupply ?? ''
  const symbol = data.token.token.tokenContract.symbol ?? ''

  return (
    <div className="flex flex-row bg-white bg-opacity-60 rounded-2xl py-4 px-4 items-center justify-between">
      <div className="flex flex-row items-center">
        <div className="h-16 w-16 rounded-full mr-4">
          <img className="rounded-full" src={imageUrl} />
        </div>
        <div className="flex flex-col font-bold text-xs">
          <p className="text-lg">
            <span className="text-grey">Name:</span> {name}
          </p>
          <p>
            <span className="text-grey">Symbol:</span> {symbol}
          </p>
          <p>
            <span className="text-grey">Supply:</span> {totalSupply}
          </p>
          <p>
            <span className="text-grey">Address:</span> {collectionAddress}
          </p>
        </div>
      </div>
      {onRemoveClick && <Button text="Remove" onClick={onRemoveClick} />}
    </div>
  )
}

export default CollectionCard
