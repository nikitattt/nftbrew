import 'dotenv/config'

import fetch from 'cross-fetch'
import postmark from 'postmark'

import apolloPkg from '@apollo/client/core/core.cjs'
const { ApolloClient, InMemoryCache, HttpLink, gql } = apolloPkg

function roundIt(number) {
  return Math.round((number + Number.EPSILON) * 100) / 100
}

async function index() {
  const userEmail = process.env.TEST_EMAIL

  const client = new ApolloClient({
    link: new HttpLink({ uri: 'https://api.zora.co/graphql', fetch }),
    cache: new InMemoryCache(),
    headers: {
      'X-API-KEY': process.env.ZORA_API_KEY
    }
  })

  const emailClient = new postmark.ServerClient(process.env.POSTMARK_API_KEY)

  const trackedCollectionsAddresses = [
    '0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b',
    '0x79fcdef22feed20eddacbb2587640e45491b757f',
    '0x1a92f7381b9f03921564a437210bb9396471050c',
    '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
    '0x23581767a106ae21c074b2276d25e5c3e136a68b',
    '0xed5af388653567af2f388e6224dc7c4b3241c544'
  ]

  const trackedCollectionsData = await getCollectionsData(
    client,
    trackedCollectionsAddresses
  )

  const html = getHTML(trackedCollectionsData)

  emailClient.sendEmail({
    From: 'brew@nftbrewbarista.xyz',
    // To: userEmail,
    To: 'brew@nftbrewbarista.xyz',
    Subject: 'Your Morning NFT Brew',
    HtmlBody: html,
    TextBody: 'Your Morning NFT Brew',
    MessageStream: 'outbound'
  })
}

index().catch(console.error)

async function getCollectionsData(client, addresses) {
  let data = []

  for (const address of addresses) {
    const query = gql`
      query CollectionData($address: [String!]) {
        aggregateStat {
          nftCount(where: { collectionAddresses: $address })
          ownerCount(where: { collectionAddresses: $address })
          daySales: salesVolume(
            where: { collectionAddresses: $address }
            timeFilter: { lookbackHours: 24 }
          ) {
            chainTokenPrice
            totalCount
          }
          twoDaySales: salesVolume(
            where: { collectionAddresses: $address }
            timeFilter: { lookbackHours: 48 }
          ) {
            chainTokenPrice
            totalCount
          }
        }
        topSale: sales(
          where: { collectionAddresses: $address }
          filter: { timeFilter: { lookbackHours: 24 } }
          sort: { sortKey: CHAIN_TOKEN_PRICE, sortDirection: DESC }
          pagination: { limit: 1 }
        ) {
          nodes {
            sale {
              price {
                chainTokenPrice {
                  decimal
                  currency {
                    name
                  }
                }
              }
            }
            token {
              collectionName
            }
          }
        }
        lowSale: sales(
          where: { collectionAddresses: $address }
          filter: { timeFilter: { lookbackHours: 24 } }
          sort: { sortKey: CHAIN_TOKEN_PRICE, sortDirection: ASC }
          pagination: { limit: 2 }
        ) {
          nodes {
            sale {
              price {
                chainTokenPrice {
                  decimal
                  currency {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `

    const variables = {
      address: address
    }

    const result = await client.query({
      query: query,
      variables: variables
    })

    const name = result.data.topSale.nodes[0].token.collectionName
    const ownersPercentage =
      (result.data.aggregateStat.ownerCount /
        result.data.aggregateStat.nftCount) *
      100

    const daySalesVolume = result.data.aggregateStat.daySales.chainTokenPrice
    const daySalesNumber = result.data.aggregateStat.daySales.totalCount
    const twoDaySalesVolume =
      result.data.aggregateStat.twoDaySales.chainTokenPrice
    const twoDaySalesNumber = result.data.aggregateStat.twoDaySales.totalCount

    const topSale =
      result.data.topSale.nodes[0].sale.price.chainTokenPrice.decimal
    const lowSale =
      result.data.lowSale.nodes[0].sale.price.chainTokenPrice.decimal

    const dayAverage = daySalesVolume / daySalesNumber

    const v1 = dayAverage
    const v2 =
      (twoDaySalesVolume - daySalesVolume) /
      (twoDaySalesNumber - daySalesNumber)

    const yesterdayToTodayChange = ((v1 - v2) / v1) * 100

    const collectionData = {
      collection: name,
      avgSale: `${roundIt(dayAverage)} Ξ`,
      avgSaleChange: `${roundIt(yesterdayToTodayChange)} %`,
      avgSaleChangePositive: yesterdayToTodayChange >= 0 ? true : false,
      highestSale: `${roundIt(topSale)} Ξ`,
      lowestSale: `${roundIt(lowSale)} Ξ`,
      volume: `${roundIt(daySalesVolume)} Ξ`,
      totalSales: `${daySalesNumber}`,
      ownersSupply: `${roundIt(ownersPercentage)} %`
    }

    data.push(collectionData)
  }

  return data
}

