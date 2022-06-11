import type { NextPage } from 'next'

const Mail: NextPage = () => {
  return (
    <div className="bg-background pt-12 pb-12 font-sans text-black-text">
      <div className="mx-auto w-16 h-16">
        <img src="/icon.png" />
      </div>
      <div className="text-center mt-12">
        <p className="text-2xl font-bold">Your Morning NFT Brew</p>
        <div className="border-t w-44 rounded-full border-grey mx-auto my-2" />
        <p className="text-grey font-medium">
          What yesterday marked for the following collections:
        </p>
      </div>
      <div className="mt-12 overflow-scroll max-w-4xl mx-auto">
        <table className="w-full table-auto">
          <thead className="text-grey">
            <tr>
              <th className="grow pr-6 pl-2 py-2 text-left">Collection</th>
              <th className="px-2 py-2">Avg Sale</th>
              <th className="px-2 py-2">Avg Sale Change</th>
              <th className="px-2 py-2">Top Sale</th>
              <th className="px-2 py-2">Low Sale</th>
              <th className="px-2 py-2">Vol</th>
              <th className="px-2 py-2">№ Sales</th>
              <th className="px-2 py-2">Owners / Supply</th>
            </tr>
          </thead>
          <tbody className="">
            <tr>
              <td className="pr-2 py-2 pl-2 text-left font-medium">
                CryptoPhunks
              </td>
              <th className="py-2 font-medium">50 Ξ</th>
              <th className="py-2 font-medium text-green">12%</th>
              <th className="py-2 font-medium">98 Ξ</th>
              <th className="py-2 font-medium">49 Ξ</th>
              <th className="py-2 font-medium">765</th>
              <th className="py-2 font-medium">23</th>
              <th className="py-2 font-medium">80%</th>
            </tr>
            <tr>
              <td className="pr-2 py-2 pl-2 text-left font-medium">mfers</td>
              <th className="py-2 font-medium">2.3 Ξ</th>
              <th className="py-2 font-medium text-red">-32%</th>
              <th className="py-2 font-medium">3.45 Ξ</th>
              <th className="py-2 font-medium">2.3 Ξ</th>
              <th className="py-2 font-medium">765</th>
              <th className="py-2 font-medium">234</th>
              <th className="py-2 font-medium">64%</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="border-t w-12 rounded-full border-grey mx-auto mt-12" />
    </div>
  )
}

export default Mail
