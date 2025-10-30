/**
 * React Hook: useEncryptedInput
 *
 * This hook provides functionality to create encrypted inputs for FHE contract interactions.
 * It manages the loading state and provides a convenient interface for creating encrypted inputs.
 *
 * @module hooks/useEncryptedInput
 */

import { useState, useCallback } from 'react';
import { useFhevm } from './useFhevm';
import type { EncryptedInput } from '../types';

/**
 * Hook for creating encrypted inputs
 *
 * @param contractAddress - The address of the contract to create inputs for
 * @returns Object with createInput function and loading state
 *
 * @example
 * ```typescript
 * function VotingComponent() {
 *   const { createInput, isLoading } = useEncryptedInput(CONTRACT_ADDRESS);
 *
 *   const handleVote = async (voteValue: number) => {
 *     const input = await createInput(userAddress);
 *     input.add32(voteValue);
 *     const { handles, inputProof } = await input.encrypt();
 *
 *     // Send to contract
 *     await contract.castVote(handles[0], inputProof);
 *   };
 *
 *   return <button disabled={isLoading} onClick={() => handleVote(1)}>Vote</button>;
 * }
 * ```
 */
export function useEncryptedInput(contractAddress: string) {
  const { client, isInitialized } = useFhevm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Creates an encrypted input for the specified user
   *
   * @param userAddress - The address of the user creating the input
   * @throws {Error} If FHEVM client is not initialized
   * @returns Promise resolving to an EncryptedInput builder
   */
  const createInput = useCallback(
    async (userAddress: string): Promise<EncryptedInput> => {
      if (!client || !isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      setIsLoading(true);
      setError(null);

      try {
        const input = await client.createEncryptedInput(contractAddress, userAddress);
        return input as EncryptedInput;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to create encrypted input');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [client, isInitialized, contractAddress]
  );

  return {
    createInput,
    isLoading,
    error
  };
}
