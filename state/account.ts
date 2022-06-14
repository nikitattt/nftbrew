import { Collection } from '@prisma/client'
import create from 'zustand'

export interface AccountState {
  collections: Array<Collection>
  setCollections: (collections: Array<Collection>) => void
  addCollection: (collection: Collection) => void
  removeCollection: (collection: Collection) => void
}

export const useAccountStore = create<AccountState>((set, get) => ({
  collections: [],
  setCollections: (collections: Array<Collection>) =>
    set({ collections: collections }),
  addCollection: (collection: Collection) => {
    if (!get().collections.some((e) => e.address === collection.address)) {
      set({ collections: [...get().collections!, collection] })
    }
  },
  removeCollection: (collection: Collection) =>
    set({
      collections: get().collections.filter((obj) => {
        return obj !== collection
      })
    })
}))
