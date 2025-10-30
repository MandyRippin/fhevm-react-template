"use strict";
/**
 * React Hook: useDecrypt
 *
 * This hook provides functionality to decrypt encrypted values from FHE-enabled contracts.
 * It manages the loading state and provides a convenient interface for decryption operations.
 *
 * @module hooks/useDecrypt
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDecrypt = useDecrypt;
const react_1 = require("react");
const useFhevm_1 = require("./useFhevm");
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
function useDecrypt() {
    const { client, isInitialized } = (0, useFhevm_1.useFhevm)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    /**
     * Decrypts an encrypted value from a contract
     *
     * This function uses EIP-712 signing to authorize decryption.
     * The user will be prompted to sign a message to prove ownership.
     *
     * @param handle - The encrypted value handle (ciphertext reference)
     * @param contractAddress - The address of the contract containing the encrypted value
     * @throws {Error} If FHEVM client is not initialized or decryption fails
     * @returns Promise resolving to the decrypted value as a bigint
     */
    const decrypt = (0, react_1.useCallback)(async (handle, contractAddress) => {
        if (!client || !isInitialized) {
            throw new Error('FHEVM client not initialized');
        }
        setIsLoading(true);
        setError(null);
        try {
            const decryptedValue = await client.decrypt(handle, contractAddress);
            return decryptedValue;
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error('Decryption failed');
            setError(error);
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    }, [client, isInitialized]);
    return {
        decrypt,
        isLoading,
        error
    };
}
