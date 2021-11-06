/**
 * A header component specific to the TrackedRepositories screen.
 * Generic headers can be placed in the @components directory because they are shared.
 *
 * I tend to favor duplication over abstraction (until it's obvious abstraction is necessary),
 * so for very specific components, I like to nest them in the context in which they're used.
 *
 * Additionally, note the use of `Icon` here. One thing I'm very conscious of is difficult tap targets.
 * Because of that, I chose to extend the tap target of the Icon component to be all area
 * to the right of the title using a custom implementation of an Icon wrapped in a TouchableOpacity.
 */
import React from 'react';
import Icon from '@expo/vector-icons/Feather';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  onPressAdd: () => void;
}

const Header = (props: HeaderProps) => {
  const { onPressAdd } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tracked Repositories</Text>
      <TouchableOpacity onPress={onPressAdd} style={styles.buttonContainer}>
        <Icon name="plus-circle" size={32} />
      </TouchableOpacity>
    </View>
  );
};

/**
 * I'd normally create a design system with strongly-typed typography,
 * buttons, icons, colors, platform-specific differences, and responsiveness.
 *
 * For sake of time in this project, I just hard-coded the styles.
 */
const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'flex-end',
    flex: 1,
    paddingRight: 12,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 36,
    fontWeight: '800',
  },
});

export default Header;
