/* eslint-disable @typescript-eslint/no-unused-vars */
import '@ethersproject/shims';
import 'react-native-get-random-values';

import {Keyring} from '@polkadot/api';
import {mnemonicGenerate} from '@polkadot/util-crypto';
import {Mnemonic, ethers} from 'ethers';
import {getAutoIdFromSeed, getIdentityFromSeed} from './did';

/**
 * TODO: Check for Auto ID if added on-chain to one of the EVM domains
 * (where DID registry is deployed).
 *
 * @param api The RPC API URL of the main EVM domain
 * @param seedPhrase The seed phrase used to generate the addresses to derive the identity
 * @returns True if the Auto ID exists on-chain, false otherwise
 */
async function checkIfAutoIdExistsOnChain(
  api: string,
  seedPhrase: string,
): Promise<boolean> {
  // TODO: connect to the main EVM domain (where DID registry is deployed)

  // get the identity from seed phrase
  const identity = getIdentityFromSeed(seedPhrase);

  // get the commitment
  const commitment = identity.commitment;

  // get the nullifier hash (poseidon)
  const nullifier = identity.nullifier;
  // get nullifier hash (poseidon) from the identity

  // call the DID registry contract to check if the identity exists

  // doesn't exist by default
  return false;
}

/**
 * Generates Ethereum addresses from a given seed phrase following BIP-32.
 *
 * @param seedPhrase - The seed phrase used to generate the addresses.
 * @param numOfAddresses - The number of addresses to generate.
 * @returns An array of generated Ethereum addresses.
 */

const deferAsyncTask = <T>(task: () => T) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(task()));
  });
};
export async function generateEvmAddressesFromSeed(
  seedPhrase: string,
  numOfAddresses: number,
): Promise<string[]> {
  console.log('seedPhrase', {seedPhrase});
  const addresses: string[] = [];
  const mnemonic = await deferAsyncTask(() => Mnemonic.fromPhrase(seedPhrase)); // Convert the seed phrase to mnemonic
  const masterNode = (await deferAsyncTask(() =>
    ethers.HDNodeWallet.fromMnemonic(mnemonic as Mnemonic),
  )) as ethers.HDNodeWallet; // Create a master node from the seed phrase

  for (let i = 0; i < numOfAddresses; i++) {
    const path = `m/44'/60'/0'/0/${i}`; // Standard Ethereum derivation path according to BIP-44
    const childNode = masterNode.derivePath(path); // Derive child node
    addresses.push(childNode.address); // Extract address from child node
  }

  return addresses;
}

/**
 * Generates a Subspace address from a given seed phrase.
 *
 * @param seedPhrase - The seed phrase used to generate the address.
 * @returns The Subspace address generated from the seed phrase.
 */
function generateSubspaceAddress(seedPhrase: string): string {
  // Create a keyring instance from the seed for the Subspace relay chain
  const keyring = new Keyring({type: 'sr25519'});

  // Add the user to the keyring from the seed phrase
  const user = keyring.addFromUri(seedPhrase);

  // Get the SS58 address from the keyring
  return user.address;
}

/**
 * Represents an AutoWallet object.
 */
export interface AutoWallet {
  subspaceAddress: string;
  evmAddresses: string[];
  autoId: string | bigint;
}

/**
 * Generate a new wallet with a random seed
 * returning the SS58 address and the EVM addresses
 * NOTE: for simplicity, considered only EVM based domains
 *
 * @param mainEvmDomainRpcApiUrl The RPC API URL of the main EVM domain
 * @param numOfEvmChains The number of EVM chains to generate addresses for
 * @returns The AutoWallet object
 */
export async function generateAutoWallet(
  mainEvmDomainRpcApiUrl: string,
  numOfEvmChains: number,
): Promise<AutoWallet> {
  let seedPhrase = '';

  // Loop until a valid Auto ID is generated
  while (true) {
    // Generate a new random seed phrase
    seedPhrase = (await deferAsyncTask(mnemonicGenerate)) as string;

    // TODO: Check for a valid Auto ID
    const isAutoIdPreExist = await checkIfAutoIdExistsOnChain(
      mainEvmDomainRpcApiUrl,
      seedPhrase,
    );

    if (!isAutoIdPreExist) {
      // break the loop if the Auto ID doesn't pre-exist onchain
      break;
    }
  }

  // TODO: store the seed phrase to IPFS peers via SSS scheme (store in a secure place)

  // get the Auto ID (valid that doesn't pre-existed onchain) from the seed phrase
  const autoId = getAutoIdFromSeed(seedPhrase);

  // Get the Subspace address from seed phrase
  const subspaceAddress = generateSubspaceAddress(seedPhrase);

  // Get the EVM addresses from the seed phrase (BIP-32)
  const evmAddresses = await generateEvmAddressesFromSeed(
    seedPhrase,
    numOfEvmChains,
  );

  return {subspaceAddress, evmAddresses, autoId};
}
