import React from 'react'
import Icon from '@expo/vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native'

interface FavoriteButtonProps {
  isFavorite: boolean
  onPress: () => void
}

const FavoriteButton = (props: FavoriteButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Icon
        name={props.isFavorite ? 'heart' : 'heart-o'}
        color={props.isFavorite ? 'red' : 'gray'}
        size={28}
      />
    </TouchableOpacity>
  )
}

export default FavoriteButton
