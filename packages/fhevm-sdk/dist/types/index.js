"use strict";
/**
 * Type Definitions for FHEVM SDK
 *
 * This module contains all TypeScript type definitions and interfaces
 * used throughout the FHEVM SDK.
 *
 * @module types
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FhevmError = exports.FhevmErrorType = exports.NETWORKS = void 0;
/**
 * Common network configurations
 */
exports.NETWORKS = {
    sepolia: {
        name: 'Sepolia',
        chainId: 11155111,
        gatewayUrl: 'https://gateway.sepolia.fhevm.io'
    },
    localhost: {
        name: 'Localhost',
        chainId: 31337,
        gatewayUrl: 'http://localhost:8545'
    }
};
/**
 * Error types for FHEVM operations
 */
var FhevmErrorType;
(function (FhevmErrorType) {
    FhevmErrorType["NOT_INITIALIZED"] = "NOT_INITIALIZED";
    FhevmErrorType["ENCRYPTION_FAILED"] = "ENCRYPTION_FAILED";
    FhevmErrorType["DECRYPTION_FAILED"] = "DECRYPTION_FAILED";
    FhevmErrorType["INVALID_HANDLE"] = "INVALID_HANDLE";
    FhevmErrorType["INVALID_ADDRESS"] = "INVALID_ADDRESS";
    FhevmErrorType["NETWORK_ERROR"] = "NETWORK_ERROR";
    FhevmErrorType["USER_REJECTED"] = "USER_REJECTED";
})(FhevmErrorType || (exports.FhevmErrorType = FhevmErrorType = {}));
/**
 * Custom error class for FHEVM operations
 */
class FhevmError extends Error {
    constructor(type, message, originalError) {
        super(message);
        this.name = 'FhevmError';
        this.type = type;
        this.originalError = originalError;
    }
}
exports.FhevmError = FhevmError;
