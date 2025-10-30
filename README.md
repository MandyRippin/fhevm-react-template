# Universal FHEVM SDK

A framework-agnostic SDK for building privacy-preserving applications with Fully Homomorphic Encryption (FHE) on Ethereum.

## Features

- **Framework-agnostic core** - Works with any JavaScript framework
- **React hooks integration** - Wagmi-like API for React applications
- **TypeScript support** - Full type safety and IntelliSense
- **Easy to use** - Get started in less than 10 lines of code
- **Production ready** - Error handling, loading states, and comprehensive testing

## Quick Start

### Installation

```bash
npm install @fhevm/universal-sdk
```

### React Usage

```tsx
import { FhevmProvider, useFhevm, useEncryptedInput } from '@fhevm/universal-sdk';

function App() {
  return (
    <FhevmProvider config={{ provider: window.ethereum }}>
      <YourApp />
    </FhevmProvider>
  );
}

function YourApp() {
  const { client, isInitialized } = useFhevm();
  const { createInput, isLoading } = useEncryptedInput(contractAddress);

  const encryptAndSend = async () => {
    const input = await createInput(userAddress);
    const encrypted = input.add32(42);
    const { handles, inputProof } = await encrypted.encrypt();

    // Use with your contract
    await contract.submitEncrypted(handles, inputProof);
  };

  return (
    <button onClick={encryptAndSend} disabled={isLoading}>
      {isLoading ? 'Encrypting...' : 'Submit Encrypted Data'}
    </button>
  );
}
```

### Node.js Usage

```typescript
import { FhevmClient } from '@fhevm/universal-sdk';

const client = new FhevmClient({
  provider: yourProvider,
  network: 'sepolia'
});

await client.init();

const input = await client.createEncryptedInput(contractAddress, userAddress);
const encrypted = input.add32(42);
const { handles, inputProof } = await encrypted.encrypt();
```

## Architecture

```
┌─────────────────────────────────────────┐
│         Application Layer               │
│  (React, Next.js, Node.js, etc.)       │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      Universal FHEVM SDK                │
│                                          │
│  ┌────────────┐      ┌────────────┐    │
│  │   Core     │      │   React    │    │
│  │  Client    │◄─────┤   Hooks    │    │
│  └────────────┘      └────────────┘    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         fhevmjs Library                 │
│    (Encryption/Decryption Core)         │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      Ethereum Network                   │
│    (Smart Contracts with FHE)           │
└─────────────────────────────────────────┘
```

## Examples

The `examples/` directory (also available as `templates/`) contains comprehensive demonstrations of the Universal FHEVM SDK.

### Next.js Complete Demo

**Location:** [`examples/nextjs-voting/`](./examples/nextjs-voting/)

A feature-complete Next.js application showcasing all SDK capabilities:

**Structure:**
```
nextjs-voting/
├── src/
│   ├── app/                    # Next.js 13+ App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main application page
│   │   ├── globals.css         # Global styles with Tailwind
│   │   └── api/                # API routes
│   │       ├── fhe/            # FHE operations
│   │       │   ├── route.ts    # Main FHE API
│   │       │   ├── encrypt/    # Encryption endpoint
│   │       │   ├── decrypt/    # Decryption endpoint
│   │       │   └── compute/    # Computation endpoint
│   │       └── keys/           # Key management API
│   │
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   │   ├── Button.tsx      # Reusable button component
│   │   │   ├── Input.tsx       # Form input component
│   │   │   └── Card.tsx        # Card container component
│   │   ├── fhe/                # FHE-specific components
│   │   │   ├── FHEProvider.tsx     # FHE context provider
│   │   │   ├── EncryptionDemo.tsx  # Encryption demonstration
│   │   │   ├── ComputationDemo.tsx # Computation demonstration
│   │   │   └── KeyManager.tsx      # Key management UI
│   │   └── examples/           # Use case examples
│   │       ├── BankingExample.tsx  # Private banking demo
│   │       └── MedicalExample.tsx  # Healthcare privacy demo
│   │
│   ├── lib/                    # Utility libraries
│   │   ├── fhe/                # FHE integration
│   │   │   ├── client.ts       # Client-side FHE operations
│   │   │   ├── server.ts       # Server-side FHE operations
│   │   │   ├── keys.ts         # Key management
│   │   │   └── types.ts        # FHE type definitions
│   │   └── utils/              # Utility functions
│   │       ├── security.ts     # Security utilities
│   │       └── validation.ts   # Input validation
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useFHE.ts           # Main FHE hook
│   │   ├── useEncryption.ts    # Encryption operations
│   │   └── useComputation.ts   # Computation operations
│   │
│   └── types/                  # TypeScript definitions
│       ├── fhe.ts              # FHE type interfaces
│       └── api.ts              # API type definitions
│
├── contracts/                  # Smart contracts
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

**Features:**
- Complete SDK integration with all features
- Encryption and decryption demos
- Homomorphic computation examples
- Real-world use cases (banking, healthcare)
- Full TypeScript support
- Tailwind CSS styling
- API routes for server-side operations
- Comprehensive component library

**Run the example:**

```bash
cd examples/nextjs-voting
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the complete demo.

