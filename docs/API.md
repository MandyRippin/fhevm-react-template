# API Reference

Complete API documentation for the Universal FHEVM SDK.

## Table of Contents

- [FhevmClient](#fhevmclient)
- [React Hooks](#react-hooks)
- [Types](#types)
- [Utilities](#utilities)
- [Error Handling](#error-handling)

## FhevmClient

The core client class for interacting with FHEVM. Framework-agnostic and can be used in any JavaScript environment.

### Constructor

```typescript
new FhevmClient(config: FhevmClientConfig)
```

**Parameters:**

- `config.provider` - Ethereum provider (e.g., `window.ethereum`, ethers provider)
- `config.network` - Optional network name (default: auto-detected)
- `config.gatewayUrl` - Optional FHE gateway URL

**Example:**

```typescript
const client = new FhevmClient({
  provider: window.ethereum,
  network: 'sepolia'
});
```

### Methods

#### init()

Initialize the FHEVM client and fetch network public keys.

```typescript
async init(): Promise<void>
```

**Returns:** Promise that resolves when initialization is complete

**Throws:** Error if initialization fails

**Example:**

```typescript
await client.init();
console.log('Client initialized');
```

#### createEncryptedInput()

Create an encrypted input builder for a contract.

```typescript
async createEncryptedInput(
  contractAddress: string,
  userAddress: string
): Promise<EncryptedInput>
```

**Parameters:**

- `contractAddress` - The contract address that will receive encrypted data
- `userAddress` - The user's Ethereum address

**Returns:** EncryptedInput builder object

**Example:**

```typescript
const input = await client.createEncryptedInput(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  '0x1234567890123456789012345678901234567890'
);

input.add32(42);
const { handles, inputProof } = await input.encrypt();
```

#### decrypt()

Decrypt an encrypted value from a contract.

```typescript
async decrypt(
  handle: bigint,
  contractAddress: string
): Promise<bigint>
```

**Parameters:**

- `handle` - The encrypted value handle
- `contractAddress` - The contract address holding the encrypted value

**Returns:** Decrypted value as bigint

**Throws:** Error if user denies signature or decryption fails

**Example:**

```typescript
const decrypted = await client.decrypt(
  12345n,
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
);
console.log('Decrypted value:', decrypted);
```

#### getPublicKey()

Get the FHE public key for the current network.

```typescript
getPublicKey(): string
```

**Returns:** Public key as hex string

**Example:**

```typescript
const publicKey = client.getPublicKey();
```

#### isInitialized()

Check if the client is initialized.

```typescript
isInitialized(): boolean
```

**Returns:** true if initialized, false otherwise

**Example:**

```typescript
if (client.isInitialized()) {
  // Client ready to use
}
```

## React Hooks

React-specific hooks for easy integration with React applications.

### FhevmProvider

Context provider component that initializes and shares the FHEVM client.

```typescript
function FhevmProvider({
  config,
  children
}: FhevmProviderProps): JSX.Element
```

**Props:**

- `config` - FhevmClientConfig object
- `children` - React children

**Example:**

```tsx
import { FhevmProvider } from '@fhevm/universal-sdk';

function App() {
  return (
    <FhevmProvider config={{ provider: window.ethereum }}>
      <YourApp />
    </FhevmProvider>
  );
}
```

### useFhevm()

Access the FHEVM client from any component within FhevmProvider.

```typescript
function useFhevm(): {
  client: FhevmClient | null;
  isInitialized: boolean;
  error: Error | null;
}
```

**Returns:**

- `client` - The FhevmClient instance (null if not initialized)
- `isInitialized` - Boolean indicating if client is ready
- `error` - Any initialization error

**Example:**

```tsx
import { useFhevm } from '@fhevm/universal-sdk';

function MyComponent() {
  const { client, isInitialized, error } = useFhevm();

  if (error) return <div>Error: {error.message}</div>;
  if (!isInitialized) return <div>Loading...</div>;

  return <div>Client ready!</div>;
}
```

### useEncryptedInput()

Hook for creating encrypted inputs for a specific contract.

```typescript
function useEncryptedInput(contractAddress: string): {
  createInput: (userAddress: string) => Promise<EncryptedInput>;
  isLoading: boolean;
  error: Error | null;
}
```

**Parameters:**

- `contractAddress` - The contract address

**Returns:**

- `createInput` - Function to create encrypted input
- `isLoading` - Boolean indicating if operation is in progress
- `error` - Any error that occurred

**Example:**

```tsx
import { useEncryptedInput } from '@fhevm/universal-sdk';

function VotingComponent() {
  const contractAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
  const { createInput, isLoading, error } = useEncryptedInput(contractAddress);

  const handleVote = async (candidateId: number) => {
    const input = await createInput(userAddress);
    const encrypted = input.add32(candidateId);
    const { handles, inputProof } = await encrypted.encrypt();

    // Submit to contract
    await contract.vote(handles, inputProof);
  };

  return (
    <button onClick={() => handleVote(1)} disabled={isLoading}>
      Vote
    </button>
  );
}
```

### useDecrypt()

Hook for decrypting encrypted values from contracts.

```typescript
function useDecrypt(): {
  decrypt: (handle: bigint, contractAddress: string) => Promise<bigint>;
  isLoading: boolean;
  error: Error | null;
}
```

**Returns:**

- `decrypt` - Function to decrypt a value
- `isLoading` - Boolean indicating if decryption is in progress
- `error` - Any error that occurred

**Example:**

```tsx
import { useDecrypt } from '@fhevm/universal-sdk';

function ResultsComponent() {
  const { decrypt, isLoading, error } = useDecrypt();
  const [result, setResult] = useState<bigint | null>(null);

  const handleDecrypt = async (handle: bigint) => {
    const decrypted = await decrypt(handle, contractAddress);
    setResult(decrypted);
  };

  return (
    <div>
      <button onClick={() => handleDecrypt(handleValue)} disabled={isLoading}>
        Decrypt Result
      </button>
      {result && <p>Result: {result.toString()}</p>}
    </div>
  );
}
```

## Types

TypeScript type definitions for the SDK.

### FhevmClientConfig

Configuration for FhevmClient.

```typescript
interface FhevmClientConfig {
  provider: any; // Ethereum provider
  network?: string; // Network name (optional)
  gatewayUrl?: string; // FHE gateway URL (optional)
}
```

### EncryptedInput

Builder for creating encrypted inputs.

```typescript
interface EncryptedInput {
  add8(value: number): EncryptedInput;
  add16(value: number): EncryptedInput;
  add32(value: number): EncryptedInput;
  add64(value: bigint): EncryptedInput;
  addBool(value: boolean): EncryptedInput;
  encrypt(): Promise<{
    handles: Uint8Array[];
    inputProof: string;
  }>;
}
```

**Methods:**

- `add8(value)` - Add 8-bit unsigned integer
- `add16(value)` - Add 16-bit unsigned integer
- `add32(value)` - Add 32-bit unsigned integer
- `add64(value)` - Add 64-bit unsigned integer
- `addBool(value)` - Add boolean value
- `encrypt()` - Encrypt all added values

**Example:**

```typescript
const input = await client.createEncryptedInput(contractAddr, userAddr);

input
  .add32(100)
  .add8(5)
  .addBool(true);

const { handles, inputProof } = await input.encrypt();
```

### FhevmType

Supported encrypted types.

```typescript
type FhevmType = 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'ebool';
```

### DecryptionResult

Result of a decryption operation.

```typescript
interface DecryptionResult {
  value: bigint;
  type: FhevmType;
}
```

## Utilities

Helper functions provided by the SDK.

### formatHandle()

Format a handle for display.

```typescript
function formatHandle(handle: bigint): string
```

**Example:**

```typescript
import { formatHandle } from '@fhevm/universal-sdk';

const formatted = formatHandle(12345678901234567890n);
console.log(formatted); // "0x1234...7890"
```

### parseEncryptedValue()

Parse an encrypted value from contract response.

```typescript
function parseEncryptedValue(value: any): bigint
```

**Example:**

```typescript
import { parseEncryptedValue } from '@fhevm/universal-sdk';

const handle = parseEncryptedValue(contractResponse);
```

### validateAddress()

Validate an Ethereum address.

```typescript
function validateAddress(address: string): boolean
```

**Example:**

```typescript
import { validateAddress } from '@fhevm/universal-sdk';

if (validateAddress(userInput)) {
  // Valid address
}
```

## Error Handling

The SDK provides specific error types for different failure scenarios.

### FhevmError

Base error class for all FHEVM-related errors.

```typescript
class FhevmError extends Error {
  code: string;
  details?: any;
}
```

### Common Error Codes

- `INIT_FAILED` - Client initialization failed
- `ENCRYPTION_FAILED` - Encryption operation failed
- `DECRYPTION_FAILED` - Decryption operation failed
- `SIGNATURE_REJECTED` - User rejected signature request
- `NETWORK_ERROR` - Network request failed
- `INVALID_ADDRESS` - Invalid Ethereum address provided
- `NOT_INITIALIZED` - Client not initialized

### Error Handling Example

```typescript
import { useFhevm, FhevmError } from '@fhevm/universal-sdk';

function MyComponent() {
  const { client, error } = useFhevm();

  useEffect(() => {
    if (error instanceof FhevmError) {
      switch (error.code) {
        case 'INIT_FAILED':
          console.error('Failed to initialize:', error.details);
          break;
        case 'NETWORK_ERROR':
          console.error('Network error:', error.message);
          break;
        default:
          console.error('Unknown error:', error);
      }
    }
  }, [error]);
}
```

### Try-Catch Pattern

```typescript
try {
  const input = await client.createEncryptedInput(contractAddr, userAddr);
  const encrypted = input.add32(42);
  const { handles, inputProof } = await encrypted.encrypt();
} catch (error) {
  if (error instanceof FhevmError) {
    if (error.code === 'SIGNATURE_REJECTED') {
      // User cancelled operation
      console.log('User rejected signature');
    } else {
      // Other FHEVM error
      console.error('FHEVM error:', error.message);
    }
  } else {
    // Unknown error
    console.error('Unexpected error:', error);
  }
}
```

## Best Practices

### 1. Initialize Once

Initialize the client once at the application root:

```tsx
// Good
<FhevmProvider config={config}>
  <App />
</FhevmProvider>

// Bad - multiple providers
<FhevmProvider config={config}>
  <FhevmProvider config={config}>
    <App />
  </FhevmProvider>
</FhevmProvider>
```

### 2. Check Initialization

Always check if client is initialized before use:

```typescript
const { client, isInitialized } = useFhevm();

if (!isInitialized) {
  return <Loading />;
}

// Safe to use client
```

### 3. Handle Errors Gracefully

Always provide error handling:

```typescript
const { error } = useFhevm();

if (error) {
  return <ErrorMessage error={error} />;
}
```

### 4. Use Loading States

Show loading indicators during async operations:

```typescript
const { isLoading } = useEncryptedInput(contractAddr);

return (
  <button disabled={isLoading}>
    {isLoading ? 'Encrypting...' : 'Submit'}
  </button>
);
```

### 5. Batch Operations

When encrypting multiple values, batch them in a single input:

```typescript
// Good
const input = await createInput(userAddr);
input.add32(value1).add32(value2).add32(value3);
const result = await input.encrypt();

// Bad - multiple encryptions
const input1 = await createInput(userAddr);
input1.add32(value1);
await input1.encrypt();

const input2 = await createInput(userAddr);
input2.add32(value2);
await input2.encrypt();
```

## Complete Example

Here's a complete example combining all API features:

```tsx
import {
  FhevmProvider,
  useFhevm,
  useEncryptedInput,
  useDecrypt,
  validateAddress
} from '@fhevm/universal-sdk';

function VotingApp() {
  return (
    <FhevmProvider config={{ provider: window.ethereum }}>
      <VotingInterface />
    </FhevmProvider>
  );
}

function VotingInterface() {
  const { client, isInitialized, error: initError } = useFhevm();
  const contractAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

  const {
    createInput,
    isLoading: isEncrypting,
    error: encryptError
  } = useEncryptedInput(contractAddress);

  const {
    decrypt,
    isLoading: isDecrypting,
    error: decryptError
  } = useDecrypt();

  const [userAddress, setUserAddress] = useState('');
  const [result, setResult] = useState<bigint | null>(null);

  const handleVote = async (candidateId: number) => {
    if (!validateAddress(userAddress)) {
      alert('Invalid address');
      return;
    }

    try {
      const input = await createInput(userAddress);
      const encrypted = input.add32(candidateId);
      const { handles, inputProof } = await encrypted.encrypt();

      // Submit to contract
      await contract.vote(handles, inputProof);
      alert('Vote submitted successfully');
    } catch (error) {
      console.error('Voting failed:', error);
    }
  };

  const handleDecryptResult = async (handle: bigint) => {
    try {
      const decrypted = await decrypt(handle, contractAddress);
      setResult(decrypted);
    } catch (error) {
      console.error('Decryption failed:', error);
    }
  };

  if (initError) return <div>Initialization Error: {initError.message}</div>;
  if (!isInitialized) return <div>Loading FHEVM...</div>;

  return (
    <div>
      <h1>Anonymous Voting</h1>

      <input
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        placeholder="Your address"
      />

      <button
        onClick={() => handleVote(1)}
        disabled={isEncrypting || !userAddress}
      >
        {isEncrypting ? 'Encrypting...' : 'Vote for Candidate 1'}
      </button>

      <button onClick={() => handleDecryptResult(handleValue)}>
        {isDecrypting ? 'Decrypting...' : 'View Results'}
      </button>

      {result && <p>Total Votes: {result.toString()}</p>}

      {encryptError && <p>Error: {encryptError.message}</p>}
      {decryptError && <p>Error: {decryptError.message}</p>}
    </div>
  );
}

export default VotingApp;
```

## Support

For additional help:
- Check the [examples](../examples/) directory
- Review [DEPLOYMENT.md](./DEPLOYMENT.md)
- See [MIGRATION.md](./MIGRATION.md)
- Open a GitHub issue
