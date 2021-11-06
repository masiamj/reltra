/**
 * Screen responsible for UI-layer of searching repositories
 * for the user to track.
 *
 * The custom useSearchRepositories hook decouples this UI-layer logic
 * from any implementation details of how to perform search.
 */
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import Container from '@components/Container';
import EmptyState from '@components/EmptyState';
import { repositoryKeyExtractor } from '@lib/github';
import ModalStatusBar from '@components/ModalStatusBar';
import useSearchRepositories from '@hooks/useSearchRepositories';
import RepoSearchResultItem from './components/RepoSearchResultItem';

export default function SearchRepositories() {
  const {
    error,
    loading,
    search,
    searchResults = [],
  } = useSearchRepositories();

  /**
   * Handling errors is always interesting!
   *
   * If an error bubbles up through the stack, all this screen has to do is choose
   * how it presents itself to the user.
   *
   * This can be via a UI components, toast, or really anything!
   *
   * In this case, if we receive an error, we're just going to use the default
   * system `alert` function to show a popup notifying the user.
   */
  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  return (
    <Container>
      <TextInput
        autoFocus
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        clearButtonMode="always"
        selectionColor="black"
        onChangeText={search}
        placeholder="Search GitHub repos"
        returnKeyType="search"
        style={styles.textInput}
      />
      <FlatList
        contentContainerStyle={{ paddingBottom: 24 }}
        style={styles.list}
        data={searchResults}
        keyExtractor={repositoryKeyExtractor}
        refreshing={loading}
        renderItem={({ item }) => <RepoSearchResultItem repo={item} />}
        ListEmptyComponent={
          <EmptyState
            containerStyle={{ marginTop: '10%' }}
            copy={loading ? 'Loading...' : 'No search results found'}
          />
        }
      />
      <ModalStatusBar />
    </Container>
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 24,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  list: {
    marginTop: 16,
  },
});
