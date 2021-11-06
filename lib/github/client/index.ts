import { Octokit } from '@octokit/rest';
import consoleLogLevel from 'console-log-level';
import { components } from '@octokit/openapi-types';
import { throttling } from '@octokit/plugin-throttling';
import { requestLog } from '@octokit/plugin-request-log';

/**
 * Types
 */
type _schemas = components['schemas'];
type Repository = _schemas['repository'];
export type RepoSearchResult = _schemas['repo-search-result-item'];

/**
 * An extensible type we can expose as the return value
 * of our repository search function
 */
type RepositorySearchResults = {
  results: Array<RepoSearchResult>;
};

/**
 * Default Octokit client config
 * We make the client configurable at runtime for testing purposes (DI!)
 *
 * I'm choosing to use the Octokit throttling library here, but honestly I'd prefer
 * to use a higher-level circuit-breaker mechanism with more flexibility and introspectability.
 */
const defaultClientConfig = {
  baseUrl: 'https://api.github.com',
  log: consoleLogLevel({
    level: 'info',
  }),
  throttle: {
    onRateLimit: (retryAfter: number, options: any, octokit: Octokit) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );

      if (options.request.retryCount === 0) {
        octokit.log.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onAbuseLimit: (_retryAfter: number, options: any, octokit: Octokit) => {
      octokit.log.warn(
        `Abuse detected for request ${options.method} ${options.url}`
      );
    },
  },
};

/**
 * A ~private~ helper function that constructs an enhanced Octokit client.
 */
const createClient = (
  config: typeof defaultClientConfig = defaultClientConfig
): Octokit => {
  const withThrottling = Octokit.plugin(throttling);
  const withLogging = withThrottling.plugin(requestLog);
  return new withLogging(config);
};

/**
 * Reusable, configured GitHub API client
 */
const client: Octokit = createClient(defaultClientConfig);

/**
 * Searches GitHub repositories by keyword
 */
export const searchRepositories = async ({
  query,
}: {
  query: string;
}): Promise<RepositorySearchResults> => {
  try {
    const {
      data: { items },
    } = await client.rest.search.repos({ q: query });
    return { results: items };
  } catch (error) {
    /**
     * We want to capture errors in our external service integrations without
     * having to instrument every function in the app.
     *
     * An function with a strong interface that encapsulates integration logic
     * is a great place to handle that logic!
     *
     * I'd normally use an error-reporting integration like Sentry/BugSnag with
     * enough context that we can be notified quickly and debug effectively.
     *
     * errorReporting.log(error)
     */

    /**
     * Then, we bubble up a user-facing error to avoid exposing
     * implementation details to the user.
     *
     * The UI-layer can be responsible for displaying useful error messages to the user.
     */
    throw new Error(
      'There was an issue searching GitHub, please try again in a few minutes.'
    );
  }
};
