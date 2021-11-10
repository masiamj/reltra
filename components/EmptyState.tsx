/**
 * This is a relatively generic EmptyState that will be used in the
 * case of an empty list in this application.
 *
 * It's tempting to add a _large_ number of props to a component like this
 * and make it extremely configurable to meet every use case.
 *
 * I've found that quickly gets out of hand and increases cognitive overhead.
 *
 * Instead, I prefer small API footprints and duplication if we need an empty state
 * for a specific use-case.
 *
 * One nifty trick I included in here is the `activeOpacity` prop on the `TouchableOpacity`.
 * By default, the opacity change on press on iOS is very stark, this lightens the effect up a bit
 * for a more pleasant experience :)
 */
import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface EmptyStateProps {
  actionText?: string
  animationSource?: string
  containerStyle?: object
  copy: string
  onTakeAction?: () => void
}

const EmptyState = (props: EmptyStateProps) => {
  const {
    actionText,
    animationSource,
    containerStyle = {},
    copy,
    onTakeAction,
  } = props

  const animation = useRef<LottieView>(null)

  useEffect(() => {
    animation?.current?.play()
  }, [])

  return (
    <View style={[styles.container, containerStyle]}>
      {animationSource && (
        <LottieView
          ref={animation}
          source={animationSource}
          style={{ width: '100%', height: '100%' }}
        />
      )}
      <Text style={styles.text}>{copy}</Text>
      {actionText && onTakeAction ? (
        <TouchableOpacity
          onPress={onTakeAction}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{actionText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 12,
    justifyContent: 'center',
    marginTop: 8,
    padding: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 12,
    textAlign: 'center',
    opacity: 0.5,
  },
})

export default EmptyState
