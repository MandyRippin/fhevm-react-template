'use client';

import { useState, useEffect } from 'react';
import { FhevmProvider, useFhevm, useEncryptedInput } from '@fhevm/universal-sdk';

// Voting component
function VotingInterface() {
  const { client, isInitialized } = useFhevm();
  const [address, setAddress] = useState('');
  const CONTRACT_ADDRESS = '0x3825C6a1BAf65d3fF39C3e0cEbbe4b76D2567488';
  const { createInput, isLoading } = useEncryptedInput(CONTRACT_ADDRESS);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts: string[]) => setAddress(accounts[0]));
    }
  }, []);

  const castVote = async (candidateId: number) => {
    if (!client || !address) return;
    
    try {
      const input = await createInput(address);
      const encrypted = input.add32(candidateId);
      const { handles, inputProof } = await encrypted.encrypt();
      
      console.log('Vote encrypted:', { handles, inputProof });
      alert('Vote cast successfully (encrypted)');
    } catch (error) {
      console.error('Error:', error);
      alert('Error casting vote');
    }
  };

  if (!isInitialized) {
    return <div className="loading">Initializing FHEVM...</div>;
  }

  return (
    <div className="voting-container">
      <h2>Cast Your Vote</h2>
      <p>Connected: {address ? address.slice(0, 6) + '...' + address.slice(-4) : 'Not connected'}</p>
      
      <div className="candidates">
        <button onClick={() => castVote(1)} disabled={isLoading}>
          Vote for Candidate 1
        </button>
        <button onClick={() => castVote(2)} disabled={isLoading}>
          Vote for Candidate 2
        </button>
        <button onClick={() => castVote(3)} disabled={isLoading}>
          Vote for Candidate 3
        </button>
        <button onClick={() => castVote(4)} disabled={isLoading}>
          Vote for Candidate 4
        </button>
      </div>
    </div>
  );
}

// Main page component
export default function Home() {
  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      setProvider(window.ethereum);
    }
  }, []);

  if (!provider) {
    return (
      <main>
        <h1>FHEVM Voting Example</h1>
        <p>Please install MetaMask to use this application</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Privacy-Preserving Voting</h1>
      <p>Using Universal FHEVM SDK with Next.js</p>
      
      <FhevmProvider config={{ provider }}>
        <VotingInterface />
      </FhevmProvider>

      <style jsx>{`
        main {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }
        .voting-container {
          margin-top: 2rem;
          padding: 2rem;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        .candidates {
          display: grid;
          gap: 1rem;
          margin-top: 1rem;
        }
        button {
          padding: 1rem;
          font-size: 1rem;
          border: none;
          background: #0070f3;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background: #0051cc;
        }
        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .loading {
          text-align: center;
          padding: 2rem;
        }
      `}</style>
    </main>
  );
}
