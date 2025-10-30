/**
 * React Hook: useDecrypt
 *
 * This hook provides functionality to decrypt encrypted values from FHE-enabled contracts.
 * It manages the loading state and provides a convenient interface for decryption operations.
 *
 * @module hooks/useDecrypt
 */
/**
 * Hook for decrypting encrypted values from contracts
 *
 * @returns Object with decrypt function, loading state, and error
 *
 * @example
 * ```typescript
 * function BalanceDisplay({ contractAddress, encryptedBalance }) {
 *   const { decrypt, isLoading, error } = useDecrypt();
 *   const [balance, setBalance] = useState<bigint | null>(null);
 *
 *   useEffect(() => {
 *     async function decryptBalance() {
 *       const value = await decrypt(encryptedBalance, contractAddress);
 *       setBalance(value);
 *     }
 *     decryptBalance();
 *   }, [encryptedBalance]);
 *
 *   if (isLoading) return <div>Decrypting...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!balance) return <div>No balance</div>;
 *
 *   return <div>Balance: {balance.toString()}</div>;
 * }
 * ```
 */
export declare function useDecrypt(): {
    decrypt: any;
    isLoading: any;
    error: any;
};
//# sourceMappingURL=useDecrypt.d.ts.map