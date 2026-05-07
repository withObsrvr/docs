---
sidebar_position: 1
title: Processors Reference
---

# Flow processors

This page lists the processor IDs currently exposed by the Flow registry. Use these IDs in `spec.processors[].type` when creating pipelines through the API.

```bash
export CONSOLE="https://console.withobsrvr.com"
export API_KEY="your-team-api-key"

curl -H "Authorization: Api-Key $API_KEY" \
  "$CONSOLE/api/v1/flow/registry/processors/"
```

## Processor summary

| ID | Name | Description | Compatible consumers |
|----|------|-------------|----------------------|
| `payments_memo` | Payments with Memo | Process payment operations with memo fields | None currently exposed by registry compatibility rules |
| `raw_transactions` | Raw Transactions | Process raw transactions | None currently exposed by registry compatibility rules |
| `account_balance` | Account Balance | Track account balances | None currently exposed by registry compatibility rules |
| `latest_ledger` | Latest Ledger Metrics | Process and track metrics for the latest ledger | `save_latest_ledger_redis` |
| `contract_event` | Contract Event | Process Soroban contract events | `contract_events_postgres` |
| `soroswap` | SwapService | Process SwapService events | `soroswap_postgres` |
| `account_data` | Account Data | Process Stellar account data changes | `account_data_postgres` |
| `contract_invocation` | Contract Invocation | Track Soroban contract invocations and their details | `contract_invocations_postgres`, `extracted_contract_invocations_postgres` |
| `contract_filter` | Contract Filter | Filter events by specific contract IDs | `contract_events_postgres`, `contract_invocations_postgres`, `extracted_contract_invocations_postgres` |
| `contract_data` | Contract Data | Process Stellar Soroban contract data changes | `contract_data_postgres` |
| `extracted_contract_invocation` | Extracted Contract Invocation | Extract structured business data from contract invocations using configurable schemas | `extracted_contract_invocations_postgres` |
| `event_payment_extractor` | Event Payment Extractor | Extracts structured payment events from contract events (Kwickbit payment processor) | `event_payment_postgres`, `google_pubsub_v2` |

## Processor configuration reference

### `payments_memo` — Payments with Memo

Process payment operations with memo fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `min_amount` | string | No |  | Minimum payment amount to process |
| `memo_text` | string | No | `internal` | Filter payments by memo text |
| `asset_code` | string | No |  | Filter by specific asset |
| `addresses` | array | No |  | Filter by specific addresses |


**Example**

```yaml
processors:
  - type: payments_memo
    config:
      min_amount: ""
      memo_text: "internal"
      asset_code: ""
```

### `raw_transactions` — Raw Transactions

Process raw transactions

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `transaction_types` | array | No |  | Types of transactions to process |


**Example**

```yaml
processors:
  - type: raw_transactions
```

### `account_balance` — Account Balance

Track account balances

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `account_ids` | array | Yes |  | List of account IDs to monitor |
| `assets` | array | No |  | Filter by specific assets |


**Example**

```yaml
processors:
  - type: account_balance
    config:
      account_ids: []
```

### `latest_ledger` — Latest Ledger Metrics

Process and track metrics for the latest ledger

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `network_passphrase` | string | Yes |  | The network passphrase for the Stellar network |


**Example**

```yaml
processors:
  - type: latest_ledger
    config:
      network_passphrase: "Test SDF Network ; September 2015"
```

### `contract_event` — Contract Event

Process Soroban contract events

No processor-specific configuration fields.


**Example**

```yaml
processors:
  - type: contract_event
```

### `soroswap` — SwapService

Process SwapService events

No processor-specific configuration fields.


**Example**

```yaml
processors:
  - type: soroswap
```

### `account_data` — Account Data

Process Stellar account data changes

No processor-specific configuration fields.


**Example**

```yaml
processors:
  - type: account_data
```

### `contract_invocation` — Contract Invocation

Track Soroban contract invocations and their details

No processor-specific configuration fields.


**Example**

```yaml
processors:
  - type: contract_invocation
```

### `contract_filter` — Contract Filter

Filter events by specific contract IDs

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `contract_ids` | array | Yes |  | List of contract IDs to filter events for |


**Example**

```yaml
processors:
  - type: contract_filter
    config:
      contract_ids: ["CC..."]
```

### `contract_data` — Contract Data

Process Stellar Soroban contract data changes

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `network_passphrase` | string | Yes |  | Stellar network identifier |
| `name` | string | No | `contract_data_processor` | Optional processor identifier |


**Example**

```yaml
processors:
  - type: contract_data
    config:
      network_passphrase: "Test SDF Network ; September 2015"
      name: "contract_data_processor"
```

### `extracted_contract_invocation` — Extracted Contract Invocation

Extract structured business data from contract invocations using configurable schemas

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `extraction_schemas` | object | Yes | `{}` | Schema definitions for extracting business data from contract invocations |
| `name` | string | No | `contract_invocation_extractor` | Optional processor identifier |


**Example**

```yaml
processors:
  - type: extracted_contract_invocation
    config:
      extraction_schemas: {}
      name: "contract_invocation_extractor"
```

### `event_payment_extractor` — Event Payment Extractor

Extracts structured payment events from contract events (Kwickbit payment processor)

No processor-specific configuration fields.


**Example**

```yaml
processors:
  - type: event_payment_extractor
```
