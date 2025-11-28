---
sidebar_position: 6
title: Pipeline Examples
---

# Pipeline Examples

Complete pipeline configurations for common use cases.

## Example 1: DuckLake Bronze Ingestion

Ingest Stellar testnet data into DuckLake Bronze layer for analytics.

### Architecture
```
stellar-live-source-datalake → ducklake-ingestion-obsrvr-v2 → Parquet Files (S3)
```

### Configuration

```yaml
apiVersion: flowctl.io/v1
kind: Pipeline
metadata:
  name: ducklake-bronze-ingestion
  namespace: obsrvr

spec:
  description: "Ingest Stellar testnet data to DuckLake Bronze layer"
  driver: docker

  sources:
    - id: stellar-source
      type: stellar-live-source-datalake
      image: docker.io/withobsrvr/stellar-live-source-datalake:latest
      env:
        NETWORK_PASSPHRASE: "Test SDF Network ; September 2015"
        STORAGE_TYPE: "GCS"
        BUCKET_NAME: "${GCS_BUCKET}"
        BUCKET_PATH: "landing/ledgers/testnet"
        GRPC_PORT: "50053"

  processors:
    - id: ducklake-ingester
      type: ducklake-ingestion-obsrvr-v2
      image: docker.io/withobsrvr/ducklake-ingestion-obsrvr-v2:latest
      inputs: ["stellar-source"]
      env:
        CATALOG_NAME: "obsrvr_catalog"
        SCHEMA_NAME: "testnet"
        BATCH_SIZE: "100"
        STORAGE_TYPE: "S3"
        BUCKET_NAME: "${S3_DUCKLAKE_BUCKET}"
        AWS_REGION: "us-east-1"
```

### Use Cases
- Data lakehouse architecture
- Historical analytics
- Multi-tenant data platforms

---

## Example 2: Contract Event Extraction

Extract Soroban contract events and store in PostgreSQL.

### Architecture
```
BufferedStorageSourceAdapter → ContractEvent → SaveContractEventsToPostgreSQL
```

### Configuration

```yaml
pipelines:
  ContractEventPipeline:
    source:
      type: BufferedStorageSourceAdapter
      config:
        bucket_name: "${BUCKET_NAME}/landing/ledgers/testnet"
        network: "testnet"
        num_workers: 10
        start_ledger: 1465402
        end_ledger: 1465500

    processors:
      - type: ContractEvent
        config:
          network_passphrase: "Test SDF Network ; September 2015"

    consumers:
      - type: SaveContractEventsToPostgreSQL
        config:
          host: "localhost"
          port: 5432
          database: "soroban_events"
          username: "${DB_USER}"
          password: "${DB_PASSWORD}"
          sslmode: "disable"
```

### Use Cases
- DeFi protocol monitoring
- Smart contract analytics
- Event-driven applications

---

## Example 3: TTP Event Processing

Extract Token Transfer Protocol events and publish to ZeroMQ for real-time processing.

### Architecture
```
stellar-live-source (RPC) → ttp-processor → ZeroMQ → Consumer Apps
```

### Configuration

**Docker Compose:**
```yaml
version: '3.8'

services:
  stellar-source:
    image: withobsrvr/stellar-live-source:latest
    environment:
      - RPC_ENDPOINT=https://soroban-testnet.stellar.org
      - NETWORK_PASSPHRASE=Test SDF Network ; September 2015
      - GRPC_PORT=50052
    ports:
      - "50052:50052"

  ttp-processor:
    image: withobsrvr/ttp-processor:latest
    environment:
      - SOURCE_ENDPOINT=stellar-source:50052
      - GRPC_PORT=50054
    ports:
      - "50054:50054"
    depends_on:
      - stellar-source
```

**cdp-pipeline-workflow Config:**
```yaml
pipelines:
  TTPPipeline:
    source:
      type: BufferedStorageSourceAdapter
      config:
        bucket_name: "stellar-ledgers/testnet"
        network: "testnet"
        start_ledger: 1465402

    processors:
      - type: ContractEvent  # Extract events
        config:
          network_passphrase: "Test SDF Network ; September 2015"

    consumers:
      - type: SaveToZeroMQ
        config:
          address: "tcp://127.0.0.1:5555"
```

### Use Cases
- Real-time token transfer monitoring
- Payment processing systems
- Compliance tracking

