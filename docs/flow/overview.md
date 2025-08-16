---
sidebar_position: 1
title: Overview
---

# Flow: Data Pipeline Platform for Stellar & Soroban

Flow is Obsrvr's data pipeline platform that provides infrastructure building blocks for processing Stellar and Soroban blockchain data. With Flow, you can deploy data processing pipelines with one click, stream blockchain data in real-time, and deliver it to your preferred destination - all without managing complex infrastructure.

## What is Flow?

Flow enables developers to:

- **Stream blockchain data** from Stellar and Soroban networks
- **Process data** using pre-built or custom processors
- **Deliver results** to databases, webhooks, message queues, or cloud storage
- **Pay only for what you use** with per-minute billing

## Key Features

### 🚀 One-Click Deployment
Deploy production-ready data pipelines instantly without DevOps complexity. Flow handles all the infrastructure, scaling, and orchestration for you.

### 📊 Full Historical Data
Start processing from any ledger point - whether from the latest ledger or from genesis. Perfect for both real-time monitoring and historical analysis.

### 🔌 Multiple Destinations
Send processed data wherever you need it:
- **Databases**: PostgreSQL, DuckDB, SQLite, Redis
- **Streaming**: Kafka, Webhooks, ZeroMQ
- **Storage**: Amazon S3
- **Custom**: Build your own consumer

### 📈 Real-Time Monitoring
Track pipeline performance with:
- Live status updates
- Real-time log streaming
- Usage metrics and cost tracking
- Deployment error details

### 💰 Pay-As-You-Go Pricing
Simple, transparent pricing at **$0.003 per minute** of pipeline runtime:
- First 100 minutes free for new users
- No setup fees or minimum commitments
- Only pay when pipelines are running
- Monthly billing with detailed usage reports

## Use Cases

### Payment Processing
Track and process payments with specific memo patterns for:
- Invoice reconciliation
- Customer payment tracking
- Multi-signature payment monitoring

### Contract Event Monitoring
Subscribe to Soroban smart contract events for:
- DeFi protocol monitoring
- NFT marketplace activity
- Custom dApp analytics

### Account Balance Tracking
Monitor account balance changes for:
- Treasury management
- Wallet analytics
- Liquidity monitoring

### Network Analytics
Process network-wide data for:
- Transaction volume analysis
- Asset distribution tracking
- Network health monitoring

## How It Works

1. **Choose Your Network**: Select between Stellar mainnet or testnet
2. **Configure Your Pipeline**: 
   - Select a starting ledger (latest or specific height)
   - Choose processors to transform the data
   - Configure consumers for data delivery
3. **Deploy**: One-click deployment to Obsrvr's infrastructure
4. **Monitor**: Track status, view logs, and monitor usage in real-time

## Architecture Overview

Flow pipelines follow a simple yet powerful architecture:

```
Stellar/Soroban Network → Processor(s) → Consumer(s) → Your Application
```

- **Processors** transform raw blockchain data into structured formats
- **Consumers** deliver the processed data to your chosen destination
- **Orchestration** handled automatically by Flow's infrastructure

## Available Components

### Processors
- **Payments with Memo**: Filter and process payment operations
- **Raw Transactions**: Access all network transactions
- **Account Balance**: Track balance changes
- **Contract Events**: Subscribe to Soroban events
- **Latest Ledger Metrics**: Real-time network statistics
- **SwapService**: Track DEX activity
- And more...

### Consumers
- **PostgreSQL**: Structured database storage
- **Webhooks**: HTTP endpoint delivery
- **Kafka**: Stream processing integration
- **Amazon S3**: Cloud storage
- **Redis**: Real-time data access
- And more...

## Getting Started

Ready to build your first pipeline? Check out our [Quickstart Guide](./getting-started/quickstart.md) to get up and running in minutes.

## Pricing

Flow uses simple pay-as-you-go pricing:
- **$0.003 per minute** of pipeline runtime
- **First 100 minutes free** for new users
- **No setup fees** or hidden costs

See our [Pricing Page](./pricing.md) for detailed information.

## Access

Flow is currently in early access. [Join the waitlist](https://console.withobsrvr.com) to get access when we expand availability.