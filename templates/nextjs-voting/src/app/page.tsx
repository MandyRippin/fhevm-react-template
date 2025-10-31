'use client';

import { useState, useEffect } from 'react';
import { FhevmProvider } from '@fhevm/universal-sdk';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { EncryptionDemo } from '../components/fhe/EncryptionDemo';
import { ComputationDemo } from '../components/fhe/ComputationDemo';
import { KeyManager } from '../components/fhe/KeyManager';
import { BankingExample } from '../components/examples/BankingExample';
import { MedicalExample } from '../components/examples/MedicalExample';

const CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890';

export default function Home() {
  const [provider, setProvider] = useState<any>(null);
  const [account, setAccount] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'demos' | 'examples'>('demos');

  useEffect(() => {
    const init = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        setProvider(window.ethereum);

        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          setAccount(accounts[0]);
        } catch (error) {
          console.error('Failed to connect wallet:', error);
        }
      }
    };

    init();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🔐 FHEVM Next.js Demo
            </h1>
            <p className="text-gray-600">
              Privacy-preserving applications with Fully Homomorphic Encryption
            </p>
          </div>
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 font-semibold mb-2">
              MetaMask Required
            </p>
            <p className="text-sm text-yellow-700">
              Please install MetaMask browser extension to use this application.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <FhevmProvider config={{ provider }}>
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🔐 FHEVM Next.js Complete Demo
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Build privacy-preserving applications with Fully Homomorphic Encryption
            </p>

            {!account ? (
              <Button onClick={connectWallet} size="lg" className="mb-4">
                Connect Wallet
              </Button>
            ) : (
              <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3 mb-4">
                <p className="text-white font-semibold">
                  Connected: {account.slice(0, 6)}...{account.slice(-4)}
                </p>
              </div>
            )}
          </div>

          {account && (
            <>
              {/* Tab Navigation */}
              <div className="flex justify-center mb-8 gap-4">
                <Button
                  variant={activeTab === 'demos' ? 'primary' : 'secondary'}
                  onClick={() => setActiveTab('demos')}
                >
                  FHE Demos
                </Button>
                <Button
                  variant={activeTab === 'examples' ? 'primary' : 'secondary'}
                  onClick={() => setActiveTab('examples')}
                >
                  Use Cases
                </Button>
              </div>

              {/* Content */}
              {activeTab === 'demos' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Key Manager */}
                  <div className="lg:col-span-2">
                    <KeyManager />
                  </div>

                  {/* Encryption Demo */}
                  <EncryptionDemo contractAddress={CONTRACT_ADDRESS} userAddress={account} />

                  {/* Computation Demo */}
                  <ComputationDemo contractAddress={CONTRACT_ADDRESS} userAddress={account} />

                  {/* Info Card */}
                  <div className="lg:col-span-2">
                    <Card title="📚 How FHE Works" padding="lg">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-3xl">🔒</span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">Client-Side Encryption</h3>
                          <p className="text-sm text-gray-600">
                            Data is encrypted in your browser before leaving your device
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-3xl">⚡</span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">On-Chain Computation</h3>
                          <p className="text-sm text-gray-600">
                            Smart contracts compute on encrypted data without decryption
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-3xl">🔓</span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">Selective Decryption</h3>
                          <p className="text-sm text-gray-600">
                            Only authorized parties can decrypt results with proper credentials
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === 'examples' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Banking Example */}
                  <BankingExample contractAddress={CONTRACT_ADDRESS} userAddress={account} />

                  {/* Medical Example */}
                  <MedicalExample contractAddress={CONTRACT_ADDRESS} userAddress={account} />

                  {/* Additional Use Cases Info */}
                  <div className="lg:col-span-2">
                    <Card title="🎯 Real-World Applications" padding="lg">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Financial Services</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>✓ Private transactions with hidden amounts</li>
                            <li>✓ Confidential credit scoring</li>
                            <li>✓ Anonymous voting in DAOs</li>
                            <li>✓ Sealed-bid auctions</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Healthcare & Privacy</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>✓ Encrypted health records</li>
                            <li>✓ Private medical research</li>
                            <li>✓ HIPAA-compliant data storage</li>
                            <li>✓ Anonymous health surveys</li>
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-12 text-center">
                <Card className="bg-white bg-opacity-90">
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      <strong>Powered by Universal FHEVM SDK</strong>
                    </p>
                    <p className="text-sm text-gray-600">
                      Framework-agnostic SDK for building privacy-preserving decentralized applications
                    </p>
                    <div className="flex justify-center gap-4 text-sm">
                      <a href="https://docs.zama.ai/fhevm" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        Documentation
                      </a>
                      <a href="https://github.com/zama-ai/fhevm" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </FhevmProvider>
  );
}
