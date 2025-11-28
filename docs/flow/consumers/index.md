---
sidebar_position: 1
title: Consumers Overview
---

# Consumers

Consumers are the destination components in Flow pipelines that receive processed blockchain data and deliver it to your applications, databases, or storage systems. Each consumer is optimized for specific use cases and integration patterns.

## Available Consumers

### Database Storage - PostgreSQL

#### [PostgreSQL (Generic)](./postgresql.md)
General-purpose PostgreSQL consumer for ledger data with flexible JSON format.

**Configuration:**
```yaml
type: postgres
config:
  connection_string: "postgresql://user:pass@host:5432/database"
  batch_size: 50
```

**Use Cases:** Analytics databases, application backends, historical data storage

---

#### PostgreSQL Bronze
Bronze layer data ingestion to PostgreSQL for data lakehouse architecture.

**Configuration:**
```yaml
type: postgres_bronze
config:
  host: "localhost"
  database: "bronze"
  username: "user"
  password: "password"
```

**Use Cases:** Raw data layer storage, medallion architecture

---

#### Buffered PostgreSQL
Buffered batch inserts with retry logic for high-throughput scenarios.

**Configuration:**
```yaml
type: buffered_postgres
config:
  buffer_size: 1000
  flush_interval_ms: 5000
  max_retries: 3
```

**Use Cases:** High-volume data ingestion with batching

---

#### Account Data PostgreSQL
Stores Stellar account data with full metadata.

**Configuration:**
```yaml
type: account_data_postgres
config:
  host: "localhost"
  port: 5432
  database: "accounts"
  max_open_conns: 20
```

**Use Cases:** Account state tracking and historical analysis

---

#### Asset PostgreSQL
Stores asset/ticker information with batching.

**Configuration:**
```yaml
type: asset_postgres
config:
  batch_size: 100
  connection_string: "postgresql://user:pass@host:5432/assets"
```

**Use Cases:** Asset catalog and enrichment data storage

---

#### Asset Enrichment PostgreSQL
Updates asset enrichment data (TOML, auth flags).

**Configuration:**
```yaml
type: asset_enrichment
config:
  connection_string: "postgresql://user:pass@host:5432/assets"
```

**Use Cases:** Asset metadata enrichment from stellar.toml

---

#### Payments PostgreSQL
Batched payment transaction storage.

**Configuration:**
```yaml
type: payments_postgres
config:
  batch_size: 1000
  connection_string: "postgresql://user:pass@host:5432/payments"
```

**Use Cases:** Payment history and analytics

---

#### Event Payment PostgreSQL
Event-based payment storage with account relationships.

**Configuration:**
```yaml
type: event_payment_postgres
config:
  host: "localhost"
  database: "payments"
  max_open_conns: 20
```

**Use Cases:** Event-driven payment tracking with foreign keys

---

#### Contract Events PostgreSQL
Soroban contract events storage.

**Configuration:**
```yaml
type: contract_events_postgres
config:
  host: "localhost"
  database: "soroban_events"
```

**Use Cases:** Smart contract event logging and analysis

---

#### Contract Invocations PostgreSQL
Contract invocations with dual XDR/decoded format, diagnostic events, state changes.

**Configuration:**
```yaml
type: contract_invocations_postgres
config:
  host: "localhost"
  database: "contract_invocations"
```

**Use Cases:** Complete contract execution tracking

---

#### Extracted Contract Invocations PostgreSQL
Business-logic extracted contract data (funder, recipient, amount, project_id).

**Configuration:**
```yaml
type: extracted_contract_invocations_postgres
config:
  host: "localhost"
  database: "business_data"
```

**Use Cases:** Business intelligence from smart contracts

---

#### Claimable Balance PostgreSQL
Claimable balance tracking with claimants.

**Configuration:**
```yaml
type: claimable_balance_postgres
config:
  database_url: "postgresql://user:pass@host:5432/claimable_balances"
```

**Use Cases:** Claimable balance lifecycle management

---

#### Soroswap PostgreSQL
Soroswap DEX events (pairs, swaps, liquidity).

**Configuration:**
```yaml
type: soroswap_postgres
config:
  host: "localhost"
  database: "soroswap"
```

**Use Cases:** Soroswap DEX analytics

