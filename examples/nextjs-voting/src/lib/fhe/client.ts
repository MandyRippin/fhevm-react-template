import { FhevmClient } from '@fhevm/universal-sdk';
import type { EncryptedInput, EncryptionResult } from '../../types/fhe';

export class FHEClientWrapper {
  private client: FhevmClient;

  constructor(client: FhevmClient) {
    this.client = client;
  }

  async encryptValue(
    value: number,
    contractAddress: string,
    userAddress: string,
    bitSize: 8 | 16 | 32 | 64 = 32
  ): Promise<EncryptionResult> {
    try {
      const input = await this.client.createEncryptedInput(contractAddress, userAddress);

      let encryptedInput: EncryptedInput;

      switch (bitSize) {
        case 8:
          encryptedInput = input.add8(value);
          break;
        case 16:
          encryptedInput = input.add16(value);
          break;
        case 32:
          encryptedInput = input.add32(value);
          break;
        case 64:
          encryptedInput = input.add64(value);
          break;
        default:
          encryptedInput = input.add32(value);
      }

      const { handles, inputProof } = await encryptedInput.encrypt();

      return {
        handle: handles[0],
        proof: inputProof,
        success: true,
      };
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error(`Failed to encrypt value: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async encryptBoolean(
    value: boolean,
    contractAddress: string,
    userAddress: string
  ): Promise<EncryptionResult> {
    try {
      const input = await this.client.createEncryptedInput(contractAddress, userAddress);
      const encryptedInput = input.addBool(value);
      const { handles, inputProof } = await encryptedInput.encrypt();

      return {
        handle: handles[0],
        proof: inputProof,
        success: true,
      };
    } catch (error) {
      console.error('Boolean encryption error:', error);
      throw new Error(`Failed to encrypt boolean: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async decryptValue(
    handle: string,
    contractAddress: string
  ): Promise<number> {
    try {
      const decrypted = await this.client.decrypt(handle, contractAddress);
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error(`Failed to decrypt value: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  getPublicKey(): Promise<string> {
    return this.client.getPublicKey();
  }
}
