import 'react-native-url-polyfill/auto'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './navigation'
import useColorScheme from './hooks/useColorScheme'
import useCachedResources from './hooks/useCachedResources'
import useGitHubClient, { defaultConfig } from '@hooks/useGitHubClient'

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  const { client, initialized } = useGitHubClient(defaultConfig)

  if (!isLoadingComplete || !initialized) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client as ApolloClient<NormalizedCacheObject>}>
          <Navigation colorScheme={colorScheme} />
        </ApolloProvider>
        <StatusBar />
      </SafeAreaProvider>
    )
  }
}
