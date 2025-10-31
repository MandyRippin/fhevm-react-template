'use client';

import { useState, useCallback } from 'react';
import { useFHE } from './useFHE';
import type { EncryptionResult } from '../types/fhe';

export const useEncryption = (contractAddress: string, userAddress: string) => {
  const { fheClient, isReady } = useFHE();
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [encryptionError, setEncryptionError] = useState<Error | null>(null);

  const encryptValue = useCallback(
    async (value: number, bitSize: 8 | 16 | 32 | 64 = 32): Promise<EncryptionResult | null> => {
      if (!fheClient || !isReady) {
        setEncryptionError(new Error('FHE client not ready'));
        return null;
      }

      setIsEncrypting(true);
      setEncryptionError(null);

      try {
        const result = await fheClient.encryptValue(value, contractAddress, userAddress, bitSize);
        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Encryption failed');
        setEncryptionError(err);
        return null;
      } finally {
        setIsEncrypting(false);
      }
    },
    [fheClient, isReady, contractAddress, userAddress]
  );

  const encryptBoolean = useCallback(
    async (value: boolean): Promise<EncryptionResult | null> => {
      if (!fheClient || !isReady) {
        setEncryptionError(new Error('FHE client not ready'));
        return null;
      }

      setIsEncrypting(true);
      setEncryptionError(null);

      try {
        const result = await fheClient.encryptBoolean(value, contractAddress, userAddress);
        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Boolean encryption failed');
        setEncryptionError(err);
        return null;
      } finally {
        setIsEncrypting(false);
      }
    },
    [fheClient, isReady, contractAddress, userAddress]
  );

  return {
    encryptValue,
    encryptBoolean,
    isEncrypting,
    encryptionError,
    isReady,
  };
};
