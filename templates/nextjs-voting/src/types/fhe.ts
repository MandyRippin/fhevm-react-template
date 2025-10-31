export interface FhevmConfig {
  provider: any;
  network?: string;
  chainId?: number;
}

export interface EncryptedInput {
  add8(value: number): EncryptedInput;
  add16(value: number): EncryptedInput;
  add32(value: number): EncryptedInput;
  add64(value: number): EncryptedInput;
  addBool(value: boolean): EncryptedInput;
  encrypt(): Promise<{ handles: string[]; inputProof: string }>;
}

export interface EncryptionResult {
  handle: string;
  proof: string;
  success: boolean;
  error?: string;
}

export interface DecryptionResult {
  value: number | boolean;
  success: boolean;
  error?: string;
}

export interface FHEClientInstance {
  init(): Promise<void>;
  createEncryptedInput(contractAddress: string, userAddress: string): Promise<EncryptedInput>;
  decrypt(handle: string, contractAddress: string): Promise<number>;
  getPublicKey(): Promise<string>;
}
