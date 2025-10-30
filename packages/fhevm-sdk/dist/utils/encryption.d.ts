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
export declare function validateUint8(value: number): void;
/**
 * Validates that a value is within the valid range for euint16 (0-65535)
 *
 * @param value - The value to validate
 * @throws {Error} If value is out of range
 */
export declare function validateUint16(value: number): void;
/**
 * Validates that a value is within the valid range for euint32 (0-4294967295)
 *
 * @param value - The value to validate
 * @throws {Error} If value is out of range
 */
export declare function validateUint32(value: number): void;
/**
 * Validates that a value is within the valid range for euint64
 *
 * @param value - The value to validate
 * @throws {Error} If value is out of range
 */
export declare function validateUint64(value: bigint): void;
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
export declare function addMultipleValues(input: EncryptedInput, values: Array<{
    type: 'euint8';
    value: number;
} | {
    type: 'euint16';
    value: number;
} | {
    type: 'euint32';
    value: number;
} | {
    type: 'euint64';
    value: bigint;
} | {
    type: 'ebool';
    value: boolean;
}>): EncryptedInput;
/**
 * Converts a string to a byte array for encryption
 *
 * @param str - The string to convert
 * @returns Uint8Array representation
 */
export declare function stringToBytes(str: string): Uint8Array;
/**
 * Converts a number array to euint8 values
 *
 * @param values - Array of numbers (0-255)
 * @param input - The encrypted input builder
 * @returns The encrypted input builder for chaining
 */
export declare function addByteArray(input: EncryptedInput, values: number[]): EncryptedInput;
//# sourceMappingURL=encryption.d.ts.map