import React, { ReactNode } from 'react';
import { FhevmClient, FhevmClientConfig } from './client';
interface FhevmContextValue {
    client: FhevmClient | null;
    isInitialized: boolean;
    error: Error | null;
}
export interface FhevmProviderProps {
    config: FhevmClientConfig;
    children: ReactNode;
}
export declare function FhevmProvider({ config, children }: FhevmProviderProps): React.JSX.Element;
export declare function useFhevm(): FhevmContextValue;
export declare function useEncryptedInput(contractAddress: string): {
    createInput: (userAddress: string) => Promise<any>;
    isLoading: boolean;
};
export declare function useDecrypt(): {
    decrypt: (handle: bigint, contractAddress: string) => Promise<bigint>;
    isLoading: boolean;
};
export {};
//# sourceMappingURL=react.d.ts.map