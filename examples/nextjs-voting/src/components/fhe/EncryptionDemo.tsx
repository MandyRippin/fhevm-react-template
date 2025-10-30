'use client';

import React, { useState } from 'react';
import { useFhevm, useEncryptedInput } from '@fhevm/universal-sdk';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface EncryptionDemoProps {
  contractAddress: string;
  userAddress: string;
}

export const EncryptionDemo: React.FC<EncryptionDemoProps> = ({
  contractAddress,
  userAddress,
}) => {
  const { client, isInitialized } = useFhevm();
  const { createInput, isLoading } = useEncryptedInput(contractAddress);

  const [value, setValue] = useState<string>('');
  const [encryptedResult, setEncryptedResult] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleEncrypt = async () => {
    if (!value || !client) return;

    try {
      setStatusMessage('Encrypting value...');

      const numValue = parseInt(value);
      const input = await createInput(userAddress);
      const encryptedInput = input.add32(numValue);
      const { handles, inputProof } = await encryptedInput.encrypt();

      setEncryptedResult(handles[0]);
      setStatusMessage('Successfully encrypted!');
    } catch (error) {
      console.error('Encryption error:', error);
      setStatusMessage('Encryption failed');
    }
  };

  if (!isInitialized) {
    return (
      <Card title="Encryption Demo" subtitle="Initializing FHE system...">
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      </Card>
    );
  }

  return (
    <Card title="Encryption Demo" subtitle="Encrypt data using FHE">
      <div className="space-y-4">
        <Input
          label="Value to Encrypt"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a number"
        />

        <Button
          onClick={handleEncrypt}
          loading={isLoading}
          disabled={!value || isLoading}
        >
          Encrypt Value
        </Button>

        {statusMessage && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">{statusMessage}</p>
          </div>
        )}

        {encryptedResult && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm font-mono break-all text-gray-800">
              <strong>Encrypted Handle:</strong> {encryptedResult}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
