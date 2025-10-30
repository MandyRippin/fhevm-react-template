"use strict";
/**
 * Framework Adapters
 *
 * This module exports framework-specific adapters for the FHEVM SDK.
 * Currently includes React adapter with potential for Vue, Angular, etc.
 *
 * @module adapters
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FhevmContext = exports.FhevmProvider = void 0;
var react_1 = require("./react");
Object.defineProperty(exports, "FhevmProvider", { enumerable: true, get: function () { return react_1.FhevmProvider; } });
Object.defineProperty(exports, "FhevmContext", { enumerable: true, get: function () { return react_1.FhevmContext; } });
