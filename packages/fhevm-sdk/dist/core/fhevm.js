"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FhevmClient = void 0;
const ethers_1 = require("ethers");
const fhevmjs_1 = require("fhevmjs");
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
class FhevmClient {
    /**
     * Creates a new FhevmClient instance
     * @param config - Client configuration options
     */
    constructor(config) {
        this.instance = null;
        this.initialized = false;
        this.config = config;
        this.provider = new ethers_1.BrowserProvider(config.provider);
    }
    /**
     * Initializes the FHEVM client
     *
     * This method must be called before using any other client methods.
     * It creates the FhevmInstance with the appropriate chain configuration.
     *
     * @throws {Error} If initialization fails
     * @returns Promise that resolves when initialization is complete
     */
    async init() {
        if (this.initialized) {
            return;
        }
        try {
            const network = await this.provider.getNetwork();
            const chainId = this.config.chainId || Number(network.chainId);
            this.instance = await (0, fhevmjs_1.createInstance)({
                chainId,
                publicKey: this.config.gatewayUrl || '',
                gatewayUrl: this.config.gatewayUrl || ''
            });
            this.initialized = true;
        }
        catch (error) {
            throw new Error(`Failed to initialize FHEVM client: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Gets the FHEVM instance
     *
     * @throws {Error} If client is not initialized
     * @returns The FhevmInstance
     */
    getInstance() {
        if (!this.instance) {
            throw new Error('FhevmClient not initialized. Call init() first.');
        }
        return this.instance;
    }
    /**
     * Gets the ethers provider
     *
     * @returns The BrowserProvider instance
     */
    getProvider() {
        return this.provider;
    }
    /**
     * Checks if the client is initialized
     *
     * @returns True if initialized, false otherwise
     */
    isInitialized() {
        return this.initialized;
    }
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
    async createEncryptedInput(contractAddress, userAddress) {
        const instance = this.getInstance();
        return instance.createEncryptedInput(contractAddress, userAddress);
    }
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
    async decrypt(handle, contractAddress) {
        const instance = this.getInstance();
        const signer = await this.provider.getSigner();
        try {
            return await instance.decrypt(contractAddress, handle, signer);
        }
        catch (error) {
            throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Gets the current network chain ID
     *
     * @returns Promise resolving to the chain ID
     */
    async getChainId() {
        const network = await this.provider.getNetwork();
        return Number(network.chainId);
    }
    /**
     * Gets the current signer address
     *
     * @returns Promise resolving to the signer address
     */
    async getSignerAddress() {
        const signer = await this.provider.getSigner();
        return signer.address;
    }
}
exports.FhevmClient = FhevmClient;
