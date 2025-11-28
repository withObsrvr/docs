---
sidebar_position: 3
title: Processors
---

# Processors

Processors transform raw Stellar blockchain data into structured, actionable information.

## Available Processors

### Standalone (gRPC Services)

| Name | Description | Repository |
|------|-------------|------------|
| ttp-processor | Extracts Token Transfer Protocol (TTP) events | [ttp-processor-demo](https://github.com/withObsrvr/ttp-processor-demo) |
| ducklake-ingestion-obsrvr-v2 | Ingests Stellar data into DuckLake Bronze layer | [ttp-processor-demo](https://github.com/withObsrvr/ttp-processor-demo) |
| contract-data-processor | Processes Soroban contract data changes | [ttp-processor-demo](https://github.com/withObsrvr/ttp-processor-demo) |
| contract-invocation-processor | Processes contract invocations with full details | [ttp-processor-demo](https://github.com/withObsrvr/ttp-processor-demo) |
| account-balance-processor | Tracks account balance changes | [ttp-processor-demo](https://github.com/withObsrvr/ttp-processor-demo) |

### Embedded (cdp-pipeline-workflow)

See the complete list of [55+ embedded processors](../processors/index.md) including:
- Contract Events, Contract Invocations, Contract Data
- Account Data, Account Filters, Account Effects
- Payment Filters, Participant Extractors
- Bronze Layer Extractors (19 Hubble-compatible tables)
- Asset & Market Data processors
- DeFi Protocol processors (Soroswap, Phoenix AMM)

---

## ttp-processor

Extracts Token Transfer Protocol (TTP) events from Stellar ledger data.

### Features
- Identifies TTP-compliant transactions
- Extracts token transfer details
- Supports multiple token standards
- High-performance gRPC streaming

### Deployment

**Docker:**
```yaml
type: ttp-processor
image: docker.io/withobsrvr/ttp-processor:latest
inputs: ["stellar-source"]
env:
  NETWORK_PASSPHRASE: "Test SDF Network ; September 2015"
  GRPC_PORT: "50054"
```

### Configuration

```yaml
network_passphrase: "Test SDF Network ; September 2015"
source_endpoint: "stellar-source:50052"
port: 50054
```

### gRPC Interface

```protobuf
service TTPService {
    rpc StreamTTPEvents(Empty) returns (stream TokenTransferEvent) {}
}

message TokenTransferEvent {
    uint32 ledger_sequence = 1;
    string transaction_hash = 2;
    string from_address = 3;
    string to_address = 4;
    string token_contract = 5;
    string amount = 6;
    string memo = 7;
}
```

### Use Cases
- Token transfer analytics
- Payment tracking
- Compliance monitoring
- DeFi integration

---

## ducklake-ingestion-obsrvr-v2

Ingests Stellar ledger data into DuckLake's Bronze layer with Hubble-compatible schema.

### Features
- Extracts all 19 Bronze layer tables
- Parquet file generation
- S3/GCS/B2 storage support
- Schema evolution support
- Optimized for analytics

### Deployment

**Docker:**
```yaml
type: ducklake-ingestion-obsrvr-v2
image: docker.io/withobsrvr/ducklake-ingestion-obsrvr-v2:latest
inputs: ["stellar-source"]
env:
  CATALOG_NAME: "obsrvr_catalog"
  SCHEMA_NAME: "testnet"
  BATCH_SIZE: "100"
  STORAGE_TYPE: "S3"
  BUCKET_NAME: "stellar-ducklake"
```

### Configuration

```yaml
catalog_name: "obsrvr_catalog"
schema_name: "testnet"
batch_size: 100
flush_interval_seconds: 30
storage_type: "S3"
bucket_name: "stellar-ducklake"
aws_region: "us-east-1"
```

### Output Tables

**Stream Tables:**
- `ledgers_row_v2` - Ledger headers
- `transactions_row_v2` - Transactions
- `operations_row_v2` - Operations
- `effects_row_v1` - Effects
- `trades_row_v1` - Trades
- `contract_events_stream_v1` - Contract events

**Snapshot Tables:**
- `accounts_snapshot_v1` - Account state
- `trustlines_snapshot_v1` - Trustlines
- `offers_snapshot_v1` - Offers
- `claimable_balances_snapshot_v1` - Claimable balances
- `liquidity_pools_snapshot_v1` - Liquidity pools
- `contract_data_snapshot_v1` - Contract data
- `contract_code_snapshot_v1` - Contract code
- `config_settings_snapshot_v1` - Network config
- `ttl_snapshot_v1` - TTL data
- `account_signers_snapshot_v1` - Account signers

**State Change Tables:**
- `evicted_keys_state_v1` - Evicted keys
- `restored_keys_state_v1` - Restored keys

### Use Cases
- Data lakehouse architecture
- Medallion (Bronze/Silver/Gold) pattern
- Historical analytics
- Data science workloads
- Multi-tenant data platforms

---

## contract-data-processor

Processes Soroban contract data changes from the ledger.

### Features
- Tracks contract storage changes
- Monitors contract state
- Supports multiple contracts
- Real-time streaming

### Deployment

**Docker:**
```yaml
type: contract-data-processor
image: docker.io/withobsrvr/contract-data-processor:latest
inputs: ["stellar-source"]
env:
  NETWORK_PASSPHRASE: "Test SDF Network ; September 2015"
  CONTRACT_IDS: "CCABC123...,CCDEF456..."
```

### Configuration

```yaml
network_passphrase: "Test SDF Network ; September 2015"
contract_ids:
  - "CCABC123..."
  - "CCDEF456..."
```

### Use Cases
- Contract state monitoring
- Storage analytics
- Data integrity verification
- State change auditing

---

## contract-invocation-processor

Processes Soroban contract invocations with complete execution details.

### Features
- Full invocation details (function, args, results)
- Diagnostic events
- State changes
- TTL extensions
- Archive metadata

### Deployment

**Docker:**
```yaml
type: contract-invocation-processor
image: docker.io/withobsrvr/contract-invocation-processor:latest
inputs: ["stellar-source"]
env:
  NETWORK_PASSPHRASE: "Test SDF Network ; September 2015"
```

### Configuration

```yaml
network_passphrase: "Test SDF Network ; September 2015"
include_diagnostic_events: true
include_state_changes: true
```

### Use Cases
- Contract execution analytics
- Function call tracking
- Performance monitoring
- Debugging and troubleshooting

---

## account-balance-processor

Tracks balance changes for specific Stellar accounts.

### Features
- Real-time balance monitoring
- Multi-asset support
- Historical balance tracking
- Threshold alerting

### Deployment

**Docker:**
```yaml
type: account-balance-processor
image: docker.io/withobsrvr/account-balance-processor:latest
inputs: ["stellar-source"]
env:
  NETWORK_PASSPHRASE: "Test SDF Network ; September 2015"
  MONITORED_ACCOUNTS: "GABC...,GDEF..."
```

### Configuration

```yaml
network_passphrase: "Test SDF Network ; September 2015"
monitored_accounts:
  - "GABC123..."
  - "GDEF456..."
asset_codes: ["USDC", "XLM"]
```

### Use Cases
- Treasury management
- Wallet monitoring
- Portfolio tracking
- Balance alerts

---

## Embedded Processors

The `cdp-pipeline-workflow` includes 55+ embedded processors. See [Processors Index](../processors/index.md) for the complete list.

### Core Ledger & Transaction (7 processors)
- Ledger Reader, Passthrough, Ledger to JSON, Latest Ledger, Operation Processor

### Account Monitoring (6 processors)
- Account Data, Account Data Filter, Account Effects, Account Transactions

### Soroban Contract Processing (9 processors)
- Contract Events, Contract Invocation, Contract Filter, Contract Data, Contract Creation

### Bronze Layer (2 processors)
- Bronze Extractors (19 tables), Bronze to Contract Invocation

### Payment & Operations (4 processors)
- Filter Payments, Participant Extractor, Event Payment Extractor

### Asset & Market Data (9 processors)
- Asset Processor, Asset Enrichment, Market Metrics, Token Price

### DeFi Protocols (4 processors)
- Soroswap, Soroswap Router, Phoenix AMM, Kale

### Application Transforms (5 processors)
- Transform to App Account, App Payment, App Trade, App Trustline

### State & Effects (2 processors)
- Stellar Effects, Claimable Balance

### Utilities (2 processors)
- Blank Processor (template), Stdout Sink

---

## Choosing a Processor

### Use Standalone (gRPC) processors when:
- ✅ You need language-agnostic integration
- ✅ You want independent scaling
- ✅ You're building distributed pipelines
- ✅ Multiple teams own different processors

### Use Embedded processors when:
- ✅ You want a single-binary deployment
- ✅ You need lower latency
- ✅ You're doing rapid development
- ✅ You want simpler operations

---

## Next Steps

- **Sinks**: See [available sinks](./sinks.md) for output destinations
- **Examples**: Check [pipeline examples](./examples.md) for complete configurations
- **Custom Processors**: Learn to build your own in [Building Custom Components](./building-components.md)
