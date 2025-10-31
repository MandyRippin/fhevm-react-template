'use client';

import { useState, useEffect } from 'react';
import { useFhevm } from '@fhevm/universal-sdk';
import { FHEClientWrapper } from '../lib/fhe/client';

export const useFHE = () => {
  const { client, isInitialized, error } = useFhevm();
  const [fheClient, setFheClient] = useState<FHEClientWrapper | null>(null);

  useEffect(() => {
    if (client && isInitialized) {
      setFheClient(new FHEClientWrapper(client));
    }
  }, [client, isInitialized]);

  return {
    fheClient,
    isReady: isInitialized && fheClient !== null,
    error,
  };
};
