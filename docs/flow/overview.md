---
sidebar_position: 1
title: Overview
---

import HelperBox from '@site/src/components/HelperBox';

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

### 💰 Launch Plan Pricing
Simple, predictable pricing with **$99/month** including generous usage allowances:
- 50 GB Flow processing included
- 2 concurrent pipelines included
- Only pay for usage above included limits
- Transparent overage pricing with no surprises

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

<HelperBox title="Just getting started?" icon="⚡" variant="tip">

New to Flow? Follow our [Quickstart Guide](./getting-started/quickstart.md) to deploy your first pipeline in under 5 minutes. You'll learn how to:

- Set up your Flow account
- Configure a simple payment tracking pipeline
- Deploy and monitor your first data stream

**Bonus:** Your first 100 minutes are free - perfect for exploring and testing!

</HelperBox>

## Architecture Overview

Flow pipelines follow a simple yet powerful architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    Flow (Orchestrator)                       │
│  • Component Registry & Health Monitoring                   │
│  • Stream Management                                        │
│  • Managed Infrastructure                                    │
└─────────────────────────────┬───────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
  │   Source     │───▶│  Processor   │───▶│    Sink      │
  │              │    │              │    │              │
  │ (Stellar/    │    │ (Transforms  │    │ (PostgreSQL, │
  │  Soroban)    │    │  data)       │    │  Webhooks)   │
  └──────────────┘    └──────────────┘    └──────────────┘
```

- **Sources** fetch data from Stellar/Soroban networks or cloud storage
- **Processors** transform raw blockchain data into structured formats
- **Sinks** deliver the processed data to your chosen destination
- **Orchestration** handled automatically by Flow's managed infrastructure

### Powered by flowctl

Flow uses [flowctl](https://github.com/withobsrvr/flowctl) as its underlying orchestration engine. flowctl is an open-source pipeline orchestrator that:
- Manages component lifecycle and health monitoring
- Routes data between components via gRPC streams
- Provides observability through metrics and structured logging
- Supports multiple deployment targets (process, docker, kubernetes)

**For self-hosted deployments**, you can use flowctl directly. See the [flowctl documentation](https://github.com/withobsrvr/flowctl) for installation and configuration.

## Available Components

### Component Registry

Browse our comprehensive component registry to discover all available sources, processors, and sinks:

- **[Component Registry](./registry/overview.md)** - Complete catalog with configuration examples
- **[Data Sources](./registry/sources.md)** - Stellar RPC and cloud storage adapters
- **[Processors](./registry/processors.md)** - 55+ data transformation components
- **[Sinks](./registry/sinks.md)** - 51 output destinations
- **[Building Components](./registry/building-components.md)** - Guide for custom components
- **[Pipeline Examples](./registry/examples.md)** - Complete pipeline configurations

### Popular Processors
- **Payments with Memo**: Filter and process payment operations
- **Contract Events**: Subscribe to Soroban events
- **Account Balance**: Track balance changes
- **Latest Ledger Metrics**: Real-time network statistics
- **DuckLake Ingestion**: Data lakehouse architecture
- [View all 55+ processors →](./registry/processors.md)

### Popular Consumers
- **PostgreSQL**: Structured database storage
- **DuckDB/DuckLake**: Columnar analytics
- **Redis**: Real-time data access
- **ZeroMQ**: Low-latency messaging
- **WebSocket**: Browser streaming
- [View all 51 consumers →](./registry/sinks.md)

## Getting Started

Ready to build your first pipeline? Check out our [Quickstart Guide](./getting-started/quickstart.md) to get up and running in minutes.

## Pricing

Flow is included in the Obsrvr Launch Plan:
- **$99/month** base subscription
- **50 GB Flow processing** included
- **2 concurrent pipelines** included
- **Transparent overage pricing** for usage above limits

See our [Pricing Page](./pricing.md) for detailed information, usage examples, and legacy pricing options.

## Access

Flow is currently in early access. [Join the waitlist](https://console.withobsrvr.com) to get access when we expand availability.