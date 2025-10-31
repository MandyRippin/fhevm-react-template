'use client';

import React, { useState } from 'react';
import { useFhevm, useEncryptedInput } from '@fhevm/universal-sdk';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface ComputationDemoProps {
  contractAddress: string;
  userAddress: string;
}

export const ComputationDemo: React.FC<ComputationDemoProps> = ({
  contractAddress,
  userAddress,
}) => {
  const { client, isInitialized } = useFhevm();
  const { createInput, isLoading } = useEncryptedInput(contractAddress);

  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply'>('add');
  const [result, setResult] = useState<string>('');

  const handleCompute = async () => {
    if (!value1 || !value2 || !client) return;

    try {
      const num1 = parseInt(value1);
      const num2 = parseInt(value2);

      const input = await createInput(userAddress);
      let encryptedInput = input.add32(num1);

      // In real scenario, operations would be done on-chain with encrypted values
      // This is just demonstrating the encryption capability
      const { handles } = await encryptedInput.encrypt();

      setResult(`Encrypted computation prepared. Handle: ${handles[0].slice(0, 20)}...`);
    } catch (error) {
      console.error('Computation error:', error);
      setResult('Computation failed');
    }
  };

  if (!isInitialized) {
    return (
      <Card title="Computation Demo" subtitle="Loading...">
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      </Card>
    );
  }

  return (
    <Card title="Homomorphic Computation" subtitle="Perform operations on encrypted data">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Value"
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="Enter first number"
          />
          <Input
            label="Second Value"
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="Enter second number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Operation
          </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="add">Addition</option>
            <option value="subtract">Subtraction</option>
            <option value="multiply">Multiplication</option>
          </select>
        </div>

        <Button
          onClick={handleCompute}
          loading={isLoading}
          disabled={!value1 || !value2 || isLoading}
        >
          Compute on Encrypted Data
        </Button>

        {result && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">{result}</p>
          </div>
        )}
      </div>
    </Card>
  );
};
