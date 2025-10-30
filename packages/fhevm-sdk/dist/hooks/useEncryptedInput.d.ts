/**
 * React Hook: useEncryptedInput
 *
 * This hook provides functionality to create encrypted inputs for FHE contract interactions.
 * It manages the loading state and provides a convenient interface for creating encrypted inputs.
 *
 * @module hooks/useEncryptedInput
 */
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
export declare function useEncryptedInput(contractAddress: string): {
    createInput: any;
    isLoading: any;
    error: any;
};
//# sourceMappingURL=useEncryptedInput.d.ts.map