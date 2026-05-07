---
sidebar_position: 2
title: PostgreSQL Consumers
---

# PostgreSQL consumers

Flow currently exposes specialized PostgreSQL consumers, not a generic `postgres` consumer. Pick the consumer that matches the processor output type.

## Available PostgreSQL consumers

| Consumer ID | Use with processor IDs | Description |
|-------------|------------------------|-------------|
| `account_data_postgres` | `account_data` | Store Stellar account data in a specialized PostgreSQL schema |
| `contract_invocations_postgres` | `contract_invocation`, `contract_filter` | Store Soroban contract invocations in a specialized PostgreSQL schema |
| `contract_events_postgres` | `contract_event`, `contract_filter` | Store Soroban contract events in a specialized PostgreSQL schema |
| `soroswap_postgres` | `soroswap` | Store SwapService events in a specialized PostgreSQL schema |
| `contract_data_postgres` | `contract_data` | Save contract data to PostgreSQL with configurable schema |
| `extracted_contract_invocations_postgres` | `contract_invocation`, `contract_filter`, `extracted_contract_invocation` | Save extracted contract invocation business data to PostgreSQL with optimized schema |
| `event_payment_postgres` | `event_payment_extractor` | Saves event payment data to PostgreSQL with accounts tracking |

## Connection-field based consumers

Most specialized PostgreSQL consumers use separate connection fields:

```yaml
consumers:
  - type: contract_events_postgres
    config:
      host: postgres.example.com
      port: 5432
      database: defaultdb
      username: avnadmin
      password: ${POSTGRES_PASSWORD}
      sslmode: require
      max_open_conns: 10
      max_idle_conns: 5
```

These consumers use that shape:
- `account_data_postgres`
- `contract_invocations_postgres`
- `contract_events_postgres`
- `soroswap_postgres`
- `extracted_contract_invocations_postgres`

## Connection-string consumers

Some consumers use a single connection string instead:

```yaml
consumers:
  - type: contract_data_postgres
    config:
      database_url: postgres://user:${POSTGRES_PASSWORD}@postgres.example.com:5432/defaultdb?sslmode=require
      table_name: contract_data
```

Connection-string consumers:
- `contract_data_postgres` uses `database_url`
- `event_payment_postgres` uses `connectionString`

For the complete field list, see [Consumers Reference](./).