---

#### Wallet Backend PostgreSQL
Wallet backend with state changes and participants.

**Configuration:**
```yaml
type: wallet_backend_postgres
config:
  host: "localhost"
  database: "wallet"
```

**Use Cases:** Wallet application backend database

---

### Database Storage - DuckDB

#### DuckDB (Generic)
General DuckDB storage for analytics-friendly columnar format.

**Configuration:**
```yaml
type: duckdb
config:
  db_path: "/path/to/data.duckdb"
```

**Use Cases:** Local analytics, data science workflows

---

#### DuckLake
DuckDB lakehouse pattern with schema registry.

**Configuration:**
```yaml
type: ducklake
config:
  db_path: "ducklake.duckdb"
  catalog_name: "main"
  schema_name: "bronze"
  table_prefix: "stellar_"
```

**Use Cases:** Data lakehouse architecture with managed schemas

---

#### DuckLake Enhanced
Enhanced DuckLake with better performance and features.

**Configuration:**
```yaml
type: ducklake_enhanced
config:
  db_path: "ducklake_enhanced.duckdb"
  batch_size: 100
  flush_interval: 5
```

**Use Cases:** High-performance data lakehouse

---

#### Bronze DuckDB
Bronze layer DuckDB ingestion with appenders for medallion architecture.

**Configuration:**
```yaml
type: bronze_duckdb
config:
  db_path: "bronze.duckdb"
  batch_size: 100
  flush_interval_seconds: 10
```

**Use Cases:** Raw data ingestion for data lakehouse

---

#### Account Data DuckDB
Account data with schema validation.

**Configuration:**
```yaml
type: account_data_duckdb
config:
  db_path: "accounts.duckdb"
```

**Use Cases:** Account analytics in DuckDB

---

#### Assets DuckDB
Asset catalog with upsert logic.

**Configuration:**
```yaml
type: assets_duckdb
config:
  db_path: "assets.duckdb"
```

**Use Cases:** Asset tracking and analytics

---

#### Contract Events DuckDB
Soroban contract events with analytics views.

**Configuration:**
```yaml
type: contract_events_duckdb
config:
  db_path: "soroban_events.duckdb"
```

**Use Cases:** Contract event analytics with built-in views

---

#### Soroswap Pairs DuckDB
Soroswap pair and sync events.

**Configuration:**
```yaml
type: soroswap_pairs_duckdb
config:
  db_path: "soroswap_pairs.duckdb"
```

**Use Cases:** DEX pair tracking and reserves

---

#### Soroswap Router DuckDB
Soroswap router transactions.

**Configuration:**
```yaml
type: soroswap_router_duckdb
config:
  db_path: "soroswap_router.duckdb"
```

**Use Cases:** Router analytics and swap tracking

---

### Database Storage - Other

#### SQLite (Soroswap)
Lightweight SQLite versions of Soroswap consumers.

**Configuration:**
```yaml
type: soroswap_pairs_sqlite
config:
  db_path: "soroswap.db"
```

**Use Cases:** Portable DEX data storage, development

---

#### ClickHouse
OLAP database with materialized views for real-time analytics.

**Configuration:**
```yaml
type: clickhouse
config:
  address: "localhost:9000"
  database: "stellar"
  username: "default"
  password: ""
  max_open_conns: 25
```

**Use Cases:** Payment stats, price analytics, trustlines, high-volume analytics

---

#### MongoDB
Document-based storage for flexible schemas.

**Configuration:**
```yaml
type: mongodb
config:
  uri: "mongodb://localhost:27017"
  database: "stellar"
  collection: "transactions"
```

**Use Cases:** Flexible document storage, semi-structured data

---

#### TimescaleDB
Time-series database for temporal analytics.

**Configuration:**
```yaml
type: timescaledb
config:
  host: "localhost"
  database: "timeseries"
```

**Use Cases:** Time-series data and analytics

---

### Caching - Redis

#### Redis (Generic)
Multi-operation Redis storage (payments, accounts, assets, prices, offers, trustlines).

**Configuration:**
```yaml
type: redis
config:
  redis_url: "redis://localhost:6379"
  key_prefix: "flow:"
  ttl_hours: 24
  use_tls: true
```

