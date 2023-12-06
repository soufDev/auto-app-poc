import {Button, Spacer, Text} from 'native-base';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useGenerateAutoWallet} from '../hooks/useGenerateAutoWallet';
import {AppStackScreenProps} from '../navigators/AppNavigator';

interface HomeScreenProps extends AppStackScreenProps<'Home'> {}
export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const {isLoading, error, generate} = useGenerateAutoWallet();
  const onNavigate = async () => {
    const autoWallet = await generate();
    // const autoWallet = await generate();
    navigation.navigate('Chat', {autoWallet});
  };

  if (isLoading) {
    <ActivityIndicator color="purple" size="large" />;
  }

  return (
    <Spacer
      padding={4}
      gap="2"
      flex={1}
      justifyContent="center"
      alignItems="center"
      width="full">
      <Button
        width="full"
        backgroundColor="purple.600"
        onPress={onNavigate}
        isDisabled={isLoading}>
        <Spacer display="flex" flexDirection="row" gap={2}>
          <Text>Already registred</Text>
          {isLoading && <ActivityIndicator size="small" color="white" />}
        </Spacer>
      </Button>
      <Button
        width="full"
        variant="outline"
        borderColor="purple.600"
        color="purple.600"
        onPress={onNavigate}
        isDisabled={isLoading}>
        Register
      </Button>
      {error ? (
        <Text color="red.600" fontSize="lg">
          Error occured: {error.message} {error.name}
        </Text>
      ) : null}
    </Spacer>
  );
};
