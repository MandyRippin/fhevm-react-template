# Deployment Guide

Complete guide for deploying the Universal FHEVM SDK and example applications.

## Prerequisites

- Node.js v16+
- npm or yarn
- Git
- Vercel CLI (for frontend deployment)

## SDK Deployment

### 1. Build the SDK

```bash
cd packages/fhevm-sdk
npm install
npm run build
```

### 2. Publish to npm (Optional)

```bash
npm login
npm publish --access public
```

## Example Deployment

### Next.js Example

#### Development

```bash
cd examples/nextjs-voting
npm install
npm run dev
```

#### Production Build

```bash
npm run build
npm run start
```

#### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd examples/nextjs-voting
vercel deploy
```

### React Basic Example

```bash
cd examples/react-basic
npm install
npm run build
```

## Smart Contract Deployment

### Using Hardhat

```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Verify on Etherscan
npx hardhat verify --network sepolia DEPLOYED_ADDRESS
```

## Environment Configuration

### Frontend (.env)

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
```

### Backend (.env)

```env
PRIVATE_KEY=your_private_key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
ETHERSCAN_API_KEY=your_etherscan_key
```

## Troubleshooting

### Build Errors

**Issue**: Module not found
**Solution**: Run `npm install` in root and subdirectories

**Issue**: TypeScript errors
**Solution**: Ensure TypeScript version compatibility

### Deployment Errors

**Issue**: Vercel build fails
**Solution**: Check build logs and environment variables

**Issue**: Contract verification fails
**Solution**: Ensure Etherscan API key is correct

## Best Practices

1. Always test locally before deploying
2. Use environment variables for sensitive data
3. Enable CI/CD for automated testing
4. Monitor gas costs on testnets
5. Keep dependencies updated

## Support

For deployment issues:
- Check documentation
- Review error logs
- Contact support team