**Use Cases:** Fast lookups, caching, real-time data

---

#### Payments Redis
Payment-specific Redis storage with indices.

**Configuration:**
```yaml
type: payments_redis
config:
  redis_url: "redis://localhost:6379"
  key_prefix: "payment:"
  ttl_hours: 48
```

**Use Cases:** Payment caching and fast retrieval

---

#### Latest Ledger Redis
Latest ledger tracking with history.

**Configuration:**
```yaml
type: latest_ledger_redis
config:
  redis_url: "redis://localhost:6379"
  key_prefix: "ledger:"
  use_tls: true
```

**Use Cases:** Ledger progress tracking

---

#### Orderbook Redis
Order book data storage.

**Configuration:**
```yaml
type: orderbook_redis
config:
  redis_url: "redis://localhost:6379"
```

**Use Cases:** Trading orderbook caching

---

#### Market Analytics Redis
Market analytics and metrics.

**Configuration:**
```yaml
type: market_analytics_redis
config:
  redis_url: "redis://localhost:6379"
```

**Use Cases:** Trading analytics and market data

---

### Cloud Storage

#### Google Cloud Storage
Upload to Google Cloud Storage buckets.

**Configuration:**
```yaml
type: gcs
config:
  bucket_name: "my-stellar-data"
  object_prefix: "ledgers/"
  credentials_file: "/path/to/credentials.json"
```

**Use Cases:** Cloud backup and archival

---

#### Parquet Files
Parquet file generation with cloud storage support (local/S3/GCS).

**Configuration:**
```yaml
type: parquet
config:
  storage_type: "s3"
  s3_bucket: "my-stellar-data"
  output_path: "parquet/ledgers/"
```

**Use Cases:** Columnar data export for analytics

---

#### Ledger Parquet
Ledger-specific Parquet files.

**Configuration:**
```yaml
type: ledger_parquet
config:
  storage_type: "gcs"
  gcs_bucket: "my-stellar-ledgers"
  output_path: "parquet/"
```

**Use Cases:** Ledger data archival in Parquet format

---

### Streaming & Messaging

#### Google Pub/Sub
Publisher for Google Pub/Sub with EventPayment support.

**Configuration:**
```yaml
type: pubsub
config:
  project_id: "my-project"
  topic_id: "stellar-events"
  credentials_file: "/path/to/credentials.json"
```

**Use Cases:** Event streaming to Google Pub/Sub

---

#### Google Pub/Sub V2
V2 format with chain identifier (StellarMainnet/Testnet).

**Configuration:**
```yaml
type: pubsub_v2
config:
  project_id: "my-project"
  topic_id: "stellar-events-v2"
  chain_identifier: "StellarMainnet"
```

**Use Cases:** Multi-chain Pub/Sub publishing

---

#### ZeroMQ
Low-latency message publishing.

**Configuration:**
```yaml
type: zeromq
config:
  endpoint: "tcp://localhost:5555"
```

**Use Cases:** High-performance IPC, minimal latency

---

### Real-time Communications

#### WebSocket
WebSocket server with client filtering and queuing.

**Configuration:**
```yaml
type: websocket
config:
  port: 8080
  path: "/ws"
  max_queue_size: 1000
```

**Use Cases:** Real-time browser/app updates with custom filters

---

### File Export

#### Excel
Excel spreadsheet export.

**Configuration:**
```yaml
type: excel
config:
  file_path: "/path/to/output.xlsx"
  sheet_name: "Data"
```

**Use Cases:** Manual analysis and reporting

---

#### Latest Ledger Excel
Ledger-specific Excel export.

**Configuration:**
```yaml
type: latest_ledger_excel
config:
  file_path: "/path/to/ledgers.xlsx"
```

**Use Cases:** Ledger progress tracking in Excel

---

### AI/ML Integration

#### Anthropic Claude
Batches messages and sends to Claude API for analysis.

**Configuration:**
```yaml
type: claude
config:
  anthropic_api_key: "sk-ant-..."
  batch_size: 10
  flush_interval_seconds: 30
```

**Use Cases:** AI-powered transaction analysis and insights

---

### Notifications

#### Notification Dispatcher
Multi-channel notifications (Slack, email, webhook) with rule-based filtering.

