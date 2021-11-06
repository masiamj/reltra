/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchRepositories from '@screens/SearchRepositories';
import LinkingConfiguration from './LinkingConfiguration';
import TrackedRepositories from '@screens/TrackedRepositories';
import { SEARCH_REPOSITORIES, TRACKED_REPOSITORIES } from './screenNames';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={TRACKED_REPOSITORIES}
        component={TrackedRepositories}
        options={{ headerShown: false }}
      />
      <Stack.Group
        screenOptions={{ headerShown: false, presentation: 'modal' }}
      >
        <Stack.Screen
          name={SEARCH_REPOSITORIES}
          component={SearchRepositories}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
