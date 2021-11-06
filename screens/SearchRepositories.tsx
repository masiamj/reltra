import debounce from 'lodash/debounce';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import ModalStatusBar from '@components/ModalStatusBar';
import Container from '@components/Container';

export default function SearchRepositories() {
  const [inputValue, _setInputValue] = useState('');

  const setInputValue = useMemo(
    () => debounce(_setInputValue, 250),
    [_setInputValue]
  );

  useEffect(() => {
    if (!!inputValue) {
    }
  }, [inputValue]);

  return (
    <Container>
      <TextInput
        autoFocus
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        clearButtonMode="always"
        selectionColor="black"
        onChangeText={setInputValue}
        placeholder="Search GitHub repos and users"
        returnKeyType="search"
        style={styles.textInput}
      />
      <ModalStatusBar />
    </Container>
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 24,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
});
