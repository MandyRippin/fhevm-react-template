"use strict";
/**
 * React Hooks for FHEVM
 *
 * This module exports all React hooks for interacting with FHE-enabled contracts.
 *
 * @module hooks
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDecrypt = exports.useEncryptedInput = exports.useFhevm = void 0;
var useFhevm_1 = require("./useFhevm");
Object.defineProperty(exports, "useFhevm", { enumerable: true, get: function () { return useFhevm_1.useFhevm; } });
var useEncryptedInput_1 = require("./useEncryptedInput");
Object.defineProperty(exports, "useEncryptedInput", { enumerable: true, get: function () { return useEncryptedInput_1.useEncryptedInput; } });
var useDecrypt_1 = require("./useDecrypt");
Object.defineProperty(exports, "useDecrypt", { enumerable: true, get: function () { return useDecrypt_1.useDecrypt; } });
