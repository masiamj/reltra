/**
 * This hook abstracts application logic of searching repositories
 * into a clean, minimal, testable interface.
 */
import { useCallback, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import proxyWithPersist, { PersistStrategy } from 'valtio-persist'
import { RepoSearchResult } from '@lib/github'
import { asyncStorageAdapter } from '@lib/state'

interface UseFavoriteRepositories {
  favoriteRepositories: Array<RepoSearchResult>
  isFavorited: (repository: RepoSearchResult) => boolean
  toggleFavorite: (repository: RepoSearchResult) => void
}

const initialLatestReleases: { [id: string]: RepoSearchResult } = {}

const store = proxyWithPersist({
  getStorage: () => asyncStorageAdapter,
  initialState: {
    ids: new Set<string>([]),
    latestReleases: initialLatestReleases,
  },
  migrations: {},
  name: 'favoriteRepositories',
  persistStrategies: PersistStrategy.SingleFile,
  version: 0,
})

const useFavoriteRepositories = (): UseFavoriteRepositories => {
  const all = useSnapshot(store)
  const {
    ids: favoriteIds,
    _persist: { loaded },
  } = all

  useEffect(() => {
    console.log('Finally loaded')
  }, [loaded])

  const favoriteRepository = useCallback((repository: RepoSearchResult) => {
    // latestReleases[repository.id] = repository
    favoriteIds.add(repository.id)
  }, [])

  const isFavorited = useCallback(
    (repository: RepoSearchResult) => favoriteIds.has(repository.id),
    []
  )

  const toggleFavorite = useCallback((repository: RepoSearchResult) => {
    const action = isFavorited(repository)
      ? unfavoriteRepository
      : favoriteRepository
    // console.log(repository)
    action(repository)
  }, [])

  const unfavoriteRepository = useCallback((repository: RepoSearchResult) => {
    // Remove the Repo from storage?
    favoriteIds.delete(repository.id)
  }, [])

  return {
    favoriteRepositories: [],
    isFavorited,
    toggleFavorite,
  }
}

export default useFavoriteRepositories
