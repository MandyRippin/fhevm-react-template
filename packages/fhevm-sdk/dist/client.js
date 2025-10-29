"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FhevmClient = void 0;
const ethers_1 = require("ethers");
const fhevmjs_1 = require("fhevmjs");
class FhevmClient {
    constructor(config) {
        this.instance = null;
        this.config = config;
        this.provider = new ethers_1.BrowserProvider(config.provider);
    }
    async init() {
        const network = await this.provider.getNetwork();
        const chainId = Number(network.chainId);
        this.instance = await (0, fhevmjs_1.createInstance)({
            chainId,
            publicKey: this.config.gatewayUrl || '',
            gatewayUrl: this.config.gatewayUrl || ''
        });
    }
    getInstance() {
        if (!this.instance) {
            throw new Error('FhevmClient not initialized. Call init() first.');
        }
        return this.instance;
    }
    getProvider() {
        return this.provider;
    }
    async createEncryptedInput(contractAddress, userAddress) {
        const instance = this.getInstance();
        return instance.createEncryptedInput(contractAddress, userAddress);
    }
    async decrypt(handle, contractAddress) {
        const instance = this.getInstance();
        const signer = await this.provider.getSigner();
        return instance.decrypt(contractAddress, handle, signer);
    }
}
exports.FhevmClient = FhevmClient;