---

## Example 4: Account Balance Monitoring

Monitor specific accounts and alert on balance changes.

### Architecture
```
stellar-live-source → account-balance-processor → [Redis + WebSocket]
```

### Configuration

```yaml
pipelines:
  AccountMonitoring:
    source:
      type: BufferedStorageSourceAdapter
      config:
        bucket_name: "stellar-ledgers/mainnet"
        network: "mainnet"
        start_ledger: 50000000

    processors:
      - type: AccountData
        config:
          network_passphrase: "Public Global Stellar Network ; September 2015"

      - type: AccountDataFilter
        config:
          account_ids:
            - "GABC123..."
            - "GDEF456..."
          min_balance: "100000000"  # 10 XLM
          change_types: ["updated"]

    consumers:
      - type: SaveToRedis
        config:
          redis_url: "redis://localhost:6379"
          key_prefix: "account:"
          ttl_hours: 24

      - type: SaveToWebSocket
        config:
          port: 8080
          path: "/ws"
          max_queue_size: 1000

      - type: NotificationDispatcher
        config:
          webhook_urls:
            - "https://hooks.slack.com/services/..."
          rules:
            - condition: "balance_change > 1000000000"  # > 100 XLM
              channel: "treasury-alerts"
```

### Use Cases
- Treasury management
- Wallet monitoring
- Fraud detection

---

## Example 5: Multi-Sink Analytics Pipeline

Process payments and store in multiple destinations for different use cases.

### Architecture
```
                   ┌─> PostgreSQL (Application DB)
stellar-source → processor ├─> DuckDB (Analytics)
                   ├─> Redis (Caching)
                   └─> Parquet (Archival)
```

### Configuration

```yaml
pipelines:
  PaymentAnalytics:
    source:
      type: BufferedStorageSourceAdapter
      config:
        bucket_name: "stellar-ledgers/mainnet"
        network: "mainnet"
        start_ledger: 50000000

    processors:
      - type: FilterPayments
        config:
          min_amount: "100"
          asset_code: "USDC"
          network_passphrase: "Public Global Stellar Network ; September 2015"

    consumers:
      # Application database
      - type: SavePaymentsToPostgreSQL
        config:
          batch_size: 1000
          connection_string: "postgresql://app:pass@localhost:5432/payments"

      # Analytics database
      - type: SaveToDuckDB
        config:
          db_path: "/data/payments.duckdb"

      # Real-time cache
      - type: SavePaymentsToRedis
        config:
          redis_url: "redis://localhost:6379"
          key_prefix: "payment:"
          ttl_hours: 48

      # Long-term archival
      - type: SaveToParquet
        config:
          storage_type: "s3"
          s3_bucket: "stellar-archives"
          output_path: "payments/"
```

### Use Cases
- Multi-purpose data storage
- Hot/warm/cold data tiers
- Real-time + historical analytics

---

## Example 6: DeFi Protocol Analytics

Monitor Soroswap DEX and track liquidity/swaps.

### Architecture
```
stellar-source → ContractEvent → ContractFilter (Soroswap) → Soroswap Processor → DuckDB
```

### Configuration

```yaml
pipelines:
  SoroswapAnalytics:
    source:
      type: BufferedStorageSourceAdapter
      config:
        bucket_name: "stellar-ledgers/mainnet"
        network: "mainnet"
        start_ledger: 45000000

    processors:
      - type: ContractEvent
        config:
          network_passphrase: "Public Global Stellar Network ; September 2015"

      - type: ContractFilter
        config:
          contract_ids:
            - "CCSOROSWAP_FACTORY_CONTRACT_ID"
            - "CCSOROSWAP_ROUTER_CONTRACT_ID"

      - type: Soroswap
        config: {}

    consumers:
      - type: SaveSoroswapPairsToDuckDB
        config:
          db_path: "/data/soroswap.duckdb"

      - type: SaveSoroswapRouterToDuckDB
        config:
          db_path: "/data/soroswap.duckdb"
```

### Use Cases
- DEX analytics
- Liquidity tracking
- Trading volume analysis

---

## Example 7: AI-Powered Transaction Analysis

Use Claude AI to analyze interesting transactions.

### Architecture
```
stellar-source → FilterPayments → Anthropic Claude → PostgreSQL
```

