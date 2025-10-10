import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { FhevmClient, FhevmClientConfig } from './client';

interface FhevmContextValue {
  client: FhevmClient | null;
  isInitialized: boolean;
  error: Error | null;
}

const FhevmContext = createContext<FhevmContextValue>({
  client: null,
  isInitialized: false,
  error: null
});

export interface FhevmProviderProps {
  config: FhevmClientConfig;
  children: ReactNode;
}

export function FhevmProvider({ config, children }: FhevmProviderProps) {
  const [client, setClient] = useState<FhevmClient | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initClient = async () => {
      try {
        const fhevmClient = new FhevmClient(config);
        await fhevmClient.init();
        setClient(fhevmClient);
        setIsInitialized(true);
      } catch (err) {
        setError(err as Error);
      }
    };

    initClient();
  }, [config]);

  return (
    <FhevmContext.Provider value={{ client, isInitialized, error }}>
      {children}
    </FhevmContext.Provider>
  );
}

export function useFhevm() {
  const context = useContext(FhevmContext);
  
  if (!context) {
    throw new Error('useFhevm must be used within FhevmProvider');
  }

  return context;
}

export function useEncryptedInput(contractAddress: string) {
  const { client, isInitialized } = useFhevm();
  const [isLoading, setIsLoading] = useState(false);

  const createInput = async (userAddress: string) => {
    if (!client || !isInitialized) {
      throw new Error('FHEVM client not initialized');
    }

    setIsLoading(true);
    try {
      const input = await client.createEncryptedInput(contractAddress, userAddress);
      return input;
    } finally {
      setIsLoading(false);
    }
  };

  return { createInput, isLoading };
}

export function useDecrypt() {
  const { client, isInitialized } = useFhevm();
  const [isLoading, setIsLoading] = useState(false);

  const decrypt = async (handle: bigint, contractAddress: string): Promise<bigint> => {
    if (!client || !isInitialized) {
      throw new Error('FHEVM client not initialized');
    }

    setIsLoading(true);
    try {
      return await client.decrypt(handle, contractAddress);
    } finally {
      setIsLoading(false);
    }
  };

  return { decrypt, isLoading };
}
