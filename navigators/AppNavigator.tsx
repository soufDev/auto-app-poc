import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import {AutoWallet} from '../lib/wallet';
import * as screens from '../screens';

export type AppStackParamList = {
  Home: undefined;
  Chat: {autoWallet?: AutoWallet};
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={screens.HomeScreen} />
      <Stack.Screen name="Chat" component={screens.ChatScreen} />
    </Stack.Navigator>
  );
};