### Configuration

```yaml
pipelines:
  AIAnalytics:
    source:
      type: BufferedStorageSourceAdapter
      config:
        bucket_name: "stellar-ledgers/mainnet"
        network: "mainnet"
        start_ledger: 50000000

    processors:
      - type: FilterPayments
        config:
          min_amount: "10000000000"  # Large payments (>1000 XLM)
          network_passphrase: "Public Global Stellar Network ; September 2015"

    consumers:
      - type: AnthropicClaudeConsumer
        config:
          anthropic_api_key: "${ANTHROPIC_API_KEY}"
          batch_size: 10
          flush_interval_seconds: 60

      - type: SaveToPostgreSQL
        config:
          connection_string: "postgresql://localhost:5432/ai_insights"
          batch_size: 50
```

### Use Cases
- Anomaly detection
- Pattern recognition
- Fraud analysis

---

## Example 8: Cross-Chain Data Lake

Ingest multiple networks into a unified data lake.

### Architecture
```
┌─ stellar-source (testnet) ─┐
│                              │
├─ stellar-source (mainnet) ─┼─> ducklake-ingester → Unified DuckLake
│                              │
└─ stellar-source (futurenet) ┘
```

### Configuration

```yaml
apiVersion: flowctl.io/v1
kind: Pipeline
metadata:
  name: multi-network-ingestion

spec:
  sources:
    - id: testnet-source
      type: stellar-live-source-datalake
      image: docker.io/withobsrvr/stellar-live-source-datalake:latest
      env:
        STORAGE_TYPE: "GCS"
        BUCKET_NAME: "${GCS_BUCKET}/testnet"
        NETWORK_PASSPHRASE: "Test SDF Network ; September 2015"

    - id: mainnet-source
      type: stellar-live-source-datalake
      image: docker.io/withobsrvr/stellar-live-source-datalake:latest
      env:
        STORAGE_TYPE: "GCS"
        BUCKET_NAME: "${GCS_BUCKET}/mainnet"
        NETWORK_PASSPHRASE: "Public Global Stellar Network ; September 2015"

  processors:
    - id: testnet-ingester
      type: ducklake-ingestion-obsrvr-v2
      image: docker.io/withobsrvr/ducklake-ingestion-obsrvr-v2:latest
      inputs: ["testnet-source"]
      env:
        SCHEMA_NAME: "testnet"

    - id: mainnet-ingester
      type: ducklake-ingestion-obsrvr-v2
      image: docker.io/withobsrvr/ducklake-ingestion-obsrvr-v2:latest
      inputs: ["mainnet-source"]
      env:
        SCHEMA_NAME: "mainnet"
```

### Use Cases
- Multi-network analytics
- Cross-network comparisons
- Unified data platform

---

## Running the Examples

### Using flowctl

```bash
# Run a pipeline
flowctl run pipeline.yaml

# With environment variables
export GCS_BUCKET=my-bucket
export DB_USER=postgres
export DB_PASSWORD=secret
flowctl run pipeline.yaml

# Monitor pipeline
flowctl status pipeline-name

# View logs
flowctl logs pipeline-name --follow
```

### Using cdp-pipeline-workflow

```bash
# Build the binary
go build -o pipeline

# Run with config
./pipeline run config.yaml

# Set environment variables
export BUCKET_NAME=my-bucket
export DB_USER=postgres
./pipeline run config.yaml
```

### Using Docker Compose

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## Common Patterns

### Fan-Out (One Source, Multiple Processors)

```yaml
source → ┬─> processor-a → sink-a
         ├─> processor-b → sink-b
         └─> processor-c → sink-c
```

### Fan-In (Multiple Sources, One Processor)

```yaml
source-a ┐
source-b ├─> processor → sink
source-c ┘
```

### Chain (Sequential Processing)

```yaml
source → processor-1 → processor-2 → processor-3 → sink
```

### Broadcast (One Source, Multiple Sinks)

```yaml
           ┌─> sink-a
source → processor ├─> sink-b
           └─> sink-c
```

---

## Next Steps

- **Build Custom Components**: See [Building Custom Components](./building-components.md)
- **Browse Components**: [Sources](./sources.md) | [Processors](./processors.md) | [Sinks](./sinks.md)
- **Learn More**: Check the [Registry Overview](./overview.md)
