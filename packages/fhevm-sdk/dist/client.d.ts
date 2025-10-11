import { BrowserProvider, Eip1193Provider } from 'ethers';
import { FhevmInstance } from 'fhevmjs';
export interface FhevmClientConfig {
    provider: Eip1193Provider;
    network?: 'sepolia' | 'localhost';
    gatewayUrl?: string;
}
export declare class FhevmClient {
    private instance;
    private provider;
    private config;
    constructor(config: FhevmClientConfig);
    init(): Promise<void>;
    getInstance(): FhevmInstance;
    getProvider(): BrowserProvider;
    createEncryptedInput(contractAddress: string, userAddress: string): Promise<any>;
    decrypt(handle: bigint, contractAddress: string): Promise<bigint>;
}
//# sourceMappingURL=client.d.ts.map