import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenContainerProps {
  children: JSX.Element;
}

const ScreenContainer = (props: ScreenContainerProps) => {
  return <SafeAreaView>{props.children}</SafeAreaView>;
};

export default ScreenContainer;
