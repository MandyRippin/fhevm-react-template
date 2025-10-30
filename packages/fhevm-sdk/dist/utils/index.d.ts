/**
 * Utility Functions for FHEVM SDK
 *
 * This module exports all utility functions for working with encrypted data,
 * hex conversions, address validation, and transaction handling.
 *
 * @module utils
 */
export * from './encryption';
export * from './decryption';
/**
 * Converts a bigint or number to a hex string
 *
 * @param value - The value to convert
 * @returns Hex string with 0x prefix
 */
export declare function toHex(value: bigint | number): string;
/**
 * Converts a hex string to a bigint
 *
 * @param hex - The hex string (with or without 0x prefix)
 * @returns BigInt representation
 */
export declare function fromHex(hex: string): bigint;
/**
 * Waits for a transaction to be mined
 *
 * @param provider - The ethers provider
 * @param txHash - The transaction hash
 * @returns Promise resolving to the transaction receipt
 */
export declare function waitForTransaction(provider: any, txHash: string): Promise<any>;
/**
 * Validates if a string is a valid Ethereum address
 *
 * @param address - The address string to validate
 * @returns True if valid address format, false otherwise
 */
export declare function isAddress(address: string): boolean;
/**
 * Validates if a string is a valid transaction hash
 *
 * @param hash - The hash string to validate
 * @returns True if valid hash format, false otherwise
 */
export declare function isTransactionHash(hash: string): boolean;
/**
 * Normalizes an address to checksum format
 *
 * @param address - The address to normalize
 * @returns Checksummed address
 */
export declare function normalizeAddress(address: string): string;
/**
 * Formats a bigint value for display with decimals
 *
 * @param value - The bigint value
 * @param decimals - Number of decimal places (default 18)
 * @returns Formatted string
 */
export declare function formatUnits(value: bigint, decimals?: number): string;
/**
 * Parses a string with decimals to a bigint
 *
 * @param value - The string value
 * @param decimals - Number of decimal places (default 18)
 * @returns BigInt representation
 */
export declare function parseUnits(value: string, decimals?: number): bigint;
//# sourceMappingURL=index.d.ts.map