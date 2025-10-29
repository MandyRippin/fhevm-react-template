# Anonymous Sports Voting - Next.js Example

Complete Next.js application demonstrating the Universal FHEVM SDK with a full-featured privacy-preserving voting system.

## Overview

This example imports and extends the Anonymous Sports Voting dapp with full SDK integration, providing:

- **Encrypted Voting**: Cast votes using Fully Homomorphic Encryption
- **Admin Panel**: Manage candidates, events, and voter authorization
- **Real-time Updates**: View current events and voting status
- **Privacy Preservation**: All votes remain encrypted and private

## Features

### Voter Features
- ✅ Connect wallet (MetaMask)
- ✅ View current voting events
- ✅ Cast encrypted votes for candidates
- ✅ Check voting status
- ✅ View event information

### Admin Features
- ✅ Add new candidates with categories
- ✅ Create voting events with multiple candidates
- ✅ Authorize voters
- ✅ Revoke voter authorization
- ✅ Monitor event status

## SDK Integration

This example demonstrates the Universal FHEVM SDK integrated with ethers.js v6:

```tsx
import { FhevmProvider, useFhevm, useEncryptedInput } from '@fhevm/universal-sdk';

// Initialize SDK
<FhevmProvider config={{ provider: window.ethereum }}>
  <VotingInterface />
</FhevmProvider>

// Use hooks in components
function VotingInterface() {
  const { client, isInitialized } = useFhevm();
  const { createInput, isLoading } = useEncryptedInput(CONTRACT_ADDRESS);

  // Cast encrypted vote
  const handleVote = async (candidateId: number) => {
    const input = await createInput(account);
    const encrypted = input.add32(candidateId);
    const { handles, inputProof } = await encrypted.encrypt();

    // Submit to contract
    await contract.castVote(eventId, handles[0], inputProof);
  };
}
```

## Installation

```bash
cd examples/nextjs-voting
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Build

```bash
npm run build
npm start
```

## Contract Integration

The example integrates with the AnonymousSportsVoting contract:

- **Contract Address**: `0x3825C6a1BAf65d3fF39C3e0cEbbe4b76D2567488`
- **Network**: Sepolia Testnet
- **ABI**: Located in `lib/contract-abi.ts`

### Contract Functions Used

```typescript
// Admin functions
contract.addCandidate(name, category)
contract.createVotingEvent(name, description, candidateIds)
contract.authorizeVoter(voterAddress)

// Voter functions
contract.castVote(eventId, encryptedVote, proof)
contract.hasVoted(eventId, voterAddress)

// View functions
contract.events(eventId)
contract.candidates(candidateId)
contract.getEventCandidates(eventId)
```

## Architecture

```
nextjs-voting/
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main voting interface
├── lib/
│   └── contract-abi.ts     # Contract ABI and address
├── contracts/
│   └── AnonymousSportsVoting.sol  # Imported contract
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## Key Components

### FhevmProvider
Wraps the application and initializes the FHEVM client:
```tsx
<FhevmProvider config={{ provider: window.ethereum }}>
  <App />
</FhevmProvider>
```

### useFhevm Hook
Access the initialized FHEVM client:
```tsx
const { client, isInitialized, error } = useFhevm();
```

### useEncryptedInput Hook
Create encrypted inputs for contracts:
```tsx
const { createInput, isLoading } = useEncryptedInput(CONTRACT_ADDRESS);
const input = await createInput(userAddress);
const encrypted = input.add32(value);
```

## Workflow

### Admin Workflow
1. Connect wallet as admin
2. Add candidates with names and categories
3. Create voting event with selected candidates
4. Authorize voters by their addresses

### Voter Workflow
1. Connect wallet
2. View current voting event
3. Select candidate
4. Vote is encrypted client-side using SDK
5. Submit encrypted vote to contract
6. Receive confirmation

## Privacy Model

### Client-Side Encryption
```tsx
// User's vote is encrypted before leaving their browser
const input = await createInput(userAddress);
const encrypted = input.add32(candidateId);  // Encrypt candidate ID
const { handles, inputProof } = await encrypted.encrypt();
```

### On-Chain Processing
- Contract receives only encrypted data
- Vote tallying happens on encrypted values
- Individual votes remain private
- Only authorized parties can decrypt results

### Security Features
- EIP-712 signatures for decryption authorization
- Proof generation ensures data integrity
- No plaintext vote data on-chain
- Homomorphic computation preserves privacy

## Use Cases

### Sports Awards
Vote for:
- Best Player
- Most Valuable Player
- Coach of the Year
- Rising Star

### Event Selection
Choose:
- Tournament host city
- Championship venue
- Event scheduling preferences

### Team Decisions
Decide on:
- Team captain
- Strategy preferences
- Tournament participation

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x3825C6a1BAf65d3fF39C3e0cEbbe4b76D2567488
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_NETWORK=sepolia
```

## Deployment

### Vercel

```bash
vercel deploy
```

### Environment Variables
Set in Vercel dashboard:
- `NEXT_PUBLIC_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_CHAIN_ID`
- `NEXT_PUBLIC_NETWORK`

## Troubleshooting

### MetaMask Not Connecting
- Ensure MetaMask is installed
- Switch to Sepolia network
- Refresh the page

### Vote Not Submitting
- Check if you're authorized to vote
- Verify you haven't already voted
- Ensure event is active

### SDK Initialization Error
- Check console for specific error
- Verify network connection
- Ensure contract is deployed on Sepolia

## Technologies Used

- **Next.js 14**: React framework
- **Universal FHEVM SDK**: FHE encryption
- **ethers.js v6**: Ethereum interaction
- **TypeScript**: Type safety
- **React Hooks**: State management

## Learn More

- [Universal FHEVM SDK Documentation](../../docs/API.md)
- [Deployment Guide](../../docs/DEPLOYMENT.md)
- [Zama FHEVM Docs](https://docs.zama.ai/fhevm)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT

## Support

For issues or questions:
- Check the [main README](../../README.md)
- Review [API documentation](../../docs/API.md)
- Open a GitHub issue

---

**Built with Universal FHEVM SDK** - Making privacy-preserving voting simple and secure.
