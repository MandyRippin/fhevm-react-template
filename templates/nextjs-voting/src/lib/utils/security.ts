import { ethers } from 'ethers';

export class SecurityUtils {
  static validateAddress(address: string): boolean {
    try {
      return ethers.isAddress(address);
    } catch {
      return false;
    }
  }

  static validateHandle(handle: string): boolean {
    // Validate encrypted handle format
    return /^0x[a-fA-F0-9]{64}$/.test(handle);
  }

  static validateProof(proof: string): boolean {
    // Validate proof format
    return proof.length > 0 && proof.startsWith('0x');
  }

  static sanitizeInput(input: string): string {
    // Remove potentially dangerous characters
    return input.replace(/[<>]/g, '');
  }

  static async signMessage(
    message: string,
    signer: ethers.Signer
  ): Promise<string> {
    try {
      return await signer.signMessage(message);
    } catch (error) {
      console.error('Signature error:', error);
      throw new Error('Failed to sign message');
    }
  }

  static async verifySignature(
    message: string,
    signature: string,
    expectedAddress: string
  ): Promise<boolean> {
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);
      return recoveredAddress.toLowerCase() === expectedAddress.toLowerCase();
    } catch {
      return false;
    }
  }

  static hashData(data: string): string {
    return ethers.keccak256(ethers.toUtf8Bytes(data));
  }
}
