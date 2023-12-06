import {Box, Button, Input, Spacer, Text} from 'native-base';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStackScreenProps} from '../navigators/AppNavigator';

interface ChatScreenProps extends AppStackScreenProps<'Chat'> {}

export const ChatScreen = ({navigation, route}: ChatScreenProps) => {
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
    <SafeAreaView>
      <Spacer height="full" backgroundColor="gray.200" gap="2">
        <Button onPress={() => navigation.goBack()}>Go back</Button>
        <Box flexDirection="row">
          <Text fontFamily="bold" fontSize="lg">
            Auto ID:{' '}
          </Text>
          <Text>{route.params.autoWallet?.autoId.toString()}</Text>
        </Box>
        <Box flexDirection="row">
          <Text fontFamily="bold" fontSize="lg">
            Subspace Address:{' '}
          </Text>
          <Text>{route.params.autoWallet?.subspaceAddress}</Text>
        </Box>
        <Box flexDirection="row">
          <Text fontFamily="bold" fontSize="lg">
            Addresses:{' '}
          </Text>
          <Text>{route.params.autoWallet?.evmAddresses.join(' - ')}</Text>
        </Box>

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
      </Spacer>
    </SafeAreaView>
  );
};
