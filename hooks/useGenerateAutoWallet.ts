import {cryptoWaitReady} from '@polkadot/util-crypto';
import {useCallback, useState} from 'react';
import {AutoWallet, generateAutoWallet} from '../lib/wallet';

export const useGenerateAutoWallet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [autoWallet, setAutoWallet] = useState<AutoWallet>();

  const generate = useCallback(async () => {
    try {
      setIsLoading(true);
      await cryptoWaitReady(); // Wait for WASM crypto initialization

      const novaEvmDomainRpcApiUrl =
        'https://nova.gemini-3g.subspace.network/ws';
      const autoWalletData = await generateAutoWallet(
        novaEvmDomainRpcApiUrl,
        5,
      );
      setAutoWallet(autoWalletData);
      console.log('Subspace address:', autoWalletData.subspaceAddress);
      console.log('EVM addresses:', autoWalletData.evmAddresses);
      console.log('Auto ID:', autoWalletData.autoId);

      console.log('resolved');
      setAutoWallet(autoWalletData);
      return autoWalletData;
    } catch (e) {
      setError(e as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {autoWallet, isLoading, error, generate};
};
