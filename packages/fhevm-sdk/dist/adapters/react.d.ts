/**
 * React Adapter for FHEVM SDK
 *
 * This module provides React-specific components and context for managing
 * FHEVM client instances in React applications.
 *
 * @module adapters/react
 */
import { ReactNode } from 'react';
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
export declare const FhevmContext: any;
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
export declare function FhevmProvider({ config, children }: FhevmProviderProps): any;
//# sourceMappingURL=react.d.ts.map