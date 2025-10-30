# Universal FHEVM SDK

A framework-agnostic SDK for building privacy-preserving decentralized applications using Fully Homomorphic Encryption (FHE).

## Features

- **Framework-Agnostic Core**: Use with any JavaScript framework or vanilla JS
- **React Integration**: Built-in React hooks and provider for seamless integration
- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Modular Architecture**: Clean separation of concerns with dedicated modules
- **Well-Documented**: Extensive JSDoc comments and usage examples

## Installation

```bash
npm install @fhevm/universal-sdk
# or
yarn add @fhevm/universal-sdk
# or
pnpm add @fhevm/universal-sdk
```

## Quick Start

### Basic Usage (Framework-Agnostic)

```typescript
import { FhevmClient } from '@fhevm/universal-sdk';

// Initialize the client
const client = new FhevmClient({
  provider: window.ethereum,
  network: 'sepolia',
  gatewayUrl: 'https://gateway.fhevm.io'
});

await client.init();

// Create encrypted input
const input = await client.createEncryptedInput(contractAddress, userAddress);
input.add32(42);
const { handles, inputProof } = await input.encrypt();

// Decrypt a value
const decryptedValue = await client.decrypt(encryptedHandle, contractAddress);
```

### React Usage

```typescript
import { FhevmProvider, useFhevm, useEncryptedInput, useDecrypt } from '@fhevm/universal-sdk';

// Wrap your app with FhevmProvider
function App() {
  return (
    <FhevmProvider config={{
      provider: window.ethereum,
      network: 'sepolia',
      gatewayUrl: 'https://gateway.fhevm.io'
    }}>
      <YourApp />
    </FhevmProvider>
  );
}

// Use hooks in your components
function VotingComponent() {
  const { client, isInitialized } = useFhevm();
  const { createInput, isLoading } = useEncryptedInput(CONTRACT_ADDRESS);
  const { decrypt } = useDecrypt();

  const handleVote = async (voteValue: number) => {
    const input = await createInput(userAddress);
    input.add32(voteValue);
    const { handles, inputProof } = await input.encrypt();

    await contract.castVote(handles[0], inputProof);
  };

  return <button onClick={() => handleVote(1)}>Vote</button>;
}
```

## Architecture

The SDK is organized into the following modules:

### Core Module (`src/core/`)

Contains the framework-agnostic FHEVM client implementation.

- **`fhevm.ts`**: Main `FhevmClient` class with encryption/decryption capabilities

### Hooks Module (`src/hooks/`)

React hooks for easy integration in React applications.

- **`useFhevm.ts`**: Access the FHEVM client from context
- **`useEncryptedInput.ts`**: Create encrypted inputs with loading states
- **`useDecrypt.ts`**: Decrypt values with loading states

### Adapters Module (`src/adapters/`)

Framework-specific adapters (currently React, expandable to Vue, Angular, etc.).

- **`react.ts`**: React provider and context for FHEVM client management

### Types Module (`src/types/`)

TypeScript type definitions and interfaces.

- **`index.ts`**: All type definitions including `EncryptedInput`, `FhevmType`, error types, etc.

### Utils Module (`src/utils/`)

Utility functions for common operations.

- **`encryption.ts`**: Encryption helpers and validators
- **`decryption.ts`**: Decryption helpers and converters
- **`index.ts`**: Common utilities (hex conversion, address validation, etc.)

## API Reference

### FhevmClient

Core client for FHEVM operations.

```typescript
class FhevmClient {
  constructor(config: FhevmClientConfig);
  init(): Promise<void>;
  getInstance(): FhevmInstance;
  getProvider(): BrowserProvider;
  isInitialized(): boolean;
  createEncryptedInput(contractAddress: string, userAddress: string): Promise<EncryptedInput>;
  decrypt(handle: bigint, contractAddress: string): Promise<bigint>;
  getChainId(): Promise<number>;
  getSignerAddress(): Promise<string>;
}
```

### React Hooks

#### useFhevm()

Access the FHEVM client and its status.

```typescript
const { client, isInitialized, error } = useFhevm();
```

#### useEncryptedInput(contractAddress)

Create encrypted inputs for contract interactions.

```typescript
const { createInput, isLoading, error } = useEncryptedInput(contractAddress);
```

