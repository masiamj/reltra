import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenContainerProps {
  children: JSX.Element | Array<JSX.Element>;
}

const ScreenContainer = (props: ScreenContainerProps) => {
  return <SafeAreaView style={{ flex: 1 }}>{props.children}</SafeAreaView>;
};

export default ScreenContainer;
