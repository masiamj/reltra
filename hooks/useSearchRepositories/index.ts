/**
 * This hook abstracts application logic of searching repositories
 * into a clean, minimal, testable interface.
 *
 * Consumers of this hook don't have to know anything about underlying
 * implementation details of data sources, debouncing, error handling, etc.
 *
 * I personally love this pattern to decouple UI-layer and application-logic-layer
 * concerns.
 */
import { get } from 'lodash'
import { useMemo, useState } from 'react'
import { ApolloError, gql, useQuery } from '@apollo/client'
import { repositoryFields, RepoSearchResult } from '@lib/github'

interface UseSearchRepositories {
  error: ApolloError | undefined
  loading: boolean
  search: (query: string) => void
  searchResults: Array<RepoSearchResult>
}

/**
 * GraphQL Query using Repository fields fragment for reusability
 */
const template = gql`
  ${repositoryFields}
  query Search($searchPhrase: String!) {
    search(first: 25, type: REPOSITORY, query: $searchPhrase) {
      nodes {
        __typename
        ... on Repository {
          ...repositoryFields
        }
      }
    }
  }
`

const useSearchRepositories = (): UseSearchRepositories => {
  const [searchPhrase, setSearchPhrase] = useState<string>('')
  const { data, error, loading } = useQuery(template, {
    skip: !searchPhrase,
    variables: { searchPhrase },
    context: {
      debounceKey: 'search_repositories',
    },
  })

  const searchResults: Array<RepoSearchResult> = useMemo(
    () => get(data, ['search', 'nodes'], []),
    [data]
  )

  return {
    error,
    loading,
    search: setSearchPhrase,
    searchResults,
  }
}

export default useSearchRepositories
