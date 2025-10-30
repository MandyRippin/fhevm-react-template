"use strict";
/**
 * React Hook: useFhevm
 *
 * This hook provides access to the FHEVM client instance from the FhevmProvider context.
 * It's the primary hook for accessing FHEVM functionality in React components.
 *
 * @module hooks/useFhevm
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFhevm = useFhevm;
const react_1 = require("react");
const react_2 = require("../adapters/react");
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
function useFhevm() {
    const context = (0, react_1.useContext)(react_2.FhevmContext);
    if (!context) {
        throw new Error('useFhevm must be used within FhevmProvider');
    }
    return context;
}
