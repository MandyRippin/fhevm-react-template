# Migration Guide

Guide for migrating from fhevm-react-template v0 to Universal SDK v1.

## Breaking Changes

### 1. Import Paths

**Before (v0):**
```typescript
import { createInstance } from 'fhevmjs';
```

**After (v1):**
```typescript
import { FhevmClient } from '@fhevm/universal-sdk';
```

### 2. Initialization

**Before (v0):**
```typescript
const instance = await createInstance({ chainId, publicKey });
```

**After (v1):**
```typescript
const client = new FhevmClient({ provider: window.ethereum });
await client.init();
```

### 3. React Integration

**Before (v0):**
```typescript
// Manual setup required
const [instance, setInstance] = useState(null);
```

**After (v1):**
```typescript
import { FhevmProvider, useFhevm } from '@fhevm/universal-sdk';

<FhevmProvider config={{ provider: window.ethereum }}>
  <App />
</FhevmProvider>
```

## Migration Steps

### Step 1: Update Dependencies

```bash
npm uninstall fhevmjs
npm install @fhevm/universal-sdk
```

### Step 2: Update Imports

Replace all imports:
```typescript
// Old
import { createInstance } from 'fhevmjs';

// New
import { FhevmClient, useFhevm } from '@fhevm/universal-sdk';
```

### Step 3: Update Initialization

```typescript
// Old
const instance = await createInstance({
  chainId: 11155111,
  publicKey: 'key'
});

// New
const client = new FhevmClient({
  provider: window.ethereum,
  network: 'sepolia'
});
await client.init();
```

### Step 4: Use React Hooks

```typescript
// Old - Manual state management
const [instance, setInstance] = useState(null);

// New - Use hooks
const { client, isInitialized } = useFhevm();
```

## Feature Parity

| Feature | v0 | v1 |
|---------|----|----|
| Encryption | ✓ | ✓ |
| Decryption | ✓ | ✓ |
| React Support | Manual | Built-in |
| TypeScript | Partial | Full |
| Error Handling | Basic | Enhanced |
| Loading States | Manual | Built-in |

## Common Patterns

### Pattern 1: Encrypt Input

**Before:**
```typescript
const input = instance.createEncryptedInput(contract, user);
```

**After:**
```typescript
const input = await client.createEncryptedInput(contract, user);
```

### Pattern 2: Decrypt Value

**Before:**
```typescript
const decrypted = await instance.decrypt(contract, handle);
```

**After:**
```typescript
const decrypted = await client.decrypt(handle, contract);
```

## FAQ

**Q: Is v0 still supported?**
A: No, please migrate to v1.

**Q: Can I use v1 with Node.js?**
A: Yes, v1 is framework-agnostic.

**Q: Do I need to redeploy contracts?**
A: No, contracts remain compatible.

## Support

For migration help:
- Review examples
- Check API documentation
- Open GitHub issue