### React Basic Example

**Location:** [`examples/react-basic/`](./examples/react-basic/)

A minimal encryption demo showing:
- Basic SDK setup
- Simple encryption workflow
- Hook usage patterns

**Run the example:**

```bash
cd examples/react-basic
npm install
npm run dev
```

### Anonymous Sports Voting (React Application)

**Location:** [`examples/AnonymousSportsVoting/`](./examples/AnonymousSportsVoting/)

A complete React TypeScript application demonstrating:
- Anonymous encrypted voting with FHE
- Vote tallying on encrypted data
- Admin authorization system
- Event management and lifecycle
- Full SDK integration with custom hooks
- Modern React component architecture

**Features:**
- Built with React 18 and TypeScript
- Vite for fast development and building
- Complete FHEVM SDK integration
- Custom hooks for contract and event management
- Professional component structure
- Smart contract deployment scripts included

**Run the example:**

```bash
cd examples/AnonymousSportsVoting
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the voting application.

## Core Concepts

### Fully Homomorphic Encryption (FHE)

FHE allows computations on encrypted data without decrypting it. This SDK provides easy access to FHE operations:

```solidity
// Smart contract example
contract PrivateVoting {
    function vote(bytes32 encryptedVote, bytes calldata proof) public {
        euint32 vote = TFHE.asEuint32(encryptedVote, proof);
        // Process encrypted vote without revealing it
        encryptedTally = TFHE.add(encryptedTally, vote);
    }
}
```

### Encrypted Types

The SDK supports multiple encrypted data types:

- `euint8` - 8-bit unsigned integer
- `euint16` - 16-bit unsigned integer
- `euint32` - 32-bit unsigned integer
- `euint64` - 64-bit unsigned integer
- `ebool` - Boolean value

### Privacy Model

1. **Client-side encryption** - Data is encrypted in the user's browser
2. **On-chain computation** - Smart contracts process encrypted data
3. **Selective decryption** - Only authorized parties can decrypt results
4. **EIP-712 signatures** - Secure decryption authorization

## API Reference

### FhevmClient

Framework-agnostic client for FHEVM operations.

```typescript
const client = new FhevmClient(config);
await client.init();
```

**Methods:**

- `init()` - Initialize the client
- `createEncryptedInput(contractAddress, userAddress)` - Create encrypted input
- `decrypt(handle, contractAddress)` - Decrypt a value
- `getPublicKey()` - Get encryption public key

### React Hooks

#### useFhevm()

Access the initialized FHEVM client.

```typescript
const { client, isInitialized, error } = useFhevm();
```

#### useEncryptedInput(contractAddress)

Create encrypted inputs for a contract.

```typescript
const { createInput, isLoading, error } = useEncryptedInput(contractAddress);
```

#### useDecrypt()

Decrypt encrypted values.

```typescript
const { decrypt, isLoading, error } = useDecrypt();
```

See [docs/API.md](./docs/API.md) for complete API documentation.

## Use Cases

### Anonymous Voting

Build voting systems where:
- Votes are encrypted client-side
- Tallying happens on encrypted data
- Results can be decrypted after voting ends
- Individual votes remain private

### Private Auctions

Create sealed-bid auctions where:
- Bids are encrypted and hidden
- Winner is determined on encrypted bids
- Only the winner is revealed

### Confidential Transactions

Enable private financial operations:
- Hidden transaction amounts
- Encrypted balance updates
- Selective disclosure

## Project Structure

This repository follows a monorepo structure optimized for SDK development and demonstration:

```
fhevm-react-template/
├── packages/                     # SDK packages
│   └── fhevm-sdk/               # Universal FHEVM SDK
│       ├── src/
│       │   ├── core/            # Framework-agnostic core
│       │   │   ├── fhevm.ts     # Core FHE client implementation
│       │   │   └── index.ts     # Core exports
│       │   ├── hooks/           # React hooks
│       │   │   ├── useFhevm.ts
│       │   │   ├── useEncryptedInput.ts
│       │   │   ├── useDecrypt.ts
│       │   │   └── index.ts
│       │   ├── adapters/        # Framework adapters
│       │   │   ├── react.ts     # React provider & context
│       │   │   └── index.ts
│       │   ├── utils/           # Utility functions
│       │   │   ├── encryption.ts # Encryption helpers
│       │   │   ├── decryption.ts # Decryption helpers
│       │   │   └── index.ts
│       │   ├── types/           # TypeScript definitions
│       │   │   └── index.ts
│       │   └── index.ts         # Main entry point
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
│
├── examples/                    # Example applications
│   ├── nextjs-voting/          # Complete Next.js demo
│   ├── react-basic/            # Basic React example
│   └── AnonymousSportsVoting/  # React voting application
│
├── templates/                   # Symlink to examples/
│
├── docs/                        # Documentation
│   ├── API.md                  # Complete API reference
│   ├── DEPLOYMENT.md           # Deployment guide
│   └── MIGRATION.md            # Migration guide
│
├── README.md                    # This file
├── package.json                 # Root package configuration
└── demo-info.md                 # Demo video information
```

## Development

### Build the SDK

```bash
cd packages/fhevm-sdk
npm install
npm run build
```

### Run Tests

```bash
npm test
```

### Workspace Commands

From the root directory:

```bash
# Build SDK
npm run build:sdk

