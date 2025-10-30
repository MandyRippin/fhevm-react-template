/**
 * React Hook: useFhevm
 *
 * This hook provides access to the FHEVM client instance from the FhevmProvider context.
 * It's the primary hook for accessing FHEVM functionality in React components.
 *
 * @module hooks/useFhevm
 */

import { useContext } from 'react';
import { FhevmContext } from '../adapters/react';

/**
 * Hook to access the FHEVM client and its status
 *
 * @throws {Error} If used outside of FhevmProvider
 * @returns Object containing the FHEVM client, initialization status, and any errors
 *
 * @example
 * ```typescript
 * function MyComponent() {
 *   const { client, isInitialized, error } = useFhevm();
 *
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!isInitialized) return <div>Initializing...</div>;
 *
 *   // Use client for encrypted operations
 *   return <div>FHEVM Ready!</div>;
 * }
 * ```
 */
export function useFhevm() {
  const context = useContext(FhevmContext);

  if (!context) {
    throw new Error('useFhevm must be used within FhevmProvider');
  }

  return context;
}
