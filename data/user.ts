import { User } from '@prisma/client'
import useSWR, { mutate } from 'swr'

const fetcher = (apiUrl: string) => fetch(apiUrl).then((res) => res.json())

export interface UserReturnData {
  data: User
  isError: any
  isLoading: boolean
}

export function refresh(newData: any) {
  const options = { optimisticData: newData, rollbackOnError: true }
  mutate('/api/account', newData, options)
}

export function useUser() {
  const { data, error } = useSWR('/api/account', fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      if (error.status === 404) return

      // Never retry on 401.
      if (error.status === 401) return

      // Only retry up to 10 times.
      if (retryCount >= 10) return

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000)
    }
  })

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}

export async function upsertUserData(data: any): Promise<boolean> {
  const response = await fetch('/api/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (response.status === 200) {
    refresh(response)
    return true
  } else {
    return false
  }
}
