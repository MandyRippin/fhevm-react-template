export class KeyManager {
  private publicKey: string | null = null;
  private chainId: number | null = null;

  setPublicKey(key: string, chainId: number): void {
    this.publicKey = key;
    this.chainId = chainId;
  }

  getPublicKey(): string | null {
    return this.publicKey;
  }

  getChainId(): number | null {
    return this.chainId;
  }

  isInitialized(): boolean {
    return !!(this.publicKey && this.chainId);
  }

  clear(): void {
    this.publicKey = null;
    this.chainId = null;
  }

  exportKeyInfo(): { publicKey: string; chainId: number } | null {
    if (!this.isInitialized()) {
      return null;
    }

    return {
      publicKey: this.publicKey!,
      chainId: this.chainId!,
    };
  }
}

export const keyManager = new KeyManager();
