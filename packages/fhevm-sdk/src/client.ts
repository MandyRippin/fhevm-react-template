import { BrowserProvider, Eip1193Provider } from 'ethers';
import { createInstance, FhevmInstance } from 'fhevmjs';

export interface FhevmClientConfig {
  provider: Eip1193Provider;
  network?: 'sepolia' | 'localhost';
  gatewayUrl?: string;
}

export class FhevmClient {
  private instance: FhevmInstance | null = null;
  private provider: BrowserProvider;
  private config: FhevmClientConfig;

  constructor(config: FhevmClientConfig) {
    this.config = config;
    this.provider = new BrowserProvider(config.provider);
  }

  async init(): Promise<void> {
    const network = await this.provider.getNetwork();
    const chainId = Number(network.chainId);

    this.instance = await createInstance({
      chainId,
      publicKey: this.config.gatewayUrl || '',
      gatewayUrl: this.config.gatewayUrl || ''
    });
  }

  getInstance(): FhevmInstance {
    if (!this.instance) {
      throw new Error('FhevmClient not initialized. Call init() first.');
    }
    return this.instance;
  }

  getProvider(): BrowserProvider {
    return this.provider;
  }

  async createEncryptedInput(contractAddress: string, userAddress: string) {
    const instance = this.getInstance();
    return instance.createEncryptedInput(contractAddress, userAddress);
  }

  async decrypt(handle: bigint, contractAddress: string): Promise<bigint> {
    const instance = this.getInstance();
    const signer = await this.provider.getSigner();
    
    return instance.decrypt(contractAddress, handle, signer as any);
  }
}
