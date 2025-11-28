---
sidebar_position: 1
title: Gateway Overview
---

# Obsrvr Gateway Services

Obsrvr Gateway provides enterprise-grade access to Stellar and Soroban networks through managed API endpoints. Whether you need Horizon API access for Stellar or JSON-RPC for Soroban smart contracts, our gateway services offer reliability, scalability, and simplicity.

## What is Obsrvr Gateway?

Obsrvr Gateway is a fully managed service that provides:

- **Stellar Horizon API** endpoints for mainnet and testnet
- **Stellar RPC** endpoints for smart contract interactions
- **High availability** with global infrastructure
- **No rate limits** for authenticated users
- **Full historical data** access

## Available Endpoints

### Stellar Horizon API

Access the complete Stellar network through our Horizon endpoints:

#### Mainnet
```
https://stellar.nodeswithobsrvr.co/
```

#### Testnet
```
https://stellar-testnet.nodeswithobsrvr.co/
```

### Stellar RPC

Interact with Soroban smart contracts through our RPC endpoints:

#### Mainnet
```
https://rpc.nodeswithobsrvr.co/
```

#### Testnet
```
https://rpc-testnet.nodeswithobsrvr.co/
```

## Key Features

### 🚀 Instant Access
- No infrastructure setup required
- Start making API calls immediately
- Full historical data available

### 🔒 Enterprise Security
- TLS encryption for all connections
- API key authentication
- IP allowlisting available

### 📊 Reliability
- 99.9% uptime SLA
- Global load balancing
- Automatic failover

### 🔧 Developer Friendly
- Compatible with all Stellar SDKs
- Comprehensive API documentation
- WebSocket support for streaming

## Getting Started

### 1. Sign Up

Create an account at [console.withobsrvr.com](https://console.withobsrvr.com) to get your API key.

### 2. Make Your First Request

#### Horizon API Example
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://stellar.nodeswithobsrvr.co/accounts/GABC...XYZ
```

#### Stellar RPC Example
```bash
curl -X POST https://rpc.nodeswithobsrvr.co/ \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getHealth"
  }'
```

### 3. Integrate with SDKs

#### JavaScript/TypeScript
```javascript
const StellarSdk = require('stellar-sdk');

const server = new StellarSdk.Server('https://stellar.nodeswithobsrvr.co/', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
```

#### Python
```python
from stellar_sdk import Server

server = Server(
    horizon_url="https://stellar.nodeswithobsrvr.co/",
    headers={"Authorization": "Bearer YOUR_API_KEY"}
)
```

## Use Cases

### DeFi Applications
- Real-time price feeds
- Liquidity pool monitoring
- Transaction history tracking

### Wallets
- Balance queries
- Transaction submission
- Payment streaming

### Analytics Platforms
- Network statistics
- Asset distribution analysis
- Historical data queries

### NFT Marketplaces
- Asset issuance
- Ownership tracking
- Metadata management

## Advanced Features

### Streaming
Real-time updates via Server-Sent Events:

```javascript
server.transactions()
  .cursor('now')
  .stream({
    onmessage: (transaction) => {
      console.log('New transaction:', transaction);
    }
  });
```

### Pagination
Efficiently navigate large datasets:

```javascript
const payments = await server.payments()
  .forAccount(accountId)
  .limit(50)
  .order('desc')
  .call();
```

### Filtering
Query specific data subsets:

```javascript
const trades = await server.trades()
  .forAssetPair(assetA, assetB)
  .limit(100)
  .call();
```

## Comparison with Self-Hosted

| Feature | Obsrvr Gateway | Self-Hosted |
|---------|---------------|-------------|
| Setup Time | Instant | Days/Weeks |
| Maintenance | None | Continuous |
| Cost | Pay-per-use | Infrastructure + Staff |
| Scalability | Automatic | Manual |
| Historical Data | Full | Limited by storage |
| High Availability | Built-in | Complex setup |

## Pricing

Gateway services are included with your Obsrvr subscription. See our [pricing page](https://withobsrvr.com/pricing) for details.

## Guides

Learn how to leverage gateway services for specific use cases:

- [Running Stellar RPC with Full History](./guides/stellar-rpc-full-history.md) - Deploy your own RPC with cloud storage

## Support

- **Documentation**: Full API reference at [developers.stellar.org](https://developers.stellar.org)
- **Discord**: Join our community for real-time help
- **Email**: support@withobsrvr.com

## Next Steps

- [Create an account](https://console.withobsrvr.com) to get started
- Explore our [Flow pipelines](/docs/flow/overview) for data processing
- Check our [status page](https://status.withobsrvr.com) for real-time monitoring