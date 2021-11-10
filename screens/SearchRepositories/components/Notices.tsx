import React from 'react'
import { StyleSheet, View } from 'react-native'
import { RepoSearchResult } from '@lib/github'
import NoticeBadge from '@components/NoticeBadge'

interface NoticesProps {
  repo: RepoSearchResult
}

const Notices = (props: NoticesProps) => {
  const { repo } = props
  return (
    <View style={styles.container}>
      {repo.stargazers_count > 0 && (
        <NoticeBadge prefix="🤩" copy={`${repo.stargazers_count} stargazers`} />
      )}
      {repo.open_issues_count > 10 && (
        <NoticeBadge prefix="⚠️" copy={`${repo.open_issues_count} issues`} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
  },
})

export default Notices
