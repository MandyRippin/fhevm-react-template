import { useState, useEffect } from 'react';
import { FhevmProvider, useFhevm, useEncryptedInput } from '@fhevm/universal-sdk';

function EncryptDemo() {
  const { client, isInitialized, error } = useFhevm();
  const [address, setAddress] = useState('');
  const [value, setValue] = useState('42');
  const [encrypted, setEncrypted] = useState<any>(null);
  
  const CONTRACT_ADDRESS = '0x3825C6a1BAf65d3fF39C3e0cEbbe4b76D2567488';
  const { createInput, isLoading } = useEncryptedInput(CONTRACT_ADDRESS);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts: string[]) => setAddress(accounts[0]));
    }
  }, []);

  const handleEncrypt = async () => {
    try {
      const input = await createInput(address);
      const enc = input.add32(parseInt(value));
      const result = await enc.encrypt();
      setEncrypted(result);
    } catch (err) {
      console.error('Encryption error:', err);
    }
  };

  if (error) return <div>Error: {error.message}</div>;
  if (!isInitialized) return <div>Initializing FHEVM...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>FHEVM Encryption Demo</h2>
      <p>Connected: {address ? address.slice(0, 10) + '...' : 'Not connected'}</p>
      
      <div style={{ marginTop: '2rem' }}>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        />
        <button
          onClick={handleEncrypt}
          disabled={isLoading || !address}
          style={{
            padding: '0.5rem 1rem',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isLoading ? 'Encrypting...' : 'Encrypt Value'}
        </button>
      </div>

      {encrypted && (
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
          <h3>Encrypted Result:</h3>
          <p><strong>Handles:</strong> {encrypted.handles.length} handles generated</p>
          <p><strong>Proof:</strong> {encrypted.inputProof.slice(0, 50)}...</p>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    if (window.ethereum) {
      setProvider(window.ethereum);
    }
  }, []);

  if (!provider) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>FHEVM React Example</h1>
        <p>Please install MetaMask to continue</p>
      </div>
    );
  }

  return (
    <FhevmProvider config={{ provider }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>Universal FHEVM SDK</h1>
        <p>Basic React Example</p>
        <EncryptDemo />
      </div>
    </FhevmProvider>
  );
}
