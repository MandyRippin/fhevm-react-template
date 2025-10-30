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

// Core exports
export { FhevmClient } from './core/fhevm';
export type { FhevmClientConfig } from './core/fhevm';

// React adapter exports
export { FhevmProvider, FhevmContext } from './adapters/react';
export type { FhevmProviderProps, FhevmContextValue } from './adapters/react';

// React hooks exports
export { useFhevm } from './hooks/useFhevm';
export { useEncryptedInput } from './hooks/useEncryptedInput';
export { useDecrypt } from './hooks/useDecrypt';

// Type exports
export type {
  EncryptedInput,
  FhevmType,
  DecryptResult,
  NetworkConfig,
  EncryptedTransactionOptions
} from './types';
export { FhevmError, FhevmErrorType, NETWORKS } from './types';

// Utility exports
export {
  // Encryption utilities
  validateUint8,
  validateUint16,
  validateUint32,
  validateUint64,
  addMultipleValues,
  stringToBytes,
  addByteArray,
  // Decryption utilities
  bigintToNumber,
  bigintToBool,
  bigintToUint8,
  bigintToUint16,
  bigintToUint32,
  convertDecryptedValue,
  formatDecryptedValue,
  decryptMultiple,
  bytesToString,
  // Common utilities
  toHex,
  fromHex,
  waitForTransaction,
  isAddress,
  isTransactionHash,
  normalizeAddress,
  formatUnits,
  parseUnits
} from './utils';
