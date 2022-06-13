import create from 'zustand'

export interface AccountState {
  email: undefined | string
  receiveReports: undefined | boolean
  collections: undefined | Array<string>
  setEmail: (email: string) => void
  setReceiveReports: (value: boolean) => void
  setCollections: (collections: Array<string>) => void
}

export const accountStore = create<AccountState>((set) => ({
  email: undefined,
  receiveReports: undefined,
  collections: undefined,
  setEmail: (email: string) => set({ email: email }),
  setReceiveReports: (value: boolean) => set({ receiveReports: value }),
  setCollections: (collections: Array<string>) =>
    set({ collections: collections })
}))
