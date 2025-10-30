"use strict";
/**
 * Decryption Utilities
 *
 * This module provides utility functions for decrypting and processing
 * encrypted values from FHE-enabled smart contracts.
 *
 * @module utils/decryption
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigintToNumber = bigintToNumber;
exports.bigintToBool = bigintToBool;
exports.bigintToUint8 = bigintToUint8;
exports.bigintToUint16 = bigintToUint16;
exports.bigintToUint32 = bigintToUint32;
exports.convertDecryptedValue = convertDecryptedValue;
exports.formatDecryptedValue = formatDecryptedValue;
exports.decryptMultiple = decryptMultiple;
exports.bytesToString = bytesToString;
/**
 * Converts a decrypted bigint value to a number
 *
 * @param value - The bigint value to convert
 * @param max - Optional maximum value for validation
 * @returns The value as a number
 * @throws {Error} If value exceeds safe integer range or max value
 */
function bigintToNumber(value, max) {
    if (value > Number.MAX_SAFE_INTEGER) {
        throw new Error(`Value ${value} exceeds safe integer range`);
    }
    const num = Number(value);
    if (max !== undefined && num > max) {
        throw new Error(`Value ${num} exceeds maximum ${max}`);
    }
    return num;
}
/**
 * Converts a decrypted bigint to a boolean
 *
 * @param value - The bigint value (0 or 1)
 * @returns Boolean representation
 * @throws {Error} If value is not 0 or 1
 */
function bigintToBool(value) {
    if (value !== 0n && value !== 1n) {
        throw new Error(`Invalid boolean value: ${value}. Expected 0 or 1.`);
    }
    return value === 1n;
}
/**
 * Converts a decrypted bigint to a uint8
 *
 * @param value - The bigint value
 * @returns Number between 0 and 255
 * @throws {Error} If value is out of range
 */
function bigintToUint8(value) {
    if (value < 0n || value > 255n) {
        throw new Error(`Value ${value} out of uint8 range (0-255)`);
    }
    return Number(value);
}
/**
 * Converts a decrypted bigint to a uint16
 *
 * @param value - The bigint value
 * @returns Number between 0 and 65535
 * @throws {Error} If value is out of range
 */
function bigintToUint16(value) {
    if (value < 0n || value > 65535n) {
        throw new Error(`Value ${value} out of uint16 range (0-65535)`);
    }
    return Number(value);
}
/**
 * Converts a decrypted bigint to a uint32
 *
 * @param value - The bigint value
 * @returns Number between 0 and 4294967295
 * @throws {Error} If value is out of range
 */
function bigintToUint32(value) {
    if (value < 0n || value > 4294967295n) {
        throw new Error(`Value ${value} out of uint32 range (0-4294967295)`);
    }
    return Number(value);
}
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
function convertDecryptedValue(value, type) {
    switch (type) {
        case 'euint8':
            return bigintToUint8(value);
        case 'euint16':
            return bigintToUint16(value);
        case 'euint32':
            return bigintToUint32(value);
        case 'euint64':
            return value; // Keep as bigint
        case 'ebool':
            return bigintToBool(value);
        case 'eaddress':
            return value; // Keep as bigint for addresses
        default:
            throw new Error(`Unknown FHE type: ${type}`);
    }
}
/**
 * Formats a decrypted value for display
 *
 * @param value - The bigint value
 * @param type - The FHE type
 * @returns Formatted string representation
 */
function formatDecryptedValue(value, type) {
    const converted = convertDecryptedValue(value, type);
    switch (type) {
        case 'eaddress':
            return `0x${value.toString(16).padStart(40, '0')}`;
        case 'ebool':
            return converted ? 'true' : 'false';
        case 'euint64':
            return value.toString();
        default:
            return converted.toString();
    }
}
/**
 * Decrypts multiple handles and returns their values
 *
 * @param decrypt - Decryption function
 * @param handles - Array of encrypted handles
 * @param contractAddress - Contract address
 * @returns Promise resolving to array of decrypted values
 */
async function decryptMultiple(decrypt, handles, contractAddress) {
    return Promise.all(handles.map((handle) => decrypt(handle, contractAddress)));
}
/**
 * Converts byte array to string
 *
 * @param bytes - Uint8Array or number array
 * @returns Decoded string
 */
function bytesToString(bytes) {
    const uint8Array = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    return new TextDecoder().decode(uint8Array);
}
