---
sidebar_position: 1
title: Consumers Reference
---

# Flow consumers

This page lists the consumer IDs currently exposed by the Flow registry. Use these IDs in `spec.consumers[].type` when creating pipelines through the API.

```bash
curl -H "Authorization: Api-Key $API_KEY" \
  "$CONSOLE/api/v1/flow/registry/consumers/"
```

:::warning Keep credentials out of source control
Consumer configs often include database passwords, connection strings, or cloud credentials. Use placeholders, CI secrets, or the Flow secrets API instead of committing live values.
:::

## Consumer summary

| ID | Name | Description |
|----|------|-------------|
| `account_data_postgres` | Account Data PostgreSQL | Store Stellar account data in a specialized PostgreSQL schema |
| `contract_invocations_postgres` | Contract Invocations PostgreSQL | Store Soroban contract invocations in a specialized PostgreSQL schema |
| `contract_events_postgres` | Contract Events PostgreSQL | Store Soroban contract events in a specialized PostgreSQL schema |
| `soroswap_postgres` | SwapService PostgreSQL | Store SwapService events in a specialized PostgreSQL schema |
| `save_latest_ledger_redis` | Redis Ledger Storage | Store latest ledger information in Redis |
| `contract_data_postgres` | Contract Data PostgreSQL | Save contract data to PostgreSQL with configurable schema |
| `extracted_contract_invocations_postgres` | Extracted Contract Invocations PostgreSQL | Save extracted contract invocation business data to PostgreSQL with optimized schema |
| `event_payment_postgres` | Event Payment PostgreSQL | Saves event payment data to PostgreSQL with accounts tracking |
| `google_pubsub_v2` | Google Pub/Sub (V2) | Publishes event payments to Google Cloud Pub/Sub in V2 message format |

## Consumer configuration reference

### `account_data_postgres` — Account Data PostgreSQL

Store Stellar account data in a specialized PostgreSQL schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `host` | string | Yes |  | PostgreSQL server hostname |
| `port` | integer | Yes | `5432` | PostgreSQL server port |
| `database` | string | Yes |  | PostgreSQL database name |
| `username` | string | Yes |  | PostgreSQL username |
| `password` | string sensitive | Yes |  | PostgreSQL password |
| `sslmode` | string enum: `disable`, `require`, `verify-ca`, `verify-full` | No | `disable` | PostgreSQL SSL mode |
| `max_open_conns` | integer (min 1) | No | `10` | Maximum number of open connections to the database |
| `max_idle_conns` | integer (min 1) | No | `5` | Maximum number of idle connections in the pool |


**Example**

```yaml
consumers:
  - type: account_data_postgres
    config:
      host: postgres.example.com
      port: 5432
      database: defaultdb
      username: avnadmin
      password: "${POSTGRES_PASSWORD}"
      sslmode: require
      max_open_conns: 10
      max_idle_conns: 5
```

### `contract_invocations_postgres` — Contract Invocations PostgreSQL

Store Soroban contract invocations in a specialized PostgreSQL schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `host` | string | Yes |  | PostgreSQL server hostname |
| `port` | integer | Yes | `5432` | PostgreSQL server port |
| `database` | string | Yes |  | PostgreSQL database name |
| `username` | string | Yes |  | PostgreSQL username |
| `password` | string | Yes |  | PostgreSQL password |
| `sslmode` | string enum: `disable`, `require`, `verify-ca`, `verify-full` | Yes | `disable` | PostgreSQL SSL mode |
| `max_open_conns` | integer | Yes | `10` | Maximum number of open connections |
| `max_idle_conns` | integer | Yes | `5` | Maximum number of idle connections |


**Example**

```yaml
consumers:
  - type: contract_invocations_postgres
    config:
      host: postgres.example.com
      port: 5432
      database: defaultdb
      username: avnadmin
      password: "${POSTGRES_PASSWORD}"
      sslmode: require
      max_open_conns: 10
      max_idle_conns: 5
```

### `contract_events_postgres` — Contract Events PostgreSQL

Store Soroban contract events in a specialized PostgreSQL schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `host` | string | Yes |  | PostgreSQL server hostname |
| `port` | integer | Yes |  | PostgreSQL server port |
| `database` | string | Yes |  | PostgreSQL database name |
| `username` | string | Yes |  | PostgreSQL username |
| `password` | string | Yes |  | PostgreSQL password |
| `sslmode` | string enum: `disable`, `require`, `verify-ca`, `verify-full` | Yes | `disable` | PostgreSQL SSL mode |
| `max_open_conns` | integer | Yes | `10` | Maximum number of open connections |
| `max_idle_conns` | integer | Yes | `5` | Maximum number of idle connections |


**Example**

```yaml
consumers:
  - type: contract_events_postgres
    config:
      host: postgres.example.com
      port: 5432
      database: defaultdb
      username: avnadmin
      password: "${POSTGRES_PASSWORD}"
      sslmode: require
      max_open_conns: 10
      max_idle_conns: 5
```

### `soroswap_postgres` — SwapService PostgreSQL

