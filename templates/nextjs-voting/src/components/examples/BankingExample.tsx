'use client';

import React, { useState } from 'react';
import { useFhevm, useEncryptedInput } from '@fhevm/universal-sdk';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface BankingExampleProps {
  contractAddress: string;
  userAddress: string;
}

export const BankingExample: React.FC<BankingExampleProps> = ({
  contractAddress,
  userAddress,
}) => {
  const { client, isInitialized } = useFhevm();
  const { createInput, isLoading } = useEncryptedInput(contractAddress);

  const [amount, setAmount] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [transactionStatus, setTransactionStatus] = useState<string>('');

  const handleTransfer = async () => {
    if (!amount || !recipient || !client) return;

    try {
      setTransactionStatus('Encrypting transaction amount...');

      const transferAmount = parseInt(amount);
      const input = await createInput(userAddress);
      const encryptedInput = input.add32(transferAmount);
      const { handles, inputProof } = await encryptedInput.encrypt();

      setTransactionStatus('✓ Transaction prepared with encrypted amount');

      // In a real scenario, you would call the contract here
      // await contract.transfer(recipient, handles[0], inputProof);
    } catch (error) {
      console.error('Transfer error:', error);
      setTransactionStatus('Transaction failed');
    }
  };

  if (!isInitialized) {
    return (
      <Card title="Private Banking">
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="🏦 Private Banking Transfer"
      subtitle="Transfer funds with encrypted amounts"
    >
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Privacy Feature:</strong> Transaction amounts are encrypted and hidden from
            public view. Only you and authorized parties can see the actual amount.
          </p>
        </div>

        <Input
          label="Recipient Address"
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="0x..."
        />

        <Input
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          helperText="This amount will be encrypted before sending"
        />

        <Button
          onClick={handleTransfer}
          loading={isLoading}
          disabled={!amount || !recipient || isLoading}
        >
          Prepare Encrypted Transfer
        </Button>

        {transactionStatus && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">{transactionStatus}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">How it works:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>1. Your amount is encrypted client-side using FHE</li>
            <li>2. Encrypted data is sent to the blockchain</li>
            <li>3. Smart contract processes encrypted balance updates</li>
            <li>4. Transaction amount remains hidden from public</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
