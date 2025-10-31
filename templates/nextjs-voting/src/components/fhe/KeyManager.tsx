'use client';

import React from 'react';
import { useFhevm } from '@fhevm/universal-sdk';
import { Card } from '../ui/Card';

export const KeyManager: React.FC = () => {
  const { client, isInitialized, error } = useFhevm();
  const [publicKey, setPublicKey] = React.useState<string>('');

  React.useEffect(() => {
    const loadPublicKey = async () => {
      if (client && isInitialized) {
        try {
          const key = await client.getPublicKey();
          setPublicKey(key);
        } catch (err) {
          console.error('Failed to load public key:', err);
        }
      }
    };

    loadPublicKey();
  }, [client, isInitialized]);

  if (error) {
    return (
      <Card title="Key Management">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">Error: {error.message}</p>
        </div>
      </Card>
    );
  }

  if (!isInitialized) {
    return (
      <Card title="Key Management">
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      </Card>
    );
  }

  return (
    <Card title="FHE Key Management" subtitle="Public encryption key information">
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Public Key</h4>
          <p className="text-xs font-mono break-all text-gray-600">
            {publicKey || 'Loading...'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Status</p>
            <p className="text-sm font-semibold text-blue-800">
              {isInitialized ? '✓ Initialized' : '○ Not Ready'}
            </p>
          </div>
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Encryption</p>
            <p className="text-sm font-semibold text-green-800">
              {publicKey ? '✓ Ready' : '○ Loading'}
            </p>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> This public key is used to encrypt all data client-side before
            sending to the blockchain. Only authorized parties can decrypt the results.
          </p>
        </div>
      </div>
    </Card>
  );
};