Store SwapService events in a specialized PostgreSQL schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `host` | string | Yes |  | PostgreSQL server hostname |
| `port` | integer | Yes | `5432` | PostgreSQL server port |
| `database` | string | Yes |  | PostgreSQL database name |
| `username` | string | Yes |  | PostgreSQL username |
| `password` | string | Yes |  | PostgreSQL password |
| `sslmode` | string enum: `disable`, `require`, `verify-ca`, `verify-full` | Yes | `disable` | PostgreSQL SSL mode |
| `max_open_conns` | integer | Yes | `10` | Maximum number of open connections |
| `max_idle_conns` | integer | Yes | `5` | Maximum number of idle connections |


**Example**

```yaml
consumers:
  - type: soroswap_postgres
    config:
      host: postgres.example.com
      port: 5432
      database: defaultdb
      username: avnadmin
      password: "${POSTGRES_PASSWORD}"
      sslmode: require
      max_open_conns: 10
      max_idle_conns: 5
```

### `save_latest_ledger_redis` — Redis Ledger Storage

Store latest ledger information in Redis

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `redis_address` | string | Yes | `:6379` | Redis server address (host:port) |
| `redis_password` | string sensitive | No |  | Redis server password |
| `redis_db` | integer (min 0, max 15) | No | `0` | Redis database number |
| `key_prefix` | string | No | `stellar:ledger:` | Prefix for Redis keys |
| `use_tls` | boolean | No | `true` | Enable TLS/SSL connection to Redis |


**Example**

```yaml
consumers:
  - type: save_latest_ledger_redis
    config:
      redis_address: "redis.example.com:6379"
      redis_db: 0
      key_prefix: "stellar:ledger:"
      use_tls: true
```

### `contract_data_postgres` — Contract Data PostgreSQL

Save contract data to PostgreSQL with configurable schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `database_url` | string (uri) sensitive | Yes |  | PostgreSQL connection string |
| `table_name` | string | Yes | `contract_data` | PostgreSQL table name |
| `create_table_if_not_exists` | boolean | No | `true` | Automatically create table if missing |
| `batch_size` | integer (min 1, max 1000) | No | `100` | Number of records to batch before writing |
| `max_open_conns` | integer (min 1, max 100) | No | `25` | Maximum database connections |
| `max_idle_conns` | integer (min 1, max 50) | No | `5` | Maximum idle database connections |


**Example**

```yaml
consumers:
  - type: contract_data_postgres
    config:
      database_url: "postgres://user:${POSTGRES_PASSWORD}@postgres.example.com:5432/defaultdb?sslmode=require"
      table_name: "contract_data"
      create_table_if_not_exists: true
      batch_size: 100
      max_open_conns: 25
      max_idle_conns: 5
```

### `extracted_contract_invocations_postgres` — Extracted Contract Invocations PostgreSQL

Save extracted contract invocation business data to PostgreSQL with optimized schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `host` | string | Yes |  | PostgreSQL server hostname |
| `port` | integer | Yes | `5432` | PostgreSQL server port |
| `database` | string | Yes |  | PostgreSQL database name |
| `username` | string | Yes |  | PostgreSQL username |
| `password` | string sensitive | Yes |  | PostgreSQL password |
| `sslmode` | string enum: `disable`, `require`, `verify-ca`, `verify-full` | No | `disable` | PostgreSQL SSL mode |
| `max_open_conns` | integer (min 1) | No | `10` | Maximum number of open connections to the database |
| `max_idle_conns` | integer (min 1) | No | `5` | Maximum number of idle connections in the pool |
| `connect_timeout` | integer (min 1) | No | `30` | Connection timeout in seconds |


**Example**

```yaml
consumers:
  - type: extracted_contract_invocations_postgres
    config:
      host: postgres.example.com
      port: 5432
      database: defaultdb
      username: avnadmin
      password: "${POSTGRES_PASSWORD}"
      sslmode: require
      max_open_conns: 10
      max_idle_conns: 5
      connect_timeout: 30
```

### `event_payment_postgres` — Event Payment PostgreSQL

Saves event payment data to PostgreSQL with accounts tracking

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `connectionString` | string (uri) sensitive | Yes |  | PostgreSQL connection string (e.g., postgres://user:pass@host:5432/db) |
| `batchSize` | integer (min 1, max 1000) | No | `1` | Number of records to batch before committing |


**Example**

```yaml
consumers:
  - type: event_payment_postgres
    config:
      connectionString: "postgres://user:${POSTGRES_PASSWORD}@postgres.example.com:5432/defaultdb?sslmode=require"
      batchSize: 1
```

### `google_pubsub_v2` — Google Pub/Sub (V2)

Publishes event payments to Google Cloud Pub/Sub in V2 message format

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `project_id` | string | Yes |  | Google Cloud project ID |
| `topic_id` | string | Yes |  | Pub/Sub topic name |
| `chain_identifier` | string enum: `StellarMainnet`, `StellarTestnet` | Yes | `StellarTestnet` | Stellar network identifier |
| `credentials_json` | string (textarea) sensitive | Yes |  | Google Cloud service account JSON key (paste the entire JSON content) |


**Example**

```yaml
consumers:
  - type: google_pubsub_v2
    config:
      project_id: "my-gcp-project"
      topic_id: "stellar-events"
      chain_identifier: "StellarTestnet"
      credentials_json: "${GOOGLE_APPLICATION_CREDENTIALS_JSON}"
```
