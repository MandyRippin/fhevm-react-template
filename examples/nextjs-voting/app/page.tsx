'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { FhevmProvider, useFhevm, useEncryptedInput } from '@fhevm/universal-sdk';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../lib/contract-abi';

// Voting Interface Component
function VotingInterface() {
  const { client, isInitialized, error: fhevmError } = useFhevm();
  const { createInput, isLoading: isEncrypting } = useEncryptedInput(CONTRACT_ADDRESS);

  const [account, setAccount] = useState<string>('');
  const [contract, setContract] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Event data
  const [currentEventId, setCurrentEventId] = useState<number>(0);
  const [eventInfo, setEventInfo] = useState<any>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [eventCandidateIds, setEventCandidateIds] = useState<number[]>([]);
  const [hasVoted, setHasVoted] = useState(false);

  // Admin form states
  const [candidateName, setCandidateName] = useState('');
  const [candidateCategory, setCandidateCategory] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [voterAddress, setVoterAddress] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Connect wallet and initialize contract
  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
          });
          setAccount(accounts[0]);

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contractInstance = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            signer
          );
          setContract(contractInstance);

          // Check if user is admin
          const adminAddress = await contractInstance.admin();
          setIsAdmin(adminAddress.toLowerCase() === accounts[0].toLowerCase());

          // Check if user is authorized
          const authorized = await contractInstance.authorizedVoters(accounts[0]);
          setIsAuthorized(authorized);

          // Get current event ID
          const eventId = await contractInstance.currentEventId();
          setCurrentEventId(Number(eventId));

          if (Number(eventId) > 0) {
            await loadEventData(contractInstance, Number(eventId), accounts[0]);
          }
        } catch (error) {
          console.error('Initialization error:', error);
          setMessage('Error connecting to wallet');
        }
      } else {
        setMessage('Please install MetaMask');
      }
    };

    if (isInitialized) {
      init();
    }
  }, [isInitialized]);

  // Load event data
  const loadEventData = async (contractInstance: any, eventId: number, userAddress: string) => {
    try {
      const event = await contractInstance.events(eventId);
      setEventInfo({
        eventName: event.eventName,
        description: event.description,
        startTime: Number(event.startTime),
        endTime: Number(event.endTime),
        isActive: event.isActive,
        resultsRevealed: event.resultsRevealed,
        totalVotes: Number(event.totalVotes),
        winnerId: Number(event.winnerId)
      });

      // Get event candidates
      const candidateIds = await contractInstance.getEventCandidates(eventId);
      setEventCandidateIds(candidateIds.map((id: any) => Number(id)));

      // Load candidate details
      const candidateDetails = await Promise.all(
        candidateIds.map(async (id: any) => {
          const candidate = await contractInstance.candidates(id);
          return {
            id: Number(id),
            name: candidate.name,
            category: candidate.category,
            isActive: candidate.isActive
          };
        })
      );
      setCandidates(candidateDetails);

      // Check if user has voted
      const voted = await contractInstance.hasVoted(eventId, userAddress);
      setHasVoted(voted);
    } catch (error) {
      console.error('Error loading event data:', error);
    }
  };

  // Add candidate (Admin only)
  const handleAddCandidate = async () => {
    if (!contract || !candidateName || !candidateCategory) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    setMessage('Adding candidate...');

    try {
      const tx = await contract.addCandidate(candidateName, candidateCategory);
      await tx.wait();

      setMessage('Candidate added successfully!');
      setCandidateName('');
      setCandidateCategory('');

      // Reload to show new candidate
      setTimeout(() => window.location.reload(), 2000);
    } catch (error: any) {
      console.error('Error adding candidate:', error);
      setMessage(`Error: ${error.message || 'Failed to add candidate'}`);
    } finally {
      setLoading(false);
    }
  };

  // Create voting event (Admin only)
  const handleCreateEvent = async () => {
    if (!contract || !eventName || selectedCandidates.length < 2) {
      setMessage('Need event name and at least 2 candidates');
      return;
    }

    setLoading(true);
    setMessage('Creating voting event...');

    try {
      const tx = await contract.createVotingEvent(
        eventName,
        eventDescription,
        selectedCandidates
      );
      await tx.wait();

      setMessage('Voting event created successfully!');
      setEventName('');
      setEventDescription('');
      setSelectedCandidates([]);

      setTimeout(() => window.location.reload(), 2000);
    } catch (error: any) {
      console.error('Error creating event:', error);
      setMessage(`Error: ${error.message || 'Failed to create event'}`);
    } finally {
      setLoading(false);
    }
  };

  // Authorize voter (Admin only)
  const handleAuthorizeVoter = async () => {
    if (!contract || !voterAddress) {
      setMessage('Please enter voter address');
      return;
    }

    setLoading(true);
    setMessage('Authorizing voter...');

    try {
      const tx = await contract.authorizeVoter(voterAddress);
      await tx.wait();

      setMessage('Voter authorized successfully!');
      setVoterAddress('');
    } catch (error: any) {
      console.error('Error authorizing voter:', error);
      setMessage(`Error: ${error.message || 'Failed to authorize voter'}`);
    } finally {
      setLoading(false);
    }
  };

  // Cast encrypted vote using SDK
  const handleVote = async (candidateId: number) => {
    if (!client || !contract || !account || hasVoted) return;

    setLoading(true);
    setMessage('Encrypting your vote...');

    try {
      // Create encrypted input using SDK
      const input = await createInput(account);
      const encryptedInput = input.add32(candidateId);
      const { handles, inputProof } = await encryptedInput.encrypt();

      setMessage('Submitting encrypted vote...');

      // Cast vote on contract
      const tx = await contract.castVote(
        currentEventId,
        handles[0], // encrypted candidate ID
        inputProof
      );

      await tx.wait();

      setMessage('Vote cast successfully! Your vote is encrypted and private.');
      setHasVoted(true);

      // Reload event data
      setTimeout(() => loadEventData(contract, currentEventId, account), 2000);
    } catch (error: any) {
      console.error('Error casting vote:', error);
      setMessage(`Error: ${error.message || 'Failed to cast vote'}`);
    } finally {
      setLoading(false);
    }
  };

  if (fhevmError) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <h2>FHEVM Error</h2>
          <p>{fhevmError.message}</p>
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <h2>Initializing FHEVM...</h2>
          <p>Setting up encryption system</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1>🏆 Anonymous Sports Voting</h1>
        <p>Privacy-preserving voting using Fully Homomorphic Encryption</p>
        <p style={styles.account}>
          {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Not connected'}
        </p>
        <p style={styles.status}>
          {isAdmin && <span style={styles.badge}>ADMIN</span>}
          {isAuthorized && <span style={styles.badgeSuccess}>AUTHORIZED VOTER</span>}
        </p>
      </div>

      {/* Message display */}
      {message && (
        <div style={{...styles.card, ...styles.message}}>
          {message}
        </div>
      )}

      {/* Current Event Display */}
      {currentEventId > 0 && eventInfo && (
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>📊 Current Event</h2>
          <div style={styles.eventInfo}>
            <h3>{eventInfo.eventName}</h3>
            <p>{eventInfo.description}</p>
            <p>Total Votes: {eventInfo.totalVotes}</p>
            <p>Status: {eventInfo.isActive ? '🟢 Active' : '🔴 Ended'}</p>
            {hasVoted && <p style={styles.votedBadge}>✅ You have already voted</p>}
          </div>

          {/* Voting Section */}
          {isAuthorized && eventInfo.isActive && !hasVoted && (
            <div>
              <h3 style={styles.sectionTitle}>Cast Your Vote</h3>
              <div style={styles.candidateGrid}>
                {candidates.map((candidate) => (
                  <div key={candidate.id} style={styles.candidateCard}>
                    <h4>{candidate.name}</h4>
                    <p style={styles.category}>{candidate.category}</p>
                    <button
                      onClick={() => handleVote(candidate.id)}
                      disabled={loading || isEncrypting}
                      style={styles.voteButton}
                    >
                      {loading ? 'Voting...' : 'Vote'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isAuthorized && (
            <p style={styles.warning}>
              You are not authorized to vote. Contact admin for authorization.
            </p>
          )}
        </div>
      )}

      {/* Admin Panel */}
      {isAdmin && (
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>🔧 Admin Panel</h2>

          {/* Add Candidate */}
          <div style={styles.adminSection}>
            <h3>Add Candidate</h3>
            <input
              type="text"
              placeholder="Candidate Name"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Category (e.g., Best Player)"
              value={candidateCategory}
              onChange={(e) => setCandidateCategory(e.target.value)}
              style={styles.input}
            />
            <button
              onClick={handleAddCandidate}
              disabled={loading}
              style={styles.button}
            >
              Add Candidate
            </button>
          </div>

          {/* Create Event */}
          <div style={styles.adminSection}>
            <h3>Create Voting Event</h3>
            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              style={styles.input}
            />
            <textarea
              placeholder="Event Description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              style={{...styles.input, minHeight: '80px'}}
            />
            <p>Select at least 2 candidates for the event</p>
            <button
              onClick={handleCreateEvent}
              disabled={loading}
              style={styles.button}
            >
              Create Event
            </button>
          </div>

          {/* Authorize Voter */}
          <div style={styles.adminSection}>
            <h3>Authorize Voter</h3>
            <input
              type="text"
              placeholder="Voter Address (0x...)"
              value={voterAddress}
              onChange={(e) => setVoterAddress(e.target.value)}
              style={styles.input}
            />
            <button
              onClick={handleAuthorizeVoter}
              disabled={loading}
              style={styles.button}
            >
              Authorize Voter
            </button>
          </div>
        </div>
      )}

      {/* Info Card */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>ℹ️ How It Works</h2>
        <ul style={styles.infoList}>
          <li><strong>Encrypted Voting:</strong> Your vote is encrypted using FHE before submission</li>
          <li><strong>Privacy:</strong> Nobody can see individual votes, including admins</li>
          <li><strong>Verification:</strong> Vote counts are computed on encrypted data</li>
          <li><strong>Security:</strong> Cryptographic proofs ensure vote integrity</li>
        </ul>
      </div>

      {/* Contract Info */}
      <div style={styles.footer}>
        <p>Contract: {CONTRACT_ADDRESS}</p>
        <p>SDK: Universal FHEVM SDK v1.0</p>
      </div>
    </div>
  );
}

// Main App Component
export default function Home() {
  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      setProvider(window.ethereum);
    }
  }, []);

  if (!provider) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1>🏆 Anonymous Sports Voting</h1>
          <p style={styles.error}>Please install MetaMask to use this application</p>
        </div>
      </div>
    );
  }

  return (
    <FhevmProvider config={{ provider }}>
      <VotingInterface />
    </FhevmProvider>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '40px',
    color: 'white',
  },
  account: {
    fontSize: '0.9rem',
    opacity: 0.9,
    marginTop: '10px',
  },
  status: {
    marginTop: '10px',
  },
  badge: {
    background: '#ef4444',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    marginRight: '8px',
  },
  badgeSuccess: {
    background: '#10b981',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.8rem',
  },
  card: {
    background: 'white',
    borderRadius: '15px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    marginBottom: '20px',
    color: '#1e3a8a',
    borderBottom: '3px solid #3b82f6',
    paddingBottom: '10px',
  },
  eventInfo: {
    marginBottom: '30px',
  },
  candidateGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  candidateCard: {
    padding: '20px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    textAlign: 'center' as const,
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'translateY(-5px)',
    },
  },
  category: {
    color: '#6b7280',
    fontSize: '0.9rem',
    marginBottom: '15px',
  },
  voteButton: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold' as const,
  },
  adminSection: {
    marginBottom: '30px',
    paddingBottom: '30px',
    borderBottom: '1px solid #e2e8f0',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
  },
  button: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold' as const,
  },
  message: {
    background: '#dbeafe',
    color: '#1e40af',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center' as const,
  },
  error: {
    color: '#ef4444',
    padding: '20px',
    textAlign: 'center' as const,
  },
  loading: {
    color: 'white',
    padding: '40px',
    textAlign: 'center' as const,
  },
  warning: {
    color: '#f59e0b',
    padding: '15px',
    background: '#fef3c7',
    borderRadius: '8px',
    marginTop: '20px',
  },
  votedBadge: {
    color: '#10b981',
    fontWeight: 'bold' as const,
    marginTop: '10px',
  },
  infoList: {
    listStyle: 'none',
    padding: 0,
  },
  footer: {
    textAlign: 'center' as const,
    color: 'white',
    opacity: 0.8,
    marginTop: '40px',
    fontSize: '0.9rem',
  },
};
