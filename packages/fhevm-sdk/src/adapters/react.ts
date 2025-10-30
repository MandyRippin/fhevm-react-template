/**
 * React Adapter for FHEVM SDK
 *
 * This module provides React-specific components and context for managing
 * FHEVM client instances in React applications.
 *
 * @module adapters/react
 */

import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { FhevmClient, FhevmClientConfig } from '../core/fhevm';

/**
 * Context value shape for FHEVM provider
 */
export interface FhevmContextValue {
  /** The FHEVM client instance */
  client: FhevmClient | null;
  /** Whether the client has been initialized */
  isInitialized: boolean;
  /** Any error that occurred during initialization */
  error: Error | null;
}

/**
 * React Context for FHEVM client
 */
export const FhevmContext = createContext<FhevmContextValue>({
  client: null,
  isInitialized: false,
  error: null
});

/**
 * Props for FhevmProvider component
 */
export interface FhevmProviderProps {
  /** Configuration for the FHEVM client */
  config: FhevmClientConfig;
  /** Child components */
  children: ReactNode;
}

/**
 * Provider component for FHEVM SDK
 *
 * This component initializes the FHEVM client and makes it available to all
 * child components through the FhevmContext.
 *
 * @param props - Provider props
 * @returns React component
 *
 * @example
 * ```typescript
 * import { FhevmProvider } from '@fhevm/universal-sdk';
 *
 * function App() {
 *   return (
 *     <FhevmProvider config={{
 *       provider: window.ethereum,
 *       network: 'sepolia',
 *       gatewayUrl: 'https://gateway.fhevm.io'
 *     }}>
 *       <YourApp />
 *     </FhevmProvider>
 *   );
 * }
 * ```
 */
export function FhevmProvider({ config, children }: FhevmProviderProps) {
  const [client, setClient] = useState<FhevmClient | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const initClient = async () => {
      try {
        const fhevmClient = new FhevmClient(config);
        await fhevmClient.init();

        if (mounted) {
          setClient(fhevmClient);
          setIsInitialized(true);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          const error = err instanceof Error ? err : new Error('Failed to initialize FHEVM client');
          setError(error);
          setIsInitialized(false);
        }
      }
    };

    initClient();

    return () => {
      mounted = false;
    };
  }, [config]);

  const contextValue: FhevmContextValue = {
    client,
    isInitialized,
    error
  };

  return React.createElement(
    FhevmContext.Provider,
    { value: contextValue },
    children
  );
}
