/**
 * Encryption Utilities
 *
 * This module provides utility functions for encrypting data for use with
 * FHE-enabled smart contracts.
 *
 * @module utils/encryption
 */

import type { EncryptedInput } from '../types';

/**
 * Validates that a value is within the valid range for euint8 (0-255)
 *
 * @param value - The value to validate
 * @throws {Error} If value is out of range
 */
export function validateUint8(value: number): void {
  if (!Number.isInteger(value) || value < 0 || value > 255) {
    throw new Error(`Invalid euint8 value: ${value}. Must be an integer between 0 and 255.`);
  }
}

/**
 * Validates that a value is within the valid range for euint16 (0-65535)
 *
 * @param value - The value to validate
 * @throws {Error} If value is out of range
 */
export function validateUint16(value: number): void {
  if (!Number.isInteger(value) || value < 0 || value > 65535) {
    throw new Error(`Invalid euint16 value: ${value}. Must be an integer between 0 and 65535.`);
  }
}

/**
 * Validates that a value is within the valid range for euint32 (0-4294967295)
 *
 * @param value - The value to validate
 * @throws {Error} If value is out of range
 */
export function validateUint32(value: number): void {
  if (!Number.isInteger(value) || value < 0 || value > 4294967295) {
    throw new Error(`Invalid euint32 value: ${value}. Must be an integer between 0 and 4294967295.`);
  }
}

/**
 * Validates that a value is within the valid range for euint64
 *
 * @param value - The value to validate
 * @throws {Error} If value is out of range
 */
export function validateUint64(value: bigint): void {
  if (value < 0n || value > 18446744073709551615n) {
    throw new Error(`Invalid euint64 value: ${value}. Must be between 0 and 2^64-1.`);
  }
}

/**
 * Helper function to add multiple values to an encrypted input
 *
 * @param input - The encrypted input builder
 * @param values - Array of values to add with their types
 * @returns The encrypted input builder for chaining
 *
 * @example
 * ```typescript
 * const input = await client.createEncryptedInput(contractAddress, userAddress);
 * addMultipleValues(input, [
 *   { type: 'euint32', value: 42 },
 *   { type: 'ebool', value: true },
 *   { type: 'euint8', value: 255 }
 * ]);
 * const { handles, inputProof } = await input.encrypt();
 * ```
 */
export function addMultipleValues(
  input: EncryptedInput,
  values: Array<
    | { type: 'euint8'; value: number }
    | { type: 'euint16'; value: number }
    | { type: 'euint32'; value: number }
    | { type: 'euint64'; value: bigint }
    | { type: 'ebool'; value: boolean }
  >
): EncryptedInput {
  for (const item of values) {
    switch (item.type) {
      case 'euint8':
        validateUint8(item.value);
        input.add8(item.value);
        break;
      case 'euint16':
        validateUint16(item.value);
        input.add16(item.value);
        break;
      case 'euint32':
        validateUint32(item.value);
        input.add32(item.value);
        break;
      case 'euint64':
        validateUint64(item.value);
        input.add64(item.value);
        break;
      case 'ebool':
        input.addBool(item.value);
        break;
    }
  }
  return input;
}

/**
 * Converts a string to a byte array for encryption
 *
 * @param str - The string to convert
 * @returns Uint8Array representation
 */
export function stringToBytes(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

/**
 * Converts a number array to euint8 values
 *
 * @param values - Array of numbers (0-255)
 * @param input - The encrypted input builder
 * @returns The encrypted input builder for chaining
 */
export function addByteArray(input: EncryptedInput, values: number[]): EncryptedInput {
  for (const value of values) {
    validateUint8(value);
    input.add8(value);
  }
  return input;
}
