/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {
  Box,
  Button,
  Input,
  NativeBaseProvider,
  Spacer,
  Text,
} from 'native-base';
import {Colors} from 'react-native/Libraries/NewAppScreen';

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
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <ChatScreen />
        </SafeAreaView>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
