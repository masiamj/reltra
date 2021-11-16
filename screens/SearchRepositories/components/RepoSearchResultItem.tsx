import React, { useCallback } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RepoSearchResult, viewRepoInWebBrower } from '@lib/github'
import LanguageBadge from '@components/LangugageBadge'
import FavoriteButton from '@components/FavoriteButton'

interface RepoSearchResultProps {
  onToggle: (repo: RepoSearchResult) => void
  repo: RepoSearchResult
}

const RepoSearchResultItem = (props: RepoSearchResultProps) => {
  const { onToggle, repo } = props

  const viewOnTheWeb = useCallback(async () => {
    await viewRepoInWebBrower(repo)
  }, [repo])

  const onPressFavorite = useCallback(() => {
    onToggle(repo)
  }, [onToggle, repo])

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
        <Image
          source={{ uri: repo.openGraphImageUrl }}
          style={styles.ogImage}
          resizeMode="cover"
        />
        <View style={styles.repoContent}>
          <Text style={styles.name}>{repo.name}</Text>
          <Text style={styles.description}>{repo.description}</Text>
        </View>
      </View>
      <View style={styles.languageContainer}>
        {repo.primaryLanguage && (
          <LanguageBadge language={repo.primaryLanguage} />
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  content: {
    flexDirection: 'row',
    width: '76%',
    paddingHorizontal: 12,
    marginHorizontal: 4,
  },
  description: {
    fontSize: 12,
    marginTop: 2,
    opacity: 0.7,
  },
  favoriteContainer: {
    width: '8%',
  },
  languageContainer: {
    width: '16%',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  ogImage: {
    borderRadius: 8,
    height: 28,
    width: 28,
  },
  repoContent: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: '80%',
    marginLeft: 8,
  },
})

export default RepoSearchResultItem
