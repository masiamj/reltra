import { gql } from '@apollo/client'

/**
 * An extensible type we can expose as the return value
 * of our repository search function
 */
export type RepoSearchResult = {
  createdAt: string
  description: string
  forkCount: number
  homepageUrl: string
  id: string
  isFavorite: boolean
  lastViewedRelease: string | null
  latestRelease: {
    createdAt: string
    id: string
    name: string
    publishedAt: string
    tag: {
      id: string
      name: string
    }
    tagCommit: {
      committedDate: string
      id: string
      message: string
      messageHeadline: string
    }
    tagName: string
    updatedAt: string
  }
  name: string
  openGraphImageUrl: string
  owner: {
    avatarUrl: string
    id: string
    login: string
    url: string
  }
  primaryLanguage: {
    id: string
    color: string
    name: string
  }
  updatedAt: string
  url: string
}

/**
 * Note the use of the @client directive for a local-only field
 * We use this to collate all state management into our reactive
 * queries.
 * https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/
 */
export const repositoryFields = gql`
  fragment repositoryFields on Repository {
    description
    homepageUrl
    id
    isFavorite @client
    lastViewedRelease @client
    latestRelease {
      createdAt
      id
      name
      publishedAt
      tag {
        id
        name
      }
      tagCommit {
        committedDate
        id
        message
        messageHeadline
      }
      tagName
    }
    name
    openGraphImageUrl
    primaryLanguage {
      id
      color
      name
    }
    url
  }
`
