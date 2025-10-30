/**
 * Decryption Utilities
 *
 * This module provides utility functions for decrypting and processing
 * encrypted values from FHE-enabled smart contracts.
 *
 * @module utils/decryption
 */
import type { FhevmType } from '../types';
/**
 * Converts a decrypted bigint value to a number
 *
 * @param value - The bigint value to convert
 * @param max - Optional maximum value for validation
 * @returns The value as a number
 * @throws {Error} If value exceeds safe integer range or max value
 */
export declare function bigintToNumber(value: bigint, max?: number): number;
/**
 * Converts a decrypted bigint to a boolean
 *
 * @param value - The bigint value (0 or 1)
 * @returns Boolean representation
 * @throws {Error} If value is not 0 or 1
 */
export declare function bigintToBool(value: bigint): boolean;
/**
 * Converts a decrypted bigint to a uint8
 *
 * @param value - The bigint value
 * @returns Number between 0 and 255
 * @throws {Error} If value is out of range
 */
export declare function bigintToUint8(value: bigint): number;
/**
 * Converts a decrypted bigint to a uint16
 *
 * @param value - The bigint value
 * @returns Number between 0 and 65535
 * @throws {Error} If value is out of range
 */
export declare function bigintToUint16(value: bigint): number;
/**
 * Converts a decrypted bigint to a uint32
 *
 * @param value - The bigint value
 * @returns Number between 0 and 4294967295
 * @throws {Error} If value is out of range
 */
export declare function bigintToUint32(value: bigint): number;
/**
 * Converts decrypted value to appropriate JavaScript type based on FHE type
 *
 * @param value - The decrypted bigint value
 * @param type - The FHE type
 * @returns Converted value in appropriate JavaScript type
 *
 * @example
 * ```typescript
 * const decrypted = await client.decrypt(handle, contractAddress);
 * const value = convertDecryptedValue(decrypted, 'euint32'); // Returns number
 * const flag = convertDecryptedValue(decrypted, 'ebool'); // Returns boolean
 * ```
 */
export declare function convertDecryptedValue(value: bigint, type: FhevmType): number | boolean | bigint;
/**
 * Formats a decrypted value for display
 *
 * @param value - The bigint value
 * @param type - The FHE type
 * @returns Formatted string representation
 */
export declare function formatDecryptedValue(value: bigint, type: FhevmType): string;
/**
 * Decrypts multiple handles and returns their values
 *
 * @param decrypt - Decryption function
 * @param handles - Array of encrypted handles
 * @param contractAddress - Contract address
 * @returns Promise resolving to array of decrypted values
 */
export declare function decryptMultiple(decrypt: (handle: bigint, contractAddress: string) => Promise<bigint>, handles: bigint[], contractAddress: string): Promise<bigint[]>;
/**
 * Converts byte array to string
 *
 * @param bytes - Uint8Array or number array
 * @returns Decoded string
 */
export declare function bytesToString(bytes: Uint8Array | number[]): string;
//# sourceMappingURL=decryption.d.ts.map