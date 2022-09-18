import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';

import React from 'react';

export const Routes = () => {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
};