function getHTML(data) {
  // TODO: set image url
  let html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700;900&display=swap" rel="stylesheet" type='text/css'>
      <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
      <![endif]-->
      
    </head>
    <body>
      <div id="">
        <div style="font-family: Inter, sans-serif; color: #221B1A;">
          <div class="mx-auto w-16 h-16" style="margin-left: auto; margin-right: auto; margin-top: 3rem; height: 4rem; width: 4rem;"><img width="64" height="64" src="https://nftbrew.netlify.app/icon.png" /></div>
          <div class="text-center mt-12" style="margin-top: 3rem; text-align: center;">
            <p class="text-2xl font-bold" style="font-size: 1.5rem; line-height: 2rem; font-weight: 700;">Your Morning NFT Brew</p>
            <div style="margin-left: auto; margin-right: auto; margin-top: 0.5rem; margin-bottom: 0.5rem; width: 11rem; border-radius: 9999px; border-top-width: 1px; border-color: #7D7D7D;"></div>
            <p style="font-weight: 700; color: #7D7D7D;">
              What last 24h marked for the following collections:
            </p>
          </div>
          <div class="mt-12 overflow-scroll max-w-4xl mx-auto" style="margin-left: auto; margin-right: auto; margin-top: 3rem; max-width: 56rem; overflow: scroll;">
            <table class="w-full table-auto" style="width: 100%; table-layout: auto;" width="100%">
              <thead style="color: #7D7D7D;">
                <tr>
                  <th class="grow pr-6 pl-2 py-2 text-left" style="flex-grow: 1; padding-top: 0.5rem; padding-bottom: 0.5rem; padding-right: 1.5rem; padding-left: 0.5rem; text-align: left;" align="left">Collection</th>
                  <th class="px-2 py-2" style="padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem;">Avg Sale</th>
                  <th class="px-2 py-2" style="padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem;">Avg Sale Change</th>
                  <th class="px-2 py-2" style="padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem;">Low Sale</th>
                  <th class="px-2 py-2" style="padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem;">Top Sale</th>
                  <th class="px-2 py-2" style="padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem;">№ Sales</th>
                  <th class="px-2 py-2" style="padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem;">Vol</th>
                  <th class="px-2 py-2" style="padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem;">Owners / Supply</th>
                </tr>
              </thead>
              <tbody class="">
              `

  data.forEach((e) => {
    html += `
                <tr>
                  <td style="padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem; text-align: left; font-weight: 500;" align="left">
                    ${e.collection}
                  </td>
                  <th style="padding-top: 0.5rem; padding-bottom: 0.5rem; font-weight: 500;">${
                    e.avgSale
                  }</th>
                  <th style="padding-top: 0.5rem; padding-bottom: 0.5rem; font-weight: 500; color: ${
                    e.avgSaleChangePositive ? '#1CC500' : '#FF1F3D'
                  };">${e.avgSaleChange}</th>
                  <th style="padding-top: 0.5rem; padding-bottom: 0.5rem; font-weight: 500;">${
                    e.lowestSale
                  }</th>
                  <th style="padding-top: 0.5rem; padding-bottom: 0.5rem; font-weight: 500;">${
                    e.highestSale
                  }</th>
                  <th style="padding-top: 0.5rem; padding-bottom: 0.5rem; font-weight: 500;">${
                    e.totalSales
                  }</th>
                  <th style="padding-top: 0.5rem; padding-bottom: 0.5rem; font-weight: 500;">${
                    e.volume
                  }</th>
                  <th style="padding-top: 0.5rem; padding-bottom: 0.5rem; font-weight: 500;">${
                    e.ownersSupply
                  }</th>
                </tr>
                `
  })

  html += `
              </tbody>
            </table>
          </div>
          <div style="margin-top: 3rem; text-align: center;">
            <p style="color: #7D7D7D;">Don't want to receive reports anymore? Opt-out on our <a href="https://nftbrewbarista.xyz" target="_blank">website</a></p>
          </div>
        </div>
      </div>
    </body>
  </html>
  `

  return html
}
