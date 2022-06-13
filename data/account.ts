import useSWR, { mutate } from 'swr'

type Vote = {
  degen: string
  time: Date
}

type PersonVotesData = {
  lastVoteTime: Date
  votes: Array<Vote>
}

const fetcher = (apiUrl: string) => fetch(apiUrl).then((res) => res.json())

export interface PersonalVotesReturnData {
  data: PersonVotesData
  isError: any
  isLoading: boolean
}

export function refresh() {
  mutate('/api/vote-data/personal/get')
}

export function usePersonalVotes(): PersonalVotesReturnData {
  const { data, error } = useSWR('/api/vote-data/personal/get', fetcher, {
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

  if (data) {
    let personalData: PersonVotesData = JSON.parse(JSON.stringify(data))

    return {
      data: personalData,
      isLoading: !error && !data,
      isError: error
    }
  } else
    return {
      data: data,
      isLoading: !error && !data,
      isError: error
    }
}

export async function vote(degen: string): Promise<boolean> {
  const response = await fetch('/api/vote-data/personal/vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ degen: degen })
  })

  if (response.status === 200) {
    return true
  } else {
    return false
  }
}