# Run Next.js complete demo
npm run dev:nextjs

# Run React example
npm run dev:react
```

### Development Workflow

1. **SDK Development:**
   ```bash
   cd packages/fhevm-sdk
   npm run dev  # Watch mode for TypeScript compilation
   ```

2. **Example Development:**
   ```bash
   cd examples/nextjs-voting
   npm install
   npm run dev
   ```

3. **Testing Changes:**
   The examples use `file:../../packages/fhevm-sdk` so SDK changes are immediately reflected.

## Deployment

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

1. Build the SDK:
```bash
npm run build:sdk
```

2. Deploy example to Vercel:
```bash
cd examples/nextjs-voting
vercel deploy
```

## Migration

Migrating from fhevm-react-template v0? See [docs/MIGRATION.md](./docs/MIGRATION.md) for a step-by-step guide.

## Demo Video

A complete video demonstration is available in `demo.mp4` at the root of this repository.

**Important**: The video file must be downloaded to your local machine to view it. Direct streaming from the repository is not supported.

See [demo-info.md](./demo-info.md) for viewing instructions and demo content overview.

## Contract Example

The voting smart contract used in examples:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";

contract AnonymousSportsVoting {
    struct Candidate {
        string name;
        euint32 encryptedVotes;
    }

    mapping(uint256 => Candidate) public candidates;

    function vote(uint256 candidateId, bytes32 encryptedVote, bytes calldata proof)
        public
    {
        euint32 vote = TFHE.asEuint32(encryptedVote, proof);
        candidates[candidateId].encryptedVotes =
            TFHE.add(candidates[candidateId].encryptedVotes, vote);
    }
}
```

Full contract available in [`examples/nextjs-voting/contracts/`](./examples/nextjs-voting/contracts/).

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## Roadmap

- [ ] Vue.js integration
- [ ] Angular support
- [ ] Svelte hooks
- [ ] Additional encrypted operations
- [ ] Performance optimizations
- [ ] Batch encryption support

## Resources

- [Zama FHEVM Documentation](https://docs.zama.ai/fhevm)
- [fhevmjs Library](https://github.com/zama-ai/fhevmjs)
- [TFHE Solidity Library](https://github.com/zama-ai/fhevm)

## License

MIT License - see LICENSE file for details

## Support

- **Documentation**: Check [docs/](./docs/) directory
- **Examples**: See [examples/](./examples/) directory
- **Issues**: Open a GitHub issue
- **Discussions**: GitHub Discussions

---

**Universal FHEVM SDK** - Making privacy-preserving blockchain development simple and accessible.
