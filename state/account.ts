import { Collection } from '@prisma/client'
import create from 'zustand'

export interface AccountState {
  collections: Array<Collection>
  setCollections: (collections: Array<Collection>) => void
  addCollection: (collection: Collection) => void
}

export const useAccountStore = create<AccountState>((set, get) => ({
  collections: [],
  setCollections: (collections: Array<Collection>) =>
    set({ collections: collections }),
  addCollection: (collection: Collection) =>
    set({ collections: [...get().collections!, collection] })
}))
