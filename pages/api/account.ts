import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  // Check that user is logged in
  if (!session) {
    res.status(401)
    res.end()
    return
  }

  const address: string = String(session.address)

  if (req.method == 'POST') {
    const body = JSON.parse(JSON.stringify(req.body))
    const result = await post(address, body)
    if (result === true) {
      res.status(200)
    } else {
      res.status(500).send(result)
    }
  } else if (req.method == 'GET') {
    const user = await get(address)
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(200).send({})
    }
  } else {
    res.status(405).send({ message: 'Only POST or GET requests allowed' })
  }
}

async function get(address: string): Promise<User | null> {
  const result = await prisma.user.findUnique({
    where: {
      address: address
    },
    include: {
      collections: true
    }
  })

  return result
}

async function post(address: string, data: any): Promise<boolean | any> {
  let toUpdate: any = {}
  let toCreate: any = {
    address: address
  }

  if (data.email) {
    toUpdate.email = data.email
    toCreate.email = data.email
  }
  if (data.receiveReports) {
    toUpdate.receiveReports = data.receiveReports
    toCreate.receiveReports = data.receiveReports
  }
  if (data.collections) {
    let upsert = []

    for (const collection of data.collections) {
      upsert.push({
        create: collection,
        update: collection,
        where: { address: collection.address }
      })
    }

    toUpdate.collections.upsert = upsert
    toCreate.collections.create = data.collections
  }

  console.log(toUpdate)
  console.log(toCreate)

  await prisma.user.upsert({
    where: {
      address: address
    },
    update: toUpdate,
    create: toCreate
  })
}