#### useDecrypt()

Decrypt encrypted values from contracts.

```typescript
const { decrypt, isLoading, error } = useDecrypt();
```

### Utility Functions

#### Encryption Utilities

- `validateUint8(value)`: Validate uint8 values
- `validateUint16(value)`: Validate uint16 values
- `validateUint32(value)`: Validate uint32 values
- `validateUint64(value)`: Validate uint64 values
- `addMultipleValues(input, values)`: Add multiple values to encrypted input
- `stringToBytes(str)`: Convert string to bytes
- `addByteArray(input, values)`: Add byte array to input

#### Decryption Utilities

- `bigintToNumber(value, max?)`: Convert bigint to number
- `bigintToBool(value)`: Convert bigint to boolean
- `bigintToUint8(value)`: Convert bigint to uint8
- `bigintToUint16(value)`: Convert bigint to uint16
- `bigintToUint32(value)`: Convert bigint to uint32
- `convertDecryptedValue(value, type)`: Convert based on FHE type
- `formatDecryptedValue(value, type)`: Format for display
- `decryptMultiple(decrypt, handles, contractAddress)`: Decrypt multiple values

#### Common Utilities

- `toHex(value)`: Convert to hex string
- `fromHex(hex)`: Convert from hex string
- `isAddress(address)`: Validate Ethereum address
- `isTransactionHash(hash)`: Validate transaction hash
- `normalizeAddress(address)`: Normalize address format
- `formatUnits(value, decimals)`: Format with decimals
- `parseUnits(value, decimals)`: Parse with decimals

## Examples

### Encrypted Voting

```typescript
import { FhevmClient, validateUint32 } from '@fhevm/universal-sdk';

const client = new FhevmClient({ provider: window.ethereum });
await client.init();

// Create encrypted vote
const input = await client.createEncryptedInput(votingContract, voterAddress);
input.add32(candidateId); // Encrypted vote
const { handles, inputProof } = await input.encrypt();

// Submit vote
await votingContract.castVote(handles[0], inputProof);

// Decrypt results (only authorized)
const encryptedResult = await votingContract.getResults(candidateId);
const result = await client.decrypt(encryptedResult, votingContract.address);
console.log('Votes:', result);
```

### Private Balance

```typescript
import { useEncryptedInput, useDecrypt } from '@fhevm/universal-sdk';

function TokenBalance() {
  const { createInput } = useEncryptedInput(TOKEN_ADDRESS);
  const { decrypt } = useDecrypt();
  const [balance, setBalance] = useState<bigint | null>(null);

  const checkBalance = async () => {
    const encryptedBalance = await tokenContract.balanceOf(userAddress);
    const decrypted = await decrypt(encryptedBalance, TOKEN_ADDRESS);
    setBalance(decrypted);
  };

  return (
    <div>
      <button onClick={checkBalance}>Check Balance</button>
      {balance && <p>Balance: {balance.toString()}</p>}
    </div>
  );
}
```

## Directory Structure

```
packages/fhevm-sdk/
├── src/
│   ├── core/              # Core logic (framework-agnostic)
│   │   ├── fhevm.ts       # Main FhevmClient class
│   │   └── index.ts       # Core exports
│   ├── hooks/             # React hooks
│   │   ├── useFhevm.ts
│   │   ├── useEncryptedInput.ts
│   │   ├── useDecrypt.ts
│   │   └── index.ts
│   ├── adapters/          # Framework adapters
│   │   ├── react.ts       # React adapter (Provider, Context)
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   ├── encryption.ts  # Encryption helpers
│   │   ├── decryption.ts  # Decryption helpers
│   │   └── index.ts       # Common utilities
│   ├── types/             # Type definitions
│   │   └── index.ts       # All TypeScript types
│   └── index.ts           # Main entry point
├── package.json
├── tsconfig.json
└── README.md
```

## TypeScript Support

The SDK is written in TypeScript and provides full type definitions. All exports are fully typed for the best development experience.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows the existing structure
2. All functions have JSDoc comments
3. TypeScript types are properly defined
4. Examples are provided for new features

## License

MIT

## Support

For issues and questions:
- GitHub Issues: [Report an issue]
- Documentation: [Full documentation]
- Examples: Check the `examples/` directory
