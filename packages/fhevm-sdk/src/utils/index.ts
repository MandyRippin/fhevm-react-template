/**
 * Utility Functions for FHEVM SDK
 *
 * This module exports all utility functions for working with encrypted data,
 * hex conversions, address validation, and transaction handling.
 *
 * @module utils
 */

// Re-export encryption utilities
export * from './encryption';

// Re-export decryption utilities
export * from './decryption';

// Common utilities
/**
 * Converts a bigint or number to a hex string
 *
 * @param value - The value to convert
 * @returns Hex string with 0x prefix
 */
export function toHex(value: bigint | number): string {
  return '0x' + value.toString(16);
}

/**
 * Converts a hex string to a bigint
 *
 * @param hex - The hex string (with or without 0x prefix)
 * @returns BigInt representation
 */
export function fromHex(hex: string): bigint {
  return BigInt(hex);
}

/**
 * Waits for a transaction to be mined
 *
 * @param provider - The ethers provider
 * @param txHash - The transaction hash
 * @returns Promise resolving to the transaction receipt
 */
export async function waitForTransaction(provider: any, txHash: string) {
  const receipt = await provider.waitForTransaction(txHash);
  return receipt;
}

/**
 * Validates if a string is a valid Ethereum address
 *
 * @param address - The address string to validate
 * @returns True if valid address format, false otherwise
 */
export function isAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validates if a string is a valid transaction hash
 *
 * @param hash - The hash string to validate
 * @returns True if valid hash format, false otherwise
 */
export function isTransactionHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}

/**
 * Normalizes an address to checksum format
 *
 * @param address - The address to normalize
 * @returns Checksummed address
 */
export function normalizeAddress(address: string): string {
  if (!isAddress(address)) {
    throw new Error(`Invalid address: ${address}`);
  }
  return address.toLowerCase();
}

/**
 * Formats a bigint value for display with decimals
 *
 * @param value - The bigint value
 * @param decimals - Number of decimal places (default 18)
 * @returns Formatted string
 */
export function formatUnits(value: bigint, decimals: number = 18): string {
  const str = value.toString();
  const len = str.length;

  if (len <= decimals) {
    return '0.' + '0'.repeat(decimals - len) + str;
  }

  const integerPart = str.slice(0, len - decimals);
  const decimalPart = str.slice(len - decimals);
  return integerPart + '.' + decimalPart;
}

/**
 * Parses a string with decimals to a bigint
 *
 * @param value - The string value
 * @param decimals - Number of decimal places (default 18)
 * @returns BigInt representation
 */
export function parseUnits(value: string, decimals: number = 18): bigint {
  const [integerPart, decimalPart = ''] = value.split('.');
  const paddedDecimal = decimalPart.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(integerPart + paddedDecimal);
}
