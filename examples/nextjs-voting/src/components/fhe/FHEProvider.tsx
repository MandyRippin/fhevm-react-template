'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FhevmClient } from '@fhevm/universal-sdk';
import type { FhevmConfig } from '../../types/fhe';

interface FHEContextValue {
  client: FhevmClient | null;
  isInitialized: boolean;
  isLoading: boolean;
  error: Error | null;
  publicKey: string | null;
}

const FHEContext = createContext<FHEContextValue | undefined>(undefined);

interface FHEProviderProps {
  children: ReactNode;
  config: FhevmConfig;
}

export const FHEProvider: React.FC<FHEProviderProps> = ({ children, config }) => {
  const [client, setClient] = useState<FhevmClient | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    const initFHEVM = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const fhevmClient = new FhevmClient(config);
        await fhevmClient.init();

        const pubKey = await fhevmClient.getPublicKey();

        setClient(fhevmClient);
        setPublicKey(pubKey);
        setIsInitialized(true);
      } catch (err) {
        console.error('Failed to initialize FHEVM:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    if (config.provider) {
      initFHEVM();
    }
  }, [config]);

  const value: FHEContextValue = {
    client,
    isInitialized,
    isLoading,
    error,
    publicKey,
  };

  return <FHEContext.Provider value={value}>{children}</FHEContext.Provider>;
};

export const useFHEContext = () => {
  const context = useContext(FHEContext);
  if (context === undefined) {
    throw new Error('useFHEContext must be used within FHEProvider');
  }
  return context;
};
