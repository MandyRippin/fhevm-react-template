/**
 * Core FHEVM Client
 *
 * This module provides the core FhevmClient class for interacting with
 * Fully Homomorphic Encryption (FHE) enabled smart contracts.
 *
 * The FhevmClient is framework-agnostic and can be used in any JavaScript/TypeScript
 * environment including Node.js, React, Vue, Angular, etc.
 *
 * @module core/fhevm
 */
import { BrowserProvider, Eip1193Provider } from 'ethers';
import { FhevmInstance } from 'fhevmjs';
/**
 * Configuration options for the FHEVM client
 */
export interface FhevmClientConfig {
    /** EIP-1193 compatible provider (e.g., window.ethereum, WalletConnect provider) */
    provider: Eip1193Provider;
    /** Network identifier */
    network?: 'sepolia' | 'localhost' | string;
    /** Gateway URL for decryption services */
    gatewayUrl?: string;
    /** Optional custom chain ID */
    chainId?: number;
}
/**
 * Core FHEVM Client for encrypted computation
 *
 * This class handles:
 * - FHEVM instance initialization
 * - Encrypted input creation
 * - Decryption of encrypted values
 * - Provider management
 *
 * @example
 * ```typescript
 * const client = new FhevmClient({
 *   provider: window.ethereum,
 *   network: 'sepolia',
 *   gatewayUrl: 'https://gateway.fhevm.io'
 * });
 *
 * await client.init();
 * const input = await client.createEncryptedInput(contractAddress, userAddress);
 * ```
 */
export declare class FhevmClient {
    private instance;
    private provider;
    private config;
    private initialized;
    /**
     * Creates a new FhevmClient instance
     * @param config - Client configuration options
     */
    constructor(config: FhevmClientConfig);
    /**
     * Initializes the FHEVM client
     *
     * This method must be called before using any other client methods.
     * It creates the FhevmInstance with the appropriate chain configuration.
     *
     * @throws {Error} If initialization fails
     * @returns Promise that resolves when initialization is complete
     */
    init(): Promise<void>;
    /**
     * Gets the FHEVM instance
     *
     * @throws {Error} If client is not initialized
     * @returns The FhevmInstance
     */
    getInstance(): FhevmInstance;
    /**
     * Gets the ethers provider
     *
     * @returns The BrowserProvider instance
     */
    getProvider(): BrowserProvider;
    /**
     * Checks if the client is initialized
     *
     * @returns True if initialized, false otherwise
     */
    isInitialized(): boolean;
    /**
     * Creates an encrypted input builder for contract interaction
     *
     * The encrypted input allows you to add encrypted values that can be
     * sent to FHE-enabled smart contracts.
     *
     * @param contractAddress - The address of the target contract
     * @param userAddress - The address of the user creating the input
     * @throws {Error} If client is not initialized
     * @returns Promise resolving to an encrypted input builder
     *
     * @example
     * ```typescript
     * const input = await client.createEncryptedInput(contractAddress, userAddress);
     * input.add32(42);
     * const { handles, inputProof } = await input.encrypt();
     * ```
     */
    createEncryptedInput(contractAddress: string, userAddress: string): Promise<any>;
    /**
     * Decrypts an encrypted value from a contract
     *
     * This method uses EIP-712 signing to authorize decryption of encrypted
     * values stored in smart contracts.
     *
     * @param handle - The encrypted value handle (ciphertext reference)
     * @param contractAddress - The address of the contract containing the encrypted value
     * @throws {Error} If client is not initialized or decryption fails
     * @returns Promise resolving to the decrypted value as a bigint
     *
     * @example
     * ```typescript
     * const encryptedValue = await contract.getEncryptedBalance(userAddress);
     * const decryptedBalance = await client.decrypt(encryptedValue, contractAddress);
     * console.log('Balance:', decryptedBalance.toString());
     * ```
     */
    decrypt(handle: bigint, contractAddress: string): Promise<bigint>;
    /**
     * Gets the current network chain ID
     *
     * @returns Promise resolving to the chain ID
     */
    getChainId(): Promise<number>;
    /**
     * Gets the current signer address
     *
     * @returns Promise resolving to the signer address
     */
    getSignerAddress(): Promise<string>;
}
//# sourceMappingURL=fhevm.d.ts.map