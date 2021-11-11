import React from 'react'
import { StyleSheet, View } from 'react-native'

const ListItemSeparator = () => {
  return <View style={styles.container} />
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgray',
  },
})

export default ListItemSeparator