**Configuration:**
```yaml
type: notification_dispatcher
config:
  slack_token: "xoxb-..."
  webhook_urls:
    - "https://hooks.slack.com/services/..."
  rules:
    - condition: "amount > 1000000"
      channel: "high-value-payments"
```

**Use Cases:** Alert system for threshold-based monitoring

---

### Data Transformation

#### Silver Ingester
Bronze to Silver layer transformation for medallion architecture.

**Configuration:**
```yaml
type: silver_ingester
config:
  source_db: "bronze.duckdb"
  target_db: "silver.duckdb"
```

**Use Cases:** Curated data layer processing

---

### Debugging & Development

#### Stdout
Prints JSON to stdout for debugging.

**Configuration:**
```yaml
type: stdout
```

**Use Cases:** Development, debugging, testing

---

#### Debug Logger
Detailed message inspection with field limits.

**Configuration:**
```yaml
type: debug_logger
config:
  name: "pipeline-debug"
  log_prefix: "DEBUG"
  max_fields: 10
```

**Use Cases:** Deep debugging of message structure

---

#### Log Debug
Logs message types and metadata.

**Configuration:**
```yaml
type: log_debug
config:
  log_level: "info"
```

**Use Cases:** Pipeline flow debugging

---

## Choosing the Right Consumer

Consider these factors when selecting a consumer:

### 1. **Data Access Patterns**
- **Real-time queries**: PostgreSQL, Redis
- **Batch analytics**: S3, DuckDB
- **Stream processing**: Kafka, Webhook
- **Embedded/Edge**: SQLite, DuckDB

### 2. **Scale Requirements**
- **High volume**: Kafka, S3
- **Moderate volume**: PostgreSQL, Webhook
- **Low volume**: SQLite, ZeroMQ

### 3. **Infrastructure**
- **Managed services**: PostgreSQL, S3
- **Self-hosted**: All options
- **No infrastructure**: SQLite, DuckDB

### 4. **Integration Needs**
- **SQL queries**: PostgreSQL, DuckDB, SQLite
- **REST APIs**: Webhook
- **Stream processing**: Kafka, ZeroMQ
- **Key-value access**: Redis

## Consumer Configuration

All consumers support configuration through the Flow pipeline builder:

```json
{
  "consumer_type": "postgres",
  "config": {
    "connection_string": "postgresql://user:pass@host/db",
    "batch_size": 100
  }
}
```

## Security Considerations

### Credential Management
- Credentials are stored securely in Vault
- Never exposed in logs or UI
- Automatic rotation support
- Encrypted in transit

### Connection Security
- TLS/SSL support for all network consumers
- Authentication mechanisms:
  - PostgreSQL: Username/password, SSL certs
  - Kafka: SASL, SSL
  - S3: IAM credentials
  - Webhook: Shared secrets

## Performance Optimization

### Batch Processing
Most consumers support batch processing for efficiency:
- Configure appropriate batch sizes
- Balance between latency and throughput
- Consider memory constraints

### Connection Pooling
Database consumers maintain connection pools:
- Reuse connections for better performance
- Configure pool sizes based on load
- Monitor connection health

### Parallel Processing
Some consumers support parallel writes:
- Kafka partitions
- S3 multipart uploads
- PostgreSQL parallel inserts

## Monitoring & Troubleshooting

### Health Checks
- Connection status monitoring
- Write failure tracking
- Latency measurements
- Queue depth (for streaming consumers)

### Common Issues
- **Connection failures**: Check credentials and network
- **Performance degradation**: Adjust batch sizes
- **Data loss**: Enable consumer acknowledgments
- **Schema mismatches**: Verify data formats

## Best Practices

1. **Start Simple**: Begin with PostgreSQL or Webhook
2. **Plan for Scale**: Choose consumers that can grow with your needs
3. **Monitor Performance**: Track metrics and adjust configurations
4. **Handle Failures**: Implement retry logic and dead letter queues
5. **Secure Credentials**: Use Vault integration for sensitive data

## Next Steps

- Explore individual consumer documentation for detailed configuration
- Check our [Getting Started Guide](../getting-started/quickstart.md) for implementation examples
- Learn about [processors](../processors) to transform your data
- Review [Flow Overview](../overview.md) for architecture details