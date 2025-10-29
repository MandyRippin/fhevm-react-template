"use strict";
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
exports.FhevmProvider = FhevmProvider;
exports.useFhevm = useFhevm;
exports.useEncryptedInput = useEncryptedInput;
exports.useDecrypt = useDecrypt;
const react_1 = __importStar(require("react"));
const client_1 = require("./client");
const FhevmContext = (0, react_1.createContext)({
    client: null,
    isInitialized: false,
    error: null
});
function FhevmProvider({ config, children }) {
    const [client, setClient] = (0, react_1.useState)(null);
    const [isInitialized, setIsInitialized] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const initClient = async () => {
            try {
                const fhevmClient = new client_1.FhevmClient(config);
                await fhevmClient.init();
                setClient(fhevmClient);
                setIsInitialized(true);
            }
            catch (err) {
                setError(err);
            }
        };
        initClient();
    }, [config]);
    return (react_1.default.createElement(FhevmContext.Provider, { value: { client, isInitialized, error } }, children));
}
function useFhevm() {
    const context = (0, react_1.useContext)(FhevmContext);
    if (!context) {
        throw new Error('useFhevm must be used within FhevmProvider');
    }
    return context;
}
function useEncryptedInput(contractAddress) {
    const { client, isInitialized } = useFhevm();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const createInput = async (userAddress) => {
        if (!client || !isInitialized) {
            throw new Error('FHEVM client not initialized');
        }
        setIsLoading(true);
        try {
            const input = await client.createEncryptedInput(contractAddress, userAddress);
            return input;
        }
        finally {
            setIsLoading(false);
        }
    };
    return { createInput, isLoading };
}
function useDecrypt() {
    const { client, isInitialized } = useFhevm();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const decrypt = async (handle, contractAddress) => {
        if (!client || !isInitialized) {
            throw new Error('FHEVM client not initialized');
        }
        setIsLoading(true);
        try {
            return await client.decrypt(handle, contractAddress);
        }
        finally {
            setIsLoading(false);
        }
    };
    return { decrypt, isLoading };
}
