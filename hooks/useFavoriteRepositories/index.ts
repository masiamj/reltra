import { useCallback } from 'react'
import { gql, useApolloClient } from '@apollo/client'
import { RepoSearchResult } from '@lib/github'

interface UseFavoriteRepositories {
  toggleFavorite: (repository: RepoSearchResult) => void
}

const useFavoriteRepositories = (): UseFavoriteRepositories => {
  const client = useApolloClient()

  const toggleFavorite = useCallback(
    (repository: RepoSearchResult) => {
      client.writeFragment({
        id: `Repository:${repository.id}`,
        broadcast: true,
        data: { isFavorite: !repository.isFavorite },
        fragment: gql`
          fragment RepositoryFavorite on Repository {
            isFavorite
          }
        `,
      })
    },
    [client]
  )

  return {
    toggleFavorite,
  }
}

export default useFavoriteRepositories
