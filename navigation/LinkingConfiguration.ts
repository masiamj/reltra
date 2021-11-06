/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';
import { SEARCH_REPOSITORIES, TRACKED_REPOSITORIES } from './screenNames';

const linking = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      [SEARCH_REPOSITORIES]: 'search-repositories',
      [TRACKED_REPOSITORIES]: 'tracked-repositories',
    },
  },
};

export default linking;
