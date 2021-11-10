import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface NoticeBadgeProps {
  copy: string
  prefix: string // Notice the name `prefix`, it's generic, but descriptive
}

const NoticeBadge = (props: NoticeBadgeProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.prefix}>{props.prefix}</Text>
      <Text style={styles.text}>{props.copy}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 8,
    paddingVertical: 3,
  },
  prefix: {
    fontSize: 12,
  },
  text: {
    fontSize: 10,
    fontWeight: '500',
    marginLeft: 3,
  },
})

export default NoticeBadge
