import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RepoSearchResult, viewRepoInWebBrower } from '@lib/github';
import LanguageBadge from '@components/LangugageBadge';
import Notices from './Notices';
import FavoriteButton from '@components/FavoriteButton';

interface RepoSearchResultProps {
  onAdd?: (repo: RepoSearchResult) => void;
  repo: RepoSearchResult;
}

const RepoSearchResultItem = (props: RepoSearchResultProps) => {
  const { onAdd, repo } = props;

  const viewOnTheWeb = useCallback(async () => {
    await viewRepoInWebBrower(repo);
  }, [repo]);

  const onPressFavorite = useCallback(() => {
    // onAdd(repo)
  }, [onAdd, repo]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onLongPress={viewOnTheWeb}
      style={styles.container}
    >
      <View style={styles.favoriteContainer}>
        <FavoriteButton isFavorite onPress={onPressFavorite} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{repo.name}</Text>
        <Text style={styles.description}>{repo.description}</Text>
        <Notices repo={repo} />
      </View>
      <View style={styles.languageContainer}>
        {repo.language && <LanguageBadge language={repo.language} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  content: {
    flexDirection: 'column',
    width: '60%',
    marginRight: 8,
  },
  description: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
  favoriteContainer: {
    width: '8%',
  },
  languageContainer: {
    width: '20%',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default RepoSearchResultItem;
