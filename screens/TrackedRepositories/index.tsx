import React, { useCallback } from 'react';
import Header from './components/Header';
import ScreenContainer from '@components/ScreenContainer';
import { SEARCH_REPOSITORIES } from '@navigation/screenNames';

interface TrackedRepositoriesProps {
  navigation: any;
}

const TrackedRepositories = (props: TrackedRepositoriesProps) => {
  const { navigation } = props;

  const navigateToAddRepo = useCallback(() => {
    navigation.push(SEARCH_REPOSITORIES);
  }, []);

  return (
    <ScreenContainer>
      <Header onPressAdd={navigateToAddRepo} />
    </ScreenContainer>
  );
};

export default TrackedRepositories;
