/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Box,
  Button,
  Input,
  NativeBaseProvider,
  Spacer,
  Text,
} from 'native-base';
import {getAutoIdFromSeed} from './lib/did';

type AppStackParamList = {
  Home: undefined;
  Chat: {autoId: string | bigint};
};

type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

interface HomeScreenProps extends AppStackScreenProps<'Home'> {}
const HomeScreen = ({navigation}: HomeScreenProps) => {
  const onNavigate = () => {
    const autoId = getAutoIdFromSeed('hello everyone');
    navigation.navigate('Chat', {autoId});
  };
  return (
    <Spacer
      padding={4}
      gap="2"
      flex={1}
      justifyContent="center"
      alignItems="center"
      width="full">
      <Button width="full" backgroundColor="purple.600" onPress={onNavigate}>
        Already registred
      </Button>
      <Button
        width="full"
        variant="outline"
        borderColor="purple.600"
        color="purple.600"
        onPress={onNavigate}>
        Register
      </Button>
    </Spacer>
  );
};
const ChatScreen = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>();

  const onSend = () => {
    if (!message) {
      return;
    }
    setMessages(prev => [...prev, message]);
    setMessage('');
  };
  return (
    <Box height="full" backgroundColor="gray.200">
      <Box height="full" p={2}>
        {messages.map((messageText, index) => (
          <Text key={index}>{messageText}</Text>
        ))}
      </Box>
      <Spacer
        marginTop="auto"
        display="flex"
        flexDirection="row"
        width="full"
        px="1"
        paddingBottom="1"
        alignItems="center">
        <Input
          placeholder="How can I help you?"
          size="xl"
          width="5/6"
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <Button size="md" marginLeft="1" onPress={onSend}>
          Send
        </Button>
      </Spacer>
    </Box>
  );
};
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {/* <SafeAreaView style={backgroundStyle}> */}
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
        {/* </SafeAreaView> */}
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
