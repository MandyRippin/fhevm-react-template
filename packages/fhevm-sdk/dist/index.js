"use strict";
/**
 * Universal FHEVM SDK
 * Framework-agnostic SDK for building privacy-preserving dApps
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDecrypt = exports.useEncryptedInput = exports.useFhevm = exports.FhevmProvider = exports.FhevmClient = void 0;
var client_1 = require("./client");
Object.defineProperty(exports, "FhevmClient", { enumerable: true, get: function () { return client_1.FhevmClient; } });
var react_1 = require("./react");
Object.defineProperty(exports, "FhevmProvider", { enumerable: true, get: function () { return react_1.FhevmProvider; } });
Object.defineProperty(exports, "useFhevm", { enumerable: true, get: function () { return react_1.useFhevm; } });
Object.defineProperty(exports, "useEncryptedInput", { enumerable: true, get: function () { return react_1.useEncryptedInput; } });
Object.defineProperty(exports, "useDecrypt", { enumerable: true, get: function () { return react_1.useDecrypt; } });
__exportStar(require("./types"), exports);
__exportStar(require("./utils"), exports);
