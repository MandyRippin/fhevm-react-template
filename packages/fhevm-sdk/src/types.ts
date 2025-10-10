export interface EncryptedInput {
  add8(value: number): EncryptedInput;
  add16(value: number): EncryptedInput;
  add32(value: number): EncryptedInput;
  add64(value: bigint): EncryptedInput;
  addBool(value: boolean): EncryptedInput;
  encrypt(): Promise<{
    handles: Uint8Array[];
    inputProof: string;
  }>;
}

export type FhevmType = 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'ebool';

export interface DecryptResult {
  value: bigint;
  type: FhevmType;
}
