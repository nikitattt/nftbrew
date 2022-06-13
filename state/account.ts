import { Collection } from '@prisma/client'
import create from 'zustand'

export interface AccountState {
  email: undefined | string
  receiveReports: undefined | boolean
  collections: undefined | Array<Collection>
  setEmail: (email: string) => void
  setReceiveReports: (value: boolean) => void
  setCollections: (collections: Array<Collection>) => void
  addCollection: (collection: Collection) => void
}

export const useAccountStore = create<AccountState>((set, get) => ({
  email: undefined,
  receiveReports: undefined,
  collections: undefined,
  setEmail: (email: string) => set({ email: email }),
  setReceiveReports: (value: boolean) => set({ receiveReports: value }),
  setCollections: (collections: Array<Collection>) =>
    set({ collections: collections }),
  addCollection: (collection: Collection) =>
    set({ collections: [...get().collections!, collection] })
}))
