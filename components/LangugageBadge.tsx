import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface LanguageBadgeProps {
  language: string
}

const LanguageBadge = (props: LanguageBadgeProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.language}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  text: {
    color: 'darkblue',
    fontSize: 10,
    fontWeight: '500',
  },
})

export default LanguageBadge
