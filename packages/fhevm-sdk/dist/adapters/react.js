"use strict";
/**
 * React Adapter for FHEVM SDK
 *
 * This module provides React-specific components and context for managing
 * FHEVM client instances in React applications.
 *
 * @module adapters/react
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FhevmContext = void 0;
exports.FhevmProvider = FhevmProvider;
const react_1 = __importStar(require("react"));
const fhevm_1 = require("../core/fhevm");
/**
 * React Context for FHEVM client
 */
exports.FhevmContext = (0, react_1.createContext)({
    client: null,
    isInitialized: false,
    error: null
});
/**
 * Provider component for FHEVM SDK
 *
 * This component initializes the FHEVM client and makes it available to all
 * child components through the FhevmContext.
 *
 * @param props - Provider props
 * @returns React component
 *
 * @example
 * ```typescript
 * import { FhevmProvider } from '@fhevm/universal-sdk';
 *
 * function App() {
 *   return (
 *     <FhevmProvider config={{
 *       provider: window.ethereum,
 *       network: 'sepolia',
 *       gatewayUrl: 'https://gateway.fhevm.io'
 *     }}>
 *       <YourApp />
 *     </FhevmProvider>
 *   );
 * }
 * ```
 */
function FhevmProvider({ config, children }) {
    const [client, setClient] = (0, react_1.useState)(null);
    const [isInitialized, setIsInitialized] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        let mounted = true;
        const initClient = async () => {
            try {
                const fhevmClient = new fhevm_1.FhevmClient(config);
                await fhevmClient.init();
                if (mounted) {
                    setClient(fhevmClient);
                    setIsInitialized(true);
                    setError(null);
                }
            }
            catch (err) {
                if (mounted) {
                    const error = err instanceof Error ? err : new Error('Failed to initialize FHEVM client');
                    setError(error);
                    setIsInitialized(false);
                }
            }
        };
        initClient();
        return () => {
            mounted = false;
        };
    }, [config]);
    const contextValue = {
        client,
        isInitialized,
        error
    };
    return react_1.default.createElement(exports.FhevmContext.Provider, { value: contextValue }, children);
}
