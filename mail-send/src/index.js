import 'dotenv/config'

import fetch from 'cross-fetch'
import nodemailer from 'nodemailer'
import dayjs from 'dayjs'

import apolloPkg from '@apollo/client'
const { ApolloClient, InMemoryCache, HttpLink, gql } = apolloPkg

async function index() {
  let trackedCollectionsData = {}

  const userEmail = process.env.TEST_EMAIL

  const client = new ApolloClient({
    link: new HttpLink({ uri: 'https://api.zora.co/graphql', fetch }),
    cache: new InMemoryCache()
  })

  const transporter = await nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true only works with port 465
    tls: {
      ciphers: 'SSLv3'
    },
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const trackedCollectionsAddresses = [
    '0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b',
    '0x79fcdef22feed20eddacbb2587640e45491b757f',
    '0x1a92f7381b9f03921564a437210bb9396471050c',
    '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
    '0x23581767a106ae21c074b2276d25e5c3e136a68b',
    '0xed5af388653567af2f388e6224dc7c4b3241c544'
  ]

  await trackedCollectionsAddresses.forEach(async (address) => {
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

    await client
      .query({
        query: query,
        variables: variables
      })
      .then((result) => {
        console.log(result)
        // console.log(result.data.aggregateStat.salesVolume)
      })
  })

  const testData = [
    {
      collection: 'CryptoPunks',
      avgSale: '50 Ξ',
      avgSaleChange: '12%',
      avgSaleChangePositive: true,
      highestSale: '86 Ξ',
      lowestSale: '49 Ξ',
      volume: '765 Ξ',
      totalSales: '23',
      ownersSupply: '80%'
    },
    {
      collection: 'mfers',
      avgSale: '2.345 Ξ',
      avgSaleChange: '12%',
      volume: '765 Ξ',
      totalSales: '23',
      ownersSupply: '80%'
    },
    {
      collection: 'CryptoPunks',
      avgSale: '50 Ξ',
      avgSaleChange: '12%',
      volume: '765 Ξ',
      totalSales: '23',
      ownersSupply: '80%'
    },
    {
      collection: 'mfers',
      avgSale: '2.345 Ξ',
      avgSaleChange: '12%',
      volume: '765 Ξ',
      totalSales: '23',
      ownersSupply: '80%'
    },
    {
      collection: 'CryptoPunks',
      avgSale: '50 Ξ',
      avgSaleChange: '12%',
      volume: '765 Ξ',
      totalSales: '23',
      ownersSupply: '80%'
    }
  ]
  const html = getHTML(testData)

  // const info = await transporter.sendMail({
  //   from: `"NFT Brew Barista" <${process.env.EMAIL_USER}>`,
  //   to: userEmail,
  //   subject: 'Your Morning NFT Brew',
  //   html: html
  // })

  // console.log('Message sent: %s', info.messageId)
}

index().catch(console.error)

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
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700;900&display=swap" rel="stylesheet">
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
        <div class="pt-12 pb-12 font-sans text-black-text" style="padding-top: 3rem; padding-bottom: 3rem; font-family: Inter, sans-serif; --tw-text-opacity: 1; color: rgb(34 27 26 / var(--tw-text-opacity));">
          <div class="mx-auto w-16 h-16" style="margin-left: auto; margin-right: auto; height: 4rem; width: 4rem;"><img src="/icon.png"></div>
          <div class="text-center mt-12" style="margin-top: 3rem; text-align: center;">
            <p class="text-2xl font-bold" style="font-size: 1.5rem; line-height: 2rem; font-weight: 700;">Your Morning NFT Brew</p>
            <div class="border-t w-44 rounded-full border-grey mx-auto my-2" style="margin-left: auto; margin-right: auto; margin-top: 0.5rem; margin-bottom: 0.5rem; width: 11rem; border-radius: 9999px; border-top-width: 1px; --tw-border-opacity: 1; border-color: rgb(125 125 125 / var(--tw-border-opacity));"></div>
            <p class="text-grey font-medium" style="font-weight: 500; --tw-text-opacity: 1; color: rgb(125 125 125 / var(--tw-text-opacity));">
              What yesterday marked for the following collections:
            </p>
          </div>
          <div class="mt-12 overflow-scroll max-w-4xl mx-auto" style="margin-left: auto; margin-right: auto; margin-top: 3rem; max-width: 56rem; overflow: scroll;">
            <table class="w-full table-auto" style="width: 100%; table-layout: auto;" width="100%">
              <thead class="text-grey" style="--tw-text-opacity: 1; color: rgb(125 125 125 / var(--tw-text-opacity));">
                <tr>
                  <th class="grow pr-6 pl-2 py-2 text-left" style="flex-grow: 1; padding-top: 0.5rem; padding-bottom: 0.5rem; padding-right: 1.5rem; padding-left: 0.5rem; text-align: left;" align="left">Collection</th>
                  <th class="px-2 py-2" style="padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem;">Avg Sale</th>
                  <th class="px-2 py-2" style="padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem;">Avg Sale Change</th>
                  <th class="px-2 py-2" style="padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem;">Volume</th>
                  <th class="px-2 py-2" style="padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem;">Total Sales</th>
                  <th class="px-2 py-2" style="padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem;">Owners / Supply</th>
                </tr>
              </thead>
              <tbody class="">
              `

  data.forEach((e) => {
    html += `
                <tr>
                  <td class="pr-2 py-2 pl-2 text-left font-medium" style="padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0.5rem; padding-right: 0.5rem; text-align: left; font-weight: 500;" align="left">
                    ${e.collection}
                  </td>
                  <th class="py-2 font-medium" style="padding-top: 0.5rem; padding-bottom: 0.5rem; font-weight: 500;">${e.avgSale}</th>
                  <th class="py-2 font-medium text-green" style="padding-top: 0.5rem; padding-bottom: 0.5rem; font-weight: 500; --tw-text-opacity: 1; color: rgb(28 197 0 / var(--tw-text-opacity));">${e.avgSaleChange}</th>
                  <th class="py-2 font-medium" style="padding-top: 0.5rem; padding-bottom: 0.5rem; font-weight: 500;">${e.volume}</th>
                  <th class="py-2 font-medium" style="padding-top: 0.5rem; padding-bottom: 0.5rem; font-weight: 500;">${e.totalSales}</th>
                  <th class="py-2 font-medium" style="padding-top: 0.5rem; padding-bottom: 0.5rem; font-weight: 500;">${e.ownersSupply}</th>
                </tr>
                `
  })

  html += `
              </tbody>
            </table>
          </div>
          <div class="border-t w-12 rounded-full border-grey mx-auto mt-12" style="margin-left: auto; margin-right: auto; margin-top: 3rem; width: 3rem; border-radius: 9999px; border-top-width: 1px; --tw-border-opacity: 1; border-color: rgb(125 125 125 / var(--tw-border-opacity));"></div>
        </div>
      </div>
    </body>
  </html>
  `

  return html
}
