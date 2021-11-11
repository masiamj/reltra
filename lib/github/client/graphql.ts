import { GITHUB_PERSONAL_ACCESS_TOKEN } from '@env'
import { graphql } from '@octokit/graphql'

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
 * Default Octokit client config
 * We make the client configurable at runtime for testing purposes
 */
const createClient = ({ authorization }: { authorization: string }) => {
  return graphql.defaults({
    headers: {
      authorization,
    },
  })
}

/**
 * Reusable, configured GitHub GraphQL API client
 */
const client = createClient({
  authorization: `token ${GITHUB_PERSONAL_ACCESS_TOKEN}`,
})

/**
 * Searches GitHub repositories by keyword
 */
export const searchRepos = async ({
  query,
}: {
  query: string
}): Promise<{ results: Array<RepoSearchResult> }> => {
  try {
    /**
     * I'm not that familiar with the GitHub Octokit API Client; however,
     * in Apollo world, this would be a great use case for fragments!
     * https://www.apollographql.com/docs/react/data/fragments/
     */
    const {
      search: { nodes },
    } = await client(
      `
        query Search($searchPhrase: String!) {
          search(first: 25, type: REPOSITORY, query: $searchPhrase) {
            nodes {
              __typename
              ... on Repository {
                description
                homepageUrl
                id
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
            }
          }
        }
      `,
      {
        searchPhrase: query,
      }
    )
    return { results: nodes }
  } catch (error) {
    console.log(error)
    throw new Error('There was an issue searching repos')
  }
}
