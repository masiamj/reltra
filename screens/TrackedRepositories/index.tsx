import React, { useCallback } from 'react'
import Header from './components/Header'
import ScreenContainer from '@components/ScreenContainer'
import { SEARCH_REPOSITORIES } from '@navigation/screenNames'
import { FlatList, StyleSheet } from 'react-native'
import EmptyState from '@components/EmptyState'

interface TrackedRepositoriesProps {
  navigation: any
}

const TrackedRepositories = (props: TrackedRepositoriesProps) => {
  const { navigation } = props

  const navigateToAddRepo = useCallback(() => {
    navigation.push(SEARCH_REPOSITORIES)
  }, [])

  return (
    <ScreenContainer>
      <Header onPressAdd={navigateToAddRepo} />
      <FlatList
        style={styles.list}
        data={[]}
        renderItem={() => null}
        ListEmptyComponent={
          <EmptyState
            actionText="Track your first repo"
            animationSource={require('@assets/lotties/dj.json')}
            containerStyle={{ marginTop: '30%' }}
            copy="Let's get this party started"
            onTakeAction={navigateToAddRepo}
          />
        }
      />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  list: {
    marginTop: 16,
  },
})

export default TrackedRepositories
