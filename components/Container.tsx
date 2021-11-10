import React from 'react'
import { View } from 'react-native'

interface ContainerProps {
  children: JSX.Element | Array<JSX.Element>
}

const Container = (props: ContainerProps) => {
  return <View style={{ flex: 1 }}>{props.children}</View>
}

export default Container
