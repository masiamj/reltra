import { RepoSearchResult } from '@lib/github'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface LanguageBadgeProps {
  language: RepoSearchResult['primaryLanguage']
}

const LanguageBadge = (props: LanguageBadgeProps) => {
  const { language } = props

  const textColor = useMemo(
    () => (language.name === 'JavaScript' ? 'black' : 'white'),
    [language.name]
  )

  return (
    <View style={[styles.container, { backgroundColor: language.color }]}>
      <Text style={[styles.text, { color: textColor }]}>{language.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  text: {
    fontSize: 8,
    fontWeight: '500',
    textAlign: 'center',
  },
})

export default LanguageBadge
