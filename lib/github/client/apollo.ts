import {
  ApolloClient,
  InMemoryCache,
  from,
  NormalizedCacheObject,
  HttpLink,
} from '@apollo/client'
import DebounceLink from 'apollo-link-debounce'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AsyncStorageWrapper, CachePersistor } from 'apollo3-cache-persist'
import { GITHUB_PERSONAL_ACCESS_TOKEN } from '@env'

export interface GitHubClientConfig {
  authorizationToken: string
  links: typeof defaultLinks
  uri: string
}

interface CreateClientResult {
  client: ApolloClient<NormalizedCacheObject>
  persistor: CachePersistor<NormalizedCacheObject>
}

/**
 * Authorization token for GitHub API access
 */
export const authorizationToken = GITHUB_PERSONAL_ACCESS_TOKEN

/**
 * Function that creates an Apollo Client with runtime config for testing ease :)
 */
export const createClient = async (
  config: GitHubClientConfig
): Promise<CreateClientResult> => {
  const cache = new InMemoryCache()

  /**
   * Implements automatic cache persistence to AsyncStorage
   */
  const persistor = new CachePersistor({
    cache,
    storage: new AsyncStorageWrapper(AsyncStorage),
  })

  await persistor.restore()

  /**
   * Appends HTTPLink to custom links
   */
  const link = config.links.concat(
    new HttpLink({
      headers: { authorization: `Bearer ${config.authorizationToken}` },
      uri: config.uri,
    })
  )

  const client = new ApolloClient({
    cache,
    link,
  })

  return { client, persistor }
}

/**
 * Default client enhancers
 */
export const defaultLinks = from([new DebounceLink(200)])

/**
 * Default GitHub GraphQL API
 */
export const uri = 'https://api.github.com/graphql'
