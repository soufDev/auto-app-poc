/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {AppStack} from './navigators/AppNavigator';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AppStack />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
