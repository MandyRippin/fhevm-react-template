"use strict";
/**
 * Universal FHEVM SDK
 *
 * A framework-agnostic SDK for building privacy-preserving decentralized applications
 * using Fully Homomorphic Encryption (FHE).
 *
 * This SDK provides:
 * - Core FHEVM client for encrypted operations
 * - React hooks and adapters for React applications
 * - Utility functions for encryption, decryption, and data handling
 * - TypeScript type definitions and interfaces
 *
 * @module @fhevm/universal-sdk
 *
 * @example
 * ```typescript
 * // Basic usage
 * import { FhevmClient } from '@fhevm/universal-sdk';
 *
 * const client = new FhevmClient({
 *   provider: window.ethereum,
 *   network: 'sepolia',
 *   gatewayUrl: 'https://gateway.fhevm.io'
 * });
 *
 * await client.init();
 * ```
 *
 * @example
 * ```typescript
 * // React usage
 * import { FhevmProvider, useFhevm, useEncryptedInput } from '@fhevm/universal-sdk';
 *
 * function App() {
 *   return (
 *     <FhevmProvider config={{ provider: window.ethereum }}>
 *       <YourApp />
 *     </FhevmProvider>
 *   );
 * }
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUnits = exports.formatUnits = exports.normalizeAddress = exports.isTransactionHash = exports.isAddress = exports.waitForTransaction = exports.fromHex = exports.toHex = exports.bytesToString = exports.decryptMultiple = exports.formatDecryptedValue = exports.convertDecryptedValue = exports.bigintToUint32 = exports.bigintToUint16 = exports.bigintToUint8 = exports.bigintToBool = exports.bigintToNumber = exports.addByteArray = exports.stringToBytes = exports.addMultipleValues = exports.validateUint64 = exports.validateUint32 = exports.validateUint16 = exports.validateUint8 = exports.NETWORKS = exports.FhevmErrorType = exports.FhevmError = exports.useDecrypt = exports.useEncryptedInput = exports.useFhevm = exports.FhevmContext = exports.FhevmProvider = exports.FhevmClient = void 0;
// Core exports
var fhevm_1 = require("./core/fhevm");
Object.defineProperty(exports, "FhevmClient", { enumerable: true, get: function () { return fhevm_1.FhevmClient; } });
// React adapter exports
var react_1 = require("./adapters/react");
Object.defineProperty(exports, "FhevmProvider", { enumerable: true, get: function () { return react_1.FhevmProvider; } });
Object.defineProperty(exports, "FhevmContext", { enumerable: true, get: function () { return react_1.FhevmContext; } });
// React hooks exports
var useFhevm_1 = require("./hooks/useFhevm");
Object.defineProperty(exports, "useFhevm", { enumerable: true, get: function () { return useFhevm_1.useFhevm; } });
var useEncryptedInput_1 = require("./hooks/useEncryptedInput");
Object.defineProperty(exports, "useEncryptedInput", { enumerable: true, get: function () { return useEncryptedInput_1.useEncryptedInput; } });
var useDecrypt_1 = require("./hooks/useDecrypt");
Object.defineProperty(exports, "useDecrypt", { enumerable: true, get: function () { return useDecrypt_1.useDecrypt; } });
var types_1 = require("./types");
Object.defineProperty(exports, "FhevmError", { enumerable: true, get: function () { return types_1.FhevmError; } });
Object.defineProperty(exports, "FhevmErrorType", { enumerable: true, get: function () { return types_1.FhevmErrorType; } });
Object.defineProperty(exports, "NETWORKS", { enumerable: true, get: function () { return types_1.NETWORKS; } });
// Utility exports
var utils_1 = require("./utils");
// Encryption utilities
Object.defineProperty(exports, "validateUint8", { enumerable: true, get: function () { return utils_1.validateUint8; } });
Object.defineProperty(exports, "validateUint16", { enumerable: true, get: function () { return utils_1.validateUint16; } });
Object.defineProperty(exports, "validateUint32", { enumerable: true, get: function () { return utils_1.validateUint32; } });
Object.defineProperty(exports, "validateUint64", { enumerable: true, get: function () { return utils_1.validateUint64; } });
Object.defineProperty(exports, "addMultipleValues", { enumerable: true, get: function () { return utils_1.addMultipleValues; } });
Object.defineProperty(exports, "stringToBytes", { enumerable: true, get: function () { return utils_1.stringToBytes; } });
Object.defineProperty(exports, "addByteArray", { enumerable: true, get: function () { return utils_1.addByteArray; } });
// Decryption utilities
Object.defineProperty(exports, "bigintToNumber", { enumerable: true, get: function () { return utils_1.bigintToNumber; } });
Object.defineProperty(exports, "bigintToBool", { enumerable: true, get: function () { return utils_1.bigintToBool; } });
Object.defineProperty(exports, "bigintToUint8", { enumerable: true, get: function () { return utils_1.bigintToUint8; } });
Object.defineProperty(exports, "bigintToUint16", { enumerable: true, get: function () { return utils_1.bigintToUint16; } });
Object.defineProperty(exports, "bigintToUint32", { enumerable: true, get: function () { return utils_1.bigintToUint32; } });
Object.defineProperty(exports, "convertDecryptedValue", { enumerable: true, get: function () { return utils_1.convertDecryptedValue; } });
Object.defineProperty(exports, "formatDecryptedValue", { enumerable: true, get: function () { return utils_1.formatDecryptedValue; } });
Object.defineProperty(exports, "decryptMultiple", { enumerable: true, get: function () { return utils_1.decryptMultiple; } });
Object.defineProperty(exports, "bytesToString", { enumerable: true, get: function () { return utils_1.bytesToString; } });
// Common utilities
Object.defineProperty(exports, "toHex", { enumerable: true, get: function () { return utils_1.toHex; } });
Object.defineProperty(exports, "fromHex", { enumerable: true, get: function () { return utils_1.fromHex; } });
Object.defineProperty(exports, "waitForTransaction", { enumerable: true, get: function () { return utils_1.waitForTransaction; } });
Object.defineProperty(exports, "isAddress", { enumerable: true, get: function () { return utils_1.isAddress; } });
Object.defineProperty(exports, "isTransactionHash", { enumerable: true, get: function () { return utils_1.isTransactionHash; } });
Object.defineProperty(exports, "normalizeAddress", { enumerable: true, get: function () { return utils_1.normalizeAddress; } });
Object.defineProperty(exports, "formatUnits", { enumerable: true, get: function () { return utils_1.formatUnits; } });
Object.defineProperty(exports, "parseUnits", { enumerable: true, get: function () { return utils_1.parseUnits; } });
