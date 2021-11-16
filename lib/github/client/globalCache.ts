/**
 * I do not like mutable variables.
 * There are some times they're _very_ difficult to get around.
 *
 * One of those times is when instantiating a cache with the Apollo Client
 * that requires async operations (persistence).
 *
 * As such, this module serves as a cache for a our cache. Basically
 * a local copy of the cache that we can consume from other parts of our application
 * where the initially initialized (?) cache is isn't readily available.
 */

import { gql, InMemoryCache } from '@apollo/client'
import { RepoSearchResult } from '.'

/**
 * Mutable cache instance.
 * We have to be very careful with operations on this to ensure
 * it is actually an InMemoryCache instance.
 */
let _cacheInstance: InMemoryCache | null = null

/**
 * Operations
 * These are actions we take directly on the cache instance
 * (Primarily used for local state management)
 */
export const setCacheInstance = (cache: InMemoryCache): void => {
  _cacheInstance = cache
}

export const toggleFavorite = (
  repository: RepoSearchResult,
  isFavorite: boolean
) => {
  _cacheInstance?.writeFragment({
    id: _cacheInstance.identify(repository),
    broadcast: true,
    data: { isFavorite },
    fragment: gql`
      fragment RepositoryFavorite on Repository {
        isFavorite
      }
    `,
  })
}

export const setLastViewedRelease = (
  repository: RepoSearchResult,
  lastViewedRelease: string
) => {
  _cacheInstance?.writeFragment({
    id: _cacheInstance.identify(repository),
    broadcast: true,
    data: { lastViewedRelease },
    fragment: gql`
      fragment RepositoryLastSeenRelease on Repository {
        lastViewedRelease
      }
    `,
  })
}
