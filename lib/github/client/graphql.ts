import { GITHUB_PERSONAL_ACCESS_TOKEN } from '@env'
import { graphql } from '@octokit/graphql'

/**
 * A ~private~ helper function that constructs an enhanced Octokit client.
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

export const searchRepos = async ({ query }: { query: string }) => {
  try {
    const {
      search: { nodes },
    } = await client(
      `
        query Search($searchPhrase: String!) {
          search(first: 25, type: REPOSITORY, query: $searchPhrase) {
            nodes {
              __typename
              ... on Repository {
                createdAt
                description
                forkCount
                homepageUrl
                id
                latestRelease {
                  createdAt
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
                owner {
                  avatarUrl(size: 80)
                  id
                  login
                  url
                }
                primaryLanguage {
                  id
                  color
                  name
                }
                releases(
                  first: 1
                  orderBy: { field: CREATED_AT, direction: DESC }
                ) {
                  nodes {
                    createdAt
                    id
                    name
                    publishedAt
                    tagCommit {
                      id
                      message
                      messageHeadline
                      pushedDate
                    }
                    tagName
                    updatedAt
                  }
                }
                updatedAt
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
