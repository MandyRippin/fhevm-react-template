export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface EncryptRequest {
  value: number | boolean;
  contractAddress: string;
  userAddress: string;
  type?: 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool';
}

export interface EncryptResponse {
  handle: string;
  proof: string;
  timestamp: number;
}

export interface DecryptRequest {
  handle: string;
  contractAddress: string;
  signature?: string;
}

export interface DecryptResponse {
  value: number | boolean;
  type: string;
  timestamp: number;
}

export interface ComputeRequest {
  operation: 'add' | 'subtract' | 'multiply';
  operand1: number;
  operand2: number;
  contractAddress: string;
  userAddress: string;
}

export interface ComputeResponse {
  resultHandle: string;
  proof: string;
  operation: string;
}

export interface KeysResponse {
  publicKey: string;
  chainId: number;
  network: string;
}
