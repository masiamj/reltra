import { get } from 'lodash/fp';
import { format } from 'date-fns';
import * as WebBrowser from 'expo-web-browser';
import { RepoSearchResult } from '..';

/**
 * Functional getter to extract the ID from an object
 */
const getId = get('id');

/**
 * Function that takes a date string returned from GitHub API
 * and formats it as "April 29th, 2021"
 */
export const formatDate = (date: string): string =>
  format(new Date(date), 'PPP');

/**
 * A reusable keyExtractor for tracking items in a virtualized list
 * https://reactnative.dev/docs/flatlist#keyextractor
 */
export const repositoryKeyExtractor = getId;

/**
 * Note the explicity of the name, and the fact that we pass in the entire RepoSearchResult
 * object. While this may seem unnecessary, it gives us flexibility in the future if we
 * want to add analytics or other hidden facets from the consumer of this function.
 */
export const viewRepoInWebBrower = async (repo: RepoSearchResult) => {
  try {
    // Maybe add analytics?
    WebBrowser.openBrowserAsync(repo.html_url);
  } catch (error) {
    // Log the error
    alert(`We're unable to open that link right now.`);
  }
};
