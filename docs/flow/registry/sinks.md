---
sidebar_position: 4
title: Sinks
---

# Sinks (Consumers)

Sinks are output destinations that receive processed blockchain data and deliver it to databases, storage, streams, or applications.

## Available Sinks

The cdp-pipeline-workflow includes 51 embedded consumers. See [Consumers Index](../consumers/index.md) for the complete list with configurations.

### Database Storage

**PostgreSQL (14 variants)**
- Generic PostgreSQL, PostgreSQL Bronze
- Buffered PostgreSQL (high-throughput)
- Account Data, Asset, Payments, Event Payment
- Contract Events, Contract Invocations, Extracted Contract Invocations
- Claimable Balance, Soroswap, Wallet Backend

**DuckDB (9 variants)**
- Generic DuckDB, DuckLake, DuckLake Enhanced
- Bronze DuckDB (medallion architecture)
- Account Data, Assets, Contract Events
- Soroswap Pairs, Soroswap Router

**Other Databases**
- SQLite (Soroswap variants)
- ClickHouse (OLAP analytics)
- MongoDB (document storage)
- TimescaleDB (time-series)

### Caching (5 Redis variants)
- Generic Redis (multi-operation)
- Payments Redis, Latest Ledger Redis
- Orderbook Redis, Market Analytics Redis

### Cloud Storage (3 consumers)
- Google Cloud Storage (GCS)
- Parquet Files (local/S3/GCS)
- Ledger Parquet (specialized)

### Streaming & Messaging (3 consumers)
- Google Pub/Sub, Google Pub/Sub V2
- ZeroMQ (low-latency)

### Real-time Communications
- WebSocket (with client filtering)

### File Export (2 consumers)
- Excel, Latest Ledger Excel

### AI/ML Integration
- Anthropic Claude (batch analysis)

### Notifications
- Notification Dispatcher (Slack/email/webhook)

### Data Transformation
- Silver Ingester (Bronze→Silver)

### Debugging (3 consumers)
- Stdout, Debug Logger, Log Debug

---

## Key Sinks

### SaveToPostgreSQL

General-purpose PostgreSQL consumer with flexible JSON format.

**Configuration:**
```yaml
type: postgres
config:
  connection_string: "postgresql://user:pass@host:5432/database"
  batch_size: 50
```

**Use Cases:** Analytics databases, application backends, historical data storage

---

### SaveToZeroMQ

High-performance message publishing to ZeroMQ sockets.

**Configuration:**
```yaml
type: zeromq
config:
  endpoint: "tcp://127.0.0.1:5555"
```

**Use Cases:** Real-time streaming, IPC, low-latency messaging

---

### SaveToDuckLake

DuckDB lakehouse pattern with schema registry for medallion architecture.

**Configuration:**
```yaml
type: ducklake_enhanced
config:
  db_path: "ducklake_enhanced.duckdb"
  batch_size: 100
  flush_interval: 5
```

**Use Cases:** Data lakehouse, analytics, data science workloads

---

### BronzeToDuckDB

Bronze layer DuckDB ingestion with appenders for medallion architecture.

**Configuration:**
```yaml
type: bronze_duckdb
config:
  db_path: "bronze.duckdb"
  batch_size: 100
  flush_interval_seconds: 10
```

**Use Cases:** Raw data ingestion, data lakehouse bronze layer

---

### SaveContractEventsToPostgreSQL

Soroban contract events storage with optimized schema.

**Configuration:**
```yaml
type: contract_events_postgres
config:
  host: "localhost"
  database: "soroban_events"
```

**Use Cases:** Smart contract event logging, DeFi analytics

---

### SaveToWebSocket

WebSocket server with client filtering and queuing for real-time updates.

**Configuration:**
```yaml
type: websocket
config:
  port: 8080
  path: "/ws"
  max_queue_size: 1000
```

**Use Cases:** Real-time dashboards, browser applications, live updates

---

### PublishToGooglePubSub

Publisher for Google Pub/Sub with EventPayment support.

**Configuration:**
```yaml
type: pubsub_v2
config:
  project_id: "my-project"
  topic_id: "stellar-events-v2"
  chain_identifier: "StellarMainnet"
```

**Use Cases:** Event streaming, cloud-native pipelines, multi-service architectures

---

### SaveToClickHouse

OLAP database with materialized views for real-time analytics.

**Configuration:**
```yaml
type: clickhouse
config:
  address: "localhost:9000"
  database: "stellar"
  max_open_conns: 25
```

**Use Cases:** Payment stats, price analytics, high-volume analytics

---

### SaveToRedis

Multi-operation Redis storage for fast lookups and caching.

**Configuration:**
```yaml
type: redis
config:
  redis_url: "redis://localhost:6379"
  key_prefix: "flow:"
  ttl_hours: 24
  use_tls: true
```

**Use Cases:** Caching, real-time data, fast lookups, session storage

---

## Sink Categories

### For Analytics & Warehousing
- **PostgreSQL**: Structured queries, ACID compliance
- **DuckDB/DuckLake**: Columnar analytics, data science
- **ClickHouse**: OLAP, high-volume analytics
- **Parquet Files**: Data lake archival, portability

### For Real-Time Applications
- **Redis**: Fast lookups, caching
- **WebSocket**: Browser/app streaming
- **ZeroMQ**: Low-latency IPC
- **Google Pub/Sub**: Event streaming

### For Development & Debugging
- **Stdout**: Terminal output
- **Debug Logger**: Detailed inspection
- **Excel**: Manual analysis

### For AI/ML Workflows
- **Anthropic Claude**: AI-powered analysis
- **DuckDB**: Data science integration
- **Parquet Files**: ML pipeline inputs

---

## Choosing a Sink

### Use PostgreSQL when:
- ✅ You need SQL queries
- ✅ You want ACID transactions
- ✅ You're building application backends
- ✅ You need joins and complex queries

### Use DuckDB/DuckLake when:
- ✅ You're doing analytics
- ✅ You want columnar storage efficiency
- ✅ You need embedded database (no server)
- ✅ You're building data science pipelines

### Use ZeroMQ when:
- ✅ You need low latency (microseconds)
- ✅ You're doing IPC
- ✅ You want minimal overhead
- ✅ You need flexible messaging patterns

### Use Redis when:
- ✅ You need fast key-value lookups
- ✅ You want in-memory caching
- ✅ You're building real-time features
- ✅ You need pub/sub capabilities

### Use WebSocket when:
- ✅ You're building browser apps
- ✅ You need bidirectional communication
- ✅ You want client-side filtering
- ✅ You're streaming to dashboards

---

## Sink Combinations

Sinks can be used together in the same pipeline:

**Real-time + Historical:**
```yaml
consumers:
  - type: redis  # Fast lookups
  - type: postgres  # Long-term storage
```

**Analytics + Archival:**
```yaml
consumers:
  - type: ducklake  # Active analytics
  - type: parquet  # S3 archival
```

**Monitoring + Alerting:**
```yaml
consumers:
  - type: websocket  # Dashboard
  - type: notification_dispatcher  # Alerts
```

---

## Complete List

For the full catalog of 51 sinks with detailed configurations, see:
- **[Consumers Index](../consumers/index.md)** - All 51 consumers with YAML configs
- **[PostgreSQL Consumer](../consumers/postgresql.md)** - Detailed PostgreSQL guide

---

## Next Steps

- **Examples**: See [pipeline examples](./examples.md) for complete source→processor→sink configurations
- **Custom Sinks**: Learn to build your own in [Building Custom Components](./building-components.md)
