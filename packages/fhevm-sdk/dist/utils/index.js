"use strict";
/**
 * Utility Functions for FHEVM SDK
 *
 * This module exports all utility functions for working with encrypted data,
 * hex conversions, address validation, and transaction handling.
 *
 * @module utils
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHex = toHex;
exports.fromHex = fromHex;
exports.waitForTransaction = waitForTransaction;
exports.isAddress = isAddress;
exports.isTransactionHash = isTransactionHash;
exports.normalizeAddress = normalizeAddress;
exports.formatUnits = formatUnits;
exports.parseUnits = parseUnits;
// Re-export encryption utilities
__exportStar(require("./encryption"), exports);
// Re-export decryption utilities
__exportStar(require("./decryption"), exports);
// Common utilities
/**
 * Converts a bigint or number to a hex string
 *
 * @param value - The value to convert
 * @returns Hex string with 0x prefix
 */
function toHex(value) {
    return '0x' + value.toString(16);
}
/**
 * Converts a hex string to a bigint
 *
 * @param hex - The hex string (with or without 0x prefix)
 * @returns BigInt representation
 */
function fromHex(hex) {
    return BigInt(hex);
}
/**
 * Waits for a transaction to be mined
 *
 * @param provider - The ethers provider
 * @param txHash - The transaction hash
 * @returns Promise resolving to the transaction receipt
 */
async function waitForTransaction(provider, txHash) {
    const receipt = await provider.waitForTransaction(txHash);
    return receipt;
}
/**
 * Validates if a string is a valid Ethereum address
 *
 * @param address - The address string to validate
 * @returns True if valid address format, false otherwise
 */
function isAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}
/**
 * Validates if a string is a valid transaction hash
 *
 * @param hash - The hash string to validate
 * @returns True if valid hash format, false otherwise
 */
function isTransactionHash(hash) {
    return /^0x[a-fA-F0-9]{64}$/.test(hash);
}
/**
 * Normalizes an address to checksum format
 *
 * @param address - The address to normalize
 * @returns Checksummed address
 */
function normalizeAddress(address) {
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
function formatUnits(value, decimals = 18) {
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
function parseUnits(value, decimals = 18) {
    const [integerPart, decimalPart = ''] = value.split('.');
    const paddedDecimal = decimalPart.padEnd(decimals, '0').slice(0, decimals);
    return BigInt(integerPart + paddedDecimal);
}
