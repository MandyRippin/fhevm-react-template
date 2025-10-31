export interface EncryptedValue {
  handle: string;
  proof: string;
}

export interface FHEOperation {
  type: 'add' | 'subtract' | 'multiply' | 'divide';
  operands: EncryptedValue[];
}

export interface DecryptionRequest {
  handle: string;
  contractAddress: string;
  signature?: string;
}

export interface DecryptionResponse {
  value: number;
  success: boolean;
  error?: string;
}

export type EncryptedType = 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'ebool';

export interface EncryptionMetadata {
  type: EncryptedType;
  timestamp: number;
  contractAddress: string;
  userAddress: string;
}
