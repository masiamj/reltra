/**
 * This hook exposes a small interface of GraphQL-related
 * utilities concerning GitHub GraphQL API configuration, and
 * client-side state management/caching.
 */
import { CachePersistor } from 'apollo3-cache-persist'
import { useCallback, useEffect, useState } from 'react'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import useLatch from '@hooks/useLatch'
import {
  authorizationToken,
  createClient,
  defaultLinks,
  GitHubClientConfig,
  uri,
} from '@lib/github'

interface UseGitHubClient {
  client: ApolloClient<NormalizedCacheObject> | undefined
  initialized: boolean
  persistor: CachePersistor<NormalizedCacheObject> | undefined
  purge: () => Promise<void>
}

export const defaultConfig: GitHubClientConfig = {
  authorizationToken,
  links: defaultLinks,
  uri,
}

const useGitHubClient = (config: GitHubClientConfig): UseGitHubClient => {
  /**
   * Uses the latch as a unidirectional switch noting the client is initialized
   */
  const { on: initialized, trip } = useLatch()

  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>()
  const [persistor, setPersistor] =
    useState<CachePersistor<NormalizedCacheObject>>()

  /**
   * Async initialization of the client with runtime config
   */
  useEffect(() => {
    const initialize = async () => {
      const connections = await createClient(config)
      setClient(connections.client)
      setPersistor(connections.persistor)
      trip()
    }

    initialize()
  }, [])

  /**
   * Purges the persistence state from the device
   * (You'd normally do this on log-out)
   */
  const purge = useCallback(async () => {
    if (persistor) {
      await persistor.pause()
      await persistor.purge()
      await persistor.resume()
    }
  }, [persistor])

  return {
    client,
    initialized,
    persistor,
    purge,
  }
}

export default useGitHubClient
