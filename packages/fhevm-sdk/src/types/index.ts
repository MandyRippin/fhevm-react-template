/**
 * Type Definitions for FHEVM SDK
 *
 * This module contains all TypeScript type definitions and interfaces
 * used throughout the FHEVM SDK.
 *
 * @module types
 */

/**
 * Encrypted input builder interface
 *
 * This interface defines the methods available for building encrypted inputs
 * that can be sent to FHE-enabled smart contracts.
 */
export interface EncryptedInput {
  /**
   * Adds an encrypted 8-bit unsigned integer
   * @param value - Value between 0 and 255
   * @returns The encrypted input builder for chaining
   */
  add8(value: number): EncryptedInput;

  /**
   * Adds an encrypted 16-bit unsigned integer
   * @param value - Value between 0 and 65535
   * @returns The encrypted input builder for chaining
   */
  add16(value: number): EncryptedInput;

  /**
   * Adds an encrypted 32-bit unsigned integer
   * @param value - Value between 0 and 4294967295
   * @returns The encrypted input builder for chaining
   */
  add32(value: number): EncryptedInput;

  /**
   * Adds an encrypted 64-bit unsigned integer
   * @param value - BigInt value
   * @returns The encrypted input builder for chaining
   */
  add64(value: bigint): EncryptedInput;

  /**
   * Adds an encrypted boolean value
   * @param value - Boolean value to encrypt
   * @returns The encrypted input builder for chaining
   */
  addBool(value: boolean): EncryptedInput;

  /**
   * Encrypts all added values and generates the proof
   * @returns Promise resolving to encrypted handles and input proof
   */
  encrypt(): Promise<{
    handles: Uint8Array[];
    inputProof: string;
  }>;
}

/**
 * Supported FHE types
 */
export type FhevmType = 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'ebool' | 'eaddress';

/**
 * Result of a decryption operation
 */
export interface DecryptResult {
  /** The decrypted value as a bigint */
  value: bigint;
  /** The type of the encrypted value */
  type: FhevmType;
}

/**
 * Network configuration options
 */
export interface NetworkConfig {
  /** Network name */
  name: string;
  /** Chain ID */
  chainId: number;
  /** Gateway URL for decryption */
  gatewayUrl: string;
  /** RPC URL (optional) */
  rpcUrl?: string;
}

/**
 * Common network configurations
 */
export const NETWORKS: Record<string, NetworkConfig> = {
  sepolia: {
    name: 'Sepolia',
    chainId: 11155111,
    gatewayUrl: 'https://gateway.sepolia.fhevm.io'
  },
  localhost: {
    name: 'Localhost',
    chainId: 31337,
    gatewayUrl: 'http://localhost:8545'
  }
};

/**
 * Transaction options for encrypted operations
 */
export interface EncryptedTransactionOptions {
  /** Gas limit */
  gasLimit?: bigint;
  /** Gas price */
  gasPrice?: bigint;
  /** Max fee per gas (EIP-1559) */
  maxFeePerGas?: bigint;
  /** Max priority fee per gas (EIP-1559) */
  maxPriorityFeePerGas?: bigint;
  /** Transaction value */
  value?: bigint;
}

/**
 * Error types for FHEVM operations
 */
export enum FhevmErrorType {
  NOT_INITIALIZED = 'NOT_INITIALIZED',
  ENCRYPTION_FAILED = 'ENCRYPTION_FAILED',
  DECRYPTION_FAILED = 'DECRYPTION_FAILED',
  INVALID_HANDLE = 'INVALID_HANDLE',
  INVALID_ADDRESS = 'INVALID_ADDRESS',
  NETWORK_ERROR = 'NETWORK_ERROR',
  USER_REJECTED = 'USER_REJECTED'
}

/**
 * Custom error class for FHEVM operations
 */
export class FhevmError extends Error {
  type: FhevmErrorType;
  originalError?: Error;

  constructor(type: FhevmErrorType, message: string, originalError?: Error) {
    super(message);
    this.name = 'FhevmError';
    this.type = type;
    this.originalError = originalError;
  }
}
