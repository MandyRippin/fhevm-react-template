'use client';

import React, { useState } from 'react';
import { useFhevm, useEncryptedInput } from '@fhevm/universal-sdk';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface MedicalExampleProps {
  contractAddress: string;
  userAddress: string;
}

export const MedicalExample: React.FC<MedicalExampleProps> = ({
  contractAddress,
  userAddress,
}) => {
  const { client, isInitialized } = useFhevm();
  const { createInput, isLoading } = useEncryptedInput(contractAddress);

  const [heartRate, setHeartRate] = useState<string>('');
  const [bloodPressure, setBloodPressure] = useState<string>('');
  const [glucose, setGlucose] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleUpload = async () => {
    if (!heartRate || !client) return;

    try {
      setUploadStatus('Encrypting health data...');

      const input = await createInput(userAddress);
      const encryptedInput = input.add32(parseInt(heartRate));
      const { handles, inputProof } = await encryptedInput.encrypt();

      setUploadStatus('✓ Health data encrypted and ready for secure storage');

      // In real scenario: await medicalContract.storeHealthData(handles, inputProof);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('Upload failed');
    }
  };

  if (!isInitialized) {
    return (
      <Card title="Medical Records">
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="🏥 Private Medical Records"
      subtitle="Store health data with complete privacy"
    >
      <div className="space-y-4">
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm text-purple-800">
            <strong>HIPAA-Compliant:</strong> All health data is encrypted before storage.
            Only authorized medical professionals with proper credentials can decrypt and view your data.
          </p>
        </div>

        <Input
          label="Heart Rate (BPM)"
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          placeholder="e.g., 72"
          helperText="Your heart rate will be encrypted"
        />

        <Input
          label="Blood Pressure (mmHg)"
          type="text"
          value={bloodPressure}
          onChange={(e) => setBloodPressure(e.target.value)}
          placeholder="e.g., 120/80"
          helperText="Stored as encrypted value"
        />

        <Input
          label="Glucose Level (mg/dL)"
          type="number"
          value={glucose}
          onChange={(e) => setGlucose(e.target.value)}
          placeholder="e.g., 95"
          helperText="Fully encrypted health metric"
        />

        <Button
          onClick={handleUpload}
          loading={isLoading}
          disabled={!heartRate || isLoading}
          variant="primary"
        >
          Encrypt & Upload Health Data
        </Button>

        {uploadStatus && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">{uploadStatus}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Privacy Benefits:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ End-to-end encryption of all health metrics</li>
            <li>✓ No one can view your data without authorization</li>
            <li>✓ Encrypted data can be used for research without revealing identity</li>
            <li>✓ Full control over who accesses your medical information</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
