'use client';

import { useState, useCallback } from 'react';
import { useFHE } from './useFHE';

interface ComputationOptions {
  operation: 'add' | 'subtract' | 'multiply';
  operand1: number;
  operand2: number;
}

export const useComputation = (contractAddress: string, userAddress: string) => {
  const { fheClient, isReady } = useFHE();
  const [isComputing, setIsComputing] = useState(false);
  const [computationError, setComputationError] = useState<Error | null>(null);
  const [result, setResult] = useState<any>(null);

  const compute = useCallback(
    async (options: ComputationOptions) => {
      if (!fheClient || !isReady) {
        setComputationError(new Error('FHE client not ready'));
        return null;
      }

      setIsComputing(true);
      setComputationError(null);
      setResult(null);

      try {
        // Encrypt both operands
        const encrypted1 = await fheClient.encryptValue(
          options.operand1,
          contractAddress,
          userAddress
        );
        const encrypted2 = await fheClient.encryptValue(
          options.operand2,
          contractAddress,
          userAddress
        );

        if (!encrypted1 || !encrypted2) {
          throw new Error('Failed to encrypt operands');
        }

        // In a real implementation, the actual computation would happen on-chain
        // Here we're just demonstrating the encryption part
        const computationResult = {
          operation: options.operation,
          encryptedOperand1: encrypted1.handle,
          encryptedOperand2: encrypted2.handle,
          proof1: encrypted1.proof,
          proof2: encrypted2.proof,
          message: `Encrypted ${options.operation} operation prepared for on-chain computation`,
        };

        setResult(computationResult);
        return computationResult;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Computation failed');
        setComputationError(err);
        return null;
      } finally {
        setIsComputing(false);
      }
    },
    [fheClient, isReady, contractAddress, userAddress]
  );

  const reset = useCallback(() => {
    setResult(null);
    setComputationError(null);
  }, []);

  return {
    compute,
    reset,
    isComputing,
    computationError,
    result,
    isReady,
  };
};
