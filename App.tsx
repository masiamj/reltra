import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './navigation'
import useColorScheme from './hooks/useColorScheme'
import useCachedResources from './hooks/useCachedResources'

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider>
          <Navigation colorScheme={colorScheme} />
        </ThemeProvider>
        <StatusBar />
      </SafeAreaProvider>
    )
  }
}
